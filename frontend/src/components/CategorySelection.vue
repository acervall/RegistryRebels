<template>
  <div />
</template>

<!--<template>
  <div class="categoryContainer">
    <button
      class="categoryBox button"
      v-for="category in categories"
      :key="category.category_Id"
      @click="getProducts(category.category_Id)"
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
</template>

<script>
  export default {
    data() {
      return {
        categories: [],
        productList: [],
      }
    },
    created() {
      this.getCategories()
    },
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
      async getProducts(categoryId) {
        console.log('Getting products for categoryId', categoryId)
        try {
          const response = await fetch(
            `http://localhost:3000/api/category/${categoryId}/products`,
          )
          const data = await response.json()
          console.log('Received', data.length, 'products:', data)

          this.productList = []
        } catch (error) {
          console.error(error)
        }
      },
    },
  }
</script>

<template>
  <div class="categoryContainer">
    <button
      class="categoryBox button"
      v-for="category in categories"
      :key="category.category_Id"
      @click="getProducts(category.category_Id)"
    >
      {{ category.categoryName }}
    </button>
    <div class="productContainer">
      <div v-for="product in products" :key="product.product_Id">
        <h3>{{ product.productName }}</h3>
        <p>{{ product.productDescription }}</p>
      </div>
    </div>
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
</template>

<script>
  export default {
    data() {
      return {
        categories: [],
        products: [],
        filteredProducts: [],
        activeCategory: null,
      }
    },
    created() {
      this.getCategories()
    },
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
      async getProducts(categoryId) {
        console.log('Getting products for categoryId', categoryId)
        try {
          const response = await fetch(
            `http://localhost:3000/api/category/${categoryId}/products`,
          )
          const data = await response.json()
          console.log('Received', data.length, 'products:', data)
          this.products = data.filter(
            (product) => product.category_Id === categoryId,
          )
          this.activeCategory = categoryId
        } catch (error) {
          console.error(error)
        }
      },
    },
  }
</script>

 <template>
  <div class="categoryContainer">
    <button
      class="categoryBox button"
      v-for="category in categories"
      :key="category.category_Id"
      @click="getProducts(category.category_Id)"
    >
      {{ category.categoryName }}
    </button>
    <div class="productContainer">
      <div v-for="product in filteredProducts" :key="product.product_Id">
        <h3>{{ product.productName }}</h3>
        <p>{{ product.productDescription }}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        categories: [],
        products: [],
        filteredProducts: [],
      }
    },
    created() {
      this.getCategories()
    },

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
      async getProducts(categoryId) {
        console.log('Getting products for categoryId', categoryId)
        const data = await fetch(
          `http://localhost:3000/api/category/${categoryId}/products`,
        )
        const products = await data.json()
        console.log('Received', products.length, 'products:', products)
        this.filteredProducts = products.filter(
          (product) => product.category_Id === categoryId,
        )
      },
    },
  }
</script>
-->
<style scoped>
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
-->
