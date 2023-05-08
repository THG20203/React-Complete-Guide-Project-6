//useReducer - basic structure:
/* const [state, dispatchFn] = useReducer(reducerFn, intialState, initFn) */

// Explanation of function above:
// left hand side of function
/* state snapshot = used in the component re-render/ re-evaluation cycle */
/* dispatchFn -> can be used to dispatch a new action (i.e. trigger an an update of the state) */
/* this first part -> similar as for useState() -> though the state updating function will work
differently. */
/* Instead of just setting a new state value, you will dispatch an action -> and that action will
be consumed by the first argument you pass to useReducer - a so-called reducer function. */

// right hand side of function
/* preducerFn -> (prevState, action) => newState. 
A function that is triggered that is triggered automatically once an action is dispatched (via 
dispatchFun()) - it recieves the latest state snapshot and should return the new updated state. */
/* In addition, you can also set some initial state and also an initial function, in case your 
initial state is a bit more complex. A function to set the initial state programmatically. And for example,
the result of lets say HTTP requests */

import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

/* arrow function stored in this emailReducer const for the useReducer() function below. Please 
note -> reducer function created outside of the component function. Did so, because inside of this 
reducer function, we won't need any data thats generated inside of the component function. */
/* Other words -> this reducer funcrtion can be created outside of the scope of the this 
component function -> does need to interact with anything defined inside of the componetn function. */

//PURPOSE OF FUNCTION OUTLINED
/* All the data which will be required and used inside of the reducer function will be passed into this
function when its executed by React, automatically */
/* reducer function recieves two arguments, our last state snapshot and the action that was dispatched. */
const emailReducer = (state, action) => {
  /* should return a new state */
  return { value: "", isValid: false };
};

const Login = (props) => {
  /* could use useReducer() to combine our entered values and validities for the email and the password. 
  Goal is to combine the value and the validity into one state managed by useReducer. */
  /* removing enteredEmail and email isValid useState calls here because useReducer has replaced them */
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  /* Calling useReducer() function. useReducer return an array with exactly two elements, and we can
  use array destructuring to pull those elements out of it. */
  /* Going to utilise useReducer for my email and my password seperately. Get back emailState, and 
  dispatchEmail (our dispatch function). These two names are up to me. */
  /* Then I mentioned that useReducer as a first argument takes a function. Using outsourced name 
  function (written above). emailReducer function now pointed at from above. */
  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    /* Initial state we set below for our emailState snapshot. So emailState therefore is what we can 
    now use in our code. */
    {
      value: "",
      isValid: false,
    }
  );

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    /* want to update the email -> so lets start here with the value */

    setFormIsValid(
      event.target.value.includes("@") && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      /* Can use emailState here where I want the enteredEmail -> now can just 
      check if emailState isValid is true */
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    /* here, we want to update the validity */
    setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    /* scrolling down to submit handler -> here we want to forward the value -> emailState.value */
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            /* instead of emailIsValid, we have emailState is valid */
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            /* below, where I pass the value back into the input, we can have emailState.value */
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
