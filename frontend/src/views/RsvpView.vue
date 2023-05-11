<script>
  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        addVegetariskt: false,
        addGluten: false,
        addLaktos: false,
        addAnnat: false,
        amountGuests: 1,
        guestList: [],
        specialNeeds: false,
        group: 0,
        attending: true,
        specialNeedsHost: false,
      }
    },
    methods: {
      async submitForm() {
        this.group++
        const participants = []
        const hostFoodChoice = []

        if (this.addVegetariskt) hostFoodChoice.push('Vegetariskt')
        if (this.addGluten) hostFoodChoice.push('Gluten')
        if (this.addLaktos) hostFoodChoice.push('Laktos')
        if (this.addAnnat) hostFoodChoice.push('Annat')
        const hostParticipant = {
          name: `${this.firstName} ${this.lastName}`,
          foodChoice: hostFoodChoice,
          attending: this.attending,
          group: this.group,
          specialNeeds: this.specialNeeds,
        }
        participants.push(hostParticipant)

        for (const guest of this.guestList) {
          let foodChoice = []
          if (guest.vegetariskt) foodChoice.push('Vegetariskt')
          if (guest.gluten) foodChoice.push('Gluten')
          if (guest.laktos) foodChoice.push('Laktos')
          if (guest.annat) foodChoice.push('Annat')

          const newParticipant = {
            name: `${guest.firstName} ${guest.lastName}`,
            foodChoice: foodChoice,
            attending: true,
            group: this.group,
            specialNeeds: guest.showSpecialNeeds,
          }

          participants.push(newParticipant)
        }

        const payload = {
          participants: participants,
        }

        const response = await fetch('http://localhost:3000/api/party', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        console.log(response)
      },
      specialNeedsUserToggle() {
        if (!this.specialNeedsHost) {
          this.specialNeedsHost = true
        } else if (this.specialNeedsHost) {
          this.specialNeedsHost = false
        }
      },
      addAmount() {
        if (this.amountGuests < 9) {
          this.amountGuests++
        }
      },
      subtractAmount() {
        if (this.amountGuests > 1) {
          this.amountGuests--
        }
      },
      toggleSpecialNeeds(index) {
        this.$set(
          this.guestList[index],
          'showSpecialNeeds',
          !this.guestList[index].showSpecialNeeds,
        )
      },
    },
    watch: {
      amountGuests: {
        immediate: true,
        handler() {
          this.guestList = Array.from(
            { length: this.amountGuests - 1 },
            () => ({
              firstName: '',
              lastName: '',
              showSpecialNeeds: false,
              vegetariskt: false,
              gluten: false,
              laktos: false,
              annat: false,
            }),
          )
        },
      },
    },
  }
</script>

