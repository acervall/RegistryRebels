<script>
  export default {
    computed: {
      user_Id() {
        return localStorage.getItem('user_Id')
      },
    },
    created() {
      this.getUserList()
    },
    data() {
      return {
        userList: [],
        listName: '',
        listImg: '',
        listDate: '',
        list_Id: '',
        changeListName: '',
        showChangeList: false,
        changeListId: null,
        listUrl: '',
      }
    },
    methods: {
      // Hämtar alla listor från databasen
      async getUserList() {
        const data = await fetch(
          `http://localhost:3000/api/user-product-list/user/${this.user_Id}`,
        )
        this.userList = await data.json()
        console.log(this.userList)
      },

      async addList() {
        // Skickar lista till databasen
        console.log('Innan send', this.listName, this.listU_Id, this.listUrl)
        if (this.listImg.trim() === '') {
          this.listImg = 'https://pbs.twimg.com/media/B55yevQCUAEG2Z2.jpg'
        }
        const send = await fetch(
          'http://localhost:3000/api/user-product-list',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              listName: this.listName,
              listDate: this.listDate,
              listImage: this.listImg,
              listUrl: this.listUrl,
              listU_Id: this.user_Id,
            }),
          },
        )
        // uppdaterar listan på listorna när du tar bort en lista
        this.getUserList()

        const data = await send.json()
        console.log('Svar från backend: ', data)
        this.listName = ''
        this.listImg = ''
        this.listDate = ''
        this.listUrl = ''
        this.listU_Id = ''
      },

      // toggleChangeList() {
      //   this.showChangeList = !this.showChangeList
      //   console.log('Klickar på ändra-ikonen')
      // },

      // SKA ändra och skicka listan till databasen

      async changeList(listU_Id, list_Id) {
        // this.listU_Id,
        console.log(
          'Innan send',
          this.changeListName,
          this.listU_Id,
          this.list_Id,
        )
        const send = await fetch(
          'http://localhost:3000/api/user-product-list',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // använder funktion
              listName: this.changeListName,
              // använder paramertarna
              listU_Id,
              list_Id,
            }),
          },
        )
        this.getUserList()

        const data = await send.json()
        console.log('Svar från backend: ', data)
        console.log(
          'Värdena har ändrats',
          this.changeListName,
          this.listU_Id,
          this.list_Id,
        )
      },
      toggleChangeList(index) {
        // Om den visar
        if (this.changeListId !== index) {
          this.showChangeList = true
        } else if (this.showChangeList) {
          this.showChangeList = false
        } else if (!this.showChangeList) {
          this.showChangeList = true
        }
        this.changeListId = index
      },

      // Tar bort en lista när jag klickar på trashcan
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
      },
    },
  }
</script>

<template>
  <div id="main-container">
    <div id="intro-container">
      <router-link to="/userlistsoverview">
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
      <h1>Add new List</h1>
      <div @click="addList" class="pointer" id="save-container">
        <p>Save</p>
      </div>
    </div>
    <div class="inputContainer">
      <label for="listName">Name</label>
      <input
        class="input-text-placeholder"
        type="text"
        id="listName"
        v-model="listName"
      />
      <label for="listDate">Date of event</label>
      <input
        class="input-text-placeholder"
        type="date"
        id="listDate"
        v-model="listDate"
      />
      <label for="listUrl">Image URL</label>
      <input
        class="input-text-placeholder"
        type="text"
        id="listUrl"
        v-model="listImg"
      />
      <label for="listUrl">URL</label>
      <input
        class="input-text-placeholder"
        type="text"
        id="listUrl"
        v-model="listUrl"
      />
      <p style="margin-top: 0px; margin-left: 1px">
        Your location will be: http://localhost:5173/#/{{ listUrl }}
      </p>
    </div>

    <!-- Lista på alla listor -->
    <h3 class="h3Wishlist titleWishlist">All wishlist</h3>
    <div
      id="userList-container"
      v-for="(user, index) in userList"
      :key="user.list_Id"
    >
      <div id="userlist-box">
        <img
          class="list-images-display"
          :src="user.listImage"
          alt="list image"
        />
        <div class="align-list-info">
          <h3 class="h3Wishlist">{{ user.listName }}</h3>
          <p style="font-size: 0.8rem">{{ user.listDate }}</p>
        </div>
        <div id="vsg-container">
          <div id="change-btn">
            <svg
              fill="#000000"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="22px"
              height="22px"
              viewBox="0 0 494.936 494.936"
              xml:space="preserve"
              @click="toggleChangeList(index)"
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

            <div id="trash-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22px"
                height="22px"
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

        <!-- Formulär för att ändra en lista -->
      </div>
      <form
        v-if="showChangeList && changeListId === index"
        @submit="changeList(this.user_Id, user.list_Id)"
      >
        <label class="labelChange" for="changeName"
          >Ändra namn på listan:
        </label>
        <input
          class="input-text-placeholder"
          type="text"
          v-model="changeListName"
        />

        <input class="change-info-btn" type="submit" value="Save changes" />
      </form>
    </div>
  </div>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Anek+Telugu:wght@300;400&display=swap');
  h1 {
    font-size: 1.25rem;
    margin: 0 0 0 20px;
    width: 100%;
    text-align: center;
    font-family: 'sen';
    font-weight: 100;
  }
  .h3Wishlist {
    font-family: 'sen';
    font-weight: 200;
    font-size: 1rem;
  }

  #intro-container {
    display: flex;
    align-items: center;
    margin: 25px 0px 50px 0px;
  }

  .svg-left {
    margin-top: 0px;
    margin-left: 1px;
  }

  #intro-container p {
    margin-left: auto;
    margin-right: 5px;
  }
  .idInfo {
    font-size: 0.5rem;
  }

  .input-text-placeholder {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid black;
    border-radius: 3px;
  }

  #userList-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-family: 'sen';
  }

  #userlist-box {
    display: flex;
    margin-bottom: 20px;
  }

  .align-list-info {
    margin-left: 15px;
  }

  .list-images-display {
    width: 110px;
    height: 110px;
    border-radius: 10px;
  }

  ul {
    list-style: none;
  }

  li {
    font-weight: 700;
  }

  #vsg-container {
    display: flex;
    margin-left: auto;
    margin-right: 20px;
  }

  #change-btn,
  #trash-btn {
    display: flex;
    align-items: flex-start;
  }

  #trash-btn {
    width: 15px;
  }

  #Capa_1 {
    margin-right: 8px;
    width: 15px;
  }
  .change-info-btn {
    border: none;
    height: 36px;
    width: 100%;
    border-radius: 25px;
    margin-top: 10px;
    background-color: rgb(209, 209, 208);
    margin-bottom: 4rem;
  }
  .labelChange {
    font-size: 0.75rem;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  #main-container {
    margin: 1rem;
    font-family: 'Sen';
    font-size: 1rem;
  }
  .inputContainer {
    font-size: 0.75rem;
    padding-bottom: 3rem;
  }
</style>
