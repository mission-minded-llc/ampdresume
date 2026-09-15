"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type NavTourId =
  "nav-menu-button" | "edit-resume-section" | "import-pdf" | "restart-tutorial";

export type NavPrimaryContextValue = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  highlightId: NavTourId | null;
  setHighlightId: (id: NavTourId | null) => void;
  lockOpen: boolean;
  setLockOpen: (lock: boolean) => void;
};

const NavPrimaryContext = createContext<NavPrimaryContextValue | null>(null);

export const NavPrimaryProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setOpen] = useState(false);
  const [highlightId, setHighlightId] = useState<NavTourId | null>(null);
  const [lockOpen, setLockOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      setOpen,
      highlightId,
      setHighlightId,
      lockOpen,
      setLockOpen,
    }),
    [isOpen, highlightId, lockOpen],
  );

  return <NavPrimaryContext.Provider value={value}>{children}</NavPrimaryContext.Provider>;
};

export const useNavPrimary = () => useContext(NavPrimaryContext);
