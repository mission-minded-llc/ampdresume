"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const AccountForm = () => {
  const [formData, setFormData] = useState({ name: "", slug: "" });
  const [errors, setErrors] = useState<{ name?: string; slug?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    if (value.trim() === "") {
      setErrors((prev) => ({ ...prev, [name]: `${name} is required` }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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
        maxWidth: 400,
        margin: "auto",
        mt: 4,
      }}
    >
      <TextField
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name ? errors.name : "Your full name as shown on your resume"}
        fullWidth
      />
      <TextField
        label="Slug (used in URL)"
        name="slug"
        value={formData.slug}
        onChange={handleChange}
        error={!!errors.slug}
        helperText={errors.slug ? errors.slug : "A unique identifier for your URL"}
        fullWidth
      />
      <Typography variant="body2" color="textSecondary">
        The slug will be used to generate your public resume URL. If you change it, an automatic
        redirect will <strong>not</strong> be created, so please update your links accordingly.
      </Typography>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </Box>
  );
};

export { AccountForm };
