import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface AIResponseDialogProps {
    open: boolean;
    response: string;
    onClose: () => void;
}

const AIResponseDialog: React.FC<AIResponseDialogProps> = ({ open, response, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                תשובת AI
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        left: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Typography sx={{ whiteSpace: "pre-line" }}>{response}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="contained">
                    סגור
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AIResponseDialog;
