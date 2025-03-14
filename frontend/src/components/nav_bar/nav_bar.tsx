import React from "react";
import AlertMessage from "../alertMessages/alert_message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import { faRectangleList } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
const NavBar: React.FC = () => {
  const location = useLocation();
  const [clicked, setClicked] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(1);

  const openMenu = () => {
    if (number === 1) {
      setClicked(true);
      setNumber(2);
    } else {
      setClicked(false);
      setNumber(1);
    }
  };

  return (
    <>
      <nav className="nav-bar">
        <span>
          <img
            src="/images/logo.png"
            style={{ width: "150px", padding: "0px", margin: "0px" }}
            alt=""
          />
          <FontAwesomeIcon
            icon={faBars}
            id="bars-icon"
            onClick={() => openMenu()}
          />
        </span>

        <ul className={clicked ? "open-menu" : ""}>
          <li>
            <FontAwesomeIcon icon={faHome} />
            <Link
              to="/"
              className={location.pathname === "/" ? "active-link" : ""}
            >
              Domov
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faPersonHiking} />
            <Link
              to="/aktivityokolie"
              className={
                location.pathname === "/aktivityokolie" ? "active-link" : ""
              }
            >
              Aktivity v okolí
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faRectangleList} />
            <Link
              to="/cennik"
              className={location.pathname === "/cennik" ? "active-link" : ""}
            >
              Cenník
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faCalendarDays} />
            <Link
              to="/rezervovanie"
              className={
                location.pathname === "/rezervovanie" ? "active-link" : ""
              }
            >
              Rezervácia
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faComment} />
            <Link
              to="/kontakt"
              className={location.pathname === "/kontakt" ? "active-link" : ""}
            >
              Kontakt
            </Link>
          </li>
        </ul>
      </nav>
      <AlertMessage />
    </>
  );
};

export default NavBar;
