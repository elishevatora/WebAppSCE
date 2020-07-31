<template>
  <md-toolbar
    id="toolbar"
    md-elevation="0"
    class="md-transparent md-absolute"
    :class="extraNavClasses"
    :color-on-scroll="colorOnScroll"
  >
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <a href="#/">
          <h3 class="md-title">CoronaChallenge</h3>
        </a>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: toggledClass }"
          @click="toggleNavbarMobile()"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section-start="false">
              <!-- Here you can add your items from the section-start of your toolbar -->
            </mobile-menu>
            <md-list>
              <!-- <md-list-item
                v-if="showDownload"
                href="https://demos.creative-tim.com/vue-material-kit/documentation/"
                target="_blank"
              >
                <i class="material-icons">content_paste</i>
                <p>Documentation</p>
              </md-list-item> -->

              <!-- <md-list-item
                href="javascript:void(0)"
                @click="scrollToElement()"
                v-if="showDownload"
              >
                <i class="material-icons">cloud_download</i>
                <p>Download</p>
              </md-list-item> -->

              <md-list-item href="#/login" v-if="!islogged">
                <i class="fas fa-user"></i>
                <p class="">login</p>
              </md-list-item>

              <li class="md-list-item" v-if="islogged && user">
                <a
                  href="javascript:void(0)"
                  class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button
                        slot="title"
                        class="md-button md-button-link md-white md-simple dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <i class="material-icons">fingerprint</i>
                        <p>{{ user.name }}</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">
                        <li>
                          <a href="#/profile">
                            <i class="material-icons">account_circle</i>
                            <p>Profile Page</p>
                          </a>
                        </li>
                        <li>
                          <a href="#/" v-on:click="logout()">
                            <i class="material-icons">view_day</i>
                            <p>Log out</p>
                          </a>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>

              <!-- <md-list-item href="https://twitter.com/CreativeTim" target="_blank" v-if="islogged && user">
                <i class="fas fa-user"></i>
                <p class="">{{user.name}}</p>
              </md-list-item> -->
              <!-- 
              <md-list-item href="https://twitter.com/CreativeTim" target="_blank">
                <i class="fab fa-twitter"></i>
                <p class="hidden-lg">Twitter</p>
                <md-tooltip md-direction="bottom">Follow us on Twitter</md-tooltip>
              </md-list-item>
              <md-list-item href="https://www.facebook.com/CreativeTim" target="_blank">
                <i class="fab fa-facebook-square"></i>
                <p class="hidden-lg">Facebook</p>
                <md-tooltip md-direction="bottom">Like us on Facebook</md-tooltip>
              </md-list-item>
              <md-list-item href="https://www.instagram.com/CreativeTimOfficial" target="_blank">
                <i class="fab fa-instagram"></i>
                <p class="hidden-lg">Instagram</p>
                <md-tooltip md-direction="bottom">Follow us on Instagram</md-tooltip>
              </md-list-item> -->
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

import MobileMenu from "@/layout/MobileMenu";
import axios from "axios";

export default {
  components: {
    MobileMenu
  },
  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return [
          "white",
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info",
        ].includes(value);
      },
    },
    colorOnScroll: {
      type: Number,
      default: 0
    }
  },
  beforeMount() {
    
    this.check();
  },
  data() {
    return {
      extraNavClasses: "",
      toggledClass: false,
      user: null,
      islogged: false
    };
  },
  computed: {
    showDownload() {
      const excludedRoutes = ["login", "landing", "profile", "home"];
      return excludedRoutes.every((r) => r !== this.$route.name);
    },
    islogged2() {
      if (localStorage.getItem("token")) {
        this.loaduser();
        return true;
      }
      return false;
    }
  },
  methods: {
    check() {
      if (localStorage.getItem("token")) {
        this.loaduser();
      }
    },
    loaduser() {
      this.errors = [];
      let temp = this;
      var myHeaders = new Headers();
      myHeaders = localStorage.getItem("token");
      if (!myHeaders) {
        alert("token not find");
        return;
      }
      axios
        .get("http://localhost:3000/user/me/", {
          headers: { token: myHeaders }
        })
        .then(info => {
          temp.islogged = true;
          temp.user = info.data;
        })
        .catch(err => {
          localStorage.removeItem("token");
          temp.errors.push(err.response.data.msg);
        });
    },
    logout() {
      window.localStorage.removeItem("token");
      this.islogged = false;
      this.user = null;
      if(window.Home)window.Home.islogged=false;
    },
    bodyClick() {
      let bodyClick = document.getElementById("bodyClick");

      if (bodyClick === null) {
        let body = document.querySelector("body");
        let elem = document.createElement("div");
        elem.setAttribute("id", "bodyClick");
        body.appendChild(elem);

        let bodyClick = document.getElementById("bodyClick");
        bodyClick.addEventListener("click", this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.bodyClick();
    },
    handleScroll() {
      let scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop;
      let navbarColor = document.getElementById("toolbar");
      this.currentScrollValue = scrollValue;
      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`;
        navbarColor.classList.remove("md-transparent");
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = "";
          navbarColor.classList.add("md-transparent");
        }
      }
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
    },
    scrollToElement() {
      let element_id = document.getElementById("downloadSection");
      if (element_id) {
        element_id.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    },
  },
  mounted() {
    window.navbar = this;
    document.addEventListener("scroll", this.scrollListener);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener);
  },
};
</script>
