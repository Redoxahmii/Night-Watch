import { useContext, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Link,
  DropdownItem,
  Avatar,
  DropdownSection,
  NavbarMenuToggle,
  NavbarMenu,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import me from "../assets/me.jpg";
import { PageContext } from "../utils/PageContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { LogIn, LogOut, User, UserPlus } from "lucide-react";

const Nav = () => {
  const { username, logout } = useContext(PageContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarMenuToggle
          className="sm:hidden"
          aria-label={isMenuOpen ? "closemenu" : "open menu"}
        />
        <NavbarBrand>
          <Button
            onClick={() => navigate("/")}
            variant="light"
            color="secondary"
            className=" font-semibold text-large"
          >
            NightWatch
          </Button>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Link isBlock size="md" color="foreground">
                  Movies
                </Link>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Movies Actions"
                color="secondary"
                variant="light"
              >
                <DropdownSection title="Categories">
                  <DropdownItem as={RouterLink} to="/movies/popular">
                    Popular
                  </DropdownItem>
                  <DropdownItem as={RouterLink} to="/movies/toprated">
                    Top Rated
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Link isBlock size="md" color="foreground">
                  TV Shows
                </Link>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="TvShows"
                color="secondary"
                variant="light"
              >
                {" "}
                <DropdownSection title="Categories">
                  <DropdownItem as={RouterLink} to="/tvshows/popular">
                    Popular
                  </DropdownItem>
                  <DropdownItem as={RouterLink} to="/tvshows/toprated">
                    Top Rated
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className=" ml-2" as="div" justify="end">
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="User"
                  size="sm"
                  src={me}
                ></Avatar>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="User Actions"
                color="secondary"
                variant="light"
              >
                <DropdownItem
                  startContent={<LogIn size={18} />}
                  as={RouterLink}
                  to="/login"
                >
                  Login
                </DropdownItem>
                <DropdownItem
                  startContent={<UserPlus size={18}></UserPlus>}
                  showDivider={username ? true : false}
                  as={RouterLink}
                  to="/signup"
                >
                  Signup
                </DropdownItem>
                {username && (
                  <DropdownSection title="User">
                    <DropdownItem
                      className="pointer-events-none"
                      startContent={<User size={18} />}
                      textValue={username}
                    >
                      <p className=" font-bold">Signed in as {username}</p>
                    </DropdownItem>
                    <DropdownItem
                      textValue="Logout"
                      startContent={<LogOut size={18} />}
                      onPress={() => logout()}
                    >
                      Logout
                    </DropdownItem>
                  </DropdownSection>
                )}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenuContent />
      </Navbar>
      <Divider></Divider>
    </>
  );
};

export default Nav;

const NavbarMenuContent = () => {
  return (
    <NavbarMenu>
      <Accordion>
        <AccordionItem title="Movies">
          <div className=" flex flex-col gap-2">
            <RouterLink to="/movies/popular">Popular</RouterLink>
            <RouterLink to="/movies/toprated">Top Rated</RouterLink>
          </div>
        </AccordionItem>
        <AccordionItem title="Shows">
          <div className=" flex flex-col gap-2">
            <RouterLink to="/tvshows/popular">Popular</RouterLink>
            <RouterLink to="/tvshows/toprated">Top Rated</RouterLink>
          </div>
        </AccordionItem>
      </Accordion>
    </NavbarMenu>
  );
};
