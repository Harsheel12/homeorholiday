import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import SignUpForm from "./SignUpForm";

describe("SignUpForm", () => {
  beforeEach(() => {
    render(
      <MockedProvider>
        <SignUpForm />
      </MockedProvider>
    );
  });

  test("renders first name input with correct placeholder", () => {
    const firstNameInput = screen.getByPlaceholderText("Enter your first name");
    expect(firstNameInput).toBeInTheDocument();
    expect(firstNameInput).toHaveAttribute("name", "firstName");
  });

  test("renders last name input with correct placeholder", () => {
    const lastNameInput = screen.getByPlaceholderText("Enter your last name");
    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameInput).toHaveAttribute("name", "lastName");
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

  test("renders submit button with text 'Sign Up'", () => {
    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  test("form submission triggers validation errors when inputs are empty", async () => {
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.click(submitButton);

    expect(await screen.findByText(/first name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/last name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password must be at least 8 characters/i)).toBeInTheDocument();
  });

  test("allows user to type into all fields", () => {
    const firstNameInput = screen.getByPlaceholderText("Enter your first name");
    const lastNameInput = screen.getByPlaceholderText("Enter your last name");
    const emailInput = screen.getByPlaceholderText("Enter your email address");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123" } });

    expect(firstNameInput).toHaveValue("John");
    expect(lastNameInput).toHaveValue("Doe");
    expect(emailInput).toHaveValue("john@example.com");
    expect(passwordInput).toHaveValue("Password123");
  });
});
