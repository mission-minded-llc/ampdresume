import { Fragment, useEffect, useMemo, useState } from "react";
import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";

/** Word highlight colors in AI diff view (keep legend copy in AiAssist aligned with these). */
export const AI_DIFF_HIGHLIGHT_COLORS = {
  add: "#4caf50",
  move: "#2196f3",
  remove: "#f44336",
} as const;

export const AnimatedTextTransition = ({
  text = "",
  originalText,
  highlightDiff = true,
}: {
  text: string;
  /** When set and different from `text`, hovering shows this original line. */
  originalText?: string;
  /** When false, words render as normal text (e.g. "View Original" mode). */
  highlightDiff?: boolean;
}) => {
  const [sentence, setSentence] = useState(text);
  const [prevSentence, setPrevSentence] = useState(text); // Initialize with the same text to avoid initial color differences
  const [hasChanged, setHasChanged] = useState(false); // Track if text has ever changed

  useEffect(() => {
    if (text !== sentence) {
      setPrevSentence(sentence);
      setSentence(text);
      setHasChanged(true); // Mark that a change has occurred
    }
  }, [text, sentence]);

  // Compare words and track their status
  const getWordStatus = (newWords: string[], oldWords: string[]) => {
    const wordStatus: Record<
      string,
      {
        status: "remove" | "add" | "move" | "unchanged";
        oldIndex: number;
        newIndex: number;
        key: string; // Add unique key for stable references
      }
    > = {};

    // Mark all old words as potentially removed
    oldWords.forEach((word, index) => {
      const wordKey = `${word}-old-${index}`;
      wordStatus[wordKey] = {
        status: "remove",
        oldIndex: index,
        newIndex: -1,
        key: wordKey,
      };
    });

    // Update status for words in the new sentence
    newWords.forEach((word, index) => {
      // Find if word exists in old words
      const oldWordIndex = oldWords.findIndex((w) => w === word);
      const wordKey = `${word}-new-${index}`;

      if (oldWordIndex === -1) {
        // New word
        wordStatus[wordKey] = {
          status: "add",
          oldIndex: -1,
          newIndex: index,
          key: wordKey,
        };
      } else {
        // Existing word - check if it's in the same position
        const status = oldWordIndex === index ? "unchanged" : "move";
        wordStatus[wordKey] = {
          status,
          oldIndex: oldWordIndex,
          newIndex: index,
          key: wordKey,
        };

        // Remove the old word entry to prevent duplication
        const oldKey = `${word}-old-${oldWordIndex}`;
        if (wordStatus[oldKey]) {
          delete wordStatus[oldKey];
        }
      }
    });

    return wordStatus;
  };

  const wordStatusMap = useMemo(() => {
    const oldWords = prevSentence.split(" ");
    const newWords = sentence.split(" ");
    return getWordStatus(newWords, oldWords);
  }, [prevSentence, sentence]);

  // Get an array of status objects in the order they should appear
  const orderedWordStatus = useMemo(() => {
    return Object.values(wordStatusMap)
      .filter((status) => status.status !== "remove")
      .sort((a, b) => a.newIndex - b.newIndex);
  }, [wordStatusMap]);

  const statusColors = {
    add: AI_DIFF_HIGHLIGHT_COLORS.add,
    remove: AI_DIFF_HIGHLIGHT_COLORS.remove,
    move: AI_DIFF_HIGHLIGHT_COLORS.move,
    unchanged: "inherit",
  };

  const showOriginalOnHover = originalText != null && originalText.trim() !== text.trim();

  // Avoid spurious highlights when AI text equals resume text (internal prev/sentence can
  // still differ after toggling views or prior transitions).
  const aiTextMatchesOriginal = originalText != null && originalText.trim() === text.trim();
  const showDiffHighlight = highlightDiff && !aiTextMatchesOriginal;

  // Simplified render without animations that preserves colors
  const inner = (
    <Box sx={{ display: "block", textWrap: "wrap", width: "100%" }}>
      {sentence.split(" ").map((word, index) => {
        // Find the status for this word
        const wordStatus = orderedWordStatus.find((status) => status.newIndex === index);

        const status =
          showDiffHighlight && hasChanged && wordStatus ? wordStatus.status : "unchanged";
        const isChangedLine = showDiffHighlight && status !== "unchanged";

        const wordContent = (
          <Box
            component="span"
            sx={{
              color: statusColors[status],
              fontWeight: status === "add" ? 600 : 400,
              display: "inline-block",
              mr: "4px",
            }}
          >
            {word}
          </Box>
        );

        if (!showOriginalOnHover || !isChangedLine) {
          return <Fragment key={`word-${index}`}>{wordContent}</Fragment>;
        }

        return (
          <Tooltip
            key={`word-${index}`}
            title={originalText}
            arrow
            placement="top"
            slotProps={{
              popper: { modifiers: [{ name: "offset", options: { offset: [0, -6] } }] },
            }}
          >
            <Box component="span" sx={{ display: "inline-block", cursor: "help" }}>
              {wordContent}
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );

  return inner;
};
