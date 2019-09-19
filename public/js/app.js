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
      // empty these fields
      this.createdUsername = null;
      this.createdPassword = null;
      // hide the form
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
      // empty these fields
      this.username = null;
      this.password = null;
      // hide the form
      this.showLogInForm = false;
      // change the view to "about"
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
      // empty the loggedInUser data
      this.loggedInUser = null;
      // change the view to "introduction"
      this.includePath = "partials/introduction.html"
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
      console.log("Logged in and ready to play.");
      // set the loggedInUser data to that of the person who is currently logged in
      this.loggedInUser = response.data;
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
  this.editUser = (updated_user) => {
    $http({
      method: "PUT",
      url: "/users/" + updated_user._id,
      data: {
        avatar: this.updatedAvatar,
        bio: this.updatedBio
      }
    }).then((response) => {
      // update the users information on the page without needing to refresh
      this.loggedInUser.avatar = this.updatedAvatar;
      this.loggedInUser.bio = this.updatedBio;
      // empty these fields
      this.updatedAvatar = null;
      this.updatedBio = null;
      // remove the older user information from the viewable list
      const removeByIndex = this.users.findIndex(user => user._id === updated_user._id);
      this.users.splice(removeByIndex, 1);
      // add the updated user information to the viewable list
      this.users.push(response.data);
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
      // empty these fields
      this.postTitle = null;
      this.postBody = null;
      // change the view to "forum-view"
      this.includePath = "partials/forum-view.html"
      // push the new post to the data fetched upon page load
      this.posts.push(response.data);
    }, (error) => {
      console.log("There is an issue with newPost();");
      console.log(error);
    });
  };

  // edit existing forum post
  this.editPost = (edited_post) => {
    $http({
      method: "PUT",
      url: "/posts/" + edited_post._id,
      data: {
        title: this.updatedTitle,
        post: this.updatedPost
      }
    }).then((response) => {
      // remove the original post
      this.indexOfEditForm = !this.indexOfEditForm;
      const removeByIndex = this.posts.findIndex(post => post._id === edited_post._id);
      this.posts.splice(removeByIndex, 1);
      // push the new post
      this.posts.push(response.data);
    }, (error) => {
      console.log("There is an issue with editPost();");
      console.log(error);
    });
  };

  // delete existing forum post
  this.deletePost = (deleted_post) => {
    $http({
      method: "DELETE",
      url: "/posts/" + deleted_post._id
    }).then((response) => {
      // remove the deleted post
      const removeByIndex = this.posts.findIndex(post => post._id === deleted_post._id);
      this.posts.splice(removeByIndex, 1);
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
