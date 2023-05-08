/* useContext hook -> allows us to use the Context -> tap into a context and listen to it */
import React, { useContext } from "react";
import AuthContext from "../store/auth-context";
import classes from "./Navigation.module.css";

const Navigation = () => {
  /* Using the useContext hook is simple -> call useContext in your React component function,
  and pass the context -> a pointer at the context you want to use to it. So in my case, I'm pointing
  towards AuthContext. */
  /* what I get back (on the left hand sided again) is the context value -> ctx - so can use to replace
  the props code in the JSX below in this navigation file. */
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            {/* replacing props.onLogout with ctx.onLogout -> this will work because on the context 
            object */}
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
