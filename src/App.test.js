import {
  fireEvent,
  getByLabelText,
  render,
  wait,
} from "@testing-library/react";

import App from "./App";
import { InvalidEmailError } from "./authentication";
import React from "react";

async function changeField(field, value) {
  await wait(() => {
    fireEvent.change(field, {
      target: {
        value,
      },
    });
  });
}

async function clickOnButton(button) {
  await wait(() => {
    fireEvent.click(button);
  });
}

test("Logging state is loggedOut and form fields are empty by default", () => {
  const { getByText, getByLabelText } = render(<App />);
  const form = getByLabelText("loginForm");

  expect(getByText("loggedOut")).toBeInTheDocument();
  expect(form).toHaveFormValues({
    email: "",
    password: "",
  }); // This passes only if 'name' is set for form inputs
});

test("Logging state switches to loggedIn with valid credentials", async () => {
  const { getByLabelText, getByText } = render(<App />);
  const email = getByLabelText("email");
  const password = getByLabelText("password");
  const loginButton = getByText("login");

  await changeField(email, "testemail@email.com");
  await changeField(password, "testpassword");
  await clickOnButton(loginButton);

  expect(getByText("loggedIn")).toBeInTheDocument();
});

[
  { labelText: "email", errorMessage: "pleaseEnterEmail" },
  { labelText: "password", errorMessage: "pleaseEnterPassword" },
].forEach(({ labelText, errorMessage }) => {
  test(`Error ${errorMessage} should appear if ${labelText} was not touched when hitting Submit`, async () => {
    const { getByText, getByLabelText } = render(<App />);
    const loginButton = getByText("login");
    expect(getByLabelText(labelText)).toBeRequired();
    await clickOnButton(loginButton);
    const error = getByText(errorMessage);
    expect(error).toBeInTheDocument(); // Only works if "component" in ErrorMessage is set to something like div
    expect(error.id).toBe(`${labelText}-error`);
  });
});

test("pleaseEnterValidEmail should appear if a wrong email was set when hitting Submit", async () => {
  const { getByText, getByLabelText } = render(<App />);
  const labelText = "email";
  const email = getByLabelText(labelText);

  const loginButton = getByText("login");
  await changeField(email, "notanemail");
  await clickOnButton(loginButton);
  const error = getByText("pleaseEnterValidEmail");
  expect(error).toBeInTheDocument(); // Only works if "component" in ErrorMessage is set to something like div
  expect(error.id).toBe(`${labelText}-error`);
});

test("If authenticate raises InvalidEmailError, show emailNotInOurSystem as an email error", async () => {
  const authenticate = () => {
    throw new InvalidEmailError();
  };

  const { getByLabelText, getByText } = render(
    <App authenticate={authenticate} />
  );
  const email = getByLabelText("email");
  const password = getByLabelText("password");
  const loginButton = getByText("login");

  await changeField(email, "testemail@email.com");
  await changeField(password, "testpassword");
  await clickOnButton(loginButton);

  const error = getByText("emailNotInOurSystem");
  expect(error).toBeInTheDocument();
  expect(error.id).toBe("email-error");
});
