
import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
} from "@mui/material";
import { AccountCircle, Notifications, Search } from "@mui/icons-material";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import useCategory from "../../hooks/useCategory";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  // State variable for current date and time
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update current date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Function to format the current date and time as per your preference
  const formattedDateTime = currentDateTime.toLocaleString();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          
          
          {/* Rest of your AppBar content */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "darkgreen", fontWeight: "bold", fontSize: "24px" }}>
            ECHO AGRI MARKET MANAGEMENT SYSTEM
          </Typography>
          <div>
            <IconButton color="black">
              <Badge badgeContent={4} color="black">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton color="black">
              <AccountCircle />
            </IconButton>

          
          </div>
            {/* Display the current date and time */}
            <Typography variant="subtitle1" sx={{ color: "darkgreen", marginRight: "auto" }}>
            {formattedDateTime}
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🛒 EAMMS
            </Link>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>


              

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>

                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              {(auth?.user?.role !== 1 ) && (
                <li className="nav-item">
                  <Badge count={cart?.length} showZero>
                    <NavLink to="/cart" className="nav-link">
                      Cart
                    </NavLink>
                  </Badge>
                </li>
              )}

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
