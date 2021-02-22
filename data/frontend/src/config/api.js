import * as items from '../api/items';

export const api = {
    ...items,
}

let fetchList = [
    api.getAllItems
];

export const fetchAll = (props)=>{
    fetchList.forEach(getData=>getData(props));
}