<template>
  <main>
    <div id="intro-text-container">
      <h1>Répondez S'il Vous Plait</h1>
      <h2>"Snälla svara"</h2>
    </div>
    <div id="host-input-container">
      <h3>Namn</h3>
      <input
        class="input-text-placeholder"
        id="host-first-name"
        placeholder="Förnamn"
        required
        type="text"
        v-model="firstName"
      />
      <input
        class="input-text-placeholder"
        id="host-last-name"
        placeholder="Efternamn"
        required
        type="text"
        v-model="lastName"
      />
      <div id="checkbox-host-special-container">
        <input
          id="myCheckbox"
          class="checkboxes-styles"
          style="margin-left: 0px"
          placeholder="checkboxSpecial"
          type="checkbox"
          @click="specialNeedsUserToggle"
        />
        <span style="margin-left: 3px">Jag är i behov av specialkost</span>
      </div>
    </div>
    <div v-if="specialNeedsHost">
      <p style="font-weight: 600; margin-bottom: 2px">Specialkost</p>
      <div id="special-needs-container">
        <div class="justify-checkboxes-container">
          <input
            class="checkboxes-styles"
            placeholder="Förnamn"
            id="vego"
            type="checkbox"
            v-model="addVegetariskt"
          />
          <label for="vego">Vegetariskt</label>
        </div>
        <div class="justify-checkboxes-container">
          <input
            class="checkboxes-styles"
            placeholder="Förnamn"
            id="gluten"
            type="checkbox"
            v-model="addGluten"
          />
          <label for="gluten">Gluten</label>
        </div>
        <div class="justify-checkboxes-container">
          <input
            class="checkboxes-styles"
            placeholder="Förnamn"
            id="laktos"
            type="checkbox"
            v-model="addLaktos"
          />
          <label for="laktos">Laktos</label>
        </div>
        <div class="justify-checkboxes-container">
          <input
            class="checkboxes-styles"
            placeholder="Förnamn"
            id="other"
            type="checkbox"
            v-model="addAnnat"
          />
          <label for="other">Annat</label>
        </div>
      </div>
    </div>
    <h3>Hur många är ni i ert sällskap</h3>
    <div id="btns-guests-container">
      <button class="subtract-btn" @click="subtractAmount">-</button>
      <span class="counter-value"> {{ amountGuests }} </span>
      <button class="add-btn" @click="addAmount">+</button>
    </div>

    <div
      class="guest-container"
      v-for="(guest, index) in guestList"
      :key="index"
    >
      <h3>Namn</h3>
      <input
        class="input-text-placeholder"
        placeholder="Förnamn"
        required
        type="text"
        v-model="guest.firstName"
      />
      <input
        class="input-text-placeholder"
        placeholder="Efternamn"
        required
        type="text"
        v-model="guest.lastName"
      />

      <div class="checkbox-container-guest">
        <input
          class="checkboxes-styles"
          id="specialNeeds"
          type="checkbox"
          v-model="guest.showSpecialNeeds"
          @change="toggleSpecialNeeds(index)"
        />
        <label for="specialNeeds">Behöver specialkost</label>
      </div>
      <div class="checkbox-container">
        <div class="special-needs-container" v-if="guest.showSpecialNeeds">
          <p style="font-weight: 600; margin-bottom: 2px">Specialkost</p>
          <div class="justify-checkboxes-container">
            <input
              class="checkboxes-styles"
              id="vego"
              type="checkbox"
              v-model="guest.vegetariskt"
            />
            <label for="vego">Vegetariskt</label>
          </div>
          <div class="justify-checkboxes-container">
            <input
              class="checkboxes-styles"
              id="gluten"
              type="checkbox"
              v-model="guest.gluten"
            />
            <label for="gluten">Gluten</label>
          </div>
          <div class="justify-checkboxes-container">
            <input
              class="checkboxes-styles"
              id="laktos"
              type="checkbox"
              v-model="guest.laktos"
            />
            <label for="laktos">Laktos</label>
          </div>
          <div class="justify-checkboxes-container">
            <input
              class="checkboxes-styles"
              id="other"
              type="checkbox"
              v-model="guest.annat"
            />
            <label for="other">Annat</label>
          </div>
        </div>
      </div>
    </div>

    <div id="btn-container">
      <input
        class="button"
        id="send-application-btn"
        type="button"
        value="Skicka"
        @click="submitForm"
      />
    </div>
  </main>
</template>

<style>
  body {
    background-color: #cbbaa4;
  }
  #intro-text-container {
    border-bottom: 1px solid rgb(233, 233, 233);
  }

  #intro-text-container h1 {
    font-size: 2em;
  }

  #intro-text-container h2 {
    font-size: 1.5em;
  }

  #host-input-container {
    display: flex;
    flex-direction: column;
  }

  #checkbox-host-special-container {
    display: flex;
    align-items: center;
  }

  .special-needs-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
    margin-top: -20px;
  }
  .justify-checkboxes-container {
    display: flex;
    align-items: center;
    margin-top: 5px;
  }

  .justify-checkboxes-container input {
    margin-left: 0px;
  }

  .justify-checkboxes-container label {
    padding-left: 5px;
  }

  #btns-guests-container {
    display: flex;
  }

  .counter-value {
    padding: 6px 80px;
    background-color: white;
    height: 30px;
  }

  .subtract-btn,
  .add-btn {
    height: 30px;
    width: 30px;
    border: none;
  }

  .guest-container {
    border-bottom: 1px solid rgb(233, 233, 233);
  }

  .checkbox-container-guest {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .checkbox-container-guest input {
    margin-left: 0px;
  }

  .checkbox-container-guest label {
    padding-left: 5px;
  }

  #btn-container {
    margin-top: 35px;
    display: flex;
    justify-content: center;
  }

  .checkboxes-styles {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 2px solid #999;
    background-color: #ffffff;
    border-radius: 4px;
  }

  input[type='checkbox'] {
    position: relative;
    cursor: pointer;
  }
  input[type='checkbox']:before {
    content: '';
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    border-radius: 3px;
    background-color: rgb(255, 255, 255);
  }
  input[type='checkbox']:checked:after {
    content: '';
    display: block;
    width: 4px;
    height: 8px;
    border: solid rgb(2, 2, 2);
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    top: 3.5px;
    left: 7px;
  }
</style>
