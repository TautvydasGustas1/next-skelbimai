import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Card, CardContent, Grid } from "@material-ui/core";
import Cities from "./Cities";
import { ICities } from "../../types/CitiesInterface";
import { ICounties } from "../../types/CountiesInterface";
import Counties from "./Counties";
import { useAlert } from "../../context/AlertContext";

const MainLocationComp = ({ jwt }: { jwt: string }) => {
  //Counties State
  const [county, setCounty] = useState<string | undefined>();
  const [countiesData, setCountiesData] = useState<ICounties[]>();
  //Cities state
  const [city, setCity] = useState<string | undefined>();
  const [citiesData, setCitiesData] = useState<ICities[]>();
  const [newCity, setNewCity] = useState<string>("");
  const [alertState, alertDispatch] = useAlert();

  function handleGetCounties() {
    Axios.get("/api/counties/v1")
      .then((res) => {
        setCity(res.data[0].cities[0].city);
        setCitiesData(res.data[0].cities);
        setCounty(res.data[0].county);
        setCountiesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleGetCities() {
    if (countiesData) {
      const foundCounty = countiesData!.find((el) => el.county === county);

      setCity(foundCounty?.cities[0].city);
      setCitiesData(foundCounty?.cities);
    }
  }

  function handleAddCity() {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    const body = {
      city: newCity,
      county: county,
    };

    Axios.post("/api/cities/v1", body, config)
      .then((res) => {
        alertDispatch({
          type: "showAlert",
          payload: {
            message: "Successfully added a city!",
            severity: "success",
          },
        });
        console.log(res);
      })
      .catch((err) => {
        alertDispatch({
          type: "showAlert",
          payload: {
            message: "Failed to add a city!",
            severity: "error",
          },
        });
        console.log(err);
      });
  }

  function handleDeleteCity() {
    const foundCity = citiesData?.find((el) => el.city === city);

    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };

    Axios.delete(`/api/cities/v1/${foundCity!.id}`, config)
      .then((res) => {
        alertDispatch({
          type: "showAlert",
          payload: {
            message: "Successfully deleted a city!",
            severity: "success",
          },
        });
        console.log(res);
      })
      .catch((err) => {
        alertDispatch({
          type: "showAlert",
          payload: {
            message: "Failed to add a city!",
            severity: "error",
          },
        });
        console.log(err);
      });
  }

  useEffect(() => {
    handleGetCounties();
  }, []);

  useEffect(() => {
    handleGetCities();
  }, [county]);
  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {countiesData && (
                <Counties
                  county={county}
                  setCounty={setCounty}
                  countiesData={countiesData}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {citiesData && (
                <Cities
                  setCity={setCity}
                  city={city}
                  citiesData={citiesData}
                  newCity={newCity}
                  setNewCity={setNewCity}
                  handleAddCity={handleAddCity}
                  handleDeleteCity={handleDeleteCity}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default MainLocationComp;
