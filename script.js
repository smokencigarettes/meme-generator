let imageSelector = document.querySelector("#image-selection");
let textSelector = document.querySelector("#text-selection");

let topLine = document.querySelector("#top-line");
let bottomLine = document.querySelector("#bottom-line");

let btnForward = document.querySelector("#forward");
let btnBack = document.querySelector("#back");

let downloadButton = document.querySelector("#download");
let fileInput = document.querySelector("#file-upload");
let fileName = document.querySelector("#file-upload-label");

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let canvasImage = "";
let topText = "";
let bottomText = "";

imageSelector.addEventListener("click", (e) => {
  if(e.target.tagName === "IMG") {
    selectImage(e.target);
  }
})

topLine.addEventListener("input", (e) => {
  updateText(e.target.value, e.target.id);
})
bottomLine.addEventListener("input", (e) => {
  updateText(e.target.value, e.target.id);
})

downloadButton.addEventListener("click", downloadCanvas);

function selectImage(image) {
  canvasImage = image;
  redrawCanvas(canvasImage, topText, bottomText);
  enableButton(btnForward);
}

function updateText(text, id) {
  if(id === "top-line") {
    topText = text;
  } else if(id === "bottom-line") {
    bottomText = text;
  }
  redrawCanvas(canvasImage, topText, bottomText);
}

function printTextToCanvas(text, x, y){
  ctx.font = "30px Impact";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  
  ctx.fillText(text, x, y);
  ctx.strokeText(text, x, y);
}

function redrawCanvas(image, topText, bottomText){
  ctx.drawImage(image,0,0,canvas.width, canvas.height);

  printTextToCanvas(topText, canvas.width/2, canvas.height/10);
  printTextToCanvas(bottomText, canvas.width/2, canvas.height - 30);
}

fileInput.addEventListener("change", function(e){
  handleFileSelction(e);
  enableButton(btnForward);
  fileName.textContent = e.target.files[0].name;
});

function handleFileSelction(e){
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", function(){
    let image = document.createElement("img");
    image.src = reader.result;
    image.addEventListener("load", function(){
      canvasImage = image;
      redrawCanvas(canvasImage, topText, bottomText);
    })
  })
}

btnForward.addEventListener("click", goForward);
btnBack.addEventListener("click", goBack);

function goForward(){
  imageSelector.style.display = "none";
  textSelector.style.display = "block";
}

function goBack(){
  imageSelector.style.display = "block";
  textSelector.style.display = "none";
}

function enableButton(button){
  button.removeAttribute("disabled");
  button.classList.remove("disabled")
  button.classList.add("able")
}

function downloadCanvas() {
  let dataURL = canvas.toDataURL("image/jpeg");
  downloadButton.href = dataURL;
}