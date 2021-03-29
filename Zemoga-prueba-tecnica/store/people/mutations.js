export default {
  addPeople(state, data) {
    state.people = state.people.concat(data.data.data)
  },
  updateVotes(state, data) {
    for (let i = 0; i < state.people.length; i++) {
      if (state.people[i]._id === data.id) {
        state.people[i].votes.positive = data.person.votes.positive
        state.people[i].votes.negative = data.person.votes.negative
      }
    }
  },
}
