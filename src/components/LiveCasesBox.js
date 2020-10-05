import React from "react";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import "./LiveCasesBox.css";

const LiveCasesBox = ({ countries }) => {
  return (
    <Card className="live__casesBox">
      <CardContent>
        <h2>Live Cases by Country</h2>
        <List component="nav" style={{ marginTop: 10 }}>
          {/* {console.log(countries)} */}
          {countries.map((item) => {
            return (
              <ListItem className="live__casesList">
                <ListItemText primary={item.name} />
                <span className="live__casesListNumber">{item.totalCases}</span>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default LiveCasesBox;
