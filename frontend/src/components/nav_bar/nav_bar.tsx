import React, { useEffect, useState } from "react";
import AlertMessage from "../alertMessages/alert_message";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPersonHiking,
  faRectangleList,
  faCalendarDays,
  faComment,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const location = useLocation();
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setClicked(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openMenu = () => {
    if (window.innerWidth <= 1000) {
      setClicked((prev) => !prev);
    }
  };

  return (
    <>
      <nav className="nav-bar">
        <span>
          <img
            src="/images/logo.png"
            style={{ width: "150px", padding: "0px", margin: "0px" }}
            alt="Logo"
          />
          {!clicked ? (
            <FontAwesomeIcon icon={faBars} id="bars-icon" onClick={openMenu} />
          ) : (
            <FontAwesomeIcon icon={faX} id="bars-icon" onClick={openMenu} />
          )}
        </span>

        <ul className={clicked ? "open-menu" : ""}>
          <li>
            <FontAwesomeIcon icon={faHome} />
            <Link
              to="/"
              onClick={() => openMenu()}
              className={location.pathname === "/" ? "active-link" : ""}
            >
              Domov
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faPersonHiking} />
            <Link
              to="/aktivityokolie"
              onClick={() => openMenu()}
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
              onClick={() => openMenu()}
              className={location.pathname === "/cennik" ? "active-link" : ""}
            >
              Cenník
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faCalendarDays} />
            <Link
              to="/rezervovanie"
              onClick={() => openMenu()}
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
              onClick={() => openMenu()}
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
