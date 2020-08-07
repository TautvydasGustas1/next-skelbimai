import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Container, Box } from "@material-ui/core";
import AdCreateForm from "../../components/AdFormCreate/AdCreateForm";
import StepperComp from "../../components/AdFormCreate/StepperComp";
import { NextPageContext } from "next";
import TokenService from "../../Helpers/TokenHelper";
import axios from "axios";
import { ComputersSchema } from "../../components/AdFormCreate/Validations";

export interface createProps {
  jwt: string;
}

const create = ({ jwt }: createProps) => {
  const handleCategorySelection = (category: string) => {
    setSelectedCategoryState(category);
  };

  const [selectedCategoryState, setSelectedCategoryState] = useState("");
  const [citiesState, setCitiesState] = useState();
  const [advID, setAdvID] = useState("");

  const loadCities = () => {
    axios
      .get("/api/cities/v1")
      .then((res) => {
        setCitiesState(res.data);
      })
      .catch((errors) => {
        console.log(errors.message);
      });
  };

  useEffect(() => {
    loadCities();
  }, []);

  return (
    <Layout>
      <Container>
        <Box mt={3}>
          <StepperComp
            advID={advID}
            citiesState={citiesState}
            jwt={jwt}
            setSelectedCategoryState={setSelectedCategoryState}
            selectedCategoryState={selectedCategoryState}
            setAdvID={setAdvID}
          />
        </Box>
      </Container>
    </Layout>
  );
};

create.getInitialProps = async (ctx: NextPageContext) => {
  const tokenService = new TokenService();
  const token = await tokenService.authenticateTokenSsr(ctx);

  return {
    jwt: token,
  };
};

export default create;
