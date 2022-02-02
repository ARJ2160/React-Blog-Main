import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Create from "./components/Create";
import BlogDetails from "./components/BlogDetails";
import NotFound from "./components/NotFound";
import EditPosts from "./components/EditPosts";
import SignIn from "./components/SignIn";
import Signup from "./components/SignUp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <Navbar />

        <div className="content">
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/create"><Create /></Route>
            <Route path="/postsdata/update/:id"><EditPosts /></Route>        
            <Route path="/postsdata/:id"><BlogDetails /></Route>
            <Route path="/signin"><SignIn /></Route>       
            <Route path="/signup"><Signup /></Route>       
            <Route path="*"><NotFound /></Route>
          </Switch>
        </div>

        <div></div>
      </div>
    </Router>
  );
}

export default App;
