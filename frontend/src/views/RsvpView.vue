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
    <h3>Namn</h3>
    <input placeholder="Förnamn" required type="text" v-model="firstName" />
    <input placeholder="Efternamn" required type="text" v-model="lastName" />
    <input placeholder="Förnamn" type="checkbox" v-model="specialNeeds" />
    <span>Specialkost - ja tack</span>
    <p>Specialkost</p>
    <div id="special-needs-container">
      <div class="justify-checkboxes-container">
        <input
          placeholder="Förnamn"
          id="vego"
          type="checkbox"
          v-model="addVegetariskt"
        />
        <label for="vego">Vegetariskt</label>
      </div>
      <div class="justify-checkboxes-container">
        <input
          placeholder="Förnamn"
          id="gluten"
          type="checkbox"
          v-model="addGluten"
        />
        <label for="gluten">Gluten</label>
      </div>
      <div class="justify-checkboxes-container">
        <input
          placeholder="Förnamn"
          id="laktos"
          type="checkbox"
          v-model="addLaktos"
        />
        <label for="laktos">Laktos</label>
      </div>
      <div class="justify-checkboxes-container">
        <input
          placeholder="Förnamn"
          id="other"
          type="checkbox"
          v-model="addAnnat"
        />
        <label for="other">Annat</label>
      </div>
    </div>
    <h3>Hur många är ni i ert sällskap</h3>
    <button class="subtract-btn" @click="subtractAmount">-</button>
    <span class="counter-value"> {{ amountGuests }} </span>
    <button class="add-btn" @click="addAmount">+</button>

    <div v-for="(guest, index) in guestList" :key="index">
      <h3>Namn</h3>
      <input
        placeholder="Förnamn"
        required
        type="text"
        v-model="guest.firstName"
      />
      <input
        placeholder="Efternamn"
        required
        type="text"
        v-model="guest.lastName"
      />
      <input
        id="specialNeeds"
        type="checkbox"
        v-model="guest.showSpecialNeeds"
        @change="toggleSpecialNeeds(index)"
      />
      <label for="specialNeeds">Behöver specialkost</label>
      <div class="checkbox-container">
        <div class="special-needs-container" v-if="guest.showSpecialNeeds">
          <div class="justify-checkboxes-container">
            <input id="vego" type="checkbox" v-model="guest.vegetariskt" />
            <label for="vego">Vegetariskt</label>
          </div>
          <div class="justify-checkboxes-container">
            <input id="gluten" type="checkbox" v-model="guest.gluten" />
            <label for="gluten">Gluten</label>
          </div>
          <div class="justify-checkboxes-container">
            <input id="laktos" type="checkbox" v-model="guest.laktos" />
            <label for="laktos">Laktos</label>
          </div>
          <div class="justify-checkboxes-container">
            <input id="other" type="checkbox" v-model="guest.annat" />
            <label for="other">Annat</label>
          </div>
        </div>
      </div>
    </div>

    <div id="btn-container">
      <input
        id="submit-buy-btn"
        type="button"
        value="Skicka"
        @click="submitForm"
      />
    </div>
  </main>
</template>

<style scoped>
  #special-needs-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .justify-checkboxes-container {
    display: flex;
  }

  #btn-container {
    margin-top: 25px;
  }
</style>
