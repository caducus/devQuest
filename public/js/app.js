const app = angular.module("devQuestApp", []);

app.controller("MainController", ["$http", function($http) {

  // set the following to not visible
  this.showNewForm = false;
  this.showLogInForm = false;
  this.indexOfEditForm = null;
  this.indexOfUserBio = null;

  // set initial index "show" page to the introduction
  this.includePath = "partials/introduction.html"

  // create new user
  this.createUser = () => {
    $http({
      method: "POST",
      url: "/users",
      data: {
        username: this.createdUsername,
        password: this.createdPassword,
        avatar: "/images/avatars/placeholder.png"
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
      this.includePath = "partials/about.html"
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
      this.includePath = "partials/introduction.html"
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
      this.loggedInUser = response.data;
      console.log("Logged in and ready to play.");
    }, (error) => {
      console.log("There is an issue with isLoggedIn();");
      console.log(error.data);
    });
  };

  // get a list of all users
  this.getUsers = () => {
    $http({
      method: "GET",
      url: "/users"
    }).then((response) => {
      this.users = response.data;
    }, (error) => {
      console.log("There is an issue with getUsers();");
      console.log(error);
    });
  };

  // update a users avatar and bio
  this.editUser = (user) => {
    $http({
      method: "PUT",
      url: "/users/" + user._id,
      data: {
        avatar: this.updatedAvatar,
        bio: this.updatedBio
      }
    }).then((response) => {
      this.loggedInUser.avatar = this.updatedAvatar;
      this.loggedInUser.bio = this.updatedBio;
      this.updatedAvatar = null;
      this.updatedBio = null;
      this.getUsers();
    }, (error) => {
      console.log("There is an issue with editUser();");
      console.log(error);
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
      this.postBody = null;
      this.includePath = "partials/forum-view.html"
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

  // call getUsers once on initial page load
  this.getUsers();
  // call getPosts once on initial page load
  this.getPosts();

}]);
