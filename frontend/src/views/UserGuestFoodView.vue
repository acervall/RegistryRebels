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
      }
    },
    methods: {
      async getParticipant() {
        const res = await fetch('http://localhost:3000/api/party')
        const json = await res.json()
        this.participants = json.data
        console.log(this.participants)
      },
    },
  }
</script>

<template>
  <h1>Food</h1>
  <div v-for="participant in participants" :key="participant._id">
    <h3>Antal</h3>
    <ul>
      <li v-for="person in participant">{{ person }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
