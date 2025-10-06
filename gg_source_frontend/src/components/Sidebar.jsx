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
    { type: "link", title: "Change My Password", path: "/change-password" },
    { type: "link", title: "Change Pass by Admin", path: "/change-pass-admin" },
    { type: "link", title: "Change MPIN", path: "/change-mpin" },
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
        expanded ? "w-64" : "w-20"
      }`}
    >
      <div className="p-4 pb-2 flex justify-between items-center bg-white">
        {expanded && <img src={logo} alt="Logo" className="h-12 w-auto" />}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-800"
        >
          <GoSidebarCollapse size={20} />
        </button>
      </div>

      <ul className="flex-1 px-2 overflow-y-auto">
        {/* Dashboard link */}
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

        {/* Baaki menu items */}
        {menuItems.map((section, index) => (
          <li key={index} className="mb-1">
            {section.type === "collapse" ? (
              <>
                <button
                  onClick={() => toggleCollapse(index)}
                  className="flex justify-between items-center w-full py-2 px-2 rounded hover:bg-gray-700 transition"
                >
                  <span className="flex items-center gap-2">
                    {section.title === "Super Distributor" && <MdPerson size={18} />}
                    {section.title === "Distribution" && <MdPerson size={18} />}
                    {section.title === "Dealer" && <MdPerson size={18} />}
                    {section.title === "Report" && <BiBarChart size={18} />}
                    {expanded && section.title}
                  </span>
                  {expanded && (
                    <span>
                      {openIndex === index ? <BiChevronUp size={18} /> : <BiChevronDown size={18} />}
                    </span>
                  )}
                </button>

                {expanded && openIndex === index && section.items.length > 0 && (
                  <ul className="ml-6 mt-1 space-y-1">
                    {section.items.map((item, idx) => (
                      <li key={idx}>
                        <Link
                          to={
                            section.title === "Super Distributor"
                              ? item === "Add"
                                ? "/addDistributor"
                                : "/listofDistributor"
                              : "#"
                          }
                          className={`flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-700 transition ${
                            isActiveLink(
                              section.title === "Super Distributor"
                                ? item === "Add"
                                  ? "/addDistributor"
                                  : "/listofDistributor"
                                : ""
                            )
                              ? "bg-indigo-700 text-white"
                              : ""
                          }`}
                        >
                          {item === "Add" && <BiPlus size={18} />}
                          {item === "List" && <BiListUl size={18} />}
                          <span>{item}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link
                to={section.path || "#"}
                className={`flex items-center gap-2 py-2 px-2 rounded hover:bg-gray-700 transition ${
                  section.path && isActiveLink(section.path) ? "bg-indigo-700 text-white" : ""
                }`}
              >
                {section.title === "Fresh Enrolls" && <BiUserPlus size={18} />}
                {section.title === "Device Detail" && <BiChip size={18} />}
                {section.title === "Change My Password" && <BiKey size={18} />}
                {section.title === "Change Pass by Admin" && <BiShield size={18} />}
                {section.title === "Change MPIN" && <BiLock size={18} />}
                {section.title === "Logout" && <BiLogOut size={18} />}
                {expanded && <span>{section.title}</span>}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {expanded && (
        <div className="bg-blue-700 p-3 text-sm text-white">
          Copyright @ 2025, All Rights Reserved
        </div>
      )}
    </aside>
  );
}
