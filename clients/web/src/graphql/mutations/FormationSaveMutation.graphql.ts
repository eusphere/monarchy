import { graphql } from 'relay-runtime';

export const FormationSaveMutation = graphql`
  mutation FormationSaveMutation($q: FormationSaveQuery!) {
    formationSave(q: $q)
  }
`;
