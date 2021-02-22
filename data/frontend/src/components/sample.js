import React from 'react';
import { api } from '../config/api';

class Sample extends React.Component {
    input = React.createRef();
    edit = React.createRef();
    state = {
        index: -1
    }

    editItem = (index)=>{
        this.setState({
            index: index,
        })
    }
    cancelEdit = ()=>{
        this.setState({
            index: -1,
        })
    }
    createItem = ()=>{
        api.createItem(this.props, {
            name: this.input.current.value,
        })
    }
    updateItem = (item)=>{
        api.updateItem(this.props, item._id, {
            name: this.edit.current.value,
        });
        this.setState({
            index: -1
        });
    }
    deleteItem = (item)=>{
        api.removeItemById(this.props, item._id);
    }
	render() {
        let data = this.props.state.data;
		return (Object.keys(data).length > 0 ?
			<div>
                <p>{text}</p>
                {Items(this, data)}
                {ItemCreator(this)}
			</div> :
            ''
        );
  	}
}

const text = 'This is a sample component. It lists the items from route GET /items';

const Items = (self, data)=>(
    <ul>
        {data.items.map((item, i)=>
            <li key={'item-'+i}>
                {self.state.index != i?
                    Item(self, item, i):
                    ItemEditor(self, item)
                }
            </li>
        )}
    </ul>
);

const Item = (self, item, i)=>(
    <span>
        {item.name}
        <button onClick={()=>self.editItem(i)}>
            Edit Item
        </button>
        {DeleteButton(self, item)}
    </span>
);

const ItemCreator = (self)=>(
    <div>
        <input ref={self.input} type='text'/>
        <button onClick={self.createItem}>
            Create New Item
        </button>
    </div>
);

const ItemEditor = (self, item)=>(
    <span>
        <input ref={self.edit}
            defaultValue={item.name}
            type='text'/>
        <button onClick={()=>self.updateItem(item)}>
            Save Changes
        </button>
        <button onClick={self.cancelEdit}>
            Cancel
        </button>
    </span>
);

const DeleteButton = (self, item)=>(
    <button onClick={()=>self.deleteItem(item)}>
        Delete
    </button>
);

export default Sample;
