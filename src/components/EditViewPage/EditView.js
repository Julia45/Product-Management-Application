import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import './EditView.css'

function EditView() {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState()
  const { id } = useParams();
  const history = useHistory();

  const [error, setError] = useState({
    titleError: "",
    descriptionError: "",
    priceError: ""
  })

  function validateInputsError(value) {
    if (!value) {
      return "The Filed is Empty"
    }
    return ""
  }

  function validatePriceInput(value) {
    let numbers = /^[1-9][0-9]+$/;
    if (!value) {
      return "The filed is Empty"
    } else if (numbers.test(value)) {
      return ""
    }
    return "The filed Contains Letters or Starts With 0 "
  }


  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  function productEditTitleHandler(e) {
    const newArrayOfProducts = {
      ...product,
      title: e.target.value,
    }
    setProduct(newArrayOfProducts)
  }

  function productEditPriceHandler(e) {
    const newArrayOfProducts = {
      ...product,
      price: e.target.value,
    }
    setProduct(newArrayOfProducts)
  }

  function productEditDescriptionHandler(e) {
    const newArrayOfProducts = {
      ...product,
      description: e.target.value,
    }
    setProduct(newArrayOfProducts)
  }

  function saveEdittedProductHandler() {
    let validationTitleError = validateInputsError(product.title)
    let validationDescriptionError = validateInputsError(product.description)
    let validationPriceError = validatePriceInput(product.price)

    setError({
      titleError: validationTitleError,
      descriptionError: validationDescriptionError,
      priceError: validationPriceError
    })

    if (validationTitleError || validationDescriptionError || validationPriceError) {
      return
    }

    fetch(`http://localhost:3000/products/${product.id}`, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(product)
    }).then((response) => {
      response.json().then((response) => {
        history.push("/");
      })
    })
  }

  return (
    <div className="EditViewWrapper">
      <h3>Edit The Product</h3>
      <input
        placeholder="Title"
        value={product.title}
        onChange={productEditTitleHandler} />
      <p className="Error">{error.titleError}</p>

      <input
        placeholder="Price"
        value={product.price}
        onChange={productEditPriceHandler} />
      <p className="Error">{error.priceError}</p>

      <input
        placeholder="Description"
        value={product.description}
        onChange={productEditDescriptionHandler} />
      <p className="Error">{error.descriptionError}</p>

      <button onClick={saveEdittedProductHandler}>Save</button>
    </div>
  )
}

export default EditView