
/**
 * @file Router.jsx
 * @author Michael Laucella
 * @desc router for page loading
 */

import React from 'react';
import View from './View.jsx';

import { 
    BrowserRouter as Router, 
    Route, 
    Redirect, 
    Switch 
} from 'react-router-dom';

/**
 * @class Router
 * @desc a stateless component that handles page routing
 * @param {Object} props the properties passed to the component
 */
const AppRouter = (props) => {
    return (
        <Router>
            <Switch>
                <Route path="/display/:id"  component={View}/>
                <Route path="/display"      component={View}/>
                <Redirect from="*" to="/display"/>
            </Switch>
        </Router>
    )
}

export default AppRouter;