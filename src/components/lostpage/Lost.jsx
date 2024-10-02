import React from "react";
import { useEffect } from "react";
import "./style.css";

import { Link, useNavigate } from "react-router-dom";

async function isauthenticated(supabase) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

function Lost({ supabase }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isauthenticated(supabase)) {
      console.log("inside lost\n");
      navigate("/");
    }
  }, [navigate, supabase]);

  window.addEventListener("popstate", function (event) {
    window.location.href = "/";
  });

  return (
    <>
      <div className="lostTitle">
        Add Lost ‎‎ <span>Item</span>
      </div>
      <div className="Img"></div>
      <div className="PSelect"></div>
      <div className="IName">
        <label htmlFor="IName">Item Name</label>
        <input type="text" id="IName" className="NameField"></input>
      </div>
      <div className="ILost">
        <label htmlFor="ILocation">Lost At</label>
        <input type="text" id="ILocation" className="LostField"></input>
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
    </>
  );
}

export default Lost;
