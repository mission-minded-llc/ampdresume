"use client";

import { Box, Button, Dialog, TextareaAutosize, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Company } from "@openresume/theme";
import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MuiLink } from "@/components/MuiLink";
import { SectionTitle } from "../components/SectionTitle";
import { Tooltip } from "@/components/Tooltip";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { aiData } from "./aiData";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { defaultData } from "./defaultData";
import { getCompaniesAi } from "@/graphql/getCompaniesAi";
import { getResume } from "@/graphql/getResume";
import { useSession } from "next-auth/react";

const AnimatedTextTransition = ({ text = "" }: { text: string }) => {
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
        const wordStatus = orderedWordStatus.find((status) => status.newIndex === index);

        // Only apply colors if changes have occurred, otherwise all words are "unchanged"
        const status = hasChanged && wordStatus ? wordStatus.status : "unchanged";

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

export const AiAssist = () => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const jobDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [cleanJobDescription, setCleanJobDescription] = useState("");

  const [companiesOriginalData, setCompaniesOriginalData] = useState<Company[]>([]);
  const [companiesAiData, setCompaniesAiData] = useState<Company[]>([]);
  const [companiesDisplayData, setCompaniesDisplayData] = useState<Company[]>([]);
  const [activeDisplay, setActiveDisplay] = useState<"original" | "ai">("original");

  const isAuthenticatedUser =
    status === "authenticated" && !!session?.user.id && !!session?.user.slug;

  const {
    isPending: resumePending,
    error: resumeError,
    data: resume,
  } = useQuery({
    enabled: isAuthenticatedUser,
    queryKey: ["resume"],
    queryFn: async () => await getResume(session?.user?.slug ?? ""),
  });

  const {
    isFetching: companiesAiFetching,
    error: companiesAiError,
    data: companiesAi,
  } = useQuery({
    enabled: isAuthenticatedUser && !!cleanJobDescription,
    queryKey: ["companiesAi"],
    queryFn: async () => {
      if (!session?.user?.id || !cleanJobDescription) return null;

      return await getCompaniesAi(session.user.id, cleanJobDescription);
    },
  });

  const handleRunAi = async () => {
    if (!jobDescription) return;

    const cleanedText = jobDescription
      .replace(/\s+/g, " ") // Replace multiple spaces with a single space.
      .replace(/[\p{Emoji_Presentation}\p{Emoji}\uFE0F]/gu, "") // Remove emojis, including checkmarks and other symbols.
      .trim(); // Remove leading and trailing spaces.

    if (!cleanedText) return;

    setCleanJobDescription(cleanedText);
    setIsOpen(false);
  };

  useEffect(() => {
    if (cleanJobDescription) {
      queryClient.invalidateQueries({ queryKey: ["companiesAi"] });
    }
  }, [queryClient, cleanJobDescription]);

  useEffect(() => {
    if (!resume?.companies) return;

    setCompaniesOriginalData(resume.companies);
  }, [resume]);

  useEffect(() => {
    if (!companiesOriginalData) return;

    setCompaniesDisplayData(companiesOriginalData);
  }, [companiesOriginalData]);

  useEffect(() => {
    if (!companiesAi) return;

    // Loop through the existing companies, and replace the project name and sortIndex
    // with the AI-generated project name and sortIndex.
    const updatedCompanies = resume?.companies?.map((company) => {
      const updatedPositions = company?.positions?.map((position) => {
        const updatedProjects = position?.projects?.map((project) => {
          const aiProject = companiesAi
            .find((aiCompany) => aiCompany.id === company.id)
            ?.positions?.find((aiPosition) => aiPosition.id === position.id)
            ?.projects?.find((aiProject) => aiProject.id === project.id);

          return {
            ...project,
            name: aiProject?.name ?? project.name,
            sortIndex: aiProject?.sortIndex ?? project.sortIndex,
          };
        });

        return {
          ...position,
          projects: updatedProjects,
        };
      });

      return {
        ...company,
        positions: updatedPositions,
      };
    });

    if (!updatedCompanies) return;

    setCompaniesAiData(updatedCompanies);
    setActiveDisplay("ai");
  }, [resume?.companies, companiesAi]);

  useEffect(() => {
    if (activeDisplay === "original") {
      setCompaniesDisplayData(companiesOriginalData);
    } else if (activeDisplay === "ai") {
      setCompaniesDisplayData(companiesAiData);
    }
  }, [activeDisplay, companiesOriginalData, companiesAiData]);

  if (status === "loading") return <LoadingOverlay message="Loading session..." />;
  if (status === "unauthenticated")
    return (
      <Box>
        Please <MuiLink href="/login">log in.</MuiLink>
      </Box>
    );

  if (resumePending) return <LoadingOverlay open={true} />;
  if (resumeError) return <Box>Error loading resume data: {resumeError.message}</Box>;
  if (companiesAiError) return <Box>Error loading: {companiesAiError.message}</Box>;

  return (
    <>
      <LoadingOverlay message="Conferring with bots... [beep boop]" open={companiesAiFetching} />
      <SectionTitle title="Tweak Your Resume with AI Assist" />

      <Box
        sx={(theme) => {
          return {
            display: "flex",
            flexDirection: "row",
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: theme.palette.background.paper,
            padding: "1rem",
          };
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          sx={{ borderColor: activeDisplay === "original" ? "green" : "grey.400" }}
          onClick={() => setActiveDisplay("original")}
          disabled={!companiesOriginalData?.length}
        >
          View Original
        </Button>

        <Button
          variant="outlined"
          color="primary"
          sx={{ ml: 2, borderColor: activeDisplay === "ai" ? "green" : "grey.400" }}
          onClick={() => setActiveDisplay("ai")}
          disabled={!companiesAiData?.length || companiesAiData === companiesOriginalData}
        >
          View AI-Edited
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{ ml: "auto" }}
          onClick={() => {
            setIsOpen(true);
            setJobDescription("");
            setCleanJobDescription("");
            jobDescriptionRef.current?.focus();
          }}
        >
          Get AI Assistance
        </Button>
      </Box>

      {companiesDisplayData ? (
        <Box
          sx={{
            mt: 4,
            borderRadius: "6px",
            backgroundColor: "#fafafa",
            color: "#222",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            padding: "2rem 4rem",
          }}
        >
          {companiesDisplayData.map((company) =>
            company?.positions?.map((position) => (
              <Box key={position.id} sx={{ width: "100%" }}>
                <Typography variant="h6" sx={{ mt: 4 }}>
                  {company.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                  {position.title}
                </Typography>
                {position?.projects?.map((project) => (
                  <AnimatedTextTransition key={project.id} text={project.name} />
                ))}
              </Box>
            )),
          )}
        </Box>
      ) : null}

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md" fullWidth>
        <CustomDialogTitle closeHandler={() => setIsOpen(false)}>
          <span>
            AI Assistance{" "}
            <Tooltip
              message={
                <>
                  <Typography>
                    AI should not add any skills or experiences not present in your original resume.
                    It will aim for clarity and conciseness in bullet point revisions.
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    Paste in a job description for your desired role to get started.
                  </Typography>
                </>
              }
            />
          </span>
        </CustomDialogTitle>
        <Box p={2}>
          <Typography sx={{ mb: 2 }}>Paste in the job description below:</Typography>
          <TextareaAutosize
            onChange={(e) => setJobDescription(e.target.value)}
            value={jobDescription}
            minRows={3}
            style={{ width: "100%" }}
            ref={jobDescriptionRef}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
            onClick={handleRunAi}
          >
            Run it!
          </Button>
        </Box>
      </Dialog>
    </>
  );
};
