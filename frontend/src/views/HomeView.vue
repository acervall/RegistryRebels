<script>
  import CategorySelection from '../components/CategorySelection.vue'
  import ProductSection from '../components/ProductSection.vue'
  import NavBar from '../components/NavBar.vue'

  export default {
    components: {
      ProductSection,
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
