<script>
  export default {
    created() {
      this.getCategories()
    },
    data() {
      return {
        name: 'HEJSAN',
        categories: [],
        selectedCategory: 1,
        newCategoryName: null,
        url: 'TESTAR1',
        imgSrc: 'TESTAR1',
        price: 100,
        amount: 10,
        favorite: false,
      }
    },
    methods: {
      addCategory() {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            categoryName: this.newCategoryName,
          }),
        }
        fetch('http://localhost:3000/api/category', options)
          .then((res) => res.json())
          .then(() => {
            this.getCategories()
            this.newCategoryName = ''
          })
      },
      async addProduct() {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productName: this.name,
            productPrice: this.price,
            productImg: this.imgSrc,
            productURL: this.url,
            productCategory_Id: this.selectedCategory,
            selectedProductPriority: 0,
            selectedProductFavorite: this.favorite,
            selectedProductPurchased: 0,
            selectedProductAmount: this.amount,
          }),
        }
        console.log(options)
        // const data = await fetch('http://localhost:3000/api/product/1', options)
        // const res = await data.json()
        // console.log(res)
      },
      async getCategories() {
        const data = await fetch('http://localhost:3000/api/category')
        this.categories = await data.json()
      },
      selectCategory(id) {
        this.selectedCategory = id
      },
    },
  }
</script>

<template>
  <form>
    <!-- <label for="categories">Category</label> -->

    <!-- <input class="btn category-btn" type="button" value="+ Add new" /> -->

    <!-- Kommer behöva välja kategori här också, men kanske går att använda kategori-komponent? -->
    <input
      @click="selectCategory(category.category_Id)"
      class="btn category-btn"
      :key="category.category_Id"
      type="button"
      :value="category.categoryName"
      v-for="category in categories"
    />
    <label for="newCategory"></label>
    <input
      @keyup.enter="addCategory"
      @submit.prevent=""
      id="newCategory"
      placeholder="Star wars"
      type="text"
      v-model.trim="newCategoryName"
    />
    <label for="url">URL</label>
    <input
      placeholder="http://ithsdistans.se"
      required
      type="text"
      v-model.trim="url"
    />

    <label for="imgSrc">Image URL</label>
    <input
      placeholder="http://ithsdistans.se/img.jpg"
      required
      type="text"
      v-model.trim="imgSrc"
    />

    <label for="price">Price</label>
    <input placeholder="110" required type="number" v-model.number="price" />

    <label for="amount">Amount</label>
    <input placeholder="2" required type="number" v-model.number="amount" />

    <button @click.prevent="addProduct">NY PRODUKT</button>
  </form>
</template>

<style scoped>
  .btn.category-btn {
    min-width: 64px;
    padding: 6px 8px;
  }
</style>
