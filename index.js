const express = require('express');
const fs = require('fs');

const app = express();
const port = 4008;

app.use(express.json());

// Serve static files from the "admin" folder
app.use('/admin', express.static('admin'));

// Route pour récupérer toutes les données
app.get('/projets', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
    } else {
      const projets = JSON.parse(data);
      res.json(projets);
    }
  });
});

//  Route pour récupérer toutes 

app.get('/projets/:name', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des projets');
      return;
    }

    const projets = JSON.parse(data);
    const projetName = req.params.name;
    const projet = projets.find(projet => projet.name.toLowerCase() === projetName.toLowerCase());

    if (!projet) {
      res.status(404).send('Projet non trouvé');
    } else {
      res.send(projet);
    }
  });
});






//  Route pour ajouter un nouveau projet 

app.post('/projets/:name', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des projets');
    } else {
      const projets = JSON.parse(data);
      const newProjet = req.body;

      // Vérifier si un projet avec le même nom existe déjà
      const existingProjet = projets.find(projet => projet.name === newProjet.name);
      if (existingProjet) {
        res.status(400).send('Un projet avec le même nom existe déjà');
      } else {
        projets.push(newProjet);
        fs.writeFile('data.json', JSON.stringify(projets), err => {
          if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de l\'ajout du projet');
          } else {
            res.send('Projet ajouté avec succès');
          }
        });
      }
    }
  });
});


// Route pour modifier un projet existant 

// Route pour modifier un projet existant 
app.put('/projets/modify/:name', (req, res) => {
  const projetName = req.params.name;
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des projets');
    } else {
      const projets = JSON.parse(data);
      const projetToUpdate = projets.find(projet => projet.name === projetName);
      if (!projetToUpdate) {
        res.status(404).send('Projet non trouvé');
      } else {
        const updatedProjet = req.body;
        Object.assign(projetToUpdate, updatedProjet);
        fs.writeFile('data.json', JSON.stringify(projets), err => {
          if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la mise à jour du projet');
          } else {
            console.log('Projet mis à jour avec succès:', JSON.stringify(updatedProjet));
            res.send('Projet mis à jour avec succès');
          }
        });
      }
    }
  });
});


// Route pour supprimer un projet existant :
app.delete('/projets/:name', (req, res) => {
  const projectName = req.params.name;
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des projets');
    } else {
      const projets = JSON.parse(data);
      const projetIndex = projets.findIndex(projet => projet.name === projectName);
      if (projetIndex === -1) {
        res.status(404).send('Projet non trouvé');
      } else {
        projets.splice(projetIndex, 1);
        fs.writeFile('data.json', JSON.stringify(projets), err => {
          if (err) {
            console.error(err);
            res.status(500).send('Erreur lors de la suppression du projet');
          } else {
            res.send('Projet supprimé avec succès');
          }
        });
      }
    }
  });
});


// Lire le contenu de data.json
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) throw err;

  // Convertir le contenu JSON en un objet JavaScript
  const projects = JSON.parse(data);

  // Utiliser les données récupérées
  console.log(projects);
});


// Endpoint par défaut pour toutes les autres requêtes
app.use((req, res) => {
  res.status(404).send('Page introuvable');
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
