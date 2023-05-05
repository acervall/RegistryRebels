<script>
 export default {
    created() {
      this.getUserList()
    },
    data() {
      return {
        userList: [],
      }
    },
    methods: {
      async getProducts() {
        const data = await fetch('http://localhost:3000//api/user-product-list')
        this.productList = await data.json()
        console.log(this.userList)
      },
    },
  }
</script>

<template>
  <h1>HEJHEJ</h1>
</template>