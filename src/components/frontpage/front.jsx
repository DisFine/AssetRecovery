import "./style.css";

function Front() {
  const handleLostClick = () => {
    window.location.href = "/SignIn";
  };
  const handleFoundClick = () => {
    window.location.href = "/found";
  };
  const handleLItemsClick = () => {
    window.location.href = "/lostItems";
  };
  const handleFItemsClick = () => {
    window.location.href = "/foundItems";
  };

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
          <button className="btn" onClick={handleLostClick}>
            I Lost Something
          </button>
          <button className="btn" onClick={handleFoundClick}>
            I Found Something
          </button>
          <div className="ButtonsIndex">
            <button className="btn" onClick={handleLItemsClick}>
              Lost Items
            </button>
            <button className="btn" onClick={handleFItemsClick}>
              Found Items
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Front;
