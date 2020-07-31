import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { Card, CardContent, Container, Box } from "@material-ui/core";
import AdCreateForm from "../../../components/AdFormCreate/AdCreateForm";
import TokenService from "../../../Helpers/TokenHelper";
import { NextPageContext } from "next";
import Axios from "axios";
import NavService from "../../../Helpers/NavigationHelper";
import { IComputers } from "../../../types/ComputersInterface";
import { ICities } from "../../../types/CitiesInterface";
import { ComputersSchema } from "../../../components/AdFormCreate/Validations";
import { useAlert } from "../../../context/AlertContext";
import { NextPage } from "next";

export interface AdEditProps {
  jwt?: string;
  post?: IComputers;
  cities?: ICities;
}

const AdEdit = ({ jwt, post, cities }: AdEditProps) => {
  const [alertState, alertDispatch] = useAlert();
  const handleEditSubmit = async (values: any, resolve: () => void) => {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    await Axios.put("/api/computers/v1", values, config)
      .then((res) => {
        alertDispatch({
          type: "showAlert",
          payload: {
            message: "Successfully updated an ad",
            severity: "success",
          },
        });
        // Redirect to an ad
        //Router.push("/profile");
      })
      .catch((errors) => {
        console.log(errors.message);
      })
      .finally(() => {
        resolve();
      });
  };

  return (
    <Layout>
      <Container>
        {console.log(post)}
        <Box mt={3}>
          <Card>
            <CardContent>
              <AdCreateForm
                jwt={jwt}
                citiesState={cities}
                initialValues={post}
                ValidationSchema={ComputersSchema}
                title={"Edit an ad"}
                handleSubmit={handleEditSubmit}
              />
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Layout>
  );
};

AdEdit.getInitialProps = async (ctx: NextPageContext) => {
  const tokenService = new TokenService();
  const token = await tokenService.authenticateTokenSsr(ctx);

  const id = await ctx.query.id;
  const nav = new NavService();
  console.log(id);
  let post = "";
  let cities = "";

  const res = await Axios.get(`/api/computers/v1/${id}`);
  if (res.status !== 200) {
    nav.redirectUser("/404", ctx);
  }

  const citiesRes = await Axios.get("/api/cities/v1/");
  cities = await citiesRes.data;
  post = await res.data;

  return {
    jwt: token,
    post: post,
    cities: cities,
  };
};

export default AdEdit;
