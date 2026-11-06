import { graphql } from 'react-relay';

export default graphql`
  query FormationQuery {
    self {
      profile {
        color
      }
    }
    formation {
      point {
        i
        j
      }
      piece
    }
  }
`;
