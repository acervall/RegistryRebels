<script>
  import AddProduct from '../components/AddProduct.vue'
  export default {
    components: {
      AddProduct,
    },
    name: 'UserListView',
    data() {
      return {
        showAddProduct: false,
      }
    },
  }
</script>

<template>
  <div>
    <h1 class="ListTitle">Wedding</h1>
    <div class="plusSign" @click="showAddProduct = !showAddProduct">
      <svg
        class="plusSign"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
        />
      </svg>
    </div>
    <AddProduct v-if="showAddProduct" @close="showAddProduct = false" />
  </div>
</template>

<style lang="scss" scoped>
  .plusSign {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    height: 1rem;
    margin: 1rem;
  }
  .ListTitle {
    margin-top: 2.5rem;
    margin-left: 1rem;
  }
</style>
