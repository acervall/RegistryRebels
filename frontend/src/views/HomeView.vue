<script>
  import CategorySelection from '../components/CategorySelection.vue'
  import ProductSection from '../components/ProductSection.vue'
  import ProductSectionUser from '../components/ProductSectionUser.vue'
  import UserListSection from '../components/UserListSection.vue'
  import NavBar from '../components/NavBar.vue'
  import AddProduct from '../components/AddProduct.vue'

  export default {
    components: {
      ProductSection,
      ProductSectionUser,
      UserListSection,
      CategorySelection,
      NavBar,
      AddProduct,
    },
  }
</script>

<template>
  <div>
    <NavBar />
    <CategorySelection />
    <ProductSection />
    <ProductSectionUser />
    <UserListSection />
    <AddProduct />
  </div>
</template>
