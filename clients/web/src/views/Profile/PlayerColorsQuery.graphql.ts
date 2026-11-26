import { graphql } from 'relay-runtime';

export const PlayerColorsQuery = graphql`
  query PlayerColorsQuery { playerColorFamilies { name color colors { name color } } }
`;
