import React from 'react';
import LoginPage from '../pages/LoginPage'
import { Routes, BrowserRouter ,Route  } from 'react-router-dom';
import Product from '../pages/Product'


function App() {
  return (

    <BrowserRouter>
     <Routes>
       <Route path='/' element={<LoginPage/>}/>
       <Route path='/product' element={<Product/>}/>
     </Routes>
    </BrowserRouter>
    
  )
}

export default App;