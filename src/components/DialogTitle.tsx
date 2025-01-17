import { CloseButton } from "./CloseButton";
import { DialogTitle as MuiDialogTitle } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const StyledDialogTitle = styled(MuiDialogTitle)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
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
