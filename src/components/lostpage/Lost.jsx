import React from "react";
import { useEffect } from "react";
import "../style.css";

import { Link, useNavigate } from "react-router-dom";

async function isAuthenticated(supabase) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

function Lost({ supabase }) {
  const navigate = useNavigate();
  const [selectedIcon, setSelectedIcon] = useState('camera');

  useEffect(() => {
    if (!isAuthenticated(supabase)) {
      console.log("inside lost\n");
      navigate("/");
    }
  }, [navigate, supabase]);

  window.addEventListener("popstate", function (event) {
    window.location.href = "/";
  });

  const handleSelect = (icon) => {
    setSelectedIcon(icon);
  };

  return (
    <>
    <div className="outerContainer Adjustment">
      <div className="lostTitle">
        Add Lost ‎‎ <span>Item</span>
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
      <div className="ILost">
        <label htmlFor="ILocation">Lost At</label>
        <input type="text" id="ILocation" className="LostField"></input>
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

export default Lost;
