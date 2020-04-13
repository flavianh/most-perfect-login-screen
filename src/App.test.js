import { fireEvent, getByText, render, wait } from "@testing-library/react";

import App from "./App";
import React from "react";

test("Logging state is loggedOut and form fields are empty by default", () => {
  const { getByText, getByLabelText } = render(<App />);
  const form = getByLabelText("loginForm");

  expect(getByText("loggedOut")).toBeInTheDocument();
  expect(form).toHaveFormValues({
    email: "",
    password: "",
  }); // This passes only if 'name' is set for form inputs
});

test("Logging state switches to loggedIn when connecting with right credentials", async () => {
  const { getByLabelText, getByText } = render(<App />);
  const email = getByLabelText("email");
  const password = getByLabelText("password");
  const loginButton = getByText("login");

  await wait(() => {
    fireEvent.change(email, {
      target: {
        value: "test@email.com",
      },
    });
  });

  await wait(() => {
    fireEvent.change(password, {
      target: {
        value: "testpassword",
      },
    });
  });

  await wait(() => {
    fireEvent.click(loginButton);
  });

  expect(getByText("loggedIn")).toBeInTheDocument();
});
