import { graphql } from 'react-relay';

export default graphql`
  query FormationQuery {
    self {
      profile {
        color
      }
    }
    formation {
      id
      tiles {
        point {
          i
          j
        }
        piece {
          id
          order
          name
          stats {
            health
            wait
            power
            armor
            blocking
          }
        }
      }
    }
  }
`;
