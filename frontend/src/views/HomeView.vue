<script>
  import ProductSection from '../components/ProductSection.vue'
  import UserListSection from '../components/UserListSection.vue'
  import ProductSectionUser from '../components/ProductSectionUser.vue'

  export default {
    components: {
      ProductSection,
      UserListSection,
      ProductSectionUser
    },
  }
</script>

<template>
  <ProductSection />
  <ProductSectionUser />
  <UserListSection />

</template>
