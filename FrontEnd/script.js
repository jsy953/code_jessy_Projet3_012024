const urlCategorie = "http://localhost:5678/api/categories";
const urlObjet = "http://localhost:5678/api/works";

function fetchObjets() {
    fetch(urlObjet)
        .then(reponse => reponse.json())
        .then(data => {
            buttonAll(data)
            displayAll(data)
        });
}

function fetchCategories() {
    fetch(urlCategorie)
        .then(reponse => reponse.json())
        .then(data => {
            displayCategories(data)
            createFormInput(data)
        });
};

const parent = document.querySelector('.categories')

let htmlCloner = '';


function buttonAll(image) {

    const buttonAppear = document.createElement('button');
    buttonAppear.innerText = ('Tout');

    parent.prepend(buttonAppear)

    buttonAppear.addEventListener("click", function () {
        const imageContainers = document.querySelector(".gallery")
        imageContainers.innerHTML = '';
        displayAll(image);
    })
}

function displayAll(data) {

    const gallery = document.querySelector('.gallery')

    for (let i = 0; i < data.length; i++) {
        const figure = document.createElement('figure')
        figure.className = (`${data[i].category.name}`)
        gallery.appendChild(figure)

        const image = document.createElement('img')
        image.src = (`${data[i].imageUrl}`);
        image.alt = (`${data[i].title}`);

        const figcaption = document.createElement('figcaption')
        figcaption.innerHTML = (`${data[i].title}`);

        figure.appendChild(image)
        figure.appendChild(figcaption)
    }

    const contenuGallery = document.querySelector('.gallery')
    htmlCloner = contenuGallery.cloneNode(true)

}

function stockAll() {
    const imageContainers = document.querySelector(".gallery")
    imageContainers.innerHTML = '';
    const galeryAll = htmlCloner.cloneNode(true);
    imageContainers.appendChild(galeryAll)
}

function displayCategories(project) {

    for (let i = 0; i < project.length; i++) {
        const categoryButton = document.createElement('button')
        categoryButton.innerText = `${project[i].name}`;
        parent.appendChild(categoryButton)
        categoryButton.addEventListener("click", function () {
            showImagesByCategory(project[i].name)
        });
    };
};

function showImagesByCategory(cateName) {

    stockAll();

    const imageFiltrer = Array.from(document.getElementsByClassName(`${cateName}`))
    const galleryContainer = document.querySelector('.gallery')
    galleryContainer.innerHTML = '';

    for (let i = 0; i < imageFiltrer.length; i++) {
        const clonedImage = imageFiltrer[i].cloneNode(true);
        galleryContainer.appendChild(clonedImage);
    };
};

fetchCategories()
fetchObjets()


function retrieveToken() {
    return localStorage.getItem('token');
}

function openConnectPage() {
    const token = retrieveToken();
    console.log(token)
    if (token !== null && token !== undefined) {
        showConnectPage();
    }
}

function showConnectPage() {

    const logout = document.querySelector('#logout')
    logout.classList.remove('hidden')
    const login = document.querySelector('#login')
    login.classList.add('hidden')

    const category = document.querySelector('.categories')
    category.classList.add('hidden')

    const portfolio = document.querySelector('.modif')
    const editButton = document.createElement('button')
    editButton.innerHTML = ('<img src="./assets/icons/modifier_noir.png">modifier')
    editButton.id = ('editButton')
    portfolio.appendChild(editButton)
    editButton.addEventListener("click", function () {
        openModal();
    })

    const body = document.querySelector('body')
    const editTopLine = document.createElement('button')
    editTopLine.innerHTML = ('<img src="./assets/icons/modifier_blanc.png">Mode edition')
    editTopLine.id = ('editTopLine')
    body.prepend(editTopLine)
    editTopLine.addEventListener("click", function () {
        openModal();
    })

}

function buttoncloseConnectPage() {
    const button = document.querySelector('#logout')
    button.addEventListener("click", function () {
        closeConnectPage();
    })
}

function closeConnectPage() {

    localStorage.removeItem('token');

    const logout = document.querySelector('#logout')
    logout.classList.add('hidden')
    const login = document.querySelector('#login')
    login.classList.remove('hidden')

    const category = document.querySelector('.categories')
    category.classList.remove('hidden')
    category.innerHTML = '';

    const editButton = document.querySelector('#editButton')
    editButton.classList.add('hidden')
    const editTopLine = document.querySelector('#editTopLine')
    editTopLine.classList.add('hidden')

    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    fetchCategories();
    fetchObjets()

}

buttoncloseConnectPage()
retrieveToken()
openConnectPage()



////////////////// PARTI MODAL //////////////////



function openModal() {

    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.modal').classList.add('modal-open')

    const modal = document.querySelector('.modals');
    modal.classList.remove('hidden')
    const pastModal = document.querySelector('.modal')
    pastModal.classList.remove('hidden')

    const modal2 = document.querySelector('.second-modal')
    modal2.classList.remove('modal-open')
}


function buttoncloseModal() {
    const button = document.querySelector('.modal-close')
    button.addEventListener("click", function () {
        closeModal();
    })
}

function closeModal() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.modal').classList.remove('modal-open')
}

buttoncloseModal()

function buttonsecondcloseModal() {
    const button = document.querySelector('#close')
    button.addEventListener("click", function () {
        secondcloseModal();
    })
}

function secondcloseModal() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.modal').classList.remove('modal-open')
}

buttonsecondcloseModal()


////////////////// ramener et pouvoir supprimer les images


function modalAutorization() {
    const token = retrieveToken();
    if (token !== null && token !== undefined) {
        modalData();
    }
}

function modalData() {

    fetch(urlObjet)
        .then(reponse => reponse.json())
        .then(data => {
            modalContent(data)
            modalButton(data)
        })

}



