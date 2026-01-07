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
]

const ImgTitel = [
    'Berg am See im Winter',
    'Baum im Schnee',
    'Vogel auf Ast',
    'Person auf Stein',
    'Ente im Wasser',
    'dunkle Straße Futoristisch',
    'dunkler Wolkenhimmel Gewitter',
    'Wetterauge aus dem Orbit',
    'Puma am Stein',
    'Fjiord Fluss Berg',
    'Vogel auf steinen',
    'Berglandschaft Winter klarerHimmel'
]

// get HTML-Element -> for-loop to all img -> every img get HTML in DOM | transported index
function render(){
    let contentRef = document.getElementById('content')
    // i starts 0 -> count all img | hire to 12 (11 0->11 = 12) | call getImgHtml transfers to i
    for (let i = 0; i < images.length; i++) {
        contentRef.innerHTML += getImgHtml(i);
    }
}

// get index from render() | build div/img get src from array (images)
function getImgHtml(index) {
    return `<div class="img-container" onclick="openDialog(${index})"><img src="${images[index]}" alt="${ImgTitel[index]}" ></div>`
}

const dialogRef = document.getElementById('myDialog');
const dialogImgRef = document.getElementById('imgDialog');
const dialogTitleRef = document.getElementById('dialogTitle')
const imgCountRef = document.getElementById('imgCounter')
const btnForRef = document.getElementById('for')// besser die ID bennen
const btnBackRef = document.getElementById('back')// besser die ID bennen

function openDialog(index) {
    dialogTitleRef.innerHTML = ImgTitel[index]
    dialogImgRef.setAttribute('src', images[index])
    dialogImgRef.setAttribute('alt', ImgTitel[index]+ '.jpg')
    imgCountRef.innerHTML = (index + 1) + '/' + images.length
    btnForRef.setAttribute('onclick', `imgForward(${index})`)
    btnBackRef.setAttribute('onclick', `imgBackwards(${index})`)
    dialogRef.showModal();
}

function imgForward(index) {
    let nextImg;

    if (index >= images.length - 1) {
        nextImg = 0;
    } else {
        nextImg = index + 1
    }// if the last number is reached -> start again from the beginning, else add 1

    dialogTitleRef.innerHTML = ImgTitel[nextImg]
    dialogImgRef.setAttribute('src', images[nextImg])
    dialogImgRef.setAttribute('alt', ImgTitel[nextImg]+ '.jpg')
    imgCountRef.innerHTML = (nextImg + 1) + '/' + images.length
    btnForRef.setAttribute('onclick', `imgForward(${nextImg})`)
    btnBackRef.setAttribute('onclick', `imgBackwards(${nextImg})`)
}

function imgBackwards(index) {
    let prevImg;

    if (index <= 0) {
    prevImg = images.length -1 ;
    } else {
    prevImg = index - 1
    }// if last number reached < 0 (-1), then calculate total (1-12 or 0-11) -1, else take current number -1

    dialogTitleRef.innerHTML = ImgTitel[prevImg]
    dialogImgRef.setAttribute('src', images[prevImg])
    dialogImgRef.setAttribute('alt', ImgTitel[prevImg]+ '.jpg')
    imgCountRef.innerHTML = (prevImg + 1) + '/' + images.length
    btnForRef.setAttribute('onclick', `imgForward(${prevImg})`)
    btnBackRef.setAttribute('onclick', `imgBackwards(${prevImg})`)
}

dialogRef.addEventListener('click', (event) => {
    if (event.target === dialogRef) {
        dialogRef.close();
    }
});

dialogRef.addEventListener('cancel', (event) => {
    event.preventDefault();
    dialogRef.close();
});