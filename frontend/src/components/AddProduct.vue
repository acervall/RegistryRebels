<script>
  import searchProduct from '../searchProduct'
  export default {
    created() {
      this.getCategories()
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
      }
    },
    methods: {
      addCategory() {
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
          })
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
        }
      },
    },
    watch: {
      name(updatedName) {
        searchProduct(updatedName).then((res) => console.log(res))
        if (updatedName.length >= 3) {
          this.classAddTo('name')
        } else {
          this.classRemoveFrom('name')
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
  <form>
    <div class="add-new-header">
      FAVORIT-IKON
      <h3>Add new item</h3>
      <span @click.prevent="addProduct" class="btn">
        Save
        <Transition name="addConfirmation">
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
    <!-- <label for="categories">Category</label> -->

    <!-- <input class="btn category-btn" type="button" value="+ Add new" /> -->

    <!-- Kommer behöva välja kategori här också, men kanske går att använda kategori-komponent? -->
    <label for="name">Name</label>
    <input
      placeholder="Kaffebryggare "
      ref="name"
      required
      type="text"
      v-model.trim="name"
    />
    <input
      @click="selectCategory(category.category_Id)"
      class="category-btn"
      :key="category.category_Id"
      type="button"
      :value="category.categoryName"
      v-for="category in categories"
    />
    <label for="newCategory"></label>
    <input
      @keyup.enter="addCategory"
      @submit.prevent=""
      id="newCategory"
      placeholder="Star wars"
      type="text"
      v-model.trim="newCategoryName"
    />
    <label for="url">URL</label>
    <input
      placeholder="http://ithsdistans.se"
      ref="url"
      required
      type="text"
      v-model.trim="url"
    />

    <label for="imgSrc">Image URL</label>
    <input
      placeholder="http://ithsdistans.se/img.jpg"
      ref="imgSrc"
      required
      type="text"
      v-model.trim="imgSrc"
    />

    <label for="price">Price</label>
    <input
      placeholder="110"
      ref="price"
      required
      type="number"
      v-model.number="price"
    />

    <label for="amount">Amount</label>
    <input
      placeholder="2"
      ref="amount"
      required
      type="number"
      v-model.number="amount"
    />
  </form>
</template>

<style lang="scss" scoped>
  .add-new-header {
    display: flex;
    flex-direction: row;
  }
  .btn.category-btn {
    min-width: 64px;
    padding: 6px 8px;
  }

  .btn {
    cursor: pointer;
    padding: 6px 8px;
    svg {
      height: 1rem;
      margin: 0 8px 0 16px;
    }
  }

  input:not([type='button']) {
    width: 100%;
    outline: none;
    height: 2.2rem;
  }
  /* TEMP - antar det ska ha annan styling men just nu så
            har jag det så jag vet den lägget till rätt klasser */
  .input-accepted {
    border-color: green;
  }
  .input-declined {
    border-color: red;
  }
</style>
