import {Provider} from 'react-redux'
import {getProps, getStore} from './component/Config/firebase-redux'
import './App.css';
import Main from "./layout/homepage/main/Main"
import Heading from "./layout/homepage/heading/Heading"
import ViewArticle from "./layout/ViewArticle/ViewArticle"
import NewArticle from "./layout/NewArticle/NewArticle"
import 'bootstrap/dist/css/bootstrap.min.css';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Provider store={getStore()}>
        <ReactReduxFirebaseProvider {...getProps()}>

        
      <Router>
      <Heading />
        <Switch>
            <Route path="/" exact>
            <Main />
            </Route>
            <Route path="/article/:id" >
            <ViewArticle />
            </Route>
            <Route path="/new-article" >
            <NewArticle />
            </Route>
        </Switch>
      </Router>
      </ReactReduxFirebaseProvider>

      </Provider>
      
     
      
    </div>
  );
}

export default App;
