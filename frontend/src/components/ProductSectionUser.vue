<script>

  export default {

    created() {
      this.getProducts()
    },
    data() {
      return {
        productList: [],
      }
    },
    methods: {
      async getProducts() {
      const data = await fetch('http://localhost:3000/api/products')
      this.productList = await data.json()
    },
  }

  }
</script>

<template>
  <div id="main-container">
    <div id="products-container" v-for="product in productList" :key="product.product_Id">
      <img class="product-images" :src="product.productImg" alt="product image" />
      <div id="product-info-container">
        <div class="title-price-container">
          <a :href="product.productURL" target="_blank">{{ product.productName }}</a>
        </div>
        <div class="title-price-container">
          <p>{{ product.categoryName }}</p>
        </div>
        <div style="margin-top: auto;" class="wish-amount-container">
          <p>Wished amount: 0</p>
        </div>
      </div>
      <div style="margin-left: auto;" id="product-info-container">
        <div class="title-price-container">
          <h4 style="margin-left: auto; font-weight: 400;">
            {{ product.productPrice }}:-
          </h4>
        </div>
        <div class="edit-product-icon">
          <img
            src="/assets/edit-button-svgrepo-com.svg"
            alt="happy hikers logo"
          />
        </div>
      </div>
    </div>
  </div>
  <GreetingMessage v-if="greetingsWindow" @submit-greeting="updateGreetingsWindow" />
</template>

<style scoped>
  #products-container {
    width: 95%;
    display: flex;
    box-shadow: 1px 1px 4px rgb(143, 143, 143);
    margin: 25px 15px;
  }

  #product-info-container {
    margin: 8px 8px 15px 0px;
    display: flex;
    flex-direction: column;

  }

  .title-price-container {
    display: flex;
    margin: 4px 0px;
  }

  .title-price-container p {
    color: grey;
  }

  .wish-amount-container {
    margin-top: 3px;
    width: 100%;
  }

  p,
  a,
  h4 {
    margin: 3px;
    padding: 0px;
  }

  .product-images {
    width: 125px;
    height: 125px;
    align-self: center;
  }
.edit-product-icon {
  margin-top: auto;
  margin-left: auto;
}

</style>
