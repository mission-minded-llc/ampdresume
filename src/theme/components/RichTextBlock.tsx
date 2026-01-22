import parse from "html-react-parser";
import { Box } from "@mui/material";
import { secureHtmlParserOptions } from "@/lib/secureHtmlParser";

export const RichTextBlock = ({ content }: { content: string | null }) => {
  if (!content) return null;

  try {
    const parsedString = parse(content, secureHtmlParserOptions);

    return (
      <Box
        sx={(theme) => ({
          "& img": {
            maxWidth: "100%",
            height: "auto",
          },
          "& a": {
            color:
              theme.palette.mode === "dark" ? theme.palette.info.light : theme.palette.info.main,
            textDecoration: "underline",
            "&:hover": {
              color:
                theme.palette.mode === "dark" ? theme.palette.info.main : theme.palette.info.dark,
            },
          },
        })}
      >
        {parsedString}
      </Box>
    );
  } catch {
    return content;
  }
};
