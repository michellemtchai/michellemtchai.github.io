import React from 'react';
import { withRouter } from "react-router";
import Template from '../components/template/Template';

import { Switch, Route } from 'react-router-dom';
import { routes } from '../config/';

class App extends React.Component {
    route = (key, i)=>{
        let Component = withRouter(routes[key].component);
        let pageTemplate = ()=>(
            <Template {...this.props}>
                <Component {...this.props}/>
            </Template>
        );
        return (<Route key={'route-'+i}
            exact={routes[key].exact? true: false}
            path={key}
            component={pageTemplate}
        />);
    }

    render() {
        return(
            <>
                <Switch>
                    {Object.keys(routes).map((key,i)=>
                        this.route(key,i)
                    )}
                </Switch>
            </>
        );
    }
}

export default withRouter(App);
