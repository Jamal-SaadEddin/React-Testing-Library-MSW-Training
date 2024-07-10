import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import React from "react";
import SignUp from "./";
import { handlers } from "./handlers";

// Setting up the mock server
const server = setupServer(...handlers);

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

      const successMessage = await screen.findByText("Error Signing Up!");
      expect(successMessage).toBeInTheDocument();
    });
  });
});
