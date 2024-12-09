import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../style.css";
async function fetchItem(id, type, supabase) {
  if (type === "lost") {
    let { data: Lost_Items, error } = await supabase
      .from("Lost_Items")
      .select("*")
      .eq("id", id);

    if (error) {
      console.error(error);
    }

    return Lost_Items;
  } else {
    let { data: Found_items, error } = await supabase
      .from("Found_items")
      .select("*")
      .eq("id", id);

    if (error) {
      console.error(error);
    }
    return Found_items;
  }
}
function ItemPage({ supabase }) {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);
  const [itemname, setItemName] = useState("");
  const [seenat, setseenat] = useState("");
  const [desc, setdesc] = useState("");
  const [contactno, setcontactno] = useState("");

  useEffect(() => {
    async function getItem() {
      const fetchedItem = await fetchItem(id, type, supabase);
      setItem(fetchedItem[0]);
      if (type === "lost") {
        setItemName(fetchedItem[0].Item_name);
        setseenat(fetchedItem[0].Lost_at);
        setdesc(fetchedItem[0].Description);
        setcontactno(fetchedItem[0].phone_number);
      } else {
        setItemName(fetchedItem[0].item_name);
        setseenat(fetchedItem[0].found_at);
        setdesc(fetchedItem[0].description);
        setcontactno(fetchedItem[0].phone_number);
      }
    }
    getItem();
  }, [id, type, supabase]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="itemPageContainer">
      <div className="itemImg">
        <img src={item.img_url} alt="" className="Img" />
      </div>
      <div className="itemDetailsContainer">
        <div className="itemName">
          <h3>Item Name</h3>
          <p>{itemname}</p>
        </div>
        <div className="seenAt">
          <h3>Seen At</h3>
          <p>{seenat}</p>
        </div>
        <div className="description">
          <h3>Description</h3>
          <p>{desc}</p>
        </div>
      </div>

      <div className="contactContainer">
        <div className="contactAt">Contact At</div>
        <div
          className="contactNumber"
          onClick={(e) => {
            e.stopPropagation();
            e.target.style.background = "transparent";
          }}
        >
          <p className="contactno">{contactno}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
