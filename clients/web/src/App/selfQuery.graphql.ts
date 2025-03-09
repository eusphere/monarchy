import { graphql } from 'relay-runtime';

export const AppQuery = graphql`
  query AppQuery {
    self {
      id
      # Add other fields you need from the self query
    }
  }
`;
