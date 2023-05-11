<script>
  export default {
    name: 'UserListsOverView',
    mounted() {
      const date = new Date()
      const options = { month: 'long', day: 'numeric', year: 'numeric' }
      this.currentDate = date.toLocaleDateString('sv-SE', options)
    },
    created() {
      this.getUserList()
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
        const data = await fetch('http://localhost:3000/api/user-product-list')
        this.userList = await data.json()
        this.userListLength = this.userList.length
        // console.log(this.userListLength)
        this.lists()
      },
      async lists() {
        for (let i = 1; i < this.userListLength + 1; i++) {
          const data = await fetch(
            'http://localhost:3000/api/selectedProduct/' + i,
          )
          const listItems = await data.json()
          this.listItems.push(listItems) // Assign the fetched data to listItems
          const itemsAmount = []
          itemsAmount.push(listItems.length)
          this.itemsAmount.push(itemsAmount)
        }
      },
      triggerSpecificList(listId) {
        console.log(listId)
        this.$router.push({
          path: '/userlist',
          query: {
            listId: listId,
          },
        })
      },
    },
  }
</script>

<template>
  <main>
    <h1>My lists</h1>
    <input id="new-list-btn" type="button" value="Create new list" />
    <div
      v-for="(list, index) in userList"
      :key="list.list_Id"
      id="list-container"
    >
      <div class="list-box-container" :class="{ open: list.openItems }">
        <img :src="list.listImage" alt="test" />
        <div class="align-info-box">
          <h3>{{ list.listName }}</h3>
          <p class="date-text">{{ currentDate }}</p>
          <div class="items-amount-box">
            <p v-for="(amount, i) in itemsAmount[index]" :key="i">
              {{ amount }} Items
            </p>
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
