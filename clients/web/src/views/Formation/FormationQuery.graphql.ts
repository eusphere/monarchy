import { graphql } from 'react-relay';

export default graphql`
  query FormationQuery {
    formation {
      point {
        i
        j
      }
      piece
    }
  }
`;
