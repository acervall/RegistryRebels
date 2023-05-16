<script>
  import { routeLocationKey } from 'vue-router'

  export default {
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
        listId: this.$route.params.id,
        listName: null,
      }
    },
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
            response = await fetch(
              `http://localhost:3000/api/selectedProduct/${this.listId}`,
            )
          } else {
            // If category is not 'all gifts', retrieve products associated with category
            response = await fetch(
              `http://localhost:3000/api/selectedProduct/${this.listId}/${categoryId}`,
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
        const data = await fetch(
          `http://localhost:3000/api/selectedProduct/${this.listId}`,
        )
        this.productList = await data.json()
        this.productList.forEach((product) => {
          product.amount = 0
        })
        this.listName = this.productList[0].listName
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
      itemAdded(productId, selectedProductAmount) {
        this.loadingIcon = true
        const productIndex = this.productList.findIndex(
          (p) => p.product_Id === productId,
        )
        this.productList[productIndex].itemAdd = true
        this.greetingsWindow = true
        const product = this.productList[productIndex]

        this.$router.push({
          path: '/checkout',
          query: {
            productId: productId,
            amount: product.amount,
            selectedProductAmount: selectedProductAmount,
          },
        })
      },
    },
    /* TODO: UTVECKLINGSPOTENTIAL gör knapp inactive if qty <= 0  */
  }
</script>

<template>
  <h1 class="title">{{ listName }}</h1>
  <div id="main-container">
    <div class="filterContainer">
      <div class="categoryContainerBox">
        <div class="sortContainerBox">
          <button
            class="categoryButton filterButton fancy-font"
            @click="toggleDropdown('category')"
          >
            Categories
            <svg
              class="chevronDown"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
              />
            </svg>
          </button>
          <button
            class="sortButton filterButton fancy-font"
            @click="toggleDropdown('sort')"
          >
            Sort
            <svg
              class="chevronDown"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
              />
            </svg>
          </button>
        </div>
        <div v-show="showCategoryDropdown" class="categoryList">
          <button
            class="button button-dark"
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
            class="button button-dark"
            :class="{ active: sortOption === 'name' }"
            @click="sortProductList('name')"
          >
            Name
          </button>
          <button
            class="button button-dark"
            :class="{ active: sortOption === 'price' }"
            @click="sortProductList('price')"
          >
            Price
          </button>
        </div>
      </div>
    </div>

    <div
      class="product-container"
      v-for="product in productList"
      :key="product.product_Id"
    >
      <div class="product-image-container">
        <img :src="product.productImg" alt="product image" />
      </div>
      <div class="product-info">
        <a :href="product.productURL" target="_blank" class="product-title">{{
          product.productName
        }}</a>
        <p class="smaller-gray">{{ product.categoryName }}</p>
        <p class="product-price">{{ product.productPrice }}:-</p>
      </div>
      <div>
        <p class="smaller-gray">
          Qty:
          {{ product.selectedProductAmount - product.selectedProductPurchased }}
        </p>
        <button
          class="select-btn button-dark"
          @click="itemAdded(product.product_Id, product.selectedProductAmount)"
        >
          <p v-if="!product.itemAdd">Select</p>
          <p v-else>Added</p>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .product-container {
    width: 95vw;
    display: flex;
    background-color: #ffffff;
    margin: 25px 5px;
    padding: 5px;
    height: max-content;
  }

  .product-container div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 15px 20px 0;
    align-items: end;
  }

  .product-info {
    width: 45vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .product-image-container {
    align-self: center;
    margin-left: 5px;
    min-height: 10vw;
    min-width: 10vw;
    text-align: center;
    margin: 1rem;
  }
  img {
    max-height: 15vh;
    max-width: 15vh;
    align-self: center;
  }

  .select-btn {
    width: 76px;
    height: 32px;
    border-radius: 0px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button-dark p {
    background-color: rgb(44, 31, 28);
  }
  .button-dark:disabled p {
    background-color: #cbbaa4;
  }

  /* FILTRERING */
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
    align-items: baseline;
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
  .chevronDown {
    height: 0.75rem;
    margin-left: 0.25rem;
  }
</style>
