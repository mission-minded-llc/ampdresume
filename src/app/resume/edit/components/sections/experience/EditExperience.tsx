import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ResumeContext } from "@/components/resume/ResumeContext";
import { SectionTitle } from "../SectionTitle";
import { addCompany } from "@/graphql/addCompany";
import { formatDate } from "@/lib/format";
import { useSession } from "next-auth/react";

export const EditExperience = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { companies } = useContext(ResumeContext);

  const [openDialog, setOpenDialog] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [dateError, setDateError] = useState("");
  const [companyName, setCompanyName] = useState("");

  const mutation = useMutation({
    mutationFn: async ({
      companyName,
      location,
      startDate,
      endDate,
    }: {
      companyName: string;
      location: string;
      startDate: string;
      endDate: string;
    }) => {
      if (!session?.user?.id) return;
      await addCompany({
        userId: session.user.id,
        companyName,
        location,
        startDate,
        endDate,
      });
    },
    onSuccess: () => {
      if (!session?.user?.id) return;

      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });

  // Validate dates when either date changes
  const validateDates = (start: string, end: string) => {
    if (!start || !end) return true;

    const startDate = new Date(start);
    const endDate = new Date(end);
    const currentDate = new Date();

    if (endDate < startDate) {
      setDateError("End date cannot be before start date");
      return false;
    }

    if (startDate > currentDate || endDate > currentDate) {
      setDateError("Dates cannot be in the future");
      return false;
    }

    setDateError("");
    return true;
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    validateDates(newStartDate, endDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    validateDates(startDate, newEndDate);
  };

  const handleAddCompany = () => {
    if (validateDates(startDate, endDate)) {
      mutation.mutate({ companyName, location, startDate, endDate });

      // Close dialog and reset states
      setOpenDialog(false);
      setCompanyName("");
      setStartDate("");
      setEndDate("");
    }
  };

  return (
    <Container>
      <SectionTitle title="Edit Professional Experience" />

      <Box sx={{ mb: 4 }}>
        <Button variant="outlined" color="primary" onClick={() => setOpenDialog(true)}>
          Add Company
        </Button>
      </Box>

      {companies?.length > 0 ? (
        <>
          <SectionTitle title="Your Work Experience" />
          {companies.map((company) => (
            <Box
              key={company.id}
              sx={{
                mb: 4,
                border: "1px solid #ccc",
                p: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p>
                <strong>{company.name}&nbsp;-&nbsp;</strong>
                {company?.location ? ` (${company.location}) ` : " "}
                {formatDate(company.startDate.toString())} to{" "}
                {company?.endDate ? formatDate(company.endDate?.toString()) : "present"}
              </p>
              <Box sx={{ display: "flex", gap: 4 }}>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
                {/* TODO: make delete available only if all positions are removed from company. */}
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </>
      ) : null}

      {/* New Company Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Company</DialogTitle>

        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <TextField
              margin="dense"
              fullWidth
              variant="outlined"
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              margin="dense"
              fullWidth
              variant="outlined"
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Box>
          <Typography>Date start/end (month and year only, end is optional):</Typography>
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <TextField
              autoFocus
              margin="dense"
              type="month"
              fullWidth
              variant="outlined"
              value={startDate}
              label="Date Started"
              onChange={handleStartDateChange}
              slotProps={{
                htmlInput: {
                  max: new Date().toISOString().split("T")[0].substring(0, 7),
                },
                inputLabel: {
                  shrink: true,
                  sx: {
                    visibility: endDate ? "visible" : "hidden",
                    "&.Mui-focused": {
                      visibility: "visible",
                    },
                  },
                },
              }}
              error={!!dateError}
              required
            />
            <TextField
              margin="dense"
              type="month"
              fullWidth
              variant="outlined"
              value={endDate}
              label="Date Ended"
              onChange={handleEndDateChange}
              slotProps={{
                htmlInput: {
                  min: startDate,
                  max: new Date().toISOString().split("T")[0].substring(0, 7),
                },
                inputLabel: {
                  shrink: true,
                  sx: {
                    visibility: endDate ? "visible" : "hidden",
                    "&.Mui-focused": {
                      visibility: "visible",
                    },
                  },
                },
              }}
              error={!!dateError}
              helperText={dateError}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddCompany} disabled={!startDate || !endDate || !!dateError}>
            Add Company
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
