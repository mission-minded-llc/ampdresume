import parse from "html-react-parser";
import { Box } from "@mui/material";

export const RichTextBlock = ({ content }: { content: string | null }) => {
  if (!content) return null;

  try {
    const parsedString = parse(content);

    return (
      <Box
        sx={{
          "& img": {
            maxWidth: "100%",
            height: "auto",
          },
        }}
      >
        {parsedString}
      </Box>
    );
  } catch {
    return content;
  }
};
