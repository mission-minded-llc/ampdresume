import * as Sentry from "@sentry/react";

import { Box, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react";

interface IconSelectorProps {
  setIcon: (icon: string) => void;
  value?: string | null;
  limit?: number;
}

/**
 * IconSelector component for selecting icons from the Iconify API. A reduced-size
 * version of the available icons is fetched from a local API to reduce the overhead.
 * If users want to see more icons, they can search for them in the Iconify website.
 *
 * @param setIcon - function to set the selected icon
 * @param value - the value of the selected icon
 * @param limit - the limit of icons to fetch
 *
 * @returns IconSelector component
 */
export const IconSelector: React.FC<IconSelectorProps> = ({
  setIcon,
  value = null,
  limit = 50,
}) => {
  const [query, setQuery] = useState("");
  const [iconSearchResults, setIconSearchResults] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length >= 3) {
      setLoading(true);

      const debounceFetch = setTimeout(() => {
        fetch(`/api/icons?q=${query}&limit=${limit}`)
          .then((response) => response.json())
          .then((data) => {
            setIconSearchResults(data.icons);
            setLoading(false);
          })
          .catch((error) => {
            Sentry.captureException(error);
            setLoading(false);
          });
      }, 1000);

      return () => clearTimeout(debounceFetch);
    } else {
      setIconSearchResults([]);
    }
  }, [query, limit]);

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon);
    setIcon(icon);
    setQuery("");
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          value={query}
          placeholder={selectedIcon || "Search icons…"}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
        />
      </Box>
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
            {iconSearchResults.map((iconName) => (
              <Box key={iconName} onClick={() => handleIconSelect(iconName)} title={iconName}>
                <Icon icon={iconName} width={32} height={32} />
              </Box>
            ))}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};
