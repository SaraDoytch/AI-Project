// CategoryFilter.tsx
import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";

interface CategoryFilterProps {
  categories: { _id: string; name: string }[];
  selectedCategory: string;
  onChange: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onChange,
}) => {
  return (
    <Box sx={{ minWidth: 200, mr: 4 }}>
      <Typography variant="h6" gutterBottom>
        סנן לפי קטגוריה
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedCategory === ""}
              onChange={() => onChange("")}
            />
          }
          label="הצג הכל"
        />
        {categories.map((cat) => (
          <FormControlLabel
            key={cat._id}
            control={
              <Checkbox
                checked={selectedCategory === cat._id}
                onChange={() => onChange(cat._id)}
              />
            }
            label={cat.name}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default CategoryFilter;
