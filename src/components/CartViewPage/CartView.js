import React, { useState, useEffect } from 'react'
import Product from '../MainPage/Product/Product'
import './CartView.css'
import { useHistory } from "react-router-dom";

function CartView() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/products?inCart=true")
      .then((resp) => resp.json())
      .then((data) => {
        setProducts(data.map((product) => ({
          ...product,
          count: 1
        })))
      })
  }, [])

  let allProductsCount = products.reduce((accumulator, product) => accumulator + product.count, 0)
  let allProductsPrice = products.reduce((accumulator, product) => accumulator + product.price * product.count, 0)


  function addOneProductHanlder(productID) {
    const nextProducts = [...products]
    const foundProduct = nextProducts.find(product => product.id === productID)
    foundProduct.count += 1;
    setProducts(nextProducts)
  }

  function reduceOneProductHanlder(productID) {
    const nextProducts = [...products]
    const foundProduct = nextProducts.find(product => product.id === productID)
    foundProduct.count -= 1;
    if (foundProduct.count < 0) {
      foundProduct.count = 0;
    }
    setProducts(nextProducts)
  }

  function returnTheProduct(itemID, index) {
    let nextProducts = [...products]
    let foundProduct = nextProducts.find(product => product.id === itemID)
    foundProduct.inCart = false
    nextProducts.splice(index, 1)

    fetch(`http://localhost:3000/products/${itemID}`, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(foundProduct)
    }).then((response) => {
      response.json().then((response) => {
        setProducts(nextProducts)
      })
    })
  }

  const history = useHistory();

  function returnHandle() {
    history.push(`/`)
  }

  return (
    <div>
      <div className="CartGreetingContainer">
        <div className="BackArrow"
          onClick={returnHandle}>
          <i className="fas fa-hand-point-left"></i>Back
        </div>
      </div>
      <div className="AllProductsContainerCart">
        {products
          .map((product, index) => {
            return (
              <Product
                showNumberProduct={true}
                canAddToCart={false}
                canEdit={false}
                canDecrease={allProductsCount <= 1}
                product={product}
                key={index}
                deleteProduct={() => returnTheProduct(product.id)}
                addOneProduct={() => addOneProductHanlder(product.id)}
                reduceOneProduct={() => reduceOneProductHanlder(product.id)}
              />
            )
          })
        }
      </div>
      <div className="AllProductsCalculation">
        <div className="AllProductsNumber"> All Products Number: {allProductsCount}</div>
        <div className="AllProductsPrice">  All Products Price: {allProductsPrice}</div>
      </div>
    </div>
  )
}

export default CartView