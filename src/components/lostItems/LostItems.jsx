import React, { useState, useEffect } from "react";
import "../style.css";
import { Link } from "react-router-dom";

async function fetchLostItems(supabase, setItems) {
  let { data: Lost_Items, error } = await supabase
    .from("Lost_Items")
    .select("*")
    .is("still_lost", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
    return;
  }
  setItems(Lost_Items);
}

function LostItems({ supabase }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchLostItems(supabase, setItems);
  }, [supabase]);

  return (
    <>
      <div className="outerContainer Adjustment">
        <div className="LI-Title">LOST ITEMS</div>
        <div className="LI-List">
          {items.map((item, index) => (
            <Link to={`/ItemPage/lost/${item.id}`} key={item.id}>
              <div className="LI" key={index}>
                <div className="info">
                  <p className="Item-Name">{item.Item_name}</p>
                  <p className="Location">Last Seen at: {item.Lost_at}</p>
                </div>
                <div className="BDesign"></div>
                <div className="LII">
                  <img src={item.img_url} alt="" className="itemImage" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default LostItems;
