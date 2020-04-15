# The most perfect login screen

## The challenge

Code the most perfect login screen you can conceive.

### Goal

A login screen:

- An email input named Email
- A password input named Password
- A submit button named Login that calls an authentication function with signature `authenticate(email, password) -> token throw InvalidEmailError | InvalidPasswordError`.
- Below the button is written "Logged out". When clicking the Login button with the right credentials, the text switches to "Logged in".

Possible errors:

- Email. When Login is pressed: - Empty -> Please enter an email address - Not a valid email -> Show a specific error message "Please enter a valid email address" below the email field
- Password. When Login is pressed: - Empty -> Please enter a password address
- on clicking Login: - `InvalidEmailError` is raised by `authenticate` -> Show below the email the error "Your email does not exist in our system" - `InvalidPasswordError` is raised by `authenticate` -> Show below the password the error "Your password does not exist in our system" - Any other error -> Show a generic error message "Our services are experiencing issues, please try again in a few minutes or contact our support"

### What you start with

Our tests should test all the above behaviors and should not be affected by:

- A change of wording in any of the error messages, labels, or success message
- A change of what an "invalid email" means
- A change of implementation details inside the function that executes the authentication mechanism

We code in TDD:

- **Law 1**: You can’t write any production code until you have first written a failing spec.
- **Law 2**: You can’t write more of a unit test than is sufficient to fail, and not compiling is failing.
- **Law 3**: You can’t write more production code than is sufficient to pass the currently failing unit test.

We use:

- React
- Formik for form state management
- Yup for form validation
- react-i18next for Translations
- @testing-library/react to test the react component in a way that is similar to how the component is used
- [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) to write simple jest expects

At the beginning we have:

- An empty form
- The authentication function

## Testing

CF Code

## Styling

This would be where Cypress would be useful?
Or use visual validation and then snapshot

## Translations

Notice that the tests don't need changing

## Take aways

Seems more costly at first but I see three key advantages:

- If and when you'll have a bug in the future on this form, you are guaranteed to be able to write a good test for it, as your code is _testable by design_. This means that you go from your product being resilient to bugs (it can go back to working when a bug arises and is fixed) to being **reinforced from bugs**.
- TDD guarantees that you will have working code at least once every, say, 10 minutes. This means that if have an issue in your code, your debugging search space consists only in the code that was changed since your tests last passed. Since small issues of this kind arise quite often (writing this code I had 5 small blockers of this kind), even if you are writing more code, you are winning time that you would spend on problem solving. **If you want to build a skyscraper fast and securely, spend time building also the scaffolding**.
- If someone else reads your entire code, its specs will be very clear. This means that this person will have the possibility to **stand upon the knowledge you have already acquired (bugs, specification details), even if she decides to entirely change how the production code is implemented. **Your knowledge will outlive you\*\* and that is the greatest act of leadership.
