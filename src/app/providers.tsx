'use client'
import React, { PropsWithChildren, useState } from 'react'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'


function Providers({children}: PropsWithChildren) {
    const[client] = useState(
        new QueryClient({
          defaultOptions:{
            queries:{
              refetchOnWindowFocus:true
            }
          }
        })
    )
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}

export default Providers