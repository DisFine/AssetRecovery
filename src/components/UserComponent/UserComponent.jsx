import React, { useState, useEffect } from "react";
import "../style.css";
import { Link, useNavigate } from "react-router-dom";

function MarkButton({
  supabase,
  found,
  item,
  setyouritems,
  setMarkedItems,
  setusername,
}) {
  let loststatus;
  let buttontext;
  let buttonclass;

  if (found) {
    loststatus = true;
    buttontext = "Mark as Lost";
    buttonclass = "MarkAsLost";
  } else {
    loststatus = false;
    buttontext = "Mark as Found";
    buttonclass = "MarkAsFound";
  }
  return (
    <button
      className={buttonclass}
      onClick={async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
          .from("Lost_Items")
          .update({ still_lost: loststatus })
          .eq("id", item.id)
          .select();
        if (error) {
          console.log("Couldn't update value \n", error);
        }
        fetchYourItems(
          supabase,
          setyouritems,
          setMarkedItems,
          setusername,
          found
        );
      }}
    >
      {buttontext}
    </button>
  );
}
async function fetchYourItems(
  supabase,
  setyouritems,
  setMarkedItems,
  setusername,
  found
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: Lost_Items, error } = await supabase
    .from("Lost_Items")
    .select("*")
    .eq("user_id", user.id)
    .is("still_lost", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  let { data: Found_Items, errorf } = await supabase
    .from("Lost_Items")
    .select("*")
    .eq("user_id", user.id)
    .is("still_lost", false)
    .order("created_at", { ascending: false });

  if (errorf) {
    console.log(error);
    return;
  }

  setyouritems(Lost_Items);
  setMarkedItems(Found_Items);
  setusername(user.email);
}

function Card({
  supabase,
  item,
  found,
  index,
  setyouritems,
  setMarkedItems,
  setusername,
}) {
  return (
    <div className="YourItem" key={index}>
      <Link to={`/ItemPage/lost/${item.id}`} key={item.id}>
        <div className="FI">
          <div className="info">
            <p className="Item-Name">{item.Item_name}</p>
            <p className="Location">Found at: {item.Lost_at}</p>
          </div>
          <div className="BDesign"></div>
          <div className="FII">
            <img alt="" className="itemImage" src={item.img_url} />
          </div>
        </div>
      </Link>
      <div className="OptionPart">
        <MarkButton
          supabase={supabase}
          found={found}
          item={item}
          setyouritems={setyouritems}
          setMarkedItems={setMarkedItems}
          setusername={setusername}
        />
        <button
          className="Remove"
          onClick={async () => {
            console.log("Clicked");
            let { data: Lost_Items, erroru } = await supabase
              .from("Lost_Items")
              .select("img_url")
              .eq("id", item.id);
            let publicUrl = Lost_Items[0].img_url;

            const filePath = publicUrl.split(
              "/storage/v1/object/public/Items/"
            )[1];

            console.log(filePath);
            // Delete the file from the bucket

            const { errori } = await supabase.storage
              .from("Items")
              .remove([filePath]);

            if (errori) {
              console.error("Error deleting file:", errori);
            } else {
              console.log("File deleted successfully");
            }

            const { error } = await supabase
              .from("Lost_Items")
              .delete()
              .eq("id", item.id);
            if (error) {
              console.log("Couldn't remove item. ", error);
            }

            fetchYourItems(supabase, setyouritems, setMarkedItems, setusername);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
function UserComponent({ supabase }) {
  const navigate = useNavigate();
  const [youritems, setyouritems] = useState([]);
  const [markeditems, setMarkedItems] = useState([]);
  const [username, setusername] = useState("");
  useEffect(() => {
    fetchYourItems(supabase, setyouritems, setMarkedItems, setusername);
  }, [supabase]);

  return (
    <>
      <div className="UserOuterContainer">
        <div className="container1">
          <div className="UserNameField">{username}</div>
          <button
            className="LogOutField"
            onClick={async () => {
              let { error } = await supabase.auth.signOut();
              if (error) {
                console.log(error);
              } else {
                navigate("/");
              }
            }}
          >
            LogOut
          </button>
        </div>
        <div className="addpost">
          <Link to="/Lost">
            <button>Add post</button>
          </Link>
        </div>
        <div className="container2">
          <h2>Your Items</h2>
          <div className="container3">
            {youritems.map((item, index) => (
              <Card
                supabase={supabase}
                item={item}
                found={0}
                index={index}
                setyouritems={setyouritems}
                setMarkedItems={setMarkedItems}
                setusername={setusername}
              />
            ))}
            <h3 className="markfounditemsheading">Found Items</h3>
            {markeditems.map((item, index) => (
              <Card
                supabase={supabase}
                item={item}
                found={1}
                index={index}
                setyouritems={setyouritems}
                setMarkedItems={setMarkedItems}
                setusername={setusername}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserComponent;
