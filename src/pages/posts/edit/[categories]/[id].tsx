import React from "react";
import Layout from "../../../../components/Layout";
import { Card, CardContent, Container, Box } from "@material-ui/core";
import AdCreateForm from "../../../../components/AdFormCreate/AdCreateForm";
import TokenService from "../../../../Helpers/TokenHelper";
import { NextPageContext } from "next";
import Axios from "axios";
import NavService from "../../../../Helpers/NavigationHelper";
import { IComputers } from "../../../../types/ComputersInterface";
import { ICities } from "../../../../types/CitiesInterface";
import {
  ComputersSchema,
  ExternalSchema,
  PhoneSchema,
  ConsolSchema,
  MonitorSchema,
} from "../../../../components/AdFormCreate/Validations";
import { useAlert } from "../../../../context/AlertContext";
import {
  computersURL,
  phonesURL,
  externalURL,
  consolURL,
  monitorsURL,
} from "../../../../Utils/GlobalVariales";
import { useRouter } from "next/router";

export interface AdEditProps {
  jwt?: string;
  post?: IComputers;
  cities?: ICities;
  category?: string;
}

const AdEdit = ({ jwt, post, cities, category }: AdEditProps) => {
  const router = useRouter();
  const [alertState, alertDispatch] = useAlert();
  const handleEditSubmit = async (
    values: any,
    resolve: () => void,
    url: string
  ) => {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    await Axios.put(url, values, config)
      .then((res) => {
        alertDispatch({
          type: "showAlert",
          payload: {
            message: "Successfully updated an ad",
            severity: "success",
          },
        });
        // Redirect to an ad
        router.push(`/posts/${category}/${post!.id}`);
      })
      .catch((errors) => {
        console.log(errors.message);
      })
      .finally(() => {
        resolve();
      });
  };

  function renderEditForm() {
    switch (category) {
      case computersURL: {
        return (
          <AdCreateForm
            jwt={jwt}
            citiesState={cities}
            initialValues={post}
            ValidationSchema={ComputersSchema}
            title={"Edit an ad"}
            handleSubmit={handleEditSubmit}
            url={`/api/${computersURL}/v1`}
          />
        );
      }
      case phonesURL: {
        return (
          <AdCreateForm
            jwt={jwt}
            citiesState={cities}
            initialValues={post}
            ValidationSchema={PhoneSchema}
            title={"Edit an ad"}
            handleSubmit={handleEditSubmit}
            url={`/api/${phonesURL}/v1`}
          />
        );
      }
      case externalURL: {
        return (
          <AdCreateForm
            jwt={jwt}
            citiesState={cities}
            initialValues={post}
            ValidationSchema={ExternalSchema}
            title={"Edit an ad"}
            handleSubmit={handleEditSubmit}
            url={`/api/${externalURL}/v1`}
          />
        );
      }
      case consolURL: {
        return (
          <AdCreateForm
            jwt={jwt}
            citiesState={cities}
            initialValues={post}
            ValidationSchema={ConsolSchema}
            title={"Edit an ad"}
            handleSubmit={handleEditSubmit}
            url={`/api/${consolURL}/v1`}
          />
        );
      }
      case monitorsURL: {
        return (
          <AdCreateForm
            jwt={jwt}
            citiesState={cities}
            initialValues={post}
            ValidationSchema={MonitorSchema}
            title={"Edit an ad"}
            handleSubmit={handleEditSubmit}
            url={`/api/${monitorsURL}/v1`}
          />
        );
      }
    }
  }

  return (
    <Layout>
      <Container>
        <Box mt={3}>
          <Card>
            <CardContent>{renderEditForm()}</CardContent>
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
  const category = ctx.query.categories;
  const nav = new NavService();
  let post = "";
  let cities = "";

  try {
    const res = await Axios.get(`/api/${category}/v1/${id}`);

    const citiesRes = await Axios.get("/api/cities/v1/");
    cities = await citiesRes.data;
    post = await res.data;
  } catch (err) {
    nav.redirectUser("/404", ctx);
  }
  return {
    jwt: token,
    post: post,
    cities: cities,
    category,
  };
};

export default AdEdit;
