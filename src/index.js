import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import store from './Redux/store';
import { Provider } from 'react-redux'; 
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);