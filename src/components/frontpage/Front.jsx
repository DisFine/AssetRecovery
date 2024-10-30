import "../style.css";
import { Link } from "react-router-dom";

function Front({ supabase }) {
  return (
    <>
      <div className="obj">
        <div className="Screen">
          <div className="IPbtn">
            <div className="dot1"></div>
            <div className="dot2"></div>
            <div className="dot3"></div>
          </div>

          <div className="BScreen">
            <h2>
              Asset Re<span>cover</span>y
            </h2>
          </div>
        </div>
        <div className="Buttons">
          <Link to="/SignIn">
            <button className="btn">I Lost Something</button>
          </Link>
          <Link to="/Found">
            <button className="btn">I Found Something</button>
          </Link>
          <div className="ButtonsIndex">
            <Link to="/LostItems">
              <button className="btn">Lost Items</button>
            </Link>
            <Link to="/FoundItems">
              <button className="btn">Found Items</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Front;
