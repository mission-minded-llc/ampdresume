import { Box, Button, Dialog, DialogContent, List, TextField, Typography } from "@mui/material";
import { FieldDescription, FieldTitle, InputSection, SectionTitle } from "./sections";
import {
  generateSocialUrl,
  getSocialIcon,
  getSocialMediaPlatformByHostname,
  getSocialMediaPlatformByPlatformName,
} from "@/util/social";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { DeleteWithConfirmation } from "../../components/DeleteWithConfirmation";
import { Icon } from "@iconify/react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MuiLink } from "@/components/MuiLink";
import { SOCIAL_MEDIA_PLATFORMS } from "@/constants";
import { Social } from "@ampdresume/theme";
import { Tooltip } from "@/components/Tooltip";
import { addSocial } from "@/graphql/addSocial";
import { deleteSocial } from "@/graphql/deleteSocial";
import { getSocials } from "@/graphql/getSocials";
import { updateSocial } from "@/graphql/updateSocial";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const SocialsForm = () => {
  const { status, data: session } = useSession();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const [editSocial, setEditSocial] = useState<Social | null>(null);
  const [newSocialUrl, setNewSocialUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isAuthenticatedUser = status === "authenticated" && !!session?.user.id;

  const {
    isPending,
    error,
    data: socials,
  } = useQuery({
    enabled: isAuthenticatedUser,
    queryKey: ["socials"],
    queryFn: async () => await getSocials(session?.user.id),
  });

  const mutationAddSocial = useMutation({
    mutationFn: async ({ platform, ref }: { platform: string; ref: string }) => {
      if (!session?.user.id) return null;

      await addSocial({
        userId: session?.user.id,
        platform,
        ref,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socials"] });

      setNewSocialUrl("");
      setErrorMessage("");
    },
  });

  const mutationUpdateSocial = useMutation({
    mutationFn: async ({ id, ref }: { id: string; ref: string }) => {
      if (!session?.user.id) return null;

      await updateSocial({ userId: session?.user.id, id, ref });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socials"] });
    },
  });

  const mutationDeleteSocial = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      if (!session?.user.id) return null;

      await deleteSocial({ userId: session?.user.id, id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socials"] });
    },
  });

  const handleSocialUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let url = event.target.value;

    // Prefix URL with https:// if it does not have a protocol.
    if (!url.includes("http://") && !url.includes("https://")) {
      url = `https://${url}`;
    }

    setNewSocialUrl(url);
    setErrorMessage("");
  };

  const addSocialEntry = () => {
    try {
      const url = new URL(newSocialUrl);

      const hostname = url.hostname.replace("www.", "");
      const platformDetails = getSocialMediaPlatformByHostname(hostname);

      let platform = "website";
      let ref = newSocialUrl;

      if (platformDetails.regex) {
        // Extract the username via platform.regex against the newSocialUrl.
        // If the regex does not match, throw an error.
        const usernameMatch = newSocialUrl.match(platformDetails.regex);
        if (!usernameMatch) {
          throw new Error("Username not found in URL");
        }

        ref = usernameMatch[1];
        platform = platformDetails.name.toLowerCase();
      }

      mutationAddSocial.mutate({ platform, ref });
    } catch {
      setErrorMessage("Error adding social, please check the URL.");
    }
  };

  const updateSocialEntry = () => {
    if (editSocial) {
      mutationUpdateSocial.mutate({ id: editSocial.id, ref: editSocial.ref });
    }

    setIsOpen(false);
  };

  const deleteSocialEntry = () => {
    if (editSocial) {
      mutationDeleteSocial.mutate({ id: editSocial.id });
      setIsOpen(false);
    }
  };

  if (status === "loading") return <LoadingOverlay message="Loading session..." />;
  if (status === "unauthenticated") return null;
  if (isPending) return <LoadingOverlay message="Loading resume data..." />;
  if (error) return <Box>Error loading socials: {error.message}</Box>;

  return (
    <>
      <SectionTitle>Social Media Links</SectionTitle>
      <InputSection>
        <FieldTitle component="span">
          Add Link{" "}
          <Tooltip
            message={
              <List>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Supported Social URLs:
                </Typography>
                {Object.values(SOCIAL_MEDIA_PLATFORMS).map((platform) => (
                  <Typography key={platform.name} variant="body2">
                    {platform.name}
                  </Typography>
                ))}
              </List>
            }
          />
        </FieldTitle>
        <FieldDescription>
          Paste a link below to add to your socials. Link icons will appear at the top of your
          resume.
        </FieldDescription>
        <TextField
          label="Social URL"
          name="newSocialUrl"
          value={newSocialUrl}
          onChange={handleSocialUrlChange}
          fullWidth
          sx={{ marginTop: "auto" }}
          error={!!errorMessage}
          helperText={errorMessage}
        />
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={addSocialEntry}>
          Add Social
        </Button>
      </InputSection>

      <Box>
        {socials && socials?.length > 0 ? (
          <>
            <FieldTitle>Current Socials</FieldTitle>
            <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 3 }}>
              {socials.map((social) => (
                <Box
                  key={social.id}
                  onClick={() => {
                    setEditSocial(social);
                    setIsOpen(true);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <Icon icon={getSocialIcon(social)} width="48" height="48" />
                </Box>
              ))}
            </Box>
          </>
        ) : null}
      </Box>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <CustomDialogTitle closeHandler={() => setIsOpen(false)}>Edit Social</CustomDialogTitle>
        <DialogContent>
          {editSocial ? (
            <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                View:{" "}
                <MuiLink target="_blank" href={generateSocialUrl(editSocial)}>
                  {generateSocialUrl(editSocial).split("://")[1]}
                </MuiLink>
              </Typography>
              <TextField
                label={`Edit ${getSocialMediaPlatformByPlatformName(editSocial.platform).name}`}
                value={editSocial.ref}
                onChange={(e) => {
                  const socialHandleRef = e.target.value.replaceAll("@", "");
                  setEditSocial({ ...editSocial, ref: socialHandleRef });
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <DeleteWithConfirmation onConfirmDelete={deleteSocialEntry} />
                <Button variant="contained" color="primary" onClick={updateSocialEntry}>
                  Save
                </Button>
              </Box>
            </Box>
          ) : (
            "No social selected."
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
