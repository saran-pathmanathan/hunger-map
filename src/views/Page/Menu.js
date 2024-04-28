import React, { useEffect } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { BiIntersect } from "react-icons/bi";
import { BiFork } from "react-icons/bi";
import { BiCloudLightning } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { headerChange } from "../../store";

function Menu() {
  const dispatch = useDispatch();
  const header = useSelector((state) => state.header.id);
  const handleClick = (key) => {
    dispatch(headerChange(key));
  };

  useEffect(() => {}, [header]);

  return (
    <nav className="menu">
      <ul className="menu__list">
        <li
          onClick={() => handleClick(0)}
          className={`menu__item ${header === 0 ? "menu__title__active" : ""}`}
        >
          <a href="#" className="menu__label">
            <BiInfoCircle alt="Icon 1" className="menu__icon" />
            <span>Country Information</span>
          </a>
        </li>
        <li
          onClick={() => handleClick(1)}
          className={`menu__item ${header === 1 ? "menu__title__active" : ""}`}
        >
          <a href="#" className="menu__label">
            <BiIntersect alt="Icon 2" className="menu__icon" />
            <span>Integrated Food Security Phase Classification</span>
          </a>
        </li>
        <li
          onClick={() => handleClick(2)}
          className={`menu__item ${header === 2 ? "menu__title__active" : ""}`}
        >
          <a href="#" className="menu__label">
            <BiFork alt="Icon 3" className="menu__icon" />
            <span>Food Consumption Score (FCP)</span>
          </a>
        </li>
        <li
          onClick={() => handleClick(3)}
          className={`menu__item ${header === 3 ? "menu__title__active" : ""}`}
        >
          <a href="#" className="menu__label">
            <BiCloudLightning alt="Icon 4" className="menu__icon" />
            <span>Climate / Hazards</span>
          </a>
        </li>
      </ul>
      {header != 0 && (
        <div className="legend">
          <span style={{ marginBottom: "10px" }}>
            Integrated Food Security Phase Classification
          </span>
          <div className="legend__container">
            <div className="rectangle__container">
              <div
                className="rectangle"
                style={{ backgroundColor: "#22c1c3" }}
              ></div>
              <span className="legend__labels">0 - 1</span>
            </div>
            <div className="rectangle__container">
              <div
                className="rectangle"
                style={{ backgroundColor: "#f9bc30" }}
              ></div>
              <span className="legend__labels">1 - 2</span>
            </div>
            <div className="rectangle__container">
              <div
                className="rectangle"
                style={{ backgroundColor: "#dd0a43" }}
              ></div>
              <span className="legend__labels">2 - 3</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Menu;
