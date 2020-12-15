import React, { useState, useEffect, Fragment } from 'react'
import Product from '../Product/Product'
import './Products.css'
import { useHistory } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState("")
  const history = useHistory();
  const [sorting, setSorting] = useState({
    sortBy: "title",
    sortDirection: "asc"
  })
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({
    canPrev: true,
    canNext: true
  })

  function openCart() {
    history.push(`/cart-view`)
  }

  useEffect(() => {
    fetch(`http://localhost:3000/products?title_like=${filter}&_sort=${sorting.sortBy}&_order=${sorting.sortDirection}&_page=${page}`)
      .then(response => {
        let link = response.headers.get('Link')

        setPagination({
          canNext: link.includes('rel="next"'),
          canPrev: link.includes('rel="prev"'),
        })
        return response.json()
      })
      .then((data) => {
        setProducts(data)
      })
  }, [filter, sorting, page])


  function deleteProductHandler(itemID, personIndex) {
    return fetch(`http://localhost:3000/products/${itemID}`, {
      method: 'delete'
    })
      .then(response => response.json())
      .then((data) => {
        let newArrayOfProducts = [...products];
        newArrayOfProducts.splice(personIndex, 1)
        setProducts(newArrayOfProducts)
      })
  }

  function saveEdittedProductHandler(itemID) {
    history.push(`/edit-view/${itemID}`)
  }

  function addToCartProductHandle(itemID) {
    let nextProducts = [...products]
    let foundProduct = nextProducts.find(product => product.id === itemID)
    foundProduct.inCart = true

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

  function filterProductsChnage(e) {
    setFilter(e.target.value)
  }

  function sortingHandler(e) {
    setSorting({
      ...sorting,
      sortBy: e.target.value,
    })
  }

  function nextPageHandler() {
    setPage(page + 1)
  }

  function prevPageHandler() {
    setPage(page - 1)
  }

  return (
    <Fragment>
      <input
        value={filter}
        onChange={filterProductsChnage}
        placeholder="Filter.."
        className="FilterInput" />

      <select
        id="cars"
        name="cars"
        className="SortingInput"
        onChange={sortingHandler}>
        <option value="title">Title</option>
        <option value="price">Price</option>
      </select>
      <i className="fas fa-cart-arrow-down" onClick={openCart}></i>
      <div className="AllProductsContainer">
        {products.map((product, index) => {
          return (
            <Product
              product={product}
              deleteProduct={() => { deleteProductHandler(product.id, index) }}
              editProduct={() => { saveEdittedProductHandler(product.id) }}
              addToCartProduct={() => { addToCartProductHandle(product.id) }}
              key={index}
            />
          )
        })
        }
      </div>

      <div className="PadinationContainer">
        <button onClick={prevPageHandler} disabled={!pagination.canPrev}>Prev</button>
        <p>{page}</p>
        <button onClick={nextPageHandler} disabled={!pagination.canNext}>Next</button>
      </div>
    </Fragment>
  )
}

export default Products