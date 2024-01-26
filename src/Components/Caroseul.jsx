import { useRef } from 'react'
import './Caroseul.css'
import mountain from './assets/mountain.jpg'
import storage from './assets/storage.jpg'
import wedding from './assets/wedding.jpg'
//transition effect todo
export default function Caroseul({things}) {
  const [ref0, ref1, ref2] = [useRef(null), useRef(null), useRef(null)]
  const pictureOrder = [ref0, ref1, ref2]
  let leftRightCooldown = false
  
  function leftClick() {
    if (leftRightCooldown) return
    leftRightCooldown = true
    setTimeout(() => {leftRightCooldown = false}, 1000)
    pictureOrder[0].current.className = 'caroseulPictures toRight'
    pictureOrder[0].current.style.visibility = 'hidden';
    pictureOrder.unshift(pictureOrder.pop())
    pictureOrder[0].current.className = 'caroseulPictures fromLeft'
    pictureOrder[0].current.style.visibility = 'visible';

  }
  function rightClick() {
    if (leftRightCooldown) return
    leftRightCooldown = true
    setTimeout(() => {leftRightCooldown = false}, 1000)
    pictureOrder[0].current.className = 'caroseulPictures toLeft'
    pictureOrder[0].current.style.visibility = 'hidden';
    pictureOrder.push(pictureOrder.shift())
    pictureOrder[0].current.className = 'caroseulPictures fromRight'
    pictureOrder[0].current.style.visibility = 'visible';
  }
  return (
    <div className="caroseulContainer">
      <div className="caroseulPictures" id='cp0' ref={ref0}>
        <div className='caroseulBackground'>
          <img src={mountain}></img> 
        </div>
        <img src={things[0].image}></img>
        <h5 className='caroseulPictureDesc'>
          &quot;{things[0].description[0].toUpperCase() + things[0].description.slice(1)}&quot;
        </h5>
      </div>
      <div className="caroseulPictures" id='cp1' ref={ref1}>
        <div className='caroseulBackground'>
          <img src={wedding}></img>
        </div>
        <img src={things[1].image}></img>
        <h5 className='caroseulPictureDesc'>
          &quot;{things[1].description}&quot;
        </h5>
      </div>
      <div className="caroseulPictures" id='cp2' ref={ref2}>
        <div className='caroseulBackground'>
          <img src={storage}></img>
        </div>
        <img src={things[2].image}></img>
        <h5 className='caroseulPictureDesc'>
          &quot;{things[2].description}&quot;
        </h5>
      </div>
      <div className="caroseul_left_button" onClick={leftClick}>←</div>
      <div className="caroseul_right_button" onClick={rightClick}>→</div>
    </div>
  )
}