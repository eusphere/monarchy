import { graphql } from 'relay-runtime';

const HomeQuery = graphql`
  query HomeQueriesQuery {
    self { id username rating ...UserFragment }
    lobby { challenges { expireAt host { id username rating ...UserFragment } } }
  }
`;

export default HomeQuery;
