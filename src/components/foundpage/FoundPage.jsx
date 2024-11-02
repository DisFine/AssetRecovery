import { useState } from "react";
import "../style.css";
function FoundPage({ supabase }) {
  const [selectedIcon, setSelectedIcon] = useState("camera");

  const handleSelect = (icon) => {
    setSelectedIcon(icon);
  };

  const [itemname, setitemname] = useState("");
  const [foundat, setfoundat] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [description, setdescription] = useState("");
  return (
    <>
      <div className="outerContainer Adjustment">
        <div className="FoundTitle">
          Add Found ‎‎ <span>Item</span>
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
        <div className="IFound">
          <label htmlFor="ILocation">Found At</label>
          <input
            type="text"
            id="ILocation"
            className="FoundField"
            value={foundat}
            onChange={(e) => {
              setfoundat(e.target.value);
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
              .from("Found_items")
              .insert([
                {
                  item_name: itemname,
                  found_at: foundat,
                  description: description,
                  found_item_url: "no",
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

export default FoundPage;
