<script>
  export default {
    name: 'SignupView',
  }
</script>

<template>
  <div id="signup">
    <h1>Registry Rebels</h1>

    <div class="form-section">
      <form action="" class="loginform">
        <label for="name">Name</label>
        <input class="txt-input" type="text" />

        <label for="email">Email</label>
        <input class="txt-input" type="email" name="email" id="email" />

        <label for="password">Password</label>
        <input
          class="txt-input"
          type="password"
          name="password"
          id="password"
        />

        <input class="button" type="submit" value="Sign up" />
      </form>

      <div id="para-and-link">
        <p>
          or
          <a href="/#/signin"> sign in</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
