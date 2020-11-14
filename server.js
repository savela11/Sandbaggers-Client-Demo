// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
app = express();

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')))

  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
  })
}
const port = process.env.PORT || 80;
app.listen(port);
