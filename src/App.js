import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

import { Trans } from "react-i18next";

const user_database = {
  "bill@gates.com": "billgates",
  "angelina@jolie.com": "angelinajolie",
};

class InvalidEmailError extends Error {}
class InvalidPasswordError extends Error {}

function authenticate(email, password) {
  if (!user_database[email]) {
    throw new InvalidEmailError();
  }
  if (password !== !user_database[email]) {
    throw new InvalidPasswordError();
  }

  return "connected";
}

function App() {
  const [result, setResult] = useState("");

  return <Formik>{() => <Form></Form>}</Formik>;
}

export default App;
