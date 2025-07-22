import * as Sentry from "@sentry/react";

import { Box, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react";

interface IconSelectorProps {
  setIcon: (icon: string) => void;
  value?: string | null;
}

export const IconSelector: React.FC<IconSelectorProps> = ({ setIcon, value = null }) => {
  const [query, setQuery] = useState("");
  const [icons, setIcons] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length >= 3) {
      setLoading(true);

      const debounceFetch = setTimeout(() => {
        fetch(`/api/icons?q=${query}`)
          .then((response) => response.json())
          .then((data) => {
            setIcons(data.icons);
            setLoading(false);
          })
          .catch((error) => {
            Sentry.captureException(error);
            setLoading(false);
          });
      }, 1000);

      return () => clearTimeout(debounceFetch);
    } else {
      setIcons([]);
    }
  }, [query]);

  useEffect(() => {
    if (selectedIcon) {
      setQuery("");
    }
  }, [selectedIcon]);

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon);
    setIcon(icon);
    setQuery("");
  };

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        label="Search Icons"
        value={query || selectedIcon || ""}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
      />
      {query ? (
        <Box
          sx={(theme) => ({
            position: "absolute",
            width: "100%",
            zIndex: 2,
            backgroundColor: theme.palette.background.paper,
            minHeight: 100,
          })}
        >
          {loading && (
            <Box
              sx={{
                position: "absolute",
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <CircularProgress sx={{ display: "flex" }} />
            </Box>
          )}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, 32px)",
              justifyContent: "center",
              gap: 2,
              padding: "1rem",
            }}
          >
            {icons.map((iconName) => (
              <Box key={iconName} onClick={() => handleIconSelect(iconName)}>
                <Icon icon={iconName} width={32} height={32} />
              </Box>
            ))}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};
