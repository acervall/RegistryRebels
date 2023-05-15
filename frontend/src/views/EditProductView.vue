<script>
  export default {
    created() {
      this.selectedProductId = this.$route.params.productId
      this.listId = this.$route.params.listId
      this.getCategories()
      this.getProduct()
    },
    data() {
      return {
        addConfirmation: false,
        amount: null,
        categories: [],
        favorite: false,
        imgSrc: '',
        name: '',
        newCategoryName: null,
        price: null,
        selectedCategory: null,
        url: '',
        validated: false,
        listId: 1,
        addCategoryOpen: false,
        productId: null,
        selectedProductId: null,
        purchased: false,
      }
    },
    methods: {
      addCategory() {
        if (
          !this.categories
            .map((cat) => cat.categoryName.toLowerCase())
            .includes(this.newCategoryName.toLowerCase())
        ) {
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              categoryName: this.newCategoryName,
            }),
          }
          fetch('http://localhost:3000/api/category', options)
            .then((res) => res.json())
            .then(() => {
              this.getCategories()
              this.newCategoryName = ''
              this.addCategoryOpen = false
            })
        }
      },
      async updateProduct() {
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productName: this.name,
            productPrice: this.price,
            productImg: this.imgSrc,
            productURL: this.url,
            productCategory_Id: this.selectedCategory,
            selectedProductFavorite: this.favorite,
            selectedProductPurchased: this.purchased,
            selectedProductAmount: this.amount,
          }),
        }
        if (this.validated) {
          try {
            const data = await fetch(
              `http://localhost:3000/api/product/${this.productId}/${this.selectedProductId}`,
              options,
            )
            const res = await data.json()
            if (res.success === true && data.ok) {
              this.addConfirmation = true
              setTimeout(() => {
                this.$router.push(this.$router.options.history.state.back)
              }, 2000)
            } else {
              console.log('STATUS: ', data.status, 'MSG: ', res.message)
              throw new Error({ status: data.status, message: res.message })
            }
          } catch (err) {
            console.error(err)
          }
        }
      },
      classAddTo(ref) {
        this.validateData()
        this.$refs[ref].classList.add('input-accepted')
        this.$refs[ref].classList.remove('input-declined')
      },
      classRemoveFrom(ref) {
        this.$refs[ref].classList.add('input-declined')
        this.$refs[ref].classList.remove('input-accepted')
      },
      async getCategories() {
        const data = await fetch('http://localhost:3000/api/category')
        this.categories = await data.json()
      },
      async getProduct() {
        const data = await fetch(
          `http://localhost:3000/api/selectedProduct/product/${this.listId}/${this.selectedProductId}`,
        )
        const product = (await data.json())[0]
        this.amount = product.selectedProductAmount
        this.favorite = product?.selectedProductfavorite || false
        this.imgSrc = product.productImg
        this.name = product.productName
        this.price = product.productPrice
        this.productId = product.product_Id
        this.url = product.productURL
        this.selectedCategory = product.category_Id
        this.purchased = product?.purchased || 0
      },
      openAddNewCategory() {
        this.selectedCategory = null
        this.addCategoryOpen = true
      },
      selectCategory(id) {
        this.selectedCategory = id
      },
      validateData() {
        if (
          this.amount > 0 &&
          typeof this.amount === 'number' &&
          this.imgSrc.length >= 1 &&
          this.name.length >= 1 &&
          this.price > 0 &&
          typeof this.price === 'number' &&
          this.selectCategory &&
          this.url.length >= 1
        ) {
          this.validated = true
        } else {
          this.validated = false
        }
      },
    },
    watch: {
      addConfirmation(isActive) {
        if (isActive) {
          setTimeout(() => {
            this.addConfirmation = false
          }, 2000)
        }
      },
      url(updatedUrl) {
        if (updatedUrl.length >= 3) {
          this.classAddTo('url')
        } else {
          this.classRemoveFrom('url')
        }
      },
      imgSrc(updatedImgSrc) {
        if (updatedImgSrc.length >= 3) {
          this.classAddTo('imgSrc')
        } else {
          this.classRemoveFrom('imgSrc')
        }
      },
      price(updatedPrice) {
        if (updatedPrice > 0 && typeof updatedPrice === 'number') {
          this.classAddTo('price')
        } else {
          this.classRemoveFrom('price')
        }
      },
      amount(updatedAmount) {
        if (updatedAmount > 0 && typeof updatedAmount === 'number') {
          this.classAddTo('amount')
        } else {
          this.classRemoveFrom('amount')
        }
      },
    },
  }
</script>

