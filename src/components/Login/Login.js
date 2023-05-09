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

import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";

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
  /* Now can handle action with an if statement. Check if action.type is equal to user input */

  /* Keep in mind, what I dispatched as an action will be an object, because thats what we set it to in 
  the dispatchEmail function. */
  /* The object from the dsipatchEmail function further down in code has type field, so I can check for 
  action.type and check if the values stored in that type field is that string with the content 
  user input. */
  if (action.type === "USER_INPUT") {
    /* want to return a state snapshot for my email, wqhere the value is action.val. Thats the payload we 
    appended to our action. */
    /* Maybe we also want to update the validity here, if we're already added. action.val.includes("@") for
    this very trivial validation. */
    /* so now with object below in the return statement, I'm updating both the value and isValid whenever 
    I recieved a user input action. */
    return { value: action.val, isValid: action.val.includes("@") };
  }
  /* if statement check added for input blur */
  if (action.type === "INPUT_BLUR") {
    /* value should be value I had before -> don't want to reset it to empty cause the input could blur after
    the user entered something. So use last state snapshot I had here -> this is guarenteed to be the absolute
    last state snapshot -> React gives us the last state snapshot, makes sure its the latest one. */
    /* so on this basis, can write state.value -> write last value entered for the email */
    /* For validity -> if the state.value is valid -> adding validity check on the end (includes(@)) */
    return { value: state.value, isValid: state.value.includes("@") };
  }
  /* For any other action that might reach this reducer, the default state below will be returned. */
  return { value: "", isValid: false };
};

/* passwordReducer is an anonymous function, gets the last state and the action */
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    /* validation code needs to change from above -> looking at password length for passwordReducer function. */
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    /* validation code needs to change from above -> looking at password length for passwordReducer function. */
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  /* could use useReducer() to combine our entered values and validities for the email and the password. 
  Goal is to combine the value and the validity into one state managed by useReducer. */
  /* removing enteredEmail and email isValid useState calls here because useReducer has replaced them */
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
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
      isValid: null,
    }
  );

  /* need to call useReducer again for the password reducer. What we get back is the password state and the 
  dispatchPassword function.  */
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  /* set up our AuthContext */
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  /* use object destructuring -> (same as array destructuring just with objects) to pull out certain
  properties of objects. For example -> from emailState, extract isValid -> store it in a const to the
  left of the equals sign called emailIsValid */
  const { isValid: emailIsValid } = emailState;
  /* can do the same for passwordState() -> again we are creating an alias assignement, this is not a value 
  assignment -> its an alias assignement because its part of this object destructuring syntax -> which 
  is the syntax you're automatically using if you're using those curly braces on the left side of the 
  equals sign. */
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      /* this below that we've altered would be a fine way pf calling setFormIsValid, because since 
      its now of an effect we still refer to our state snapshots, but this effect is guaranteed to rerun
      whenever these states change, ultimately it will run with latest state values. */
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    /* want to update the email -> so lets start here with the value, call dispatch Email,
    and pass to it a so-called action. Totally up to me what that action is -> could be a 
    string identifier, but often an object which has some field that holds some identifier, often 
    the field is then named type. i.e. could be USER_INPUT (convention is all caps) */
    /* then can add an extra payload to this action -> I can but its up to me. Since we want to 
    save what the user entered, it would make sense to add some payload -> i.e. a val field -> holds
    event target value. */
    /* So now entire object is our action -> its a type field that describes what happened and extra
    payload, in this case the value users entered. */
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    /* now we just need to update the code accordingly */
    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    /* When the password changes -> call dispatch password, pass an object -> type of USER_INPUT and 
    use the val field -> which is the event.target.value */
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      /* Can use emailState here where I want the enteredEmail -> now can just 
      check if emailState isValid is true */
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    /* here, we want to update the validity. We use dispatchEmail -> pass in an oject -> should be 
    consistent, my actions should always have the same structure -> so my code where I try and
    access type property in the emailReducer if statement doesn't suddenly fail. */
    /* On this basis of consistency therefore, so again, dispatching an object with a type field,
    here for example its INPUT_BLUR, because the input lost focus, it was blurred. Don't really 
    need to add a second part to the object, a value after type -> because all we care about 
    is that the input lost focus, there is no extra data that needs to be added. */
    /* doesn't matter, cause the if statement in emailReducer function above only runs if the 
    action type is USER_INPUT -> not for INPUT_BLUR */
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    /* when password field blurs -> also have dispatchPassword */
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    /* scrolling down to submit handler -> here we want to forward the value -> emailState.value */
    authCtx.onLogin(emailState.value, passwordState.value);
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
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
