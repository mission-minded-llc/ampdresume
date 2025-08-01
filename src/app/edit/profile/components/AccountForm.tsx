"use client";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BadgeIcon from "@mui/icons-material/Badge";
import LanguageIcon from "@mui/icons-material/Language";
import LinkIcon from "@mui/icons-material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TocIcon from "@mui/icons-material/Toc";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MessageDialog } from "@/components/MessageDialog";
import { deleteUser } from "@/graphql/deleteUser";
import { useIsDesktop } from "@/hooks/useIsDesktop";

import { DeleteWithConfirmation } from "../../components/DeleteWithConfirmation";
import { UserAssetInput } from "../../components/UserAssetInput";

import { FieldDescription, FieldTitle, GridSection, InputSection, SectionTitle } from "./sections";
import { SocialsForm } from "./SocialsForm";

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
  const [showSlugPopup, setShowSlugPopup] = useState(slug.length === 0);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const isDesktop = useIsDesktop();
  const slugInputRef = React.useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const [siteImageUrl, setSiteImageUrl] = useState(siteImage);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

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

  const validateForm = () => {
    const newErrors: { name?: string; slug?: string; displayEmail?: string } = {};
    let hasEmptyFields = false;

    // Check for empty fields
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        if (["name", "slug", "displayEmail"].includes(key)) {
          hasEmptyFields = true;
          if (key === "name") newErrors.name = "Name is required";
          if (key === "slug") newErrors.slug = "Slug is required";
        }
      }
    });

    setErrors(newErrors);
    return !hasEmptyFields;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      if (!formData.slug.trim()) {
        setShowSlugPopup(true);
      }
      return;
    }

    if (
      formData.displayEmail.trim()?.length > 0 &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.displayEmail)
    ) {
      setErrors({ displayEmail: "Invalid email address" });
      return;
    } else {
      setErrors({ displayEmail: "" }); // Clear any previous errors.
    }

    setLoading(true);

    // Trim all formData values prior to sending.
    const formDataTrimmed = Object.keys(formData).reduce(
      (acc, key) => {
        const typedKey = key as keyof typeof formData;
        acc[typedKey] = formData[typedKey].trim();
        return acc;
      },
      {} as Record<string, string>,
    );

    // Send the form data to the next.js API route to
    // update the user's account information. Use POST method.
    fetch("/api/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataTrimmed),
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

  const handleSlugPopupClose = () => {
    setShowSlugPopup(false);
    setTimeout(() => slugInputRef.current?.focus(), 100);
  };

  const handleDeleteAccount = async () => {
    if (!session?.user?.id) {
      setMessage("You need to be signed in to delete your account.");
      return;
    }

    setIsDeletingAccount(true);
    setLoading(true);

    try {
      await deleteUser({ userId: session.user.id });

      // Clear auth and redirect to homepage
      await signOut({ callbackUrl: "/" });
      router.push("/");
    } catch {
      setMessage("Failed to delete account. Please try again.");
      setIsDeletingAccount(false);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LoadingOverlay
        open={loading}
        message={isDeletingAccount ? "Deleting account..." : "Saving..."}
      />
      <MessageDialog
        open={message?.length > 0}
        message={message}
        onClose={() => setMessage("")}
        onConfirm={() => setMessage("")}
      />
      <MessageDialog
        open={showSlugPopup}
        title="Don't forget to set your URL!"
        message="Your URL name is very important! It's how others will find your resume page. Please set a name to continue."
        onClose={handleSlugPopupClose}
        onConfirm={handleSlugPopupClose}
      />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
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
              sx={{
                marginTop: "auto",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: !formData.name.trim() ? "error.main" : undefined,
                  },
                },
              }}
              label="Full Name"
            />
          </InputSection>
          <InputSection>
            <FieldTitle>
              <LinkIcon /> URL Name
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
                ampdresume.com/r/
                <strong>{formData?.slug ? formData.slug : "your-custom-slug"}</strong>/
              </Typography>
              <br />
              <strong>Important:</strong> If you change this, an automatic redirect will{" "}
              <strong>not</strong> be created, so please update your shared links.
            </FieldDescription>
            <TextField
              label="URL Name"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              error={!!errors.slug}
              helperText={errors.slug ? errors.slug : " "}
              fullWidth
              inputRef={slugInputRef}
              sx={{
                marginTop: "auto",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: !formData.slug.trim() ? "error.main" : undefined,
                  },
                },
              }}
            />
          </InputSection>
          <InputSection>
            <FieldTitle>
              <MailOutlineIcon /> Display Email
            </FieldTitle>
            <FieldDescription>
              Your display email is <strong>publicly visible</strong> on your resume! This is not
              required. If you <em>do</em> want to display an email, it is recommended to set up a
              separate new email for this purpose, or use an email alias. Expect spam.
            </FieldDescription>
            <TextField
              label="Display Email"
              name="displayEmail"
              value={formData.displayEmail}
              onChange={handleChange}
              error={!!errors.displayEmail}
              helperText={errors.displayEmail ? errors.displayEmail : " "}
              fullWidth
              sx={{
                marginTop: "auto",
              }}
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
          <SectionTitle>Resume Site Settings</SectionTitle>
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
            position: "sticky",
            bottom: 0,
            backgroundColor: "background.paper",
            padding: "16px 0",
            borderTop: "1px solid",
            borderColor: "divider",
            zIndex: 1,
            mt: "auto",
          }}
        >
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              maxWidth: "400px",
            }}
            data-testid="AccountFormSaveButton"
          >
            Save
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "32px 0",
            borderTop: "1px solid",
            borderColor: "divider",
            marginTop: "2rem",
            marginBottom: "2rem",
            backgroundColor: "rgba(255, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Danger Zone
          </Typography>
          <DeleteWithConfirmation
            onConfirmDelete={handleDeleteAccount}
            buttonLabel="Delete Account"
            tooltip="Permanently delete your account and all data"
            dialogTitle="Delete Account"
            dialogMessage="Are you sure you want to delete your account? This action cannot be undone and will permanently remove:"
            showCheckboxes={true}
            checkboxItems={[
              "Your profile and all resume information",
              "Your authentication history",
              "All associated data",
            ]}
            confirmLabel="Yes, Delete My Account"
            cancelLabel="Cancel"
            disabled={isDeletingAccount}
          />
        </Box>
      </Box>
    </Box>
  );
};

export { AccountForm };
