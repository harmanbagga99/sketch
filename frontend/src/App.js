import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Home from "./container/home";
import "bootstrap/dist/css/bootstrap.min.css";
import AddSketch from "./container/addSketch";
import ListSketch from "./container/listSketch";
import EditSketch from "./container/editSketch";
import { Redirect } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <ProtectedRoute path="/new" exact component={AddSketch} />
        <ProtectedRoute path="/list" exact component={ListSketch} />
        <ProtectedRoute path="/edit/:id" exact component={EditSketch} />

      </Switch>
    </BrowserRouter>
  );
}

 const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.token) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};


export default App;
