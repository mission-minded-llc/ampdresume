import React from "react";
import { DialogTitle as MuiDialogTitle } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CloseButton } from "./CloseButton";

const StyledDialogTitle = styled(MuiDialogTitle)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "1.25rem",
}));

export const CustomDialogTitle = ({
  children,
  closeHandler,
}: {
  children: React.ReactNode | React.ReactNode[];
  closeHandler: () => void;
}) => (
  <StyledDialogTitle>
    {children}
    <CloseButton onClick={closeHandler} />
  </StyledDialogTitle>
);
