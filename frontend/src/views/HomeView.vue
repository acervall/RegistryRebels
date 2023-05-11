<script>
  import CategorySelection from '../components/CategorySelection.vue'
  import ProductSection from '../components/ProductSection.vue'
  import UserListSection from '../components/UserListSection.vue'
  import NavBar from '../components/NavBar.vue'

  export default {
    components: {
      ProductSection,
      UserListSection,
      CategorySelection,
      NavBar,
    },
  }
</script>

<template>
  <img id="bg-image" src="/assets/bg-image-wishlist.png" alt="BG image" />
  <div>
    <NavBar />
    <CategorySelection />
    <ProductSection />
    <!--<ProductSectionUser />-->
    <UserListSection />
  </div>
</template>

<style scoped>
  #bg-image {
    position: absolute;
    top: -40px;
    left: 0;
    z-index: -1;
    width: 100vw;
    background-color: #ffffff;
    opacity: 75%;
  }
</style>
