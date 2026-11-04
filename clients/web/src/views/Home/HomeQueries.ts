import { graphql } from 'relay-runtime';

export const HomeQuery = graphql`
  query HomeQueriesQuery {
    self { id username rating ...UserFragment }
    lobby { challenges { host { id username rating ...UserFragment } } }
  }
`;

export const HomeSeekMutation = graphql`
  mutation HomeQueriesSeekMutation { challengeSeek { host { id } } }
`;
