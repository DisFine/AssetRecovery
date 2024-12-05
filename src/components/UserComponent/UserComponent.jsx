import React from "react";
import "../style.css";
import { Link } from "react-router-dom";

function UserComponent() {
  return (
    <>
      <div className="UserOuterContainer">
        <div className="container1">
          <div className="UserNameField">UserName</div>
          <button className="LogOutField">LogOut</button>
        </div>
        <div className="addpost">
          <Link to="/Lost">
            <button>Add post</button>
          </Link>
        </div>
        <div className="container2">
          <h2>Your Items</h2>
          <div className="container3">
            <div className="YourItem">
              <div className="FI">
                <div className="info">
                  <p className="Item-Name"></p>
                  <p className="Location">Found at:</p>
                </div>
                <div className="BDesign"></div>
                <div className="FII">
                  <img alt="" className="itemImage" />
                </div>
              </div>
              <div className="OptionPart">
                <button className="MarkAsFound">Mark As Found</button>
                <button className="Remove">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserComponent;
