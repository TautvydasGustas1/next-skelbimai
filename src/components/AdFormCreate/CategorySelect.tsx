import React from "react";
import AdCreateForm from "./AdCreateForm";
import {
  personal_computer,
  tablet,
  headphones,
  keyboard,
  monitor,
  mouse,
  loudspeaker,
  phones,
  tv,
  laptop,
} from "../../Utils/FormFields";
import { PhoneSchema, ComputersSchema } from "./Validations";

export const selectedForm = (
  handleBack: () => void,
  selectedCategoryState: any,
  citiesState: any,
  jwt: any,
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
          url={"/api/computers/v1"}
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
          url={"/api/computers/v1"}
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
          url={"/api/computers/v1"}
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
          url={"/api/computers/v1"}
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
          url={"/api/computers/v1"}
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
          url={"/api/computers/v1"}
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
          url={"/api/computers/v1"}
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
          url={"/api/computers/v1"}
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
          ValidationSchema={PhoneSchema}
          handleSubmit={handleSubmit}
          url={"/api/phones/v1"}
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
          url={"/api/computers/v1"}
        />
      );
    default:
      return <div></div>;
  }
};
