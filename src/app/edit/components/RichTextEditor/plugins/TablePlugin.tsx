import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createTableNodeWithDimensions } from "@lexical/table";
import { $insertNodeToNearestRoot } from "@lexical/utils";
import TableChartIcon from "@mui/icons-material/TableChart";
import { Box, Button, Dialog, DialogContent, IconButton, TextField } from "@mui/material";
import { useState } from "react";

import { CustomDialogTitle } from "@/components/CustomDialogTitle";

export const TablePlugin = () => {
  const [editor] = useLexicalComposerContext();

  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState<number>();
  const [columns, setColumns] = useState<number>();

  const onAddTable = () => {
    if (!rows || !columns) return;

    editor.update(() => {
      const tableNode = $createTableNodeWithDimensions(rows, columns, true);
      $insertNodeToNearestRoot(tableNode);
    });

    setRows(undefined);
    setColumns(undefined);
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <CustomDialogTitle closeHandler={() => setIsOpen(false)}>Add Table</CustomDialogTitle>
        <DialogContent
          sx={{
            width: "400px",
            maxWidth: "90vw",
          }}
        >
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2, zIndex: 100 }}>
            <TextField
              placeholder="Rows"
              label="Number of Rows"
              type="number"
              name="rows"
              autoFocus
              value={rows}
              onChange={(e) => {
                setRows(Number(e.target.value));
              }}
              slotProps={{ htmlInput: { min: 1, max: 100 } }}
            />
            <TextField
              placeholder="Columns"
              label="Number of Columns"
              type="number"
              name="columns"
              value={columns}
              onChange={(e) => {
                setColumns(Number(e.target.value));
              }}
              slotProps={{ htmlInput: { min: 1, max: 20 } }}
            />
            <Button onClick={onAddTable} disabled={!rows || !columns}>
              Add
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <IconButton
        aria-label="Add table"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <TableChartIcon />
      </IconButton>
    </>
  );
};
