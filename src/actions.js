import * as types from './actionTypes';

const displayImage = (canvas, ctx, src) => {
  let img = new Image();
  img.src = src;

  img.onload = () => {
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.min(hRatio, vRatio);
    const width = img.width * ratio;
    const height = img.height * ratio;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, 0, 0, width, height);
  };
};

const resetCanvas = (canvas, ctx) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  canvas.width = 500;
  canvas.height = 500;
};

export function uploadImage(e) {
  let canvas = document.getElementById('image-canvas');
  let ctx = canvas.getContext('2d');
  let imageReader = new FileReader();

  resetCanvas(canvas, ctx);

  imageReader.readAsDataURL(e.target.files[0]);
  imageReader.onload = e => displayImage(canvas, ctx, e.target.result);

  return {
    type: types.UPLOAD_IMAGE
  };
}
