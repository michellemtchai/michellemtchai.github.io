import { fetchAPIData } from '../shared/network';

export const getAllProjects = (props, next=null)=>{
    fetchAPIData(props, '/projects', props.setData, {
        formatData: (data)=>{
            let mapping = {};
            data.forEach((_,i)=>{
                mapping[data[i]._id] = data[i];
            });
            return {
                projects: mapping
            }
        },
        next: next,
    });
}

export const createProject = (props, params, next=null)=>{
    let updateData = (data)=>{
        console.log('new', data);
        props.endFetching();
        getAllProjects(props, next);
    }
    fetchAPIData(props, '/projects/', updateData, {
        method: 'POST',
        params: params,
    });
}

export const updateProject = (props, id, params, next=null)=>{
    let updateData = (data)=>{
        console.log('updated', data);
        props.endFetching();
        getAllProjects(props, next);
    }
    fetchAPIData(props, `/projects/${id}`, updateData, {
        method: 'PUT',
        params: params,
    });
}

export const removeProjectById = (props, id, next=null)=>{
    let updateData = (data)=>{
        console.log('deleted', data);
        props.endFetching();
        getAllProjects(props, next);
    }
    fetchAPIData(props, `/projects/${id}`, updateData, {
        method: 'DELETE',
    });
}
