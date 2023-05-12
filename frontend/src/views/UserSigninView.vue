<script>
  export default {
    name: 'SigninView',

    data() {
      return {
        url: 'http://localhost:3000/',
        userEmail: null,
        userPassword: null,
      }
    },

    methods: {
      async userSignIn() {
        console.log('hejsh')
        if (this.userEmail != null || this.userPassword != null) {
          const createUser = await fetch(`${this.url}api/user/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userEmail: this.userEmail,
              userPassword: this.userPassword,
            }),
          })
          const data = await createUser.json()
          if (data.length === 1) {
            localStorage.setItem('User', data[0].userName)
            console.log(localStorage)
            this.$router.push({ path: '/userhome' })
          } else {
            console.log('Fel lösenord eller användarnamn')
          }
        }
      },
    },
  }
</script>

<template>
  <div id="signin">
    <h1>Registry Rebels</h1>

    <div class="form-section">
      <form @submit.prevent="userSignIn()" class="loginform">
        <label for="email">Email</label>
        <input class="txt-input" type="text" v-model="userEmail" />

        <label for="password">Password</label>
        <input class="txt-input" type="password" v-model="userPassword" />

        <input class="button-dark" type="submit" value="Sign in" />
      </form>

      <div id="a-div">
        <p>
          <router-link to="/signup">
            <a> sign up</a>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
