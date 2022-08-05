class Cart {
    constructor() {
        if(!Cart._instance) Cart._instance = this;
        this.container = document.querySelector(".cart-container");
        this.productsService = new ProductsService();
        this.cart = JSON.parse(localStorage.getItem("cart") || "{}");
        this.addEventListeners();
        this.renderCart();
        return Cart._instance;
    }

    addEventListeners() {
        document.querySelector('.cart').addEventListener('click', this.renderCart.bind(this));
    }

    async renderCart() {
        let total = 0;
        let cartDomString = `<div class="container">
        <div class="row">
            <div class="col-5"><strong>Product</strong></div> 
            <div class="col-3"><strong>Product</strong></div>
            <div class="col-2"><strong>Product</strong></div>
        </div>`;
        for (const productId in this.cart) {
            const product = await this.productsService.getProductById(productId);
            total +=product.price * this.cart[productId];
            cartDomString += this.createCartProductDomString(product);
        }
        cartDomString +=
        `<div class="row">
            <div class="col-5"><strong>TOTAL</strong></div> 
            <div class="col-3"><strong>$${total.toFixed(2)}</strong></div>
        </div>`
        this.container.innerHTML = cartDomString;
    }
    createCartProductDomString(product) {
        return `<div class="row" data-id="${id}">
        <div class="col-5">${product.title}</div> 
        <div class="col-3">${product.price}</div>
        <div class="col-2">${this.cart[id]}</div> `
    }
}