<script>
  export default {
    name: 'SignupView',

    data() {
      return {
        url: 'http://localhost:3000/',
        userName: null,
        userEmail: null,
        userPassword: null,
      }
    },

    methods: {
      async createNewUser() {
        if (
          this.userName != null ||
          this.userEmail != null ||
          this.userPassword != null
        ) {
          const createUser = await fetch(`${this.url}api/user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userName: this.userName,
              userEmail: this.userEmail,
              userPassword: this.userPassword,
            }),
          })
          const data = await createUser.json()
          if (data.success) {
            localStorage.setItem('User', this.userName)
            this.$router.push({ path: '/userhome' })
          }
        } else {
          console.log('Du måste fylla i alla fält')
        }
      },
    },
  }
</script>

<template>
  <div id="signup">
    <h1>Registry Rebels</h1>

    <div class="form-section">
      <form @submit.prevent="createNewUser()" class="loginform">
        <label for="name">Name</label>
        <input class="txt-input" type="text" v-model="userName" />

        <label for="email">Email</label>
        <input
          class="txt-input"
          type="email"
          name="email"
          id="email"
          v-model="userEmail"
        />

        <label for="password">Password</label>
        <input
          class="txt-input"
          type="password"
          name="password"
          id="password"
          v-model="userPassword"
        />

        <input class="button-dark" type="submit" value="Sign up" />
      </form>

      <div>
        <p>
          or
          <a href="/#/signin"> sign in</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
