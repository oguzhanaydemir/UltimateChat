app.controller('chatController', ['$scope', ($scope) => {
    const socket = io.connect('http://localhost:3000');

    $scope.onlineList = [];

    $scope.activeTab = 2;
    
    //Sockets
    socket.on('onlineList' , onlineUsers => {
       $scope.onlineList = onlineUsers;
       $scope.$apply();
    });

    //Front End
    $scope.changeTab = tabValue => {
        $scope.activeTab = tabValue;
    }

    $scope.newRoom = () => {
        let randomRoomName = Math.random().toString(36).substring(7);
        socket.emit('newRoom', randomRoomName);
    }


}]);