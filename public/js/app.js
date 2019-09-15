const app = angular.module("devQuestApp", []);

app.controller("MainController", ["$http", function($http) {

  // set the following to not visible
  this.showNewForm = false;
  this.showLogInForm = false;
  this.indexOfEditForm = false;

  // set initial index "show" page to the introduction
  this.includePath = "partials/introduction.html"

  // create new user
  this.createUser = () => {
    $http({
      method: "POST",
      url: "/users",
      data: {
        username: this.createdUsername,
        password: this.createdPassword
      }
    }).then((response) => {
      console.log(response.data);
      this.createdUsername = null;
      this.createdPassword = null;
      this.showNewForm = false;
    }, (error) => {
      console.log("There is an issue with createUser();");
      console.log(error);
    });
  };

  // log in with existing user
  this.logIn = () => {
    $http({
      method: "POST",
      url: "/sessions",
      data: {
        username: this.username,
        password: this.password
      }
    }).then((response) => {
      console.log(response.data);
      this.username = null;
      this.password = null;
      this.showLogInForm = false;
      this.isLoggedIn();
    }, (error) => {
      console.log("There is an issue with logIn();");
      console.log(error);
    });
  };

  // log out
  this.logOut = () => {
    $http({
      method: "DELETE",
      url: "/sessions"
    }).then((response) => {
      console.log(response.data);
      this.loggedInUser = null;
    }, (error) => {
      console.log("There is an issue with logOut();");
      console.log(error);
    });
  };

  // fetch and assign current user data to variables for use
  this.isLoggedIn = () => {
    $http({
      method: "GET",
      url: "/loggedin"
    }).then((response) => {
      this.loggedInUser = response.data.username;
      this.loggedInUserID = response.data;
      console.log("Logged in and ready to play.");
    }, (error) => {
      console.log("There is an issue with isLoggedIn();");
      console.log(error.data);
    });
  };

  // navigation and controlling partials
  this.changeInclude = (path) => {
    this.includePath = "partials/" + path + ".html"
  };

  // get all posts for the forum
  this.getPosts = () => {
    $http({
      method: "GET",
      url: "/posts"
    }).then((response) => {
      this.posts = response.data;
    }, (error) => {
      console.log("There is an issue with getPosts();");
      console.log(error);
    });
  };

  // create new forum post
  this.newPost = (user) => {
    $http({
      method: "POST",
      url: "/posts",
      data: {
        user_id: user._id,
        username: user.username,
        avatar: user.avatar,
        title: this.postTitle,
        post: this.postBody
      }
    }).then((response) => {
      this.postTitle = null;
      this.post = null;
      this.getPosts();
    }, (error) => {
      console.log("There is an issue with newPost();");
      console.log(error);
    });
  };

  // edit existing forum post
  this.editPost = (post) => {
    $http({
      method: "PUT",
      url: "/posts/" + post._id,
      data: {
        title: this.updatedTitle,
        post: this.updatedPost
      }
    }).then((response) => {
      this.indexOfEditForm = !this.indexOfEditForm;
      this.getPosts();
    }, (error) => {
      console.log("There is an issue with editPost();");
      console.log(error);
    });
  };

  // delete existing forum post
  this.deletePost = (post) => {
    $http({
      method: "DELETE",
      url: "/posts/" + post._id
    }).then((response) => {
      this.getPosts();
    }, (error) => {
      console.log("There is an issue with deletePost();");
      console.log(error);
    });
  };

  // call getPosts once on initial page load
  this.getPosts();

}]);
