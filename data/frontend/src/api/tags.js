import { fetchAPIData } from '../shared/network';

export const getAllTags = (props, next=null)=>{
    fetchAPIData(props, '/projects', props.setData, {
        formatData: (data)=>{
            return {
                tags: data
            }
        },
        next: next,
    });
}

export const createTag = (props, params, next=null)=>{
    let updateData = (data)=>{
        console.log('new', data);
        props.endFetching();
        getAllTags(props, next);
    }
    fetchAPIData(props, '/projects/', updateData, {
        method: 'POST',
        params: params,
    });
}

export const removeTagById = (props, id, next=null)=>{
    let updateData = (data)=>{
        console.log('deleted', data);
        props.endFetching();
        getAllTags(props, next);
    }
    fetchAPIData(props, `/projects/${id}`, updateData, {
        method: 'DELETE',
    });
}
