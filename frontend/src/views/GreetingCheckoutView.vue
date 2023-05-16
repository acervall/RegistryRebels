<script>
  export default {
    data() {
      return {
        productItem: null,
        productId: null,
        selectedProduct_Id: null,
        amountItems: 1,
        guestName: null,
        greetingMessage: null,
        url: 'http://localhost:3000/',
        wishedAmount: null,
      }
    },
    created() {
      const amountItem = this.$route.query.selectedProductAmount
      this.selectedProduct_Id = this.$route.query.selectedProduct_Id
      this.wishedAmount = amountItem
      const productId = this.$route.query.productId
      this.productId = productId
      this.getProduct()
    },
    methods: {
      async getProduct() {
        const data = await fetch(
          'http://localhost:3000/api/products/' + this.productId,
        )
        this.productItem = await data.json()
        console.log(this.productItem)
      },
      addAmount() {
        if (this.amountItems < this.wishedAmount) {
          this.amountItems++
        }
      },
      subtractAmount() {
        if (this.amountItems > 0) {
          this.amountItems--
        }
      },

      async leaveGreeting() {
        if (this.guestName != null || this.greetingMessage != null) {
          const createGreeting = await fetch(`${this.url}api/guest`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              guestName: this.guestName,
              guestGreeting: this.greetingMessage,
              productId: this.selectedProduct_Id,
              amountItems: this.amountItems,
            }),
          })
          const data = await createGreeting.json()
          console.log('createGreeting: ', createGreeting, ' data: ', data)
          if (data.success) {
            localStorage.setItem('guest', this.guestName)
            setTimeout(() => {
              this.$router.push('/guest')
            }, 1000)
          }
        } else {
          console.log('Du måste fylla i alla fält')
        }
      },
    },
  }
</script>

<template>
  <svg
    @click="$router.push(this.$router.options.history.state.back)"
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
  <div id="main-container-greeting">
    <div id="intro-container">
      <h1>Gift this item</h1>
    </div>
    <div class="product-bought-container">
      <img :src="productItem[0]?.productImg" alt="product image" />
      <div class="product-details-container">
        <p class="product-title">{{ productItem[0]?.productName }}</p>
        <p>From: {{ guestName }}</p>
        <p style="word-break: break-all">Greeting: {{ greetingMessage }}</p>
      </div>
      <div
        class="product-details-container"
        style="margin-left: auto; margin-top: 2px"
      >
        <p style="margin-top: 4px">Wished: {{ wishedAmount }}</p>
        <p>Amount: {{ amountItems }}</p>
      </div>
    </div>
  </div>
  <div style="margin-left: 10px" id="input-container-greeting">
    <h3>Your Name</h3>
    <div id="name-input-container">
      <input required type="text" v-model="guestName" />
      <div class="add-subtract-container">
        <button class="subtract-btn" @click="subtractAmount">-</button>
        <span class="counter-value"> {{ amountItems }} </span>
        <button class="add-btn" @click="addAmount">+</button>
      </div>
    </div>
    <h3>Leave a greeting</h3>
    <textarea
      id="greeting-input"
      name="greeting"
      rows="8"
      cols="42"
      v-model="greetingMessage"
    />
    <div id="submit-btn-container">
      <input
        class="button pointer button-dark"
        id="submit-buy-btn"
        type="button"
        value="Save"
        @click.prevent="leaveGreeting()"
      />
    </div>
  </div>
</template>

<style scoped>
  #intro-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-left: 25px;
  }

  #intro-container img {
    width: 100%;
    height: 30px;
  }

  h1 {
    text-align: center;
    width: 85%;
  }

  #main-container-greeting {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
  }
  .product-bought-container {
    display: flex;
    border-radius: 2px;
    width: 100%;
    margin-top: 40px;
  }

  .product-details-container {
    margin-top: 0px;
    padding: 12px;
  }

  .product-details-container h3 {
    margin-top: 0px;
  }

  .product-details-container p {
    color: rgb(182, 182, 182);
    font-size: 0.85rem;
    width: 150px;
  }

  .product-bought-container img {
    width: 125px;
    height: 125px;
    border-radius: 50%;
    margin-top: 15px;
  }

  #name-input-container {
    display: flex;
  }

  #name-input-container input {
    padding: 10px 5px 10px 5px;
    width: 60%;
    border: 1px solid rgb(199, 199, 199);
    border-radius: 2px;
    font-size: 1rem;
  }

  .add-subtract-container {
    display: flex;
    border: 1px solid rgb(161, 160, 160);
    width: 90px;
    border-radius: 2px;
    margin-left: 20px;
  }
  .add-subtract-container span {
    padding: 0px 10px 2px 10px;
    align-self: center;
  }

  .add-subtract-container button {
    border: none;
    width: 100%;
    height: 100%;
    background-color: rgb(238, 238, 238);
  }

  textarea {
    padding: 10px;
    border: 1px solid rgb(199, 199, 199);
    border-radius: 5px;
    font-size: 1rem;
    width: 100%;
  }

  #submit-btn-container {
    display: flex;
    justify-content: flex-end;
    margin: 1rem 0;
  }

  #submit-buy-btn {
    width: fit-content;
  }
</style>
