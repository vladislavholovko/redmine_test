import React from 'react';
import ReactDOM from 'react-dom';
//-------------redux
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import reducers from './reducers'
//-------------router
// import createHistory from 'history/createBrowserHistory'
// import {ConnectedRouter, routerMiddleware} from 'react-router-redux'
//-------------styles
import './index.css';
import 'semantic-ui/dist/semantic.min.css';
//-------------
import * as serviceWorker from './serviceWorker';
//-------------
import Wrapper from './components/wrapper'
//-------------
// export const history = createHistory()
// const middleware = routerMiddleware(history)

export const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    // compose(applyMiddleware(middleware))
)
//-------------

ReactDOM.render(
    <Provider store={store}>
        <Wrapper/>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
