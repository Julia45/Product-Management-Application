import React from 'react'
import Products from './Products/Products'
import { useHistory } from "react-router-dom";
import './MainPage.css'

function MainPage () {
  const history = useHistory();
  
  function createProduct () {
    history.push(`/create-view`)
  }
  
  return (
    <div>
      <button onClick={createProduct} className="CreateButton">Create</button>
      <Products></Products>
    </div>
  )
}

export default MainPage