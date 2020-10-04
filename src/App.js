import React, { useEffect, useState } from "react";
import "./App.css";
import { MenuItem, FormControl, Select, Container } from "@material-ui/core";
import { colors } from "./utils/Colors";
import InfoBox from "./components/InfoBox";
import { getAllCountries, getCountryByCode } from "./services/countryService";
import LiveCasesBox from "./components/LiveCasesBox";

function App() {
  const [countries, setCountries] = useState([]);
  const [countrySelected, setCountrySelected] = useState({});
  const [countrySelectedCode, setCountrySelectedCode] = useState("BR");

  useEffect(() => {
    const getCountriesData = () => {
      getAllCountries().then((data) => {
        console.log(data);
        const countries = data.map((x) => {
          return {
            name: x.country,
            value: x.countryInfo.iso2,
            totalCases: x.cases,
          };
        });
        setCountries(countries);
      });
    };
    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountrySelectedCode(countryCode);
    getCountryByCode(countryCode).then((data) => {
      setCountrySelected(data);
    });
  };

  return (
    <Container>
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <h1 className="app__headerText" style={{ color: colors.red }}>
              COVID-19 Tracker
            </h1>
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                value={countrySelectedCode}
                onChange={onCountryChange}
              >
                {countries.map((country) => (
                  <MenuItem key={country.value} value={country.value}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="app__main">
            <h3>{countrySelected.country}</h3>
            <div className="country__info">
              <InfoBox
                title="Cases today"
                cases={countrySelected.todayCases}
                total={countrySelected.cases}
              />
              <InfoBox
                title="Recovered today"
                cases={countrySelected.todayRecovered}
                total={countrySelected.recovered}
              />
              <InfoBox
                title="Deaths today"
                cases={countrySelected.todayDeaths}
                total={countrySelected.deaths}
              />
            </div>
          </div>
        </div>
        <div className="app__right">
          <LiveCasesBox
            countries={countries.filter((_, index) => index <= 9)}
          />
        </div>
      </div>
    </Container>
  );
}

export default App;