<template>
  <form class="containerForm">
    <div class="add-new-header">
      <v-icon
        @click="favorite = !favorite"
        class="favorite favorite-icon"
        v-show="favorite"
        name="bi-star-fill"
      />
      <v-icon
        @click="favorite = !favorite"
        class="favorite-icon"
        v-show="!favorite"
        name="co-star"
      />
      <h3>Update item</h3>
      <span @click.prevent="updateProduct" class="btn">
        Update
        <Transition name="first-render">
          <v-icon v-if="addConfirmation" name="fc-checkmark" />
        </Transition>
      </span>
    </div>

    <label for="name">Product name</label>
    <div class="input-container margin-bottom">
      <input id="name" ref="name" type="text" v-model.trim="name" />
      <v-icon @click="name = ''" class="icon" name="io-close-circle-outline" />
    </div>
    <TransitionGroup class="category-container" name="list" tag="ul">
      <li
        @click="selectCategory(category.category_Id)"
        :key="category.category_Id"
        v-for="category in categories"
      >
        <input
          :class="`category-box btn ${
            selectedCategory === category.category_Id ? 'selected' : ''
          }`"
          type="button"
          :key="'input' + category.category_Id"
          :value="category.categoryName"
        />
      </li>
      <li @click="openAddNewCategory" key="li2">
        <input class="category-box btn" type="button" value="+" />
      </li>
    </TransitionGroup>

    <!-- TODO borde vara en ikon istället för + -->
    <Transition name="first-render">
      <div class="margin-bottom" v-if="addCategoryOpen">
        <label for="newCategory">Add new category</label>
        <div class="input-container">
          <input
            @keyup.enter="addCategory"
            id="newCategory"
            placeholder="Star wars"
            type="text"
            v-model.trim="newCategoryName"
          />
          <v-icon
            class="icon"
            name="io-add-circle-outline"
            @click="addCategory"
          />
        </div>
      </div>
    </Transition>
    <label for="url">URL</label>
    <input
      class="margin-bottom"
      placeholder="http://ithsdistans.se"
      ref="url"
      required
      type="text"
      v-model.trim="url"
    />
    <label for="imgSrc">Image URL</label>
    <input
      class="margin-bottom"
      placeholder="http://ithsdistans.se/img.jpg"
      ref="imgSrc"
      required
      type="text"
      v-model.trim="imgSrc"
    />
    <label for="price">Price</label>
    <input
      class="margin-bottom"
      placeholder="110"
      ref="price"
      required
      type="number"
      v-model.number="price"
    />
    <label for="amount">Amount</label>
    <input
      class="margin-bottom"
      placeholder="1"
      ref="amount"
      required
      type="number"
      v-model.number="amount"
    />
  </form>
</template>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Anek+Telugu:wght@300;400&display=swap');
  form {
    padding: 32px 16px;
    font-family: Sen;
    font-size: 0.75rem;
    height: calc(100vh - 16px);
  }
  ul.category-container {
    padding: 0;
    li {
      list-style-type: none;
      width: min-content;
    }
  }

  input:not([type='button']) {
    border: 1px solid #cecece;
    font-size: 0.75rem;
    height: 2.4rem;
    outline: none;
    padding: 10px;
    width: 100%;
  }

  .add-new-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    h3 {
      flex-grow: 1;
      text-align: center;
    }
  }
  .btn {
    cursor: pointer;
    padding: 0.5rem;
    min-width: 25px;
    icon {
      height: 1rem;
    }
  }

  .category-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .category-box {
    margin: 0.5rem;
    color: grey;
    background-color: white;
    border: 1px solid rgb(123, 123, 123);
    border-radius: 0.25rem;
    min-width: 34px;
    &:hover {
      border: 1.5px solid #212121;
      color: rgb(17, 17, 17);
    }
  }

  .category-box.selected {
    border: 1px solid #212121;
  }

  .favorite {
    color: rgb(240, 243, 53);
  }

  .favorite-icon {
    cursor: pointer;
  }

  .product-list {
    list-style: none;
    margin: 0 0 16px 0;
    padding: 0;

    .product {
      background-color: #efefef;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0;
      cursor: pointer;
      img {
        height: 48px;
        width: 48px;
        display: inline;
        margin-right: 8px;
        padding: 4px 0;
      }
      p {
        display: inline;
        margin: 0;
        padding: 4px 0;
      }

      &:nth-child(even) {
        background-color: #cecece;
      }
      &:focus {
        outline: none;
        border: 1px solid black;
        img {
          height: 46px;
          width: 46px;
        }
      }
    }
  }

  .input-container {
    position: relative;
    .icon {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto 8px auto 0;
      cursor: pointer;
    }
    input {
      padding-right: 30px;
    }
  }

  .margin-bottom {
    margin-bottom: 16px;
  }

  // Transitions
  .input-accepted {
    // border-color: green;
  }
  .input-declined {
    border: 1px solid red;
    color: red;
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.2s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(48px);
  }

  .first-render-enter-active,
  .first-render-leave-active {
    transition: all 0.3s ease-in;
  }
  .first-render-enter-from,
  .first-render-leave-to {
    opacity: 0;
    transform: translateY(-16px);
  }
  .containerForm {
    background-color: #cbbaa49f;
  }
</style>
