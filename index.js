const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();


app.use(express.json());
app.use(cors());
const qs = require('qs'); // For URL encoding
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/submit-to-google-form', async (req, res) => {
  try {
    const formData = req.body;

    const googleFormResponse = await axios.post(
      'https://docs.google.com/forms/u/0/d/e/1FAIpQLSduH0brWcd9nAcOz942P_Z7hjYmVerP2XSMHKlHrYJXTw1jhA/formResponse',
      formData,// Convert to form-urlencoded
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    res.status(200).send('Form submitted successfully');
  } catch (error) {
    console.error('Error submitting to Google Forms:', error);
    res.status(500).send('Error submitting form');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
