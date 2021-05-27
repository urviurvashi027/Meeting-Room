import { useEffect } from 'react';
import Home from './pages/home';
import AddMeeting from './pages/addMeeting';
import './App.css';
import { Route, BrowserRouter as Router} from 'react-router-dom';


function App() {

  useEffect(() => {
    console.log("componet App Did Mount");
  },[])


  return (
      <div className="App">
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/add-meeting" component={AddMeeting}/>
        </Router>
      </div>
  );
}


export default App;
