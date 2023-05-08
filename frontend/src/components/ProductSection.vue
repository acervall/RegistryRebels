<script>
  // import GreetingMessage from '../components/GreetingMessage.vue'

  export default {
    // components: {
    //   GreetingMessage,
    // },
    created() {
      this.getProducts()
      this.getCategories()
    },
    data() {
      return {
        productList: [],
        itemAdd: false,
        categories: [],

        // greetingsWindow: false,
      }
    },
    // computed: {
    // greetingWindowActive() {
    //   return {
    //     opacity: this.greetingsWindow ? 0.3 : 1,
    //     position: this.greetingsWindow ? 'fixed' : 'static'
    //   };
    // }
    // },
    methods: {
      async getCategories() {
        try {
          const response = await fetch('http://localhost:3000/api/category')
          const data = await response.json()
          this.categories = data
        } catch (error) {
          console.error(error)
        }
      },
      async getCategoryProducts(categoryId) {
        console.log('Getting products for categoryId', categoryId)
        try {
          const response = await fetch(
            `http://localhost:3000/api/category/${categoryId}/products`,
          )
          const data = await response.json()
          console.log('Received', data.length, 'products:', data)

          this.productList = data
        } catch (error) {
          console.error(error)
        }
      },
      async getProducts() {
        const data = await fetch('http://localhost:3000/api/products')
        this.productList = await data.json()
        this.productList.forEach((product) => {
          product.amount = 0
        })
      },

      updateGreetingsWindow() {
        this.greetingsWindow = false
      },

      addAmount(product) {
        if (product.amount < 9) {
          product.amount++
        }
      },
      subtractAmount(product) {
        if (product.amount > 0) {
          product.amount--
        }
      },
      itemAdded(productId) {
        this.loadingIcon = true
        const productIndex = this.productList.findIndex(
          (p) => p.product_Id === productId,
        )
        this.productList[productIndex].itemAdd = true
        this.greetingsWindow = true
        const product = this.productList[productIndex]

        setTimeout(() => {
          this.$router.push({
            path: '/checkout',
            query: {
              productId: productId,
              amount: product.amount,
            },
          })
        }, 1500)
      },
    },
  }
</script>

<template>
  <div id="main-container">
    <div class="categoryContainer">
      <button
        class="categoryBox button"
        v-for="category in categories"
        :key="category.category_Id"
        @click="getCategoryProducts(category.category_Id)"
      >
        {{ category.categoryName }}
      </button>
      <div class="products">
        <div
          class="product"
          v-for="product in filteredProducts"
          :key="product.product_Id"
        >
          <div class="product-image">
            <img :src="product.productImg" alt="" />
          </div>
          <div class="product-info">
            <h4>{{ product.productName }}</h4>
            <p>{{ product.productPrice }} SEK</p>
            <a :href="product.productURL" target="_blank">View Product</a>
          </div>
        </div>
      </div>
    </div>
    <div
      id="products-container"
      v-for="product in productList"
      :key="product.product_Id"
    >
      <img :src="product.productImg" alt="product image" />
      <div id="product-info-container">
        <div class="title-price-container">
          <a :href="product.productURL" target="_blank">{{
            product.productName
          }}</a>
        </div>
        <div class="title-price-container">
          <p>{{ product.categoryName }}</p>
        </div>
        <div class="wish-amount-container">
          <p style="font-weight: 600">{{ product.productPrice }}:-</p>
        </div>
      </div>
      <div
        id="product-info-container"
        style="justify-content: space-around; margin-left: auto"
      >
        <div class="title-price-container">
          <p style="margin-left: auto">Qty: 4</p>
        </div>
        <div class="wish-amount-container">
          <button class="select-btn" @click="itemAdded(product.product_Id)">
            <p v-if="!product.itemAdd">Buy This</p>
            <p v-else>Added</p>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- <GreetingMessage v-if="greetingsWindow" @submit-greeting="updateGreetingsWindow" /> -->
</template>

<style scoped>
  * {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
      sans-serif;
  }
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
    display: flex;
  }
  .add-subtract-container span {
    padding: 0px 8px 2px 8px;
    margin-top: 1px;
  }

  .add-subtract-container button {
    border: none;
    width: 25px;
    height: 100%;
    background-color: rgb(233, 232, 232);
  }

  .select-btn {
    width: 85px;
    height: 35px;
    background-color: #828576;
    border-radius: 5px;
    border: none;
    text-align: center;
  }

  .select-btn p {
    color: rgb(238, 238, 238);
    font-size: 0.9rem;
  }
  .categoryContainer {
    display: flex;
    flex-direction: row;
  }
  .categoryBox {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    margin: 0.5rem;
    padding: 0.5rem;
    color: grey;
    background-color: white;
    border: 1px solid rgb(123, 123, 123);
    border-radius: 0.25rem;
  }

  .categoryBox:hover {
    border: 1.5px solid #212121;
    color: rgb(17, 17, 17);
  }
</style>
