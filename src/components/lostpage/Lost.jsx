import React from "react";
import { useEffect, useState } from "react";
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
  const [selectedIcon, setSelectedIcon] = useState("camera");
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      const user = await isAuthenticated(supabase);
      if (!user) {
        navigate("/");
      } else {
        setUser(user);
      }
    }
    fetchUser();
  }, [navigate, supabase]);

  window.addEventListener("popstate", function (event) {
    window.location.href = "/";
  });

  const handleSelect = (icon) => {
    setSelectedIcon(icon);
  };

  const [itemname, setitemname] = useState("");
  const [lostat, setlostat] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [description, setdescription] = useState("");

  return (
    <>
      <div className="outerContainer Adjustment">
        <div className="lostTitle">
          Add Lost ‎‎ <span>Item</span>
        </div>
        <div className="Img"></div>
        <div className="PSelect">
          <i
            className={`fa fa-camera icon ${
              selectedIcon === "camera" ? "selected" : ""
            }`}
            onClick={() => handleSelect("camera")}
          ></i>
          <i
            className={`fa fa-image icon ${
              selectedIcon === "image" ? "selected" : ""
            }`}
            onClick={() => handleSelect("image")}
          ></i>
        </div>
        <div className="IName">
          <label htmlFor="IName">Item Name</label>
          <input
            type="text"
            id="IName"
            className="NameField"
            value={itemname}
            onChange={(e) => {
              setitemname(e.target.value);
            }}
          ></input>
        </div>
        <div className="ILost">
          <label htmlFor="ILocation">Lost At</label>
          <input
            type="text"
            id="ILocation"
            className="LostField"
            value={lostat}
            onChange={(e) => {
              setlostat(e.target.value);
            }}
          ></input>
        </div>
        <div className="PhoneNumber">
          <div className="PhoneNumberText">
            <label htmlFor="INumber">Phone Number</label>
            <i className="fa fa-question-circle"></i>
          </div>
          <input
            type="number"
            id="INumber"
            className="NumberField"
            value={phonenumber}
            onChange={(e) => {
              setphonenumber(e.target.value);
            }}
          ></input>
        </div>
        <textarea
          className="description"
          id="IDescription"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        ></textarea>
        <button
          className="PostBtn"
          onClick={async () => {
            const { data, error } = await supabase
              .from("Lost_Items")
              .insert([
                {
                  Item_name: itemname,
                  Lost_at: lostat,
                  Description: description,
                  item_image_path: "no",
                  still_lost: true,
                  user_id: user.id,
                },
              ])
              .select();
            if (error) {
              console.log("error: ", error);
            }
          }}
        >
          Post
        </button>
      </div>
    </>
  );
}

export default Lost;
