export const readFile = (file, app) => {
    let reader = new FileReader();
    app.setState({...app.state,
       file: file.name, reading: true, percent: 0
    });
    reader.addEventListener('load', (event) => {
        app.setState({...app.state, reading: false, percent: 100});
        checkJsonFile(event.target.result, app);
    });

    reader.addEventListener('progress', (event) => {
        if (event.loaded && event.total) {
            app.setState({...app.state, percent: getLoadingProgress(event)});
        }
    });
    reader.readAsText(file);
}

export const checkJsonFile = (result, app)=>{
    try{
        let data = JSON.parse(result);
        if(hasKeys(data, ['schema', 'ui-schema', 'data'])){
            app.props.setData(data);
        }
        else{
            app.props.setError('Not the right JSON format');
        }
    } catch (err){
        app.props.setError(err.message);
    }
}

export const getLoadingProgress = (event)=>{
    let percent = (event.loaded / event.total) * 100;
    return Math.round(percent);
}
