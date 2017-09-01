const express = require('express');
const path = require('path');

const port = process.env.PORT || 8080;

const app = express();

// console.log(path.resolve(__dirname,'build'));
app.use(express.static(path.resolve(__dirname,'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log('serving files on port '+ port);
});
