import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { ICounties } from "../../types/CountiesInterface";

interface CountiesProps {
  county?: string;
  setCounty: any;
  countiesData: ICounties[] | undefined;
}

const Counties = ({ county, setCounty, countiesData }: CountiesProps) => {
  return (
    <div>
      <TextField
        name="counties"
        value={county}
        select
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setCounty(e.target.value);
        }}
      >
        {countiesData!.map((el) => (
          <MenuItem key={el.id} value={el.county}>
            {el.county}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default Counties;
