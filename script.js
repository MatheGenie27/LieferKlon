"use strict";
//Variablen

// Warenkorb

let basketMenuID = [];
let basketMenuAmount = [];
let summedPrice=[];
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

function scroll(){
    let basket=document.getElementById('basket');
    
    topPosition = window.scrollY;
    console.log(topPosition);
   
    

    if (topPosition >=100 ){
        console.log("BasketScrolled");
        basket.classList.remove('basketUnscrolled');
        basket.classList.add('basketScrolled');
    } else {
        console.log("BasketUnscrolled");
        basket.classList.add('basketUnscrolled');
        basket.classList.remove('basketScrolled');

    }
}







//onload Functions

function onload(){
    loadStorage('content');
    loadStorage('basket');
    renderContent();
    renderBasket();
    renderFooterToBasket();
    checkMobileBasket();
    
}





//LocalStorage

function loadStorage(element){

}

function storeStorage(){

}

//Modals

function openModalBasket(){
    scrollTo(0,0);
    document.getElementById('modalBasket').classList.remove('noDisplay');
    renderAll();
    
}

function closeModalBasket(){
    document.getElementById('modalBasket').classList.add('noDisplay');
    document.getElementById('modalBasket').innerHTML='';
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
        

        
        
        for(let index = 0; index < basketMenuID.length; index++){
            
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

function renderBasketFooter(){
    document.getElementById('basketFooter').innerHTML = basketFootHTML();
}




function renderMobileBasket(){
    let content = document.getElementById('modalBasketContent');
    content.innerHTML = '';
    content.innerHTML += mobileBasketHeadandTableAndFooter();

    let table = document.getElementById('mobileBasketTable');
      
    

    if (basketMenuID.length>0){
           
        for(let index = 0; index < basketMenuID.length; index++){
            
            table.innerHTML += basketContentHTML(index);
            }
        
        table.innerHTML += basketCalcHTML();    
            
        


    } else {
        content.innerHTML += `
            <div id="callToOrder"> Bitte fügen Sie Waren zum Warenkorb hinzu.</div>
        `;
        
    }

    renderMobileBasketFooter()
    

}


function renderMobileBasketFooter(){
    let content = document.getElementById('mobileBasketFooter');
    content.innerHTML ='';
    content.innerHTML += MobileBasketFooterHTML();

}


function renderFooterToBasket(){
    let content = document.getElementById('footerToBasket');
    content.innerHTML='';
    content.innerHTML += footerToBasketHTML();
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
    <div class="categoryContainer">
        <div class="categoryImage">
            <img class="categoryImgImg" id="categoryImg${menus[index].categoryName}" src="${menus[index].categoryImage}">
        </div>
    
        <div class="categoryName"> 
            ${menus[index].categoryName} 
        </div>
        
    
    </div>
    
    `;
}





function basketContentHTML(index){
    
    return `
        <tr>
            <td width="30"><div class="amountButtonBasket" id="" onclick="deleteFromBasket(${basketMenuID[index]})">-</div></td>
            <td align=center width="30">${basketMenuAmount[index]} </td>
            <td width="30"><div class="amountButtonBasket" id="" onclick="addToBasket(${basketMenuID[index]})">+</div></td>
            <td>${getMenuName(basketMenuID[index])} </td>
            <td align=right width="100">${summedPrice[index].toFixed(2)} € </td>
        </tr>
    

    `;
}

function basketCalcHTML(){
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

function basketFootHTML(){
    
    if (subtotal > 0){
    
    return `
   

    <div id="basketFoot">Diese Summe beinhaltet 7% Mehrwertsteuer in Höhe von ${tax.toFixed(2)} €.</div>

    <div id="orderButtonBasketRow">    
        <div id="orderButtonBasket" class="orderButton" onclick="order()"><img id="orderButtonIcon" src="./icons/truck-moving.png">Jetzt kostenpflichtig bestellen</div>    
    </div>    
    `;}
    else return '';
}




function menuHTML(index){
    return  `
    <div class="menuContainer">
        <div class="menuContainerHeadRow">
            <div class= "menuContainerHeadName"> 
                ${menus[index].menuName}
            </div>
            <div class= "menuContainerAddButton" id="addButton${menus[index].menuID}" onclick="addToBasket(${menus[index].menuID})">
                ${menuAddSymbol(menus[index].menuID)}
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



function footerToBasketHTML(){
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

function mobileBasketHeadandTableAndFooter(){
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

function mobileBasketHTML(){

}

function MobileBasketFooterHTML(){
    if (subtotal > 0){
    
        return `
       
    
        <div id="mobileBasketFoot">Diese Summe beinhaltet 7% Mehrwertsteuer in Höhe von ${tax.toFixed(2)} €.</div>
    
        <div id="mobileOrderButtonBasketRow">    
            <div id="mobileOrderButtonBasket" class="orderButton" onclick="order()"><img id="orderButtonIcon" src="./icons/truck-moving.png">Jetzt kostenpflichtig bestellen </div>    
        </div>    
        `;}
        else return '';
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

function renderAll(){
    calcBasket();
    
    renderBasket();
    
    if(document.getElementById('modalBasket').className!='noDisplay'){
    renderMobileBasket();}
    renderContent();
    renderFooterToBasket();
}


function cleanBasket(){
    basketMenuAmount=[];
    basketMenuID=[];
    summedPrice=[];
    summedAmount = 0; 
    subtotal = 0;
    total =0;
    tax =0;
    
}


function menuAddSymbol(ID){
    if (getIndexOfBasket(ID)>-1){
        return basketMenuAmount[getIndexOfBasket(ID)];
    } else {return '<img id="addSymbol" src="./icons/plus.png">'}
}


function addToBasket(thisID){
      
    for (let i = 0; i < menus.length; i++){
        if (menus[i].menuID == thisID){
            
            if(getIndexOfBasket(thisID)>-1){
                let index = getIndexOfBasket(thisID);
                basketMenuAmount[index]=basketMenuAmount[index]+1;
                
            } else {            
            basketMenuID.push(thisID);
            basketMenuAmount.push(1);
            }
        }
    
    }
    
    
    renderAll();
    

}



function getIndexOfBasket(ID){
    
    for (let index = 0; index < basketMenuID.length; index++){
        
        if(basketMenuID[index]==ID){
            console.log()
            return index;
        } 
    }  return -1;
    
    
}

function deleteFromBasket(element){

    let index = getIndexOfBasket(element);
    
    if (basketMenuAmount[index]>1){
        basketMenuAmount[index]=basketMenuAmount[index]-1;
    } else { 
        basketMenuAmount.splice(index, 1);
        basketMenuID.splice(index,1);
    }

    
    renderAll();
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
    calcSummedAmount();
    calcSummedPrice();
    calcSubTotal();
    calcTotal();
    calcTax();
}

function calcSummedAmount(){
    summedAmount = 0;
    for (let i =0; i< basketMenuAmount.length; i++){
        
        summedAmount = summedAmount + basketMenuAmount[i];
    }  
}

function calcSubTotal(){
   subtotal = 0;
    for (let i =0; i<summedPrice.length; i++){
        
        subtotal = Math.round((subtotal + summedPrice[i])*100)/100;
    }  
    

}

function calcTotal(){
    total = Math.round((subtotal + deliveryCost) *100)/100;
}

function calcTax(){
    tax = Math.round(total / 107 * 7 *100)/100;
}



//Funktionalitäts-Funktionen


function like(){
     let img= document.getElementById('favoriteButtonRestaurant');
    
    if (favorite==true){
       
        img.src="./icons/heart(3).png"
        favorite = false;
    } else {
        img.src="./icons/heart(2).png"
        favorite=true;
    }
}

function order(){
    console.log("bestellt");

    alert(`Eine Testbestellung in Höhe von ${total} Euro wurde ausgeführt`);

    cleanBasket();
    renderAll();

}

function sorry(){
    alert("LieferKlon verfügt noch über keine Funktionalität zum Erstellen eines Accounts oder zur Auswahl anderer Restaurant. Sorry.");
}


//Daten

//Menü-Daten


let menus = [

    {
        type: 'category',
        categoryName: 'Vorspeisen',
        categoryImage: './img/tomatoes-1580273_1280.jpg'

    },



    {  
    type:'menu',    
    menuID: 1,
    menuCategory: 'category1',    
    menuName: 'Minestra di patate e verdure',
    menuDescription: 'menuDescription1',
    menuImage: './img/potato-soup-2152254_1280.jpg',
    menuPrice: '14.99'
    },

    {type:'menu',    
    menuID: 2,
    menuCategory: 'category1',    
    menuName: 'Selezione di antipasti',
    menuDescription: 'menuDescription1',
    menuImage: './img/melon-1524328_640.jpg',
    menuPrice: '17.99'
    },

    {type:'menu',    
    menuID: 3,
    menuCategory: 'category1',    
    menuName: 'Insalata Caprese',
    menuDescription: 'menuDescription1',
    menuImage: './img/salad-2487759_1280.jpg',
    menuPrice: '17.99'
    },



    {
        type: 'category',
        categoryName: 'Hauptgerichte',
        categoryImage: './img/mediterranean-cuisine-2378758_1920.jpg'

    },

    {  
        type:'menu',    
        menuID: 4,
        menuCategory: 'category2',    
        menuName: 'Bistecca di manzo',
        menuDescription: 'menuDescription1',
        menuImage: './img/food-3676796_1280.jpg',
        menuPrice: '14.99'
        },
    
        {type:'menu',    
        menuID: 5,
        menuCategory: 'category2',    
        menuName: 'Pizza Margherita',
        menuDescription: 'menuDescription1',
        menuImage: './img/pizza-5275191_1280.jpg',
        menuPrice: '17.99'
        },
    
        {type:'menu',    
        menuID: 6,
        menuCategory: 'category2',    
        menuName: 'Spaghetti al pomodoro con funghi e mandorle',
        menuDescription: 'menuDescription1',
        menuImage: './img/pasta-1533271_1280.jpg',
        menuPrice: '17.99'
        },

        {type:'menu',    
        menuID: 7,
        menuCategory: 'category2',    
        menuName: 'Spiedini di verdure grigliate',
        menuDescription: 'menuDescription1',
        menuImage: './img/vegetable-skewer-3317060_640.jpg',
        menuPrice: '17.99'
        },


        {
            type: 'category',
            categoryName: 'Nachtisch',
            categoryImage: './img/ai-generated-8587027_1280.png'
    
        },
    
    
    
        {  
        type:'menu',    
        menuID: 8,
        menuCategory: 'category3',    
        menuName: 'Tiramisu',
        menuDescription: 'menuDescription1',
        menuImage: './img/dessert-3331009_1280.jpg',
        menuPrice: '7.99'
        },
    
        {type:'menu',    
        menuID: 9,
        menuCategory: 'category3',    
        menuName: 'Bigné allungata',
        menuDescription: 'menuDescription1',
        menuImage: './img/eclair-3366430_640.jpg',
        menuPrice: '5.99'
        },
    
        {type:'menu',    
        menuID: 10,
        menuCategory: 'category3',    
        menuName: 'Crema di fragole con frutti di bosco',
        menuDescription: 'menuDescription1',
        menuImage: './img/strawberry-dessert-2191973_640.jpg',
        menuPrice: '12.99'
        }


];






            







