import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/system";

export const AnimatedTextTransition = ({ text = "" }: { text: string }) => {
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

  // Map of colors for different statuses - inherit (black) for unchanged and when no changes have occurred yet
  const statusColors = {
    add: "#4caf50", // Brighter green
    remove: "#f44336", // Brighter red
    move: "#2196f3", // Brighter blue
    unchanged: "inherit",
  };

  // Simplified render without animations that preserves colors
  return (
    <Box sx={{ display: "block", textWrap: "wrap", width: "100%" }}>
      {sentence.split(" ").map((word, index) => {
        // Find the status for this word
        const wordStatus = orderedWordStatus.find(
          (status) => status.newIndex === index
        );

        // Only apply colors if changes have occurred, otherwise all words are "unchanged"
        const status =
          hasChanged && wordStatus ? wordStatus.status : "unchanged";

        return (
          <Box
            component="span"
            key={`word-${index}`}
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
      })}
    </Box>
  );
};
