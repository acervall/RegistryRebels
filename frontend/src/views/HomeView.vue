<script>
  import CategorySelection from '../components/CategorySelection.vue'
  import ProductSection from '../components/ProductSection.vue'
  import UserListSection from '../components/UserListSection.vue'
  import NavBar from '../components/NavBar.vue'
  import AddProduct from '../components/AddProduct.vue'

  export default {
    components: {
      ProductSection,
      UserListSection,
      CategorySelection,
      NavBar,
      AddProduct,
    },
  }
</script>

<template>
  <img id="bg-image" src="/assets/bg-image-wishlist.png" alt="BG image" />
  <div>
    <NavBar />
    <CategorySelection />
    <ProductSection />
    <ProductSectionUser />
    <UserListSection />
    <AddProduct />
  </div>
</template>

<style scoped>
  #bg-image {
    position: absolute;
    top: -40px;
    left: 0;
    z-index: -1;
    width: 100vw;
  }
</style>
