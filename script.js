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

//templateHTML

function menuContentHTML(index) {
  if (menus[index].type == "menu") {
    return menuHTML(index);
  } else if (menus[index].type == "category") {
    return categoryyHTML(index);
  } else {
    return `
        <div> Menü-Daten fehlerhaft oder nicht verfügbar </div>
        `;
  }
}

function categoryyHTML(index) {
  return `
    <div id="${menus[index].categoryName}" class="categoryContainer">
        <div class="categoryImage">
            <img class="categoryImgImg" id="categoryImg${menus[index].categoryName}" src="${menus[index].categoryImage}">
        </div>
    
        <div class="categoryName"> 
            ${menus[index].categoryName} 
        </div>
        
    
    </div>
    
    `;
}

function basketContentHTML(index) {
  return `
        <tr>
            <td width="30"><div class="amountButtonBasket" id="" onclick="deleteFromBasket(${
              basketMenuID[index]
            })">-</div></td>
            <td align=center width="30">${basketMenuAmount[index]} </td>
            <td width="30"><div class="amountButtonBasket" id="" onclick="addToBasket(${
              basketMenuID[index]
            })">+</div></td>
            <td>${getMenuName(basketMenuID[index])} </td>
            <td align=right width="100">${summedPrice[index].toFixed(2)} € </td>
        </tr>
    

    `;
}

function basketCalcHTML() {
  return `
     <tr>
        <td colspan=5><hr></td>
     </tr>
     <tr>
        <td colspan="4">Zwischensumme </td>
        <td align=right> ${subtotal.toFixed(2)} € </td>
     </tr>
     <tr>
        <td colspan="4">Lieferung </td>
        <td align=right> ${deliveryCost.toFixed(2)} €</td>
     </tr>
     <tr>
        <td colspan=4> </td>
        <td ><hr></td>
     </tr>
     <tr>  
        <td colspan="4">Total</td>
        <td id="totalCost" align=right> ${total.toFixed(2)} €</td> 
     </tr>
     `;
}

function basketFootHTML() {
  if (subtotal > 0) {
    return `
   

    <div id="basketFoot">Diese Summe beinhaltet 7% Mehrwertsteuer in Höhe von ${tax.toFixed(
      2
    )} €.</div>

    <div id="orderButtonBasketRow">    
        <div id="orderButtonBasket" class="orderButton" onclick="order()"><img id="orderButtonIcon" src="./icons/truck-moving.png">Jetzt kostenpflichtig bestellen</div>    
    </div>    
    `;
  } else return "";
}

function menuHTML(index) {
  return `
    <div class="menuContainer">
        <div class="menuContainerHeadRow">
            <div class= "menuContainerHeadName"> 
                ${menus[index].menuName}
            </div>
            <div class= "menuContainerAddButton" id="addButton${
              menus[index].menuID
            }" onclick="addToBasket(${menus[index].menuID})">
                ${menuAddSymbol(menus[index].menuID)}
            </div>
        </div>
        <div class="menuContainerDescriptionRow">
            <div class="menuContainerDescriptionText">${
              menus[index].menuDescription
            }</div>
            <div class="menuContainerDescriptionImage"> <img class= "menuImage" id="menuImage${index}" src="${
    menus[index].menuImage
  }"> </div>
        </div>
        <div class="menuContainerPriceRow">
            <div class="menuContainerPrice">
                ${menus[index].menuPrice} €
            </div>
        </div>
    </div>
    `;
}

function footerToBasketHTML() {
  return `
    <div id="buttonToBasket" onclick="openModalBasket()"> 
        <div id="buttonToBasketDescription" >
            <div> <img id="basketIconmobileFooter" src="./icons/shopping-bag.png"> </div>
            <div id="buttonToBasketText">Zum Warenkorb</div>
            <div id="mobileFooterToBasketAmount">${summedAmount}</div>
        </div> 
    </div>
    
    `;
}

function mobileBasketHeadandTableAndFooter() {
  return `
    <div id="mobileBasketContainer">
        <div><img id="modalCloseIcon" src="./icons/cross.png" onclick="closeModalBasket()" title="Warenkorb verlassen"></div>
        <div id="mobileBasketHead"><img class="basketIcon" src="./icons/shopping-bag.png">Warenkorb</div>
        <table id="mobileBasketTable">
        </table>
        <div id="mobileBasketFooter">
        </div>
    </div>
    `;
}

