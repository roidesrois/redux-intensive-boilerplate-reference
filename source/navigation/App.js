// Core
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

// Components
import { Loading } from '../components';

// Routing
import Public from './Public';
import Private from './Private';

// Actions
import { socketActions } from '../bus/socket/actions';
import { authActions } from '../bus/auth/actions';
import { socket, joinSocketChannel } from '../init/socket';

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.get('isAuthenticated'),
        isInitialized:   state.auth.get('isInitialized'),
    };
};

const mapDispatchToProps = {
    initializeAsync:  authActions.initializeAsync,
    listenConnection: socketActions.listenConnection,
    listenPosts:      socketActions.listenPosts,
};

@withRouter
@connect(
    mapStateToProps,
    mapDispatchToProps
)
@hot(module)
export default class App extends Component {
    componentDidMount () {
        const { initializeAsync, listenConnection } = this.props;

        joinSocketChannel();
        listenConnection();
        initializeAsync();
    }

    componentWillUnmount () {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    render () {
        const { isAuthenticated, isInitialized, listenPosts } = this.props;

        if (!isInitialized) {
            return <Loading />;
        }

        return isAuthenticated ? <Private listenPosts = { listenPosts } /> : <Public />;
    }
}
