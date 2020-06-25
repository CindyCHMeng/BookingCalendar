import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { ConnectedRouter as Router, routerMiddleware } from 'connected-react-router';
// import { createBrowserHistory } from 'history';
import createRootReducer from './reducers';
import rootReducer from './reducers';
import rootSaga  from './sagas';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'
import App from './components/ComponentContainer';

import '@fortawesome/fontawesome-free/js/all.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const sagaMiddleware = createSagaMiddleware();
// const history = createBrowserHistory();

// const preloadedState = window.__PRELOADED_STATE__ || {};
// delete window.__PRELOADED_STATE__;

const store = createStore(
	createRootReducer(rootReducer),
	applyMiddleware(sagaMiddleware),
  // preloadedState,
  // compose(
  //   applyMiddleware(sagaMiddleware),
  //   applyMiddleware(
  //     routerMiddleware(history)
  //   )
  // )
);

sagaMiddleware.run(rootSaga);

export default class Main extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Provider store={store}>
				<I18nextProvider i18n={ i18n }>
					<App />
				</I18nextProvider>
			</Provider>
		);
	};
}

ReactDOM.render(<Main />, document.getElementById("root"));