"use strict";
//Variablen

// Warenkorb

let basketMenuID = [];
let basketMenuAmount = [];
let summedPrice = [];
let summedAmount = 0;
let subtotal = 0;
let deliveryCost = 2.99;
let total;
let tax;

//andere
let favorite = false;

//Scrollposition
let topPosition;

//FUnktionen

//Scrollposition ermitteln

function scroll() {
  let basket = document.getElementById("basket");
  topPosition = window.scrollY;
  if (topPosition >= 100) {
    basket.classList.remove("basketUnscrolled");
    basket.classList.add("basketScrolled");
  } else {
    basket.classList.add("basketUnscrolled");
    basket.classList.remove("basketScrolled");
  }
}

//onload Functions

function onload() {
  loadStorage();
  renderContent();
  renderBasket();
  renderFooterToBasket();
  checkLike();
  renderMenuAddButtons();
}

//LocalStorage

function loadStorage() {
  loadLike();
  loadBasket();
}

function storeStorage() {
  storeLike();
  storeBasket();
}

function storeLike() {
  let favoriteAsText = JSON.stringify(favorite);
  localStorage.setItem("like", favoriteAsText);
}

function storeBasket() {
  let basketMenuAmountasText = JSON.stringify(basketMenuAmount);
  let basketMenuIDasText = JSON.stringify(basketMenuID);
  let summedPriceasText = JSON.stringify(summedPrice);
  let summedAmountasText = JSON.stringify(summedAmount);
  let subtotalasText = JSON.stringify(subtotal);
  let totalAsText = JSON.stringify(total);
  let taxAsText = JSON.stringify(tax);
  localStorage.setItem("basketMenuAmount", basketMenuAmountasText);
  localStorage.setItem("basketMenuID", basketMenuIDasText);
  localStorage.setItem("summedPrice", summedPriceasText);
  localStorage.setItem("summedAmount", summedAmountasText);
  localStorage.setItem("subtotal", subtotalasText);
  localStorage.setItem("total", totalAsText);
  localStorage.setItem("tax", taxAsText);
}

function loadLike() {
  let favoriteAsText = localStorage.getItem("like");
  if (favoriteAsText) {
    favorite = JSON.parse(favoriteAsText);
  }
}

function loadBasket() {
  let basketMenuAmountasText = localStorage.getItem("basketMenuAmount");
  let basketMenuIDasText = localStorage.getItem("basketMenuID");
  let summedPriceasText = localStorage.getItem("summedPrice");
  let summedAmountasText = localStorage.getItem("summedAmount");
  let subtotalasText = localStorage.getItem("subtotal");
  let totalAsText = localStorage.getItem("total");
  let taxAsText = localStorage.getItem("tax");
  if (basketMenuAmountasText) {
    basketMenuAmount = JSON.parse(basketMenuAmountasText);
    basketMenuID = JSON.parse(basketMenuIDasText);
    summedPrice = JSON.parse(summedPriceasText);
    summedAmount = JSON.parse(summedAmountasText);
    subtotal = JSON.parse(subtotalasText);
    total = JSON.parse(totalAsText);
    tax = JSON.parse(taxAsText);
  }
}

//Modals

function openModalBasket() {
  scrollTo(0, 0);
  document.getElementById("modalBasket").classList.remove("noDisplay");
  renderAll();
}

function closeModalBasket() {
  document.getElementById("modalBasket").classList.add("noDisplay");
  document.getElementById("modalBasketContent").innerHTML = "";
}

//renderFunctions

function renderAll() {
  calcBasket();

  renderBasket();

  if (document.getElementById("modalBasket").className != "noDisplay") {
    renderMobileBasket();
  }
  renderContent();
  renderFooterToBasket();
  renderMenuAddButtons();
}

function renderContent() {
  let content = document.getElementById("restaurantContent");
  content.innerHTML = ``;

  for (let index = 0; index < menus.length; index++) {
    content.innerHTML += menuContentHTML(index);
  }
}

function renderBasket() {
  let content = document.getElementById("basketContent");
  content.innerHTML = ``;
  content.innerHTML += `<table id="basketTable"> </table>`;
  let table = document.getElementById("basketTable");

  if (basketMenuID.length > 0) {
    for (let index = 0; index < basketMenuID.length; index++) {
      table.innerHTML += basketContentHTML(index);
    }

    table.innerHTML += basketCalcHTML();

    renderBasketFooter();
  } else {
    content.innerHTML += `
            <div> Bitte fügen Sie Waren zum Warenkorb hinzu.</div>
        `;
    renderBasketFooter();
  }
}

function renderBasketFooter() {
  document.getElementById("basketFooter").innerHTML = basketFootHTML();
}

function renderMobileBasket() {
  let content = document.getElementById("modalBasketContent");
  content.innerHTML = "";
  content.innerHTML += mobileBasketHeadandTableAndFooter();

  let table = document.getElementById("mobileBasketTable");

  if (basketMenuID.length > 0) {
    for (let index = 0; index < basketMenuID.length; index++) {
      table.innerHTML += basketContentHTML(index);
    }

    table.innerHTML += basketCalcHTML();
  } else {
    content.innerHTML += `
            <div id="callToOrder"> Bitte fügen Sie Waren zum Warenkorb hinzu.</div>
        `;
  }

  renderMobileBasketFooter();
}

