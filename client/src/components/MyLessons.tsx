



import React, { useState } from "react";
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Paper,
    Button,
    CircularProgress,
    Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { useGetPromptsByUserQuery } from "../stores/Slices/promptApiSlice";
import { Prompt } from "../interfaces/Interface";
import { useGetCategoriesQuery } from "../stores/Slices/categoryApiSlice";

const MyLessons = () => {
    const user = useSelector((state: any) => state.auth.currentUser);
    const navigate = useNavigate();
    const { data: categories = [] } = useGetCategoriesQuery();

    // טען שיעורים עם טיפוס ברור Prompt[]
    const {
        data: lessons = [] as Prompt[],
        isLoading,
        isError,
    } = useGetPromptsByUserQuery(user?.id, {
        skip: !user?.id,
    });

    const getCategoryName = (categoryId: string) => {
        const cat = categories.find((c: any) => c._id === categoryId);
        return cat ? cat.name : "לא זמין";
    };

    // טיפוס נכון ל־selectedLesson
    const [selectedLesson, setSelectedLesson] = useState<Prompt | null>(null);

    if (!user) {
        return (
            <Container sx={{ mt: 4, direction: "rtl" }}>
                <Typography variant="h6" color="error" gutterBottom>
                    עליך להיות מחובר כדי לצפות בשיעורים שלך.
                </Typography>
                <Button variant="contained" onClick={() => navigate("/loginIn")}>
                    התחבר/י עכשיו
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, direction: "rtl" }}>
            <Typography variant="h4" gutterBottom>
                השיעורים שלי
            </Typography>

            {isLoading && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            )}

            {isError && (
                <Typography color="error" align="center">
                    אירעה שגיאה בטעינת השיעורים.
                </Typography>
            )}

            {!isLoading && lessons.length === 0 && (
                <Typography align="center">לא נמצאו שיעורים שיצרת.</Typography>
            )}

            <List>
                {lessons.map((lesson) => (
                    <React.Fragment key={lesson.id}>
                        <ListItem
                            component="button"
                            onClick={() => setSelectedLesson(lesson)}
                            sx={{ cursor: "pointer" }}
                        >
                            <ListItemText
                                primary={lesson.prompt.slice(0, 40) + "..."}
                                secondary={`קטגוריה: ${getCategoryName(lesson.category_id)}`}
                            />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>

            {selectedLesson && (
                <Paper sx={{ p: 3, mt: 3, backgroundColor: "#f9f9f9" }} elevation={3}>
                    <Typography variant="h6" gutterBottom>
                        {selectedLesson.prompt}
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                        {selectedLesson.response}
                    </Typography>
                    <Button sx={{ mt: 2 }} onClick={() => setSelectedLesson(null)}>
                        סגור
                    </Button>
                </Paper>
            )}

            <Button sx={{ mt: 4 }} variant="outlined" onClick={() => navigate(-1)}>
                חזור
            </Button>
        </Container>
    );
};

export default MyLessons;
