import React from 'react'
import "./style.css"
const Lost = () => {
  return (
    <>
      <div className="lostTitle">
        Add Lost ‎‎ <span>Item</span>
      </div>
      <div className="Img"></div>
      <div className="PSelect"></div>
      <div className="IName">
        <label for="IName">Item Name</label>
        <input type="text" id="IName" className="NameField"></input>
      </div>
      <div className="ILost">
        <label for="ILocation">Lost At</label>
        <input type="text" id="ILocation" className="LostField"></input>
      </div>
      <div className="PhoneNumber">
        <label for="INumber">Phone Number</label>
        <input type="number" id="INumber" className="NumberField"></input>
      </div>
      <textarea className="description" id="IDescription" placeholder="Description"></textarea>
      <button className='PostBtn'>Post</button>
    </>
  )
}

export default Lost
