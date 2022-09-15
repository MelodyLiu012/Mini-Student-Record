document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    document.activeElement.blur();
  }
});

const errorContainer = document.querySelector("#error-container");

const readyValidation = () => {
  errorContainer.style.display = "none";

  const activeElement = document.activeElement;

  const validate = () => {
    let dataType = "none";
    let reg = null;
    if (activeElement.classList.contains('name-box')) {
      reg = /^[a-z ,.'-]+$/i;
      dataType = "name";
    }
    if (activeElement.classList.contains('email-box')) {
      reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      dataType = "email";
    }
    if (activeElement.classList.contains('level-box')) {
      reg = /(first|second|third|fourth)-year/;
      dataType = "level";
    }

    if (reg.test(activeElement.textContent) || activeElement.textContent === "") {
      console.log("yay");
      activeElement.style.outline = "none";
    } 
    else {
      console.log("no");
      activeElement.textContent = "";
      activeElement.style.outline = "2px solid red";

      errorContainer.style.display = "block";
      errorContainer.innerHTML = `Error: Invalid ${dataType} entered.`;
    }

    // Remove event listener on unfocusing
    activeElement.removeEventListener("focusout", validate);
  }

  activeElement.addEventListener("focusout", validate);
}


let lastIndex = 1;

const addRow = () => {
  lastIndex++; 
  const rowHTML = `
    <div class="row">
      <div class="index-box">${lastIndex}</div>
      <div class="name-box" contenteditable="true" onfocusin="readyValidation()"></div>
      <div class="email-box" contenteditable="true" onfocusin="readyValidation()"></div>
      <div class="level-box" contenteditable="true" onfocusin="readyValidation()"></div>
    </div>
  `
  document.querySelector("#table").innerHTML += rowHTML; 
}
