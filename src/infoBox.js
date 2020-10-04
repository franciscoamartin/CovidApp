import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

export default function InfoBox({ title, cases, total }) {
  return (
    <Card>
      <CardContent>
        <Typography color='textSecondary'>{title}</Typography>
        <h2>{cases}</h2>
        <Typography>{total} Total number cases</Typography>
      </CardContent>
    </Card>
  );
}
