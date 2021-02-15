import React from 'react';
import NavBar from '../components/navBar';
import Error from '../components/error';

import { Switch, Route } from 'react-router-dom';
import { routes } from '../config/routes';

class App extends React.Component {
	render() {
		return(
            <div className='content'>
                <NavBar {...this.props}/>
                <Error {...this.props}/>
                <Switch>
                    {Object.keys(routes).map((key,i)=>
                        <Route key={'route-'+i}
                            exact={routes[key].exact? true: false}
                            path={key}
                            component={()=>
                                (new routes[key].component(this.props)).render()
                            }
                        />
                    )}
                </Switch>
            </div>
        );
  	}
}

export default App;
