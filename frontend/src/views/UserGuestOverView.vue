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
  <router-link to="/userhome">
    <svg
      class="svg-left"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 25"
    >
      <path
        style="fill: #767676"
        d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"
        data-name="Left"
      />
    </svg>
  </router-link>
  <h1>Guests</h1>
  <div class="summary-container">
    <div class="column">
      <p><a href="/#/UserGuestFoodView">Food page</a></p>
      <p>Invited: {{ totalGuests }}</p>
      <p>Attending: {{ totalAttending }}</p>
    </div>
    <div class="column"></div>
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

  .svg-left {
    margin-top: 2rem;
    margin-bottom: 2rem;
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
