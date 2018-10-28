app.controller("chatController", [
  "$scope",
  "userFactory",
  "chatFactory",
  ($scope, userFactory, chatFactory) => {
    /**
     *  Initialization
     */

    function init() {
      userFactory.getUser().then(user => {
        $scope.user = user;
      });
    }

    init();

    /**
     *  Angular Variables
     */

    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.chatClicked = false;
    $scope.loadingMessages = false;
    $scope.chatName = "";
    $scope.roomId = "";
    $scope.messages = [];
    $scope.user = {};

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

    socket.on('receiveMessage', (data) => {
      //console.log(data);
        $scope.messages[data.roomId].push({
          userId:data.userId,
          username:data.username,
          surname:data.surname,
          message:data.message
        });
        $scope.$apply();
    });
    /**
     *  Angular functions
     */

    $scope.changeTab = tabValue => {
      $scope.activeTab = tabValue;
    };

    $scope.newRoom = () => {
      let roomName = window.prompt("Please enter a room name...");
      if (roomName !== "" && roomName !== null)
        socket.emit("newRoom", roomName);
    };

    $scope.switchRoom = room => {
      $scope.chatName = room.name;
      $scope.roomId = room.id;

      $scope.chatClicked = true;

      if (!$scope.messages[room.id]) {
        $scope.loadingMessages = true;
        console.log('servise bağlanılıyor');
        chatFactory.getMessages(room.id).then(data => {
          $scope.messages[room.id] = data;
          $scope.loadingMessages = false;
        });

      }

    };

    $scope.newMessage = () => {
      if ($scope.message.trim() !== '') {
        socket.emit("newMessage", {
          message: $scope.message,
          roomId: $scope.roomId
        });
        $scope.messages[$scope.roomId].push({
          userId: $scope.user._id,
          username: $scope.user.name,
          surname: $scope.user.surname,
          message: $scope.message
        });
      }
      
      $scope.message = "";
    };
  }
]);
