"use client";

import { CodeInline } from "@/components/CodeInline";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const AccountForm = ({ name, slug }: { name: string; slug: string }) => {
  const [formData, setFormData] = useState({ name, slug });
  const [errors, setErrors] = useState<{ name?: string; slug?: string }>({});

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
    const { name, slug } = formData;

    if (!name.trim() || !slug.trim()) {
      setErrors({
        name: !name.trim() ? "Name is required" : "",
        slug: !slug.trim() ? "Slug is required" : "",
      });
      return;
    }

    // Send the form data to the next.js API route to
    // update the user's account information. Use POST method.
    fetch("/api/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          alert("Failed to submit the form!");
          return;
        }

        alert("Form submitted successfully!");
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        alert("Failed to submit the form!");
      });
  };

  return (
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
          https://openresume.org/r/<strong>your-custom-slug</strong>/
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
  );
};

export { AccountForm };
