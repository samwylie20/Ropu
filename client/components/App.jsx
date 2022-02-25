import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './Header'
import Home from '../pages/home'
import Jobs from '../pages/Jobs'

function App () {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/jobs' element={<Jobs />} />
      </Routes>

    </>

  )
}

export default App
