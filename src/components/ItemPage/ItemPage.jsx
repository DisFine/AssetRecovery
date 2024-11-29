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

  useEffect(() => {
    async function getItem() {
      const fetchedItem = await fetchItem(id, type, supabase);
      setItem(fetchedItem[0]);
    }
    getItem();
  }, [id, type, supabase]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="itemPageContainer">
      <div className="itemImg">
          <img src={item.img_url} alt="" className="Img"/>
      </div>
      <div className="itemDetailsContainer">
        <div className="itemName">
            <h3>Item Name</h3>
        </div>
        <div className="seenAt">
            <h3>Seen At</h3>
        </div>
        <div className="description">
            <h3>Description</h3>
        </div>
      </div>
      <div className="phoneContainer">
        <div className="PhoneNumber">
          <h3>Phone Number</h3>
          <i className="fa fa-question-circle"></i>
        </div>
        <div className="PhoneNumberField">
          <div className="sendOTP">
            Send OTP
          </div>
          <input className="NumberField" type="number" ></input>
        </div>
        <div className="OTP">
          <h3>OTP</h3>
          <div className="OTPField">
            <div className="ShowNumber">
              Show Number
            </div>
            <input className="OTPNumberField" type="number" ></input>
          </div>
        </div>
      </div>
      <div className="contactContainer">
        <div className="contactAt">Contact At</div>
        <div className="contactNumber"></div>
      </div>
    </div>
  );
}

export default ItemPage;
