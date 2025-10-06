import React, { useState } from "react";
import { MdDashboard, MdPerson } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import {
  BiPlus,
  BiListUl,
  BiUserPlus,
  BiChip,
  BiBarChart,
  BiKey,
  BiShield,
  BiLock,
  BiLogOut,
  BiChevronUp,
  BiChevronDown,
  BiReceipt,
  BiBox,
  BiTrendingDown,
  BiTrendingUp,
  BiCalendar,
} from "react-icons/bi";
import { GoSidebarCollapse } from "react-icons/go";
import logo from "../assets/Logo.png";

export default function Sidebar() {
  const menuItems = [
    { type: "collapse", title: "Super Distributor", items: ["Add", "List"] },
    { type: "collapse", title: "Distribution", items: ["List"] },
    { type: "collapse", title: "Dealer", items: ["List"] },
    { type: "link", title: "Fresh Enrolls", path: "/fresh-enrolls" },
    { type: "link", title: "Device Detail", path: "/device-detail" },
    {
      type: "collapse",
      title: "Report",
      items: [
        "Sale Report",
        "Stock Report",
        "Low Activation Report",
        "Activation Report",
        "Dob Report",
        "Key Record",
      ],
    },
    { type: "link", title: "Change My Password", path: "/changepassword" },
    { type: "link", title: "Change Pass by Admin", path: "/changepassadmin" },
    { type: "link", title: "Change MPIN", path: "/changempin" },
    { type: "link", title: "Logout", path: "/logout" },
  ];

  const [expanded, setExpanded] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);
  const location = useLocation();

  const toggleCollapse = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <aside
      className={`h-screen flex flex-col bg-gray-800 text-white transition-all duration-300 ${
        expanded ? "w-68" : "w-20"
      }`}
    >
      {/* Header with logo and collapse button */}
      <div className="p-4 pb-2 flex justify-between items-center bg-white">
        {expanded && <img src={logo} alt="Logo" className="h-12 w-auto" />}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-800"
        >
          <GoSidebarCollapse size={20} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <ul className="flex-1 px-2 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {/* Dashboard */}
        <li className="mb-1">
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 py-2 px-2 rounded hover:bg-gray-700 transition ${
              isActiveLink("/dashboard") ? "bg-indigo-700 text-white" : ""
            }`}
          >
            <MdDashboard size={20} />
            {expanded && <span className="ml-3 text-lg">Dashboard</span>}
          </Link>
        </li>

        {/* Dynamic Menu Items */}
        {menuItems.map((section, index) => (
          <li key={index} className="mb-1">
            {section.type === "collapse" ? (
              <>
                <button
                  onClick={() => toggleCollapse(index)}
                  className="flex justify-between items-center w-full py-2 px-2 rounded hover:bg-gray-700 transition duration-150"
                >
                  <span className="flex items-center gap-2">
                    {["Super Distributor", "Distribution", "Dealer"].includes(
                      section.title
                    ) && <MdPerson size={18} />}
                    {section.title === "Report" && <BiBarChart size={18} />}
                    {expanded && <span>{section.title}</span>}
                  </span>
                  {expanded && (
                    <span>
                      {openIndex === index ? (
                        <BiChevronUp size={18} />
                      ) : (
                        <BiChevronDown size={18} />
                      )}
                    </span>
                  )}
                </button>

                {/* Dropdown Items */}
                {expanded && openIndex === index && (
                  <ul className="ml-6 mt-1 space-y-1">
                    {section.items.map((item, idx) => {
                      let toPath = "#";

                      // Super Distributor Paths
                      if (section.title === "Super Distributor") {
                        toPath =
                          item === "Add"
                            ? "/addDistributor"
                            : "/listofDistributor";
                      }
                      // Distributor Paths
                      if (section.title === "Distribution") {
                        toPath = item === "List" ? "/listofDistribution" : "#";
                      }
                      // Dealer Paths
                      if (section.title === "Dealer") {
                        toPath = item === "List" ? "/listofDealer" : "#";
                      }

                      // Report Paths
                      if (section.title === "Report") {
                        const reportPaths = {
                          "Sale Report": "/sale-report",
                          "Stock Report": "/stock-report",
                          "Low Activation Report": "/low-activation-report",
                          "Activation Report": "/activation-report",
                          "Dob Report": "/dob-report",
                          "Key Record": "/key-record",
                        };
                        toPath = reportPaths[item] || "#";
                      }
                      //change Password by admin
                      if (section.title === "Change Pass by Admin") {
                        toPath = item === "Change Pass by Admin" ? "/changepassadmin" : "#";
                      }


                      //change MPIN
                      if (section.title === "Change MPIN") {
                        toPath = item === "Change MPIN" ? "/changempin" : "#";
                      }


                      return (
                        <li key={idx}>
                          <Link
                            to={toPath}
                            className={`flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-700 transition duration-150 ${
                              isActiveLink(toPath)
                                ? "bg-indigo-700 text-white"
                                : ""
                            }`}
                          >
                            {/* Icons for Super Distributor */}
                            {section.title === "Super Distributor" &&
                              item === "Add" && <BiPlus size={18} />}
                            {section.title === "Super Distributor" &&
                              item === "List" && <BiListUl size={18} />}

                            {/* Distributor */}
                            {section.title === "Distribution" &&
                              item === "List" && <BiListUl size={18} />}

                            {/* Dealer */}
                            {section.title === "Dealer" && item === "List" && (
                              <BiListUl size={18} />
                            )}

                            {/* Icons for Report items */}
                            {section.title === "Report" &&
                              item === "Sale Report" && <BiReceipt size={18} />}
                            {section.title === "Report" &&
                              item === "Stock Report" && <BiBox size={18} />}
                            {section.title === "Report" &&
                              item === "Low Activation Report" && (
                                <BiTrendingDown size={18} />
                              )}
                            {section.title === "Report" &&
                              item === "Activation Report" && (
                                <BiTrendingUp size={18} />
                              )}
                            {section.title === "Report" &&
                              item === "Dob Report" && <BiCalendar size={18} />}
                            {section.title === "Report" &&
                              item === "Key Record" && <BiKey size={18} />}

                            <span>{item}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            ) : (
              <Link
                to={section.path || "#"}
                className={`flex items-center gap-2 py-2 px-2 rounded hover:bg-gray-700 transition duration-150 ${
                  section.path && isActiveLink(section.path)
                    ? "bg-indigo-700 text-white"
                    : ""
                }`}
              >
                {section.title === "Fresh Enrolls" && <BiUserPlus size={18} />}
                {section.title === "Device Detail" && <BiChip size={18} />}
                {section.title === "Change My Password" && <BiKey size={18} />}
                {section.title === "Change Pass by Admin" && (
                  <BiShield size={18} />
                )}
                {section.title === "Change MPIN" && <BiLock size={18} />}
                {section.title === "Logout" && <BiLogOut size={18} />}
                {expanded && <span>{section.title}</span>}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Footer */}
      {expanded && (
        <div className="bg-blue-700 p-3 text-sm text-left text-white rounded-t-lg">
          Copyright © 2025 All Rights Reserved
        </div>
      )}
    </aside>
  );
}
