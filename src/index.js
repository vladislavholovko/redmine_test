import React from "react";
import ReactDOM from "react-dom";
//-------------redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
//-------------styles
import "./index.css";
import "semantic-ui/dist/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
//-------------
import * as serviceWorker from "./serviceWorker";
//-------------
import Wrapper from "./components/wrapper";
import { BrowserRouter as Router } from "react-router-dom";
//-------------

export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
//-------------

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable={false}
        pauseOnHover
      />
      <Wrapper />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
