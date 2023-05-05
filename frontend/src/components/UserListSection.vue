<script>
 export default {
    created() {
      this.getUserList()
    },
    data() {
      return {
        userList: [],
        listName: "",
        listU_Id: "" ,
      }
    },
    methods: {
        // Hämtar alla listor från databasen
      async getUserList() {
        const data = await fetch('http://localhost:3000/api/user-product-list')
        this.userList = await data.json()
        console.log(this.userList)
      },
      async submitForm(){
        // Skickar lista till databasen
        console.log("Innan send", this.listName, this.listU_Id)
    const send = await fetch('http://localhost:3000/api/user-product-list',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        
            listName: this.listName,
            listU_Id: this.listU_Id
        })    
    })
  
    const data = await send.json()
        console.log("Svar från backend: ", data) 
      }
    },
  }
</script>

<template>
<div id="main-container">
  <h1>Create Wislist</h1>
    <div>
        <!-- Formulär -->
    <form v-on:submit="submitForm">
        <label for="listName">Namn på listan :</label>
        <input type="text" id="listName" v-model="listName">
        <label for="listU_Id">Skriv in id: </label>
        <input type="number" id="listU_Id" name="listU_Id" v-model="listU_Id">
        <input type="submit" value="Save list">
    </form>
    </div>

    <!-- Lista på alla listor -->
    <h3>All wishlist</h3>
    <div id="userList-container"
    v-for="user in userList"
    :key="user.list_Id">
    <p>{{ user.listName }} {{ user.listU_Id }}</p>
    
    </div>
</div>
</template>