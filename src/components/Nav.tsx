import { FC, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FcHome } from "react-icons/fc";
import { useMediaQuery } from "react-responsive";
import { AiOutlineMenu } from "react-icons/ai";
import { VscClose } from "react-icons/vsc";
import { useAppDispatch } from "../redux/reduxHooks";
import { setNavHeight } from "../redux/navHeight";

const Nav: FC = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (navRef.current) {
      if (typeof window !== "undefined") {
        dispatch(
          setNavHeight(parseInt(window.getComputedStyle(navRef.current).height))
        );
      }
    }
  }, []);

  return (
    <>
      <nav
        className="px-8 flex justify-between items-center py-8 md:px-28 sticky border-b border-gray-500 top-0"
        style={{
          zIndex: 4,
          background: "rgba(6, 10, 17, 1)",
          transition: "0.4s",
        }}
        ref={navRef}
      >
        <h1 className="font-openSans text-white font-bold text-2xl flex items-center space-x-3">
          <FcHome /> <span>Lego</span>
        </h1>

        {isTabletOrMobile && (
          <button onClick={() => setNavOpen(true)}>
            <AiOutlineMenu color="#fff" fontSize="2rem" />
          </button>
        )}

        {!isTabletOrMobile && (
          <ul className="flex space-x-16 items-center font-medium text-dim-white">
            <li>
              <Link href="#properties">Properties</Link>
            </li>
            <li>
              <Link href="#special">Special</Link>
            </li>
            <li>
              <Link href="#testimonial">Testimonial</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
          </ul>
        )}
      </nav>
      {isTabletOrMobile && (
        <div
          className={`fixed ${
            navOpen ? "left-0" : "left-full"
          } from-gray-800 to-gray-900 bg-gradient-to-br py-8 top-0 h-full w-full flex-col flex items-end px-8 justify-center transition-all duration-300`}
          style={{ zIndex: 4 }}
        >
          <div className="flex justify-between items-center w-full">
            <h1 className="font-openSans text-white font-bold text-2xl flex items-center space-x-3">
              <FcHome /> <span>Lego</span>
            </h1>
            <button onClick={() => setNavOpen(false)}>
              <VscClose color="#fff" fontSize="2rem" />
            </button>
          </div>
          <ul className="flex flex-col h-full w-full space-y-8 items-center font-medium justify-center text-dim-white text-2xl">
            <li onClick={() => setNavOpen(false)}>
              <Link href="#properties">Properties</Link>
            </li>
            <li onClick={() => setNavOpen(false)}>
              <Link href="#special">Special</Link>
            </li>
            <li onClick={() => setNavOpen(false)}>
              <Link href="#testimonial">Testimonial</Link>
            </li>
            <li onClick={() => setNavOpen(false)}>
              <Link href="/">Contact</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Nav;
