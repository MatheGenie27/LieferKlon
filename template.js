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
  