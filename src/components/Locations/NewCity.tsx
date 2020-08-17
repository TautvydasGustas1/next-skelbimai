import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";

const buttonStyle = { height: "100%" };
const buttonStyleDelete = { height: "100%", color: "red" };

const NewCity = ({
  newCity,
  setNewCity,
  handleAddCity,
  handleDeleteCity,
}: any) => {
  return (
    <>
      <Grid item xs={8}>
        <TextField
          label="New city"
          variant="outlined"
          fullWidth
          name="new_city"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          onClick={() => handleAddCity()}
          style={buttonStyle}
          fullWidth
          variant="outlined"
        >
          Add
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          onClick={() => handleDeleteCity()}
          style={buttonStyleDelete}
          fullWidth
          variant="outlined"
        >
          Delete
        </Button>
      </Grid>
    </>
  );
};

export default NewCity;
