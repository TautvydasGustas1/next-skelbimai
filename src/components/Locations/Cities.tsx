import React from "react";
import { ICities } from "../../types/CitiesInterface";
import { TextField, MenuItem, Grid } from "@material-ui/core";
import NewCity from "./NewCity";

interface CitiesProps {
  city?: string;
  setCity?: any;
  citiesData?: ICities[];
  newCity?: string;
  setNewCity: any;
  handleAddCity: any;
  handleDeleteCity: any;
}

const Cities = ({
  city,
  setCity,
  citiesData,
  newCity,
  setNewCity,
  handleAddCity,
  handleDeleteCity,
}: CitiesProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          name="city"
          select
          value={city}
          variant="outlined"
          fullWidth
          label="Current cities"
          onChange={(e) => setCity(e.target.value)}
        >
          {citiesData?.map((el) => (
            <MenuItem key={el.city} value={el.city}>
              {el.city}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid container item xs={12} spacing={2}>
        <NewCity
          handleDeleteCity={handleDeleteCity}
          handleAddCity={handleAddCity}
          newCity={newCity}
          setNewCity={setNewCity}
        />
      </Grid>
    </Grid>
  );
};

export default Cities;
