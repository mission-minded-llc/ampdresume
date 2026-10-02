"use client";

import { FormEvent, useState } from "react";
import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { MuiLink } from "@/components/MuiLink";
import { SectionTitle } from "@/app/edit/components/SectionTitle";
import {
  parseCandidateSearchInput,
  splitSearchMatch,
  type CandidateSearchInput,
} from "@/lib/candidateSearch";
import { useOnboarding } from "@/app/components/onboarding/OnboardingContext";
import type { CandidateResult, RecruiterProfileSummary } from "@/lib/recruiter";

type Props = {
  profile: RecruiterProfileSummary | null;
};

type ShownResults = {
  candidates: CandidateResult[];
  search: CandidateSearchInput;
};

/**
 * Marks the slice of a result that matched the search which produced that result.
 *
 * @param text Visible resume text, such as a name, title, location, or skill.
 * @param query Term from the search that returned this result. A blank term leaves the text unchanged.
 * @returns The text with each matching slice wrapped in a highlight that does not add space.
 */
function HighlightedMatch({ text, query }: { text: string; query: string }) {
  return splitSearchMatch(text, query).map((part, index) =>
    part.match ? (
      <Box
        key={`${part.text}-${index}`}
        component="mark"
        style={{ margin: 0, padding: 0 }}
        sx={(theme) => ({
          color: "inherit",
          backgroundColor: alpha(
            theme.palette.secondary.main,
            theme.palette.mode === "dark" ? 0.45 : 0.22,
          ),
        })}
      >
        {part.text}
      </Box>
    ) : (
      <Box key={`${part.text}-${index}`} component="span">
        {part.text}
      </Box>
    ),
  );
}

/**
 * Hiring desk for a signed-in user: save a company name, then search opted-in resumes.
 *
 * @param profile Saved desk, or null when the user has not created one yet.
 * @returns The recruiter onboarding form or the candidate search form, plus a tutorial restart.
 */
