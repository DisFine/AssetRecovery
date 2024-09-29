import React from 'react'
import './style.css'
const fItems = () => {
  return (
    <>
      <div className="FI-Title">
        FOUND ITEMS
      </div>
      <div className="FI-List">
        <div className="FI">
            <div className="info">
              <p className="Item-Name">ITEM NAME</p>
              <p className="Location">Found at:</p>
            </div>
            <div className="BDesign"></div>
            <div className="FII"></div>
        </div>
      </div>
    </>
  )
}

export default fItems
