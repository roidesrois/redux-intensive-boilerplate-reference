// Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';

// Instruments
import { book } from './book';
import { socket } from '../init/socket';

// Containers
import { Feed, Profile, NewPassword } from '../pages';

export default class Private extends Component {
    componentDidMount () {
        this.props.listenPosts();
    }

    componentWillUnmount () {
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
    }

    render () {
        return (
            <Switch>
                <Route exact component = { Feed } path = { book.feed } />
                <Route exact component = { Profile } path = { book.profile } />
                <Route exact component = { NewPassword } path = { book.newPassword } />
                <Redirect to = { book.feed } />
            </Switch>
        );
    }
}
