import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate(); // This will allow programmatic navigation

  const user = JSON.parse(localStorage.getItem("User"));
  const name = user.user.name;

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    // Based on the selected value, navigate to different routes
    if (selectedValue === "logout") {
      navigate("/"); // Navigating to the homepage or logout page
    } else if (selectedValue === "profile") {
      navigate("/profile");
    }
  };

  return (
    <div className="bg-slate-100 flex justify-between items-center p-4 h-[90px] sticky top-0 z-50">
      <h1 className="font-bold text-black font-serif text-[40px]">UpSkill</h1>

      <navlinks className="font-bold text-black font-serif text-[20px] flex justify-center items-center gap-[40px]">
        <Link to="/home">Home</Link>
        <Link to="/mcq">Phase 1</Link>
        <Link to="/phase2basic">Phase 2</Link>
        <Link to="/chatBot">ChatBot</Link>
        <select
          className="bg-slate-100  outline-none p-4 cursor-pointer"
          onChange={handleSelectChange} // Handle the change event
          defaultValue="default" // Set a default value to prevent selection issues
        >
          <option value="default" disabled hidden>
            {name}
          </option>
          <option value="logout">LogOut</option>
        </select>
      </navlinks>
    </div>
  );
};

export default Header;
