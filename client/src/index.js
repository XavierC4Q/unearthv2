import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {ApolloLink} from 'apollo-link'
import {withClientState} from 'apollo-link-state'
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache,defaultDataIdFromObject} from 'apollo-cache-inmemory'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    if(object.__typename === 'User'){
      return 'CurrentUser'
    }
    return defaultDataIdFromObject(object)
  }
})

const statelink = withClientState({cache, resolvers: {}, defaults: {}})

const client = new ApolloClient({
  link: ApolloLink.from([statelink, new HttpLink({uri: `http://localhost:4000/api`})]),
  cache: cache
})

ReactDOM.render(<ApolloProvider client={client}>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
</ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
