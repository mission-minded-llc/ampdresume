import { useSession } from "next-auth/react";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";
import { MuiLink } from "@/components/MuiLink";
import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";
import { ThemeAppearanceToggle } from "./ThemeAppearanceToggle";
import { themeDefinitions } from "@/theme";

/**
 * The primary navigation component for the application. This nav is shared
 * between the desktop and mobile views.
 */
export const NavPrimary = () => {
  const session = useSession();
  const isLoggedIn = useIsLoggedIn();

  const [isOpen, setIsOpen] = useState(false);
  const [demoThemesOpen, setDemoThemesOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: object) => {
    if (
      ((event as React.KeyboardEvent).type === "keydown" &&
        (event as React.KeyboardEvent).key === "Tab") ||
      (event as React.KeyboardEvent).key === "Shift"
    ) {
      return;
    }
    setIsOpen(open);
  };

  const toggleDemoThemes = () => {
    setDemoThemesOpen(!demoThemesOpen);
  };

  const NavItemTitle = ({ text }: { text: string }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Typography variant="h6">{text}</Typography>
    </Box>
  );

  const NavItem = ({
    text,
    icon,
    href,
    target = "_self",
    dataTestId = "",
  }: {
    text: string;
    icon: string;
    href: string;
    target?: "_self" | "_blank";
    dataTestId?: string;
  }) => (
    <MuiLink
      href={href}
      target={target}
      sx={{
        textDecoration: "none",
      }}
    >
      <ListItem
        component="div"
        onClick={() => {
          setIsOpen(false);
        }}
        sx={(theme) => ({
          "&:hover": {
            backgroundColor: "black",
            color: "white",
            borderRight: `4px solid ${theme.palette.secondary.main}`,
          },
        })}
        {...(dataTestId && { "data-testid": dataTestId })}
      >
        <ListItemIcon>
          <Icon icon={icon} width={36} height={36} />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </MuiLink>
  );

  const SubmenuItem = ({
    text,
    icon,
    href,
    target = "_self",
    dataTestId = "",
  }: {
    text: string;
    icon: string;
    href: string;
    target?: "_self" | "_blank";
    dataTestId?: string;
  }) => (
    <MuiLink
      href={href}
      target={target}
      sx={{
        textDecoration: "none",
      }}
    >
      <ListItem
        component="div"
        onClick={() => {
          setIsOpen(false);
        }}
        sx={(theme) => ({
          pl: 4,
          "&:hover": {
            backgroundColor: "black",
            color: "white",
            borderRight: `4px solid ${theme.palette.secondary.main}`,
          },
        })}
        {...(dataTestId && { "data-testid": dataTestId })}
      >
        <ListItemIcon>
          <Icon icon={icon} width={24} height={24} />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </MuiLink>
  );

  const SubmenuHeader = ({
    text,
    icon,
    isOpen,
    onClick,
    dataTestId = "",
  }: {
    text: string;
    icon: string;
    isOpen: boolean;
    onClick: () => void;
    dataTestId?: string;
  }) => (
    <ListItem
      component="div"
      onClick={onClick}
      sx={(theme) => ({
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "black",
          color: "white",
          borderRight: `4px solid ${theme.palette.secondary.main}`,
        },
      })}
      {...(dataTestId && { "data-testid": dataTestId })}
    >
      <ListItemIcon>
        <Icon icon={icon} width={36} height={36} />
      </ListItemIcon>
      <ListItemText primary={text} />
      {isOpen ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
  );

  return (
    <Box>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        onMouseEnter={toggleDrawer(true)}
        data-testid="NavPrimaryMenuIcon"
        sx={(theme) => ({
          mt: 1,
          ml: 1,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 0,
          [theme.breakpoints.down("sm")]: {
            mt: 1,
            mr: 1,
            backgroundColor: theme.palette.background.default,
          },
        })}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ position: "absolute", top: 12, right: 12 }}>
            <IconButton edge="end" color="inherit" aria-label="close" onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <NavItemTitle text="Menu" />

          <List
            sx={{
              flex: 1,
              paddingTop: 2,
            }}
          >
            <NavItem
              text="Home"
              icon="fluent-color:home-16"
              href="/"
              dataTestId="NavPrimaryMenuHome"
            />
            <SubmenuHeader
              text="Demo Themes"
              icon="fluent-color:image-48"
              isOpen={demoThemesOpen}
              onClick={toggleDemoThemes}
              dataTestId="NavPrimaryMenuDemoThemes"
            />
            <Collapse in={demoThemesOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {Object.entries(themeDefinitions).map(([key, theme]) => (
                  <SubmenuItem
                    text={theme.name}
                    icon={theme.iconifyIcon}
                    href={`/demo/${key}`}
                    key={key}
                  />
                ))}
              </List>
            </Collapse>
            {isLoggedIn ? (
              <>
                {session?.data?.user?.slug ? (
                  <NavItem
                    text="View Resume"
                    icon="fluent-color:person-16"
                    href={`/r/${session.data.user.slug}`}
                    dataTestId="NavPrimaryMenuViewResume"
                  />
                ) : null}
                <NavItemTitle text="Edit Resume" />
                <NavItem
                  text="Resume Profile"
                  icon="fluent-color:scan-person-48"
                  href="/edit/profile"
                  dataTestId="NavPrimaryMenuEditResume"
                />
                <NavItem
                  text="Your Skills"
                  icon="fluent-color:data-pie-20"
                  href="/edit/skills"
                  dataTestId="NavPrimaryMenuEditSkills"
                />
                <NavItem
                  text="Work Experience"
                  icon="fluent-color:data-bar-vertical-ascending-16"
                  href="/edit/experience"
                />
                <NavItem
                  text="Featured Projects"
                  icon="fluent-color:code-16"
                  href="/edit/featured-projects"
                />
                <NavItem
                  text="Education"
                  icon="fluent-color:certificate-16"
                  href="/edit/education"
                />
                <NavItem
                  text="Certifications"
                  icon="flat-color-icons:diploma-1"
                  href="/edit/certifications"
                />
                <NavItemTitle text="Tools" />
                <NavItem
                  text="AI Assist"
                  icon="fluent-color:bot-sparkle-16"
                  href="/edit/ai"
                  dataTestId="NavPrimaryMenuEditAI"
                />
                <NavItem
                  text="Import PDF"
                  icon="fluent-color:slide-text-sparkle-48"
                  href="/edit/import"
                  dataTestId="NavPrimaryMenuEditImport"
                />
                <NavItemTitle text="Account" />
                <NavItem
                  text="Logout"
                  icon="flat-color-icons:export"
                  href="/api/auth/signout"
                  dataTestId="NavPrimaryMenuLogout"
                />
              </>
            ) : (
              <NavItem
                text="Login"
                icon="fluent-color:shield-checkmark-16"
                href="/login"
                dataTestId="NavPrimaryMenuLogin"
              />
            )}
          </List>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 10,
            }}
          >
            <ThemeAppearanceToggle />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
