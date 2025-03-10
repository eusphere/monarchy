import { graphql } from 'relay-runtime';

export const SelfQuery = graphql`
  query SelfQuery {
    self {
      id
      # Add other fields you need from the self query
    }
  }
`;
