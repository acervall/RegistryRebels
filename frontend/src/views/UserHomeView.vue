<script>
  import SignOut from '../components/SignOut.vue'
  export default {
    name: 'UserHomeView',
    components: {
      SignOut,
    },

    data() {
      return {
        user: localStorage.User,
      }
    },
  }
</script>

<template>
  <h1>Home {{ this.user }}</h1>
  <div id="btn-container" class="button:hover">
    <router-link to="/userlistsoverview">
      <input id="list-btn" class="button" type="submit" value="LISTS" />
    </router-link>

    <router-link to="/UserGuestOverView">
      <input id="guest-btn" class="button" type="submit" value="GUESTS" />
    </router-link>
  </div>
  <SignOut />
</template>

<style lang="scss" scoped>
  #list-btn {
    margin-bottom: 20%;
  }

  #btn-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60%;
  }
</style>
