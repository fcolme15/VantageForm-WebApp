"use client";

import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b lg:backdrop-blur-sm ${
        openNavigation ? "" : "backdrop-blur-sm"
      }`}
      style={{
        borderColor: "var(--n-6)",
        backgroundColor: openNavigation
          ? "var(--n-8)"
          : "rgba(14, 12, 21, 0.9)",
      }}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <div className="flex">
          <a className="block w-[12rem] xl:mr-8 h-2 " href="#hero">
            VantageForm
          </a>
        </div>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 lg:static lg:flex lg:mx-auto`}
          style={{
            backgroundColor: openNavigation ? "var(--n-8)" : "transparent",
          }}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase transition-colors ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 xl:px-12`}
                style={{
                  color:
                    item.url === pathname.hash
                      ? "var(--n-1)"
                      : "rgba(255, 255, 255, 0.5)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    item.url === pathname.hash
                      ? "var(--n-1)"
                      : "rgba(255, 255, 255, 0.5)")
                }
              >
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        <a
          href="#signup"
          className="button hidden mr-8 transition-colors lg:block"
          style={{ color: "rgba(255, 255, 255, 0.5)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--n-1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)")
          }
        >
          New account
        </a>

        <Button className="!hidden lg:!flex " href="#login">
          Sign in
        </Button>


        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
      </div>
  );
};

export default Header;
