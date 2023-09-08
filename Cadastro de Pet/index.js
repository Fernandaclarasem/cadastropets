const petForm = document.getElementById("petForm");
const speciesInput = document.getElementById("speciesInput");
const nameInput = document.getElementById("nameInput");
const colorInput = document.getElementById("colorInput");
const cancelButton = document.getElementById("cancelButton");
const petList = document.getElementById("petList");
const pets = [];
let editIndex = -1;

petForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const species = speciesInput.value.trim();
    const name = nameInput.value.trim();
    const color = colorInput.value.trim();

    if (species !== "" && name !== "" && color !== "") {
        if (editIndex === -1) {
            pets.push({ species, name, color });
        } else {
            pets[editIndex] = { species, name, color };
            editIndex = -1;
            cancelButton.style.display = "none";
        }
        resetForm();
        renderPets();
    }
});

function deletePet(index) {
    pets.splice(index, 1);
    renderPets();
}

function editPet(index) {
    const pet = pets[index];
    speciesInput.value = pet.species;
    nameInput.value = pet.name;
    colorInput.value = pet.color;
    editIndex = index;
    cancelButton.style.display = "inline";
}

cancelButton.addEventListener("click", function() {
    resetForm();
});

function resetForm() {
    speciesInput.value = "";
    nameInput.value = "";
    colorInput.value = "";
    editIndex = -1;
    cancelButton.style.display = "none";
}

function renderPets() {
    petList.innerHTML = "";
    pets.forEach((pet, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${pet.species}</td>
            <td>${pet.name}</td>
            <td>${pet.color}</td>
            <td>
                <button onclick="editPet(${index})">Editar</button>
                <button onclick="deletePet(${index})">Excluir</button>
            </td>
        `;
        petList.appendChild(row);
    });
}

renderPets();
