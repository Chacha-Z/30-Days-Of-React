import React from "react";
import "./subscribe.scss"

function Subscribe(props){
  return (
    <div id='subscribe' >
      <h1 className='header'>SUBSCRIBE</h1>
      <p className='disc'>Sign up with your email address to receive news and updates.</p>

      <div className='fields'>
        
        <input placeholder="Fist name"></input>
        <input placeholder="Last name"></input>
        <input placeholder="Email"></input>
      </div>


      <button className='submit'>Subscribe</button>
    </div>
  )
}

export default Subscribe;