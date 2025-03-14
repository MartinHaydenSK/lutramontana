import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
const Footer: React.FC = () => {
  return (
    <footer>
      <section>
        <article className="logo-section-footer">
          <img
            src="/images/logo.png"
            style={{ width: "150px", padding: "0px", margin: "0px" }}
            alt=""
          />
        </article>

        <article className="contact-section-footer">
          <div>
            <FontAwesomeIcon icon={faEnvelope} />
            <p>email</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faPhone} />
            <p>telefon</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faFacebook} />
            <p>facebook</p>
          </div>
        </article>
        <article className="social-media-section-footer">
          <div>
            <p>
              <Link to={"/podmienkyubytovania"}>Podmienky</Link>
            </p>
          </div>
          <div>
            <p>
              <Link to={"/rezervovanie"}>Obsadenosť</Link>
            </p>
          </div>
          <div>
            <p>
              <Link to={"/kontakt"}>Kde nás nájdete?</Link>
            </p>
          </div>
        </article>
      </section>
      <hr />
      <p style={{ fontSize: "14px" }}>
        © {new Date().getFullYear()} Lutra Montana. Všetky práva vyhradené.
      </p>
    </footer>
  );
};

export default Footer;
