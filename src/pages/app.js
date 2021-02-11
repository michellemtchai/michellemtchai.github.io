import React from 'react';
import Projects from '../components/projects';

class App extends React.Component {
	render() {
		return <Projects {...this.props}/>;
  	}
}

export default App;
