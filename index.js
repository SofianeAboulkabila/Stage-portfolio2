const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/projets', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'admin.php'));
});

// LIRE
app.get('/data.json', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(JSON.parse(data));
  });
});

// AJOUTER
app.post('/projets/add', (req, res) => {
  // Read the data from the file
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const projetData = JSON.parse(data);

    // Add the new project to the data
    const newProject = {
      id: Date.now(),
      name: req.body.name,
      link: req.body.link,
      img: req.body.img,
      skills: req.body.skills.split(',')
    };
    projetData.push(newProject);

    // Write the updated data back to the file
    fs.writeFile('./data.json', JSON.stringify(projetData), 'utf8', (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.status(200).send('OK');
    });
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
