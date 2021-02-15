import React from 'react';

class Sample extends React.Component {
	render() {
        let data = this.props.state.data;
		return Object.keys(data).length > 0 ?
			<div>
                <p>
                    This is a sample component.
                </p>
			</div> :
            '';
  	}
}

export default Sample;
