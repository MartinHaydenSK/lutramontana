import { HashRouter, Routes, Route } from "react-router-dom";
import { CalendarContextProvider } from "./context_app/context_calendar";
import { ContextFormProvider } from "./context_app/context_form";
import { MessagesFromBackendProvider } from "./context_app/context_messages_from_backend";
import ReviewProvider from "./context_app/context_reviews";
import Home from "./components/basic/home";
import Contact from "./components/basic/contact";
import NavBar from "./components/nav_bar/nav_bar";
import PriceList from "./components/basic/price_list";
import UpdatingReservationInt from "./components/booking_system/updating_reservation_int";
import Reservation from "./components/basic/reservation";
import Rules from "./components/basic/rules";
import ActivitiesNearby from "./components/basic/activities_nearby";

import ScrollToTop from "./components/nav_bar/scroll_to_top";
import FourOFourPage from "./components/basic/404_page";

function App() {
  return (
    <HashRouter>
      <ReviewProvider>
        <MessagesFromBackendProvider>
          <ContextFormProvider>
            <CalendarContextProvider>
              <NavBar />
              <ScrollToTop />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/aktualizovanieRezervacie"
                    element={<UpdatingReservationInt />}
                  />
                  <Route path="/rezervovanie" element={<Reservation />} />
                  <Route path="/cennik" element={<PriceList />} />
                  <Route path="/kontakt" element={<Contact />} />
                  <Route
                    path="/aktivityokolie"
                    element={<ActivitiesNearby />}
                  />
                  <Route path="/podmienkyubytovania" element={<Rules />} />
                  <Route path="*" element={<FourOFourPage />} />
                </Routes>
              </main>
            </CalendarContextProvider>
          </ContextFormProvider>
        </MessagesFromBackendProvider>
      </ReviewProvider>
    </HashRouter>
  );
}

export default App;
