import React, { useState, useEffect } from "react";
import "../style.css";
import { Link, useNavigate } from "react-router-dom";
async function fetchYourItems(supabase, setyouritems) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: Lost_Items, error } = await supabase
    .from("Lost_Items")
    .select("*")
    .eq("user_id", user.id)
    .is("still_lost", true);

  if (error) {
    console.log(error);
    return;
  }
  setyouritems(Lost_Items);
}
function UserComponent({ supabase }) {
  const navigate = useNavigate();
  const [youritems, setyouritems] = useState([]);
  useEffect(() => {
    fetchYourItems(supabase, setyouritems);
  }, [supabase]);
  return (
    <>
      <div className="UserOuterContainer">
        <div className="container1">
          <div className="UserNameField">UserName</div>
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
                  <button
                    className="MarkAsFound"
                    onClick={async (e) => {
                      e.preventDefault();

                      const { data, error } = await supabase
                        .from("Lost_Items")
                        .update({ still_lost: false })
                        .eq("id", item.id)
                        .select();
                      if (error) {
                        console.log("Couldn't update value");
                      }
                      fetchYourItems(supabase, setyouritems);
                    }}
                  >
                    Mark As Found
                  </button>
                  <button
                    className="Remove"
                    onClick={async () => {
                      console.log("Clicked");
                      const { error } = await supabase
                        .from("Lost_Items")
                        .delete()
                        .eq("id", item.id);
                      if (error) {
                        console.log("Couldn't remove item. ", error);
                      }
                      fetchYourItems(supabase, setyouritems);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserComponent;
