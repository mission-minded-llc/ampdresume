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
import { useOnboarding } from "./onboarding/OnboardingContext";
import { NavTourId, useNavPrimary } from "./onboarding/NavPrimaryContext";

/**
 * The primary navigation component for the application. This nav is shared
 * between the desktop and mobile views.
 */
export const NavPrimary = () => {
  const session = useSession();
  const isLoggedIn = useIsLoggedIn();
  const nav = useNavPrimary();
  const { restartOnboarding } = useOnboarding();

  const [localOpen, setLocalOpen] = useState(false);
  const [demoThemesOpen, setDemoThemesOpen] = useState(false);

  const isOpen = nav?.isOpen ?? localOpen;
  const setIsOpen = nav?.setOpen ?? setLocalOpen;
  const highlightId = nav?.highlightId ?? null;
  const lockOpen = nav?.lockOpen ?? false;

  const highlightSx = (id: NavTourId) =>
    highlightId === id
      ? {
          outline: "3px solid",
          outlineColor: "secondary.main",
          backgroundColor: "rgba(255, 140, 40, 0.18)",
        }
      : {};

  const toggleDrawer = (open: boolean) => (event: object) => {
    if (lockOpen && !open) return;
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
      sx={(theme) => ({
        textDecoration: "none",
        color: theme.palette.text.primary,
        "&:hover": {
          color: theme.palette.text.primary,
        },
      })}
    >
      <ListItem
        component="div"
        onClick={() => {
          if (!lockOpen) setIsOpen(false);
        }}
        sx={(theme) => ({
          color: "inherit",
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "dark" ? "rgba(174, 0, 255, 0.18)" : "rgba(174, 0, 255, 0.08)",
            borderRight: `4px solid ${theme.palette.secondary.main}`,
            "& .MuiListItemIcon-root": {
              color: "inherit",
            },
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
        color: "inherit",
      }}
    >
      <ListItem
        component="div"
        onClick={() => {
          if (!lockOpen) setIsOpen(false);
        }}
        sx={(theme) => ({
          pl: 4,
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "dark" ? "rgba(174, 0, 255, 0.18)" : "rgba(174, 0, 255, 0.08)",
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
          backgroundColor:
            theme.palette.mode === "dark" ? "rgba(174, 0, 255, 0.18)" : "rgba(174, 0, 255, 0.08)",
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
    <Box sx={{ display: "inline-flex" }}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        onMouseEnter={toggleDrawer(true)}
        data-testid="NavPrimaryMenuIcon"
        data-tour-id="nav-menu-button"
        sx={(theme) => ({
          mt: 1,
          ml: 1,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2.5,
          boxShadow: theme.shadows[1],
          zIndex: highlightId === "nav-menu-button" ? 1400 : undefined,
          position: highlightId === "nav-menu-button" ? "relative" : undefined,
          ...highlightSx("nav-menu-button"),
          [theme.breakpoints.down("sm")]: {
            mt: 1,
            mr: 1,
            backgroundColor: theme.palette.background.paper,
          },
        })}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            sx: {
              zIndex: lockOpen ? 1250 : undefined,
            },
          },
        }}
      >
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
              "& .MuiListItemIcon-root": {
                mr: 1.5,
              },
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
                <Box data-tour-id="edit-resume-section" sx={highlightSx("edit-resume-section")}>
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
                    dataTestId="NavPrimaryMenuEditExperience"
                  />
                  <NavItem
                    text="Featured Projects"
                    icon="fluent-color:code-16"
                    href="/edit/featured-projects"
                    dataTestId="NavPrimaryMenuEditFeaturedProjects"
                  />
                  <NavItem
                    text="Education"
                    icon="fluent-color:certificate-16"
                    href="/edit/education"
                    dataTestId="NavPrimaryMenuEditEducation"
                  />
                  <NavItem
                    text="Certifications"
                    icon="flat-color-icons:diploma-1"
                    href="/edit/certifications"
                    dataTestId="NavPrimaryMenuEditCertifications"
                  />
                </Box>
                <NavItemTitle text="Tools" />
                <NavItem
                  text="AI Assist"
                  icon="fluent-color:bot-sparkle-16"
                  href="/edit/ai"
                  dataTestId="NavPrimaryMenuEditAI"
                />
                <Box data-tour-id="import-pdf" sx={highlightSx("import-pdf")}>
                  <NavItem
                    text="Import PDF"
                    icon="fluent-color:slide-text-sparkle-48"
                    href="/edit/import"
                    dataTestId="NavPrimaryMenuEditImport"
                  />
                </Box>
                <NavItemTitle text="Account" />
                <ListItem
                  component="div"
                  onClick={() => {
                    if (!lockOpen) setIsOpen(false);
                    void restartOnboarding();
                  }}
                  sx={(theme) => ({
                    cursor: "pointer",
                    ...highlightSx("restart-tutorial"),
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(174, 0, 255, 0.18)"
                          : "rgba(174, 0, 255, 0.08)",
                      borderRight: `4px solid ${theme.palette.secondary.main}`,
                    },
                  })}
                  data-testid="NavPrimaryMenuRestartTutorial"
                  data-tour-id="restart-tutorial"
                >
                  <ListItemIcon>
                    <Icon icon="fluent-color:learning-app-24" width={36} height={36} />
                  </ListItemIcon>
                  <ListItemText primary="Restart tutorial" />
                </ListItem>
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
