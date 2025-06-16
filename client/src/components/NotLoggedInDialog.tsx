import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface NotLoggedInDialogProps {
  open: boolean;
  onClose: () => void;
}

const NotLoggedInDialog: React.FC<NotLoggedInDialogProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>שגיאה</DialogTitle>
      <DialogContent>
        <Typography>
          עליך להיות מחובר כדי ליצור שיעור. אנא התחבר או הירשם.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigate("/loginForm")} color="primary">
          התחברות
        </Button>
        <Button onClick={() => navigate("/loginIn")} color="secondary">
          הרשמה
        </Button>
        <Button onClick={onClose}>ביטול</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotLoggedInDialog;
