import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import AuthContext from "./store/auth-context";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  //Introducing React Context
  /* Problem -> passing a lot of data through a lot of components via props -> good example of this 
  is our 'isLoggedIn' state and the login functions. */
  /* We're managing this state in the app component, because I lifted this state up to that component.
  We need this isLoggedIn state and the functions to change it everywhere in this application. */

  //REACT CONTEXT EXPLANATION:
  /* React context -> component-wide, behind the scenes state storage. This allows us to trigger an 
  action in that component wide state storage, then directly pass that to the component that is interested
  without building such long prop chains. */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    /* EXPLANATION OF REACT CONTEXT STATE USAGE */
    /* We can wrap our main header and the main section -> main html element with Auth-Context */
    /* AuthContext itself -> not a component -> in JSX we need a component though. But with a . a dot
    we can access a property on this Auth-Context object that contains a component and thats the 
    '.Provider' */
    /* Now AuthContext is wrapped around these components, all these components <MainHeader> and <main>
    and all their descendent components (so all their children and their childrens children etc.) - all 
    those components will now have access to that context. AuthContext can also become a root level 
    component - remove ReactFragment. */
    <AuthContext.Provider>
      {/* EXPLANATION OF PROPS PROBLEM AND THEREFORE THE NEED FOR REACT CONTEXT API */}
      {/* We use the isLoggedIn state in the header, to which I'm passing it through the 
      isAuthenticated prop. From there we are able to logout -> so I passed the pointer at 
      the logoutHandler to my header on the onLogout prop. */}
      {/* here, we're passing isLoggedIn through the isAuthenticated prop to the MainHeader.
      Passing the logout handler through the onLogout prop to the main header as well. */}
      {/* This isn't even being utilised in the MainHeader component though, its being used in 
      the Navigation component. So -> in MainHeader I'm recieving props, (data through props) 
      which I'm not actually using primarily in the main header, instead, I just forward that data. */}
      {/* Bigger apps -> chains might get longer and longer */}
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {/* Also need to the login state to render different content here -> either the login 
        or the home component, and to those components */}
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
