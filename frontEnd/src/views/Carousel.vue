<style>
body {
  background: #f8f8f8;
  color: #2c3e50;
  font-family: "Source Sans Pro", sans-serif;
}

/* mobile */
@media (max-width: 787px) {
  .card-carousel {
    width: 17rem !important;
  }
  .resTypo {
    font-size: 11px !important;
  }
  .fixed-bottom-app {
    margin: 1rem;
    position: absolute;
    right: 0px;
    bottom: 0;
    left: 0px;
    z-index: 1030;
  }
}
/* all device */
@media (min-width: 787px) {
  .fixed-bottom-app {
    margin: 1rem 0 1rem 1rem !important;
    position: absolute !important;
    bottom: 0;
    left: 10%;
    z-index: 1030;
  }
}
.card-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 40px;
  color: #666a73;
}

.card-carousel {
  display: flex;
  justify-content: center;
  width: 640px;
}
.card-carousel--overflow-container {
  overflow: hidden;
}

.card-carousel--nav__left,
.card-carousel--nav__right {
  display: inline-block;
  width: 15px;
  height: 15px;
  padding: 10px;
  box-sizing: border-box;
  border-top: 2px solid #42b883;
  border-right: 2px solid #42b883;
  cursor: pointer;
  margin: 0 20px;
  transition: transform 150ms linear;
}

.card-carousel--nav__left[disabled],
.card-carousel--nav__right[disabled] {
  opacity: 0.2;
  border-color: black;
}

.card-carousel--nav__left {
  transform: rotate(-135deg);
}

.card-carousel--nav__left:active {
  transform: rotate(-135deg) scale(0.9);
}

.card-carousel--nav__right {
  transform: rotate(45deg);
}

.card-carousel--nav__right:active {
  transform: rotate(45deg) scale(0.9);
}

.card-carousel-cards {
  display: flex;
  transition: transform 150ms ease-out;
  transform: translatex(0px);
}

.card-carousel-cards .card-carousel--card {
  margin: 0 10px;
  cursor: pointer;
  box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06),
    0 2px 2px 0 rgba(40, 44, 53, 0.08);
  background-color: #fff;
  border-radius: 4px;
  z-index: 3;
  margin-bottom: 2px;
}

.card-carousel-cards .card-carousel--card:first-child {
  margin-left: 0;
}

.card-carousel-cards .card-carousel--card:last-child {
  margin-right: 0;
}

.card-carousel-cards .card-carousel--card img {
  vertical-align: bottom;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: opacity 150ms linear;
  user-select: none;
}

.card-carousel-cards .card-carousel--card img:hover {
  opacity: 0.5;
}

.card-carousel-cards .card-carousel--card--footer {
  border-top: 0;
  padding: 7px 15px;
}

.card-carousel-cards .card-carousel--card--footer p {
  padding: 3px 0;
  margin: 0;
  margin-bottom: 2px;
  font-size: 19px;
  font-weight: 500;
  color: #2c3e50;
  user-select: none;
}

.card-carousel-cards .card-carousel--card--footer p.tag {
  font-size: 11px;
  font-weight: 300;
  padding: 4px;
  background: rgba(40, 44, 53, 0.06);
  display: inline-block;
  position: relative;
  margin-left: 4px;
  color: #666a73;
}

.card-carousel-cards .card-carousel--card--footer p.tag:before {
  content: "";
  float: left;
  position: absolute;
  top: 0;
  left: -12px;
  width: 0;
  height: 0;
  border-color: transparent rgba(40, 44, 53, 0.06) transparent transparent;
  border-style: solid;
  border-width: 8px 12px 12px 0;
}

.card-carousel-cards .card-carousel--card--footer p.tag.secondary {
  margin-left: 0;
  border-left: 1.45px dashed white;
}

.card-carousel-cards .card-carousel--card--footer p.tag.secondary:before {
  display: none !important;
}

.card-carousel-cards .card-carousel--card--footer p.tag:after {
  content: "";
  position: absolute;
  top: 8px;
  left: -3px;
  float: left;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: white;
  box-shadow: -0px -0px 0px #004977;
}
.md-btn-fill {
  max-width: -webkit-fill-available;
}

