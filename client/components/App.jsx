import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './Header'
import Home from '../pages/home'
import Jobs from '../pages/Jobs'
import Code from '../pages/Code'
import Events from '../pages/Events'


function App () {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/code' element={<Code />} />
        <Route path='/events' element={<Events />} />

      </Routes>

    </>

  )
}

export default App
