<script>
  import SignOut from '../components/SignOut.vue'
  export default {
    name: 'UserHomeView',
    components: {
      SignOut,
    },
  }
</script>

<template>
  <h1>Home</h1>
  <div id="btn-container" class="button:hover">
    <input id="list-btn" class="button" type="submit" value="LISTS" />
    <input id="guest-btn" class="button" type="submit" value="GUESTS" />
  </div>
  <SignOut />
</template>

<style lang="scss" scoped>
  #list-btn {
    width: 60%;
    margin-bottom: 10%;
  }

  #guest-btn {
    width: 60%;
  }

  #btn-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70%;
  }
</style>
