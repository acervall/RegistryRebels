<script>
  export default {
    name: 'UserGuestOverView',
    created() {
      this.getGuestList()
    },
    data() {
      return {
        guestList: [],
      }
    },
    computed: {
      allGuests() {
        return this.guestList.flat()
      },
      totalAttending() {
        return this.allGuests.reduce(
          (acc, curr) => (curr.attending ? (acc += 1) : 0),
          0,
        )
      },
      // foodCombinations() {
      //   const allGuests = this.allGuests

      //   const foodList = allGuests
      //     .map((person) => person.foodChoice.sort().join(', '))
      //     .map((item) => (item === '' ? 'Äter allt' : item))

      //   const allFoodCombinations = []
      //   foodList.forEach((foodStr) => {
      //     const found = allFoodCombinations.find((food) => food.str === foodStr)
      //     if (found) {
      //       found.count++
      //     } else {
      //       allFoodCombinations.push({ str: foodStr, count: 1 })
      //     }
      //   })

      //   return allFoodCombinations.sort((a, b) => {
      //     if (a.count > b.count) return -1
      //     if (a.count < b.count) return 1
      //     return 0
      //   })
      // },
      totalGuests() {
        return this.allGuests.length
      },
    },
    methods: {
      async getGuestList() {
        const res = await fetch('http://localhost:3000/api/party')
        const json = await res.json()

        this.guestList = json.data.reduce(
          (acc, curr) => [...acc, curr.participants],
          [],
        )
      },
    },
  }
</script>

<template>
  <h1>Guests</h1>
  <div class="summary-container">
    <div class="column">
      <p><a href="/#/UserGuestFoodView">Food page</a></p>
      <p>Invited: {{ totalGuests }}</p>
      <p>Attending: {{ totalAttending }}</p>
    </div>
    <div class="column">
      <!-- <p v-for="foodChoice in foodCombinations">
        {{ foodChoice.str }}: {{ foodChoice.count }}
      </p> -->
    </div>
  </div>
  <div class="party-container" v-for="(party, index) in guestList">
    <div class="party-info">
      <p>People: {{ party.length }}</p>
      <p>
        Special food:
        {{
          party.reduce(
            (acc, curr) => acc + (curr.foodChoice.length > 0 ? 1 : 0),
            0,
          )
        }}
      </p>
    </div>
    <ul>
      <li class="person-container" v-for="person in party" :key="person._id">
        <p>{{ person.name }}</p>
        <p>{{ person.foodChoice.join(', ') }}</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  ul {
    padding: 0;
    li {
      list-style-type: none;
    }
  }

  .summary-container {
    background-color: #efefef;
    padding: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .column {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      max-width: 45%;
    }

    .column:last-of-type {
      text-align: end;
    }
  }

  .party-container {
    -moz-box-shadow: 0 0 3px #ccc;
    -webkit-box-shadow: 0 0 3px #ccc;
    box-shadow: 0 0 3px #ccc;
    padding: 16px;
    margin: 24px 0;

    .party-info {
      border-bottom: 1px solid #010101;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 16px;
      padding-bottom: 16px;
    }

    .person-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      p {
        display: inline;
      }
      p:last-of-type {
        text-align: end;
      }
    }
  }
</style>
