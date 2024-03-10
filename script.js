"use strict";
//Variablen

// Warenkorb
let basketPosition = 0;
let basketMenuID = [];
let basketMenuAmount = [];
let summedPrice=[];
 
let subtotal = 0;
let deliveryCost = 2.99;
let total;
let tax;

//onload Functions

function onload(){
    loadStorage('content');
    loadStorage('basket');
    renderContent();
    renderBasket();
    
}


//LocalStorage

function loadStorage(element){

}

function storeStorage(){

}




//renderFunctions

function renderContent(){
    let content = document.getElementById('restaurantContent');
    content.innerHTML = ``;

    for(let index = 0; index < menus.length; index++){
    content.innerHTML += menuContentHTML(index);
    }

}

function renderBasket(){
    let content = document.getElementById('basketContent');
    content.innerHTML= ``;
    content.innerHTML += `<table id="basketTable"> </table>`;
    let table = document.getElementById('basketTable');

      
    
    if (basketMenuID.length>0){
        

        
        //table.innerHTML += basketTableHTML();

        for(let index = 0; index < basketMenuID.length; index++){
            
            table.innerHTML += basketContentHTML(index);
            }
        
        table.innerHTML += basketCalcHTML();    
            
        renderBasketFooter();


    } else {
        content.innerHTML += `
            <div> Bitte fügen Sie Waren zum Warenkorb hinzu.</div>
        `;
    }


    

    
    
}

function renderBasketFooter(){
    document.getElementById('basketFooter').innerHTML = basketFootHTML();
}




//templateHTML

function menuContentHTML(index){
    if (menus[index].type == 'menu'){
        return menuHTML(index);
    } else if (menus[index].type == 'category'){
        return categoryyHTML(index);
    } else {
        return `
        <div> Menü-Daten fehlerhaft oder nicht verfügbar </div>
        `;
    }
}

function categoryyHTML(index){
    return `
    <div> Ich bin eine Kategorie </div>
    <div> ${menus[index].categoryName} <div>
    `;
}





function basketContentHTML(index){
    console.log(`Füge Tabelleninhalt hinzu für Index ${index}`)
    return `
        <tr>
            <td><div class="amountButtonBasket" id="" onclick="deleteFromBasket(${basketMenuID[index]})">-</div></td>
            <td>${basketMenuAmount[index]} </td>
            <td><div class="amountButtonBasket" id="" onclick="addToBasket(${basketMenuID[index]})">+</div></td>
            <td>${getMenuName(basketMenuID[index])} </td>
            <td>${summedPrice[index]} </td>
        </tr>
    

    `;
}

function basketCalcHTML(){
     return `
     <tr>
        <td colspan="4">Zwischensumme </td>
        <td> ${subtotal} </td>
     </tr>
     <tr>
        <td colspan="4">Lieferung </td>
        <td> ${deliveryCost}</td>
     </tr>
     <tr>  
        <td colspan="4">Total</td>
        <td> ${total}</td> 
     </tr>
     `;
}

function basketFootHTML(){
    return `
   

    <div id="basketFoot">Diese Summe beinhaltet 7% Mehrwertsteuer in Höhe von ${tax}.</div>
    `;
}




function menuHTML(index){
    return  `
    <div class="menuContainer">
        <div class="menuContainerHeadRow">
            <div class= "menuContainerHeadName"> 
                ${menus[index].menuName}
            </div>
            <div class= "menuContainerAddButton" id="addButton${menus[index].menuID}" onclick="addToBasket(${menus[index].menuID})">
                addButton
            </div>
        </div>
        <div class="menuContainerDescriptionRow">
            <div class="menuContainerDescriptionText">${menus[index].menuDescription}</div>
            <div class="menuContainerDescriptionImage"> <img class= "menuImage" id="menuImage${index}" src="${menus[index].menuImage}"> </div>
        </div>
        <div class="menuContainerPriceRow">
            <div class="menuContainerPrice">
                ${menus[index].menuPrice} €
            </div>
        </div>
    </div>
    `;
}

function basketHMTL(){
    return `
    Ich bin das Warenkorb HTML
    
    `;
}

//Datenabfrage
function getMenuName(id){
    for (let i = 0; i < menus.length; i++){
        if (menus[i].menuID== id){
            return menus[i].menuName;
        }
    }
}



//Datenmanipulation

function addToBasket(thisID){
      
    for (let i = 0; i < menus.length; i++){
        if (menus[i].menuID == thisID){
            basketPosition++;
            basketMenuID.push(thisID);
            basketMenuAmount.push(1);
        }
    
    }
    console.log(`Es wurden hinzugefügt ID ${basketMenuID}, Menge +1`);
    
    
    calcBasket();
    renderBasket();
    

}

function deleteFromBasket(element){


    console.log(`Es wurden entfernt ID ${basketMenuID}, Menge -1}`);
    calcBasket();
    renderBasket();
}

function calcSummedPrice(){
    summedPrice = [];
    
    for (let i = 0; i < basketMenuID.length; i++ ){
        for (let j = 0; j <menus.length; j++){
            if(basketMenuID[i] == menus[j].menuID){
                let price = menus[j].menuPrice;
                let amount = basketMenuAmount[i];
                summedPrice.push(Math.round(price * amount * 100)/100);

            }
        }
    }

    
}

function calcBasket(){
    calcSummedPrice();
    calcSubTotal();
    calcTotal();
    calcTax();
}

function calcSubTotal(){
   subtotal = 0;
    for (let i =0; i<summedPrice.length; i++){
        console.log("Rechenschritt Zwischensumme");
        subtotal = Math.round((subtotal + summedPrice[i])*100)/100;
    }  
    console.log(summedPrice)
    console.log(`Zwischensumme ${subtotal}`);

}

function calcTotal(){
    total = Math.round((subtotal + deliveryCost) *100)/100;
}

function calcTax(){
    tax = Math.round(total / 107 * 7 *100)/100;
}



//Daten

//Menü-Daten


let menus = [

    {
        type: 'category',
        categoryName: 'categoryName',
        categoryImage: 'urlCategoryImage'

    },



    {  
    type:'menu',    
    menuID: 1,
    menuCategory: 'category1',    
    menuName: 'menuName1',
    menuDescription: 'menuDescription1',
    menuImage: 'ImageUrl1',
    menuPrice: '14.99'



    },

    {type:'menu',    
    menuID: 2,
    menuCategory: 'category1',    
    menuName: 'menuName2',
    menuDescription: 'menuDescription1',
    menuImage: 'ImageUrl2',
    menuPrice: '17.99'}
];






            







