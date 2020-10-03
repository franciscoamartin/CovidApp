import React from 'react';
import './App.css';
import { MenuItem, FormControl, Select } from "@material-ui/core"

function App() {
  return (
    <div className="App">
      <h1>Covid App</h1>
      <FormControl className="app__dropdown">
        <Select
          variant="outlined" value="abc">
          <MenuItem value="wordwide">WordWide</MenuItem>
          <MenuItem value="wordwide">Option2</MenuItem>
          <MenuItem value="wordwide">3</MenuItem>
          <MenuItem value="wordwide">4</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default App;
