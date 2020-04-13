const user_database = {
  "bill@gates.com": "billgates",
  "angelina@jolie.com": "angelinajolie",
};

export class InvalidEmailError extends Error {}
export class InvalidPasswordError extends Error {}

export function authenticate(email, password) {
  if (!user_database[email]) {
    throw new InvalidEmailError();
  }
  if (password !== !user_database[email]) {
    throw new InvalidPasswordError();
  }

  return "loggedIn";
}
