<script>
  import searchProduct from '../searchProduct'
  export default {
    created() {
      this.getCategories()
    },
    computed: {
      showProducts() {
        return (
          this.productList.length > 0 &&
          this.searchTerm.length > 0 &&
          (this.name !== this.productList[0]?.productName ||
            this.searchTerm !== this.name)
        )
      },
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
        productList: [],
        searchTerm: null,
        addCategoryOpen: false,
      }
    },
    methods: {
      addCategory() {
        if (
          !this.categories
            .map((cat) => cat.categoryName.toLowerCase())
            .includes(this.newCategoryName.toLowerCase())
        ) {
          console.log(this.categories)
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
      async addProduct() {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productName: this.name,
            productPrice: this.price,
            productImg: this.imgSrc,
            productURL: this.url,
            productCategory_Id: this.selectedCategory,
            selectedProductPriority: 0,
            selectedProductFavorite: this.favorite,
            selectedProductPurchased: 0,
            selectedProductAmount: this.amount,
          }),
        }
        if (this.validated) {
          const data = await fetch(
            'http://localhost:3000/api/product/1',
            options,
          )
          const res = await data.json()
          if (res.success === true) {
            this.addConfirmation = true
          }
        } else {
          console.log('Needs more data')
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
      openAddNewCategory() {
        this.selectedCategory = null
        this.addCategoryOpen = true
      },
      selectCategory(id) {
        this.selectedCategory = id
      },
      selectProduct(product) {
        // console.log(product)
        this.imgSrc = product.productImg
        this.name = product.productName
        this.searchTerm = product.productName
        this.price = product.productPrice
        this.selectedCategory = product.category_Id
        this.url = product.productURL
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
      searchTerm(updatedSearchTerm) {
        if (updatedSearchTerm.length > 0) {
          searchProduct(updatedSearchTerm).then(
            (res) => (this.productList = res),
          )
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
      <h3>Add new item</h3>
      <span @click.prevent="addProduct" class="btn">
        Save
        <Transition name="first-render">
          <svg
            v-if="addConfirmation"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="green"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            />
          </svg>
        </Transition>
      </span>
    </div>
    <label for="search">Search product</label>
    <div :class="`input-container ${!showProducts ? 'margin-bottom' : ''}`">
      <input
        id="search"
        placeholder="Kaffebryggare"
        type="text"
        v-model.trim="searchTerm"
      />
      <v-icon
        @click="searchTerm = ''"
        class="icon"
        name="io-close-circle-outline"
      />
    </div>
    <Transition name="first-render">
      <TransitionGroup
        class="product-list"
        v-show="showProducts"
        name="list"
        tag="ul"
      >
        <li
          @click="selectProduct(product)"
          @keyup.enter="selectProduct(product)"
          :key="product.product_Id"
          class="product"
          v-for="product in productList"
          tabindex="0"
        >
          <!-- <pre>{{ product }}</pre> -->
          <img
            class="search-list-img"
            :src="product.productImg"
            alt="product.productName"
            :key="'img' + product.product_Id"
          />
          <p
            :key="'text' + product.product_Id"
            v-shortText="{ text: product.productName, chars: 30 }"
          />
        </li>
      </TransitionGroup>
    </Transition>
    <label for="name">{{
      `${
        searchTerm === name && searchTerm.length > 0
          ? 'Product name'
          : 'or create a new one'
      }`
    }}</label>
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
  }
  ul.category-container {
    padding: 0;
    li {
      list-style-type: none;
      width: min-content;
    }
  }

  input:not([type='button']) {
    background-color: #efefef;
    border: 1px solid #cecece;
    font-size: 0.75rem;
    height: 2.4rem;
    outline: none;
    padding: 8px;
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
    svg {
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
    border-color: green;
  }
  .input-declined {
    border-color: red;
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
