import React, { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Portal, TextField } from "@mui/material";
import { Icon } from "@iconify/react";
import * as Sentry from "@sentry/react";

interface IconSelectorProps {
  setIcon: (icon: string) => void;
  icon?: string | null;
  limit?: number;
}

/**
 * IconSelector component for selecting icons from the Iconify API. A reduced-size
 * version of the available icons is fetched from a local API to reduce the overhead.
 * If users want to see more icons, they can search for them in the Iconify website.
 *
 * @param setIcon - function to set the selected icon
 * @param icon - the selected icon
 * @param limit - the limit of icons to fetch
 *
 * @returns IconSelector component
 */
export const IconSelector: React.FC<IconSelectorProps> = ({
  setIcon,
  icon = null,
  limit = 50,
}) => {
  const [query, setQuery] = useState("");
  const [iconSearchResults, setIconSearchResults] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(icon);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{
    top: number;
    left: number;
    width: number;
  }>({
    top: 0,
    left: 0,
    width: 0,
  });

  // Update dropdown position when query opens or window resizes
  useEffect(() => {
    function updateDropdownPos() {
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setDropdownPos({
          top: rect.bottom,
          left: rect.left,
          width: rect.width,
        });
      }
    }
    if (query) {
      updateDropdownPos();
      window.addEventListener("resize", updateDropdownPos);
      window.addEventListener("scroll", updateDropdownPos, true);
      return () => {
        window.removeEventListener("resize", updateDropdownPos);
        window.removeEventListener("scroll", updateDropdownPos, true);
      };
    }
  }, [query]);

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
          inputRef={inputRef}
          value={query}
          placeholder={selectedIcon || "Search icons…"}
          onChange={(e) => setQuery(e.target.value)}
          data-testid="icon-selector-input"
          fullWidth
        />
      </Box>
      <Portal>
        {query ? (
          <Box
            sx={(theme) => ({
              position: "fixed",
              top: dropdownPos.top,
              left: dropdownPos.left,
              width: dropdownPos.width,
              zIndex: 1300,
              backgroundColor: theme.palette.background.paper,
              minHeight: 100,
              boxShadow: theme.shadows[4],
              borderRadius: 1,
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
                <Box
                  key={iconName}
                  onClick={() => handleIconSelect(iconName)}
                  title={iconName}
                >
                  <Icon icon={iconName} width={32} height={32} />
                </Box>
              ))}
            </Box>
          </Box>
        ) : null}
      </Portal>
    </Box>
  );
};
