app.controller("chatController", [
    "$scope",
    $scope => {
        /**
         *  Angular Variables
         */

        $scope.onlineList = [];
        $scope.roomList = [];
        $scope.activeTab = 2;

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
            let randomRoomName = Math.random()
                .toString(36)
                .substring(7);
            socket.emit("newRoom", randomRoomName);
        };
    }
]);
