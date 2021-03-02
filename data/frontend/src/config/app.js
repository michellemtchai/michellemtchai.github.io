import React from 'react';
import { withRouter } from "react-router";
import Template from '../components/template/template';

import { Switch, Route } from 'react-router-dom';
import { routes } from '../config/routes';
import { fetchAll } from './api';

class App extends React.Component {
    route = (key, i)=>{
        let Component = withRouter(routes[key].component);
        let pageTemplate = ()=>(
            <Template {...this.props}
                content={()=><Component {...this.props}/>}
            />
        );
        return (<Route key={'route-'+i}
            exact={routes[key].exact? true: false}
            path={key}
            component={pageTemplate}
        />);
    }

    componentDidMount(){
        fetchAll(this.props);
    }

    render() {
        let data = this.props.state.data;
        return(
            <div className='content'>
                <Switch>
                    {Object.keys(routes).map((key,i)=>
                        this.route(key,i)
                    )}
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
