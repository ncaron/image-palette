import * as types from './actionTypes';
import * as constants from './contants';

const displayImage = (canvas, ctx, src) => {
  let img = new Image();
  img.src = src;

  return new Promise((resolve) => {
    img.onload = () => {
      // Sets canvas dimensions to be equal to image but max X (defined in ./contants.js)
      canvas.width = img.width < constants.CANVAS_SIZE ? img.width : constants.CANVAS_SIZE;
      canvas.height = img.height < constants.CANVAS_SIZE ? img.height : constants.CANVAS_SIZE;

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

  canvas.width = constants.CANVAS_SIZE;
  canvas.height = constants.CANVAS_SIZE;
};

const getHexColor = ({red, green, blue}) => {
  red = red.toString(16).padStart(2, '0');
  green = green.toString(16).padStart(2, '0');
  blue = blue.toString(16).padStart(2, '0');

  return `#${red}${green}${blue}`;
};

const getAverageColor = (colors, pixelsPerSwatch) => {
  colors.red = Math.round((colors.red / pixelsPerSwatch));
  colors.green = Math.round((colors.green / pixelsPerSwatch));
  colors.blue = Math.round((colors.blue / pixelsPerSwatch));

  return colors;
};

const getColors = (imgData, numSwatches) => {
  let length = imgData.length;
  const pixelsPerSwatch = Math.ceil(length / 4 / numSwatches);
  let colors = [];
  let currentColor = { red: 0, green: 0, blue: 0 };
  let j = 0;

  for (let i = 0; i < length; i += 4) {
    currentColor.red += imgData[i];
    currentColor.green += imgData[i + 1];
    currentColor.blue += imgData[i + 2];

    if (j + 1 >= pixelsPerSwatch) {
      let averageColor = getAverageColor(currentColor, pixelsPerSwatch);
      let hexColor = getHexColor(averageColor);

      if (!colors.includes(hexColor)) {
        colors.push(hexColor);
      }

      currentColor.red = 0;
      currentColor.green = 0;
      currentColor.blue = 0;
      j = 0;
    }

    j++;
  }

  return colors;
};

export function uploadImage(e, numSwatches) {
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
          resolve(getColors(imgData, numSwatches));
        });
      };
    });

    return completePromise.then(colors => {
      return {
        type: types.UPLOAD_IMAGE,
        colors
      };
    });
  }

  return {
    type: types.UPLOAD_IMAGE
  };
}

export function changeNumSwatches(e, loaded) {
  const numSwatches = e.target.value;

  if (loaded) {
    let canvas = document.getElementById('image-canvas');
    let ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let colors = getColors(imgData, numSwatches);

    return {
      type: types.CHANGE_NUM_SWATCHES,
      numSwatches,
      colors
    };
  }

  return {
    type: types.CHANGE_NUM_SWATCHES,
    numSwatches
  };
}
