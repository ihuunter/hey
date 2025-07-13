import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // Get authentication token from localStorage
  const token = localStorage.getItem('auth_token');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export default client;