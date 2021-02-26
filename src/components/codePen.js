import React from 'react';
import { paramsToQueryString } from './shared/helpers';

class Codepen extends React.Component {
    constructor(props) {
      super(props);

      this.thumbnailUrl = this.thumbnailUrl.bind(this);
      this.projectUrl = this.projectUrl.bind(this);
    }
    thumbnailUrl(){
        let params = {
            fit: 'cover',
            format: 'auto',
            ha: false,
            height: 360,
            quality: 75,
            v: 2,
            width: 640
        }
        let code = this.props.code;
        return `https://assets.codepen.io/4929420/internal/screenshots/pens/${code}.default.png?${paramsToQueryString(params)}`;
    }
    projectUrl(){
        let code = this.props.code;
        let user = this.props.username;
        return `https://codepen.io/${username}/full/${code}`;
    }
	render() {
        return (
            <div>
                <h1>Codepen Project</h1>
                <img src={this.thumbnailUrl()}/>
                <a href={this.projectUrl()} />Link</a>
            </div>
        );
  	}
}

export default Codepen;
