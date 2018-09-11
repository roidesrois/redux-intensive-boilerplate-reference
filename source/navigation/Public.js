// Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';

// Instruments
import { book } from './book';

// Components
import { Login, Signup } from 'pages';

export default class Public extends Component {
    render () {
        return (
            <Switch>
                <Route exact component = { Login } path = { book.login } />
                <Route exact component = { Signup } path = { book.signup } />
                <Redirect to = { book.login } />
            </Switch>
        );
    }
}
