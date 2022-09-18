import express from 'express';
import APP_NAME from '@peddl/common';

const app = express();
const port = 8080;

app.get('/', (_test, res) => {
  res.send(APP_NAME);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
