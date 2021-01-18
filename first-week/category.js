class Category{
    constructor(name) {
        this._name = name;
        this._menus=[];
    }

    get name() {return this._name;}
    get menus() {return this._menus;}

    set name(name) {this._name = name;}
    set menus(menu){
         this._menus.push(menu);
    }
}
class Menu{
    constructor(category,name, price, image) {
        this._category = category;
        this._name = name;
        this._price = price;
        this._image = image;
        this._stock = 0;
    }

    get name() {return this._name;}
    get price() {return this._price;}
    get image() {return "src='img/" +this._category+"/"+ this._image +"'>"; }
    get category() {return this._category;}
    get stock() {return this._stock;}

    set name(name) {this._name = name;}
    set price(price) {this._price = price;}
    set image(image) {this._image = "src='img/" +this.category+"/"+ image +"'>"; }
    set category(category) {this._category = category;}
    set stock(num) {this._stock=num;}
}

//카테고리 생성
let coffee = new Category("COFFEE");
let milkBeverage = new Category("MILK BEVERAGE");
let ade = new Category("ADE");
let shake = new Category("SHAKE");

let categories=[coffee,milkBeverage,ade,shake];
let page=0;

let preCategory,currentCategory,nextCategory;
let menuList;

//메뉴 생성
let americano= new Menu(categories[0].name,"ICED Americano",3200,"ICED Americano.png");
let cafaMocha = new Menu(categories[0].name,"ICED Cafa Mocha",3900,"ICED Cafa Mocha.png");
let cafeLatte = new Menu(categories[0].name,"ICED Cafe Latte",3500,"ICED Cafe Latte.png");
let cappuccino = new Menu(categories[0].name,"ICED Cappuccino",3700,"ICED Cappuccino.png");

let blackSugarLatte = new Menu(categories[1].name,"Black Sugar Latte",3300,"Black Sugar Latte.png");
let chocolateLatte = new Menu(categories[1].name,"ICED Chocolate Latte",3700,"ICED Chocolate Latte.png");
let grainLatte = new Menu(categories[1].name,"ICED Grain Latte",3500,"ICED Grain Latte.png");
let greenTeaLatte = new Menu(categories[1].name,"ICED Green Tea Latte",3700,"ICED Green Tea Latte.png");
let sweetPotatoLatte = new Menu(categories[1].name,"ICED Sweet Potato Latte",4000,"ICED Sweet Potato Latte.png");
let whiteChocolateLatte = new Menu(categories[1].name,"ICED White Chocolate Latte",3700,"ICED White Chocolate Latte.png");

let grapefruit = new Menu(categories[2].name,"Grapefruit",3800,"Grapefruit.png");
let greenGrape = new Menu(categories[2].name,"Green Grape",3700,"Green Grape.png");
let lemon = new Menu(categories[2].name,"Lemon",3700,"Lemon.png");

let chocolateShake = new Menu(categories[3].name,"Chocolate Shake",3700,"Chocolate Shake.png");
let originShake = new Menu(categories[3].name,"Origin Shake",3700,"Origin Shake.png");
let strawberryShake = new Menu(categories[3].name,"Strawberry Shake",3700,"Strawberry Shake.png");

function init(){
    categories[0].menus=americano;
    categories[0].menus=cafaMocha;
    categories[0].menus=cafeLatte;
    categories[0].menus=cappuccino;

    categories[1].menus=blackSugarLatte;
    categories[1].menus=chocolateLatte;
    categories[1].menus=grainLatte;
    categories[1].menus=greenTeaLatte;
    categories[1].menus=sweetPotatoLatte;
    categories[1].menus=whiteChocolateLatte;

    categories[2].menus=grapefruit;
    categories[2].menus=greenGrape;
    categories[2].menus=lemon;

    categories[3].menus=chocolateShake;
    categories[3].menus=originShake;
    categories[3].menus=strawberryShake;

    menuList = document.getElementById("menuList");
    makeMenuList(categories[page].menus.length);
}
function makeMenuList(num){
    while (menuList.firstChild) {
        menuList.removeChild(menuList.firstChild);
    }
    for(let i=0;i<num;i++) {
        let newDIV = document.createElement("div");
        newDIV.innerHTML = "<div id='menuImage'><img width='30%;' "+ categories[page].menus[i].image
            +"</div> <span id='menuName'>" + categories[page].menus[i].name
            +"</span> <span id='menuPrice'>" + categories[page].menus[i].price +"</span>";
        newDIV.setAttribute("id", "menu");
        newDIV.style.fontSize = '3vw';
        menuList.appendChild(newDIV);
    }
}

function prePage(){  //이전 페이지
    page--;
    let pre= page-1;
    let next= page+1;
    if(page<0) {  //다음 페이지가 -1이면
        page = categories.length-1;
        pre=page-1;
        next=0;
    }
    else if(page==0){ //다음 페이지가 0이면
        pre=categories.length-1;
    }
    preCategory.innerHTML = '< ' + categories[pre].name;
    currentCategory.innerHTML = categories[page].name;
    nextCategory.innerHTML = categories[next].name + ' >';

    makeMenuList(categories[page].menus.length);
}

function nextPage(){  //다음 페이지
    page++;
    let pre= page-1;
    let next= page+1;
    if(page>categories.length-1) {  //다음 페이지가 초과면
        page = 0;
        pre=categories.length-1;
        next=page+1;
    }
    else if(page==categories.length-1){ //다음 페이지가 끝이면
        next=0;
    }
    preCategory.innerHTML = '< ' + categories[pre].name;
    currentCategory.innerHTML = categories[page].name;
    nextCategory.innerHTML = categories[next].name + ' >';
    console.log(pre+","+page+","+next);

    makeMenuList(categories[page].menus.length);
}

window.onload = function () {
    init();

    preCategory = document.getElementById("preCategory");  //이전 페이지
    currentCategory = document.getElementById("currentCategory");  //현재 페이지
    nextCategory = document.getElementById("nextCategory");  //다음 페이지

    preCategory.innerHTML = '< ' + categories[categories.length-1].name;
    currentCategory.innerHTML = categories[page].name;
    nextCategory.innerHTML = categories[page+1].name + ' >';
}
