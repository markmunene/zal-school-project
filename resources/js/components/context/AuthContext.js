
import React, { useState, useEffect, useContext } from 'react'

import axios from 'axios';

const AuthContext = React.createContext();

export function  useAuth ()
{
    return useContext(AuthContext)
}

export function AuthContextProvider({children})
{
  const [isLogin, setLogin] = useState(false);
const [user, setUser] = useState([]);

 useEffect(() => {
     fetchUser();
 }, []);

 const fetchUser = async () => {
    //  await axios
    //      .get("/api/user")
    //      .then((res) => {
    //          if (res.status == 200) {
    //              setUser(res.data);
    //             setloginUser(true);
    //          } else if (res.status == 401) {
    //              setUser([]);
    //              setLogin(false)
    //          }
    //      })
    //      .catch((error) => {
    //          console.log(error);
    //      });
 };
// console.log(user);
  
     function setloginUser(bol) {
        return setLogin(bol);
    }



    return (
        <AuthContext.Provider value={{ isLogin, setloginUser, user }}>
            {children}
        </AuthContext.Provider>
    );
}
