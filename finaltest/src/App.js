import logo from './logo.svg';
import './App.css';
import Main from "./layout/homepage/main/Main"
import Heading from "./layout/homepage/heading/Heading"
import ViewArticle from "./layout/ViewArticle/ViewArticle"
import NewArticle from "./layout/NewArticle/NewArticle"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
      <Heading />
        <Switch>
            <Route path="/" exact>
            <Main />
            </Route>
            <Route path="/article/:id/:title" >
            <ViewArticle />
            </Route>
            <Route path="/new-article" >
            <NewArticle />
            </Route>
        </Switch>
      </Router>
     
      
    </div>
  );
}

export default App;
