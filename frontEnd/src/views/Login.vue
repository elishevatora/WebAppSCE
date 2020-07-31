<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Login</h4>

              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email...</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field>

              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input v-model="password" type="password"></md-input>
              </md-field>

              <md-button
                v-on:click="submit"
                slot="footer"
                class="md-simple md-success md-lg"
                >Login</md-button
              >
              <md-button slot="footer" class="md-simple md-success md-lg">
                <a href="#/register">Register</a></md-button
              >
            </login-card>
            <div id="notification">
              <div
                class="alert alert-danger"
                v-for="item in errors"
                :key="item"
              >
                <div class="container">
                  <div class="alert-icon">
                    <md-icon>info_outline</md-icon>
                  </div>
                  <b>ERROR ALERT</b>
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import axios from "axios";
export default {
  components: {
    LoginCard,
  },
  beforeMount() {
    if (localStorage.getItem("token")) this.$router.push("/");
  },
  bodyClass: "login-page",
  data() {
    return {
      firstname: null,
      email: null,
      password: null,
      errors: []
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/profile_city.jpg"),
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    }
  },
  methods: {
    submit() {
      this.errors = [];
      let temps = this;
      if (!this.email || !this.password) {
        alert("enter filed");
        return;
      }
      axios
        .post("http://localhost:3000/user/login/", {
          email: this.email,
          password: this.password
        })
        .then((info) => {
          localStorage.setItem("token", info.data.token);
          if (window.navbar) {
            window.navbar.check();
          }
          temps.$route.query.nextUrl
            ? temps.$router.push(temps.$route.query.nextUrl)
            : temps.$router.push("/");
        })
        .catch((err) => {
          temps.errors.push(err.response.data.msg);
        });
    }
  }
};
</script>

<style lang="css"></style>
