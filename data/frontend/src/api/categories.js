import { fetchAPIData } from '../shared/network';

export const getAllCategories = (props, next=null)=>{
    fetchAPIData(props, '/categories', props.setData, {
        formatData: (data)=>{
            return {
                categories: data
            }
        },
        next: next,
    });
}

export const createCategory = (props, params, next=null)=>{
    let updateData = (data)=>{
        console.log('new', data);
        props.endFetching();
        getAllCategories(props, next);
    }
    fetchAPIData(props, '/categories/', updateData, {
        method: 'POST',
        params: params,
    });
}

export const updateCategory = (props, id, params, next=null)=>{
    let updateData = (data)=>{
        console.log('updated', data);
        props.endFetching();
        getAllCategories(props, next);
    }
    fetchAPIData(props, `/categories/${id}`, updateData, {
        method: 'PUT',
        params: params,
    });
}

export const removeCategoryById = (props, id, next=null)=>{
    let updateData = (data)=>{
        console.log('deleted', data);
        props.endFetching();
        getAllCategories(props, next);
    }
    fetchAPIData(props, `/categories/${id}`, updateData, {
        method: 'DELETE',
    });
}
