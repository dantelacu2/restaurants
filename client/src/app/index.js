import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { RestaurantsList, RestaurantsInsert, RestaurantsUpdate, Masthead } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
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
    )
}

export default App
