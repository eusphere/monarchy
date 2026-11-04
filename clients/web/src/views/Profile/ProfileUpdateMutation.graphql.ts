import { graphql } from 'relay-runtime';

export const ProfileUpdateMutation = graphql`
  mutation ProfileUpdateMutation($q: UpdateProfileQuery!) {
    profileUpdate(q: $q) {
      ...UserFragment
    }
  }
`;
