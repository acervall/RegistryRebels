<script>
  export default {
    created() {
      this.getUser()
    },
    data() {
      return {
        guest: null,
      }
    },
    methods: {
      async getUser() {
        const guestName = localStorage.getItem('guest')
        const res = await fetch(`http://localhost:3000/api/guest/${guestName}`)
        this.guest = (await res.json())[0]
      },
    },
  }
</script>
<template>
  <div class="container">
    <svg
      @click="$router.go(-2)"
      class="svg-left pointer"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 25"
    >
      <path
        style="fill: #767676"
        d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"
        data-name="Left"
      />
    </svg>

    <h1>{{ guest?.guestName }}</h1>

    <h2>Du köpte följande produkt</h2>
    <div class="product-container">
      <div class="product-image-container">
        <img :src="guest?.productImg" alt="product image" />
      </div>
      <div class="product-info">
        <a :href="guest?.productURL" target="_blank" class="product-title">{{
          guest?.productName
        }}</a>
        <p class="smaller-gray">{{ guest?.categoryName }}</p>
        <p class="product-price">{{ guest?.productPrice }}:-</p>
      </div>
    </div>
    <p class="thanks">
      {{ guest?.userName }} kommer säkert bli alldeles otroligt glad över din
      present! :)
    </p>
    <p class="greeting">
      Din hälsning: <span>{{ guest?.guestGreeting }}</span>
    </p>
  </div>
</template>
<style lang="scss" scoped>
  h2 {
    margin: 0 5vw;
  }

  .container {
    p {
      margin: inherit 1rem;
      span {
        font-style: italic;
      }
    }
  }
  .product-container {
    width: 95vw;
    display: flex;
    background-color: #ffffff;
    margin: 25px 5px;
    padding: 5px;
    height: max-content;
  }

  .product-info {
    width: 45vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .product-image-container {
    align-self: center;
    margin-left: 5px;
    min-height: 10vw;
    min-width: 10vw;
    text-align: center;
    margin: 1rem;
  }
  img {
    max-height: 15vh;
    max-width: 15vh;
    align-self: center;
  }
</style>
