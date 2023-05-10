<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- STYLE -->
    <link rel="stylesheet" href="/admin/admin.css">
    <title></title>
</head>

<body style="background: gray;">

    <h1>Gestion de projets</h1>

    <!-- Formulaire d'ajout -->
    <form id="add-form">
        <h2>Ajouter un projet</h2>

        <label for="add-name">Nom</label>
        <input type="text" id="add-name" name="name" required>

        <label for="add-link">Lien</label>
        <input type="text" id="add-link" name="link" required>

        <label for="add-img">Image</label>
        <input type="text" id="add-img" name="img" required>

        <label for="add-skills">Compétences</label>
        <input type="text" id="add-skills" name="skills" required>

        <button type="submit">Ajouter</button>
    </form>

    <!-- Tableau des projets -->
    <table>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Lien</th>
                <th>Image</th>
                <th>Compétences</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="projects-table">
            <!-- Les projets seront ajoutés ici -->

            
        </tbody>
    </table>

   
<script src="/admin/admin.js"></script>
</body>

</html>