<script>
  // TODO bryt till page/component
  export default {
    created() {
      this.getProducts()
    },
    components: {
      /*      CitiesList,
      CounterButton,
      HelloWorld*/
    },
    data() {
      return {
        productList: [],
      }
    },
    methods: {
      async getProducts() {
        const data = await fetch('http://localhost:3000/api/product')
        this.productList = await data.json()
      },
    },
  }
</script>

<template>
  <ul>
    <li v-for="product in productList" :key="product.product_Id">
      {{ product.productName }}
    </li>
  </ul>
  <!-- <nav>
    <ul>
      <li>
        <RouterLink to="/">Hem</RouterLink>
      </li>
      <li>
        <RouterLink to="/about">Om</RouterLink>
      </li>
      <li>
        <RouterLink to="/contact">Kontakt</RouterLink>
      </li>
    </ul>
  </nav>
  <HelloWorld msg="Hello World!" />
  <CitiesList />
  <CounterButton />
  <main>
    <RouterView />
  </main> -->
</template>
