/* eslint-disable react/prop-types */
import { init_classic_menu_resize } from "@/utlis/menuToggle";
import { scrollToElement } from "@/utlis/scrollToElement";

import { Link, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
export default function Nav2({ links }) {
  const [menuOpen, setMenuOpen] = useState([-1, -1]);

  const toggleParent1 = (i) => {
    const tempMenuOpen = [...menuOpen];
    if (menuOpen[0] == i) {
      tempMenuOpen[0] = -1;
    } else {
      tempMenuOpen[0] = i;
    }
    setMenuOpen(tempMenuOpen);
  };
  const toggleParent2 = (i) => {
    const tempMenuOpen = [...menuOpen];
    if (menuOpen[1] == i) {
      tempMenuOpen[1] = -1;
    } else {
      tempMenuOpen[1] = i;
    }
    setMenuOpen(tempMenuOpen);
  };
  const { pathname } = useLocation();
  useEffect(() => {
    setTimeout(() => {
      scrollToElement();
    }, 1000);
    init_classic_menu_resize();
    // window.addEventListener("scroll", addScrollspy);

    window.addEventListener("resize", init_classic_menu_resize);

    return () => {
      // window.removeEventListener("scroll", addScrollspy);
      window.removeEventListener("resize", init_classic_menu_resize);
    };
  }, []);

  return (
    <>
      {links.slice(0, 3).map((item, index) => (
        <li className={menuOpen[0] == index ? "js-opened" : ""} key={index}>
          <a
            href={item.path}
            // onClick={() => toggleParent1(index)}
            className={`mn-has-sub ${
              item.subMenu.some((e1) =>
                e1.links.some(
                  (e2) => e2.href.split("/")[1] == pathname.split("/")[1]
                )
              )
                ? "active"
                : ""
            }`}
          >
            {item.title}
          </a>
        </li>
      ))}
      {/* End Item With Sub */}
      {/* Item With Sub */}
      {links.slice(3, 5).map((item, index) => (
        <li className={menuOpen[0] == index + 3 ? "js-opened" : ""} key={index}>
          <a
            // onClick={() => toggleParent1(index + 3)}
            href={item.path}
            className={`mn-has-sub ${
              item.subItems.some((e1) =>
                e1.links.some(
                  (e2) => e2.href.split("/")[1] == pathname.split("/")[1]
                )
              )
                ? "active"
                : pathname.split("/")[1]?.includes("main-portfolio-lazyload")
                ? "active"
                : ""
            }`}
          >
            {item.title}
          </a>
        </li>
      ))}
    </>
  );
}
