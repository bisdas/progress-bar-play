import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App/App'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
   <App apiUrl="http://pb-api.herokuapp.com/bars"/>, document.getElementById('root') as HTMLElement
);

registerServiceWorker();
