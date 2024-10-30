import React from "react";
import { useState, useEffect } from "react";
import "../style.css";

async function fetchfounditems(supabase, setFoundItems) {
  let { data: Found_items, error } = await supabase
    .from("Found_items")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }
  setFoundItems(Found_items);
}
function FoundItems({ supabase }) {
  const [items, setFoundItems] = useState([]);

  useEffect(() => {
    fetchfounditems(supabase, setFoundItems);
  }, [supabase]);
  return (
    <>
      <div className="FI-Title">FOUND ITEMS</div>
      <div className="FI-List">
        {items.map((item, index) => (
          <div className="FI" key={index}>
            <div className="info">
              <p className="Item-Name">{item.item_name}</p>
              <p className="Location">Found at:{item.found_at}</p>
            </div>
            <div className="BDesign"></div>
            <div className="FII"></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FoundItems;
