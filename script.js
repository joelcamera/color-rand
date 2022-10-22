const colors = {
  firstColor: "",
  secondColor: "",
  thirdColor: "",
  fourthColor: "",
}

function getNewColor() {
  const maxColorDecimalNumber = 16777215;
  let colorNumber = Math.floor(Math.random() * (maxColorDecimalNumber + 1)).toString(16);
  while(colorNumber.length < 6) colorNumber = "0" + colorNumber;
  return `#${colorNumber}`;
}

function setColorToElementById(id) {
  const element = document.getElementById(id);
  const newColor = getNewColor();
  colors[id] = newColor;
  element.style.backgroundColor = newColor;
  document.getElementById(id + "Text").textContent = newColor;
}

function createMessageElementWithText(text) {
  const element = document.createElement("div");
  element.innerText = text;
  element.className = "message";
  document.body.appendChild(element);

  setTimeout(function () {
    document.body.removeChild(element);
  }, 2000);
}

function createCopiedMessage() {
  createMessageElementWithText("Copied!");
}

function createOopsCantCopyMessage() {
  createMessageElementWithText("Oops, unable to copy");
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');

    if(successful) {
      createCopiedMessage();
    } else {
      createOopsCantCopyMessage();
    }
  } catch (err) {
    createOopsCantCopyMessage();
    console.error(err);
  }

  document.body.removeChild(textArea);
}

function copyColor(id) {
  const hexColor = document.getElementById(id).textContent;

  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(hexColor);
    return;
  }
  navigator.clipboard.writeText(hexColor).then(function() {
    createCopiedMessage();
  }, function(err) {
    createOopsCantCopyMessage();
    console.error(err);
  });
}

setColorToElementById("firstColor")
setColorToElementById("secondColor")
setColorToElementById("thirdColor")
setColorToElementById("fourthColor")