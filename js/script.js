//Fetch dom elments
const error = document.querySelector(".error");
const erroMessage = "Please add details!";
const addBtn = document.querySelector(".add");
let adding = false;
let order = 1;

addBtn.addEventListener("click", () => {
  const target = document.querySelector("#requested");
  if (adding == false) {
    adding = true;
    target.appendChild(createItem());
  } else {
    error.innerHTML = erroMessage;
  }
});

//Functions

let createItem = () => {
  let item = document.createElement("div");
  //item.innerHTML = "Bitch please";
  item.classList.add("item");
  item.setAttribute("id", `item-${order}`);
  item.setAttribute("draggable", "true");

  //dragstart event listener
  item.addEventListener("dragstart", (e) => {
    return e.dataTransfer.setData("text", e.target.id);
  });

  //dragend event listener

  item.addEventListener("dragend", (e) => {
    return e.dataTransfer.clearData();
  });

  //Input element

  let input = document.createElement("input");
  item.appendChild(input);

  //Save button

  let saveBtn = document.createElement("button");
  saveBtn.innerHTML = "Save";

  //Save button event listener and validation
  saveBtn.addEventListener("click", () => {
    error.innerHTML = " ";
    if (input.value !== "") {
      order = order + 1;
      item.innerHTML = input.value;
      adding = false;
    } else {
      error.innerHTML = erroMessage;
    }
  });

  //Append the save button
  item.appendChild(saveBtn);

  return item;
};

//Drop  and dragover event handler

document.querySelectorAll(".drop").forEach((element) => {
  element.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(id));
  });

  element.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
});
