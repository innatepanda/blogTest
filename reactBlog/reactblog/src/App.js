import logo from './logo.svg';
import './App.css';
import Main from "./layout/homepage/main/Main"
import Heading from "./layout/homepage/heading/Heading"
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
    <div className="App">
      <Heading/>
      <Main/>
    </div>
  );
}

export default App;
