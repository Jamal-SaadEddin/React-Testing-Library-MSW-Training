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
  });
});
