import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry:false,
        refetchOnWindowFocus:false,
      },
    },
  })


export default function CustomizedQueryClientProvider (props){

      return (
              <QueryClientProvider client={queryClient}>
                   {props.children}
              </QueryClientProvider>
      );
    
}