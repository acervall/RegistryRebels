<script>
  export default {
    data() {
      return {
        productList: [],
      }
    },
  }
</script>

<template>
  <div id="greeting-container">
    <h2>Tack för ditt köp!</h2>
    <h4>Lämna gärna en hälsning </h4>
    <form action="">
      <textarea id="greeting-input" name="greeting" rows="8" cols="40" />
      <br />
      <div id="btn-container">
        <input id="submit-greeting-btn" type="submit" value="Submit" @click="$emit('submit-greeting')" />
        <input id="cancel-greeting-btn" value="Cancel" @click="$emit('submit-greeting')" />
      </div>
    </form>
  </div>

</template>

<style scoped>
  #greeting-container {
    position: fixed;
    top: 30vh;
    left: 3.3vh;
    border: 1px solid black;
    width: 85%;
    display: flex;
    flex-direction: column;
    padding: 10px 0px 20px 0px;
    align-items: center;
    color: rgb(0, 0, 0);
    background-color: rgb(255, 255, 255);
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  textarea {
    border: 1px solid black;
  }

  #btn-container {
    width: 70%;
    display: flex;
    justify-content: space-around;
  }

  #submit-greeting-btn {
    width: 85px;
    height: 30px;
    background-color: #828576;
    border-radius: 5px;
    border: none;
  }

  #cancel-greeting-btn {
    width: 81px;
    height: 28px;
    text-align: center;
    background-color: #ccccca;
    border-radius: 5px;
    border: none;
  }
</style>
