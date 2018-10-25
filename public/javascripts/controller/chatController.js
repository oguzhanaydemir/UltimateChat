app.controller('chatController', ['$scope', ($scope) => {
    const socket = io.connect('http://localhost:3000');

    $scope.onlineList = [];

    $scope.activeTab = 2;

    $scope.changeTab = tabValue => {
        $scope.activeTab = tabValue;
    }

    socket.on('onlineList' , onlineUsers => {
       $scope.onlineList = onlineUsers;
       $scope.$apply();
    });

}]);