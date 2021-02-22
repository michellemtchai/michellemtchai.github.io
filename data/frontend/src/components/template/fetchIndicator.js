import React from 'react';

class FetchIndicator extends React.Component {
	render() {
        let fetching = this.props.state.fetching;
		return (
            fetching > 0 ?
            <p className='fetching'>
                Data Fetching from {fetching} resources...
            </p>:
            ''
        );
  	}
}

export default FetchIndicator;
