import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUserRequest!) {
    loginUser(input: $input) {
      accessToken
      refreshToken
      tokenType
      user {
        firstName
        lastName
        email
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserRequest!) {
    registerUser(input: $input) {
      accessToken
      refreshToken
      tokenType
      user {
        firstName
        lastName
        email
      }
    }
  }
`;