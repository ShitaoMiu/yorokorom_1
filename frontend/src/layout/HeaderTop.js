import React from "react";

const HeaderTop = () => {
  return (
    <div className="headertop test">
      <div className="inputArea test">
        <input type="text" className="input-box" />
      </div>

      <div className="headerBtnArea test">
        <ul className="navbar_icons_ul">
          <li className="navbar_icons_li"></li>
          <li className="navbar_icons_li">
            <i className="fab fa-twitter"></i>
          </li>
          <li className="navbar_icons_li">
            <i className="fab fa-facebook-f"></i>
          </li>
          <li className="navbar_icons_li">
            <i className="fab fa-google"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderTop;
