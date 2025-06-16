

// export default Instructions;
import { Container, Typography, Button, List, ListItem, ListItemText, Box } from "@mui/material";
import { useNavigate } from "react-router";

const Instructions = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 4, direction: "rtl" }}>
      <Typography variant="h4" gutterBottom>
        איך להשתמש באתר וליצור שיעורים
      </Typography>

      <Typography variant="body1" paragraph>
        ברוכים הבאים לפלטפורמת הלמידה שלנו! כאן תוכלו ליצור שיעורים מותאמים אישית בעזרת בינה מלאכותית, לפי נושאים שמעניינים אתכם.
      </Typography>

      <Typography variant="h6" gutterBottom>
        שלבים ליצירת שיעור חדש:
      </Typography>

      <List>
        <ListItem>
          <ListItemText
            primary="1. בחירת קטגוריה"
            secondary="בחרו נושא כללי שמעניין אתכם, כמו 'מדע', 'היסטוריה' או 'מתמטיקה'."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="2. בחירת תת קטגוריה"
            secondary="בחרו תת נושא מדויק יותר, לדוגמה, בתוך 'מדע' תוכלו לבחור 'פיזיקה' או 'כימיה'."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="3. הזנת שאלה חופשית"
            secondary="אפשר לשאול שאלה ספציפית שתרצו לקבל עליה הסבר, למשל: 'איך פועל הכוח הכבידה?' או להשאיר את השדה ריק לשאלה כללית בנושא הנבחר."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="4. שליחת השאלה"
            secondary="לחצו על כפתור 'שלח שאלה' והמערכת תיצור עבורכם שיעור מבוסס AI עם הסבר מפורט."
          />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        דוגמה לשאלה חופשית:
      </Typography>
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          p: 2,
          borderRadius: 1,
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
        }}
      >
        איך מתבצע תהליך הפוטוסינתזה בצמחים?{"\n"}אנא הסברו בצורה פשוטה וברורה.
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        איך לצפות בשיעורים שיצרתם בעבר?
      </Typography>
      <Typography variant="body1" paragraph>
        תוכלו לגשת לרשימת השיעורים שלכם דרך דף "השיעורים שלי" (My Lessons), שם תוכלו לקרוא את השיעורים, ללמוד מחדש ולשתף עם חברים.
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        חשוב לדעת:
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="•"
            secondary="יש להיות מחוברים למערכת כדי ליצור שיעורים ולשמור אותם."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="•"
            secondary="השאלות יכולות להיות בעברית או באנגלית, אך מומלץ לנסח שאלות ברורות כדי לקבל תשובות איכותיות."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="•"
            secondary="אם לא תבחרו תת קטגוריה ולא תזינו שאלה, תיווצר שאלה כללית על הקטגוריה שנבחרה."
          />
        </ListItem>
      </List>

      <Button variant="contained" onClick={() => navigate("/")} sx={{ mt: 4 }}>
        חזור לדף הבית
      </Button>
    </Container>
  );
};

export default Instructions;
