import { graphql } from 'relay-runtime';

export const SelfQuery = graphql`
  query SelfQuery {
    self {
      ...UserFragment
    }
  }
`;
