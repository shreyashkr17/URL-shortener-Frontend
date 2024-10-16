import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react"

const Header: React.FC = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" color="foreground">
          <p className="righteous-regular text-lg text-inherit">URL Shortener</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="https://github.com/yourusername/url-shortener" isExternal>
            GitHub
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header