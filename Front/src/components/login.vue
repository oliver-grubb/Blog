<template>
  <div>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" placeholder="Password" />
    <button v-on:click="submit">Submit</button>
    <p v-if="loggedInStatus">You are logged in as {{response}}</p>
    <p v-if="!loggedInStatus">{{loginError}}</p>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      response: null,
      loggedInStatus: false,
      loginError: "You are not logged in!",
      loddedInUserID: null
    };
  },
  mounted() {
Event.$on('loginStatusRequest', () => {
    var loggedInDetails = {userID: this.loggedInUserID, loggedInStatus: this.loggedInStatus};
    Event.$emit('loginStatusReply', loggedInDetails)
})
  },
  methods: {
    submit: function() {
      if (this.username && this.password) {
        this.$http
          .post("submit", {
            data: { username: this.username, password: this.password }
          })
          .then(response => {
              if(response.data.message) {
                this.loginError = 'Invalid Credentials'
              }
            else if (response.status >= 200 && response.status < 300) {
              this.loggedInStatus = true;
              this.response = response.data.username;
              this.loggedInUserID = response.data.userid;
              var loggedInDetails = {userID: this.loggedInUserID, loggedInStatus: this.loggedInStatus};

              Event.$emit('loginStatusReply', loggedInDetails)

            } else {
                this.loginError = 'Something went wrong'
            }
        
          });
      }
    }
  }
};
</script>

<style scoped>
</style>