import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

import { Trans } from "react-i18next";

const user_database = {
  "bill@gates.com": "billgates",
  "angelina@jolie.com": "angelinajolie",
};

export class InvalidEmailError extends Error {}
export class InvalidPasswordError extends Error {}

function authenticate(email, password) {
  if (!user_database[email]) {
    throw new InvalidEmailError();
  }
  if (password !== !user_database[email]) {
    throw new InvalidPasswordError();
  }

  return "loggedIn";
}

function App() {
  const [logState, setLogState] = useState("loggedOut");

  return (
    <Formik
      initialValues={{
        email: "", // Otherwise you get "cannot read property email of undefined"
        password: "",
      }}
      onSubmit={() => {
        setLogState("loggedIn");
      }}
    >
      {() => (
        <Form className="pure-form pure-form-stacked" aria-label="loginForm">
          <label htmlFor="email">email</label>
          <Field id="email" name="email" />
          <label htmlFor="password">password</label>
          <Field id="password" name="password" />
          <button type="submit">login</button>
          <div>{logState}</div>
        </Form>
      )}
    </Formik>
  );
}

export default App;
