import React, { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Category from './components/Category'
import MegaMenu from './components/MegaMenu'

const App = () => {

  const [categorydata, setcategorydata] = useState([
    {
      category : "Men",
      subCategory : ["Classic", "Genes", "Formal"]
    },
    {
      category : "Women",
      subCategory : ["Bride", "Classic", "Europion"]
    }
  ])

  return (
    <div className=''>
      <Navbar />
      <Category />
    </div>
  )
}

export default App
