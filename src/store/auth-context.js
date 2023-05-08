/* with const AuthContextProvider below, can actually import useState here inside of the 
auth-context.js file. */
import React, { useState } from "react";

/* On react, going to call createContext -> which creates a Context object */
/* createContext takes a default context and Context here is just your App or component 
white State. Up to you what that state should be. */
/* Often will be an object -> for example in our case we'll manage the isLoggedIn state,
and set this to false initially. */

/* What we get back from createContext is interesting. It will be a component/ or it will 
an object that also contains components. AuthContext itself is not a component, it is an object
that will contain a component. */
const AuthContext = React.createContext({
  isLoggedIn: false,
  /* good idea to add your functions like onLogout in my case to the default context when you 
  create a context -> store a dummy function. This is good for IDE auto-completion. */
  /* Why? IDE is looking at this default context object -> find out what you are able to access on your 
  context */
  onLogout: () => {},
});

/* we are exporting AuthContextProvider component in addition to the default as a named export */
export const AuthContextProvider = (props) => {
  return <AuthContext.Provider>{props.children}</AuthContext.Provider>;
};

export default AuthContext;

//NOTES ABOUT auth-context

/* So now we can import this specific Context object. Then use Context in your app, I
need to do two things. 
1) Need to provide it, which basically tells React, "Hey, here's my Context" . All components that 
are wrapped by it should have access to it. 
2) Besides providing, you then need to consume it. You need to hook into it, you need to listen to 
it if you want to call it like this. */
/* Providing is always the first step. Providing means you wrap in JSX code all the components that
the components that should be able to tap into that Context - so should be able to listen to that
context. */
/* Any component thats not wrapped will not be able to listen */
