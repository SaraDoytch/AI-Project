import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  InputBase,
  Divider,
  IconButton,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const mockSubjects = ["מתמטיקה", "היסטוריה", "מדעי המחשב", "פיזיקה", "אנגלית"];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "בוקר טוב";
  if (hour < 18) return "צהריים טובים";
  return "ערב טוב";
};


const Home = () => {
    const navigate = useNavigate();
const handleClick = () => {
  navigate('/Learning');
};
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Greeting Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center', backgroundColor: '#e3f2fd' }}>
        <Typography variant="h5" gutterBottom>{getGreeting()}</Typography>
        <Typography variant="h6" gutterBottom>
          מוכנים להמשיך בחקירת עולם הידע?
        </Typography>
        <Typography variant="body1" gutterBottom>
          בחרו נושא ונתחיל ללמוד יחד!
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          התחל ללמוד
        </Button>
      </Paper>

      {/* Choose Subject Section */}
      <Typography variant="h6" gutterBottom textAlign="center">
        בחר נושא למידה
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {mockSubjects.map((subject) => (
          <Grid item key={subject} xs={6} sm={4} md={3}>
            <Card onClick={handleClick}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="body1" align="center">
                    {subject}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
