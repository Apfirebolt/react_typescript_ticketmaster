import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import { FaTimes } from "react-icons/fa";


const HeaderComponent: React.FC = () => {
  interface Link {
    name: string;
    url: string;
  }

  const links: Link[] = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Login",
      url: "/login",
    },
    {
      name: "Venue",
      url: "/venues",
    },
    {
      name: "Attraction",
      url: "/attractions",
    },
    {
      name: "Classification",
      url: "/classifications",
    },
    {
      name: "Event",
      url: "/events",
    },
  ];

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const transitions = useTransition(open, {
    from: { opacity: 0, transform: "translateY(-20px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-20px)" },
    config: { duration: 200 },
  });

  return (
    <nav className="bg-primary-300 border-gray-200 px-2 sm:px-4 py-4">
      {transitions((style, item) =>
        item && (
          <animated.div style={style} className="my-3 md:hidden">
            <ul className="flex flex-col mt-4 bg-primary-200 text-white rounded-lg border border-gray-100">
              <li className="flex justify-end">
                <button
                  type="button"
                  className="p-4 text-white hover:bg-secondary-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 shadow-md rounded-md"
                  onClick={handleToggle}
                >
                  <FaTimes />
                </button>
              </li>
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.url}
                    className="block text-center p-4 dark:text-gray-300 dark:hover:text-gray-100 hover:text-secondary-300 hover:bg-primary-100 transition-all duration-150"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </animated.div>
        )
      )}
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <p className="text-3xl text-white font-bold w-1/3">
          TicketMaster App
        </p>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-white rounded-lg md:hidden hover:bg-secondary-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={handleToggle}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col mt-4 bg-primary-100 text-white rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.url}
                  className="block p-4 dark:text-gray-300 dark:hover:text-gray-100 hover:text-secondary-200 hover:bg-primary-200 transition-all duration-150"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;