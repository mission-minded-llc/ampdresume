"use client";

import { CodeInline } from "@/components/CodeInline";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MessageDialog } from "@/components/MessageDialog";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const AccountForm = ({
  name,
  slug,
  displayEmail,
  title,
  location,
  siteTitle,
  siteDescription,
}: {
  name: string;
  slug: string;
  displayEmail: string;
  title: string;
  location: string;
  siteTitle: string;
  siteDescription: string;
}) => {
  const [formData, setFormData] = useState({
    name,
    slug,
    displayEmail,
    title,
    location,
    siteTitle,
    siteDescription,
  });
  const [errors, setErrors] = useState<{ name?: string; slug?: string; displayEmail?: string }>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

        setMessage("Saved!");
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box>
      <LoadingOverlay open={loading} message="Submitting form..." />
      <MessageDialog
        open={message?.length > 0}
        message={message}
        onClose={() => setMessage("")}
        onConfirm={() => setMessage("")}
      />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 4,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Displayed on your public resume.
        </Typography>
        <TextField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name ? errors.name : " "}
          fullWidth
        />
        <Typography variant="body2" color="textSecondary">
          Used to generate your public resume URL, e.g.{" "}
          <CodeInline>
            https://openresume.org/r/
            <strong>
              {formData?.slug ? formData.slug : "your-custom-slug"}
            </strong>/
          </CodeInline>
          . If you change it, an automatic redirect will <strong>not</strong> be created, so please
          update your shared links.
        </Typography>
        <TextField
          label="Slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          error={!!errors.slug}
          helperText={errors.slug ? errors.slug : " "}
          fullWidth
        />
        <Typography variant="body2" color="textSecondary">
          Your display email is publicly visible on your resume!
        </Typography>
        <TextField
          label="Display Email"
          name="displayEmail"
          value={formData.displayEmail}
          onChange={handleChange}
          error={!!errors.displayEmail}
          helperText={errors.displayEmail ? errors.displayEmail : " "}
          fullWidth
        />
        <Typography variant="body2" color="textSecondary">
          Your Title is the job title you&apos;re looking for, or identify as. Example:{" "}
          <strong>Software Engineer</strong>
        </Typography>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
        />
        <Typography variant="body2" color="textSecondary">
          Your Location is where you are currently located. General is advised. Example:{" "}
          <strong>Los Angeles, CA</strong>
        </Typography>
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
        />
        <Typography variant="body2" color="textSecondary">
          Your Site Title is the title of your personal website. Example:{" "}
          <strong>{formData?.name ? formData.name : "John Doe"} | OpenResume</strong>{" "}
          <em>
            This is used in the title tag of your website as well as for social media sharing.
          </em>
        </Typography>
        <TextField
          label="Site Title"
          name="siteTitle"
          value={formData.siteTitle}
          onChange={handleChange}
          fullWidth
        />
        <Typography variant="body2" color="textSecondary">
          Your Site Description is a short description of your personal website. Example:{" "}
          <strong>
            {formData?.name ? formData.name : "John Doe"} is a seasoned professional with 10 years
            experience.
          </strong>{" "}
          <em>
            This is used in the meta description tag of your website as well as for social media
            sharing.
          </em>
        </Typography>
        <TextField
          label="Site Description"
          name="siteDescription"
          value={formData.siteDescription}
          onChange={handleChange}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            width: "200px",
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export { AccountForm };
