import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import "./css/form.css";
import "./css/day_picker.css";
import "./css/reservation_system.css";
import "./css/nav_bar.css";
import "./css/home.css";
import "./css/price_list.css";
import "./css/contact.css";
import "./css/acitivities_nearby.css";
import "./css/rules.css";
import "./css/footer.css";
import "./css/update_reservation_interface.css";
import "./css/404.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
