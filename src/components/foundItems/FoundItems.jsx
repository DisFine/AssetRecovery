import React from "react";
import { useState, useEffect } from "react";
import "../style.css";
import { Link } from "react-router-dom";

async function fetchFoundItems(supabase, setFoundItems) {
  let { data: Found_items, error } = await supabase
    .from("Found_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }
  setFoundItems(Found_items);
}

function FoundItems({ supabase }) {
  const [items, setFoundItems] = useState([]);

  useEffect(() => {
    fetchFoundItems(supabase, setFoundItems);
  }, [supabase]);
  return (
    <>
      <div className="outerContainer Adjustment">
        <div className="FI-Title">FOUND ITEMS</div>
        <div className="FI-List">
          {items.map((item, index) => (
            <Link to={`/ItemPage/found/${item.id}`} key={item.id}>
              <div className="FI">
                <div className="info">
                  <p className="Item-Name">{item.item_name}</p>
                  <p className="Location">Found at: {item.found_at}</p>
                </div>
                <div className="BDesign"></div>
                <div className="FII">
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

export default FoundItems;
