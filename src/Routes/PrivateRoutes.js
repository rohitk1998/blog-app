import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoutes({component: Component, ...rest}) {
    
    const user_role = localStorage.getItem('User_Role')
    console.log(user_role);
    return (
        <Route {...rest} render={props => (
            user_role !== null ?
                <Component {...props} />
            : <Redirect to="/Login" />
        )} />
    )
}

export default PrivateRoutes;
