import React from "react";
import AdCreateForm from "./AdCreateForm";
import {
  personal_computer,
  tablet,
  consol,
  headphones,
  keyboard,
  monitor,
  mouse,
  loudspeaker,
  phones,
  tv,
  laptop,
} from "../../Utils/FormFields";

export const selectedForm = (
  handleBack: () => void,
  handleNext: () => void,
  selectedCategoryState: any,
  setAdvID: any,
  citiesState: any,
  jwt: any,
  ComputersSchema: any
) => {
  switch (selectedCategoryState) {
    case "nesiojami":
      return (
        <AdCreateForm
          setAdvID={setAdvID}
          handleBack={handleBack}
          handleNext={handleNext}
          citiesState={citiesState}
          jwt={jwt}
          key={1}
          initialValues={laptop}
          ValidationSchema={ComputersSchema}
        />
      );
    case "stacionarus":
      return (
        <AdCreateForm
          setAdvID={setAdvID}
          handleBack={handleBack}
          handleNext={handleNext}
          citiesState={citiesState}
          jwt={jwt}
          key={2}
          initialValues={personal_computer}
          ValidationSchema={ComputersSchema}
        />
      );
    case "plansetiniai":
      return (
        <AdCreateForm
          setAdvID={setAdvID}
          handleBack={handleBack}
          handleNext={handleNext}
          citiesState={citiesState}
          jwt={jwt}
          key={3}
          initialValues={tablet}
          ValidationSchema={ComputersSchema}
        />
      );
    case "konsoles":
      return (
        <AdCreateForm
          setAdvID={setAdvID}
          handleBack={handleBack}
          handleNext={handleNext}
          citiesState={citiesState}
          jwt={jwt}
          key={4}
          initialValues={consol}
          ValidationSchema={ComputersSchema}
        />
      );
    case "ausines":
      return (
        <AdCreateForm
          setAdvID={setAdvID}
          handleBack={handleBack}
          handleNext={handleNext}
          citiesState={citiesState}
          jwt={jwt}
          key={5}
          initialValues={headphones}
          ValidationSchema={ComputersSchema}
        />
      );
    case "klaviaturos":
      return (
        <AdCreateForm
          setAdvID={setAdvID}
          handleBack={handleBack}
          handleNext={handleNext}
          citiesState={citiesState}
          jwt={jwt}
          key={6}
          initialValues={keyboard}
          ValidationSchema={ComputersSchema}
        />
      );
    case "monitoriai":
      return (
        <AdCreateForm
          setAdvID={setAdvID}
          handleBack={handleBack}
          handleNext={handleNext}
          citiesState={citiesState}
          jwt={jwt}
          key={7}
          initialValues={monitor}
          ValidationSchema={ComputersSchema}
        />
      );
    case "peles":
      return (
        <AdCreateForm
          setAdvID={setAdvID}
          handleBack={handleBack}
          handleNext={handleNext}
          citiesState={citiesState}
          jwt={jwt}
          key={8}
          initialValues={mouse}
          ValidationSchema={ComputersSchema}
        />
      );
    case "koloneles":
      return (
        <AdCreateForm
          setAdvID={setAdvID}
          handleBack={handleBack}
          handleNext={handleNext}
          citiesState={citiesState}
          jwt={jwt}
          key={9}
          initialValues={loudspeaker}
          ValidationSchema={ComputersSchema}
        />
      );
    case "mobilieji":
      return (
        <AdCreateForm
          setAdvID={setAdvID}
          handleBack={handleBack}
          handleNext={handleNext}
          citiesState={citiesState}
          jwt={jwt}
          key={10}
          initialValues={phones}
          ValidationSchema={ComputersSchema}
        />
      );
    case "televizoriai":
      return (
        <AdCreateForm
          setAdvID={setAdvID}
          handleBack={handleBack}
          handleNext={handleNext}
          citiesState={citiesState}
          jwt={jwt}
          key={11}
          initialValues={tv}
          ValidationSchema={ComputersSchema}
        />
      );
    default:
      return <div></div>;
  }
};
