import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Container, Box, Button } from "@material-ui/core";
import AdCreateForm from "../../components/AdFormCreate/AdCreateForm";
import StepperComp from "../../components/AdFormCreate/StepperComp";
import TreeCategorySelect from "../../components/AdFormCreate/TreeCategorySelect";

const create = () => {
  const handleCategorySelectionConfirm = () => () => {
    if (selectedCategoryState !== "") {
      console.log(selectedCategoryState);
    }
  };

  const handleCategorySelection = (category: string) => {
    setSelectedCategoryState(category);
  };

  const [selectedCategoryState, setSelectedCategoryState] = useState("");

  const selectedForm = () => {
    switch (selectedCategoryState) {
      case "nesiojami":
        return <AdCreateForm />;
      case "stacionarus":
        return <div>Stacionarus</div>;
      case "plansetiniai":
        return <div>Plansetiniai</div>;
      case "konsoles":
        return <div>Konsoles</div>;
      case "ausines":
        return <div>Konsoles</div>;
      case "klaviaturos":
        return <div>Konsoles</div>;
      case "monitoriai":
        return <div>Konsoles</div>;
      case "peles":
        return <div>Konsoles</div>;
      case "koloneles":
        return <div>Konsoles</div>;
      case "mobilieji":
        return <div>Konsoles</div>;
      case "televizoriai":
        return <div>Konsoles</div>;
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

export default create;
