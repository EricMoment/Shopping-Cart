import './App.css'
import { useEffect, useState } from "react";
import Caroseul from './Components/Caroseul';
import { Link } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([])
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('https://fakestoreapi.com/products').then(res => res.json()
    ).then((res) => {
      //only do first ten things
      let firstTen = res.filter((r) => r.id <= 10)
      setProducts(firstTen)
      console.log(firstTen)
    }).catch((err) => setErr(err))
    .finally(() => setLoading(false))
  }, [])
  const productsList = products.map((product) => {
      return (
        <Link to={`/product/${product.id}`} className='productCard' key={product.id}>
          <div className='productImage'><img src={product.image} /></div>
          <div className='productOverview'>
            <div className='productTitle'>{product.title}</div>
            <div className='productCategory'>{product.category[0].toUpperCase() + product.category.slice(1)}</div>
            <div className='productPrice'>€{parseFloat(product.price).toFixed(2)}</div>
          </div>
        </Link>
      )
    })
  return (
    <>
    {err? <div className='homeErr'>{err}</div> : 
      loading? <div className='homeLoading'>Loading......</div> :
      <>
        <Caroseul things={[products[2], products[6], products[8]]}/>
        <div className='homeProductContainer'>{productsList}</div>
      </>
    }
    </>
  )
}

export default App
