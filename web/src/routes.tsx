// Route, Router, BrowserRouter
import React from 'react'
import { Route, BrowserRouter} from 'react-router-dom'

// We don't need to specify the index.tsx file, it finds that automaticly
import Home from './pages/Home'
import CCN from './pages/CreateCollectionNode'

const Routes = () => {
  return(
    <BrowserRouter>
      <Route component={Home} path='/' exact />
      <Route component={CCN} path='/create-cn' />
    </BrowserRouter>
  )
}

export default Routes