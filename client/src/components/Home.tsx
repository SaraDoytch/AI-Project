// // import React from "react";
// // import {
// //   Box,
// //   Typography,
// //   Button,
// //   Container,
// //   Grid,
// //   Paper,
// //   Card,
// //   CardContent,
// //   CardActionArea,
// //   Stack,
// //   InputBase,
// //   Divider,
// //   IconButton,
// // } from "@mui/material";
// // import SearchIcon from '@mui/icons-material/Search';
// // import { useNavigate } from 'react-router-dom';

// // const mockSubjects = ["מתמטיקה", "היסטוריה", "מדעי המחשב", "פיזיקה", "אנגלית"];

// // const getGreeting = () => {
// //   const hour = new Date().getHours();
// //   if (hour < 12) return "בוקר טוב";
// //   if (hour < 18) return "צהריים טובים";
// //   return "ערב טוב";
// // };


// // const Home = () => {
// //     const navigate = useNavigate();
// // const handleClick = () => {
// //   navigate('/Learning');
// // };
// //   return (
// //     <Container maxWidth="md" sx={{ mt: 4 }}>
// //       {/* Greeting Section */}
// //       <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center', backgroundColor: '#e3f2fd' }}>
// //         <Typography variant="h5" gutterBottom>{getGreeting()}</Typography>
// //         <Typography variant="h6" gutterBottom>
// //           מוכנים להמשיך בחקירת עולם הידע?
// //         </Typography>
// //         <Typography variant="body1" gutterBottom>
// //           בחרו נושא ונתחיל ללמוד יחד!
// //         </Typography>
// //         <Button variant="contained" color="primary" sx={{ mt: 2 }}>
// //           התחל ללמוד
// //         </Button>
// //       </Paper>

// //       {/* Choose Subject Section */}
// //       <Typography variant="h6" gutterBottom textAlign="center">
// //         בחר נושא למידה
// //       </Typography>
// //       <Grid container spacing={2} justifyContent="center">
// //         {mockSubjects.map((subject) => (
// //           <Grid item key={subject} xs={6} sm={4} md={3}>
// //             <Card onClick={handleClick}>
// //               <CardActionArea>
// //                 <CardContent>
// //                   <Typography variant="body1" align="center">
// //                     {subject}
// //                   </Typography>
// //                 </CardContent>
// //               </CardActionArea>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>
// //     </Container>
// //   );
// // };

// // export default Home;

// import React from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Container,
//   Grid,
//   Paper,
//   Card,
//   CardContent,
//   CardActionArea,
// } from "@mui/material";
// import { useNavigate } from 'react-router-dom';
// import { useGetCategoriesQuery } from "../stores/Slices/categoryApiSlice";

// const getGreeting = () => {
//   const hour = new Date().getHours();
//   if (hour < 12) return "בוקר טוב";
//   if (hour < 18) return "צהריים טובים";
//   return "ערב טוב";
// };

// const Home = () => {
//   const navigate = useNavigate();
//   const { data: categories = [], isLoading, isError } = useGetCategoriesQuery();

//   // const handleClick = () => {
//   //   navigate('/Learning');
//   // };

//   const handleClick = (categoryId) => {
//   navigate(`/Learning?categoryId=${categoryId}`);
// };

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       {/* Greeting */}
//       <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center', backgroundColor: '#e3f2fd' }}>
//         <Typography variant="h5">{getGreeting()}</Typography>
//         <Typography variant="h6">מוכנים להמשיך בחקירת עולם הידע?</Typography>
//         <Typography variant="body1">בחרו נושא ונתחיל ללמוד יחד!</Typography>
//         <Button variant="contained" color="primary" sx={{ mt: 2 }}>
//           התחל ללמוד
//         </Button>
//       </Paper>

//       {/* Categories */}
//       <Typography variant="h6" gutterBottom textAlign="center">
//         בחר נושא למידה
//       </Typography>

//       {isLoading ? (
//         <Typography align="center">טוען קטגוריות...</Typography>
//       ) : isError ? (
//         <Typography align="center" color="error">שגיאה בטעינת הקטגוריות</Typography>
//       ) : (
//         <Grid container spacing={2} justifyContent="center">
//           {categories.map((category) => (
//             <Grid item key={category._id} xs={6} sm={4} md={3}>
//               {/* <Card onClick={handleClick}> */}
//               <Card onClick={() => handleClick(category._id)}>

//                 <CardActionArea>
//                   <CardContent>
//                     <Typography variant="body1" align="center">
//                       {category.name}
//                     </Typography>
//                   </CardContent>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Container>
//   );
// };

// export default Home;

import React from "react";
import {
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router"; // שימי לב
import { useGetCategoriesQuery } from "../stores/Slices/categoryApiSlice";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "בוקר טוב";
  if (hour < 18) return "צהריים טובים";
  return "ערב טוב";
};

const Home = () => {
  const { data: categories = [], isLoading, isError } = useGetCategoriesQuery();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Greeting */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center', backgroundColor: '#e3f2fd' }}>
        <Typography variant="h5">{getGreeting()}</Typography>
        <Typography variant="h6">מוכנים להמשיך בחקירת עולם הידע?</Typography>
        <Typography variant="body1">בחרו נושא ונתחיל ללמוד יחד!</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          התחל ללמוד
        </Button>
      </Paper>

      {/* Categories */}
      <Typography variant="h6" gutterBottom textAlign="center">
        בחר נושא למידה
      </Typography>

      {isLoading ? (
        <Typography align="center">טוען קטגוריות...</Typography>
      ) : isError ? (
        <Typography align="center" color="error">שגיאה בטעינת הקטגוריות</Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {categories.map((category) => (
            <Grid item key={category._id} xs={6} sm={4} md={3}>
              <Card>
                <CardActionArea component={Link} to={`/Learning/${category._id}`}>
                  <CardContent>
                    <Typography variant="body1" align="center">
                      {category.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
