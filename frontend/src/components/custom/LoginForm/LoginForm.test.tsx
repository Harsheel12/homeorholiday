import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  beforeEach(() => {
    render(
      <MockedProvider>
        <LoginForm />
      </MockedProvider>
    );
  });

  test("renders email input with correct placeholder", () => {
    const emailInput = screen.getByPlaceholderText("Enter your email address");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("name", "email");
  });

  test("renders password input with correct placeholder and type", () => {
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("name", "password");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("renders submit button with text 'Log In'", () => {
    const submitButton = screen.getByRole("button", { name: "Log In" });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  test("form submission triggers validation errors when inputs are empty", async () => {
    const submitButton = screen.getByRole("button", { name: "Log In" });

    fireEvent.click(submitButton);

    const emailError = await screen.findByText(/email is required/i);
    expect(emailError).toBeInTheDocument();

    const passwordError = await screen.findByText(/password is required/i);
    expect(passwordError).toBeInTheDocument();
  });

  test("allows user to enter email and password", () => {
    const emailInput = screen.getByPlaceholderText("Enter your email address");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "mypassword" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("mypassword");
  });
});
