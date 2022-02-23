import React from 'react'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'

// Can change these colors later
const colors = {
  brand: {
    900: '#E94D3E', // STANDARD
    800: '#C24034', // DARKER
    700: '#F7958D', // LIGHTER
  },
}

const theme = extendTheme({ colors })

function App () {
  return (
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  )
}

export default App
