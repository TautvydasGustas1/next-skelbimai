import React, { useEffect, useState, useRef } from "react";
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
import CategoriesComponent from "../../components/admin/categories/CategoriesComponent";
import SubCategoriesCompoent from "../../components/admin/categories/SubCategoriesCompoent";

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
  const [currentCategory, setCurrentCategory] = useState<number>();
  const [currentSubCategory, setCurrentSubCategory] = useState("");

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

  // function handleEditCategory() {
  //   const config = {
  //     headers: { Authorization: `Bearer ${jwt}` },
  //   };

  //   const values = { category: currentCategory };

  //   Axios.put("/api/categories/v1", values, config)
  //     .then((res) => {
  //       console.log(res.data);
  //       alertDispatch({
  //         type: "showAlert",
  //         payload: {
  //           message: "Successfully Updated A Category!",
  //           severity: "success",
  //         },
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alertDispatch({
  //         type: "showAlert",
  //         payload: {
  //           message: "Failed to Update A Category!",
  //           severity: "danger",
  //         },
  //       });
  //     });
  // }

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
                  <CategoriesComponent
                    jwt={jwt}
                    currentCategory={currentCategory}
                    getCategories={getCategories}
                    classes={classes}
                    handleCategoryChange={handleCategoryChange}
                    categoriesData={categoriesData}
                  />

                  <Box>
                    {subCategories && (
                      <SubCategoriesCompoent
                        categoriesData={categoriesData}
                        currentCategory={currentCategory}
                        currentSubCategory={currentSubCategory}
                        getCategories={getCategories}
                        jwt={jwt}
                        setCurrentSubCategory={setCurrentSubCategory}
                        subCategories={subCategories}
                        classes={classes}
                      />
                    )}
                  </Box>
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
