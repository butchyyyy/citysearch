import React from "react"
import { Navbar as BootstrapNavbar, NavbarBrand } from "reactstrap"

/** Application Navbar with application title */
const Navbar = () => (
    <BootstrapNavbar>
      <NavbarBrand color="light">City Search</NavbarBrand>
    </BootstrapNavbar>
)

export default Navbar
