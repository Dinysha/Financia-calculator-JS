// TODO:
// [+] добавить инпут с деньгами
// [+] добавить кнопку отправки инпута
// [+] слушание записи в инпут / передача в консоль
// [+] добавить проверку заполнения инпутов
// [+] добавить проверку заполнения "сумма" как число
// [+] добавить тотал счет
// [+] придумать как обработать результат, сделать так, чтобы при клиле менялся класс, если произогла ошибка
// [+] обработка значение, ошибка при неверной записи
// [+] сумма в тотал
// [+] удаление при нажатии на плашку
// [+] добавления плашки с темой и расходом
// [+] реализовать четкие категории по которым будет распределяться бюджет
// [+] разобраться откуда в первом инпуте появляется буква О
// [+] менять цвет кнопки с категориями
// [+] сделать ограничение вводу текста в описание
// [+] добавление кнопки удаления всех элементов
// [+] удаление из тотала
// [+] добавление в массив и удаление из него
// [+] разобраться с тоталом после удаления всего
// [+] удаление из категории 
// [+] добавление темы и суммы в диаграмму
// [] добавление в локалсторедж

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

const arrayMoney = [];

if(localStorage.getItem('array')){
  console.log(JSON.parse(localStorage.getItem("array")));
}

//проверка пустой строки
btn.onclick = function () {
  if (inpName.value.length && inpSum.value.length && colorizeButton != "") {
    total.innerHTML = totalCheack();
    addItem();
    arr();
    addValueCategories();
    result(danger, success);
    updateChart();
    saveToLocalStorage();

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
  console.log(arrayMoney);
};

//удаление из массива
const deleteItem = function (index) {
  arrayMoney.splice(index, 1);
  updateTotal();
};

//заполнение тотал
let totalSum = 0;
const totalCheack = function () {
  totalSum = Number(totalSum) + Number(inpSum.value);
  return totalSum + " руб";
};

console.log(arrayMoney)

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
const updateTotal = function () {
  let newTotal = 0;
  for (let i = 0; i < arrayMoney.length; i++) {
    newTotal += Number(arrayMoney[i].money);
  }
  total.innerHTML = newTotal + " руб";
  console.log(total);
  console.log(newTotal);
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
  saveToLocalStorage();
};

//распределение по категориям
let colorizeButton = "";

btnContent.addEventListener("click", function (e) {
  (colorizeButton = e.target.id), btnColor.classList.add(colorizeButton);
});

//значения для каждой категории
let categoryValues = {
  required: 0,
  car: 0,
  home: 0,
  family: 0,
  other: 0,
};

//удаление из объекта
const removeValueFromCategory = function (item) {
  console.log("Removing value from category");
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
  console.log(`Removed ${value} from ${color} category`);
  console.log(categoryValues);
};


//значения для каждой категории
const addValueCategories = function () {
  if (colorizeButton === "bc__blue") {
    categoryValues.required += Number(inpSum.value);
    console.log(categoryValues.required)
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
  console.log(categoryValues);
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
  saveToLocalStorage();
});

//сохранение в localStorage
function saveToLocalStorage() {
  localStorage.setItem('array', JSON.stringify(arrayMoney))
}