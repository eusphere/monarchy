export const host = import.meta.env.PROD
  ? 'https://api.monarchy1.com'
  : 'http://localhost:8080';

export default host;
