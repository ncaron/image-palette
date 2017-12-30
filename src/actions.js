import * as types from './actionTypes';

const displayImage = (canvas, ctx, src) => {
  let img = new Image();
  img.src = src;

  return new Promise((resolve) => {
    img.onload = () => {
      // Sets canvas dimensions to be equal to image but max 500.
      canvas.width = img.width < 500 ? img.width : 500;
      canvas.height = img.height < 500 ? img.height : 500;

      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.min(hRatio, vRatio);
      const width = img.width * ratio;
      const height = img.height * ratio;

      // Sets the dimensions of the canvas to be equal to image.
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);
      resolve(ctx.getImageData(0, 0, canvas.width, canvas.height).data);
    };
  });
};

const resetCanvas = (canvas, ctx) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  canvas.width = 500;
  canvas.height = 500;
};

const getHexColors = ({red, green, blue}) => {
  red = red.toString(16).padStart(2, '0');
  green = green.toString(16).padStart(2, '0');
  blue = blue.toString(16).padStart(2, '0');

  return {
    red,
    green,
    blue
  };
};

const getAverageColor = (imgData) => {
  let length = imgData.length;
  let colors = {
    red: 0,
    green: 0,
    blue: 0
  };

  for (let i = 0; i < length; i += 4) {
    colors.red += imgData[i];
    colors.green += imgData[i + 1];
    colors.blue += imgData[i + 2];
  }

  colors.red = Math.round((colors.red / length) * 4);
  colors.green = Math.round((colors.green / length) * 4);
  colors.blue = Math.round((colors.blue / length) * 4);

  return getHexColors(colors);
};

export function uploadImage(e) {
  const image = e.target.files[0];

  if (image) {
    let canvas = document.getElementById('image-canvas');
    let ctx = canvas.getContext('2d');
    let imageReader = new FileReader();

    resetCanvas(canvas, ctx);

    imageReader.readAsDataURL(image);

    let completePromise = new Promise((resolve) => {
      imageReader.onload = e => {
        let imgLoad = displayImage(canvas, ctx, e.target.result);
        imgLoad.then(imgData => {
          resolve(getAverageColor(imgData));
        });
      };
    });

    return completePromise.then(averageColor => {
      return {
        type: types.UPLOAD_IMAGE,
        averageColor
      };
    });
  }

  return {
    type: types.UPLOAD_IMAGE
  };
}
