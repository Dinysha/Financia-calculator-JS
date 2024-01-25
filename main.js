const btn = document.querySelector(".button");
const inpName = document.querySelector(".input");
const inpSum = document.querySelector(".input__money");
const total = document.querySelector(".total-check");
const success = document.querySelector(".alert-success");
const danger = document.querySelector(".alert-danger");
const item = document.querySelector(".dir__item");
const btnColor = document.querySelector(".btn");
const btnContent = document.querySelector(".dropdown-content");
const btnDeleteAll = document.querySelector(".delete");

let arrayMoney = [];

let totalSum = 0

//значения для каждой категории
let categoryValues = {
  required: 0,
  car: 0,
  home: 0,
  family: 0,
  other: 0,
};

// сохранение в localStorage
const saveDataToLocalStorage = function () {
  localStorage.setItem('arrayMoney', JSON.stringify(arrayMoney));
  localStorage.setItem('totalSum', totalSum);
  localStorage.setItem('categoryValues', JSON.stringify(categoryValues));
};

// отрисовка на странице из localstorage
const loadDataFromLocalStorage = function () {
  const savedArrayMoney = localStorage.getItem('arrayMoney');
  const savedTotalSum = localStorage.getItem('totalSum');
  const savedCategoryValues = localStorage.getItem('categoryValues');

  if (savedArrayMoney) {
    arrayMoney = JSON.parse(savedArrayMoney);

      for (let i = 0; i < arrayMoney.length; i++) {
    item.innerHTML += `
      <li class="list" data-action="delete">
        <p class="text">${arrayMoney[i].text}</p>
        <p class="number">${arrayMoney[i].money} руб</p>
        <div class="bc__window ${arrayMoney[i].color}"></div>
      </li>`;
  }
  }

  if (savedTotalSum) {
    totalSum = parseFloat(savedTotalSum);
  }

  if (savedCategoryValues) {
    categoryValues = JSON.parse(savedCategoryValues);
  }
};

loadDataFromLocalStorage();

//проверка пустой строки
btn.onclick = function () {
  if (inpName.value.length && inpSum.value.length && colorizeButton != "") {
    total.innerHTML = totalCheack();
    addItem();
    arr();
    addValueCategories();
    result(danger, success);
    updateChart();
    saveDataToLocalStorage();
    updateTotal();


    //очищаем поле ввода
    inpName.value = "";
    inpSum.value = "";
    btnColor.classList.remove(colorizeButton);
    colorizeButton = "";
  } else {
    result(success, danger);
  }
};

//удаление класса
const addClass = function (cls) {
  return cls.classList.remove("none");
};

const result = function (res, cls) {
  if (res.classList.contains("none")) {
    addClass(cls);
  } else {
    res.classList.add("none");
    addClass(cls);
  }
};

//массив
const arr = function () {
  arrayMoney.push({
    text: inpName.value,
    money: inpSum.value,
    color: colorizeButton,
  });
};

//удаление из массива
const deleteItem = function (index) {
  arrayMoney.splice(index, 1);
  updateTotal();
};

//заполнение тотал
const totalCheack = function () {
  totalSum = Number(totalSum) + Number(inpSum.value);
  return totalSum + " руб";
};

//заполнение плашек
const addItem = function () {
  item.innerHTML += `
  <li class="list" data-action="delete">
      <p class="text">${inpName.value}</p>
      <p class="number">${inpSum.value} руб</p>
      <div class="bc__window ${colorizeButton}"></div>
    </li>`;
  return item;
};

//обновления тотала
  function updateTotal()  {
  let newTotal = 0;
  for (let i = 0; i < arrayMoney.length; i++) {
    newTotal += Number(arrayMoney[i].money);
  }
  total.innerHTML = newTotal + " руб";
};

//удаление плашек
document.querySelector("ul").onclick = function (e) {
  const list = e.target.closest(".list");
  if (!list) {
    return;
  }
  const index = Array.from(list.parentNode.children).indexOf(list);
  const itemToDelete = arrayMoney[index];
  removeValueFromCategory(itemToDelete);
  list.remove();
  deleteItem(index);
  updateTotal();
  updateChart();
  // saveToLocalStorage();
  saveDataToLocalStorage();
};

//распределение по категориям
let colorizeButton = "";

btnContent.addEventListener("click", function (e) {
  (colorizeButton = e.target.id), btnColor.classList.add(colorizeButton);
});

//удаление из объекта
const removeValueFromCategory = function (item) {
  const color = item.color;
  const value = Number(item.money);
  if (color === "bc__blue") {
    categoryValues.required -= value;
  } else if (color === "bc__purple") {
    categoryValues.car -= value;
  } else if (color === "bc__pink") {
    categoryValues.home -= value;
  } else if (color === "bc__azure") {
    categoryValues.family -= value;
  } else if (color === "bc__violet") {
    categoryValues.other -= value;
  }
};


//значения для каждой категории
const addValueCategories = function () {
  if (colorizeButton === "bc__blue") {
    categoryValues.required += Number(inpSum.value);
  }
  if (colorizeButton === "bc__purple") {
    categoryValues.car += Number(inpSum.value);
  }
  if (colorizeButton === "bc__pink") {
    categoryValues.home += Number(inpSum.value);
  }
  if (colorizeButton === "bc__azure") {
    categoryValues.family += Number(inpSum.value);
  }
  if (colorizeButton === "bc__violet") {
    categoryValues.other += Number(inpSum.value);
  }
};

//удаление всего
btnDeleteAll.addEventListener("click", function () {
  const elements = document.querySelectorAll(".list");
  elements.forEach(function (element) {
    element.remove();
  });
  arrayMoney.length = 0;
  totalSum = 0;
  total.innerHTML = 0 + ' руб';
  categoryValues = {
    required: 0,
    car: 0,
    home: 0,
    family: 0,
    other: 0,
  };
  updateChart();
  saveDataToLocalStorage();
});

//сохранение в localStorage
function saveToLocalStorage() {
  localStorage.setItem('array', JSON.stringify(arrayMoney))
}
