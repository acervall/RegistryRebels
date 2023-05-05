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
        console.log(this.productList)
      },
    },
  }
</script>

<template>
  <div id="main-container">
    <div
      id="products-container"
      v-for="product in productList"
      :key="product.product_Id"
    >
      <img :src="product.productImg" alt="product image" />
      <div id="product-info-container">
        <div class="title-price-container">
          <a :href="product.productURL" target="_blank"
            >{{ product.productName }} -</a
          >
        </div>
        <div class="title-price-container">
          <p>{{ product.categoryName }}</p>
        </div>
        <div class="wish-amount-container">
          <p>Wished amount: 0</p>
        </div>
        <div class="wish-amount-container">
          <p>Bought amount: 0</p>
        </div>
      </div>
      <div id="product-info-container" style="justify-content: space-around">
        <div class="title-price-container">
          <h4 style="margin-left: auto; font-weight: 400">
            {{ product.productPrice }}:-
          </h4>
        </div>
        <div class="add-subtract-container">
          <button class="subtract-btn">-</button>
          <span class="counter-value">0</span>
          <button class="add-btn">+</button>
        </div>
        <div class="wish-amount-container">
          <button class="select-btn">Select Item</button>
        </div>
      </div>
    </div>
  </div>
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

  img {
    width: 125px;
    height: 125px;
    align-self: center;
  }

  .add-subtract-container {
    border: 1px solid rgb(161, 160, 160);
    width: 74px;
    border-radius: 2px;
    margin-left: auto;
  }
  .add-subtract-container span {
    padding: 0px 8px 2px 8px;
  }

  .add-subtract-container button {
    border: none;
    width: 25px;
    height: 22px;
    background-color: rgb(233, 232, 232);
  }

  .select-btn {
    width: 85px;
    height: 25px;
    background-color: #828576;
    border-radius: 5px;
    border: none;
  }

  .add-subtract-container button:hover,
  .select-btn:hover {
    cursor: pointer;
  }
</style>
