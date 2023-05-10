<script>
  export default {
    name: 'SigninView',
  }
</script>

<template>
  <h1>Registry Rebels</h1>
  <div class="container">
    <form action="" class="loginform">
      <label id="lab-email" for="email">Email</label>
      <input type="text" />
      <label id="lab-password" for="password">Password</label>
      <input type="password" />

      <div id="btn-div">
        <button type="submit"><p id="singin-btn">Sign in</p></button>
      </div>

      <div id="para-and-link">
        <p>or</p>
        <a href="länk fråga amelie"> sign up</a>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  h1 {
    margin-top: 20%;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin-top: 20%;
  }

  #lab-email {
    margin-right: 70%;
  }

  #lab-password {
    margin-top: 5%;
    margin-right: 60%;
  }

  input {
    height: 100%;
    width: 250px;
  }

  button {
    margin-top: 50%;
    background-color: black;
  }

  #singin-btn {
    color: white;
  }

  a {
    color: grey;
    text-decoration: none;
  }

  #para-and-link {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #para-and-link p {
    margin-right: 5px;
  }
</style>
