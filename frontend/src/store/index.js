import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import spotsReducer from './spots';
import usersReducer from './users';
import reviewsReducer from './reviews';
import navigationReducer from './navigation';
import disabledDatesReducer from './disabledDates';

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  user: usersReducer,
  reviews: reviewsReducer,
  navigation: navigationReducer,
  disabledDates: disabledDatesReducer
});
let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

  export default configureStore;
