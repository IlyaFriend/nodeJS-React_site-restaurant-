import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Users from "./components/Users";
import Dish from "./components/subcomponents/Dish";
import Dishes from "./components/Dishes";
import getJWT from "./utils/getJWT";
import Header from "./components/subcomponents/Header";
import Footer from "./components/subcomponents/Footer";
import CreateDish from "./components/CreateDish";
import UserMenu from "./components/UserMenu";
import EditDish from "./components/EditDish";
import EditComment from "./components/EditComment";
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const cookies = new Cookies();
  const [isAuthorized, setIfAuthorized] = useState(getJWT());
  const [isAdmin, setIfAdmin] = useState(cookies.get("isAdmin") || false);
  const [userId, setUserId] = useState(cookies.get("userId") || "");

  return (
    <div className="App">
      <Router>
        <Header isAuthorized={isAuthorized} setIfAuthorized={setIfAuthorized} isAdmin={isAdmin} setIfAdmin={setIfAdmin}/>
        <Switch>
          {isAuthorized ? (
              isAdmin ? (
                <div style={{'paddingBottom':'100px'}}>
                  <Route path="/Dish/:dishId">
                    <Dish userId={userId} isAdmin={isAdmin} />
                  </Route>
                  <Route path="/edit-Dish/:dishId">
                    <EditDish isAdmin={isAdmin} />
                  </Route>
                  <Route path="/edit-comment/:dishId/:commentId">
                    <EditComment userId={userId} />
                  </Route>
                  <Route exact path="/dishes">
                    <Dishes isAdmin={isAdmin} />
                  </Route>
                  <Route path="/users">
                    <Users />
                  </Route>
                  <Route path="/create">
                    <CreateDish />
                  </Route>
                  <Route exact path={"/"}>
                    <UserMenu isAuthorized={isAuthorized}/>
                  </Route>
                  <Redirect push to={"/"} />
                </div>
              ) : (
                <div style={{'paddingBottom':'100px'}}>
                  <Route path="/Dish/:dishId">
                    <Dish userId={userId} isAdmin={false} />
                  </Route>
                  <Route path="/edit-comment/:dishId/:commentId">
                    <EditComment userId={userId} />
                  </Route>
                  <Route path="/dishes">
                    <Dishes isAdmin={isAdmin} />
                  </Route>
                  <Route exact path={"/"}>
                    <Dishes isAdmin={isAdmin} />
                  </Route>
                  <Redirect push to={"/dishes"} />
                </div>
              )
            ) : (
              <div>
                <Route path="/login">
                    <Login setIfAuthorized={setIfAuthorized} setIfAdmin={setIfAdmin} setUserId={setUserId} />
                </Route>
                <Route path="/signup">
                    <Signup setIfAuthorized={setIfAuthorized} setUserId={setUserId} />
                </Route>
                <Redirect push to={"/"} />
              </div>
          )}
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;