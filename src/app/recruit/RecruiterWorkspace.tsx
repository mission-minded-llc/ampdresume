"use client";

import { FormEvent, useState } from "react";
import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import { MuiLink } from "@/components/MuiLink";
import { SectionTitle } from "@/app/edit/components/SectionTitle";
import type { CandidateResult, RecruiterProfileSummary } from "@/lib/recruiter";

type Props = {
  profile: RecruiterProfileSummary | null;
};

/**
 * Hiring desk for a signed-in user: save a company name, then search opted-in resumes.
 *
 * @param profile Saved desk, or null when the user has not created one yet.
 * @returns The recruiter onboarding form or the candidate search form.
 */
export function RecruiterWorkspace({ profile: initialProfile }: Props) {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(!initialProfile);
  const [companyName, setCompanyName] = useState(initialProfile?.companyName ?? "");
  const [title, setTitle] = useState(initialProfile?.title ?? "");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");
  const [candidates, setCandidates] = useState<CandidateResult[] | null>(null);
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

    if (!query.trim() && !location.trim() && !skill.trim()) {
      setError("Enter a name, title, location, or skill");
      return;
    }

    setSearching(true);

    try {
      const response = await fetch("/api/recruiter/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, location, skill }),
      });
      const body = (await response.json()) as { error?: string; candidates?: CandidateResult[] };

      if (!response.ok || !body.candidates) {
        setError(body.error || "Could not search candidates");
        return;
      }

      setCandidates(body.candidates);
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
            sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" } }}
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
          </Box>

          {candidates ? (
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, mt: 3 }}>
              {candidates.length === 0 ? (
                <Typography component="li" color="text.secondary">
                  No opted-in candidates match. People appear here only after they allow recruiters
                  to find them.
                </Typography>
              ) : (
                candidates.map((candidate) => (
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
                    <MuiLink href={`/r/${candidate.slug}`}>{candidate.name}</MuiLink>
                    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                      {[candidate.title, candidate.location].filter(Boolean).join(" · ") ||
                        "No title yet"}
                    </Typography>
                    {candidate.skills.length > 0 ? (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 1.25 }}>
                        {candidate.skills.map((name, index) => (
                          <Chip key={`${name}-${index}`} size="small" label={name} />
                        ))}
                      </Box>
                    ) : null}
                  </Box>
                ))
              )}
            </Box>
          ) : null}
        </Box>
      )}

      {error ? (
        <Typography color="error" sx={{ mt: 2 }} role="alert">
          {error}
        </Typography>
      ) : null}
    </Box>
  );
}
