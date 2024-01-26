import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import OrderConfirmed from "./OrderConfirmed.jsx";
import './CartPage.css'
//grandTotal.current += Number(localStorage[product]) * Number(sessionStorage[product])

const totalPrice = (session, local) => {
  let total = 0;
  for (const [key, value] of Object.entries(session)) {
    total += Number(value) * Number(local[key])
  }
  return total
}

const textWrap = (text) => {
  if (text.length > 55) { return `${text.slice(0, 55)}...` }
  return text
}

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState(sessionStorage)
  const [confirmed, setConfirmed] = useState(false)
  const setProductCount = useOutletContext();
  const grandTotal = useRef(totalPrice(sessionStorage, localStorage))

  function handleQtyChange(e) {
    e.preventDefault()
    sessionStorage[e.target[0].name] = e.target[0].value
    grandTotal.current = totalPrice(sessionStorage, localStorage)
    console.log(sessionStorage)
    return setCartProducts({...sessionStorage})
  }
  function handleRemove(e) {
    e.preventDefault()
    sessionStorage.removeItem(e.target.name);
    setProductCount(sessionStorage.length)
    localStorage.removeItem(e.target.name);
    grandTotal.current = totalPrice(sessionStorage, localStorage)
    return setCartProducts({...sessionStorage})
  }
  const showCartProducts =
    Object.keys(cartProducts).map((product) => {
    return (
      <div className="cartPageProduct" key={product}>
        <div className="cartPageDetails">
          <div href={`product/${product.id}`} className="cartPageProductTitle">{textWrap(product)}</div>
          <div className="cartPageProductQty">Qty: {sessionStorage[product]}</div>
          <div className="cartPageProductSub">Subtotal: <span>€{parseFloat(Number(localStorage[product]) * Number(sessionStorage[product])).toFixed(2)}</span></div>
        </div>
        <form className="cartPageQtyControl" onSubmit={handleQtyChange}>
          <input type="number" name={product} min="1" max="10" required/>
          <button type="submit">Change</button>
          <button name={product} onClick={handleRemove}>Remove</button>
        </form>
      </div>
    )
  })
    
  function handleCheckout(e) {
    e.preventDefault()
    setConfirmed(true)
    sessionStorage.clear()
    setProductCount(sessionStorage.length)
    localStorage.clear()
  }
  return (
    <div className="cartPage">
      <h1>Cart</h1>
      {sessionStorage.length === 0? 'There is nothing in your carts' : 
      <>
        {showCartProducts}
        <div className="cartPageTotal">
          <h1>Grand Total: €{parseFloat(grandTotal.current).toFixed(2)}</h1>
          <button className="cartPageCheckoutBtn" onClick={handleCheckout}>Checkout</button>
        </div>
      </>
      }
      {confirmed? <OrderConfirmed setConfirmed={setConfirmed} /> : <></>}
    </div>
  );
};

export default CartPage;