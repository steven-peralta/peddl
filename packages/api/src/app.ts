import express from 'express';
import APP_NAME from '@peddl/common';

const app = express();
const port = 3000;

app.get('/', (_test, res) => {
  res.send(APP_NAME);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
