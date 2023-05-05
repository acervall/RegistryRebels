<script>
  export default {
    data() {
      return {
        isMenuOpen: false,
      }
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen
      },
    },
  }
</script>

<template>
  <div class="container navbar">
    <div class="parent">
      <div class="menu" :class="{ 'menu-open': isMenuOpen }">
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      </div>
      <div class="hamburger" @click="toggleMenu">
        <span />
        <span />
        <span />
      </div>
    </div>

    <!-- Make title dynamic -->
    <h1 class="title">Wedding</h1>
  </div>
</template>

<style scoped>
  .container {
    margin: 1rem;
  }
  .title {
    margin-bottom: 1.5rem;
    padding-top: 0rem;
  }
  .parent {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .hamburger {
    display: block;
    width: 25px;
    height: 20px;
    position: relative;
    cursor: pointer;
    margin-right: 1rem;
    margin-top: 1rem;
  }

  .hamburger span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: black;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }

  .hamburger span:nth-child(1) {
    top: 0px;
  }

  .hamburger span:nth-child(2) {
    top: 8px;
  }

  .hamburger span:nth-child(3) {
    top: 16px;
  }

  .hamburger.menu-open span:nth-child(1) {
    top: 8px;
    transform: rotate(45deg);
  }

  .hamburger.menu-open span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.menu-open span:nth-child(3) {
    top: 8px;
    transform: rotate(-45deg);
  }

  .menu {
    margin-top: 2rem;
    position: absolute;
    top: 80px;
    right: -100%;
    width: 100%;
    height: 100%;
    background: white;
    transition: all 0.3s ease-in-out;
    z-index: 999;
  }

  .menu-open {
    right: 0%;
  }
</style>
