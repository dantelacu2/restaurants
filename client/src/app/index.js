import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { NavbarPage } from '../components'
import { FooterPage } from '../components';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { RestaurantsList, RestaurantsInsert, RestaurantsUpdate, Masthead, AdminPage, StatusUpdate } from '../pages'
import 'mdbreact/dist/css/mdb.css';
import Auth from '../pages/auth/Auth';
import Logout from '../pages/auth/Logout/Logout';

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <div>
        <Router>
            <NavbarPage />
            <Switch>
                <PublicRoute restricted={false}  path="/" exact component={Masthead}/>
                <PublicRoute restricted={true} path="/auth" exact component={Auth} />
                <PublicRoute path="/restaurants/list" exact component={RestaurantsList} />
                <PrivateRoute path="/restaurants/create" component={RestaurantsInsert} />
                <PublicRoute
                    path="/restaurants/update/:id"
                    exact
                    component={RestaurantsUpdate}
                />
                <PublicRoute path="/logout" component={Logout}/>
                <PrivateRoute path="/admin" exact component={AdminPage}/>
                <PrivateRoute path="/statusUpdate" exact component={StatusUpdate}/>
            </Switch>
            
        </Router>
        <FooterPage time="time"/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null
    };
  };
  
export default withRouter( connect( mapStateToProps, null )( App ) );
