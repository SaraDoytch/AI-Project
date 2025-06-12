// src/components/Learning.tsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  Paper,
  Divider,
} from "@mui/material";

const subTopics = [
  "היסטוריה של הבינה המלאכותית",
  "למידת מכונה",
  "רשתות נוירונים",
  "עיבוד שפה טבעית",
];

const Learning: React.FC = () => {
  const [selectedSubTopic, setSelectedSubTopic] = useState("");
  const [question, setQuestion] = useState("");

  return (
    <Container maxWidth="md" sx={{ mt: 4, direction: "rtl" }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          נושא הלמידה: בינה מלאכותית
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          בחרו תת-נושא שמעניין אתכם או שאלו שאלה בנושא:
        </Typography>

        <TextField
          select
          label="בחר תת נושא"
          fullWidth
          value={selectedSubTopic}
          onChange={(e) => setSelectedSubTopic(e.target.value)}
          margin="normal"
        >
          {subTopics.map((topic, index) => (
            <MenuItem key={index} value={topic}>
              {topic}
            </MenuItem>
          ))}
        </TextField>

        <Divider sx={{ my: 3 }} />

        <TextField
          label="רשמו שאלה בנושא"
          placeholder="מה ההבדל בין AI ל-ML?"
          multiline
          rows={4}
          fullWidth
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <Box sx={{ textAlign: "left", mt: 3 }}>
          <Button variant="contained" color="primary">
            שלח שאלה
          </Button>
        </Box>
      </Paper>

      <Box textAlign="center">
        <Button variant="outlined" size="large" color="secondary">
          עבור לשיעור
        </Button>
      </Box>
    </Container>
  );
};

export default Learning;
