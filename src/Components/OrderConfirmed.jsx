import './OrderConfirmed.css'
import { useNavigate } from 'react-router-dom'

export default function OrderConfirmed({ setConfirmed }) {
  const navigate = useNavigate()

  function handleClick(e) {
    e.preventDefault()
    setConfirmed(false)
    navigate('/')
  }
  return (
    <>
    <div className='black-overlay'></div>
    <div className='cartPageConfirmed'>
      <div className='cartPageConfirmedMessage'>Your order has been placed.</div>
      <button onClick={handleClick}>Back to Home Page</button>
    </div>
    </>
  )
}
