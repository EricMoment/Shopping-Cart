import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import './DetailPage.css'

const DetailPage = () => {
  const { id } = useParams()
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState(null)
  const [qtyWarning, setQtyWarning] = useState(null)
  const setProductCount = useOutletContext();
  useEffect(() => {
    async function getProduct() {
      try {
        let response = await fetch(`https://fakestoreapi.com/products/${id}`, { mode: 'cors' })
        let data = await response.json()
        setDetails(data)
      } catch (err) {
        setErr(err)
      }
    setLoading(false)
    }
    getProduct()
  }, [id])

  function handleAddCart(e) {
    e.preventDefault()
    setQtyWarning(null)
    let title = e.target[0].name
    let totalOrdered = Number(sessionStorage[title]) + Number(e.target[0].value)
    if (totalOrdered > 10) {
      setQtyWarning('You can\'t order more than 10 at a time')
    } else if (Number(sessionStorage[title]) > 0) {
      sessionStorage[title] = totalOrdered
    } else {
      sessionStorage.setItem(title, Number(e.target[0].value))
      setProductCount(sessionStorage.length)
      localStorage.setItem(title, details.price)
    }
    console.log(sessionStorage)
    console.log(localStorage)
  }
  return (
    <>
    {err? <div className='homeErr'>{err}</div> : 
    loading? <div className='homeLoading'>Loading......</div> : 
      <div className="productDetailContainer">
        <div className="productDetailCard">
          <div className="productDetailImage"><img src={details.image}></img></div>
          <div className="productDetailContents">
            <h1 className="productDetailTitle">{details.title}</h1>
            <div className='productDetailPriceRating'>
              <div className='productDetailPrice'>€{parseFloat(details.price).toFixed(2)}</div>
              <div className='productDetailRating'>Rating: {details.rating.rate}/5</div>
            </div>
          </div>
        </div>
        <form className="productDetailForm" onSubmit={handleAddCart}>
          <label htmlFor="quantityToCart"><h5>Quantity</h5></label>
          <input type="number" id="quantityToCart" name={details.title} min="1" max="10" required/>
          <button type="submit">Add to Cart</button>
        </form>
        <h4 className="productDetailWarning">{qtyWarning}</h4>
        <div className="productDetailDescription">
          <div>{details.description[0].toUpperCase() + details.description.slice(1)}</div>
        </div>
      </div>
    }
    </>
  );
};

export default DetailPage;