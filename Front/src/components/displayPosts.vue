<template>
  <div class="posts">
    <h2>Timeline</h2>
    <div class="pageNavigator">
        <button v-on:click="previousPage" class="Page">Previous Page</button>
        <p class="Page">{{PageNumber}}</p>
        <button v-on:click="nextPage" class="Page">Next Page</button>
      </div>
      <br/>
    <div>
      <li class="list" v-for="post in postsOnDisplay" :key="post.postid">
        <table class="table">
          <tr>
            <th colspan="2" class="title">{{post.title}} - by {{post.username}}</th>
            <th class="date">{{post.date.substring(0, 10)}}</th>
          </tr>
          <tr>
            <td colspan="2">{{post.blogcontent}}</td>
          </tr>
          <br />
        </table>
      </li>
      <br />
      
    </div>
    <br />

    <p>{{error}}</p>
  </div>
</template>

<script>
export default {
  name: "displayPosts",
  data() {
    return {
      posts: null,
      error: "",
      PageNumber: 1,
      postsOnDisplay: []
    };
  },
  methods: {
    init: function() {
      this.postsOnDisplay = [];
      this.$http.get("posts").then(response => {
        if (response.status >= 200 && response.status < 300) {
          this.posts = response.data;
          for (var i = 0; i < 5; i++) {
            if (this.posts[i]) {
              this.postsOnDisplay.push(this.posts[i]);
            } else {
              break;
            }
          }
        } else {
          this.error = "Something went wrong!";
        }
      });
    },
    nextPage: function() {
      if (this.posts[this.PageNumber * 5 + 5]) {
        this.postsOnDisplay = [];
        for (var i = 0; i < 5; i++) {
          this.postsOnDisplay.push(this.posts[this.PageNumber * 5 + i]);
        }
        this.PageNumber++;
      } else if (this.posts[this.PageNumber * 5 + 1]) {
        this.postsOnDisplay = [];

        for (i = 0; i < this.posts.length - this.PageNumber * 5; i++) {
          this.postsOnDisplay.push(this.posts[this.PageNumber * 5 + i]);
        }

        this.PageNumber++;
      }
    },
    previousPage: function() {
      if (this.PageNumber > 1) {
        this.PageNumber--;
        this.postsOnDisplay = [];
        for (var i = 0; i < 5; i++) {
          this.postsOnDisplay.push(this.posts[(this.PageNumber - 1) * 5 + i]);
        }
      }
    }
  },
  mounted() {
    this.init();
    Event.$on('reloadPosts', () => {
      this.init();
    })
  }
};
</script>

<style scoped>
.list {
  list-style: none;
  margin-bottom: 10px;
}

.date {
  float: right;
}
.title {
  float: left;
}
.table {
  border: 1px solid black;
  width: 80%;
}
.pageNavigator {
  text-align: center;
  margin-right: 20%;
}
.Page {
  display: inline;
}
</style>
