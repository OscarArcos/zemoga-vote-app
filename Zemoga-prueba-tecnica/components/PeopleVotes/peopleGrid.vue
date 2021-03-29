<template>
  <div>
    <div class="menuSelection">
      <p>Previous Rulings</p>
      <DropDown
        :config="items"
        @setSelectedOption="setNewSelectedFeature($event)"
      />
    </div>
    <div v-if="mosaic" class="row">
      <CardPeople
        v-for="(person, index) of people"
        :id="person._id"
        :key="index"
        :likes="person.votes.positive"
        :dont-like="person.votes.negative"
        :image="person.picture"
        :name="person.name"
        :texto="person.description"
        :date="new Date(person.lastUpdated)"
        :category="person.category"
      />
    </div>
    <div v-if="!mosaic" class="row">
      <CardPeopleList
        v-for="(person, index) of people"
        :id="person._id"
        :key="index"
        :likes="person.votes.positive"
        :dont-like="person.votes.negative"
        :image="person.picture"
        :name="person.name"
        :texto="person.description"
        :date="new Date(person.lastUpdated)"
        :category="person.category"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CardPeople from '~/components/cardPeople/cardPeople.vue'
import CardPeopleList from '~/components/cardPeople/cardPeopleList.vue'
import DropDown from '~/components/utils/DropDown.vue'

export default {
  components: {
    CardPeople,
    CardPeopleList,
    DropDown,
  },
  data() {
    return {
      mosaic: true,
      items: [
        { item: 'List', id: 'list' },
        { item: 'Grid', id: 'grid' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      people: 'people/allPeople',
    }),
  },
  created() {
    /*eslint-disable */
    //suppress all warnings between comments
    window.addEventListener('resize', this.myEventHandler)
    /* eslint-enable */
  },
  destroyed() {
    window.removeEventListener('resize', this.myEventHandler)
  },
  mounted() {
    this.$store.dispatch('people/fetchAllPeople')
  },
  methods: {
    myEventHandler(e) {
      // your code for handling resize...
      if (e.currentTarget.innerWidth < 750) {
        this.mosaic = true
      }
    },
    setNewSelectedFeature(e) {
      if (e === 'list') {
        this.mosaic = false
      } else {
        this.mosaic = true
      }
    },
  },
}
</script>
<style lang="scss">
.menuSelection {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0 1rem 0;
  & p {
    font-size: 3rem;
    font-weight: lighter;
    color: #464646;
  }
}
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
@media screen and (max-width: 1110px) {
  .row {
    justify-content: center;
  }
}
@media screen and (max-width: 750px) {
  .menuSelection {
    display: none;
  }
  .row {
    flex-wrap: nowrap;
    overflow-x: scroll;
    justify-content: flex-start;
  }
}
</style>
