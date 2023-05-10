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
      <input id="input-email" type="text" />
      <label id="lab-password" for="password">Password</label>
      <input id="input-passw" type="password" />

      <div id="btn-div">
        <button type="submit">
          <p id="singin-btn">Sign in</p>
        </button>
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
    margin-right: 110%;
    margin-bottom: 10px;
  }

  #lab-password {
    margin-top: 10%;
    margin-right: 100%;
  }

  input {
    height: 100%;
    width: 250px;
    height: 40px;
  }

  #input-email {
    margin-top: 10px;
  }

  #input-passw {
    margin-top: 10px;
  }

  button {
    margin-top: 50%;
    background-color: black;
    width: 100px;
    height: 40px;
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
