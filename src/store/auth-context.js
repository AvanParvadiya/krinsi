import React, { useState, useEffect ,useCallback} from "react";
let logOutTimer;
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
  return remainingDuration;
};

const retriveStoredToken = () => {
  debugger
  const initialToken = localStorage.getItem("token");
  const storedExprirationDate = parseInt(localStorage.getItem("expirationTime") || 0);

  const remainTime = calculateRemainingTime(storedExprirationDate);
  if (remainTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return {
    token: initialToken,
    duration: remainTime,
  };
};
export const AuthContextProvider = (props) => {
  const tokenData = retriveStoredToken();
  let initialToken;
  if (initialToken) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler =useCallback( () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    if (logOutTimer) {
      clearTimeout(logOutTimer);
    }
  },[]);

  const loginHandler = (token) => {
    setToken(token);
    const expirationTime=30
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const remainTime = calculateRemainingTime(expirationTime);
    // debugger;
    logOutTimer = setTimeout(logoutHandler, remainTime); // call logoutHandler for log out user after token expires // remainTime=> will navigate user after logout automatic to login page
    // use can't access page after logout

    // settimeout returns such identifier
  };

  useEffect(() => {
    if (tokenData) {
      logOutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData,logoutHandler]);
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;