export const formData = (form) => {
    return form.current ? form.current.state.form : null;
};

export const clone = (obj) => {
    return Object.assign({}, obj);
};
