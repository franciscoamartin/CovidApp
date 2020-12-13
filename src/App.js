import React, { useEffect, useState } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import { getAllCountries, getCountryByCode } from './services/countryService';
import Table from './Table';
import InfoBox from './infoBox';
import Map from './Map';
import { sortData } from './util'
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [countrySelected, setCountrySelected] = useState({});
  const [countrySelectedCode, setCountrySelectedCode] = useState('BR');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getCountriesData = () => {
      getAllCountries().then((data) => {
        const countries = data.map((x) => {
          return { name: x.country, value: x.countryInfo.iso2 };
        });
        const sortedData = sortData(data);
        setTableData(sortedData)
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
    <div className='app'>
      <div className='app__left'>
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
          <div className='country__info'>
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
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries={tableData} />
          <h3>World new cases</h3>
          {/* table
             graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