export function RecruiterWorkspace({ profile: initialProfile }: Props) {
  const { restartOnboarding } = useOnboarding();
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(!initialProfile);
  const [companyName, setCompanyName] = useState(initialProfile?.companyName ?? "");
  const [title, setTitle] = useState(initialProfile?.title ?? "");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");
  const [results, setResults] = useState<ShownResults | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [searching, setSearching] = useState(false);

  const saveProfile = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/recruiter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, title }),
      });
      const body = (await response.json()) as {
        error?: string;
        profile?: RecruiterProfileSummary;
      };

      if (!response.ok || !body.profile) {
        setError(body.error || "Could not save recruiter profile");
        return;
      }

      setProfile(body.profile);
      setCompanyName(body.profile.companyName);
      setTitle(body.profile.title ?? "");
      setEditing(false);
    } catch {
      setError("Could not save recruiter profile");
    } finally {
      setSaving(false);
    }
  };

  const search = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    const parsed = parseCandidateSearchInput({ query, location, skill });

    if ("error" in parsed) {
      setError(parsed.error);
      return;
    }

    setSearching(true);

    try {
      const response = await fetch("/api/recruiter/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const body = (await response.json()) as { error?: string; candidates?: CandidateResult[] };

      if (!response.ok || !body.candidates) {
        setError(body.error || "Could not search candidates");
        return;
      }

      setResults({ candidates: body.candidates, search: parsed });
    } catch {
      setError("Could not search candidates");
    } finally {
      setSearching(false);
    }
  };

  return (
    <Box sx={{ py: 2, maxWidth: 760 }}>
      <SectionTitle title="Recruiter" />
      <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
        This workspace is separate from your resume. The same account can do both.
      </Typography>

      <Box data-tour-id="recruiter-desk">
        {editing ? (
          <Box
            component="form"
            onSubmit={saveProfile}
            data-testid="recruiter-onboarding"
            sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 480 }}
          >
            <Typography>
              {profile
                ? "Update the desk name candidates will see later."
                : "Add a company or desk name to start searching the resume pool."}
            </Typography>
            <TextField
              label="Company or desk"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              required
              fullWidth
              slotProps={{ htmlInput: { "data-testid": "recruiter-company" } }}
            />
            <TextField
              label="Your title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              fullWidth
              slotProps={{ htmlInput: { "data-testid": "recruiter-title" } }}
            />
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button type="submit" variant="contained" color="secondary" disabled={saving}>
                {profile ? "Save desk" : "Enable recruiter workspace"}
              </Button>
              {profile ? (
                <Button
                  type="button"
                  variant="text"
                  onClick={() => {
                    setEditing(false);
                    setError("");
                    setCompanyName(profile.companyName);
                    setTitle(profile.title ?? "");
                  }}
                >
                  Cancel
                </Button>
              ) : null}
            </Box>
          </Box>
        ) : (
          <Box data-testid="recruiter-search">
            <Box
              sx={{
                mb: 2,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
              }}
            >
              <Typography>
                Searching as <strong>{profile?.companyName}</strong>
                {profile?.title ? `, ${profile.title}` : ""}.
              </Typography>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => setEditing(true)}
              >
                Update desk
              </Button>
            </Box>
            <Box
              component="form"
              onSubmit={search}
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
              }}
            >
              <TextField
                label="Name or title"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                slotProps={{ htmlInput: { "data-testid": "recruiter-query" } }}
              />
              <TextField
                label="Location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                slotProps={{ htmlInput: { "data-testid": "recruiter-location" } }}
              />
              <TextField
                label="Skill"
                value={skill}
                onChange={(event) => setSkill(event.target.value)}
                slotProps={{ htmlInput: { "data-testid": "recruiter-skill" } }}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={searching}
                sx={{ gridColumn: { sm: "1 / -1" }, justifySelf: "start" }}
              >
                Search candidates
              </Button>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ gridColumn: { sm: "1 / -1" }, mt: -0.5 }}
              >
                Use at least 3 characters in each field you fill in.
              </Typography>
            </Box>

            {results ? (
              <Box
                key={`${results.search.query}|${results.search.location}|${results.search.skill}`}
                component="ul"
                sx={{ listStyle: "none", p: 0, m: 0, mt: 3 }}
              >
                {results.candidates.length === 0 ? (
                  <Typography component="li" color="text.secondary">
                    No opted-in candidates match. People appear here only after they allow
                    recruiters to find them.
                  </Typography>
                ) : (
                  results.candidates.map((candidate) => (
                    <Box
                      component="li"
                      key={candidate.slug}
                      data-testid="candidate-result"
                      sx={(theme) => ({
                        mb: 1.5,
                        p: 2,
                        borderRadius: "16px",
                        border: `1px solid ${theme.palette.divider}`,
                      })}
                    >
                      <MuiLink href={`/r/${candidate.slug}`}>
                        <HighlightedMatch text={candidate.name} query={results.search.query} />
                      </MuiLink>
                      <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                        {candidate.title || candidate.location ? (
                          <>
                            {candidate.title ? (
                              <HighlightedMatch
                                text={candidate.title}
                                query={results.search.query}
                              />
                            ) : null}
                            {candidate.title && candidate.location ? " · " : null}
                            {candidate.location ? (
                              <HighlightedMatch
                                text={candidate.location}
                                query={results.search.location}
                              />
                            ) : null}
                          </>
                        ) : (
                          "No title yet"
                        )}
                      </Typography>
                      {candidate.skills.length > 0 ? (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 1.25 }}>
                          {candidate.skills.map((name, index) => {
                            const matched = splitSearchMatch(name, results.search.skill).some(
                              (part) => part.match,
                            );

                            return (
                              <Chip
                                key={`${name}-${index}`}
                                size="small"
                                color={matched ? "secondary" : "default"}
                                variant={matched ? "filled" : "outlined"}
                                label={
                                  <HighlightedMatch text={name} query={results.search.skill} />
                                }
                              />
                            );
                          })}
                        </Box>
                      ) : null}
                    </Box>
                  ))
                )}
              </Box>
            ) : null}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          mt: 4,
          pt: 3,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 480 }}>
          <strong>Tip:</strong> Replay the walkthrough of the hiring desk, search, and who can
          appear.{" "}
          <span
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => {
              void restartOnboarding("recruiter");
            }}
            data-testid="RestartRecruiterTutorial"
          >
            Restart tutorial
          </span>
        </Typography>
      </Box>

      {error ? (
        <Typography color="error" sx={{ mt: 2 }} role="alert">
          {error}
        </Typography>
      ) : null}
    </Box>
  );
}
