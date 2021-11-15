import React, { useContext, useEffect, useState, Fragment } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router ,Redirect } from "react-router-dom";
import Navbar from "./nav/Navbar.jsx";

import Footer from "./main/footer.jsx";
import HomeLayout from "./homeLayout.jsx";
import Mission from "./main/aboutUs/Mission.jsx";
import SchoolStaffMembers from "./main/aboutUs/schoolStaffMembers.jsx";
import Accomplishment from "./main/aboutUs/Accomplishment.jsx";
import "./main/aboutUs/AboutUs.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Ict from "./Department/ict.jsx";
import Bigdata from "./Department/Bigdata.jsx";
import Finance from "./Department/Finance.jsx";
import NewsEvents from "./events/NewsEvents.jsx";
import HomeBackEnd from "./backend/homeBackEnd.jsx";
import Contact from "./Contact.jsx";
import Register from "./Auth/register.jsx";
import Login from "./Auth/login.jsx";
import Sethome from "./backend/Sethome.jsx";
// import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { useRouteMatch } from "react-router-dom";
import RoutingBackend from "./backend/Routing.jsx";

import { useAuth, AuthContextProvider } from "./context/AuthContext.js";

const App = (props) =>
{
    //  const { user } = useAuth();
    // console.log(user );

    //  const [isLogin, setLogin] = useState(false);
    //  const [user, setUser] = useState([]);

    //  useEffect(() => {
    //      fetchUser();
    //  }, []);

    //  const fetchUser = async () => {
    //      await axios
    //          .get("/api/user")
    //          .then((res) => {
    //              if (res.status == 200) {
    //                  setUser(res.data);
    //                  setLogin(true);
    //              } else if (res.status == 401) {
    //                  setUser([]);
    //                  setLogin(false);
    //              }
    //          })
    //          .catch((error) => {
    //              console.log(error);
    //          });
    //  };

 
   
    return (
        <>
            <AuthContextProvider>
                {useRouteMatch("/backend")?.isExact ? null : <Navbar />}

                <Route path="/backend">
                   <HomeBackEnd /> 
                </Route>
                <Route path="/setHomeSection" component={Sethome}></Route>

                <Switch>
                    <React.Fragment>
                        <Route path="/" exact component={HomeLayout}></Route>
                        <Route path="/ict" component={Ict} />
                        <Route path="/mission" component={Mission}></Route>
                        <Route path="/contact" component={Contact}></Route>
                        <Route path="/bigdata" component={Bigdata}></Route>
                        <Route path="/Finance" component={Finance}></Route>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/register" component={Register}></Route>
                        <Route path="/news" component={NewsEvents}></Route>
                        <Route
                            path="/accomplishment"
                            component={Accomplishment}
                        ></Route>
                        <Route
                            path="/staff"
                            component={SchoolStaffMembers}
                        ></Route>
                        {useRouteMatch("/backend")?.isExact ? null : <Footer />}
                    </React.Fragment>
                </Switch>
            </AuthContextProvider>
        </>
    );
};

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(
        <Router>
            <App />{" "}
        </Router>,
        document.getElementById("root")
    );
}
