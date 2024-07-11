# React-Testing-Library-MSW-Training

This repository contains the React Testing Task assigned during my Frontend internship at Foothill Technology Solutions. The primary objective of this task is to learn and practice React Testing Library and Mock Service Worker (MSW) for testing React components.

## Overview

The task focuses on creating and running unit tests for the `SignUp` component. The tests cover various aspects of the component, including validation, form interaction, and API responses. Each test case has been committed separately to track progress and improvements.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Testing Library**: A library for testing React components.
- **Mock Service Worker (MSW)**: A library for mocking API requests.
- **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.

## How to Run the Project Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Jamal-SaadEddin/React-Testing-Library-MSW-Training.git
   cd React-Testing-Library-MSW-Training
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```

3. **Run the project**:
   ```bash
   npm start
   ```

4. **Run the tests**:
   ```bash
   npm test
   ```

   To run tests with coverage:
   ```bash
   npm test -- --coverage
   ```

## Testing Details

### Validation Tests

- **Invalid Email**: Checks for validation errors when an invalid email is entered.
- **Short Password**: Checks for validation errors when a short password is entered.
- **Successful Sign-up**: Verifies the success message on a successful sign-up.
- **Sign-up Failure**: Verifies the error message on a sign-up failure.

### Form Interaction Tests

- **Enable Sign Up Button**: Ensures the Sign Up button is enabled when the form is valid.
- **Disable Sign Up Button**: Ensures the Sign Up button is disabled when the form is invalid.
- **Update Form Fields**: Verifies that form fields update correctly on user input.
- **Redirect on Successful Sign-up**: Checks that the user is redirected to the home page after a successful sign-up.

## Demo

You can check out a live demo of the project [here](https://jamal-saadeddin.github.io/React-Testing-Library-MSW-Training/).

## Conclusion

This project has been an excellent opportunity to delve into React Testing Library and MSW, reinforcing best practices in testing and providing hands-on experience with essential tools and methodologies in React application development.

## Acknowledgements
- This task is part of the Foothill Technology Solutions Internship Cycle.
- Big thanks to my trainer [@Huthaifa](https://github.com/Huthaifa-Dev)
<img src="https://github.com/Jamal-SaadEddin/TodoTick/assets/104212352/9d3c83b0-5ea8-46ff-93e8-f1504af9dc67" width="400" alt="foothill logo">


---

Thank you for visiting my project! Feel free to star or contribute to the repository if you find it useful.
