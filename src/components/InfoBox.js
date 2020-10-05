import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

export default function InfoBox({ title, cases, total }) {
  return (
    <Card className="info__box">
      <CardContent className="info__boxContent">
        <Typography color="textSecondary">{title}</Typography>
        <Typography variant="h2" className="info__boxNumberCase">
          {cases ? cases : 0}
        </Typography>
        <Typography>{total} Total number cases</Typography>
      </CardContent>
    </Card>
  );
}
