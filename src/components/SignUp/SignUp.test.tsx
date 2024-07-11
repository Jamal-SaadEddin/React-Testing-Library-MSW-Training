import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import React from "react";
import SignUp from "./";
import { handlers } from "./handlers";

// Setting up the mock server
const server = setupServer(...handlers);

// Mock HomePage component
jest.mock("../HomePage", () => () => <div>Home Page</div>);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("SignUp Component", () => {
  describe("Validation", () => {
    it("should display validation errors for invalid email", async () => {
      render(<SignUp />);

      const emailInput = screen.getByLabelText(/^Email Address/);

      userEvent.type(emailInput, "invalidEmail@");
      userEvent.tab();

      const errorMessage = await screen.findByText("Enter a valid email");
      expect(errorMessage).toBeInTheDocument();
    });

    it("should display validation errors for short password", async () => {
      render(<SignUp />);

      const passwordInput = screen.getByLabelText(/^Password/);

      userEvent.type(passwordInput, "123");
      userEvent.tab();

      const errorMessage = await screen.findByText(
        "Password should be of minimum 8 characters length"
      );
      expect(errorMessage).toBeInTheDocument();
    });

    it("should display success message on successful sign-up", async () => {
      render(<SignUp />);

      const userNameInput = screen.getByLabelText(/^User Name/);
      const emailInput = screen.getByLabelText(/^Email Address/);
      const passwordInput = screen.getByLabelText(/^Password/);
      const signUpButton = screen.getByRole("button", { name: "Sign Up" });

      userEvent.type(userNameInput, "Jamal SaadEddin");
      userEvent.type(emailInput, "jamalsaadeddin27@gmail.com");
      userEvent.type(passwordInput, "123456789");

      userEvent.click(signUpButton);

      const successMessage = await screen.findByText("Sign Up Successfully!");
      expect(successMessage).toBeInTheDocument();
    });

    it("should display error message on sign-up failure", async () => {
      render(<SignUp />);

      const userNameInput = screen.getByLabelText(/^User Name/);
      const emailInput = screen.getByLabelText(/^Email Address/);
      const passwordInput = screen.getByLabelText(/^Password/);
      const signUpButton = screen.getByRole("button", { name: "Sign Up" });

      userEvent.type(userNameInput, "Jamal SaadEddin");
      userEvent.type(emailInput, "fail@example.com");
      userEvent.type(passwordInput, "123456789");

      userEvent.click(signUpButton);

      const errorMessage = await screen.findByText("Error Signing Up!");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("Form Interaction", () => {
    it("should enable Sign Up button when form is valid", async () => {
      render(<SignUp />);

      const userNameInput = screen.getByLabelText(/^User Name/);
      const emailInput = screen.getByLabelText(/^Email Address/);
      const passwordInput = screen.getByLabelText(/^Password/);
      const signUpButton = screen.getByRole("button", { name: "Sign Up" });

      userEvent.type(userNameInput, "Jamal SaadEddin");
      userEvent.type(emailInput, "jamalsaadeddin27@gmail.com");
      userEvent.type(passwordInput, "123456789");

      await waitFor(() => expect(signUpButton).toBeEnabled());
    });

    it("should disable Sign Up button when form is invalid", async () => {
      render(<SignUp />);

      const userNameInput = screen.getByLabelText(/^User Name/);
      const emailInput = screen.getByLabelText(/^Email Address/);
      const passwordInput = screen.getByLabelText(/^Password/);
      const signUpButton = screen.getByRole("button", { name: "Sign Up" });

      expect(signUpButton).toBeDisabled(); // All inputs are empty

      userEvent.clear(emailInput);
      userEvent.clear(passwordInput);
      userEvent.type(userNameInput, "Jamal SaadEddin"); // User Name filled only
      await waitFor(() => expect(signUpButton).toBeDisabled());

      userEvent.clear(userNameInput);
      userEvent.clear(passwordInput);
      userEvent.type(emailInput, "jamalsaadeddin27@gmail.com"); // Email filled only
      await waitFor(() => expect(signUpButton).toBeDisabled());

      userEvent.clear(userNameInput);
      userEvent.clear(emailInput);
      userEvent.type(passwordInput, "123456789"); // Password filled only
      await waitFor(() => expect(signUpButton).toBeDisabled());

      userEvent.type(userNameInput, "Jamal SaadEddin");
      userEvent.type(emailInput, "jamalsaadeddin27@gmail.com"); // User Name & Email filled only
      await waitFor(() => expect(signUpButton).toBeDisabled());

      userEvent.clear(emailInput);
      userEvent.clear(userNameInput);
      userEvent.type(userNameInput, "Jamal SaadEddin");
      userEvent.type(passwordInput, "123456789"); // User Name & Password filled only
      await waitFor(() => expect(signUpButton).toBeDisabled());

      userEvent.clear(userNameInput);
      userEvent.clear(passwordInput);
      userEvent.type(emailInput, "jamalsaadeddin27@gmail.com");
      userEvent.type(passwordInput, "123456789"); // Email & Password filled only
      await waitFor(() => expect(signUpButton).toBeDisabled());

      userEvent.clear(emailInput);
      userEvent.clear(passwordInput);
      userEvent.type(userNameInput, "Jamal SaadEddin");
      userEvent.type(emailInput, "invalidEmail@");
      userEvent.type(passwordInput, "123456789"); // All filled but invalid email
      await waitFor(() => expect(signUpButton).toBeDisabled());

      userEvent.clear(userNameInput);
      userEvent.clear(emailInput);
      userEvent.clear(passwordInput);
      userEvent.type(userNameInput, "Jamal SaadEddin");
      userEvent.type(emailInput, "jamalsaadeddin27@gmail.com");
      userEvent.type(passwordInput, "123"); // All filled but invalid password
      await waitFor(() => expect(signUpButton).toBeDisabled());

      userEvent.clear(userNameInput);
      userEvent.clear(emailInput);
      userEvent.clear(passwordInput);
      userEvent.type(userNameInput, "Jamal SaadEddin");
      userEvent.type(emailInput, "invalidEmail@");
      userEvent.type(passwordInput, "123"); // All filled but invalid email & invalid password
      await waitFor(() => expect(signUpButton).toBeDisabled());
    });

    it("should update form fields on user input", async () => {
      render(<SignUp />);

      const userNameInput = screen.getByLabelText(
        /^User Name/
      ) as HTMLInputElement;
      const emailInput = screen.getByLabelText(
        /^Email Address/
      ) as HTMLInputElement;
      const passwordInput = screen.getByLabelText(
        /^Password/
      ) as HTMLInputElement;

      userEvent.type(userNameInput, "Jamal SaadEddin");
      await waitFor(() => expect(userNameInput.value).toBe("Jamal SaadEddin"));

      userEvent.type(emailInput, "jamalsaadeddin27@gmail.com");
      await waitFor(() =>
        expect(emailInput.value).toBe("jamalsaadeddin27@gmail.com")
      );

      userEvent.type(passwordInput, "123456789");
      await waitFor(() => expect(passwordInput.value).toBe("123456789"));
    });

    it("should redirect user to home page after successful signup", async () => {
      render(<SignUp />);

      const userNameInput = screen.getByLabelText(/^User Name/);
      const emailInput = screen.getByLabelText(/^Email Address/);
      const passwordInput = screen.getByLabelText(/^Password/);
      const signUpButton = screen.getByRole("button", { name: "Sign Up" });

      userEvent.type(userNameInput, "Jamal SaadEddin");
      userEvent.type(emailInput, "jamalsaadeddin27@gmail.com");
      userEvent.type(passwordInput, "123456789");

      userEvent.click(signUpButton);

      const successMessage = await screen.findByText("Sign Up Successfully!");
      expect(successMessage).toBeInTheDocument();

      expect(screen.getByText("Home Page")).toBeInTheDocument();
    });
  });
});
