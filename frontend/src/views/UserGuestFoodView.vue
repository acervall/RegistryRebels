<script>
  export default {
    // name: 'UserGuestFoodView',
    created() {
      this.getParticipant()
    },
    data() {
      return {
        participants: [],
        name: '',
        foodChoice: [],
        attending: true,
        group: '',
        _id: '',
        totalIDs: 0,

        foodCounts: {
          vegetarian: 0,
          gluten: 0,
          lactose: 0,
          other: 0,
        },
      }
    },
    methods: {
      async getParticipant() {
        const res = await fetch('http://localhost:3000/api/party')
        const json = await res.json()
        // this.participants = json.data
        // console.log(this.participants)

        // Uppdaterar participants arrayen
        this.participants = json.data.reduce((acc, party) => {
          const partyParticipants = party.participants.map((participant) => ({
            _id: participant._id,
            name: participant.name,
            foodChoice: participant.foodChoice,
          }))
          return [...acc, ...partyParticipants]
        }, [])
        // anropar
        this.countTotalIDs()
      },
      // räknar antal
      countTotalIDs() {
        // antal gäster
        this.totalIDs = this.participants.length
        // itererar över alla gästerna
        this.participants.forEach((participant) => {
          // itererar varje foodChoice
          participant.foodChoice.forEach((choice) => {
            // Kollar vad gästen väljer och ökar
            switch (choice.toLowerCase()) {
              // ej skiftkänsligt
              case 'vegetariskt':
                this.foodCounts.vegetarian++
                break
              case 'gluten':
                this.foodCounts.gluten++
                break
              case 'laktos':
                this.foodCounts.lactose++
                break
              default:
                this.foodCounts.other++
            }
          })
        })
      },
    },
  }
</script>

<template>
  <h1>Food</h1>

  <h3>Antal gäster: {{ totalIDs }}</h3>
  <ul>
    <li>Vegetariskt: {{ foodCounts.vegetarian }} st</li>
    <li>Gluten: {{ foodCounts.gluten }} st</li>
    <li>Laktos: {{ foodCounts.lactose }} st</li>
    <li>Annat: {{ foodCounts.other }} st</li>
  </ul>

  <!-- 1 räkna alla Id -->
  <!-- 2. räkna alla specialkost -->
</template>

<style lang="scss" scoped>
  ul {
    list-style: none;
  }
</style>
