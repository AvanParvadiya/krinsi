import React from "react";
import { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  token: "",
  login: (token) => {},
  logout: () => {},
});
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpTime - currentTime;
//   console.log(remainingDuration);
  return remainingDuration;
};

const retriveStoredToken = () => {
  const initialToken = localStorage.getItem("token");
  const storedExprirationDate = localStorage.getItem("expirationTime");
  const remainTime = calculateRemainingTime(storedExprirationDate);

  if (remainTime < 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return {
    token: initialToken,
    duration:remainTime
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retriveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const loginHandler = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", 60 * 60);
    setToken(token);
    // const remainTime = calculateRemainingTime(60*60);
    // logOutTimer = setTimeout(logoutHandler, remainTime);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
//   useEffect(()=>{
//     if(tokenData){
//         logOutTimer= setTimeout(logoutHandler, tokenData.duration);
//     }
//   },[tokenData])
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
