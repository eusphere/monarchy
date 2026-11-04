import { graphql } from 'relay-runtime';

export const UpdateProfileMutation = graphql`
  mutation UpdateProfileMutation($q: UpdateProfileQuery!) {
    updateProfile(q: $q) {
      ...UserFragment
    }
  }
`;
