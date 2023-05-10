<script>
  export default {
    name: 'SigninView',
  }
</script>

<template>
  <h1>Registry Rebels</h1>
  <form action="" class="loginform">
    <label for="email">Email</label>
    <input type="text" />
    <label for="password">Password</label>
    <input type="password" />
    <button type="submit"><p id="singin-btn">Sign in</p></button>
    <p id="para-and-link">
      or
      <a href="länk fråga amelie"> sign up</a>
    </p>
  </form>
</template>

<style lang="scss" scoped>
  form {
    display: flex;
    flex-direction: column;
  }

  input {
    height: 100%;
  }

  button {
    background-color: black;
  }

  #singin-btn {
    color: white;
  }

  #para-and-link {
    display: flex;
    justify-content: center;
  }
</style>
