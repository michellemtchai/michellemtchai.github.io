export const readFile = (file, app, next) => {
    let reader = new FileReader();
    app.setState({
        ...app.state,
        file: file.name,
        reading: true,
        percent: 0,
    });
    reader.addEventListener('load', (event) => {
        app.setState(
            {
                ...app.state,
                value: event.target.result,
                reading: false,
                percent: 100,
            },
            () => next()
        );
    });

    reader.addEventListener('progress', (event) => {
        if (event.loaded && event.total) {
            app.setState({
                ...app.state,
                percent: getLoadingProgress(event),
            });
        }
    });
    reader.readAsDataURL(file);
};

export const getLoadingProgress = (event) => {
    let percent = (event.loaded / event.total) * 100;
    return Math.round(percent);
};

export const resizeImage = (
    urlImageData,
    setImage,
    {
        scale = true,
        maxSize = 200,
        width = null,
        height = null,
        resolution = 0.75,
        transparent = false,
    } = {}
) => {
    let image = new Image();
    image.onload = (event) => {
        let imageUrl = scale
            ? scaleCanvas(image, maxSize, resolution, transparency)
            : squashCanvas(
                  image,
                  width,
                  height,
                  resolution,
                  transparent
              );
        setImage(imageUrl);
    };
    image.src = urlImageData;
};

const scaleCanvas = (image, maxSize, resolution, transparent) => {
    let canvas = document.createElement('canvas');
    let width = image.width,
        height = image.height;
    if (width > height) {
        if (width > maxSize) {
            height = (height / width) * maxSize;
            width = maxSize;
        }
    } else {
        if (height > maxSize) {
            width = (width / height) * maxSize;
            height = maxSize;
        }
    }
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(image, 0, 0, width, height);
    return canvas.toDataURL(fileType(transparent), resolution);
};

const squashCanvas = (
    image,
    width,
    height,
    resolution,
    transparent
) => {
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(image, 0, 0, width, height);
    return canvas.toDataURL(fileType(transparent), resolution);
};

const fileType = (transparent) => {
    return transparent ? 'image/png' : 'image/jpeg';
};
