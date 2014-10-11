'use strict';

function jsonp_callback(data) {
    // returning from async callbacks is (generally) meaningless
    console.log(data.found);
}


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','ajoslin.mobile-navigate','ngMobile'])
    .config(function ($compileProvider){
        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    .config(['$routeProvider', function($routeProvider) {
        
$routeProvider.when('/homeview', {templateUrl: 'partials/homeView.html', controller: 'HomeCtrl'});
             
        //$routeProvider.when('/', {templateUrl: 'partials/homeView.html', controller: 'HomeCtrl'});
$routeProvider.when('/', {templateUrl: 'partials/slogan.html', controller: 'HomeCtrl'});
$routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'HomeCtrl'});
$routeProvider.when('/step1', {templateUrl: 'partials/step1.html'});
$routeProvider.when('/newroom', {templateUrl: 'partials/newroom.html', controller: 'HomeCtrl'});
$routeProvider.when('/joinroom', {templateUrl: 'partials/joinroom.html', controller: 'HomeCtrl'});
$routeProvider.when('/mainchat', {templateUrl: 'partials/mainchat.html', controller: 'HomeCtrl'});
$routeProvider.when('/step2', {templateUrl: 'partials/step2.html', controller: 'HomeCtrl'});
$routeProvider.when('/step3', {templateUrl: 'partials/step3.html', controller: 'HomeCtrl'});
$routeProvider.when('/cbsview', {templateUrl: 'partials/CBS_View.html', controller: 'HomeCtrl'});
//大冒险主视图
$routeProvider.when('/dmxview', {templateUrl: 'partials/dmx/dmx_view.html', controller: 'HomeCtrl'});
$routeProvider.when('/dmxview2', {templateUrl: 'partials/dmx/dmx_view2.html', controller: 'HomeCtrl'});
        
             
$routeProvider.when('/cbs2', {templateUrl: 'partials/cbs2.html', controller: 'HomeCtrl'});
$routeProvider.when('/inggameview', {templateUrl: 'partials/inggame.html', controller: 'HomeCtrl'});
             
//nophone游戏相关视图
$routeProvider.when('/nophoneview', {templateUrl: 'partials/nophone/nophone.html', controller: 'HomeCtrl'});
$routeProvider.when('/nophone_is1', {templateUrl: 'partials/nophone/nophone_is1.html', controller: 'HomeCtrl'});
$routeProvider.when('/nophone_is2', {templateUrl: 'partials/nophone/nophone_is2.html', controller: 'HomeCtrl'});
$routeProvider.when('/nophoneview2', {templateUrl: 'partials/nophone/nophone2.html', controller: 'HomeCtrl'});
             
             
//击鼓传花游戏相关视图
$routeProvider.when('/jgchview', {templateUrl: 'partials/jgch/jgchview.html', controller: 'HomeCtrl'});
$routeProvider.when('/jgchview2', {templateUrl: 'partials/jgch/jgchview2.html', controller: 'HomeCtrl'});
$routeProvider.when('/jgchview3', {templateUrl: 'partials/jgch/jgchview3.html', controller: 'HomeCtrl'});
$routeProvider.when('/jgchview4', {templateUrl: 'partials/jgch/jgchview4.html', controller: 'HomeCtrl'});
//谁是卧底发起者主视图
$routeProvider.when('/whoiswo', {templateUrl: 'partials/whoiswo/index.html', controller: 'HomeCtrl'});
//谁是卧底 法官权利主视图
$routeProvider.when('/whoiswofg', {templateUrl: 'partials/whoiswo/fgindex.html', controller: 'HomeCtrl'});
//更改法官后，何去何从FG
$routeProvider.when('/fggo', {templateUrl: 'partials/whoiswo/fggo.html', controller: 'HomeCtrl'});
             
//谁是卧底参与者等待主视图
$routeProvider.when('/whoiswowo', {templateUrl: 'partials/whoiswo/index1.html', controller: 'HomeCtrl'});
//谁是卧底参与者游戏中主视图
$routeProvider.when('/whoiswoplay', {templateUrl: 'partials/whoiswo/player.html', controller: 'HomeCtrl'});
$routeProvider.when('/cchh', {templateUrl: 'partials/whoiswo/cchh.html', controller: 'HomeCtrl'});
//谁是卧底游戏进行主视图
$routeProvider.when('/whoiswogaming', {templateUrl: 'partials/whoiswo/gameing.html', controller: 'HomeCtrl'});
$routeProvider.when('/whoiswogaming2', {templateUrl: 'partials/whoiswo/gameing2.html', controller: 'HomeCtrl'});
//法官游戏结束视图、卧底胜利
$routeProvider.when('/whoiswogameover', {templateUrl: 'partials/whoiswo/over.html', controller: 'HomeCtrl'});
//法官游戏结束视图、平民胜利
$routeProvider.when('/whoiswogameover1', {templateUrl: 'partials/whoiswo/over1.html', controller: 'HomeCtrl'});
//参与者游戏结束视图、卧底胜利
$routeProvider.when('/whoiswogameover2', {templateUrl: 'partials/whoiswo/over2.html', controller: 'HomeCtrl'});
//参与者游戏结束视图、平民胜利
$routeProvider.when('/whoiswogameover3', {templateUrl: 'partials/whoiswo/over3.html', controller: 'HomeCtrl'});
$routeProvider.when('/diceview', {templateUrl: 'partials/dicegame/diceview.html', controller: 'HomeCtrl'});
//吹牛游戏视图流程
$routeProvider.when('/diceviewc1', {templateUrl: 'partials/dicegame/diceviewc1.html', controller: 'HomeCtrl'});
$routeProvider.when('/diceviewc2', {templateUrl: 'partials/dicegame/diceviewc2.html', controller: 'HomeCtrl'});
$routeProvider.when('/diceviewc3', {templateUrl: 'partials/dicegame/diceviewc3.html', controller: 'HomeCtrl'});

//比大小游戏视图流程
$routeProvider.when('/diceviewbdx', {templateUrl: 'partials/dicegame/diceviewcbdx.html', controller: 'HomeCtrl'});
//1个骰子情况
$routeProvider.when('/dice1viewbdx', {templateUrl: 'partials/dicegame/dice1viewcbdx.html', controller: 'HomeCtrl'});
$routeProvider.when('/dice1viewbdxsend', {templateUrl: 'partials/dicegame/dice1viewcbdxsend.html', controller: 'HomeCtrl'});
$routeProvider.when('/dice1viewcbdxresult', {templateUrl: 'partials/dicegame/dice1viewcbdxresult.html', controller: 'HomeCtrl'});

//2个骰子情况
$routeProvider.when('/dice2viewbdx', {templateUrl: 'partials/dicegame/dice2viewcbdx.html', controller: 'HomeCtrl'});
$routeProvider.when('/dice2viewbdxsend', {templateUrl: 'partials/dicegame/dice2viewcbdxsend.html', controller: 'HomeCtrl'});
$routeProvider.when('/dice2viewcbdxresult', {templateUrl: 'partials/dicegame/dice2viewcbdxresult.html', controller: 'HomeCtrl'});
             
//3个骰子情况
$routeProvider.when('/dice3viewbdx', {templateUrl: 'partials/dicegame/dice3viewcbdx.html', controller: 'HomeCtrl'});
$routeProvider.when('/dice3viewbdxsend', {templateUrl: 'partials/dicegame/dice3viewcbdxsend.html', controller: 'HomeCtrl'});
$routeProvider.when('/dice3viewcbdxresult', {templateUrl: 'partials/dicegame/dice3viewcbdxresult.html', controller: 'HomeCtrl'});

//4个骰子情况
$routeProvider.when('/dice4viewbdx', {templateUrl: 'partials/dicegame/dice4viewcbdx.html', controller: 'HomeCtrl'});
$routeProvider.when('/dice4viewbdxsend', {templateUrl: 'partials/dicegame/dice4viewcbdxsend.html', controller: 'HomeCtrl'});
$routeProvider.when('/dice4viewcbdxresult', {templateUrl: 'partials/dicegame/dice4viewcbdxresult.html', controller: 'HomeCtrl'});
         
             
//5个骰子情况
$routeProvider.when('/dice5viewbdx', {templateUrl: 'partials/dicegame/dice5viewcbdx.html', controller: 'HomeCtrl'});
$routeProvider.when('/dice5viewbdxsend', {templateUrl: 'partials/dicegame/dice5viewcbdxsend.html', controller: 'HomeCtrl'});
$routeProvider.when('/dice5viewcbdxresult', {templateUrl: 'partials/dicegame/dice5viewcbdxresult.html', controller: 'HomeCtrl'});
             
//6个骰子情况
$routeProvider.when('/dice6viewbdx', {templateUrl: 'partials/dicegame/dice6viewcbdx.html', controller: 'HomeCtrl'});
$routeProvider.when('/dice6viewbdxsend', {templateUrl: 'partials/dicegame/dice6viewcbdxsend.html', controller: 'HomeCtrl'});
$routeProvider.when('/dice6viewcbdxresult', {templateUrl: 'partials/dicegame/dice6viewcbdxresult.html', controller: 'HomeCtrl'});
             
             
//骰子参与者等待页面
$routeProvider.when('/diceviewwaiting', {templateUrl: 'partials/dicegame/dice1viewf.html', controller: 'HomeCtrl'});
             
//------------猜比赛相关视图-------------
$routeProvider.when('/flatview', {templateUrl: 'partials/flatview.html', controller: 'HomeCtrl'});
$routeProvider.when('/cbsteamdetail', {templateUrl: 'partials/cbsteamdetail.html', controller: 'HomeCtrl'});
$routeProvider.when('/homelostview', {templateUrl: 'partials/homelostview.html', controller: 'HomeCtrl'});
$routeProvider.when('/cbsview2', {templateUrl: 'partials/CBS_View2.html', controller: 'HomeCtrl'});
$routeProvider.when('/myscoreview', {templateUrl: 'partials/myscoreview.html', controller: 'HomeCtrl'});
$routeProvider.when('/searchteam', {templateUrl: 'partials/searchTeamView.html'});

//游戏大厅用户列表
$routeProvider.when('/viewuserlist', {templateUrl: 'partials/ViewUserList.html'});

             
//知否游戏游戏发起者主视图
$routeProvider.when('/know', {templateUrl: 'partials/know/knows1.html', controller: 'HomeCtrl'});
//知否游戏参与者主视图
$routeProvider.when('/knowj', {templateUrl: 'partials/know/knowjs1.html', controller: 'HomeCtrl'});
             
             
//猜拳游戏发起者主视图
$routeProvider.when('/moraview', {templateUrl: 'partials/mora/moramview.html', controller: 'HomeCtrl'});
             
//杀人游戏发起者主视图
$routeProvider.when('/killer', {templateUrl: 'partials/killer/mview.html', controller: 'HomeCtrl'});
             
//开始游戏前系统自动确定who是法官
$routeProvider.when('/killerfg', {templateUrl: 'partials/killer/whofview.html', controller: 'HomeCtrl'});
$routeProvider.when('/killerfgm', {templateUrl: 'partials/killer/fgmview.html', controller: 'HomeCtrl'});
             
//法官开始游戏后,系统自动分配角色信息角色分类列表，游戏主视图
$routeProvider.when('/killers1', {templateUrl: 'partials/killer/s1mview.html', controller: 'HomeCtrl'});
             
$routeProvider.when('/killers2', {templateUrl: 'partials/killer/s2mview.html', controller: 'HomeCtrl'});
             
$routeProvider.when('/killers3', {templateUrl: 'partials/killer/s3mview.html', controller: 'HomeCtrl'});

$routeProvider.when('/killers4', {templateUrl: 'partials/killer/s4mview.html', controller: 'HomeCtrl'});

$routeProvider.when('/killers5', {templateUrl: 'partials/killer/s5mview.html', controller: 'HomeCtrl'});

$routeProvider.when('/killers6', {templateUrl: 'partials/killer/s6mview.html', controller: 'HomeCtrl'});

$routeProvider.when('/killers7', {templateUrl: 'partials/killer/s7mview.html', controller: 'HomeCtrl'});
             
$routeProvider.when('/killers8', {templateUrl: 'partials/killer/s8mview.html', controller: 'HomeCtrl'});
             
$routeProvider.when('/killers9', {templateUrl: 'partials/killer/s9mview.html', controller: 'HomeCtrl'});

$routeProvider.when('/killers10', {templateUrl: 'partials/killer/s10mview.html', controller: 'HomeCtrl'});
             
$routeProvider.when('/killers4', {templateUrl: 'partials/killer/s4mview.html', controller: 'HomeCtrl'});

$routeProvider.when('/killers4', {templateUrl: 'partials/killer/s4mview.html', controller: 'HomeCtrl'});
             
    
             
//参与游戏者加入杀人游戏－修改并确认昵称步骤
$routeProvider.when('/jkiller', {templateUrl: 'partials/killer/jmview.html', controller: 'HomeCtrl'});
//确认昵称后，等待游戏开始
$routeProvider.when('/jwkiller', {templateUrl: 'partials/killer/jwview.html', controller: 'HomeCtrl'});
//杀人游戏参与者游戏视图
$routeProvider.when('/jwgame', {templateUrl: 'partials/killer/jkgameview.html', controller: 'HomeCtrl'});
             
//杀人游戏参与者游戏结束视图图
$routeProvider.when('/jwgamer', {templateUrl: 'partials/killer/jkgameviewr.html', controller: 'HomeCtrl'});
             

//======================================================================================
        $routeProvider.when('/view1', {templateUrl: 'partials/notificationView.html'});
        $routeProvider.when('/view2', {templateUrl: 'partials/geolocationView.html'});
        $routeProvider.when('/view3', {templateUrl: 'partials/accelerometerView.html'});
        $routeProvider.when('/view4', {templateUrl: 'partials/deviceInfoView.html'});
        $routeProvider.when('/view5', {templateUrl: 'partials/cameraView.html'});
        $routeProvider.when('/view6', {templateUrl: 'partials/contactsView.html'});
        $routeProvider.when('/view7', {templateUrl: 'partials/compassView.html'});
        $routeProvider.when('/view8', {templateUrl: 'partials/hackerNewsView.html'});
        $routeProvider.otherwise({redirectTo: '/'});
//======================================================================================
  }]);