function renderMobileBasketFooter() {
  let content = document.getElementById("mobileBasketFooter");
  content.innerHTML = "";
  content.innerHTML += MobileBasketFooterHTML();
}

function renderFooterToBasket() {
  let content = document.getElementById("footerToBasket");
  content.innerHTML = "";
  content.innerHTML += footerToBasketHTML();
}

function renderMenuAddButtons() {
  for (let index = 0; index < menus.length; index++) {
    if (menus[index].type == "menu") {
      if (getIndexOfBasket(menus[index].menuID) > -1) {
        document
          .getElementById(`addButton${menus[index].menuID}`)
          .classList.add("menuContainerAddButtonChecked");
      } else {
        document
          .getElementById(`addButton${menus[index].menuID}`)
          .classList.remove("menuContainerAddButtonChecked");
      }
    }
  }
}


//Datenabfrage
function getMenuName(id) {
  for (let i = 0; i < menus.length; i++) {
    if (menus[i].menuID == id) {
      return menus[i].menuName;
    }
  }
}

function getIndexOfBasket(ID) {
  for (let index = 0; index < basketMenuID.length; index++) {
    if (basketMenuID[index] == ID) {
      console.log();
      return index;
    }
  }
  return -1;
}

//Datenmanipulation

function cleanBasket() {
  basketMenuAmount = [];
  basketMenuID = [];
  summedPrice = [];
  summedAmount = 0;
  subtotal = 0;
  total = 0;
  tax = 0;
  storeBasket();
}

function addToBasket(thisID) {
  for (let i = 0; i < menus.length; i++) {
    if (menus[i].menuID == thisID) {
      if (getIndexOfBasket(thisID) > -1) {
        let index = getIndexOfBasket(thisID);
        basketMenuAmount[index] = basketMenuAmount[index] + 1;
      } else {
        basketMenuID.push(thisID);
        basketMenuAmount.push(1);
      }
    }
  }
  renderAll();
  storeBasket();
}

function deleteFromBasket(element) {
  let index = getIndexOfBasket(element);

  if (basketMenuAmount[index] > 1) {
    basketMenuAmount[index] = basketMenuAmount[index] - 1;
  } else {
    basketMenuAmount.splice(index, 1);
    basketMenuID.splice(index, 1);
  }

  if (basketMenuID.length == 0) {
    cleanBasket();
  }
  renderAll();
  storeBasket();
}

function calcSummedPrice() {
  summedPrice = [];

  for (let i = 0; i < basketMenuID.length; i++) {
    for (let j = 0; j < menus.length; j++) {
      if (basketMenuID[i] == menus[j].menuID) {
        let price = menus[j].menuPrice;
        let amount = basketMenuAmount[i];
        summedPrice.push(Math.round(price * amount * 100) / 100);
      }
    }
  }
}

function calcBasket() {
  calcSummedAmount();
  calcSummedPrice();
  calcSubTotal();
  calcTotal();
  calcTax();
}

function calcSummedAmount() {
  summedAmount = 0;
  for (let i = 0; i < basketMenuAmount.length; i++) {
    summedAmount = summedAmount + basketMenuAmount[i];
  }
}

function calcSubTotal() {
  subtotal = 0;
  for (let i = 0; i < summedPrice.length; i++) {
    subtotal = Math.round((subtotal + summedPrice[i]) * 100) / 100;
  }
}

function calcTotal() {
  total = Math.round((subtotal + deliveryCost) * 100) / 100;
}

function calcTax() {
  tax = Math.round((total / 107) * 7 * 100) / 100;
}

//Funktionalitäts-Funktionen
function info() {
  document.getElementById("infoModal").classList.toggle("noDisplay");
  document
    .getElementById("infoButtonRestaurant")
    .classList.toggle("lightGreenBackGround");
}

function like() {
  if (favorite == true) {
    favorite = false;
  } else {
    favorite = true;
  }
  checkLike();
  storeLike();
}

function checkLike() {
  let img = document.getElementById("favoriteButtonRestaurant");
  if (favorite == true) {
    img.src = "./icons/heart(2).png";
  } else {
    img.src = "./icons/heart(3).png";
  }
}

function order() {
  if (subtotal > 100) {
    confirmOrder();
  } else {
    orderConfirmed();
  }
}

function orderConfirmed() {
  alert(`Eine Testbestellung in Höhe von ${total} Euro wurde ausgeführt`);
  cleanBasket();
  renderAll();
}

function confirmOrder() {
  if (
    confirm(
      "Ihre Bestellung übersteigt einen Warenwert 100 Euro. Bitte bestätigen Sie."
    ) == true
  ) {
    orderConfirmed();
  } else {
  }
}

function sorry() {
  alert(
    "LieferKlon verfügt noch über keine Funktionalität zum Erstellen eines Accounts oder zur Auswahl anderer Restaurants. Sorry."
  );
}

