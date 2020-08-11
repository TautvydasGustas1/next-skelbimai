import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  Box,
  Container,
  CardContent,
  Card,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Collapse,
} from "@material-ui/core";
import { ICategories } from "../../types/CategoriesInterface";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TokenService from "../../Helpers/TokenHelper";
import { NextPageContext } from "next";
import { useAlert } from "../../context/AlertContext";

const useStyles = makeStyles((theme) => ({
  buttons: {
    height: "100%",
  },
}));

const categories = ({ jwt }: any) => {
  const [alertState, alertDispatch] = useAlert();
  const classes = useStyles();

  const [categoriesData, setCategoriesData] = useState<ICategories[]>();
  const [subCategories, setSubCategories] = useState<any>();
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [editCategory, setEditCategory] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [currentSubCategory, setCurrentSubCategory] = useState("");
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState("");

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    Axios.get("/api/categories/v1")
      .then((res) => {
        console.log(res.data);
        setCurrentCategory(res.data[0].id);
        setCategoriesData(res.data);
        setCurrentSubCategory(res.data[0].sub_categories[0].sub_category);
        setSubCategories(res.data[0].sub_categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditCategory() {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    const values = { category: currentCategory };

    Axios.put("/api/categories/v1", values, config)
      .then((res) => {
        console.log(res.data);
        alertDispatch({
          type: "showAlert",
          payload: {
            message: "Successfully Updated A Category!",
            severity: "success",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        alertDispatch({
          type: "showAlert",
          payload: {
            message: "Failed to Update A Category!",
            severity: "danger",
          },
        });
      });
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

  function handleAddCategory() {
    if (newCategory !== "") {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };

      const values = { category: newCategory };

      Axios.post(`/api/categories/v1`, values, config)
        .then((res) => {
          console.log(res.data);
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

  function handleCategoryChange(value: any) {
    setCurrentCategory(value);
    const obj = categoriesData?.find((el) => el.id === value);
    console.log(obj);
    setSubCategories(obj?.sub_categories);
    if (obj!.sub_categories.length > 0) {
      setCurrentSubCategory(obj!.sub_categories[0].sub_category);
    } else {
      setCurrentSubCategory("");
    }
  }

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
    console.log(currentSubCategory);
    // const category = categoriesData?.find((el: any) => console.log(el.sub));

    // console.log(category);
    // const config = {
    //   headers: { Authorization: `Bearer ${jwt}` },
    // };
    // Axios.delete(`/api/sub-categories/v1/${id}`, config)
    //   .then((res) => {
    //     getCategories();
    //     alertDispatch({
    //       type: "showAlert",
    //       payload: {
    //         message: "Successfully Deleted Sub Category!",
    //         severity: "success",
    //       },
    //     });
    //   })
    //   .catch((err) => {
    //     alertDispatch({
    //       type: "showAlert",
    //       payload: {
    //         message: "Failed To Delete Sub Category!",
    //         severity: "danger",
    //       },
    //     });
    //     console.log(err);
    //   });
  }

  return (
    <AdminLayout>
      <Container>
        <Box mt={3}>
          <Card>
            <CardContent>
              <Typography align="center" variant="h4">
                Update categories
              </Typography>
              {categoriesData && (
                <Box>
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
                          {categoriesData.map((cat) => (
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
                              onClick={() => {
                                handleEditCategory();
                              }}
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
                  {subCategories && (
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
                              onChange={(e) =>
                                setCurrentSubCategory(e.target.value)
                              }
                            >
                              {subCategories.map((item: any) => (
                                <MenuItem
                                  key={item.id}
                                  value={item.sub_category}
                                >
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
                              onClick={(e) =>
                                setAddSubCategory(!addSubCategory)
                              }
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
                                onChange={(e) =>
                                  setNewSubCategory(e.target.value)
                                }
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
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </AdminLayout>
  );
};

categories.getInitialProps = async (ctx: NextPageContext) => {
  const tokenService = new TokenService();
  const token = await tokenService.authenticateTokenSsr(ctx);

  return {
    jwt: token,
  };
};

export default categories;
