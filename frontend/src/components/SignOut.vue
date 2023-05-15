<script>
  export default {
    name: 'SignOut',

    methods: {
      signout() {
        localStorage.clear()
        this.$router.push({ path: '/' })
      },
    },
  }
</script>

<template>
  <div @click="signout()"><a>sign out</a></div>
</template>

<style lang="scss" scoped>
  div {
    text-align: center;
    position: absolute;
    bottom: 7vh;
    left: calc(50vw - 30px);
    cursor: pointer;
  }
</style>
