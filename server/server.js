const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const cors = require('cors'); 
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); 

app.post('/calculate-difference', (req, res) => {
  const { timestamp1, timestamp2 } = req.body;

  if (!isValidTimestampFormat(timestamp1) || !isValidTimestampFormat(timestamp2)) {
    return res.status(400).json({ error: 'Invalid timestamp format. Please use DD:MM:YYYY HH:mm:ss' });
  }

  const momentTimestamp1 = moment(timestamp1, 'DD:MM:YYYY HH:mm:ss');
  const momentTimestamp2 = moment(timestamp2, 'DD:MM:YYYY HH:mm:ss');

  const differenceInSeconds = momentTimestamp2.diff(momentTimestamp1, 'seconds');

  res.json({ differenceInSeconds });
});

function isValidTimestampFormat(timestamp) {
  return /^(\d{2}:\d{2}:\d{4}) (\d{2}:\d{2}:\d{2})$/.test(timestamp);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
