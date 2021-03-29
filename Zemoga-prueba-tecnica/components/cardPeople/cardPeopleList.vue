<template>
  <div class="cardMainList">
    <img :src="getImgUrl" alt="Person Image" />
    <div class="cardMainList__gradient"></div>
    <div class="cardInfoList">
      <div class="cardTopListMain">
        <div class="cardTopList">
          <div
            class="cardTopList__icons"
            :class="
              widthLikeP > 50
                ? 'cardTopList__iconsLike'
                : 'cardTopList__iconsDontLike'
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
        <p class="cardTopList__descriptionList">
          {{ subStringText(texto) }}
        </p>
      </div>
      <div class="cardContentList">
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
          class="cardContentList__vote"
          :class="botonVisible ? '' : 'cardContentList__voteNoButtons'"
        >
          <div
            v-if="botonVisible"
            class="cardContentList__buttonsIcons cardTopList__icons cardTopList__iconsLike cursorPointer"
            :class="clickLike ? 'botonBorderedList' : ''"
            @click="clickLikeHandler"
          >
            <svg>
              <use :xlink:href="require(`~/assets/icons/like.svg`) + `#like`" />
            </svg>
          </div>
          <div
            v-if="botonVisible"
            class="cardContentList__buttonsIcons cardTopList__icons cardTopList__iconsDontLike cursorPointer"
            :class="clickDontLike ? 'botonBorderedList' : ''"
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
            class="cardContentList__buttonVote"
            :class="clickLike || clickDontLike ? 'notDisabled' : 'disabled'"
            :disabled="isDisabled"
            @click="voteHandler"
          >
            Vote Now
          </button>
          <button
            v-if="!botonVisible"
            class="cardContentList__buttonVote"
            @click="reVoteHandler"
          >
            Vote Again
          </button>
        </div>
      </div>
    </div>
    <div class="cardFooterList">
      <div
        class="cardFooterList__like cardFooterList__content"
        :style="{ width: widthLikeP + 0.01 + '%' }"
      >
        <div class="cardTopList__icons">
          <svg>
            <use :xlink:href="require(`~/assets/icons/like.svg`) + `#like`" />
          </svg>
        </div>
        <p>{{ Number(widthLikeP).toFixed(2) }}%</p>
      </div>
      <div
        class="cardFooterList__dontLike cardFooterList__content"
        :style="{ width: widthDontLikeP + 0.01 + '%' }"
      >
        <p>{{ Number(widthDontLikeP).toFixed(2) }}%</p>
        <div class="cardTopList__icons">
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
      sumPositive: 0,
      sumNegative: 0,
    }
  },
  computed: {
    getImgUrl() {
      return require(`~/assets/img/${this.$props.image}`)
    },
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
      if (text.length <= 100) {
        return text
      } else {
        return text.substring(0, 100) + '...'
      }
    },
  },
}
</script>
<style lang="scss">
.cardMainList {
  width: 100%;
  min-width: 20rem;
  height: 10.5rem;
  position: relative;
  margin-bottom: 1rem;
  z-index: 1;
  & img {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 20rem;
    object-fit: cover;
    height: inherit;
  }
  &__gradient {
    position: absolute;
    right: 0;
    z-index: 2;
    height: 100%;
    width: 90%;
    background-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.0001),
      #888888 19.79%,
      #666666 50%,
      rgba(51, 51, 51, 0.6) 71.88%
    );
  }
}
.cardInfoList {
  display: flex;
  position: absolute;
  z-index: 2;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.cardTopList {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  & p {
    position: absolute;
    bottom: -5px;
    left: 18rem;
    color: white;
    font-weight: 400;
    font-size: 2.1rem;
  }
  &__descriptionList {
    color: white;
    margin: 1rem 1.5rem 1rem 18rem;
    font-size: 0.9rem;
  }
  &__icons {
    width: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.5rem;
    & svg {
      width: 1.5rem;
      height: 1.5rem;
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
.cardTopListMain {
  width: 80%;
}
.cardContentList {
  display: flex;
  width: 20%;
  flex-direction: column;
  align-items: flex-end;
  margin: 1rem 1rem 0 0;
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
    justify-content: flex-start;
    margin-top: 0.8rem;
    & svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  &__voteNoButtons {
    justify-content: flex-end;
  }
  &__buttonVote {
    width: 6rem;
    margin-left: 0.5rem;
    height: 2.5rem;
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
.cardFooterList {
  position: absolute;
  z-index: 3;
  bottom: 0;
  width: 100%;
  height: 3.2rem;
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
      font-size: 1.5rem;
      bottom: 0.5rem;
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
      left: 2.5rem;
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
      right: 2.5rem;
    }
  }
}
.botonBorderedList {
  border: 2px solid white;
  width: 3.3rem;
  height: 3.3rem;
}
.notDisabled {
  background-color: #00000088;
}
.disabled {
  background-color: #30303088;
  cursor: not-allowed;
}
@media screen and (max-width: 1110px) {
  .cardMainList {
    margin: 1rem;
  }
}
@media screen and (max-width: 1024px) {
  .cardTopListMain {
    width: 75%;
  }
  .cardContentList {
    width: 25%;
  }
  .cardTopList {
    & p {
      left: 15rem;
      font-size: 1.5rem;
    }
    &__descriptionList {
      margin: 1rem 1.5rem 1rem 15rem;
      font-size: 0.8rem;
    }
  }
}
</style>
