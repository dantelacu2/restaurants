import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavbarPage } from '../components'
import { FooterPage } from '../components';

import { RestaurantsList, RestaurantsInsert, RestaurantsUpdate, Masthead } from '../pages'
import 'mdbreact/dist/css/mdb.css';

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <div>
        <Router>
            <NavbarPage />
            <Switch>
                <Route path="/" exact component={Masthead}/>
                <Route path="/restaurants/list" exact component={RestaurantsList} />
                <Route path="/restaurants/create" exact component={RestaurantsInsert} />
                <Route
                    path="/restaurants/update/:id"
                    exact
                    component={RestaurantsUpdate}
                />
            </Switch>
            
        </Router>
        <FooterPage time="time"/>
        </div>
    )
}

export default App
