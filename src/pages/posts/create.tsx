import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Container, Box, Button } from "@material-ui/core";
import AdCreateForm from "../../components/AdFormCreate/AdCreateForm";
import StepperComp from "../../components/AdFormCreate/StepperComp";
import TreeCategorySelect from "../../components/AdFormCreate/TreeCategorySelect";
import {
  laptop,
  personal_computer,
  tablet,
  console,
  headphones,
  keyboard,
  loudspeaker,
  phones,
  tv,
  mouse,
  monitor,
} from "../../Utils/FormFields";
import { NextPageContext } from "next";
import TokenService from "../../Helpers/TokenHelper";

const create = ({ jwt }: String) => {
  const handleCategorySelectionConfirm = () => () => {
    if (selectedCategoryState !== "") {
    }
  };

  const handleCategorySelection = (category: string) => {
    setSelectedCategoryState(category);
  };

  const [selectedCategoryState, setSelectedCategoryState] = useState("");

  const selectedForm = () => {
    switch (selectedCategoryState) {
      case "nesiojami":
        return <AdCreateForm jwt={jwt} key={1} initialValues={laptop} />;
      case "stacionarus":
        return (
          <AdCreateForm jwt={jwt} key={2} initialValues={personal_computer} />
        );
      case "plansetiniai":
        return <AdCreateForm jwt={jwt} key={3} initialValues={tablet} />;
      case "konsoles":
        return <AdCreateForm jwt={jwt} key={4} initialValues={console} />;
      case "ausines":
        return <AdCreateForm jwt={jwt} key={5} initialValues={headphones} />;
      case "klaviaturos":
        return <AdCreateForm jwt={jwt} key={6} initialValues={keyboard} />;
      case "monitoriai":
        return <AdCreateForm jwt={jwt} key={7} initialValues={monitor} />;
      case "peles":
        return <AdCreateForm jwt={jwt} key={8} initialValues={mouse} />;
      case "koloneles":
        return <AdCreateForm jwt={jwt} key={9} initialValues={loudspeaker} />;
      case "mobilieji":
        return <AdCreateForm jwt={jwt} key={10} initialValues={phones} />;
      case "televizoriai":
        return <AdCreateForm jwt={jwt} key={11} initialValues={tv} />;
      default:
        return <div></div>;
    }
  };

  return (
    <Layout>
      <Container>
        <Box mt={3}>
          <TreeCategorySelect
            setSelectedCategoryState={setSelectedCategoryState}
          />
          <Button
            disabled={selectedCategoryState === ""}
            onClick={handleCategorySelectionConfirm()}
          >
            Confirm caregory
          </Button>
          {selectedForm()}
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
