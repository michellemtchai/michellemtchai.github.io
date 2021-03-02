import { fetchAPIData } from '../shared/network';

export const getAllProjects = (props)=>{
    fetchAPIData(props, '/projects', props.setData, {
        formatData: (data)=>{
            let mapping = {};
            data.forEach((_,i)=>{
                mapping[data[i]._id] = data[i];
            });
            return {
                projects: mapping
            }
        }
    });
}

export const createProject = (props, params)=>{
    let updateData = (data)=>{
        console.log('new', data);
        props.endFetching();
        getAllProjects(props);
    }
    fetchAPIData(props, '/projects/', updateData, {
        method: 'POST',
        params: params,
    });
}

export const updateProject = (props, id, params)=>{
    let updateData = (data)=>{
        console.log('updated', data);
        props.endFetching();
        getAllProjects(props);
    }
    fetchAPIData(props, `/projects/${id}`, updateData, {
        method: 'PUT',
        params: params,
    });
}

export const removeProjectById = (props, id)=>{
    let updateData = (data)=>{
        console.log('deleted', data);
        props.endFetching();
        getAllProjects(props);
    }
    fetchAPIData(props, `/projects/${id}`, updateData, {
        method: 'DELETE',
    });
}
