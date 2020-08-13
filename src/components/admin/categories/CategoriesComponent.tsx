import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Collapse,
} from "@material-ui/core";
import Axios from "axios";
import { useAlert } from "../../../context/AlertContext";
import { ICategories } from "../../../types/CategoriesInterface";

interface CategoriesComponentProps {
  currentCategory?: number;
  jwt: string;
  categoriesData: ICategories[] | undefined;
  getCategories: any;
  classes: any;
  handleCategoryChange: (arg: any) => void;
}

const CategoriesComponent = ({
  currentCategory,
  jwt,
  categoriesData,
  getCategories,
  classes,
  handleCategoryChange,
}: CategoriesComponentProps) => {
  const [newCategory, setNewCategory] = useState("");
  const [alertState, alertDispatch] = useAlert();
  const [editCategory, setEditCategory] = useState(false);
  const [addCategory, setAddCategory] = useState(false);

  function handleAddCategory() {
    if (newCategory !== "") {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };

      const values = { category: newCategory };

      Axios.post(`/api/categories/v1`, values, config)
        .then((res) => {
          setAddCategory(false);
          setNewCategory("");
          getCategories();
          alertDispatch({
            type: "showAlert",
            payload: {
              message: "Successfully Added New Category!",
              severity: "success",
            },
          });
        })
        .catch((err) => {
          console.log(err);
          alertDispatch({
            type: "showAlert",
            payload: {
              message: "Failed To Add New Category!",
              severity: "danger",
            },
          });
        });
    }
  }

  function handleDeleteCategory() {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    const values = { category: currentCategory };

    Axios.delete(`/api/categories/v1/${currentCategory}`, config)
      .then((res) => {
        getCategories();
        alertDispatch({
          type: "showAlert",
          payload: {
            message: "Successfully Deleted Category!",
            severity: "success",
          },
        });
      })
      .catch((err) => {
        alertDispatch({
          type: "showAlert",
          payload: {
            message: "Failed To Delete Category!",
            severity: "danger",
          },
        });
        console.log(err);
      });
  }

  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            select
            name="categorySelect"
            label="Choose a category"
            value={currentCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categoriesData!.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={2} xs={6}>
          <Button
            className={classes.buttons}
            fullWidth
            variant="outlined"
            onClick={() => {
              setAddCategory(!addCategory);
            }}
          >
            Add
          </Button>
        </Grid>
        <Grid item md={2} xs={6}>
          <Button
            className={classes.buttons}
            fullWidth
            variant="outlined"
            onClick={() => {
              setEditCategory(!editCategory);
            }}
            disabled
          >
            Edit
          </Button>
        </Grid>
        <Grid item md={2} xs={6}>
          <Button
            className={classes.buttons}
            fullWidth
            variant="outlined"
            onClick={() => handleDeleteCategory()}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Collapse in={editCategory}>
          <Grid container spacing={2}>
            <Grid item xs={7} md={10}>
              <TextField
                variant="outlined"
                fullWidth
                name="category"
                label="Rename selected category"
              />
            </Grid>
            <Grid xs={5} item md={2}>
              <Button
                className={classes.buttons}
                fullWidth
                variant="outlined"
                onClick={() => {}}
              >
                Submit changes
              </Button>
            </Grid>
          </Grid>
        </Collapse>
        <Collapse in={addCategory}>
          <Grid container spacing={2}>
            <Grid item xs={7} md={10}>
              <TextField
                variant="outlined"
                fullWidth
                name="addCategory"
                label="New category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </Grid>
            <Grid xs={5} item md={2}>
              <Button
                className={classes.buttons}
                fullWidth
                variant="outlined"
                onClick={() => {
                  handleAddCategory();
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </Box>
    </Box>
  );
};

export default CategoriesComponent;
