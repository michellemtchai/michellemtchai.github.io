export const formData = (form)=>{
    let formData = form ? new FormData(form.current): null;
    return formData ?
        Object.fromEntries(formData.entries()):
        null;
}