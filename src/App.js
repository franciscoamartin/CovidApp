import React, {useEffect, useState} from 'react';
import './App.css';
import { MenuItem, FormControl, Select } from "@material-ui/core"

function App() {

  useEffect(() => {
    const getCountriesData =  () => {
       fetch('https://disease.sh/v3/covid-19/countries').then(
         response => response.json()
       ).then(data => {
         debugger
         const countries = data.map(x => { 
            debugger
            console.log(x);
            return {name: x.country, value: x.countryInfo.iso2}; 
         });
         setCountries(countries);
       })
    };
    getCountriesData();
  },[])

  const [contries, setCountries] = useState([
    "Brasil","India", 'Usa'
  ]);
  return (
    <div className="app">
      <div className="app__header">
      <h1>Covid App</h1>
      <FormControl className="app__dropdown">
        <Select
          variant="outlined" value="abc">
        {contries.map(country => <MenuItem key={country.value} value={country.value}>{country.name}</MenuItem>)}
        </Select>
      </FormControl>
      </div>
    </div>
  );
}

export default App;
