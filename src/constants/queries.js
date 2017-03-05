import gql from 'graphql-tag';

export const CURRENT_USER = gql`
  query CurrentUser {
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
    currentUser {
      username
      email
    }
  }
`;

export const METRICS = gql`
  query Metric($organizationId: Int!) {
    organizationMetrics(organizationId: $organizationId) {
      devices_synced_count
      devices_never_synced_count
      devices_in_repair_count
      devices_in_the_field_count
      devices_in_stock_count
      devices_not_synced_count
      devices_count
    }
  }
`;
