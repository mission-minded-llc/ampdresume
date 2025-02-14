"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { FieldDescription, FieldTitle, GridSection, InputSection, SectionTitle } from "./sections";
import React, { useEffect, useState } from "react";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BadgeIcon from "@mui/icons-material/Badge";
import LanguageIcon from "@mui/icons-material/Language";
import LinkIcon from "@mui/icons-material/Link";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { MessageDialog } from "@/components/MessageDialog";
import { SocialsForm } from "./SocialsForm";
import TocIcon from "@mui/icons-material/Toc";
import { UserAssetInput } from "../../components/UserAssetInput";
import { useIsDesktop } from "@/hooks/useIsDesktop";

const AccountForm = ({
  name,
  slug,
  displayEmail,
  title,
  location,
  siteTitle,
  siteDescription,
  siteImage,
}: {
  name: string;
  slug: string;
  displayEmail: string;
  title: string;
  location: string;
  siteTitle: string;
  siteDescription: string;
  siteImage: string;
}) => {
  const [formData, setFormData] = useState({
    name,
    slug,
    displayEmail,
    title,
    location,
    siteTitle,
    siteDescription,
    siteImage,
  });
  const [errors, setErrors] = useState<{ name?: string; slug?: string; displayEmail?: string }>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const isDesktop = useIsDesktop();

  const [siteImageUrl, setSiteImageUrl] = useState(siteImage);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    if (value.trim() === "") {
      setErrors((prev) => ({ ...prev, [name]: `${name} is required` }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Ensure the slug is alphanumeric and lowercase, with hyphens for spaces.
    if (name === "slug") {
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!slugRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          slug: "Slug must be alphanumeric and lowercase. Hyphens allowed.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, slug: "" }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, slug, displayEmail } = formData;

    if (!name.trim() || !slug.trim()) {
      setErrors({
        name: !name.trim() ? "Name is required" : "",
        slug: !slug.trim() ? "Slug is required" : "",
      });
      return;
    }

    if (displayEmail.trim()?.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(displayEmail)) {
      setErrors({ displayEmail: "Invalid email address" });
      return;
    }

    setLoading(true);

    // Send the form data to the next.js API route to
    // update the user's account information. Use POST method.
    fetch("/api/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const { error } = await res.json();
          setMessage(error);
          return;
        }
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Since siteImage uses a separate state than formData, ensure
  // that formData is updated when siteImage changes.
  useEffect(() => {
    setFormData((prev) => ({ ...prev, siteImage: siteImageUrl }));
  }, [siteImageUrl]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LoadingOverlay open={loading} message="Saving..." />
      <MessageDialog
        open={message?.length > 0}
        message={message}
        onClose={() => setMessage("")}
        onConfirm={() => setMessage("")}
      />
      <Box component="form" onSubmit={handleSubmit}>
        <GridSection isDesktop={isDesktop}>
          <SectionTitle>General Information</SectionTitle>
          <InputSection>
            <FieldTitle>
              <AccountBoxIcon /> Full Name
            </FieldTitle>
            <FieldDescription>Displayed on your public resume.</FieldDescription>
            <TextField
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name ? errors.name : " "}
              fullWidth
              sx={{ marginTop: "auto" }}
              label="Full Name"
            />
          </InputSection>
          <InputSection>
            <FieldTitle>
              <LinkIcon /> URL Slug
            </FieldTitle>
            <FieldDescription>
              Used in your URL. Example:{" "}
              <Typography
                component="em"
                sx={(theme) => ({
                  display: "inline",
                  color: theme.palette.primary.main,
                })}
              >
                openresume.org/r/
                <strong>
                  {formData?.slug ? formData.slug : "your-custom-slug"}
                </strong>/
              </Typography>
              <br />
              <strong>Important:</strong> If you change this, an automatic redirect will{" "}
              <strong>not</strong> be created, so please update your shared links.
            </FieldDescription>
            <TextField
              label="URL Slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              error={!!errors.slug}
              helperText={errors.slug ? errors.slug : " "}
              fullWidth
              sx={{ marginTop: "auto" }}
            />
          </InputSection>
          <InputSection>
            <FieldTitle>
              <MailOutlineIcon /> Display Email
            </FieldTitle>
            <FieldDescription>
              Your display email is publicly visible on your resume!
            </FieldDescription>
            <TextField
              label="Display Email"
              name="displayEmail"
              value={formData.displayEmail}
              onChange={handleChange}
              error={!!errors.displayEmail}
              helperText={errors.displayEmail ? errors.displayEmail : " "}
              fullWidth
              sx={{ marginTop: "auto" }}
            />
          </InputSection>
          <InputSection>
            <FieldTitle>
              <BadgeIcon /> Position Title
            </FieldTitle>
            <FieldDescription>Your current job title or what you are looking for.</FieldDescription>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              helperText=" "
              fullWidth
              sx={{ marginTop: "auto" }}
            />
          </InputSection>
          <InputSection>
            <FieldTitle>
              <LocationOnIcon /> Location
            </FieldTitle>
            <FieldDescription>
              Your Location is where you are currently located.
              <br />
              Example: <strong>Los Angeles, CA</strong>
            </FieldDescription>
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
              helperText="Recommendation: do not use your full address."
              sx={{ marginTop: "auto" }}
            />
          </InputSection>
        </GridSection>
        <GridSection isDesktop={isDesktop}>
          <SocialsForm />
        </GridSection>
        <GridSection isDesktop={isDesktop}>
          <SectionTitle>Resume Site Information</SectionTitle>
          <InputSection>
            <FieldTitle>
              <LanguageIcon /> Resume Site Title
            </FieldTitle>
            <FieldDescription>
              Your Site Title is the title of your resume page, shown in the browser tab and social
              media.
            </FieldDescription>
            <TextField
              label="Site Title"
              name="siteTitle"
              value={formData.siteTitle}
              onChange={handleChange}
              fullWidth
              sx={{ marginTop: "auto" }}
            />
          </InputSection>
          <InputSection>
            <FieldTitle>
              <TocIcon /> Resume Site Description
            </FieldTitle>
            <FieldDescription>
              Your Site Description is a short description of your resume page. This is used in the
              meta description tag of your website as well as for social media sharing.
            </FieldDescription>
            <TextField
              label="Site Description"
              name="siteDescription"
              value={formData.siteDescription}
              onChange={handleChange}
              fullWidth
              sx={{ marginTop: "auto" }}
            />
          </InputSection>
          <InputSection>
            <FieldTitle>Site Image</FieldTitle>
            <FieldDescription>
              An image that represents your resume. This will be used when your resume is shared on
              social media.
            </FieldDescription>
            <TextField
              label="Image URL"
              name="siteImage"
              value={siteImageUrl}
              onChange={handleChange}
              disabled
              fullWidth
              sx={{ marginTop: "auto" }}
            />
            <UserAssetInput url={siteImageUrl} setUrl={setSiteImageUrl} buttonType="button" />
          </InputSection>
        </GridSection>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 6,
              mb: 10,
              maxWidth: "400px",
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { AccountForm };
