<template>
  <div class="dropdown" @click="toggleDropdown">
    <span class="dropdown__text">{{ selected }} </span>
    <i class="dropdown__angle-down"></i>
    <div
      v-if="isBottomSectionToggled"
      class="dropdown__options"
      :style="{ height: optionsHeight + 'rem' }"
    >
      <div
        v-for="(option, index) in $props.config"
        :key="index"
        class="dropdown__option"
        @click="setCurrentSelectedOption(option)"
      >
        {{ option.item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selected: 'Grid',
      isBottomSectionToggled: false,
      idSelected: '',
    }
  },
  computed: {
    optionsHeight() {
      return 2 * this.$props.config.length
    },
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
  methods: {
    myEventHandler(e) {
      // your code for handling resize...
      if (e.currentTarget.innerWidth < 750) {
        this.selected = 'Grid'
      }
    },
    toggleDropdown() {
      this.isBottomSectionToggled = !this.isBottomSectionToggled
    },
    setCurrentSelectedOption(option) {
      this.selected = option.item
      this.idSelected = option.id
      const optionId = this.idSelected
      this.$emit('setSelectedOption', optionId)
    },
  },
}
</script>

<style lang="scss" scoped>
.dropdown {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.8rem;
  border-radius: 3px;
  cursor: pointer;
  border: 1px solid black;
  width: 9rem;
  user-select: none;
  position: relative;
  &__text {
    margin-right: 1rem;
  }
  &__angle-down {
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid black;
    background: transparent;
    border-width: 0 2px 2px 0;
    padding: 4px;
    width: 1px;
    height: 1px;
    margin: -3px 5px 0 0;
    border-color: black;
    transform: rotate(45deg);
  }
  &__options {
    -webkit-box-shadow: -1px 2px 10px 1px rgba(105, 103, 103, 0.75);
    -moz-box-shadow: -1px 2px 10px 1px rgba(105, 103, 103, 0.75);
    box-shadow: -1px 2px 10px 1px rgba(105, 103, 103, 0.75);
    display: flex;
    flex-direction: column;
    width: 9rem;
    height: 6rem;
    margin-bottom: calc(-1 * 2.5rem - 3px);
    position: absolute;
    right: 0;
    top: 3rem;
    z-index: 100;
    background: white;
    border: 0;
    border-radius: 5px;
  }
  &__option {
    display: flex;
    align-items: center;
    padding: 0 0.7rem;
    height: 2.5rem;
    width: 100%;

    &:hover {
      color: #fff;
      background: grey;
      transition: all 0.7s;
    }

    &:last-child {
      border-radius: 0 0 4px 4px;
    }
  }

  &:hover {
    transition: 0.7s all;
    .dropdown__text {
      color: grey;
    }

    .dropdown__angle-down {
      border-color: grey;
    }
  }
}
</style>
