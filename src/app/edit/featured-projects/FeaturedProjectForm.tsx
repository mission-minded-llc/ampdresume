import { FeaturedProject } from "@/types";
import { useState, useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import { FeaturedProjectGeneric } from "@/graphql/getFeaturedProjects";
import { DeleteWithConfirmation } from "../components/DeleteWithConfirmation";
import { RichTextEditor } from "../components/RichTextEditor/RichTextEditor";

export const FeaturedProjectForm = ({
  featuredProject,
  handler,
  deleteHandler = null,
  onCancel = null,
}: {
  featuredProject?: FeaturedProject | null;
  handler: (featuredProject: FeaturedProjectGeneric | FeaturedProject) => void;
  deleteHandler?: ((featuredProject: FeaturedProject) => void) | null;
  onCancel?: (() => void) | null;
}) => {
  const [name, setName] = useState(featuredProject?.name || "");
  const [description] = useState(featuredProject?.description || "");
  const [links, setLinks] = useState<Array<{ label: string; url: string }>>(
    featuredProject?.links || [],
  );
  const [newLinkLabel, setNewLinkLabel] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const editorStateRef = useRef<string | null>(featuredProject?.description || null);

  const addLink = () => {
    if (newLinkLabel.trim() && newLinkUrl.trim()) {
      setLinks([...links, { label: newLinkLabel.trim(), url: newLinkUrl.trim() }]);
      setNewLinkLabel("");
      setNewLinkUrl("");
    }
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const saveHandler = () => {
    handler({
      name,
      description: editorStateRef.current || description || null,
      links,
    });
  };

  const currentDescription = editorStateRef.current || description;
  const isChanged =
    name !== featuredProject?.name ||
    currentDescription !== (featuredProject?.description || "") ||
    JSON.stringify(links) !== JSON.stringify(featuredProject?.links || []);

  return (
    <>
      <Box
        sx={{
          mb: 2,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr" },
          gap: 2,
        }}
      >
        <TextField
          margin="dense"
          fullWidth
          variant="outlined"
          label="Project Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <RichTextEditor
          value={description}
          editorStateRef={editorStateRef}
          placeholder="Project description..."
          name={`featured-project-description-${featuredProject?.id || "new"}`}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ mb: 1 }}>
          <strong>Links</strong>
        </Box>
        {links.map((link, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
              p: 1,
              border: "1px solid #ccc",
              borderRadius: 1,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <strong>{link.label}</strong>: {link.url}
            </Box>
            <Button size="small" onClick={() => removeLink(index)} color="error">
              Remove
            </Button>
          </Box>
        ))}
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <TextField
            margin="dense"
            variant="outlined"
            label="Link Label"
            value={newLinkLabel}
            onChange={(e) => setNewLinkLabel(e.target.value)}
            placeholder="e.g., GitHub"
            sx={{ flex: 1 }}
          />
          <TextField
            margin="dense"
            variant="outlined"
            label="Link URL"
            value={newLinkUrl}
            onChange={(e) => setNewLinkUrl(e.target.value)}
            placeholder="https://..."
            sx={{ flex: 1 }}
          />
          <Button variant="outlined" onClick={addLink} sx={{ mt: 1 }}>
            Add Link
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: "space-between",
          gap: 2,
          mt: 2,
        }}
      >
        {featuredProject && deleteHandler && (
          <DeleteWithConfirmation
            buttonLabel="Delete Featured Project"
            onConfirmDelete={() => deleteHandler(featuredProject)}
            dialogMessage="Are you sure you want to delete this featured project? (No undo!)"
          />
        )}
        {onCancel && (
          <Button variant="outlined" color="primary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          variant="outlined"
          color="primary"
          onClick={saveHandler}
          disabled={!isChanged || !name.trim()}
        >
          Save Featured Project
        </Button>
      </Box>
    </>
  );
};
