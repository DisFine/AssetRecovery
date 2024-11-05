import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

async function fetchitem(id, type, supabase) {
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

  useEffect(() => {
    async function getItem() {
      const fetchedItem = await fetchitem(id, type, supabase);
      setItem(fetchedItem[0]);
    }
    getItem();
  }, [id, type, supabase]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="itempagecontainer">
      <div className="itemimg">
        <img src={item.img_url} alt="" />
      </div>
      <div className="itemdetailscontainer">
        <div className="itemname"></div>
        <div className="seenat"></div>
        <div className="description"></div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}

export default ItemPage;
