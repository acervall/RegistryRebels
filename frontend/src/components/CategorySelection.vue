<script>
  export default {
    data() {
      return {
        categories: [],
      }
    },
    created() {
      this.getCategories()
    },

    methods: {
      async getCategories() {
        const data = await fetch('http://localhost:3000/api/category')
        this.categories = await data.json()
        console.log(this.categories)
      },
    },
  }
</script>

<template>
  <div class="categoryContainer">
    <button
      class="categoryBox button"
      v-for="category in categories"
      :key="category.category_id"
    >
      {{ category.categoryName }}
    </button>
  </div>
</template>

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
