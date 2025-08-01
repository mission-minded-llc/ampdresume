"use client";

import { Company } from "@ampdresume/theme";
import { Box, Button, Dialog, TextareaAutosize, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MuiLink } from "@/components/MuiLink";
import { Tooltip } from "@/components/Tooltip";
import { getCompaniesAi } from "@/graphql/getCompaniesAi";
import { getResume } from "@/graphql/getResume";

import { SectionTitle } from "../components/SectionTitle";

import { AnimatedTextTransition } from "./AnimatedTextTransition";


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
