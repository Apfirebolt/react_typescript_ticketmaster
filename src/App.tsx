import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import { useTransition, animated } from "react-spring";

const Login = React.lazy(() => import("./screens/Login.tsx"));
const Register = React.lazy(() => import("./screens/Register.tsx"));
const HomePage = React.lazy(() => import("./screens/Home.tsx"));
const Venues = React.lazy(() => import("./screens/Venues.tsx"));
const Attractions = React.lazy(() => import("./screens/Attraction.tsx"));
const Classification = React.lazy(() => import("./screens/Classification.tsx"));
const Events = React.lazy(() => import("./screens/Event.tsx"));
const EventDetail = React.lazy(() => import("./screens/EventDetail.tsx"));
const VenueDetail = React.lazy(() => import("./screens/VenueDetail.tsx"));
const AttractionDetail = React.lazy(() => import("./screens/AttractionDetail.tsx"));
const NotFoundPage = React.lazy(() => import("./screens/404.tsx"));


const App = () => {
  const location = useLocation();
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-20px)" },
    config: { duration: 200 },
  });

  return (
    <>
      <Header />
      {transitions((props, item) => (
        <animated.div style={props} key={item.key}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes location={item}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/venues" element={<Venues />} />
              <Route path="/venues/:id" element={<VenueDetail />} />
              <Route path="/attractions" element={<Attractions />} />
              <Route path="/attractions/:id" element={<AttractionDetail />} />
              <Route path="/classifications" element={<Classification />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              {/* Add more routes as needed */}
              
              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />

            </Routes>
          </Suspense>
        </animated.div>
      ))}
      <Footer />
      <ToastContainer />
    </>
  );
};

const RootApp = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default RootApp;
