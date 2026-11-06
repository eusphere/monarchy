import { graphql } from 'relay-runtime';

export const HomeSeekMutation = graphql`
  mutation HomeQueriesSeekMutation { challengeSeek { host { id } } }
`;

export const HomeChallengeAcceptMutation = graphql`
  mutation HomeQueriesChallengeAcceptMutation($q: ChallengeAcceptQuery!) {
    challengeAccept(q: $q) { id }
  }
`;

export const HomeChallengeCancelMutation = graphql`
  mutation HomeQueriesChallengeCancelMutation { challengeSeekCancel }
`;
