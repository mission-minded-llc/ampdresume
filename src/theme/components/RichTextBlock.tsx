import parse from "html-react-parser";
import { Box } from "@mui/material";
import { secureHtmlParserOptions } from "@/lib/secureHtmlParser";

export const RichTextBlock = ({ content }: { content: string | null }) => {
  if (!content) return null;

  try {
    const parsedString = parse(content, secureHtmlParserOptions);

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
