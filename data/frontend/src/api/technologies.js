import { fetchAPIData } from '../shared/network';

export const getAllTechnologies = (props, next=null)=>{
    fetchAPIData(props, '/technologies', props.setData, {
        formatData: (data)=>{
            return {
                technologies: data
            }
        },
        next: next,
    });
}

export const createTechnology = (props, params, next=null)=>{
    let updateData = (data)=>{
        console.log('new', data);
        props.endFetching();
        getAllTechnologies(props, next);
    }
    fetchAPIData(props, '/technologies/', updateData, {
        method: 'POST',
        params: params,
    });
}

export const updateTechnology = (props, id, params, next=null)=>{
    let updateData = (data)=>{
        console.log('updated', data);
        props.endFetching();
        getAllTechnologies(props, next);
    }
    fetchAPIData(props, `/technologies/${id}`, updateData, {
        method: 'PUT',
        params: params,
    });
}

export const removeTechnologyById = (props, id, next=null)=>{
    let updateData = (data)=>{
        console.log('deleted', data);
        props.endFetching();
        getAllTechnologies(props, next);
    }
    fetchAPIData(props, `/technologies/${id}`, updateData, {
        method: 'DELETE',
    });
}
