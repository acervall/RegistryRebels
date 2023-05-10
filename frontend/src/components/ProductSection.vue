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
        showCategoryDropdown: false,
        showSortDropdown: false,

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
      toggleDropdown(type) {
        if (type === 'category') {
          this.showCategoryDropdown = !this.showCategoryDropdown
          this.showSortDropdown = false
        } else if (type === 'sort') {
          this.showSortDropdown = !this.showSortDropdown
          this.showCategoryDropdown = false
        }
      },
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
      sortProductList(sortOption) {
        if (sortOption === this.sortOption) {
          this.productList.reverse()
        } else {
          this.productList.sort((a, b) => {
            if (sortOption === 'price') {
              return a.productPrice - b.productPrice
            } else if (sortOption === 'name') {
              return a.productName.localeCompare(b.productName)
            } else if (sortOption === 'alphabet') {
              return a.productName.localeCompare(b.productName, undefined, {
                sensitivity: 'base',
              })
            }
          })
          this.sortOption = sortOption
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
      <div class="categoryContainerBox">
        <div class="sortContainerBox">
          <button
            class="categoryButton filterButton"
            @click="toggleDropdown('category')"
          >
            Categories
          </button>
          <button
            class="sortButton filterButton"
            @click="toggleDropdown('sort')"
          >
            Sort <BiChevronCompactDown />
          </button>
        </div>
        <div v-show="showCategoryDropdown" class="categoryList">
          <button
            class="button"
            v-for="category in categories"
            :key="category.category_Id"
            :class="{ active: category.category_Id === selectedCategory }"
            @click="getCategoryProducts(category.category_Id)"
          >
            {{ category.categoryName }}
          </button>
        </div>
      </div>
      <div class="sortContainerBox">
        <div v-show="showSortDropdown" class="sortOptions">
          <button
            class="button"
            :class="{ active: sortOption === 'name' }"
            @click="sortProductList('name')"
          >
            Name
          </button>
          <button
            class="button"
            :class="{ active: sortOption === 'price' }"
            @click="sortProductList('price')"
          >
            Price
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
  </div>
  <!-- <GreetingMessage v-if="greetingsWindow" @submit-greeting="updateGreetingsWindow" /> -->
</template>

<style scoped>
  @import url('https://fonts.cdnfonts.com/css/lindsey');
  @import url('https://fonts.googleapis.com/css2?family=Anek+Telugu:wght@300;400&display=swap');

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

  .filterContainer {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
  .categoryContainerBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .categoryList {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .sortOptions {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .sortButton {
    display: flex;
    background-color: #cbbaa4;
    border: none;
    height: 3rem;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .sortContainerBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .filterButton {
    display: flex;
    background-color: #cbbaa4;
    border: none;
    height: 3rem;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-family: 'Lindsey', sans-serif;
  }
  .button {
    display: flex;
    background-color: #cbbaa49f;
    font-size: 0.75rem;
    font-family: Sen;
    color: black;
    text-align: left;
    text-transform: capitalize;
    width: 100%;
  }
  .categoryButton {
    padding: none;
  }
</style>
