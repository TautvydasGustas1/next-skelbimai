import React from "react";
import AdCreateForm from "./AdCreateForm";
import {
  personal_computer,
  tablet,
  headphones,
  keyboard,
  monitor,
  mouse,
  phones,
  tv,
  laptop,
  xbox,
  playstation,
} from "../../Utils/FormFields";
import {
  PhoneSchema,
  ComputersSchema,
  ExternalSchema,
  MonitorSchema,
  ConsolSchema,
} from "./Validations";
import {
  externalURL,
  computersURL,
  phonesURL,
  monitorsURL,
  consolURL,
} from "../../Utils/GlobalVariales";

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
          url={`/api/${computersURL}/v1`}
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
          url={`/api/${computersURL}/v1`}
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
          url={`/api/${computersURL}/v1`}
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
          ValidationSchema={ExternalSchema}
          handleSubmit={handleSubmit}
          url={`/api/${externalURL}/v1`}
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
          ValidationSchema={ExternalSchema}
          handleSubmit={handleSubmit}
          url={`/api/${externalURL}/v1`}
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
          ValidationSchema={ExternalSchema}
          handleSubmit={handleSubmit}
          url={`/api/${externalURL}/v1`}
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
          url={`/api/${phonesURL}/v1`}
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
          ValidationSchema={MonitorSchema}
          handleSubmit={handleSubmit}
          url={`/api/${monitorsURL}/v1`}
        />
      );
    case "monitoriai":
      return (
        <AdCreateForm
          handleBack={handleBack}
          citiesState={citiesState}
          jwt={jwt}
          key={11}
          initialValues={monitor}
          ValidationSchema={MonitorSchema}
          handleSubmit={handleSubmit}
          url={`/api/${monitorsURL}/v1`}
        />
      );
    case "xbox":
      return (
        <AdCreateForm
          handleBack={handleBack}
          citiesState={citiesState}
          jwt={jwt}
          key={11}
          initialValues={xbox}
          ValidationSchema={ConsolSchema}
          handleSubmit={handleSubmit}
          url={`/api/${consolURL}/v1`}
        />
      );
    case "playstation":
      return (
        <AdCreateForm
          handleBack={handleBack}
          citiesState={citiesState}
          jwt={jwt}
          key={11}
          initialValues={playstation}
          ValidationSchema={ConsolSchema}
          handleSubmit={handleSubmit}
          url={`/api/${consolURL}/v1`}
        />
      );
    default:
      return <div></div>;
  }
};
