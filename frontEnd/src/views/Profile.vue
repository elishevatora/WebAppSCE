<template>
  <div>
    <v-loader v-if="!user"></v-loader>
    <div class="wrapper" v-if="user">
      <parallax
        class="section page-header header-filter"
        :style="headerStyle"
      ></parallax>
      <div class="main main-raised">
        <div class="section profile-content">
          <div class="container">
            <div class="md-layout">
              <div class="md-layout-item md-size-50 mx-auto">
                <div class="profile">
                  <div class="avatar">
                    <img
                      :src="img"
                      alt="Circle Image"
                      class="img-raised rounded-circle img-fluid"
                    />
                  </div>
                  <div class="name">
                    <h3 class="title" v-if="user">{{ user.name }}</h3>
                    <h6>Client CoronaChallenge</h6>
                    <md-button
                      href="javascript:void(0)"
                      class="md-just-icon md-simple md-dribbble"
                      ><i class="fab fa-dribbble"></i
                    ></md-button>
                    <md-button
                      href="javascript:void(0)"
                      class="md-just-icon md-simple md-twitter"
                      ><i class="fab fa-twitter"></i
                    ></md-button>
                    <md-button
                      href="javascript:void(0)"
                      class="md-just-icon md-simple md-pinterest"
                      ><i class="fab fa-pinterest"></i
                    ></md-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="description text-center">
              <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>{{ user.name }}</label>
                <md-input v-model="name" type="text" disabled></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>{{ user.email }}</label>
                <md-input v-model="email" type="email" disabled></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>event</md-icon>
                <label>{{ user.age || "undefined" }}</label>
                <md-input v-model="age" type="number" disabled></md-input>
              </md-field>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  bodyClass: "profile-page",
  data() {
    return {
      user: null,
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/city-profile.jpg"),
    },
    img: {
      type: String,
      default: require("@/assets/img/faces/christian.jpg"),
    },
  },
  beforeMount() {
    this.islogged2();
    window.Profile = this;
  },
  methods: {
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
          headers: { token: myHeaders },
        })
        .then(async (info) => {
          // temp.user = Object.assign({}, temp.user, info.data)
          this.user = info.data;
        })
        .catch((err) => {
          localStorage.removeItem("token");
          temp.errors.push(err.response.data.msg);
        });
    },
    islogged2() {
      if (localStorage.getItem("token")) {
        this.loaduser();
        return true;
      }
      return false;
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

<style lang="scss" scoped>
.section {
  padding: 0;
}

.profile-tabs::v-deep {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
}
</style>
