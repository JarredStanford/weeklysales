import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, path, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isAuthenticated) {
                    return <Component {...props} />
                }
                return <Redirect to='/login' />
            }} />
    )
}

export default PrivateRoute