import React from 'react';
import NavBar from '../components/template/navBar';
import Error from '../components/template/error';
import FetchIndicator from '../components/template/fetchIndicator';

import { Switch, Route } from 'react-router-dom';
import { routes } from '../config/routes';
import { fetchAll } from './api';

class App extends React.Component {
    route = (key, i)=>{
        let Component = routes[key].component;
        return (<Route key={'route-'+i}
            exact={routes[key].exact? true: false}
            path={key}
            component={()=><Component {...this.props}/>}
        />);
    }

    componentDidMount(){
        fetchAll(this.props);
    }

    render() {
        return(
            <div className='content'>
                <NavBar {...this.props}/>
                <Error {...this.props}/>
                <FetchIndicator {...this.props}/>
                <Switch>
                    {Object.keys(routes).map((key,i)=>
                        this.route(key,i)
                    )}
                </Switch>
            </div>
        );
    }
}

export default App;
