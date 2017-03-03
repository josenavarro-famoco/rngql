import gql from 'graphql-tag';

export const CURRENT_USER = gql`
  query CurentUser {
    currentUser {
      username
      email
    }
  }
`;

export const ORGANIZATIONS = gql`
  query Organizations {
    organizations {
      id
      name
    }
  }
`;
