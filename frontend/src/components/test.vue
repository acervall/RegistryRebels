<script>
  export default {
    created() {
      this.getUserList()
    },
    data() {
      return {
        userList: [],
        listName: '',
        listU_Id: '',
        list_Id: '',
        changedListClicked: false,
        // removeBtnClicked: false,
        // deleteList: false,
      }
    },
    methods: {
      // Hämtar alla listor från databasen
      async getUserList() {
        const data = await fetch('http://localhost:3000/api/user-product-list')
        this.userList = await data.json()
        console.log(this.userList)
      },

      async addList() {
        // Skickar lista till databasen
        console.log('Innan send', this.listName, this.listU_Id)
        const send = await fetch(
          'http://localhost:3000/api/user-product-list',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              listName: this.listName,
              listU_Id: this.listU_Id,
            }),
          },
        )
        // uppdaterar listan på listorna när du tar bort en lista
        this.getUserList()

        const data = await send.json()
        console.log('Svar från backend: ', data)
      },
      // toggleIconChangeClicked() {
      //   this.changedListClicked = !this.changedListClicked
      //   console.log('Du har klickat på change')
      // },

      async changeList(list_Id) {
        console.log('Du har klickat på changeList')
        // SKA ändra och skicka listan till databasen
        // this.listU_Id,
        console.log('Innan send', this.listName, this.list_Id)
        const send = await fetch(
          'http://localhost:3000/api/user-product-list',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              listName: this.listName,
              // listU_Id: this.listU_Id,
              list_Id: this.list_Id,
            }),
          },
        )

        const data = await send.json()
        console.log('Svar från backend: ', data)
      },

      async deleteList(list_Id) {
        // Skickar lista till databasen
        console.log('Innan send', list_Id)
        const send = await fetch(
          'http://localhost:3000/api/user-product-list',
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              list_Id: list_Id,
            }),
          },
        )
        // uppdaterar listan på listorna när du tar bort en lista
        this.getUserList()

        const data = await send.json()
        console.log('Svar från backend: ', data)
        console.log('Efter send', list_Id)
      },
    },
  }
</script>

<template>
  <div id="main-container">
    <h1>Create Wislist</h1>
    <div>
      <!-- Formulär -->
      <form v-on:submit="addList">
        <label for="listName">Namn på listan :</label>
        <input type="text" id="listName" v-model="listName" />
        <label for="listU_Id">Skriv in id: </label>
        <input type="number" id="listU_Id" name="listU_Id" v-model="listU_Id" />
        <input type="submit" value="Save list" />
      </form>
    </div>

    <!-- Lista på alla listor -->
    <h3>All wishlist</h3>
    <div id="userList-container" v-for="user in userList" :key="user.list_Id">
      <div id=" list-of-lists">
        <ul>
          <li>{{ user.listName }} {{ user.listU_Id }}</li>
        </ul>
      </div>

      <div id="vsg-container">
        <div id="change-btn">
          <svg
            fill="#000000"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="15px"
            height="15px"
            viewBox="0 0 494.936 494.936"
            xml:space="preserve"
            @click="changeList(user.list_Id)"
          >
            <g>
              <g>
                <path
                  d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157
			          c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21
			          s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741
			          c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"
                />
                <path
                  d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069
			          c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963
			          c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692
			          C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107
			          l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005
			          c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"
                />
              </g>
            </g>
          </svg>
          <!-- Formulär för att ändra en lista -->
          <form v-on:submit="changeList">
            <label v-if="changedListClicked" for="changeName"
              >Ändra namn på listan:
            </label>
            <input v-if="changedListClicked" type="text" />
            <!-- <label v-if="changedListClicked" for="list-user-Id"
              >Användar-Id:
            </label>
            <input v-if="changedListClicked" type="number" /> -->
            <label v-if="changedListClicked" for="list-Id">List-Id: </label>
            <input v-if="changedListClicked" type="number" />
            <input v-if="changedListClicked" type="submit" value="Save list" />
          </form>
        </div>

        <!-- Trash -->
        <div id="trash-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
            @click="deleteList(user.list_Id)"
          >
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
            />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  ul {
    list-style: none;
  }
</style>
