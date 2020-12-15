import React, { useState } from 'react'
import { useHistory} from "react-router-dom";
import './CreateView.css'


function CreateViewPage() {
  const history = useHistory();
  const [newlyCreatedProduct, setnewlyCreatedProduct] = useState({
    title: "",
    price: "",
    description: "",
  })

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
    } else if (value.match(numbers)) {
      return ""
    }
    return "The filed Contains Letters or Starts With 0 "
  }


  function saveProductHandler(e) {
    let newProduct = {
      title: newlyCreatedProduct.title,
      price: newlyCreatedProduct.price,
      description: newlyCreatedProduct.description,
    }

    let validationTitleError = validateInputsError(newProduct.title)
    let validationDescriptionError = validateInputsError(newProduct.description)
    let validationPriceError = validatePriceInput(newProduct.price)

    setError({
      titleError: validationTitleError,
      descriptionError: validationDescriptionError,
      priceError: validationPriceError
    })

    if (validationTitleError || validationDescriptionError || validationPriceError) {
      return
    }

    fetch("http://localhost:3000/products", {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newProduct)
    }).then((response) => {
      response.json().then((response) => {
        history.push("/");
      })
    })
  }

  function productTitleHandler(e) {
    const newArrayOfProducts = {
      ...newlyCreatedProduct,
      title: e.target.value,
    }
    setnewlyCreatedProduct(newArrayOfProducts)
  }

  function productPriceHandler(e) {
    const newArrayOfProducts = {
      ...newlyCreatedProduct,
      price: e.target.value,
    }
    setnewlyCreatedProduct(newArrayOfProducts)
  }

  function productDescriptionHandler(e) {
    const newArrayOfProducts = {
      ...newlyCreatedProduct,
      description: e.target.value,
    }
    setnewlyCreatedProduct(newArrayOfProducts)
  }

  return (
    <div className="CreateViewWrapper">
      <h3>Create a New Product</h3>
      <input
        placeholder="Title"
        onChange={productTitleHandler}
        value={newlyCreatedProduct.title} />
      <p className="Error">{error.titleError}</p>

      <input
        placeholder="Price"
        onChange={productPriceHandler}
        value={newlyCreatedProduct.price} />
      <p className="Error">{error.priceError}</p>

      <input
        placeholder="Description"
        onChange={productDescriptionHandler}
        value={newlyCreatedProduct.description} />
      <p className="Error">{error.descriptionError}</p>

      <button onClick={saveProductHandler}>Save</button>
    </div>
  )
}

export default CreateViewPage