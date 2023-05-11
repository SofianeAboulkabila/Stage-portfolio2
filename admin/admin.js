// LIRE ET AFFICHER DANS TABLEAU

fetch('/projets')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#projects-table');

        data.forEach(project => {
            const row = document.createElement('tr');
            row.innerHTML = `
          <td>${project.name}</td>
          <td>${project.link}</td>
          <td>${project.img}</td>
          <td>${project.skills}</td>
          <td>
            <button onclick="editProject('${project.name}')">Modifier</button>
            <button onclick="deleteProject('${project.name}')">Supprimer</button>
          </td>
        `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error(error));

//   AJOUT A DATA.JSON

const form = document.getElementById('add-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const newProjet = {};

    for (let [key, value] of formData.entries()) {
        newProjet[key] = value;
    }

    try {
        const response = await fetch('/projets/:name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProjet)
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout du projet');
        }

        alert('Projet ajouté avec succès');
        window.location.reload();
    } catch (error) {
        console.error(error);
        alert('Une erreur est survenue lors de l\'ajout du projet');
    }
});



// SUPPRIMER DE DATA.JSON

function deleteProject(name) {
    if (confirm(`Voulez-vous supprimer le projet ${name} ?`)) {
        fetch(`/projets/${name}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la suppression du projet');
                }
                alert('Projet supprimé avec succès');
                window.location.reload(); // recharger la page après la suppression
            })
            .catch(error => {
                console.error(error);
                alert('Une erreur est survenue lors de la suppression du projet');
            });
    }
}


const editForm = document.createElement('form');
const nameLabel = document.createElement('label');
const nameInput = document.createElement('input');
const linkLabel = document.createElement('label');
const linkInput = document.createElement('input');
const imgLabel = document.createElement('label');
const imgInput = document.createElement('input');
const skillsLabel = document.createElement('label');
const skillsInput = document.createElement('input');
const submitButton = document.createElement('button');

function editProject(name) {
    // Envoyer une requête GET pour récupérer les informations du projet
    fetch(`/projets/${name}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des informations du projet : ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // Remplir les champs avec les informations du projet
        nameInput.value = data.name;
        linkInput.value = data.link;
        imgInput.value = data.img;
        skillsInput.value = data.skills;
  
        // Personnaliser les éléments de l'interface utilisateur
        editForm.setAttribute('id', 'edit-form');
        nameLabel.textContent = 'Nom du projet : ';
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('name', 'name');
        linkLabel.textContent = 'Lien : '; // Ajouter une balise label pour le champ link
        linkInput.setAttribute('type', 'text');
        linkInput.setAttribute('name', 'link');
        imgLabel.textContent = 'Image : '; // Ajouter une balise label pour le champ img
        imgInput.setAttribute('type', 'text');
        imgInput.setAttribute('name', 'img');
        skillsLabel.textContent = 'Compétences : '; // Ajouter une balise label pour le champ skills
        skillsInput.setAttribute('type', 'text');
        skillsInput.setAttribute('name', 'skills');
        submitButton.textContent = 'Mettre à jour le projet';
  
        // Ajouter les éléments au formulaire
        nameLabel.appendChild(nameInput);
        linkLabel.appendChild(linkInput);
        imgLabel.appendChild(imgInput);
        skillsLabel.appendChild(skillsInput);
        editForm.appendChild(nameLabel);
        editForm.appendChild(linkLabel);
        editForm.appendChild(imgLabel);
        editForm.appendChild(skillsLabel);
        editForm.appendChild(submitButton);
  
        // Ajouter un gestionnaire d'événement pour soumettre le formulaire
        editForm.addEventListener('submit', event => {
          event.preventDefault(); // Empêcher le comportement par défaut du navigateur
          const updatedProject = {
            name: nameInput.value,
            link: linkInput.value,
            img: imgInput.value,
            skills: skillsInput.value,
          };
          // Envoyer une requête PUT pour mettre à jour le projet
          fetch(`/projets/modify/${name}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProject),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du projet : ' + response.statusText);
              }
              return response.json();
            })
            .then(data => {
              console.log(data);
              alert('Le projet a été mis à jour avec succès !');
            })
            .catch(error => {
              console.error(error);
              alert('Une erreur est survenue lors de la mise à jour du projet.');
            });
        });
  
        // Ajouter le formulaire à la page HTML
        const editSection = document.getElementById('edit-section');
        if (editSection) {
          editSection.innerHTML = '';
          editSection.appendChild(editForm);
        }
      })
    .catch(error => {
      console.error(error);
      // Afficher un message d'erreur à l'utilisateur
      alert(error.message);
    });
}
