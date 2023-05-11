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
      totalFood() {
        const allGuests = this.allGuests
        const total = allGuests.reduce(
          (acc, curr) => acc + curr.foodChoice.length,
          0,
        )
        return total
      },
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
    <p><a href="/#/UserGuestFoodView">Food:</a> {{ totalFood }}</p>
    <p>Invited: {{ totalGuests }}</p>
    <p>Attending: {{ totalAttending }}</p>
  </div>
  <div class="party-container" v-for="(party, index) in guestList">
    <div class="party-info">
      <!-- <p>Party: {{ index + 1 }}</p> -->
      <p>People: {{ party.length }}</p>
      <p>
        Food: {{ party.reduce((acc, curr) => acc + curr.foodChoice.length, 0) }}
      </p>
    </div>
    <ul>
      <li class="person-container" v-for="person in party" :key="person._id">
        <p>{{ person.name }}</p>
        <p>{{ person.foodChoice.join(', ') }}</p>
      </li>
    </ul>
    <!-- <pre v-for="guest in participant">{{ guest }}</pre> -->
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
  }

  .party-container {
    -moz-box-shadow: 0 0 3px #ccc;
    -webkit-box-shadow: 0 0 3px #ccc;
    box-shadow: 0 0 3px #ccc;
    padding: 16px;
    margin: 24px 0;

    // display: flex;
    // flex-direction: column;

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
    }
  }
</style>
