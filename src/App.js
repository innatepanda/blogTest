import {Provider} from 'react-redux'
import {getProps, getStore} from './component/Config/firebase-redux'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import RouteManager from '../src/layout/RouterManager/RouterManager'
import Heading from "../src/layout/homepage/heading/Heading"
function App() {
  return (
    <div className="App">
      <Provider store={getStore()}>
        <ReactReduxFirebaseProvider {...getProps()}>
            <Router>  
               
              <RouteManager/>
            </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    </div>
  );
}

export default App;
