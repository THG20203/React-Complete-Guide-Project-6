import React from "react";

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
});

/* We don't need this object here though, instead we'll need it in other components */
