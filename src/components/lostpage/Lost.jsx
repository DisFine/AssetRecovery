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

  const [itemName, setItemName] = useState("");
  const [lostAt, setLostAt] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://th.bing.com/th/id/OIP.EZrb_W935zKQpTgcBTAXBgHaEc?w=296&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
  );

  const [file, setFile] = useState(null);
  return (
    <>
      <div className="outerContainer Adjustment">
        <div className="lostTitle">
          Add Lost ‎<span>Item</span>
        </div>
        <div className="Img">
          <img src={imageUrl} alt="" className="itemImage" />
        </div>
        <div className="PSelect">
          <i
            className={`fa fa-camera icon ${
              selectedIcon === "camera" ? "selected" : ""
            }`}
            onClick={() => {
              handleSelect("camera");
              document.getElementById("cameraInput").click();
            }}
          ></i>
          <input
            type="file"
            accept="image/*"
            capture="camera"
            id="cameraInput"
            style={{ display: "none" }}
            onChange={async (e) => {
              setFile(e.target.files[0]);
              const tempUrl = URL.createObjectURL(e.target.files[0]);
              setImageUrl(tempUrl);
            }}
          ></input>
          <i
            className={`fa fa-image icon ${
              selectedIcon === "image" ? "selected" : ""
            }`}
            onClick={() => {
              handleSelect("image");
              document.getElementById("galleryInput").click();
            }}
          ></i>
          <input
            type="file"
            accept="image/*"
            id="galleryInput"
            style={{ display: "none" }}
            onChange={async (e) => {
              setFile(e.target.files[0]);
              const tempUrl = URL.createObjectURL(e.target.files[0]);
              setImageUrl(tempUrl);
            }}
          ></input>
        </div>
        <div className="IName">
          <label htmlFor="IName">Item Name</label>
          <input
            type="text"
            id="IName"
            className="NameField"
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value);
            }}
          ></input>
        </div>
        <div className="ILost">
          <label htmlFor="ILocation">Lost At</label>
          <input
            type="text"
            id="ILocation"
            className="LostField"
            value={lostAt}
            onChange={(e) => {
              setLostAt(e.target.value);
            }}
          ></input>
        </div>
        <div className="PhoneNumber">
          <div className="PhoneNumberText">
            <label htmlFor="INumber">Phone Number</label>
            <div className="icon-container">
              <i className="fa fa-question-circle"></i>
              <span className="tooltip-text">Enter your 10-digit phone number.</span>
            </div>
          </div>
          <input
            type="number"
            id="INumber"
            className="NumberField"
            value={PhoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          ></input>
        </div>
        <textarea
          className="description"
          id="IDescription"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <button
          className="PostBtn"
          onClick={async () => {
            const filename = file.name;
            let Path;

            const { data: dataPath, error: errorPath } = await supabase.storage
              .from("Items")
              .upload("Lost_items/" + filename, file, {
                cacheControl: "3600",
                upsert: false,
              });

            if (errorPath) {
              console.error("error : ", errorPath);
            } else {
              console.log(dataPath.path);
              Path = dataPath.path;
            }

            const { data: dataUrl } = supabase.storage
              .from("Items")
              .getPublicUrl(Path);

            console.log("dataUrl: ", dataUrl.publicUrl);
            console.log("path : ", Path);
            const finalurl = dataUrl.publicUrl;

            const { data, error } = await supabase
              .from("Lost_Items")
              .insert([
                {
                  Item_name: itemName,
                  Lost_at: lostAt,
                  Description: description,
                  img_url: finalurl,
                  still_lost: true,
                  phone_number: PhoneNumber,
                  user_id: user.id,
                },
              ])
              .select();

            if (error) {
              console.log("error: ", error);
            } else {
              console.log("Final url: ", imageUrl);
              navigate("/User");
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
