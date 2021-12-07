import { useContext, useRef, useState } from "react";
import AuthContext from "../store/auth-context";
import classes from "./AuthForm.module.css";
import { httpLogin } from "../Actions/action";
import { useHistory } from "react-router";

export const AuthForm = (props) => {
  const emailRef = useRef("");
  const history = useHistory();
  const passRef = useRef("");
  const [emailError, setEmailError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const currentEmail = emailRef.current.value;
    const currentPass = passRef.current.value;
    if (currentEmail === "") {
      setEmailError(false);
      return;
    }
    setEmailError(true);
    if (currentPass === "") {
      setPasswordError(false);
      return;
    }
    setPasswordError(true);
    if (!emailError && !passwordError) {
      //call api
      httpLogin({
        email: currentEmail,
        password: currentPass,
      })
        .then((res) => {
          authCtx.login(res.token);
          history.replace("/");
         
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <h3>Log in</h3>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          ref={emailRef}
        />
        {emailError === false && (
          <p className={classes["input-error"]}>Please enter email address</p>
        )}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          ref={passRef}
        />
        {passwordError === false && (
          <p className={classes["input-error"]}>Plese enter password</p>
        )}
      </div>

      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn-dark btn-lg btn-block">
        Sign in
      </button>
      <p className="forgot-password text-right">
        Forgot <span>password?</span>
      </p>
    </form>
  );
};
