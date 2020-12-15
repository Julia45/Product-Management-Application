import React from 'react'
import './Product.css'

function Product({ product, canDecrease = true, canEdit = true, canAddToCart = true, showNumberProduct = false, ...props }) {

  return (
    <div className="ProductWrapper">
      <div className="ProductTitleWrapper">
        <div className="ProductTitle">{product.title}</div>
        <div><i className="fas fa-car"></i></div>
      </div>

      <div className="ProductDescription">{product.description}</div>
      <div className="ProductPrice">{product.price}$</div>
      <div className="ProductButtons">
        <div className="ProductEditDeeleteButtons">
          {canEdit && (
            <button onClick={props.editProduct} className="EditButton">Edit</button>
          )}

          <button onClick={props.deleteProduct} >Delete</button>
        </div>

        {canAddToCart && (
          <button onClick={props.addToCartProduct} disabled={product.inCart} className="addToCartButton">Add to Card</button>
        )}

        {showNumberProduct && (
          <div className="ChangeProductsNumber">
            <button onClick={props.addOneProduct}>+1</button>
            <div className="ProductCount">{product.count}</div>
            <button onClick={props.reduceOneProduct} disabled={canDecrease} >-1</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Product