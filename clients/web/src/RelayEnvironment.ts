import {
    Environment,
    Network,
    RecordSource,
    Store,
    FetchFunction,
  } from 'relay-runtime';
import { host } from '~/network/host';
  
const HTTP_ENDPOINT = `${host}/graphql`;
  
const fetchFn: FetchFunction = async (params, variables) => {
  const response = await fetch(HTTP_ENDPOINT, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });
  return response.json();
};

const environment = new Environment({
  network: Network.create(fetchFn),
  store: new Store(new RecordSource()),
});

export default environment;