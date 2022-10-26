const convertToImageElement = (
  src: string | File
): Promise<HTMLImageElement | undefined> => {
  let url: string;
  if (typeof src === 'string') {
    url = src;
  } else {
    url = URL.createObjectURL(src);
  }

  const image = new Image();
  image.src = url;

  return new Promise((resolve, reject) => {
    image.addEventListener('error', () =>
      reject(
        new Error('The media resource is either invalid, corrupt or unsuitable')
      )
    );

    image.addEventListener('load', () => resolve(image), false);
  });
};

export default convertToImageElement;
