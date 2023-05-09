/* make auth-context stand alone file -> manages entire login state in AuthContextProvider component */
//Introducing React Context
/* Problem -> passing a lot of data through a lot of components via props -> good example of this 
  is our 'isLoggedIn' state and the login functions. */
/* We're managing this state in the app component, because I lifted this state up to that component.
  We need this isLoggedIn state and the functions to change it everywhere in this application. */

//REACT CONTEXT EXPLANATION:
/* React context -> component-wide, behind the scenes state storage. This allows us to trigger an 
  action in that component wide state storage, then directly pass that to the component that is interested
  without building such long prop chains. */

/* with const AuthContextProvider below, can actually import useState here inside of the 
auth-context.js file. */
import React, { useState, useEffect } from "react";

/* On react, going to call createContext -> which creates a Context object */
/* createContext takes a default context and Context here is just your App or component 
white State. Up to you what that state should be. */
/* Often will be an object -> for example in our case we'll manage the isLoggedIn state,
and set this to false initially. */

/* What we get back from createContext is interesting. It will be a component/ or it will 
an object that also contains components. AuthContext itself is not a component, it is an object
that will contain a component. */
/* We now have a stand alone file which manages the entire login state in the AuthContextProvider 
component, and which also sets up all the context. */
const AuthContext = React.createContext({
  isLoggedIn: false,
  /* good idea to add your functions like onLogout in my case to the default context when you 
  create a context -> store a dummy function. This is good for IDE auto-completion. */
  /* Why? IDE is looking at this default context object -> find out what you are able to access on your 
  context */
  onLogout: () => {},
  onLogin: (email, password) => {},
});

/* we are exporting AuthContextProvider component in addition to the default as a named export */
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* useEffect code needs to go into our AuthContextProvider */
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    /* so here clear data in the logoutHandler */
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    /* set our data in the login Handler */
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };
  return (
    //MAKING CONTENT DYNAMIC
    /* We can set up dynamic context -> don't just pass data to our components but also functions. On 
      AuthContext provider as well as passing down isLoggedIn, pass down onLogout -> can point at 
      the logoutHandler */
    /* If I do that, every listening component -> every component that listens to Auth context will be 
      able to utilise logoutHandler simply through the onLogout context value. */
    <AuthContext.Provider
      value={{
        /* isloggedIn = set to the isLoggedIn state */
        isLoggedIn: isLoggedIn,
        /* onLogout -> points at the onLogoutHandler */
        onLogout: logoutHandler,
        /* onLogin points at the loginHandler */
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
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
