const formAdd = document.getElementById('add-form');
formAdd.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('add-name').value;
    const link = document.getElementById('add-link').value;
    const img = document.getElementById('add-img').value;
    const skills = document.getElementById('add-skills').value.split(',');

    const newProject = {
        id: Date.now(),
        name,
        link,
        img,
        skills
    };

    fetch("/cartes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
    })
        .then((response) => {
            if (response.ok) {
                console.log("Carte ajoutée avec succès");
                formAdd.reset();
                location.reload();
            } else {
                console.error("Erreur lors de l'ajout de la carte");
            }
        })
        .catch((error) => console.error(error));
});

function updateTable() {
    fetch('/data.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('projects-table');
            tableBody.innerHTML = ''; // clear table body
            data.forEach(project => {
                const newRow = tableBody.insertRow(-1);
                newRow.innerHTML = `
                    <td>${project.name}</td>
                    <td><a href="${project.link}" target="_blank">${project.link}</a></td>
                    <td><img src="${project.img}" alt="${project.name}"></td>
                    <td>${project.skills.join(', ')}</td>
                    <td>
                        <button class="edit-button">Modifier</button>
                        <button class="delete-button">Supprimer</button>
                    </td>
                `;
            });
        })
        .catch(error => console.error(error));
}

// Mettre à jour le tableau lors du chargement de la page
updateTable();
