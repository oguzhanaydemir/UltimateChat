app.controller("chatController", [
  "$scope",
  $scope => {
    /**
     *  Angular Variables
     */

    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.chatClicked = false;
    $scope.chatName = "";
    $scope.roomId = "";

    /**
     *  Socket.io events handling
     */

    const socket = io.connect("http://localhost:3000");

    socket.on("onlineList", onlineUsers => {
      $scope.onlineList = onlineUsers;
      $scope.$apply();
    });

    socket.on("roomList", rooms => {
      $scope.roomList = rooms;
      $scope.$apply();
    });

    /**
     *  Angular functions
     */

    $scope.changeTab = tabValue => {
      $scope.activeTab = tabValue;
    };

    $scope.newRoom = () => {
      /* let randomRoomName = Math.random()
                .toString(36)
                .substring(7); */
      let roomName = window.prompt("Please enter a room name...");
      if (roomName !== "" && roomName !== null)
        socket.emit("newRoom", roomName);
    };

    $scope.switchRoom = room => {
      $scope.chatClicked = true;
      $scope.chatName = room.name;
      $scope.roomId = room.id;
    };

    $scope.newMessage = () => {
      socket.emit("newMessage", {
        message: $scope.message,
        roomId: $scope.roomId
      });
      $scope.message = "";
    };
  }
]);
