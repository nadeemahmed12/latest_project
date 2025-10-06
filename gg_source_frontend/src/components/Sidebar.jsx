import React, { useState } from "react";
import { MdDashboard, MdPerson } from "react-icons/md";
import {
  BiText,
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
  BiKey as BiKeyIcon,
} from "react-icons/bi";

function Sidebar() {
  const menuItems = [
    { type: "collapse", title: "Super Distributor", items: ["Add", "List"] },
    { type: "collapse", title: "Distribution", items: ["List"] },
    { type: "collapse", title: "Dealer", items: ["List"] },
    { type: "link", title: "Fresh Enrolls" },
    { type: "link", title: "Device Detail" },
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
    { type: "link", title: "Change My Password" },
    { type: "link", title: "Change Pass by Admin" },
    { type: "link", title: "Change MPIN" },
    { type: "link", title: "Logout" },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleCollapse = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sidebarClass = `w-64 bg-gray-800 text-white h-screen flex flex-col`;

  return (
    <div className={sidebarClass}>
      {/* Logo section (fixed at top) */}
      <div className="bg-white h-14 flex items-center justify-center shrink-0">
        <img src="/assets/logo 1.png" alt="Logo" className="h-12 w-auto" />
      </div>

      {/* Scrollable menu section */}
      <div
        className={`flex-1 p-4 ${
          openIndex !== null ? "overflow-y-auto" : "overflow-y-hidden"
        }`}
      >
        {/* Dashboard */}
        <a
          href="#"
          className="flex items-center gap-2 w-full py-2 px-4 rounded hover:bg-gray-700 transition text-xl font-bold mb-2"
        >
          <MdDashboard size={20} /> Dashboard
        </a>

        {/* Menu Items */}
        {menuItems.map((section, index) => (
          <div key={index} className="mb-1">
            {section.type === "collapse" ? (
              <>
                <button
                  onClick={() => toggleCollapse(index)}
                  className="flex justify-between items-center w-full py-2 px-4 rounded hover:bg-gray-700 transition transform hover:scale-105 duration-150"
                >
                  <span className="flex items-center gap-2">
                    {section.title === "Super Distributor" && (
                      <MdPerson size={18} />
                    )}
                    {section.title === "Distribution" && <MdPerson size={18} />}
                    {section.title === "Dealer" && <MdPerson size={18} />}
                    {section.title === "Report" && <BiBarChart size={18} />}
                    {section.title}
                  </span>
                  <span>
                    {openIndex === index ? (
                      <BiChevronUp size={18} />
                    ) : (
                      <BiChevronDown size={18} />
                    )}
                  </span>
                </button>

                {openIndex === index && section.items.length > 0 && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a
                          href="#"
                          className="flex items-center gap-2 w-full py-1 px-3 rounded hover:bg-gray-700 transition"
                        >
                          {section.title === "Report" ? (
                            item === "Sale Report" ? (
                              <BiReceipt size={18} />
                            ) : item === "Stock Report" ? (
                              <BiBox size={18} />
                            ) : item === "Low Activation Report" ? (
                              <BiTrendingDown size={18} />
                            ) : item === "Activation Report" ? (
                              <BiTrendingUp size={18} />
                            ) : item === "Dob Report" ? (
                              <BiCalendar size={18} />
                            ) : item === "Key Record" ? (
                              <BiKeyIcon size={18} />
                            ) : (
                              <BiListUl size={18} />
                            )
                          ) : item === "Add" ? (
                            <BiPlus size={18} />
                          ) : item === "Text" ? (
                            <BiText size={18} />
                          ) : (
                            <BiListUl size={18} />
                          )}{" "}
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <a
                href={
                  section.title === "Change MPIN"
                    ? "/changempin"
                    : section.title === "Change Pass by Admin"
                    ? "/changepassbyadmin"
                    : section.title === "Logout"
                    ? "/logout"
                    : "#"
                }
                className="flex items-center gap-2 w-full py-2 px-4 rounded hover:bg-gray-700 transition transform hover:scale-105 duration-150"
              >
                {section.title === "Fresh Enrolls" && <BiUserPlus size={18} />}
                {section.title === "Device Detail" && <BiChip size={18} />}
                {section.title === "Change My Password" && <BiKey size={18} />}
                {section.title === "Change Pass by Admin" && (
                  <BiShield size={18} />
                )}
                {section.title === "Change MPIN" && <BiLock size={18} />}
                {section.title === "Logout" && <BiLogOut size={18} />}
                {section.title}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Footer section (fixed at bottom) */}

      <div className="bg-blue-700 square p-3">
        <p className="text-sm text-white text-left whitespace-normal">
          Copyright @ 2025,All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
