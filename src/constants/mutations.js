import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation Login($username: String! $password: String!) {
    logIn(username: $username, password: $password) {
      access_token
      token_type
      expires_in
      refresh_token
    }
  }
`;
