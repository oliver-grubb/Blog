<template>
  <div v-if="loggedInStatus">
    <input class="titleInput" v-model="title" placeholder="Title" />
    <br />
    <textarea class="contentInput" v-model="content" placeholder="What's on your mind?" />
    <br />
    <button v-on:click="post">Post</button>
    <p>{{error}}</p>
  </div>
</template>

<script>
export default {
  name: "post",
  data() {
    return {
      title: "",
      content: "",
      loggedInStatus: false,
      currentUserID: "",
      error: ""
    };
  },
  mounted() {
    Event.$on("loginStatusReply", loggedInDetails => {
      this.loggedInStatus = loggedInDetails.loggedInStatus;
      this.currentUserID = loggedInDetails.userID;
    });
  },
  methods: {
    post: function() {
      Event.$emit("loginStatusRequest");
      this.$http
        .post("post", {
          data: {
            title: this.title,
            content: this.content,
            userID: this.currentUserID
          }
        })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            this.title = "";
            this.content = "";
            Event.$emit('reloadPosts');
          } else {
            this.error = "Something went wrong";
          }
        });
    }
  }
};
</script>

<style scoped>
.contentInput {
  height: 100px;
  width: 80%;
}
.titleInput {
  width: 80%;
}
</style>