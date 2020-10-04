import React, { useEffect, useState } from 'react';
import './App.css';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import InfoBox from './infoBox';

function App() {
  const [countries, setCountries] = useState([]);
  const [countrySelected, setCountrySelected] = useState({});
  const [countrySelectedCode, setCountrySelectedCode] = useState('BR');

  useEffect(() => {
    const getCountriesData = () => {
      fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((x) => {
            return { name: x.country, value: x.countryInfo.iso2 };
          });
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountrySelectedCode(countryCode);
    fetch('https://disease.sh/v3/covid-19/countries/' + countryCode)
      .then((response) => response.json())
      .then((data) => {
        setCountrySelected(data);
      });
  };

  return (
    <div className='app'>
      <div className='app__header'>
        <h1>Covid App</h1>
        <FormControl className='app__dropdown'>
          <Select
            variant='outlined'
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
      <div className='app__main'>
        <h3>{countrySelected.country}</h3>
        <InfoBox
          title='Deaths today'
          cases={countrySelected.todayDeaths}
          total={countrySelected.deaths}
        />
        <InfoBox
          title='Cases today'
          cases={countrySelected.todayCases}
          total={countrySelected.cases}
        />
        <InfoBox
          title='Recovered today'
          cases={countrySelected.todayRecovered}
          total={countrySelected.recovered}
        />
      </div>
    </div>
  );
}

export default App;
