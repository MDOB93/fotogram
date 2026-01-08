const images = [
    './img/93265accae6c295655b8fd3cc1113f8c76b70797.jpg',
    './img/3c416b08502bf2ed10a304bdce5c1c782b99c40d.jpg',
    './img/4ac67c63bfc2b6a80cca4919df91a1e498ec4c07.jpg',
    './img/8bc8dae8f655d7cac8d770f66d76f62367f5b5df.jpg',
    './img/872f2a95ab48c88b865e4f11d2e061a802987c88.jpg',
    './img/714707b1ea80f159dacba47280dc1091bbebb9c7.jpg',
    './img/0872285883cee475f9533508e645f19ef0939ae8.png',
    './img/bbd3479cb0c36ecd872f4526275e11a893e50107.jpg',
    './img/cc1d7f8870c4b98e849a8e36c6c397e0f71486f9.jpg',
    './img/dc4b11f7f36deb9409236c10ebcd6c849b00f447.jpg',
    './img/f1ba9135a20ea8343ad3d5732c6f8a541ec455b5.jpg',
    './img/f2b056a08d5edba809ca216fa6aa66a4bb612ea8.jpg'
];

const ImgTitel = [
    'Mountain Water in Winter',
    'Tree in the Snow',
    'Bird on a Branch',
    'Person on Stone',
    'Duck in Water',
    'dark Street Futuristic',
    'dark cloudy sky',
    'Weather eye from orbit',
    'Cheetah on a rock',
    'Fjord River Mountain',
    'Bird on Stones',
    'Winter Mountain Landscape'
];

const contentRef = document.getElementById('content');
const dialogRef = document.getElementById('myDialog');
const dialogImgRef = document.getElementById('imgDialog');
const dialogTitleRef = document.getElementById('dialogTitle');
const imgCountRef = document.getElementById('imgCounter');
const btnForRef = document.getElementById('forBtnIMG');
const btnBackRef = document.getElementById('backBtnImg');

function render() {
    images.forEach((_, i) => {
        contentRef.innerHTML += getImgHtml(i);
    });
}
// HTML für ein Bild
function getImgHtml(index) {
    return `
        <div
            class="img-container"
            id="imgContainer${index}"
            tabindex="0"
            onclick="openDialog(${index})"
            onkeydown="handleImgKeydown(event, ${index})"
        >
            <img src="${images[index]}" alt="${ImgTitel[index]}">
        </div>
    `;
}
function handleImgKeydown(event, index) {
    const key = event.key;

    if (key === 'Enter' || key === ' ') {
        if (key === ' ') event.preventDefault(); // kein Scrollen
        openDialog(index);
    } else if (key === 'ArrowRight') {
        event.preventDefault();
        focusNextImage(index);
    } else if (key === 'ArrowLeft') {
        event.preventDefault();
        focusPrevImage(index);
    }
}
// Fokusfunktionen für Galerie
function focusImage(index) {
    document.getElementById(`imgContainer${index}`).focus();
}
function focusNextImage(index) {
    focusImage((index + 1) % images.length);
}
function focusPrevImage(index) {
    focusImage((index - 1 + images.length) % images.length);
}
function openDialog(index) {
    // Setzt Startindex und öffnet Dialog
    dialogImgRef.setAttribute('src', images[index]);
    dialogTitleRef.innerHTML = ImgTitel[index];
    changeDialogImage(0);
}
// Berechnet Index und aktualisiert Dialoganzeige
function changeDialogImage(delta = 0) {
    const currentIndex = getCurrentDialogIndex();
    const newIndex = (currentIndex + delta + images.length) % images.length;

    dialogTitleRef.innerHTML = ImgTitel[newIndex];
    dialogImgRef.setAttribute('src', images[newIndex]);
    dialogImgRef.setAttribute('alt', ImgTitel[newIndex] + '.jpg');
    imgCountRef.innerHTML = `${newIndex + 1}/${images.length}`;

    btnForRef.setAttribute('onclick', `changeDialogImage(1)`);
    btnBackRef.setAttribute('onclick', `changeDialogImage(-1)`);

    if (delta === 0) dialogRef.showModal();
}
function getCurrentDialogIndex() {
    const currentSrc = dialogImgRef.getAttribute('src');
    return images.indexOf(currentSrc);
}
function closeDialog() {
    dialogRef.close();
}
dialogRef.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key === 'ArrowRight') {
        event.preventDefault();
        changeDialogImage(1);
    } else if (key === 'ArrowLeft') {
        event.preventDefault();
        changeDialogImage(-1);
    } else if (key === 'Escape') {
        dialogRef.close();
    }
});
dialogRef.addEventListener('click', (e) => {
    if (e.target !== dialogRef) return;

    const rect = dialogRef.getBoundingClientRect();
    const clickedOutside =
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom;

    if (clickedOutside) dialogRef.close();
});