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
  BiBell,
  BiCalendar,
} from "react-icons/bi";
import { GoSidebarCollapse } from "react-icons/go";
import logo from "../assets/Logo.png";

export default function Sidebar({ expanded, setExpanded }) {
  const [openIndex, setOpenIndex] = useState(null);
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { type: "collapse", title: "Super Distributor", items: ["Add", "List"] },
    { type: "collapse", title: "Distributor", items: ["Add","List"] },
    { type: "collapse", title: "Dealer", items: ["Add","List"] },
    { type: "link", title: "Fresh Enrolls", path: "/freshenrolls" },
    { type: "link", title: "Device Detail", path: "/devicedetail" },
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
    { type: "link", title: "Change My Password", path: "/changemypassword" },
    { type: "link", title: "Change Pass by Admin", path: "/changepassadmin" },
    { type: "link", title: "Change MPIN", path: "/changempin" },
    { type: "link", title: "Banner", path: "/banner" },
    { type: "link", title: "Notification", path: "/notification" },
    { type: "link", title: "Logout" },
  ];

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
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-800"
        >
          <GoSidebarCollapse size={20} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <ul className="flex-1 px-2 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
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

        {menuItems.map((section, index) => (
          <li key={index} className="mb-1">
            {section.type === "collapse" ? (
              <>
                <button
                  onClick={() => toggleCollapse(index)}
                  className="flex justify-between items-center w-full py-2 px-2 rounded hover:bg-gray-700 transition duration-150"
                >
                  <span className="flex items-center gap-2">
                    {["Super Distributor", "Distributor", "Dealer"].includes(
                      section.title
                    ) && <MdPerson size={18} />}
                    {section.title === "Report" && <BiBarChart size={18} />}
                    {section.title === "Banner" && <BiCalendar size={18} />}
                    {section.title === "Notification" && <BiBell size={18} />}
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

                {expanded && openIndex === index && (
                  <ul className="ml-6 mt-1 space-y-1">
                    {section.items.map((item, idx) => {
                      let toPath = "#";

                      // Generate paths dynamically
                      if (section.title === "Super Distributor") {
                        toPath =
                          item === "Add"
                            ? "/addsuperdistributor"
                            : "/superdistributorlist";
                      }
                      if (section.title === "Distributor") {
                        toPath = item === "Add"
                          ? "/adddistributor"
                            : "/distributorlist";
                      }
                      if (section.title === "Dealer") {
                        toPath = item ==="Add"
                          ? "/adddealer"
                            : "/dealerlist";
                      }
                      if (section.title === "Report") {
                        const reportPaths = {
                          "Sale Report": "/salereport",
                          "Stock Report": "/stockreport",
                          "Low Activation Report": "/lowactivationreport",
                          "Activation Report": "/activationreport",
                          "Dob Report": "/dobreport",
                          "Key Record": "/keyrecord",
                        };
                        toPath = reportPaths[item] || "#";
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
                            {/* Icons */}
                            {section.title === "Super Distributor" &&
                              item === "Add" && <BiPlus size={18} />}
                            {section.title === "Super Distributor" &&
                              item === "List" && <BiListUl size={18} />}
                               {section.title === "Distributor" &&
                              item === "Add" && <BiPlus size={18} />}
                            {section.title === "Distributor" &&
                              item === "List" && <BiListUl size={18} />}
                               {section.title === "Dealer" &&
                              item === "Add" && <BiPlus size={18} />}
                            {section.title === "Dealer" &&
                              item === "List" && <BiListUl size={18} />}
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
            ) : section.title === "Logout" ? (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center gap-2 py-2 px-2 w-full text-left rounded hover:bg-gray-700 transition duration-150"
              >
                <BiLogOut size={18} />
                {expanded && <span>{section.title}</span>}
              </button>
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
                {section.title === "Change Pass by Admin" && <BiShield size={18} />}
                {section.title === "Change MPIN" && <BiLock size={18} />}
                {section.title === "Banner" && <BiCalendar size={18} />}
                {section.title === "Notification" && <BiBell size={18} />}
                {expanded && <span>{section.title}</span>}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Footer */}
      {expanded && (
        <div className="bg-blue-700 p-3 text-sm text-left text-white rectangle-t-lg">
          Copyright © 2025 All Rights Reserved
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
                className="bg-blue-700 text-white px-6 py-1 rounded hover:bg-blue-500"
              >
                YES
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-blue-700 text-white px-6 py-1 rounded hover:bg-blue-500"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
