import { Box, Button, TextField } from "@mui/material";
import { FieldDescription, FieldTitle, InputSection, SectionTitle } from "./sections";
import { generateSocialUrl, getSocialIcon, getSocialMediaPlatformByHostname } from "@/util/social";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Icon } from "@iconify/react";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MuiLink } from "@/components/MuiLink";
import { addSocial } from "@/graphql/addSocial";
import { getSocials } from "@/graphql/getSocials";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const SocialsForm = () => {
  const { status, data: session } = useSession();
  const queryClient = useQueryClient();

  const [socialUrl, setSocialUrl] = useState("");
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

      setSocialUrl("");
      setErrorMessage("");
    },
  });

  const handleSocialUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let url = event.target.value;

    // Prefix URL with https:// if it does not have a protocol.
    if (!url.includes("http://") && !url.includes("https://")) {
      url = `https://${url}`;
    }

    setSocialUrl(url);
    setErrorMessage("");
  };

  const addSocialEntry = () => {
    try {
      const url = new URL(socialUrl);

      const hostname = url.hostname.replace("www.", "");
      const platformDetails = getSocialMediaPlatformByHostname(hostname);

      let platform = "website";
      let ref = socialUrl;

      if (platformDetails.regex) {
        // Extract the username via platform.regex against the socialUrl.
        // If the regex does not match, throw an error.
        const usernameMatch = socialUrl.match(platformDetails.regex);
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

  if (status === "loading") return <LoadingOverlay message="Loading session..." />;
  if (status === "unauthenticated") return null;
  if (isPending) return <LoadingOverlay message="Loading resume data..." />;
  if (error) return <Box>Error loading socials: {error.message}</Box>;

  return (
    <>
      <SectionTitle>Social Media Links</SectionTitle>
      <InputSection>
        <FieldTitle>Add Link</FieldTitle>
        <FieldDescription>
          Paste a link below to add to your socials. Link icons will appear at the top of your
          resume.
        </FieldDescription>
        <TextField
          label="Social URL"
          name="socialUrl"
          value={socialUrl}
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
                <Box key={social.id}>
                  <MuiLink target="_blank" href={generateSocialUrl(social)}>
                    <Icon icon={getSocialIcon(social)} width="48" height="48" />
                  </MuiLink>
                </Box>
              ))}
            </Box>
          </>
        ) : null}
      </Box>
    </>
  );
};
