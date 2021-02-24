import { fetchAPIData } from '../shared/network';

export const getAllTags = (props)=>{
    fetchAPIData(props, '/projects', props.setData, {
        formatData: (data)=>{
            return {
                tags: data
            }
        }
    });
}

export const createTag = (props, params)=>{
    let updateData = (data)=>{
        console.log('new', data);
        props.endFetching();
        getAllTags(props);
    }
    fetchAPIData(props, '/projects/', updateData, {
        method: 'POST',
        params: params,
    });
}

export const removeTagById = (props, id)=>{
    let updateData = (data)=>{
        console.log('deleted', data);
        props.endFetching();
        getAllTags(props);
    }
    fetchAPIData(props, `/projects/${id}`, updateData, {
        method: 'DELETE',
    });
}