function MobileBasketFooterHTML() {
  if (subtotal > 0) {
    return `
       <div id="mobileBasketFoot">Diese Summe beinhaltet 7% Mehrwertsteuer in Höhe von ${tax.toFixed(
         2
       )} €.</div>
       <div id="mobileOrderButtonBasketRow">    
            <div id="mobileOrderButtonBasket" class="orderButton" onclick="order()"><img id="orderButtonIcon" src="./icons/truck-moving.png">Jetzt kostenpflichtig bestellen </div>    
        </div>    
        `;
  } else return "";
}

function menuAddSymbol(ID) {
  if (getIndexOfBasket(ID) > -1) {
    return basketMenuAmount[getIndexOfBasket(ID)];
  } else {
    return '<img id="addSymbol" src="./icons/plus.png">';
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

//Daten
//Menü-Daten

let menus = [
  {
    type: "category",
    categoryName: "Vorspeisen",
    categoryImage: "./img/tomatoes-1580273_1280.jpg",
  },

  {
    type: "menu",
    menuID: 1,
    menuCategory: "category1",
    menuName: "Minestra di patate e verdure",
    menuDescription: "Kartoffelsuppe mit frischem Gemüse",
    menuImage: "./img/potato-soup-2152254_1280.jpg",
    menuPrice: "6.99",
  },

  {
    type: "menu",
    menuID: 2,
    menuCategory: "category1",
    menuName: "Selezione di antipasti",
    menuDescription:
      "Gemischte Vorspeisenplatte mit Honigmelone, Parmaschinken und Oliven",
    menuImage: "./img/melon-1524328_640.jpg",
    menuPrice: "12.99",
  },

  {
    type: "menu",
    menuID: 3,
    menuCategory: "category1",
    menuName: "Insalata Caprese",
    menuDescription:
      "Leckerer Salat aus knackigen Tomaten, saftigem Mozarella und frischem Baslikum",
    menuImage: "./img/salad-2487759_1280.jpg",
    menuPrice: "7.99",
  },

  {
    type: "category",
    categoryName: "Hauptgerichte",
    categoryImage: "./img/mediterranean-cuisine-2378758_1920.jpg",
  },

  {
    type: "menu",
    menuID: 4,
    menuCategory: "category2",
    menuName: "Bistecca di manzo",
    menuDescription: "Saftiges Steak vom Rind, medium gebraten",
    menuImage: "./img/food-3676796_1280.jpg",
    menuPrice: "24.99",
  },

  {
    type: "menu",
    menuID: 5,
    menuCategory: "category2",
    menuName: "Pizza Margherita",
    menuDescription:
      "Die Traditionelle! Pizza belegt mit Tomaten, Mozarella und Basilikum, den Nationalfarben Italiens",
    menuImage: "./img/pizza-5275191_1280.jpg",
    menuPrice: "11.99",
  },

  {
    type: "menu",
    menuID: 6,
    menuCategory: "category2",
    menuName: "Spaghetti al pomodoro con funghi e mandorle",
    menuDescription:
      "Hausgemachte Spaghetti in Tomaten-Pilzsoße, garniert mit Mandelsplittern",
    menuImage: "./img/pasta-1533271_1280.jpg",
    menuPrice: "13.99",
  },

  {
    type: "menu",
    menuID: 7,
    menuCategory: "category2",
    menuName: "Spiedini di verdure grigliate",
    menuDescription: "Gegrillte Gemüsespieße",
    menuImage: "./img/vegetable-skewer-3317060_640.jpg",
    menuPrice: "10.99",
  },

  {
    type: "category",
    categoryName: "Nachtisch",
    categoryImage: "./img/ai-generated-8587027_1280.png",
  },

  {
    type: "menu",
    menuID: 8,
    menuCategory: "category3",
    menuName: "Tiramisu",
    menuDescription: "Italienischer geht nicht: Tiramisu, la dolce vita!",
    menuImage: "./img/dessert-3331009_1280.jpg",
    menuPrice: "9.99",
  },

  {
    type: "menu",
    menuID: 9,
    menuCategory: "category3",
    menuName: "Bigné allungata",
    menuDescription: "Italienische Version des französischen Eclaires",
    menuImage: "./img/eclair-3366430_640.jpg",
    menuPrice: "7.99",
  },

  {
    type: "menu",
    menuID: 10,
    menuCategory: "category3",
    menuName: "Crema di fragole con frutti di bosco",
    menuDescription: "Erdbeerquark mit frischen Früchten",
    menuImage: "./img/strawberry-dessert-2191973_640.jpg",
    menuPrice: "5.99",
  },
];
