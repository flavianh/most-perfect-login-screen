import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { InvalidEmailError, InvalidPasswordError } from "./authentication";
import React, { useState } from "react";
import { Trans, Translation } from "react-i18next";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("pleaseEnterEmail")
    .email("pleaseEnterValidEmail"),
  password: Yup.string().required("pleaseEnterPassword"),
});

function divTrans({ children, ...props }) {
  return (
    <div {...props}>
      <Trans>{children}</Trans>
    </div>
  );
}

function App(props) {
  const [logState, setLogState] = useState("loggedOut");
  const { authenticate } = props;

  return (
    <Translation>
      {(t) => (
        <Formik
          initialValues={{
            email: "", // Otherwise you get "cannot read property email of undefined"
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={({ email, password }, { setErrors }) => {
            try {
              authenticate(email, password);
              setLogState("loggedIn");
            } catch (error) {
              if (error instanceof InvalidEmailError) {
                setErrors({ email: "emailNotInOurSystem" });
              } else if (error instanceof InvalidPasswordError) {
                setErrors({ password: "passwordNotInOurSystem" });
              } else {
                setLogState("systemError");
              }
            }
          }}
        >
          {() => (
            <Form
              className="pure-form pure-form-stacked"
              aria-label="loginForm"
            >
              <div className="pure-control-group">
                <label htmlFor="email">{t("email")}</label>
                <Field id="email" name="email" type="email" required />
                <ErrorMessage
                  id="email-error"
                  role="alert"
                  component={divTrans}
                  className="pure-form-message-inline error-message"
                  name="email"
                />
              </div>
              <div className="pure-control-group">
                <label htmlFor="password">{t("password")}</label>
                <Field id="password" name="password" type="password" required />
                <ErrorMessage
                  component={divTrans}
                  id="password-error"
                  name="password"
                  role="alert"
                  className="pure-form-message-inline error-message"
                />
              </div>
              <div className="pure-controls">
                <button
                  type="submit"
                  className="pure-button pure-button-primary"
                >
                  {t("login")}
                </button>
              </div>
              <div id="log-state">{t(logState)}</div>
            </Form>
          )}
        </Formik>
      )}
    </Translation>
  );
}

export default App;
