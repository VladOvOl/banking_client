'use client'
import React, { PropsWithChildren, useState } from 'react'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"


function Providers({ children, ...props }: ThemeProviderProps) {
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