import React from "react";
import "../style.css";
function FoundPage({ supabase }) {
  return (
    <>
      <div className="outerContainer Adjustment" >
        <div className="FoundTitle">
          Add Found ‎‎ <span>Item</span>
        </div>
        <div className="Img"></div>
        <div className="PSelect"></div>
        <div className="IName">
          <label htmlFor="IName">Item Name</label>
          <input type="text" id="IName" className="NameField"></input>
        </div>
        <div className="IFound">
          <label htmlFor="ILocation">Found At</label>
          <input type="text" id="ILocation" className="FoundField"></input>
        </div>
        <div className="PhoneNumber">
          <label htmlFor="INumber">Phone Number</label>
          <input type="number" id="INumber" className="NumberField"></input>
        </div>
        <textarea
          className="description"
          id="IDescription"
          placeholder="Description"
        ></textarea>
        <button className="PostBtn">Post</button>
      </div>
    </>
  );
}

export default FoundPage;
