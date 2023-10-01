"use client";

import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
export default function NavBar() {
  //   const router = useRouter();
  const pathname = usePathname();
  console.log("pathname", pathname);

  return (
    <>
      <Navbar
        bg="primary"
        variant="dark"
        sticky="top"
        expand="sm"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand as={Link} href="/">
            NEXTjs 13.5 imageGallery
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav>
              <Nav.Link
                as={Link}
                href="/static"
                active={pathname === "/static"}
              >
                Static
              </Nav.Link>
              <Nav.Link
                as={Link}
                href="/dynamic"
                active={pathname === "/dynamic"}
              >
                Dynamic
              </Nav.Link>
              <Nav.Link as={Link} href="/ISR" active={pathname === "/ISR"}>
                ISR
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
