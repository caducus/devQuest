const app = angular.module("devQuestApp", []);

app.controller("MainController", ["$http", function($http) {
  const controller = this;
  this.showLogInForm = false;

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
      console.log(error);
    });
  }

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
      console.log(error);
    });
  }

  this.logOut = () => {
    $http({
      method: "DELETE",
      url: "/sessions"
    }).then((response) => {
      console.log(response.data);
      this.loggedInUser = null;
    }, (error) => {
      console.log(error);
    });
  }

  this.isLoggedIn = () => {
    $http({
      method: "GET",
      url: "/loggedin"
    }).then((response) => {
      this.loggedInUser = response.data.username;
      console.log("Logged in and ready to play.");
    }, (error) => {
      console.log(error.data);
    });
  }

}]);
