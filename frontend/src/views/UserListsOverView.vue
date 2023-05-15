<script>
  export default {
    name: 'UserListsOverView',
    mounted() {
      const date = new Date()
      const options = { month: 'long', day: 'numeric', year: 'numeric' }
      this.currentDate = date.toLocaleDateString('sv-SE', options)
    },
    computed: {
      user_Id() {
        return localStorage.getItem('user_Id')
      },
    },
    created() {
      this.getUserList()
      this.lists()
      this.userList.forEach((list) => {
        this.$set(list, 'openItems', false)
      })
    },
    data() {
      return {
        userList: [],
        userListLength: 0,
        listItems: [],
        currentDate: '',
        itemsAmount: [],
      }
    },
    methods: {
      async getUserList() {
        const data = await fetch(
          `http://localhost:3000/api/user-product-list/user/${this.user_Id}`,
        )
        this.userList = await data.json()

        this.lists()
      },
      async lists() {
        for (let i = 0; i < this.userList.length; i++) {
          const data = await fetch(
            'http://localhost:3000/api/selectedProduct/' +
              this.userList[i].list_Id,
          )
          const listItems = await data.json()
          this.listItems.push(listItems) // Assign the fetched data to listItems
        }
        this.itemsAmount = this.listItems.map((list) => list.length)
        console.log(this.listItems)
      },
      triggerSpecificList(listId) {
        this.$router.push(`/userlist/${listId}`)
      },
    },
  }
</script>

<template>
  <main>
    <router-link to="/userhome">
      <svg
        class="svg-left"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 25"
      >
        <path
          style="fill: #767676"
          d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"
          data-name="Left"
        />
      </svg>
    </router-link>
    <h1>My lists</h1>
    <router-link to="/userlistadd">
      <input id="new-list-btn" type="button" value="Create new list" />
    </router-link>
    <div
      v-for="(list, index) in userList"
      :key="list.list_Id"
      id="list-container"
    >
      <div class="list-box-container" :class="{ open: list.openItems }">
        <img :src="list.listImage" alt="list image" />
        <div class="align-info-box">
          <router-link :to="list.listUrl">
            <h3>{{ list.listName }}</h3>
          </router-link>
          <p class="date-text">{{ list.listDate }}</p>
          <div class="items-amount-box">
            <p>{{ itemsAmount[index] }} Items</p>
          </div>
        </div>
        <div class="burger-box" @click="triggerSpecificList(list.list_Id)">
          <span />
          <span />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
  main {
    width: 95%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  h1 {
    margin-left: 0;
    margin-bottom: 60px;
  }

  #new-list-btn {
    border: none;
    height: 36px;
    width: 100%;
    border-radius: 25px;
    background-color: rgb(209, 209, 208);
  }

  #list-container {
    width: 100%;
    margin-top: 30px;
  }
  .list-box-container {
    display: flex;
    align-items: center;
    margin-top: 0px;
  }
  .list-box-container img {
    width: 110px;
    height: 110px;
    border-radius: 20px;
  }

  .align-info-box {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
  }

  .align-info-box h3 {
    margin-bottom: 5px;
    margin-top: 0px;
    margin-bottom: 10px;
    color: #000000;
  }

  .date-text {
    margin-top: 0px;
    font-size: 0.7rem;
    margin-left: 1px;
  }

  .items-amount-box {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: rgb(209, 209, 208);
    border-radius: 15px;
    margin-top: 10px;
  }

  .items-amount-box p {
    margin: 3px;
    font-size: 0.8rem;
  }

  .burger-box {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: 15px;
  }

  .burger-box span {
    width: 30px;
    height: 3px;
    background-color: rgb(32, 32, 32);
    margin-bottom: 5px;
  }
</style>
