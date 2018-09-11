// Core
import { compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';

// Middleware
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { customThunk, notifications } from './custom';

const logger = createLogger({
    duration:  true,
    collapsed: true,
    colors:    {
        title:     () => '#139BFE',
        prevState: () => '#1C5FAF',
        action:    () => '#149945',
        nextState: () => '#A47104',
        error:     () => '#ff0005',
    },
});
const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, customThunk, routerMiddleware];

if (__DEV__) {
    middleware.push(notifications);
    middleware.push(logger);
}

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = __DEV__ && devtools ? devtools : compose;

const enhancedStore = composeEnhancers(applyMiddleware(...middleware));

export { enhancedStore, sagaMiddleware, history };