function modalContent(data) {

    const selectModal = document.querySelector('.modal-body')

    for (let i = 0; i < data.length; i++) {
        const figure = document.createElement('figure')
        selectModal.appendChild(figure)

        const image = document.createElement('img')
        image.src = (`${data[i].imageUrl}`);
        image.alt = (`${data[i].title}`);

        figure.appendChild(image)
    }

}

function modalButton(data) {

    const selectModal = document.querySelector('.modal-body')
    const selectFigure = selectModal.querySelectorAll('figure')

    for (let i = 0; i < selectFigure.length; i++) {
        const button = document.createElement('button')
        button.innerHTML = ("<img src='./assets/icons/poubelle_blanche.png'>");
        selectFigure[i].appendChild(button)
        button.addEventListener("click", function () {
            deleteImage(data[i].id);
        });
    }
}

function updateImage() {
    const modal = document.querySelector('.modal-body')
    const gallery = document.querySelector('.gallery')

    modal.innerHTML = '';
    gallery.innerHTML = '';
}

function deleteImage(imageId) {

    const url = `http://localhost:5678/api/works/${imageId}`;
    const token = retrieveToken();

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur lors de la suppression de l'image : ${response.statusText}`);
            }
            fetchObjets()
            updateImage();
            modalData();
        })
        .catch(error => console.error('Erreur :', error));
}

modalAutorization()




////////////////// fermer la modale en apuyant sur le coter



const modal = document.querySelector('.modals');

const overlay = document.querySelector('.overlay')

overlay.addEventListener('click', function (event) {

    if (event.target === overlay) {
        modal.classList.add('hidden')
    }
});



////////////////// deuxieme page de la modal



function ajouterImage() {

    const parent = document.querySelector('.modals')

    const pastModal = document.querySelector('.modal')
    pastModal.classList.add('hidden')
    const newModal = document.createElement('div')
    newModal.className = ('modal modal-open');
    parent.appendChild(newModal)

}

function buttonopenModalAjout() {
    const button = document.querySelector('#openModalAjout')
    button.addEventListener("click", function () {
        openModalAjout();
    })
}

function openModalAjout() {

    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.second-modal').classList.add('modal-open')


    const modal = document.querySelector('.modals');
    modal.classList.remove('hidden')
    const firstModal = document.querySelector('.modal')
    firstModal.classList.remove('hidden')
    const secondModal = document.querySelector('.second-modal')
    secondModal.classList.remove('hidden')


}
buttonopenModalAjout()

function buttonreturnModal() {
    const button = document.querySelector('.modal-return')
    button.addEventListener("click", function () {
        returnModal();
    })
}

function returnModal() {
    const pastModal = document.querySelector('.second-modal')
    pastModal.classList.remove('modal-open')
}
buttonreturnModal()

function selectFile() {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();

}

function inputpreviewFile() {
    const button = document.querySelector('#fileInput')
    button.addEventListener("change", function () {
        previewFile(event);
    })
}


function previewFile(event) {
    const previewImage = document.getElementById('previewImage');
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        previewImage.src = reader.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        previewImage.src = "";
    }
}

inputpreviewFile()

function createFormInput(project) {
    const choice = document.querySelector('#suggestions')
    console.log(choice)
    choice.innerHTML = '';
    for (let i = 0; i < project.length; i++) {
        const categoryButton = document.createElement('option')
        categoryButton.innerText = `${project[i].name}`;
        /* categoryButton.value = ''; */
        categoryButton.dataset.value = project[i].id;
        choice.appendChild(categoryButton)
    };

}


function allInputFull() {
    const firstInput = document.getElementById('fileInput').value.trim();
    const secondInput = document.getElementById('title').value.trim();
    const thidInput = document.getElementById('suggestionsInput').value.trim();

    return firstInput !== '' && secondInput !== '' && thidInput !== '';
}

function changeButtonColor() {

    const buttonAdd = document.getElementById('ajouter-photo-button')

    if (allInputFull()) {
        const buttonAdd = document.querySelector('.formFull');
        buttonAdd.removeAttribute('id');
    } else {
        const buttonAdd = document.querySelector('.formFull');
        buttonAdd.id = 'ajouter-photo-button';
    }

}

document.getElementById('fileInput').addEventListener('input', changeButtonColor);
document.getElementById('title').addEventListener('input', changeButtonColor);
document.getElementById('suggestionsInput').addEventListener('input', changeButtonColor);


changeButtonColor();


function buttonsendWork() {
    const button = document.querySelector('.formFull')
    button.addEventListener("click", function () {
        sendWork();
    })
}


async function sendWork() {
    const url = 'http://localhost:5678/api/works';
    const token = retrieveToken();

    const titleSelect = document.getElementById('title').value;

    const suggestionsInput = document.getElementById('suggestionsInput').value;
    const datalist = document.getElementById('suggestions');
    const selectedOption = Array.from(datalist.options).find(option => option.text === suggestionsInput);


    const dataValue = selectedOption.dataset.value;


    const imageFile = document.querySelector('input[type=file]').files[0];
    const title = titleSelect;
    const category = dataValue;

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('title', title);
    formData.append('category', category);

    /* if (imageFile !== null && title !== null && category !== null) {
        const buttonAdd = document.querySelector('#ajouter-photo-button')
        buttonAdd.removeAttribute('id');
        console.log('sa marche ')
    } */

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formData
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error('erreur dans le remplissage du formulaire');
        }
        modalData()
        fetchObjets();
        updateImage();
        const workData = await response.json();
        console.log('Work created:', workData);
    } catch (error) {
        console.error('Error creating work:', error);
        document.getElementById('seconderrorMessage').innerHTML = error.message;
    }
}

buttonsendWork()