<script>
  import AddProduct from '../components/AddProduct.vue'
  export default {
    components: {
      AddProduct,
    },
    name: 'UserListView',
    data() {
      return {
        showAddProduct: false,
        productList: [],
        categories: [],
        showCategoryDropdown: false,
        showSortDropdown: false,
        listId: null,
        listName: '',
      }
    },
    created() {
      this.listId = this.$route.params.id
      this.getProducts()
      this.getCategories()
      this.getUserList()
    },
    methods: {
      async getUserList() {
        const data = await fetch('http://localhost:3000/api/user-product-list')
        this.userList = await data.json()
        const listId = parseInt(this.$route.params.id)
        const matchingList = this.userList.find(
          (list) => list.list_Id === listId,
        )
        if (matchingList) {
          this.listName = matchingList.listName
        } else {
          this.listName = 'List not found'
        }
      },

      sortProductList(sortOption) {
        if (sortOption === this.sortOption) {
          this.productList.reverse()
        } else {
          this.productList.sort((a, b) => {
            if (sortOption === 'price') {
              return a.productPrice - b.productPrice
            } else if (sortOption === 'name') {
              return a.productName.localeCompare(b.productName)
            } else if (sortOption === 'alphabet') {
              return a.productName.localeCompare(b.productName, undefined, {
                sensitivity: 'base',
              })
            }
          })
          this.sortOption = sortOption
        }
      },
      async getCategoryProducts(categoryId) {
        console.log('Getting products for categoryId', categoryId)
        try {
          let response
          if (categoryId === 1) {
            response = await fetch(
              `http://localhost:3000/api/selectedProduct/${this.listId}`,
            )
          } else {
            response = await fetch(
              `http://localhost:3000/api/selectedProduct/${this.listId}/${categoryId}`,
            )
          }
          const data = await response.json()
          console.log('Received', data.length, 'products:', data)
          this.productList = data
        } catch (error) {
          console.error(error)
        }
      },
      async getCategories() {
        try {
          const response = await fetch('http://localhost:3000/api/category')
          const data = await response.json()
          this.categories = data
        } catch (error) {
          console.error(error)
        }
      },
      toggleDropdown(type) {
        if (type === 'category') {
          this.showCategoryDropdown = !this.showCategoryDropdown
          this.showSortDropdown = false
          this.showAddProduct = false
        } else if (type === 'sort') {
          this.showSortDropdown = !this.showSortDropdown
          this.showCategoryDropdown = false
          this.showAddProduct = false
        } else if (type === 'add') {
          this.showAddProduct = !this.showAddProduct
          this.showCategoryDropdown = false
          this.showSortDropdown = false
        }
      },
      async getProducts() {
        const data = await fetch(
          `http://localhost:3000/api/selectedProduct/${this.listId}`,
        )
        this.productList = await data.json()
        console.log(this.productList, ' id: ', this.listId)
      },
    },
  }
</script>

<template>
  <div class="UserListContainer">
    <h1 class="ListTitle">{{ listName }}</h1>
    <div class="filterContainer">
      <div class="categoryContainerBox">
        <div class="sortContainerBox">
          <button
            class="categoryButton filterButton fancy-font"
            @click="toggleDropdown('category')"
          >
            Categories
            <svg
              class="chevronDown"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
              />
            </svg>
          </button>
          <button
            class="sortButton filterButton fancy-font"
            @click="toggleDropdown('sort')"
          >
            Sort
            <svg
              class="chevronDown"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
              />
            </svg>
          </button>
          <button class="plusSign" @click="toggleDropdown('add')">
            <svg
              class="plusSignIcon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
              />
            </svg>
          </button>
        </div>
        <div v-show="showCategoryDropdown" class="categoryList">
          <button
            class="button button-dark"
            v-for="category in categories"
            :key="category.category_Id"
            :class="{ active: category.category_Id === selectedCategory }"
            @click="getCategoryProducts(category.category_Id)"
          >
            {{ category.categoryName }}
          </button>
        </div>
      </div>
      <div class="sortContainerBox">
        <div v-show="showSortDropdown" class="sortOptions">
          <button
            class="button button-dark"
            :class="{ active: sortOption === 'name' }"
            @click="sortProductList('name')"
          >
            Name
          </button>
          <button
            class="button button-dark"
            :class="{ active: sortOption === 'price' }"
            @click="sortProductList('price')"
          >
            Price
          </button>
        </div>
      </div>
    </div>
    <AddProduct
      v-if="showAddProduct"
      @close="showAddProduct = false"
      :list-id="listId"
    />
    <div id="main-container">
      <div
        id="products-container"
        v-for="product in productList"
        :key="product.product_Id"
      >
        <img
          class="product-images"
          :src="product.productImg"
          alt="product image"
        />
        <div id="product-info-container">
          <div class="title-price-container">
            <a :href="product.productURL" target="_blank">{{
              product.productName
            }}</a>
          </div>
          <div class="title-price-container">
            <p>{{ product.categoryName }}</p>
          </div>
          <div style="margin-top: auto" class="wish-amount-container">
            <p>
              Wished amount:
              {{
                product.selectedProductAmount - product.selectedProductPurchased
              }}
            </p>
          </div>
        </div>
        <div style="margin-left: auto" id="product-info-container">
          <div class="title-price-container">
            <h4 style="margin-left: auto; font-weight: 400">
              {{ product.productPrice }}:-
            </h4>
          </div>
          <div
            @click="
              $router.push({
                path: `/editProduct/${listId}/${product.selectedProduct_Id}`,
              })
            "
            class="edit-product-icon"
          >
            <img
              src="/assets/edit-button-svgrepo-com.svg"
              alt="happy hikers logo"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .plusSign {
    background-color: #cbbaa4;
    display: flex;
    border: none;
    height: 3rem;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .plusSignIcon {
    height: 0.75rem;
  }
  .ListTitle {
    margin-top: 2.5rem;
    margin-left: 1rem;
  }

  #products-container {
    width: 95%;
    display: flex;
    box-shadow: 1px 1px 4px rgb(143, 143, 143);
    margin: 25px 15px;
  }

  #product-info-container {
    margin: 8px 8px 15px 0px;
    display: flex;
    flex-direction: column;
  }

  .title-price-container {
    display: flex;
    margin: 4px 0px;
  }

  .title-price-container p {
    color: grey;
  }

  .wish-amount-container {
    margin-top: 3px;
    width: 100%;
  }

  p,
  a,
  h4 {
    margin: 3px;
    padding: 0px;
  }

  .product-images {
    width: 125px;
    height: 125px;
    align-self: center;
  }
  .edit-product-icon {
    margin-top: auto;
    margin-left: auto;
  }

  .categoryContainer {
    display: flex;
    flex-direction: row;
  }

  .filterContainer {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
  .categoryContainerBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .categoryList {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .sortOptions {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .sortButton {
    display: flex;
    background-color: #cbbaa4;
    border: none;
    height: 3rem;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .sortContainerBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .filterButton {
    display: flex;
    border: none;
    height: 3rem;
    width: 100%;
    justify-content: center;
    align-items: baseline;
  }
  .button {
    display: flex;
    background-color: #cbbaa49f;
    font-size: 0.75rem;
    font-family: Sen;
    color: black;
    text-align: left;
    text-transform: capitalize;
    width: 100%;
  }
  .categoryButton {
    padding: none;
    background-color: #cbbaa4;
  }
  .chevronDown {
    height: 0.75rem;
    margin-left: 0.25rem;
  }
</style>
