import { graphql } from "relay-runtime";

export const UserFragment = graphql`
  fragment UserFragment on User {
    id
    username
    email
    rating
    profile {
      avatar
      color
      discordId
    }
  }
`;
