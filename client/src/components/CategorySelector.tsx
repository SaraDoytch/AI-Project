// import { TextField, MenuItem } from "@mui/material";

// const CategorySelector = ({
//   categories,
//   subCategories,
//   categoryId,
//   subCategoryId,
//   setCategoryId,
//   setSubCategoryId,
//   loadingCategories,
//   loadingSubCategories,
// }) => {
//   return (
//     <>
//       <TextField
//         select
//         fullWidth
//         label="קטגוריה"
//         value={categoryId}
//         onChange={(e) => {
//           setCategoryId(e.target.value);
//           setSubCategoryId("");
//         }}
//         sx={{ my: 2 }}
//         disabled={loadingCategories}
//       >
//         {categories.map((cat) => (
//           <MenuItem key={cat._id} value={cat._id}>
//             {cat.name}
//           </MenuItem>
//         ))}
//       </TextField>

//       {subCategories.length > 0 && (
//         <TextField
//           select
//           fullWidth
//           label="תת קטגוריה"
//           value={subCategoryId}
//           onChange={(e) => setSubCategoryId(e.target.value)}
//           sx={{ my: 2 }}
//           disabled={loadingSubCategories}
//         >
//           {subCategories.map((sub) => (
//             <MenuItem key={sub._id} value={sub._id}>
//               {sub.name}
//             </MenuItem>
//           ))}
//         </TextField>
//       )}
//     </>
//   );
// };

// export default CategorySelector;
