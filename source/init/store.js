// Core
import { createStore } from 'redux';

// Roots
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

// Middleware
import { enhancedStore, sagaMiddleware, history } from './middleware/core';

const store = createStore(rootReducer, enhancedStore);

sagaMiddleware.run(rootSaga);

export { store, history };
