import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import RoutingBackend from "./backend/Routing";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";


export default function MainRouter() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/admin" component={RoutingBackend}></Route>
                    <Route path="/" exact component={App}></Route>
                </Switch>
            </Router>


        </>
    );

    

}

