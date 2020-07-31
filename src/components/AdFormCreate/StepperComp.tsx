import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TreeCategorySelect from "./TreeCategorySelect";
import ImagesDropzone from "../ImagesDropzone";
import { useAlert } from "../../context/AlertContext";
import { selectedForm } from "./CategorySelect";
import { ComputersSchema } from "./Validations";
import Axios from "axios";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

function getSteps() {
  return ["Choose a category", "Create an ad", "Upload images"];
}

export default function StepperComp({
  setSelectedCategoryState,
  jwt,
  selectedCategoryState,
  citiesState,
  advID,
  setAdvID,
}: any) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const steps = getSteps();
  const [alertState, alertDispatch] = useAlert();

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <TreeCategorySelect
            setSelectedCategoryState={setSelectedCategoryState}
          />
        );
      case 1:
        return selectedForm(
          handleBack,
          handleNext,
          selectedCategoryState,
          setAdvID,
          citiesState,
          jwt,
          ComputersSchema,
          handleSubmit
        );
      case 2:
        return (
          <ImagesDropzone handleNext={handleNext} adv_id={advID} jwt={jwt} />
        );
      default:
        return "Unknown step";
    }
  }

  const isStepOptional = (step: number) => {
    return step === 2;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = async (values: any, resolve: () => void) => {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };
    await Axios.post("/api/computers/v1", values, config)
      .then((res) => {
        alertDispatch({
          type: "showAlert",
          payload: {
            message: "Successfully created an ad",
            severity: "success",
          },
        });
        setAdvID(res.data.id);
        handleNext();
      })
      .catch((errors) => {
        console.log(errors.message);
      })
      .finally(() => {
        resolve();
      });
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>
              {getStepContent(activeStep)}
            </div>
            <div>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}
              {activeStep === 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  disabled={
                    (activeStep === 0 && selectedCategoryState === "") ||
                    !citiesState
                  }
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
