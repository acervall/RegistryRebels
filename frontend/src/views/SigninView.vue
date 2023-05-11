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
      <input class="button" type="submit" value="Sign up" />

      <!-- <div id="btn-div">
        <button type="submit">
          <h3 id="singin-btn-h3">Sign in</h3>
        </button>
      </div> -->

      <div id="para-and-link">
        <p>or</p>
        <a href="/#/signup"> sign up</a>
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

  // #lab-email {
  //   margin-right: 110%;
  //   margin-bottom: 10px;
  // }

  // #lab-password {
  //   margin-top: 10%;
  //   margin-right: 100%;
  // }

  // input {
  //   height: 100%;
  //   width: 250px;
  //   height: 40px;
  // }

  // #input-email {
  //   margin-top: 10px;
  // }

  // #input-passw {
  //   margin-top: 10px;
  // }

  // button {
  //   margin-top: 50%;
  //   background-color: black;
  //   width: 100px;
  //   height: 37px;
  // }

  // #singin-btn-h3 {
  //   color: white;
  //   font-weight: 400;
  //   font-size: 18px;
  //   line-height: 22.25px;
  //   text-align: center;
  // }

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
