import { graphql } from "relay-runtime";

export const UserFragment = graphql`
  fragment UserFragment on User {
    id
    username
    rating
    profile {
      avatar
      color
    }
  }
`;
