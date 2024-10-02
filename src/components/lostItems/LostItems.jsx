import React, { useState, useEffect } from "react";
import "./style.css";

async function fetchLostItems(supabase, setItems) {
  let { data: Lost_Items, error } = await supabase
    .from("Lost_Items")
    .select("*");

  if (error) {
    console.error("Error fetching lost items:", error);
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
      <div className="LI-Title">LOST ITEMS</div>
      <div className="LI-List">
        {items.map((item, index) => (
          <div className="LI" key={index}>
            <div className="info">
              <p className="Item-Name">{item.Item_name}</p>
              <p className="Location">Last Seen at:{item.Lost_at}</p>
            </div>
            <div className="BDesign"></div>
            <div className="LII"></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default LostItems;
