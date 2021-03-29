export default {
  addPeople({ commit }, data) {
    commit('addPeople', data)
  },
  updateVotes({ commit }, data) {
    commit('updateVotes', data)
  },
  async fetchAllPeople(context) {
    const allPeople = await this.$axios.get(`/people`)
    context.dispatch('addPeople', allPeople)
    return allPeople
  },
  async addVotePeople(context, data) {
    const updatedData = await this.$axios.put(`/people/${data.id}`, {
      votes: {
        positive: data.votes.positive,
        negative: data.votes.negative,
      },
    })
    const dataForUpdate = {
      id: data.id,
      person: updatedData.data.person,
    }
    context.dispatch('updateVotes', dataForUpdate)
  },
}
export const strict = false
