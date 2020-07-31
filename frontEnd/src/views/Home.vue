<style>
/* mobile */
@media (max-width: 787px) {
}

.md-icon-48 {
  font-size: 73px !important;
  width: 24px;
  min-width: 24px;
  height: 24px;
  margin: auto;
  display: inline-flex;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  direction: ltr;
  font-family: Material Icons;
  font-feature-settings: "liga";
  font-style: normal;
  letter-spacing: normal;
  line-height: 1;
  text-rendering: optimizeLegibility;
  text-transform: none;
  word-wrap: normal;
  white-space: nowrap;
  -webkit-font-smoothing: antialiased;
}
</style>
<template>
  <div>
    <div class="wrapper">
      <parallax class="section page-header header-filters" :style="headerStyle">
        <div class="container">
          <div class="row">
            <div class="col-8">
              <h1 class="title">Would you be able to meet the challenge?</h1>
              <h4>It's up to you!</h4>
            </div>
            <div
              class="col-4 background_Note align-items-center"
              v-show="active_note"
            >
              <div id="NotesWidget">
                <div class="containerNote">
                  <div class="container__topnav">
                    <i class="fas fa-arrow-left"></i>
                    <i class="fas fa-ellipsis-v"></i>
                  </div>
                  <div class="container__text">
                    <p class="text--title">
                      Challenge of the month
                    </p>
                    <p
                      class="text--content"
                      v-if="Object.keys(nchanllenge).length > 0"
                    >
                      {{ challangeActiveName }}
                    </p>
                  </div>
                  <div class="container__bottom">
                    <p class="date">{{ new Date().toLocaleDateString() }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col">
              <div
                class="row justify-content-center "
                v-if="Object.keys(nchanllenge).length == 0"
              >
                <v-loader></v-loader>
              </div>
              <div class="container-carousel" id="container">
                <div
                  class="carousel"
                  id="carousel"
                  v-if="Object.keys(nchanllenge).length > 0"
                  v-on:click="thisComponent()"
                >
                  <figure
                    v-for="(item, i) in nchanllenge"
                    :key="i"
                    :style="{
                      'background-size': 'cover',
                      'background-image': `url(${item[0].musicMeta.coverLarge})`,
                    }"
                  >
                    <!-- {{ display(item[0]) }} -->
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </parallax>
      <div class="main main-raised" v-show="play">
        <div class="section">
          <div class="container">
            <div class="md-layout">
              <div
                class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center"
                v-if="!islogged"
              >
                <h2 class="title text-center">Want to see more ?</h2>
                <h5 class="description">
                  To view this video and more like it, please login !
                </h5>
                <md-button href="#/login" class="md-success md-lg">
                  <md-icon>fingerprint</md-icon> Login
                </md-button>
              </div>
              <div
                class="md-layout-item md-xsmall-size-100 mx-auto text-center"
                v-if="islogged"
              >
                <div class="row justify-content-center">
                  <!-- <h2 class="title text-center">Post yours ?</h2> -->
                  <h5 class="col-12 description">
                    Please post your challenge !
                  </h5>
                  <div class="row justify-content-center">
                    <div class="col-12">
                      <input
                        type="file"
                        id="inputMovie"
                        @change="onFileChange"
                      />
                      <md-button
                        href="#/login"
                        class="md-success md-lg upload-button "
                        @click="onUploadFile"
                        :disabled="!this.selectedFile"
                      >
                        <md-icon>fingerprint</md-icon> post it
                      </md-button>
                    </div>
                  </div>
                </div>
                <div class="row justify-content-center" v-if="progress">
                  <div class="col-6">
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        :style="{ width: progress }"
                      ></div>
                    </div>
                  </div>
                </div>
                <div
                  class="row justify-content-center"
                  v-if="progressEvent.type"
                >
                  <div class="col">
                    <div id="notifications">
                      <div
                        class="alert alert-info"
                        v-bind:class="[`alert-${this.progressEvent.type}`]"
                      >
                        <div class="container">
                          <button
                            type="button"
                            aria-hidden="true"
                            class="close"
                            @click="
                              (event) =>
                                removeNotify(
                                  event,
                                  `alert-${this.progressEvent.type}`
                                )
                            "
                          >
                            <md-icon>clear</md-icon>
                          </button>
                          <div class="alert-icon">
                            <md-icon>info_outline</md-icon>
                          </div>
                          <b> INFO </b> {{ this.progressEvent.message }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="row justify-content-center "
                  v-if="Object.keys(nchanllenge).length > 0"
                >
                  <div class="col-auto">
                    <carousel
                      :challenge="nchanllenge[challangeActiveKeys]"
                      :like="likes"
                    ></carousel>
                  </div>
                </div>
                <!-- <div class="row">
                <div class="col-4 card" v-for="(element,idx) in challenge" :key="idx" style="width: 18rem;">
                  <video class="img-fluid" playsinline autoplay muted loop>
                    <source v-bind:src="element.src" type="video/mp4">
                  </video>
                  <div class="card-body">
                    <h5 class="card-title">{{element.title}}</h5>
                    <p class="card-text">{{element.description}}</p>
                    <md-button v-on:click="counter()" class="md-success md-lg">
                      <md-icon>favorite</md-icon> Like
                    </md-button>
                  </div>
                </div>
              </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable prettier/prettier */
import Vue from "vue";
import Carousel from "./Carousel";
import axios from "axios";
import("../assets/css/caroussel.css");
import("../assets/css/notes.css");
import("bootstrap/dist/css/bootstrap.css");

// var challenge = [{
//     name: "challenge1",
//     title: "titlechallenge1",
//     active: false,
//     description: "this is the challenge1",
//     src: "https://mdbootstrap.com/img/video/animation-intro.mp4"
//   },
//   {
//     name: "challenge2",
//     title: "titlechallenge2",
//     active: false,
//     description: "this is the challenge2",
//     src: ""
//   },
//   {
//     name: "challenge3",
//     title: "titlechallenge3",
//     active: false,
//     description: "this is the challenge3",
//     src: ""
//   },
//   {
//     name: "challenge4",
//     title: "titlechallenge4",
//     active: true,
//     description: "this is the challenge4",
//     src: ""
//   },
//   {
//     name: "challenge5",
//     title: "titlechallenge5",
//     active: false,
//     description: "this is the challenge5",
//     src: ""
//   },

//   {
//     name: "challenge6",
//     title: "titlechallenge6",
//     active: false,
//     description: "this is the challenge6",
//     src: ""
//   },
//   {
//     name: "challenge7",
//     title: "titlechallenge7",
//     active: false,
//     description: "this is the challenge7",
//     src: ""
//   },
//   {
//     name: "challenge8",
//     title: "titlechallenge8",
//     active: false,
//     description: "this is the challenge8",
//     src: ""
//   },
//   {
//     name: "challenge9",
//     title: "titlechallenge9",
//     active: false,
//     description: "this is the challenge9",
//     src: ""
//   },
// ];
export default {
  name: "home",
  components: {
    Carousel,
  },
  props: {
    image: {
      type: String,
      default: require("@/assets/img/vue-mk-header.jpg"),
    },
    header: {
      type: String,
      default: require("@/assets/img/bg3.jpg"),
    },
  },
  data() {
    return {
      name: null,
      email: null,
      message: null,
      // challenge: challenge,
      active_note: false,
      play: false,
      active: null,
      nchanllenge: {},
      challenge: [
        {
          name: "challenge1",
          title: "titlechallenge1",
          active: false,
          description: "this is the challenge1",
          src: "https://mdbootstrap.com/img/video/animation-intro.mp4",
        },
        {
          name: "challenge2",
          title: "titlechallenge2",
          active: false,
          description: "this is the challenge2",
          src: "",
        },
        {
          name: "challenge3",
          title: "titlechallenge3",
          active: false,
          description: "this is the challenge3",
          src: "",
        },
        {
          name: "challenge4",
          title: "titlechallenge4",
          active: true,
          description: "this is the challenge4",
          src: "",
        },
        {
          name: "challenge5",
          title: "titlechallenge5",
          active: false,
          description: "this is the challenge5",
          src: "",
        },

        {
          name: "challenge6",
          title: "titlechallenge6",
          active: false,
          description: "this is the challenge6",
          src: "",
        },
        {
          name: "challenge7",
          title: "titlechallenge7",
          active: false,
          description: "this is the challenge7",
          src: "",
        },
        {
          name: "challenge8",
          title: "titlechallenge8",
          active: false,
          description: "this is the challenge8",
          src: "",
        },
        {
          name: "challenge9",
          title: "titlechallenge9",
          active: false,
          description: "this is the challenge9",
          src: "",
        },
      ],
      challangeActiveKeys: null,
      challangeActiveName: "",
      selectedFile: "",
      progress: 0,
      likes: [],
      progressEvent: {
        type: null,
        message: null,
      },
      islogged:false
    };
  },
  mounted: function() {
    window.Home = this;
    this.loadData();
    this.islogged=localStorage.getItem("token") ? true : false;
  },
  methods: {
    removeNotify(e, notifyClass) {
      var target = e.target;
      while (target.className.indexOf(notifyClass) === -1) {
        target = target.parentNode;
      }
      this.progressEvent = {
        type: null,
        message: null,
      };
      return target.parentNode.removeChild(target);
    },
    display(item) {
      try {
        let ret = item.musicMeta.musicName;
        return ret;
      } catch (error) {
        return "MUSIC ";
      }
    },
    thisComponent() {
      this.play = true;
    },
    requeteJqueryTest() {
      var btns = document.querySelectorAll(".btn"),
        carousel = document.getElementById("carousel"),
        increment = 40,
        cur = 0,
        index = 0;
        if(!carousel) return;
      var lunch = setInterval(() => {
        cur -= increment;
        carousel.style.transform = `rotateY(${cur}deg) rotate3d(17, 4, 3, 2deg)`;
      }, 100);
      setTimeout(() => {
        clearInterval(lunch);
        cur =
          40 * -this.challenge.findIndex((element) => element.active == true);
        carousel.style.transform = `rotateY(${cur}deg)`;
        let active = document.querySelector(
          `#carousel > figure:nth-child(${this.challenge.findIndex(
            (element) => element.active == true
          ) + 1})`
        );
        setTimeout(() => {
          active.innerHTML = "";
          $(active).append(`<i class="md-icon-48">play_circle_filled</i>`);
          //  $(active).click(()=>{alert('ok')})
          //
          if (active) active.classList.add("zoom");
        }, 1000);
        //recuperer idfiguretrue
        // figureTrue.style.filter='brightness(0.3)';
        // $("#figureTrue").append("<md-icon>play_circle_filled</md-icon>");
        this.active_note = true;
      }, 5000);

      // btns.forEach((btn) => {
      //     btn.addEventListener('click', function () {
      //         if (this.textContent == 'prev') cur += increment;
      //         else cur -= increment;
      //         carousel.style.transform = `rotateY(${cur}deg)`;
      //     });
      // });
    },
    loadTtile() {
      return this.challenge.filter((element) => element.active == true)[0]
        .title;
    },
    loadName() {
      return this.challenge.filter((element) => element.active == true)[0].name;
    },
    loadData() {
      fetch("http://localhost:3000/movies/getbymusic", {
        method: "GET", //ou POST, PUT, DELETE, etc.
        headers: {},
      })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res;
        })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.nchanllenge = data.data;
          this.challangeActiveKeys = data.currentChallenge;
          this.challangeActiveName = this.nchanllenge[
            this.challangeActiveKeys
          ][0].musicMeta.musicName;
          setTimeout(() => {
            this.requeteJqueryTest();
          }, 500);
        });
      this.loadlike();
    },
    loadlike() {
      if (localStorage.getItem("token")) {
        let config = {
          headers: {
            token: localStorage.getItem("token"),
          },
        };
        axios
          .get("http://localhost:3000/like/user", config)
          .then((res) => (this.likes = res.data))
          .catch((err) =>
            this.makeToast("Error in load like", "Api Error", true, "danger")
          );
      }
    },
    onFileChange(e) {
      const selectedFile = e.target.files[0]; // accessing file

      if (!new RegExp("(video\/*)").test(selectedFile.type)) {
        e.target.value = "";
        alert("We accept just video");
        return;
      }

      this.selectedFile = selectedFile;
    },
    onUploadFile(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", this.selectedFile); // appending file
      let musicMeta = this.nchanllenge[
            this.challangeActiveKeys
          ];
      musicMeta=musicMeta[musicMeta.length-1].musicMeta;
      formData.append("musicMeta", JSON.stringify(musicMeta)); // appending file

      // sending file to the backend
      axios
        .post("http://localhost:3000/movies/uploadVid", formData, {
          onUploadProgress: (ProgressEvent) => {
            let progress =
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
              "%";
            this.progress = progress;
          },
        })
        .then((res) => {
          this.progressEvent.type = "success";
          this.progressEvent.message = "We are successfuly uploaded your video";
          console.log(res);
          this.loadData();
        })
        .catch((err) => {
          this.progressEvent.type = "danger";
          this.progressEvent.message =
            "An error was occured when we uploaded your video! Please try again";
          console.log(err);
        })
        .finally(() => {
          this.progress = 0;
          document.querySelector("#inputMovie").value = "";
        });
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
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
};
</script>
