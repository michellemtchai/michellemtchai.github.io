export const formData = (form)=>{
    return form.current ? form.current.state.form : null;
}

export const copySchema = (schema)=>{
    return JSON.parse(JSON.stringify(schema));
}
