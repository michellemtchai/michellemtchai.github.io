export const formData = (form)=>{
    return form.current ? form.current.state.form : null;
}
