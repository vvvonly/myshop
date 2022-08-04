class ProductList {
    constructor() {
        this.container = document.querySelector('.products-container');
        this.productsService = new ProductsService();
        this.renderProducts();
    }
    async renderProducts() {
        let productListDomString = '';
        const products = await this.productsService.getProducts();
        products.forEach(product => {
            productListDomString += this.createProductDomString(product);
        });
        this.container.innerHTML = productListDomString;
        this.addEventListeners();

    }
    createProductDomString(product) {
        return `<article class="card col-12 col-sm-6 col-sd-4 col-lg-3">
          <img src="img/${product.image}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <a href="#" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#prodact-info-modal" data-id=${product.id}>Info</a>
            <a href="#" class="btn btn-primary" data-id=${product.id}>${product.price}Buy</a>
          </div>
        </article>`;
    }
}
new ProductList();