import { fetchAPIData } from '../shared/network';

export const getAllTechnologies = (props)=>{
    fetchAPIData(props, '/technologies', props.setData, {
        formatData: (data)=>{
            return {
                technologies: data
            }
        }
    });
}

export const createTechnology = (props, params)=>{
    let updateData = (data)=>{
        console.log('new', data);
        props.endFetching();
        getAllTechnologies(props);
    }
    fetchAPIData(props, '/technologies/', updateData, {
        method: 'POST',
        params: params,
    });
}

export const updateTechnology = (props, id, params)=>{
    let updateData = (data)=>{
        console.log('updated', data);
        props.endFetching();
        getAllTechnologies(props);
    }
    fetchAPIData(props, `/technologies/${id}`, updateData, {
        method: 'PUT',
        params: params,
    });
}

export const removeTechnologyById = (props, id)=>{
    let updateData = (data)=>{
        console.log('deleted', data);
        props.endFetching();
        getAllTechnologies(props);
    }
    fetchAPIData(props, `/technologies/${id}`, updateData, {
        method: 'DELETE',
    });
}
