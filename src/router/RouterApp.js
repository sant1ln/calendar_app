import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import { CalendarScreen } from '../components/CalendarScreen'
import { Login } from '../components/Login'

export const RouterApp = ()=>(
    
    <Router>
        <div>
        <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/" component={CalendarScreen} />
        </Switch>
        </div>
    </Router>
)
