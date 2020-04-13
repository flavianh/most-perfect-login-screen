import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { InvalidEmailError, authenticate } from "./authentication";
import React, { useState } from "react";

import { Trans } from "react-i18next";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("pleaseEnterEmail")
    .email("pleaseEnterValidEmail"),
  password: Yup.string().required("pleaseEnterPassword"),
});

function App(props) {
  const [logState, setLogState] = useState("loggedOut");
  const { authenticate } = props;

  return (
    <Formik
      initialValues={{
        email: "", // Otherwise you get "cannot read property email of undefined"
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(_, { setErrors }) => {
        try {
          authenticate();
        } catch (error) {
          if (error instanceof InvalidEmailError) {
            setErrors({ email: "emailNotInOurSystem" });
          }
        } finally {
          setLogState("loggedIn");
        }
      }}
    >
      {() => (
        <Form className="pure-form pure-form-stacked" aria-label="loginForm">
          <label htmlFor="email">email</label>
          <Field id="email" name="email" required="true" />
          <ErrorMessage
            component="div"
            id="email-error"
            name="email"
            role="alert"
          />
          <label htmlFor="password">password</label>
          <Field id="password" name="password" required="true" />
          <ErrorMessage
            component="div"
            id="password-error"
            name="password"
            role="alert"
          />
          <button type="submit">login</button>
          <div>{logState}</div>
        </Form>
      )}
    </Formik>
  );
}

export default App;
