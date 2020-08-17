import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Collapse,
} from "@material-ui/core";
import Axios from "axios";
import { ICategories } from "../../../types/CategoriesInterface";
import { useAlert } from "../../../context/AlertContext";

interface SubCategoriesComponentProps {
  categoriesData: ICategories[];
  currentCategory?: number;
  jwt: string;
  getCategories: () => void;
  currentSubCategory: any;
  subCategories: any;
  setCurrentSubCategory: any;
  classes: any;
}

const SubCategoriesCompoent = ({
  categoriesData,
  currentCategory,
  jwt,
  getCategories,
  currentSubCategory,
  subCategories,
  setCurrentSubCategory,
  classes,
}: SubCategoriesComponentProps) => {
  const [alertState, alertDispatch] = useAlert();
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState("");

  function handleAddSubCategory() {
    const category = categoriesData?.find(
      (el: any) => el.id === currentCategory
    );

    if (newSubCategory !== "") {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };

      const values = {
        category: category?.category,
        sub_category: newSubCategory,
      };

      Axios.post(`/api/sub-categories/v1`, values, config)
        .then((res) => {
          console.log(res.data);
          setAddSubCategory(false);
          setNewSubCategory("");
          getCategories();
          alertDispatch({
            type: "showAlert",
            payload: {
              message: "Successfully Added New Sub Category!",
              severity: "success",
            },
          });
        })
        .catch((err) => {
          console.log(err.message);
          alertDispatch({
            type: "showAlert",
            payload: {
              message: "Failed To Add New Sub Category!",
              severity: "error",
            },
          });
        });
    }
  }

  function handleDeleteSubCategory() {
    if (confirm("Are you sure?")) {
      const category = subCategories?.find(
        (el: any) => el.sub_category === currentSubCategory
      );

      const id = category.id;

      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      Axios.delete(`/api/sub-categories/v1/${id}`, config)
        .then((res) => {
          getCategories();
          alertDispatch({
            type: "showAlert",
            payload: {
              message: "Successfully Deleted Sub Category!",
              severity: "success",
            },
          });
        })
        .catch((err) => {
          alertDispatch({
            type: "showAlert",
            payload: {
              message: "Failed To Delete Sub Category!",
              severity: "danger",
            },
          });
          console.log(err);
        });
    }
  }

  return (
    <Box mt={3}>
      <Typography variant="h4" align="center">
        Update Sub Categories
      </Typography>
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              fullWidth
              name="subCategory"
              select
              value={currentSubCategory}
              onChange={(e) => setCurrentSubCategory(e.target.value)}
            >
              {subCategories.map((item: any) => (
                <MenuItem key={item.id} value={item.sub_category}>
                  {item.sub_category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classes.buttons}
              fullWidth
              variant="outlined"
              onClick={(e) => setAddSubCategory(!addSubCategory)}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classes.buttons}
              fullWidth
              variant="outlined"
              onClick={() => handleDeleteSubCategory()}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box mt={2}>
        <Collapse in={addSubCategory}>
          <Grid container spacing={2}>
            <Grid item xs={7} md={10}>
              <TextField
                variant="outlined"
                fullWidth
                name="addCategory"
                label="New sub category name"
                value={newSubCategory}
                onChange={(e) => setNewSubCategory(e.target.value)}
              />
            </Grid>
            <Grid xs={5} item md={2}>
              <Button
                className={classes.buttons}
                fullWidth
                variant="outlined"
                onClick={() => {
                  handleAddSubCategory();
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

export default SubCategoriesCompoent;
