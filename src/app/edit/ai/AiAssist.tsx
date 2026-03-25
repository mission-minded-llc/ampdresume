"use client";

import { Company, Position, Project } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Box, Button, Dialog, TextareaAutosize, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomDialogTitle } from "@/components/CustomDialogTitle";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MuiLink } from "@/components/MuiLink";
import { Tooltip } from "@/components/Tooltip";
import { getCompaniesAi } from "@/graphql/getCompaniesAi";
import { getResume } from "@/graphql/getResume";
import { updateProject } from "@/graphql/updateProject";
import { updateProjectSortIndexes } from "@/graphql/updateProjectSortIndexes";
import { SectionTitle } from "../components/SectionTitle";
import { AI_DIFF_HIGHLIGHT_COLORS, AnimatedTextTransition } from "./AnimatedTextTransition";

function projectDiffersFromOriginal(originalCompanies: Company[], aiCompanies: Company[]): boolean {
  const originalById = new Map<string, { name: string; sortIndex: number }>();
  for (const company of originalCompanies) {
    for (const position of company.positions ?? []) {
      for (const project of position.projects ?? []) {
        originalById.set(project.id, {
          name: project.name,
          sortIndex: project.sortIndex ?? 0,
        });
      }
    }
  }

  for (const company of aiCompanies) {
    for (const position of company.positions ?? []) {
      for (const project of position.projects ?? []) {
        const orig = originalById.get(project.id);
        if (!orig) continue;
        const aiSort = project.sortIndex ?? 0;
        if (orig.name !== project.name || orig.sortIndex !== aiSort) return true;
      }
    }
  }

  return false;
}

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
    const updatedCompanies = resume?.companies?.map((company: Company) => {
      const updatedPositions = company?.positions?.map((position: Position) => {
        const updatedProjects = position?.projects?.map((project: Project) => {
          const aiProject = companiesAi
            .find((aiCompany: Company) => aiCompany.id === company.id)
            ?.positions?.find((aiPosition: Position) => aiPosition.id === position.id)
            ?.projects?.find((aiProject: Project) => aiProject.id === project.id);

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

  const hasAiChanges =
    companiesAiData.length > 0 &&
    projectDiffersFromOriginal(companiesOriginalData, companiesAiData);

  const originalProjectNameById = useMemo(() => {
    const map = new Map<string, string>();
    for (const company of companiesOriginalData) {
      for (const position of company.positions ?? []) {
        for (const project of position.projects ?? []) {
          map.set(project.id, project.name);
        }
      }
    }
    return map;
  }, [companiesOriginalData]);

  const saveAiChangesMutation = useMutation({
    mutationFn: async () => {
      if (!session?.user?.id || !companiesAiData.length) return;

      const userId = session.user.id;
      const originalById = new Map<
        string,
        { name: string; description: string | null; sortIndex: number }
      >();

      for (const company of companiesOriginalData) {
        for (const position of company.positions ?? []) {
          for (const project of position.projects ?? []) {
            originalById.set(project.id, {
              name: project.name,
              description: project.description,
              sortIndex: project.sortIndex ?? 0,
            });
          }
        }
      }

      const sortTasks: Promise<void>[] = [];
      const nameTasks: Promise<void>[] = [];

      for (const company of companiesAiData) {
        for (const position of company.positions ?? []) {
          const projects = position.projects ?? [];
          if (projects.length === 0) continue;

          sortTasks.push(
            updateProjectSortIndexes({
              userId,
              positionId: position.id,
              projectSortIndexes: projects.map((p) => ({
                id: p.id,
                sortIndex: p.sortIndex ?? 0,
              })),
            }),
          );

          for (const project of projects) {
            const orig = originalById.get(project.id);
            if (orig && orig.name !== project.name) {
              nameTasks.push(
                updateProject({
                  id: project.id,
                  userId,
                  projectName: project.name,
                  description: orig.description ?? "",
                }),
              );
            }
          }
        }
      }

      await Promise.all(sortTasks);
      await Promise.all(nameTasks);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });

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
          sx={{
            borderColor: activeDisplay === "original" ? "green" : "grey.400",
          }}
          onClick={() => setActiveDisplay("original")}
          disabled={!companiesOriginalData?.length}
        >
          View Original
        </Button>

        <Button
          variant="outlined"
          color="primary"
          sx={{
            ml: 2,
            borderColor: activeDisplay === "ai" ? "green" : "grey.400",
          }}
          onClick={() => setActiveDisplay("ai")}
          disabled={!companiesAiData?.length || companiesAiData === companiesOriginalData}
        >
          View AI-Edited
        </Button>

        <Button
          variant="contained"
          color="success"
          sx={{ ml: 2 }}
          disabled={!hasAiChanges || saveAiChangesMutation.isPending}
          onClick={() => saveAiChangesMutation.mutate()}
        >
          {saveAiChangesMutation.isPending ? "Saving…" : "Save AI changes"}
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

      {saveAiChangesMutation.isError ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {saveAiChangesMutation.error instanceof Error
            ? saveAiChangesMutation.error.message
            : "Could not save changes."}
        </Alert>
      ) : null}

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
          {activeDisplay === "ai" && companiesAiData.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                columnGap: 2,
                rowGap: 0.5,
                mb: 2,
                pb: 2,
                borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
              }}
            >
              <Typography variant="body2" color="text.secondary" component="span" sx={{ mr: 0.5 }}>
                Highlights:
              </Typography>
              <Typography variant="body2" component="span">
                <Box
                  component="span"
                  sx={{ color: AI_DIFF_HIGHLIGHT_COLORS.add, fontWeight: 600 }}
                >
                  Green
                </Box>
                {" — new words in this text"}
              </Typography>
              <Typography variant="body2" component="span">
                <Box
                  component="span"
                  sx={{ color: AI_DIFF_HIGHLIGHT_COLORS.move, fontWeight: 600 }}
                >
                  Blue
                </Box>
                {" — same words, different order"}
              </Typography>
            </Box>
          ) : null}
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
                  <AnimatedTextTransition
                    key={project.id}
                    text={project.name}
                    originalText={originalProjectNameById.get(project.id)}
                    highlightDiff={activeDisplay === "ai"}
                  />
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
