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
        selectedCategory: 1,
        sortOption: 'default',

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
          let response
          if (categoryId === 1) {
            // If category is 'all gifts', retrieve all products
            response = await fetch(`http://localhost:3000/api/products`)
          } else {
            // If category is not 'all gifts', retrieve products associated with category
            response = await fetch(
              `http://localhost:3000/api/category/${categoryId}/products`,
            )
          }
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
      sortProductList() {
        if (this.sortOption === 'price') {
          this.productList.sort((a, b) => a.productPrice - b.productPrice)
        } else if (this.sortOption === 'name') {
          this.productList.sort((a, b) =>
            a.productName.localeCompare(b.productName),
          )
        }
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
    <div class="filterContainer">
      <select
        class="filterBox button"
        v-model="selectedCategory"
        @change="getCategoryProducts(selectedCategory)"
      >
        <option
          class="option"
          v-for="category in categories"
          :key="category.category_Id"
          :value="category.category_Id"
        >
          {{ category.categoryName }}
        </option>
      </select>
      <select
        class="filterBox button"
        v-model="sortOption"
        @change="sortProductList()"
      >
        <option class="option" value="default">Sort</option>
        <option class="option" value="name">Name</option>
        <option class="option" value="price">Price</option>
      </select>
    </div>
    <!-- <div
      id="products-container"
      v-for="product in sortedProductList"
      :key="product.product_Id"
    >
      <div class="product-image-container">
        <img :src="product.productImg" alt="product image" />
      </div>
      <div id="product-info-container">
        <div class="title-price-container">
          <a :href="product.productURL" target="_blank">{{
            product.productName
          }}</a>
        </div>
        <div class="title-price-container">
          <p>{{ product.categoryName }}</p>
        </div>
        <div class="price-amount-container">
          <p>{{ product.productPrice }}:-</p>
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
            <p v-if="!product.itemAdd">SELECT</p>
            <p v-else>Added</p>
          </button>
        </div>
      </div>
    </div>
    <div
      id="products-container"
      v-for="product in productList"
      :key="product.product_Id"
    >
      <div class="product-image-container">
        <img :src="product.productImg" alt="product image" />
      </div>
      <div id="product-info-container">
        <div class="title-price-container">
          <a :href="product.productURL" target="_blank">{{
            product.productName
          }}</a>
        </div>
        <div class="title-price-container">
          <p>{{ product.categoryName }}</p>
        </div>
        <div class="price-amount-container">
          <p>{{ product.productPrice }}:-</p>
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
            <p v-if="!product.itemAdd">SELECT</p>
            <p v-else>Added</p>
          </button>
        </div>
      </div>
    </div>
     <div class="categoryContainer">
      <button
        class="categoryBox button"
        v-for="category in categories"
        :key="category.category_Id"
        @click="getCategoryProducts(category.category_Id)"
      >
        {{ category.categoryName }}
      </button>
    </div>-->
    <div
      id="products-container"
      v-for="product in productList"
      :key="product.product_Id"
    >
      <div class="product-image-container">
        <img :src="product.productImg" alt="product image" />
      </div>
      <div id="product-info-container">
        <div class="title-price-container">
          <a :href="product.productURL" target="_blank">{{
            product.productName
          }}</a>
        </div>
        <div class="title-price-container">
          <p>{{ product.categoryName }}</p>
        </div>
        <div class="price-amount-container">
          <p>{{ product.productPrice }}:-</p>
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
            <p v-if="!product.itemAdd">SELECT</p>
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
    width: 97.5%;
    display: flex;
    background-color: #ffffff;
    margin: 25px 5px;
  }

  #product-info-container {
    margin: 8px 18px 15px 15px;
    display: flex;
    flex-direction: column;
  }

  .title-price-container {
    display: flex;
    margin: 4px 0px;
  }

  .title-price-container a {
    text-decoration: none;
    color: #212121;
    font-weight: 600;
  }

  .title-price-container p {
    color: grey;
  }

  .wish-amount-container {
    margin-top: 3px;
    width: 100%;
  }

  .price-amount-container p {
    font-size: 21px;
    font-family: Libre Caslon Display;
    font-weight: 500;
    letter-spacing: -1px;
  }

  p,
  a,
  h4 {
    margin: 3px;
    padding: 0px;
  }

  .product-image-container {
    align-self: center;
    margin-left: 5px;
    border-radius: 100%;
  }
  img {
    width: 96px;
    height: 96px;
    align-self: center;
    /* border-radius: 50%; */
    /* object-fit: cover; */
  }

  .select-btn {
    width: 76px;
    height: 32px;
    background-color: rgb(49, 16, 16);
    border-radius: 0px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .select-btn p {
    color: #b8b6b3;
    font-size: 0.85rem;
    font-family: Libre Caslon Display;
    margin-top: 4px;
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
  .filterContainer {
    display: flex;
    background-color: black;
    justify-content: center;
    align-items: center;
  }
  .filterBox {
    display: flex;
    background-color: #c8b6a6;
    border: none;
    flex-grow: 1;
    height: 2.5rem;
    font-family: fantasy;
  }
  .select option {
    background-color: #601919;
  }
  #mySelect .v-select .dropdown-toggle {
    border: none;
  }
</style>
