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
  <div>
    <NavBar />
    <CategorySelection />
    <ProductSection />
    <UserListSection />

    <ProductSection />
  </div>
</template>