h1 {
  font-size: 3.6em;
  font-weight: 100;
  text-align: center;
  margin-bottom: 0;
  color: #42b883;
}
.childPlay {
  position: absolute;
  top: 23%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */

  transform: translate(
    -50%,
    -50%
  ); /* This is a shorthand of
                                         translateX(-50%) and translateY(-50%) */
}
</style>
<template>
  <div class="card-carousel-wrapper">
    <b-modal ref="my-modal" id="modal-1" hide-footer="">
      <template v-slot:modal-title>
        {{ currentsrc && currentsrc.text ? currentsrc.text : "" }}
      </template>
      <div v-if="currentsrc">
        <video class="img-fluid" loop autoplay controls>
          <source v-bind:src="currentsrc.videoUrl" type="video/mp4" />
        </video>
        <div class="row justify-content-center">
          <div class="col-auto justify-content-center">
            <md-button
              v-if="notLiked(currentsrc.id)"
              v-on:click="addlike(currentsrc.id)"
              class="md-success md-lg"
            >
              <md-icon>favorite</md-icon> Like
            </md-button>
            <md-button
              v-if="!notLiked(currentsrc.id)"
              v-on:click="deleteLike(currentsrc.id)"
              class="md-info md-lg"
            >
              <md-icon>remove_circle_outline</md-icon> UnLike
            </md-button>
          </div>
        </div>
      </div>
    </b-modal>
    <div
      class="card-carousel--nav__left"
      @click="moveCarousel(-1)"
      :disabled="atHeadOfList"
    ></div>
    <div class="card-carousel">
      <div class="card-carousel--overflow-container">
        <div
          class="card-carousel-cards"
          v-if="challenge"
          :style="{
            transform: 'translateX' + '(' + currentOffset + 'px' + ')',
          }"
        >
          <div
            class="col-md-4 col-6 card-carousel--card"
            v-for="(element, index) in challenge"
            :key="index"
          >
            <div class="childPlay">
              <i class="md-icon-48">play_circle_filled</i>
            </div>
            <video
              class="img-fluid"
              playsinline
              muted
              loop
              @click="showModal(element)"
            >
              <source v-bind:src="element.videoUrl" type="video/mp4" />
            </video>
            <div class="card-carousel--card--footer">
              <p class="resTypo">{{ element.text }}</p>
              <md-button
                v-if="notLiked(element.id)"
                v-on:click="addlike(element.id)"
                class="md-success md-lg md-btn-fill fixed-bottom-app"
              >
                <md-icon>favorite</md-icon> Like
              </md-button>
              <md-button
                v-if="!notLiked(element.id)"
                v-on:click="deleteLike(element.id)"
                class="md-info md-lg  md-btn-fill fixed-bottom-app"
              >
                <md-icon>remove_circle_outline</md-icon> UnLike
              </md-button>
              <!-- <p class="tag" v-for="(tag,index) in item.tag" :key="index"
                                :class="index &gt; 0 ? 'secondary' : ''">{{ tag }}</p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="card-carousel--nav__right"
      @click="moveCarousel(1)"
      :disabled="atEndOfList"
    ></div>
  </div>
</template>
<script>
/* eslint-disable prettier/prettier */
import axios from "axios";

export default {
  name: "carousel",
  template: "#v-carousel",
  props: ["challenge", "like"],
  data() {
    return {
      currentsrc: null,
      currentOffset: 0,
      windowSize: 3,
      paginationFactor: 220,
    };
  },
  computed: {
    atEndOfList() {
      return (
        this.currentOffset <=
        this.paginationFactor * -1 * (this.challenge.length - this.windowSize)
      );
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },
  },
  methods: {
    notLiked(id) {
      if (!this.like) return true;
      return !this.like.includes(id);
    },
    showModal(src) {
      this.currentsrc = src;
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.currentsrc = null;
      this.$refs["my-modal"].hide();
    },
    moveCarousel(direction) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    },
    addlike(idV) {
      try {
        let userId = window.navbar.user._id;
        if (!userId) throw "error";
        let config = {
          headers: {
            token: localStorage.getItem("token"),
          },
        };
        axios
          .post(
            "http://localhost:3000/like/addLike",
            {
              _idUser: userId,
              _idVideo: idV,
            },
            config
          )
          .then((res) => {
            this.makeToast(
              "Your like is added successfuly",
              "Like",
              true,
              "success"
            );
            window.Home.loadlike();
          })
          .catch((err) => {
            this.makeToast(
              "An error are occured please try again",
              "Like",
              true,
              "danger"
            );
          });
      } catch (error) {
        this.makeToast(
          "An error are occured please try again",
          "Like",
          true,
          "danger"
        );
      }
    },
    deleteLike(idV) {
      try {
        let config = {
          headers: {
            token: localStorage.getItem("token"),
          },
        };
        axios
          .delete(`http://localhost:3000/like/remove/${idV}`, config)
          .then((res) => {
            this.makeToast(
              "Your like is removed successfuly",
              "Like",
              true,
              "success"
            );
            window.Home.loadlike();
          })
          .catch((err) => {
            this.makeToast(
              "An error are occured please try again",
              "Like",
              true,
              "danger"
            );
          });
      } catch (error) {
        this.makeToast(
          "An error are occured please try again",
          "Like",
          true,
          "danger"
        );
      }
    },
    makeToast(message, title, append = false, variant = null) {
      // this.toastCount++
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        autoHideDelay: 5000,
        appendToast: append,
      });
    },
  },
};
</script>
