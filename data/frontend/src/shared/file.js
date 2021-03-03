export const readFile = (file, app, next) => {
    let reader = new FileReader();
    app.setState({...app.state,
       file: file.name, reading: true, percent: 0
    });
    reader.addEventListener('load', (event) => {
        app.setState({
            ...app.state,
            value: event.target.result,
            reading: false,
            percent: 100,
        }, ()=>next());
    });

    reader.addEventListener('progress', (event) => {
        if (event.loaded && event.total) {
            app.setState({...app.state, percent: getLoadingProgress(event)});
        }
    });
    reader.readAsDataURL(file);
}

export const getLoadingProgress = (event)=>{
    let percent = (event.loaded / event.total) * 100;
    return Math.round(percent);
}

export const resizeImage = (urlImageData, setImage, maxSize = 200)=>{
    let image = new Image();
    image.onload = (event)=>{
        let [canvas, width, height] = resizeCanvas(image, maxSize);
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        setImage(canvas.toDataURL('image/jpeg', 0.75));
    }
    image.src = urlImageData;
}

const resizeCanvas=(image, maxSize)=>{
    let canvas = document.createElement('canvas');
    let width = image.width,
        height = image.height;
    if (width > height) {
        if (width > maxSize) {
            height = (height/width) * maxSize;
            width = maxSize;
        }
    } else {
        if (height > maxSize) {
            width = (width/height) * maxSize;
            height = maxSize;
        }
    }
    canvas.width = width;
    canvas.height = height;
    return [canvas, width, height];
}
