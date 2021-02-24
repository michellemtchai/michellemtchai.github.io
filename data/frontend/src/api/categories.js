import { fetchAPIData } from '../shared/network';

export const getAllCategories = (props)=>{
    fetchAPIData(props, '/categories', props.setData, {
        formatData: (data)=>{
            return {
                categories: data
            }
        }
    });
}

export const createCategory = (props, params)=>{
    let updateData = (data)=>{
        console.log('new', data);
        props.endFetching();
        getAllCategories(props);
    }
    fetchAPIData(props, '/categories/', updateData, {
        method: 'POST',
        params: params,
    });
}

export const updateCategory = (props, id, params)=>{
    let updateData = (data)=>{
        console.log('updated', data);
        props.endFetching();
        getAllCategories(props);
    }
    fetchAPIData(props, `/categories/${id}`, updateData, {
        method: 'PUT',
        params: params,
    });
}

export const removeCategoryById = (props, id)=>{
    let updateData = (data)=>{
        console.log('deleted', data);
        props.endFetching();
        getAllCategories(props);
    }
    fetchAPIData(props, `/categories/${id}`, updateData, {
        method: 'DELETE',
    });
}
