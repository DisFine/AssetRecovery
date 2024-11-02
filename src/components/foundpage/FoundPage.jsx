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
  const [imageurl, setimageurl] = useState(
    "https://th.bing.com/th/id/OIP.EZrb_W935zKQpTgcBTAXBgHaEc?w=296&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
  );
  const [file, setfile] = useState(null);
  return (
    <>
      <div className="outerContainer Adjustment">
        <div className="FoundTitle">
          Add Found ‎‎ <span>Item</span>
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
              setfile(e.target.files[0]);
              const tempUrl = URL.createObjectURL(e.target.files[0]);
              setimageurl(tempUrl);
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
            const filename = file.name;
            let Path;

            const { data: datapath, error: errorpath } = await supabase.storage
              .from("Items")
              .upload("Found_items/" + filename, file, {
                cacheControl: "3600",
                upsert: false,
              });

            if (errorpath) {
              console.error("error : ", errorpath);
            } else {
              console.log(datapath.path);
              Path = datapath.path;
            }

            const { data: dataurl } = supabase.storage
              .from("Items")
              .getPublicUrl(Path);

            console.log("dataurl: ", dataurl.publicUrl);
            console.log("path : ", Path);

            setimageurl(dataurl.publicUrl);
            const { data, error } = await supabase
              .from("Found_items")
              .insert([
                {
                  item_name: itemname,
                  found_at: foundat,
                  description: description,
                  found_item_url: imageurl,
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
