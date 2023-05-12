<script>
  export default {
    // Marcus
    computed: {
      allGuests() {
        return this.guestList.flat()
      },
      // beräknar matkombinationerna
      foodCombinations() {
        const allGuests = this.allGuests

        const foodList = allGuests
          // skapar ny array foodlist med allGuests och kombinerar dem
          // sorterar matvalen
          .map((person) => person.foodChoice.sort().join(', '))
          // matval tom = äter allt
          .map((item) => (item === '' ? 'Äter allt' : item))

        // tom array lagrar unika matkombinationer och antal
        // beräknar och presenterar statistik
        const allFoodCombinations = []
        foodList.forEach((foodStr) => {
          const found = allFoodCombinations.find((food) => food.str === foodStr)
          if (found) {
            found.count++
          } else {
            allFoodCombinations.push({ str: foodStr, count: 1 })
          }
        })

        return allFoodCombinations.sort((a, b) => {
          if (a.count > b.count) return -1
          if (a.count < b.count) return 1
          return 0
        })
      },
    },

    created() {
      this.getParticipant()
    },
    data() {
      return {
        participants: [],
        guestList: [],
      }
    },
    methods: {
      async getParticipant() {
        const res = await fetch('http://localhost:3000/api/party')
        const json = await res.json()

        // uppdaterar guestList med matpreferensvärden
        this.guestList = json.data.reduce(
          (acc, curr) => [...acc, curr.participants],
          [],
        )

        // Uppdaterar participants arrayen
        this.participants = json.data.reduce((acc, party) => {
          const partyParticipants = party.participants.map(
            (participant) => ({}),
          )
          return [...acc, ...partyParticipants]
        }, [])
        // anropar
        this.countTotalIDs()
      },

      countTotalIDs() {
        //räknar antal gäster
        this.totalIDs = this.participants.length
      },
    },
  }
</script>

<template>
  <router-link to="/UserGuestOverView">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
      <path
        style="fill: #767676"
        d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"
        data-name="Left"
      />
    </svg>
  </router-link>

  <h1>Food</h1>
  <div class="guest-container">
    <h3>Antal gäster: {{ totalIDs }}</h3>
  </div>
  <div class="food-container">
    <p v-for="foodChoice in foodCombinations">
      <span class="styled-part"> {{ foodChoice.str }}: </span>
      {{ foodChoice.count }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
  svg {
    margin-left: 0.5rem;
    margin-top: 2rem;
    width: 1rem;
    height: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-top: 0.5rem;
  }
  h1 {
    padding: 0;
    margin: 1rem;
  }
  .styled-part {
    font-weight: 700;
  }
  .guest-container {
    background-color: #efefef;
    padding: 16px;
  }
  .food-container {
    -moz-box-shadow: 0 0 3px #ccc;
    -webkit-box-shadow: 0 0 3px #ccc;
    box-shadow: 0 0 3px #ccc;
    padding: 16px;
    margin: 24px 0;
  }
</style>
