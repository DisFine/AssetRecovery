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
  const [imageurl, setimageurl] = useState(
    "https://th.bing.com/th/id/OIP.EZrb_W935zKQpTgcBTAXBgHaEc?w=296&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
  );
  return (
    <>
      <div className="outerContainer Adjustment">
        <div className="lostTitle">
          Add Lost ‎‎ <span>Item</span>
        </div>
        <div className="Img">
          <img src={imageurl} alt="" className="itemimage" />
        </div>
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
            onClick={() => {
              handleSelect("image");
              document.getElementById("galleryinput").click();
            }}
          ></i>
          <input
            type="file"
            id="galleryinput"
            style={{ display: "none" }}
            onChange={async (e) => {
              const file = e.target.files[0];
              const filename = file.name;
              let Path;
              const { data, error } = await supabase.storage
                .from("Items")
                .upload("Lost_items/" + filename, file, {
                  cacheControl: "3600",
                  upsert: false,
                });
              if (error) {
                console.error("error : ", error);
              } else {
                console.log(data.path);
                Path = data.path;
              }
              const { data: dataurl } = supabase.storage
                .from("Items")
                .getPublicUrl(Path);
              console.log("dataurl: ", dataurl.publicUrl);
              console.log("path : ", Path);
              setimageurl(dataurl.publicUrl);
            }}
          ></input>
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
                  item_image_path: imageurl,
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
