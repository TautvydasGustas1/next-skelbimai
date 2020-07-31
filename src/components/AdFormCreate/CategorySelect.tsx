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
  ComputersSchema: any,
  handleSubmit: any
) => {
  switch (selectedCategoryState) {
    case "nesiojami":
      return (
        <AdCreateForm
          handleBack={handleBack}
          citiesState={citiesState}
          jwt={jwt}
          key={1}
          initialValues={laptop}
          ValidationSchema={ComputersSchema}
          handleSubmit={handleSubmit}
        />
      );
    case "stacionarus":
      return (
        <AdCreateForm
          handleBack={handleBack}
          citiesState={citiesState}
          jwt={jwt}
          key={2}
          initialValues={personal_computer}
          ValidationSchema={ComputersSchema}
          handleSubmit={handleSubmit}
        />
      );
    case "plansetiniai":
      return (
        <AdCreateForm
          handleBack={handleBack}
          citiesState={citiesState}
          jwt={jwt}
          key={3}
          initialValues={tablet}
          ValidationSchema={ComputersSchema}
          handleSubmit={handleSubmit}
        />
      );
    case "konsoles":
      return (
        <AdCreateForm
          handleBack={handleBack}
          citiesState={citiesState}
          jwt={jwt}
          key={4}
          initialValues={consol}
          ValidationSchema={ComputersSchema}
          handleSubmit={handleSubmit}
        />
      );
    case "ausines":
      return (
        <AdCreateForm
          handleBack={handleBack}
          citiesState={citiesState}
          jwt={jwt}
          key={5}
          initialValues={headphones}
          ValidationSchema={ComputersSchema}
          handleSubmit={handleSubmit}
        />
      );
    case "klaviaturos":
      return (
        <AdCreateForm
          handleBack={handleBack}
          citiesState={citiesState}
          jwt={jwt}
          key={6}
          initialValues={keyboard}
          ValidationSchema={ComputersSchema}
          handleSubmit={handleSubmit}
        />
      );
    case "monitoriai":
      return (
        <AdCreateForm
          handleBack={handleBack}
          citiesState={citiesState}
          jwt={jwt}
          key={7}
          initialValues={monitor}
          ValidationSchema={ComputersSchema}
          handleSubmit={handleSubmit}
        />
      );
    case "peles":
      return (
        <AdCreateForm
          handleBack={handleBack}
          citiesState={citiesState}
          jwt={jwt}
          key={8}
          initialValues={mouse}
          ValidationSchema={ComputersSchema}
          handleSubmit={handleSubmit}
        />
      );
    case "koloneles":
      return (
        <AdCreateForm
          handleBack={handleBack}
          citiesState={citiesState}
          jwt={jwt}
          key={9}
          initialValues={loudspeaker}
          ValidationSchema={ComputersSchema}
          handleSubmit={handleSubmit}
        />
      );
    case "mobilieji":
      return (
        <AdCreateForm
          handleBack={handleBack}
          citiesState={citiesState}
          jwt={jwt}
          key={10}
          initialValues={phones}
          ValidationSchema={ComputersSchema}
          handleSubmit={handleSubmit}
        />
      );
    case "televizoriai":
      return (
        <AdCreateForm
          handleBack={handleBack}
          citiesState={citiesState}
          jwt={jwt}
          key={11}
          initialValues={tv}
          ValidationSchema={ComputersSchema}
          handleSubmit={handleSubmit}
        />
      );
    default:
      return <div></div>;
  }
};
