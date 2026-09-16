import { Social } from "@/types";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Dialog, DialogContent, List, TextField, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MuiLink } from "@/components/MuiLink";
import { Tooltip } from "@/components/Tooltip";
import { SOCIAL_MEDIA_PLATFORMS } from "@/constants";
import { addSocial } from "@/graphql/addSocial";
import { deleteSocial } from "@/graphql/deleteSocial";
import { getSocials } from "@/graphql/getSocials";
import { updateSocial } from "@/graphql/updateSocial";
import { updateSocialSortIndexes } from "@/graphql/updateSocialSortIndexes";
import {
  generateSocialUrl,
  getSocialIcon,
  getSocialMediaPlatformByHostname,
  getSocialMediaPlatformByPlatformName,
} from "@/util/social";
import { DeleteWithConfirmation } from "../../components/DeleteWithConfirmation";
import { FieldDescription, FieldTitle, InputSection, SectionTitle } from "./sections";

const SortableSocialIcon = ({
  social,
  onSelect,
}: {
  social: Social;
  onSelect: (social: Social) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: social.id,
  });
  const platformName = getSocialMediaPlatformByPlatformName(social.platform).name;

  return (
    <Box
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 1 : 0,
      }}
      {...attributes}
      {...listeners}
      onClick={() => onSelect(social)}
      aria-label={`${platformName} profile. Drag to reorder, click or tap to edit.`}
      data-testid={`social-icon-${social.id}`}
      sx={{
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        WebkitUserDrag: "none",
      }}
    >
      <Icon icon={getSocialIcon(social)} width="48" height="48" />
    </Box>
  );
};

export const SocialsForm = () => {
  const { status, data: session } = useSession();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const [editSocial, setEditSocial] = useState<Social | null>(null);
  const [newSocialUrl, setNewSocialUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [localSocials, setLocalSocials] = useState<Social[]>([]);
  const dragOccurredRef = useRef(false);

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

  useEffect(() => {
    const sorted = [...(socials ?? [])].sort((a, b) => (a.sortIndex ?? 0) - (b.sortIndex ?? 0));
    setLocalSocials(sorted);
  }, [socials]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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

  const mutationUpdateSortIndex = useMutation({
    mutationFn: async ({
      socialSortIndexes,
    }: {
      socialSortIndexes: { id: string; sortIndex: number }[];
    }) => {
      if (!session?.user.id) return;

      await updateSocialSortIndexes({
        userId: session.user.id,
        socialSortIndexes,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socials"] });
    },
  });

  const resetDragFlag = () => {
    window.setTimeout(() => {
      dragOccurredRef.current = false;
    }, 0);
  };

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

  const handleSelectSocial = (social: Social) => {
    if (dragOccurredRef.current) return;

    setEditSocial(social);
    setIsOpen(true);
  };

  const handleDragStart = () => {
    dragOccurredRef.current = true;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    resetDragFlag();

    if (!over || active.id === over.id) {
      return;
    }

    const activeIndex = localSocials.findIndex((social) => social.id === active.id);
    const overIndex = localSocials.findIndex((social) => social.id === over.id);

    if (activeIndex === -1 || overIndex === -1) {
      return;
    }

    const reorderedSocials = arrayMove(localSocials, activeIndex, overIndex);
    setLocalSocials(reorderedSocials);

    mutationUpdateSortIndex.mutate({
      socialSortIndexes: reorderedSocials.map((social, sortIndex) => ({
        id: social.id,
        sortIndex,
      })),
    });
  };

  if (status === "loading") return <LoadingOverlay message="Loading session..." />;
  if (status === "unauthenticated") return null;
  if (isPending) return <LoadingOverlay message="Loading resume data..." />;
  if (error) return <Box>Error loading socials: {error.message}</Box>;

  const socialIcons =
    localSocials.length > 1 ? (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={resetDragFlag}
      >
        <SortableContext
          items={localSocials.map((social) => social.id)}
          strategy={rectSortingStrategy}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            {localSocials.map((social) => (
              <SortableSocialIcon key={social.id} social={social} onSelect={handleSelectSocial} />
            ))}
          </Box>
        </SortableContext>
      </DndContext>
    ) : (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {localSocials.map((social) => {
          const platformName = getSocialMediaPlatformByPlatformName(social.platform).name;

          return (
            <Box
              key={social.id}
              onClick={() => handleSelectSocial(social)}
              aria-label={`${platformName} profile. Click or tap to edit.`}
              data-testid={`social-icon-${social.id}`}
              sx={{ cursor: "pointer" }}
            >
              <Icon icon={getSocialIcon(social)} width="48" height="48" />
            </Box>
          );
        })}
      </Box>
    );

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
          resume. Drag to reorder them.
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
        {localSocials.length > 0 ? (
          <>
            <FieldTitle>
              Current Socials
              {localSocials.length > 1 ? (
                <Tooltip message="Drag to reorder. Click or tap an icon to edit. On mobile, press and hold, then drag." />
              ) : null}
            </FieldTitle>
            {socialIcons}
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
