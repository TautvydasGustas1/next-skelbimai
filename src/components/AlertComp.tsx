import React from "react";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { useAlert } from "../context/AlertContext";

const AlertComp = () => {
  const [state, dispatch] = useAlert();

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: "closeAlert" });
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={state.showAlert}
        onClose={handleClose}
        autoHideDuration={state.time}
      >
        <Alert variant={"filled"} severity={state.severity}>
          {state.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertComp;
