import { useState } from "react";
import "../style.css";
function FoundPage({ supabase }) {
  const [selectedIcon, setSelectedIcon] = useState('camera');

  const handleSelect = (icon) => {
    setSelectedIcon(icon);
  };

  return (
    <>
      <div className="outerContainer Adjustment" >
        <div className="FoundTitle">
          Add Found ‎‎ <span>Item</span>
        </div>
        <div className="Img"></div>
        <div className="PSelect">
          <i
            className={`fa fa-camera icon ${selectedIcon === "camera" ? "selected" : ""}`}
            onClick={() => handleSelect("camera")}
          ></i>
          <i
            className={`fa fa-image icon ${selectedIcon === "image" ? "selected" : ""}`}
            onClick={() => handleSelect("image")}
          ></i>
        </div>
        <div className="IName">
          <label htmlFor="IName">Item Name</label>
          <input type="text" id="IName" className="NameField"></input>
        </div>
        <div className="IFound">
          <label htmlFor="ILocation">Found At</label>
          <input type="text" id="ILocation" className="FoundField"></input>
        </div>
        <div className="PhoneNumber">
          <div className="PhoneNumberText">
            <label htmlFor="INumber">Phone Number</label>
            <i className="fa fa-question-circle"></i>
          </div>
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
