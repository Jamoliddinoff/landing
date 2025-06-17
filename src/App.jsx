/* eslint-disable react/prop-types */
import { useEffect } from "react";
import "./styles/styles.css";
import { parallaxMouseMovement, parallaxScroll } from "@/utlis/parallax";

import { init_wow } from "@/utlis/initWowjs";
import { headerChangeOnScroll } from "@/utlis/changeHeaderOnScroll";
import { Route, Routes, useLocation } from "react-router-dom";
import Home1MainDemoMultiPage from "@/pages/homes/home-1/main-demo/main-multi-page/page";
import MainPortfolioSinglePage1 from "./pages/portfolio-single/main-portfolio-single-1/page";
import MainServicesPage1 from "./pages/services/main-pages-services-1/page";
import MainPageContact2 from "./pages/otherPages/main-pages-contact-2/page";
import MainPageNotFound from "./pages/otherPages/main-pages-404/page";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    init_wow();
    parallaxMouseMovement();
    var mainNav = document.querySelector(".main-nav");
    if (mainNav?.classList.contains("transparent")) {
      mainNav.classList.add("js-transparent");
    } else if (!mainNav?.classList?.contains("dark")) {
      mainNav?.classList.add("js-no-transparent-white");
    }

    window.addEventListener("scroll", headerChangeOnScroll);
    parallaxScroll();
    return () => {
      window.removeEventListener("scroll", headerChangeOnScroll);
    };
  }, [pathname]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/">
          {/*<Route index element={<PreviewPage />} />*/}
          {/* main multipage */}
          <Route index element={<Home1MainDemoMultiPage />} />
          {/*<Route path="main-multi-page" element={<Home1MainDemoMultiPage />} />*/}

          <Route
            path="main-portfolio-single-1"
            element={<MainPortfolioSinglePage1 />}
          />

          <Route path="main-pages-services-1" element={<MainServicesPage1 />} />
          <Route path="main-pages-contact-2" element={<MainPageContact2 />} />
        </Route>
        <Route path="*" element={<MainPageNotFound />} />
      </Routes>
      <ScrollTopBehaviour />
    </>
  );
}

export default App;
