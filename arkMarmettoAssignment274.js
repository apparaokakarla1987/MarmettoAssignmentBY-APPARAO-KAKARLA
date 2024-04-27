let thumbnailContainerEl = document.getElementById("thumbnailContainer");
let formContainerEl = document.getElementById("formContainer");
let imageContainerEl = document.getElementById("imageContainer");

let cartMessageEl;
let quantityEl;
let productImgEl;

let formData = {
    color: "",
    size: "",
};

function createAndAppendResources(jsonData) {
    //object detructioning
    const {
        vendor,
        title,
        price,
        compare_at_price,
        images,
        options,
        description
    } = jsonData.product;
    //image container

    productImgEl = document.createElement("img");
    productImgEl.src = images[0].src;
    productImgEl.alt = "image";
    productImgEl.classList.add("product-image-style");
    imageContainerEl.appendChild(productImgEl);

    //iterating for thumbnail images
    for (let image of images) {
        console.log(Object.values(image)[0]);
        let imgEl = document.createElement("img");
        imgEl.src = Object.values(image)[0];
        imgEl.alt = "image";
        imgEl.classList.add("thumbnail-image-style");
        thumbnailContainerEl.appendChild(imgEl);
        imgEl.onclick= function(){
            productImgEl.src=Object.values(image)[0];
        };
    }
    //form elements

    //product vendor
    let productVendorEl = document.createElement("h1");
    productVendorEl.textContent = vendor;
    productVendorEl.classList.add("product-vendor-heading");
    formContainerEl.appendChild(productVendorEl);

    //product title
    let productTitleEl = document.createElement("h1");
    productTitleEl.textContent = title;
    productTitleEl.classList.add("product-title-heading");
    formContainerEl.appendChild(productTitleEl);

    //line 
    let lineEl = document.createElement("hr");
    lineEl.classList.add("line");
    formContainerEl.appendChild(lineEl);

    //price
    let priceEl = document.createElement("h1");
    priceEl.textContent = price;
    priceEl.classList.add("price-heading");
    formContainerEl.appendChild(priceEl);

    //percentage off 
    let percentageEl = document.createElement("span");
    let a = parseInt(price.slice(1, price.length));
    let b = parseInt(compare_at_price.slice(1, compare_at_price.length));
    let percentage = Math.ceil((b - a) * 100 / b);
    percentageEl.textContent = `${percentage}% Off`;
    percentageEl.classList.add("percentage-style");
    formContainerEl.appendChild(percentageEl);

    //compare at price
    let comparePriceEl = document.createElement("h1");
    comparePriceEl.textContent = compare_at_price;
    comparePriceEl.classList.add("comparePrice-heading");
    formContainerEl.appendChild(comparePriceEl);

    //line 
    let line2El = document.createElement("hr");
    line2El.classList.add("line");
    formContainerEl.appendChild(line2El);

    //color selector heading
    let colorSelectorHeadingEl = document.createElement("h1");
    colorSelectorHeadingEl.textContent = "Choose a Color";
    colorSelectorHeadingEl.classList.add("color-selector-heading");
    formContainerEl.appendChild(colorSelectorHeadingEl);

    //color box conatiner
    let colorBoxContainerEl = document.createElement("div");
    colorBoxContainerEl.classList.add("color-box-container");
    formContainerEl.appendChild(colorBoxContainerEl);

    //color box
    for (let color of options[0].values) {
        let colorBoxEl = document.createElement("button");
        colorBoxEl.id = color;
        colorBoxEl.type = "button";
        colorBoxEl.style.backgroundColor = Object.values(color)[0];
        colorBoxEl.classList.add("color-box");
        colorBoxContainerEl.appendChild(colorBoxEl);

        //event Listerner for color box
        colorBoxEl.onclick = function() {
            formData.color = Object.keys(color)[0];
            let tickImgEl = document.createElement("img");
            tickImgEl.src = "https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1%3Atick?source=image-url-builder";
            tickImgEl.alt = "tick";
            tickImgEl.classList.add("tick-image");
            colorBoxEl.appendChild(tickImgEl);
            colorBoxEl.classList.add("color-box-selected");
        };

    }

    //line 
    let line3El = document.createElement("hr");
    line3El.classList.add("line");
    formContainerEl.appendChild(line3El);

    //choose a size heading
    let chooseSizeHeadingEl = document.createElement("h1");
    chooseSizeHeadingEl.textContent = "Choose a Size";
    chooseSizeHeadingEl.classList.add("choose-size-heading");
    formContainerEl.appendChild(chooseSizeHeadingEl);

    // size container
    let sizeContainerEl = document.createElement("div");
    sizeContainerEl.classList.add("size-box-container");
    formContainerEl.appendChild(sizeContainerEl);

    // size selector

    for (let size of options[1].values) {

        let radioContainerEl = document.createElement("div");
        radioContainerEl.classList.add("radio-box-container");
        sizeContainerEl.appendChild(radioContainerEl);

        //input radio element
        let inputRadioEl = document.createElement("input");
        inputRadioEl.type = "radio";
        inputRadioEl.id = size;
        inputRadioEl.name = "size";
        inputRadioEl.value = "size";
        inputRadioEl.classList.add("input");
        radioContainerEl.appendChild(inputRadioEl);

        //Event listener for radio input
        inputRadioEl.addEventListener("change", function(event) {
            formData.size = event.target.value;
        });

        //label Element
        let labelEl = document.createElement("label");
        labelEl.htmlfor = size;
        labelEl.textContent = size;
        labelEl.classList.add("label-style");
        radioContainerEl.appendChild(labelEl);
    }

    //Quantity Selector
    //Main div

    let mainButtonContainerEl = document.createElement("div");
    mainButtonContainerEl.classList.add("main-button-container");
    formContainerEl.appendChild(mainButtonContainerEl);

    //div
    let buttonContainerEl = document.createElement("div");
    buttonContainerEl.classList.add("button-container");
    mainButtonContainerEl.appendChild(buttonContainerEl);

    //<button>-</button>
    let minusButtonEl = document.createElement("button");
    minusButtonEl.textContent = "-";
    minusButtonEl.type = "button";

    minusButtonEl.classList.add("minusButton");
    buttonContainerEl.appendChild(minusButtonEl);

    //<p><p>
    quantityEl = document.createElement("p");
    quantityEl.textContent = "1";
    quantityEl.classList.add("quantity-style");
    buttonContainerEl.appendChild(quantityEl);

    //<button>+</button>
    let plusButtonEl = document.createElement("button");
    plusButtonEl.textContent = "+";
    plusButtonEl.type = "button";
    plusButtonEl.classList.add("minusButton");
    buttonContainerEl.appendChild(plusButtonEl);

    minusButtonEl.onclick = function() {
        if (parseInt(quantityEl.textContent) > 0) {
            let updatedQuantity = parseInt(quantityEl.textContent) - 1
            quantityEl.textContent = updatedQuantity;
        }

    }

    //Plus Button Event Listener
    plusButtonEl.onclick = function() {
        let updatedQuantity = parseInt(quantityEl.textContent) + 1
        quantityEl.textContent = updatedQuantity;

    }

    //Add to cart Button

    let addTocartButtonEl = document.createElement("button");
    addTocartButtonEl.type = "submit";
    addTocartButtonEl.textContent = "Add to Cart";
    addTocartButtonEl.classList.add("minusButton", "add-cart-button");
    mainButtonContainerEl.appendChild(addTocartButtonEl);

    //cartMessage
    cartMessageEl = document.createElement("p");
    cartMessageEl.textContent = "";
    cartMessageEl.classList.add("cart-message");
    formContainerEl.appendChild(cartMessageEl);


    //description
    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("description");
    formContainerEl.appendChild(descriptionEl);

}


const url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448";

const getPetData = async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    createAndAppendResources(jsonData);

};

getPetData();

function submitFormData(formData) {

    cartMessageEl.textContent = `EmbracedSide bar with color ${formData.color} and Size ${formData.size} added to cart`;
    cartMessageEl.classList.add("cart-message-update")

}


formContainerEl.addEventListener("submit", function(event) {
    event.preventDefault();
    submitFormData(formData);
});
