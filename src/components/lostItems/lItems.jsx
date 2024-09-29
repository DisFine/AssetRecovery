import React from 'react'
import './style.css'

const LostItems = () => {
  return (
    <>
      <div className="LI-Title">
        LOST ITEMS
      </div>
      <div className="LI-List">
        <div className="LI">
            <div className="info">
              <p className="Item-Name">ITEM NAME</p>
              <p className="Location">Last Seen at:</p>
            </div>
            <div className="BDesign"></div>
            <div className="LII"></div>
        </div>
      </div>
    </>
  )
}

export default LostItems
