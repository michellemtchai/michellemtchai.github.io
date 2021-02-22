import { fetchAPIData } from '../shared/network';

export const getAllItems = (props)=>{
    fetchAPIData(props, '/items', props.setData, {
        formatData: (data)=>{
            return {
                items: data
            }
        }
    });
}

export const getItemById = (props, id)=>{
    fetchAPIData(props, `/items/${id}`, console.log);
}

export const createItem = (props, params)=>{
    let updateItemsList = (data)=>{
        console.log('new', data);
        props.endFetching();
        getAllItems(props);
    }
    fetchAPIData(props, '/items/', updateItemsList, {
        method: 'POST',
        params: params,
    });
}

export const updateItem = (props, id, params)=>{
    let updateItemsList = (data)=>{
        console.log('updated', data);
        props.endFetching();
        getAllItems(props);
    }
    fetchAPIData(props, `/items/${id}`, updateItemsList, {
        method: 'PUT',
        params: params,
    });
}

export const removeItemById = (props, id)=>{
    let updateItemsList = (data)=>{
        console.log('deleted', data);
        props.endFetching();
        getAllItems(props);
    }
    fetchAPIData(props, `/items/${id}`, updateItemsList, {
        method: 'DELETE',
    });
}
