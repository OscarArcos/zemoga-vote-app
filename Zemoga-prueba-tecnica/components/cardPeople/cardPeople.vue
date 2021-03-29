<template>
  <div
    class="cardMain"
    :style="{
      background: cssProps.backgroundImage,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
    }"
  >
    <div class="cardInfo">
      <div class="cardTop">
        <div
          class="cardTop__icons"
          :class="
            widthLikeP > 50 ? 'cardTop__iconsLike' : 'cardTop__iconsDontLike'
          "
        >
          <svg>
            <use
              :xlink:href="
                require(`~/assets/icons/${selectMainIcon}.svg`) +
                `#${selectMainIcon}`
              "
            />
          </svg>
        </div>
        <p>{{ name }}</p>
      </div>
      <p class="cardInfo__description">
        {{ subStringText(texto) }}
      </p>
      <div class="cardContent">
        <p v-if="botonVisible">
          {{
            formatDate(getDate).years > 0
              ? `${formatDate(getDate).years} Years`
              : ''
          }}
          {{
            !formatDate(getDate).years > 0 && formatDate(getDate).months > 0
              ? `${formatDate(getDate).months} Months`
              : ''
          }}
          {{
            !formatDate(getDate).years > 0 &&
            !formatDate(getDate).months > 0 &&
            formatDate(getDate).weeks > 0
              ? `${formatDate(getDate).weeks} Weeks`
              : ''
          }}
          {{
            !formatDate(getDate).years > 0 &&
            !formatDate(getDate).months > 0 &&
            formatDate(getDate).weeks > 0 &&
            formatDate(getDate).days > 0
              ? `and ${formatDate(getDate).days} Days`
              : ''
          }}
          ago in {{ category }}
        </p>
        <p v-if="!botonVisible">Thank you for your vote!</p>
        <div
          class="cardContent__vote"
          :class="botonVisible ? '' : 'cardContent__voteNoButtons'"
        >
          <div
            v-if="botonVisible"
            class="cardContent__buttonsIcons cardTop__icons cardTop__iconsLike cursorPointer"
            :class="clickLike ? 'botonBordered' : ''"
            @click="clickLikeHandler"
          >
            <svg>
              <use :xlink:href="require(`~/assets/icons/like.svg`) + `#like`" />
            </svg>
          </div>
          <div
            v-if="botonVisible"
            class="cardContent__buttonsIcons cardTop__icons cardTop__iconsDontLike cursorPointer"
            :class="clickDontLike ? 'botonBordered' : ''"
            @click="clickDontLikeHandler"
          >
            <svg>
              <use
                :xlink:href="
                  require(`~/assets/icons/dontlike.svg`) + `#dontlike`
                "
              />
            </svg>
          </div>
          <button
            v-if="botonVisible"
            class="cardContent__buttonVote"
            :class="clickLike || clickDontLike ? 'notDisabled' : 'disabled'"
            :disabled="isDisabled"
            @click="voteHandler"
          >
            Vote Now
          </button>
          <button
            v-if="!botonVisible"
            class="cardContent__buttonVote"
            @click="reVoteHandler"
          >
            Vote Again
          </button>
        </div>
      </div>
    </div>
    <div class="cardFooter">
      <div
        class="cardFooter__like cardFooter__content"
        :style="{ width: widthLikeP + 0.01 + '%' }"
      >
        <div class="cardTop__icons">
          <svg>
            <use :xlink:href="require(`~/assets/icons/like.svg`) + `#like`" />
          </svg>
        </div>
        <p>{{ Number(widthLikeP).toFixed(2) }}%</p>
      </div>
      <div
        class="cardFooter__dontLike cardFooter__content"
        :style="{ width: widthDontLikeP + 0.01 + '%' }"
      >
        <p>{{ Number(widthDontLikeP).toFixed(2) }}%</p>
        <div class="cardTop__icons">
          <svg>
            <use
              :xlink:href="require(`~/assets/icons/dontlike.svg`) + `#dontlike`"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: { type: String, required: true },
    likes: { type: Number, required: true },
    dontLike: { type: Number, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    texto: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
  },
  data() {
    return {
      clickLike: false,
      clickDontLike: false,
      botonVisible: true,
      cssProps: {
        backgroundImage: `url(${require('~/assets/img/' +
          this.$props.image +
          '')})`,
      },
    }
  },
  computed: {
    getDate() {
      let today = new Date()
      today = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0
      )
      return Math.round(
        ((this.$props.date - today) / (1000 * 60 * 60 * 24)) * -1
      )
    },
    widthLikeP() {
      const sumaT = this.$props.likes + this.$props.dontLike
      const total = this.$props.likes / sumaT
      const totalPercentage = total * 100
      return totalPercentage
    },
    widthDontLikeP() {
      const sumaT = this.$props.likes + this.$props.dontLike
      const total = this.$props.dontLike / sumaT
      const totalPercentage = total * 100
      return totalPercentage
    },
    selectMainIcon() {
      if (this.widthLikeP > 50) {
        return 'like'
      } else {
        return 'dontlike'
      }
    },
    isDisabled() {
      if (this.clickLike || this.clickDontLike) {
        return false
      } else {
        return true
      }
    },
  },
  methods: {
    formatDate(inputDays) {
      let months = 0
      let years = 0
      let days = 0
      let weeks = 0
      while (inputDays) {
        if (inputDays >= 365) {
          years++
          inputDays -= 365
        } else if (inputDays >= 30) {
          months++
          inputDays -= 30
        } else if (inputDays >= 7) {
          weeks++
          inputDays -= 7
        } else {
          days++
          inputDays--
        }
      }
      return {
        years,
        months,
        weeks,
        days,
      }
    },
    clickLikeHandler() {
      this.clickDontLike = false
      this.clickLike = !this.clickLike
    },
    clickDontLikeHandler() {
      this.clickLike = false
      this.clickDontLike = !this.clickDontLike
    },
    voteHandler() {
      let like = this.$props.likes
      let dontLike = this.$props.dontLike
      if (this.clickLike) {
        like++
      } else if (this.clickDontLike) {
        dontLike++
      }
      const payload = {
        id: this.$props.id,
        votes: {
          positive: like,
          negative: dontLike,
        },
      }
      this.$store.dispatch('people/addVotePeople', payload)
      this.botonVisible = false
    },
    reVoteHandler() {
      this.botonVisible = true
      this.clickLike = false
      this.clickDontLike = false
    },
    subStringText(text) {
      if (text.length <= 50) {
        return text
      } else {
        return text.substring(0, 50) + '...'
      }
    },
  },
}
</script>
<style lang="scss">
.cardMain {
  width: 33%;
  min-width: 20rem;
  height: 20rem;
  position: relative;
  margin-bottom: 1rem;
}
.cardInfo {
  position: absolute;
  z-index: 2;
  bottom: 0;
  width: 100%;
  height: 65%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.0001) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
  &__description {
    color: white;
    margin: 1rem 1.5rem 1rem 2.5rem;
    font-size: 0.9rem;
  }
}
.cardTop {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  & p {
    position: absolute;
    bottom: -5px;
    left: 2.5rem;
    color: white;
    font-weight: 400;
    font-size: 2rem;
  }
  &__icons {
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    & svg {
      width: 1rem;
      height: 1rem;
    }
  }
  &__iconsLike {
    background-color: #3cbbb4;
  }
  &__iconsDontLike {
    background-color: #fbbd4a;
  }
}
.cursorPointer {
  cursor: pointer;
}
.cardContent {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 2rem;
  height: 5rem;
  & p {
    font-size: 0.75rem;
    color: white;
    font-weight: bold;
  }
  &__buttonsIcons {
    margin-left: 0.5rem;
  }
  &__vote {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.8rem;
    & svg {
      width: 1rem;
      height: 1rem;
    }
  }
  &__voteNoButtons {
    justify-content: flex-end;
  }
  &__buttonVote {
    width: 7rem;
    height: 2rem;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    background-color: #00000088;
    justify-content: center;
    color: white;
    font-size: 0.9rem;
    border: 1px solid white;
    outline: none;
    cursor: pointer;
  }
}
.cardFooter {
  position: absolute;
  z-index: 5;
  bottom: 0;
  width: 100%;
  height: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__content {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    & p {
      color: white;
      font-size: 1.07rem;
      bottom: 0.3rem;
    }
  }
  &__like {
    justify-content: flex-start;
    background-color: rgba(60, 187, 180, 0.6);
    -webkit-transition-property: height, width;
    -webkit-transition-duration: 1s, 1s;
    transition-property: height, width;
    transition-duration: 1s, 1s;

    & p {
      position: absolute;
      left: 2rem;
    }
  }
  &__dontLike {
    justify-content: flex-end;
    background-color: rgba(249, 173, 29, 0.6);
    -webkit-transition-property: height, width;
    -webkit-transition-duration: 1s, 1s;
    transition-property: height, width;
    transition-duration: 1s, 1s;
    & p {
      position: absolute;
      right: 2rem;
    }
  }
}
.botonBordered {
  border: 2px solid white;
  width: 2.3rem;
  height: 2.3rem;
}
.notDisabled {
  background-color: #00000088;
}
.disabled {
  background-color: #30303088;
  cursor: not-allowed;
}
@media screen and (max-width: 750px) {
  .cardMain {
    margin: 0 !important;
    margin-right: 1rem !important;
  }
}
@media screen and (max-width: 1110px) {
  .cardMain {
    margin: 1rem;
  }
}
</style>
