"use strict";

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

    if (basketMenuID[0]){
        content.innerHTML += `<table id="basketTable"> </table>`;

        let table = document.getElementById('basketTable');
        table.innerHTML += `<tr>Hallo</tr>`;

    for(let index = 0; index < basket.length; index++){
            table.innerHTML += basketContentHTML(index);
        }


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
    return `
        <tr>
            <td>Eintrag 1 </td>
            <td>Eintrag 2 </td>
        </tr>
    

    `;
}

function basketFootHTML(){
    return `
   

    <div id="basketFoot">Diese Summe beinhaltet 7% Mehrwertsteuer in Höhe von ${basketCalc.tax}.</div>
    `;
}




function menuHTML(index){
    return  `
    <div>Ich bin das Menü HTML</div>
    <div> ${menus[index].menuName}</div>
    `;
}

function basketHMTL(){
    return `
    Ich bin das Warenkorb HTML
    
    `;
}

//Datenmanipulation

function addToBasket(element){


}

function deleteFromBasket(element){

}

function calcSummedPrice(){

}

function calcSubTotal(){

}

function calcTotal(){

}

function calcTax(){
    
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
    menuID: 'id1',
    menuCategory: 'category1',    
    menuName: 'menuName1',
    menuDescription: 'menuDescription1',
    menuImage: 'ImageUrl1',
    menuPrice: '14,99'



    },

    {}
];

// Warenkorb
let basketMenuID = [];
let basketMenuAmount = [];
let basketMenuAnnotation =[];
     




            






let basketCalc = [{
                subtotal: '',
                deliveryCost: '',
                total: '',
                tax: ''
            
            }

]

