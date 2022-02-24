import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'

// Can change these colors later
const colors = {
  brand: {
    900: '#E94D3E', // STANDARD
    800: '#C24034', // DARKER
    700: '#F7958D' // LIGHTER
  }
}

const theme = extendTheme({ colors })

document.addEventListener('DOMContentLoaded', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </Provider>
    </BrowserRouter>,
    document.getElementById('app')
  )
})
