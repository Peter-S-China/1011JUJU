'use strict';

/* Controllers */
function HomeCtrl($scope,navSvc,$rootScope) {
    $rootScope.showSettings = false;
    $scope.slidePage = function (path,type) {
        navSvc.slidePage(path,type);
    };
    $scope.back = function () {
        navSvc.back();
    };
    $scope.changeSettings = function () {
        $rootScope.showSettings = true;
    };
    $scope.closeOverlay = function () {
        $rootScope.showSettings = false;
    };
}

function NotificationCtrl($scope) {
    $scope.alertNotify = function() {
        navigator.notification.alert("Sample Alert",function() {console.log("Alert success")},"My Alert","Close");
    };
    
    $scope.beepNotify = function() {
        navigator.notification.beep(1);
    };
    
    $scope.vibrateNotify = function() {
        navigator.notification.vibrate(3000);
    };
    
    $scope.confirmNotify = function() {
        navigator.notification.confirm("My Confirmation",function(){console.log("Confirm Success")},"Are you sure?",["Ok","Cancel"]);
    };
}

function GeolocationCtrl($scope,navSvc,$rootScope) {
    navigator.geolocation.getCurrentPosition(function(position) {
        $scope.position=position;
        $scope.$apply();
        },function(e) { console.log("Error retrieving position " + e.code + " " + e.message) });

    $scope.back = function () {
        navSvc.back();
    };
}

function AccelerCtrl($scope) {
    
    navigator.accelerometer.getCurrentAcceleration(function (acceleration) {
        $scope.acceleration  = acceleration;
        },function(e) { console.log("Error finding acceleration " + e) });

}

function DeviceCtrl($scope) {
    $scope.device = device;
}

function CompassCtrl($scope) {
    navigator.compass.getCurrentHeading(function (heading) {
        $scope.heading  = heading;
        $scope.$apply();
    },function(e) { console.log("Error finding compass " + e.code) });
}

function HackerNewsCtrl($scope, $rootScope) {

    
     $rootScope.items = null;
    // load in data from hacker news unless we already have
    if (!$rootScope.items) {     

        jx.load('http://api.ihackernews.com/page',function(data){
            console.log(JSON.stringify(data));
            $rootScope.items = data.items;
            $scope.$apply();
        },'json');

    } else {
        console.log('data already loaded');
    }

    $scope.loadItem = function(item) {
        navigator.notification.alert(item.url,function() {console.log("Alert success")},"My Alert","Close");
    };
}


function ContactsCtrl($scope) {
    $scope.find = function() {
        $scope.contacts = [];
        var options = new ContactFindOptions();
        //options.filter=""; //returns all results
        options.filter=$scope.searchTxt;
        options.multiple=true;
        var fields = ["displayName", "name", "phoneNumbers"];
        navigator.contacts.find(fields,function(contacts) {
            $scope.contacts=contacts;
            $scope.$apply();
        },function(e){console.log("Error finding contacts " + e.code)},options);
    }
}

function CameraCtrl($scope) {
    $scope.takePic = function() {
        var options =   {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            encodingType: 0     // 0=JPG 1=PNG
        }
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onSuccess,onFail,options);
    }
    var onSuccess = function(imageData) {
        console.log("On Success! ");
        $scope.picData = "data:image/jpeg;base64," +imageData;
        $scope.$apply();
    };
    var onFail = function(e) {
        console.log("On fail " + e);
    };
}


//-----------全局变量-----------
var g_codenum;
var g_userid;
var g_homenum;
var g_againstid;
var g_score;
var g_value = 0;
var g_gamename;
var g_gamenum;
var g_dicenum;
var g_baseurl='http://203.100.80.135:8080';


//-----------------------------

function sloganCtrl($scope,$location,$rootScope,$timeout,navSvc){
    $scope.value = 0;
    
    
    $scope.slidePage = function (path,type) {
        navSvc.slidePage(path,type);
    };

    function countdown() {
        $scope.value++;
        console.log("计时器" + $scope.value);
        $scope.timeout = $timeout(countdown, 2000);
        if($scope.value > 2){
            navSvc.slidePage('/login','modal');
            //$location.path("/login");
            $timeout.cancel($scope.timeout);
        }
        
    
    }
    countdown();
    
}

function LoginCtrl($scope,$location,$rootScope) {
    
    
    
    $scope.formData = {};
    $scope.uulogin = function(){
        
        //console.log("电话号码>>>>>>" + $scope.formData.tel);
        
        if(!$scope.formData.tel){
            
            $scope.message = "电话号码不能为空";
            console.log("电话号码是空的哟");
            
        }else{
            
            localStorage.usertel = "139000";
            console.log("电话号码>>>>"+  localStorage.usertel);
            //$scope.autologin();
            $location.path("/step1");
            
            
        }
        
        
    }
    
    $scope.autologin = function(){
        
         console.log("电话号码>>>>"+  localStorage.usertel);
        
        if(localStorage.usertel == "139000"){
            if (!$rootScope.items) {
                
                jx.load(g_baseurl+'/JujuDemo/servlet/sendnum?username=139',function(data){
                        console.log(JSON.stringify(data));
                        $rootScope.items = data.item3 ;
                        
                        g_codenum = $rootScope.items.result;
                        
                        console.log("------成功获取验证码------codenum-------" + g_codenum);
                        
                        $location.path("/step2");
                        
                        $scope.$apply();
                        },'json');
                
                
                
            } else {
                console.log('data already loaded');
            }
            

        
        }
        
        
    }
    
    
    $scope.autologin();
    
    
    
    
}


function RoomSetupCtrl($scope,$rootScope,$location){
    
    $scope.loadItem = function() {
        
        jx.load(g_baseurl+'/JujuDemo/servlet/Loginservlet?codenum=' + g_codenum ,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item4;
                
                g_userid = $rootScope.items.id;
                
                console.log("------用户编号-------" + g_userid);
                localStorage.j_username = g_userid;
                
                console.log("------成功登陆房间------用户编号-------" + localStorage.j_username);
                
                $scope.$apply();
                },'json');
    };

    $scope.loadItem();
    
    
    $scope.setupnewroom = function(){
    
        $location.path("/newroom");
    
    }
    
    $scope.setupjoinroom = function(){
        
        $location.path("/joinroom");
        
        
    }
}

function GetCodesCtrl($scope, $rootScope,$location) {
    
    if (!$rootScope.items) {
        
        jx.load(g_baseurl+'/JujuDemo/servlet/sendnum?username=139',function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item3 ;
                
                g_codenum = $rootScope.items.result;
                
                console.log("------成功获取验证码------codenum-------" + g_codenum);
                
                //$location.path("/step2");
                
                $scope.$apply();
                },'json');
        
        
        
    } else {
        console.log('data already loaded');
    }
    

    
   // load in data from hacker news unless we already have
    
    $scope.loadItem = function(item) {
        
        jx.load(g_baseurl+'/JujuDemo/servlet/Loginservlet?codenum=' + g_codenum ,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item4;
                
                g_userid = $rootScope.items.id;
                
                console.log("------用户编号-------" + g_userid);
                localStorage.j_username = g_userid;
                
                console.log("------成功登陆房间------用户编号-------" + localStorage.j_username);
                
                $scope.$apply();
                },'json');

        $location.path("/step2");
        
        
    };
}


function GetRoomNumCtrl($scope, $rootScope,$location) {
    
    $rootScope.items = null;
    // load in data from hacker news unless we already have
    if (!$rootScope.items) {
        
        jx.load(g_baseurl+'/JujuDemo/servlet/SendHomenum',function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item5;
                g_homenum = $rootScope.items.homenum;
                $scope.$apply();
                },'json');
    } else {
        console.log('data already loaded');
    }
    
    $scope.loadItem = function(item) {
        navigator.notification.alert(item.homenum,function() {console.log("Alert success")},"My Alert","Close");
        
        
    };
    
    // create a blank object to hold our form information
    // $scope will allow this to pass between controller and view
    
    $scope.formData = {};
  
    $scope.CreatRoom = function() {
        
        
        console.log("------homenum-------" + g_homenum);
        console.log("------userid-------" + g_userid);
        console.log("------nickname-------" + $scope.formData.name);
        
         localStorage.nickname = $scope.formData.name;
        
        if (!$scope.formData.name){
            
          
            $scope.message="请输入昵称";


        }else if($scope.formData.name.length > 10 ){
            
            $scope.message="打那么多字儿?你不累么";
        
        
        }else{
        
            var g_url = g_baseurl+'/JujuDemo/servlet/Createhome?id='+ g_userid +'&name='+ $scope.formData.name + '&homenum='+ g_homenum +'&userid=1';
            
            console.log(g_url);
            
            $rootScope.items = null;
            if (!$rootScope.items) {
                
                jx.load(g_url,function(data){
                        console.log(JSON.stringify(data));
                        $rootScope.items = data.cerateresult;
                        
                        $scope.$apply();
                        },'json');
                
                
                
            } else {
                
                $scope.errorName = '创建房间失败';
                console.log('创建房间失败');
                
            }
            
            $location.path("/step3");
    
        }

        };
    
}






function JoinRoomCtrl($scope, $rootScope,$location) {
    
    
    console.log("------UserID-------" + localStorage.j_username);
    
    g_userid = localStorage.j_username;
    
    var creatresult;
    
    
    
   
    $scope.formData = {};
    
    $scope.JoinRoom = function() {
        
    
        
        if(!$scope.formData.roomnum || !$scope.formData.nickname){
        
            $scope.message="请输入房间号和昵称";

        
        }else{
        
       localStorage.nickname = $scope.formData.nickname;
            
        var g_url = g_baseurl+'/JujuDemo/servlet/Createhome?id='+ g_userid +'&name='+ $scope.formData.nickname + '&homenum='+ $scope.formData.roomnum +'&userid=0';
     
            g_homenum =  $scope.formData.roomnum;
            
            console.log("---Json---"+ g_homenum);
            
            console.log("---Json---"+ g_url);
            
            $rootScope.items = null;
            if (!$rootScope.items) {
                
                jx.load(g_url,function(data){
                        console.log(JSON.stringify(data));
                        $rootScope.items = data.cerateresult;
                        creatresult = $rootScope.items;
                        if(creatresult == '1'){
                        console.log('加入房间成功');
                        
                        $location.path("/step3");
                        
                        }else if(creatresult == '0'){
                        
                        console.log('加入房间失败');
                        $scope.message="加入房间失败";
                        
                        }
                        
                        
                        $scope.$apply();
                        },'json');
                
                
            } else {
                
                console.log('加入房间失败');
            }
            
            
            
            
        }
        
       
        
    }

}


function GetGameNumCtrl($scope, $rootScope){
    
    console.log("------游戏编号------");
    
    

}

function GetUserListCtrl($scope, $rootScope) {
    
    
    console.log("------getuserlist------homenum"+ g_homenum);
    
    $scope.homenum = g_homenum;
    
    $rootScope.items = null;
   // load in data from hacker news unless we already have
    if (!$rootScope.items) {
        
        jx.load(g_baseurl+'/JujuDemo/servlet/SendUserinfo?homenumber='+ g_homenum,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item6;
                $scope.$apply();
                },'json');
        
    } else {
        console.log('加载失败');
    }
    
    $scope.loadItem = function(item) {
        
        console.log('用户名'+item.username);
        
        //navigator.notification.alert(item.url,function() {console.log("Alert success")},"My Alert","Close");
    };
}


function GetTeamList1Ctrl($scope, $rootScope,$location) {
    
    console.log('获取球队列表信息');
    console.log('---用户名---'+ g_userid);
    console.log('---房间号---'+ g_homenum);
    $rootScope.items = null;
    // load in data from hacker news unless we already have
    if (!$rootScope.items) {
        
        jx.load(g_baseurl+'/JujuDemo/servlet/Sendballgame?isbegin=1',function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item7;
                $scope.$apply();
                },'json');
        
    } else {
        console.log('获取比赛列表失败');
    }

    
    $scope.loadItem = function(item) {
       
        g_againstid = item.againstid;
        //console.log('获取球队得>>>againstid<<<<'+ g_againstid);
        $rootScope.items = null;
        
        $location.path("/cbsteamdetail");
        
    }
    
}






function GetTeamList2Ctrl($scope, $rootScope,$location) {
    
    console.log('获取球队列表信息');
    console.log('---用户名---'+ g_userid);
    console.log('---房间号---'+ g_homenum);
    $rootScope.items = null;
    // load in data from hacker news unless we already have
    if (!$rootScope.items) {
        
        jx.load(g_baseurl+'/JujuDemo/servlet/Sendballgame?isbegin=0',function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item7;
                $scope.$apply();
                },'json');
        
    } else {
        console.log('data already loaded');
    }
    
    
    $scope.loadItem = function(item) {
        
        console.log('球队详细信息');
        
        
    };
    
}


function LoginRoomCtrl($scope,$rootScope,$location){

    $scope.message = g_homenum;
    console.log("roomnum" + g_homenum);
    
    $scope.exhome = function(){
    
     console.log('---用户名---'+ g_userid);
     var exhome = g_baseurl+'/JujuDemo/servlet/Exithome?id='+g_userid;
     console.log(exhome);
        $rootScope.items = null;
        // load in data from hacker news unless we already have
        if (!$rootScope.items) {
            
            jx.load(exhome,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.items;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }

        $location.path("/step2");
    }

    
    
    
    
}


function AnonymousChatCtrl($scope, $rootScope,$location){

    $scope.message ="";
    localStorage.g_homenum = g_homenum;
    console.log("匿名白板房间号" + localStorage.g_homenum);
    localStorage.tmpurl = g_baseurl+'/JujuDemo/servlet/SendMessage?homenum='+ localStorage.g_homenum;
    console.log(localStorage.tmpurl);
    
    
    $scope.gotochat = function(){
    
        $location.path("/mainchat");
    
    }
    
    /*
    $rootScope.items=null;
    if (!$rootScope.items) {
        jx.load(g_baseurl+'/JujuDemo/servlet/SendMessage?homenum='+g_homenum,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item8;
                $scope.$apply();
                },'json');
        
    } else {
        console.log('data already loaded');
    }
    
    
    $scope.loadItem = function(item) {
        
        $location.path("/mainchat");
        
    };
     */
}


function SendAnonymousMessageCtrl($scope, $rootScope,$location){
    
     $scope.message ="局:"+ g_homenum;
    
    $scope.formData = {};
    
    $scope.sendmessage=function(){
        
        if(!$scope.formData.s_message ){
        
        $scope.message ="匿名消息不能为空";
        
        }else if($scope.formData.s_message.length > 10){
        
             $scope.message ="能少打点字么";
        
        }else{
        
       var smmurl = g_baseurl+'/JujuDemo/servlet/GetMessage?homenum='+g_homenum+'&id='+g_userid+'&message='+$scope.formData.s_message+'&flag=0';
            
        console.log("------sending----message-------" + smmurl);
        
        }
        
        $rootScope.items=null;
        if (!$rootScope.items) {
            
            jx.load(smmurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item9;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
     
     $location.path("/step3");
        
    }

}

function AnonymousChatCtrl2($scope, $rootScope){
    
    console.log(localStorage.tmpurl);
    
    $rootScope.items=null;
    if (!$rootScope.items) {
        jx.load(localStorage.tmpurl,function(data)
            
              {
                console.log(JSON.stringify(data));
                $rootScope.items = data.item8;
                $scope.$apply();
                },'json');
        
    } else {
        console.log('data already loaded');
    }
    
    


}

function GetGuessScore($scope,$rootScope){
    
   
   console.log('获取房间号>>>g_homenum<<<<'+ g_homenum);
   console.log('获取用户ID>>>g_userid<<<<'+ g_userid);
    
   var sburl = g_baseurl+'/JujuDemo/servlet/Getballgameuser?userid='+g_userid+'&homenum='+g_homenum;
    console.log('>>>>发送当前用户信息给服务器获取初始积分<<<<'+ sburl);
    
    $rootScope.itemf=null;
    if (!$rootScope.itemf) {
        
        jx.load(sburl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.itemf = data.cerateresult;
                $scope.$apply();
                },'json');
        
    } else {
        console.log('data already loaded');
    }
  
    
    
    var gsurl=g_baseurl+'/JujuDemo/servlet/Sendballgameuser?userid='+g_userid+'&homenum='+g_homenum;
    console.log('>>>>获取积分从服务器<<<<'+ gsurl);
    
    $rootScope.itemsf=null;
    
    if (!$rootScope.itemsf) {
        
        jx.load(gsurl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.itemsf = data.item10;
                
                $scope.$apply();
                },'json');
        
    } else {
        console.log('data already loaded');
    }
    
    
    $scope.loadItem = function(item) {
            
        //navigator.notification.alert(item.freecore,function() {console.log("可用积分" + item.freecore)},"可用积分","确定");
        
        
    };

    
    }


function GetBallAgainstinfo($scope,$rootScope,$location){
    
    
    
        
        var agurl = g_baseurl+'/JujuDemo/servlet/BallAgainst?againstid='+g_againstid;
        
        console.log(agurl);
        
        $rootScope.items=null;
        if (!$rootScope.items) {
            
            jx.load(agurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item9;
                    
    localStorage.homewinm = $rootScope.items[0].hometeam + "胜赔率"+$rootScope.items[0].homewin;
    console.log(">>>>><<<<<" + localStorage.homewinm);
     
    localStorage.flatm = "双方打平赔率"+$rootScope.items[0].flat;
    console.log(">>>>><<<<<" + localStorage.flatm);
    
    localStorage.visitingwinm = $rootScope.items[0].visitingteam +"胜赔率"+$rootScope.items[0].visitingwin;
    console.log(">>>>><<<<<" + localStorage.visitingwinm);
     $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
    
      }
    

function SendcbsinfoCtrl($scope,$rootScope,$location){

    $scope.message1= localStorage.homewinm;
    $scope.message2= localStorage.flatm;
    $scope.message3= localStorage.visitingwinm;

    $scope.formData = {};
    
    $scope.sendscore = function(){
        
        
        if($scope.formData.guesscore>500 || $scope.formData.guesscore1>500 ||$scope.formData.guesscore2 >500){
            
            navigator.notification.alert("您的可用积分不够",function() {console.log("Alert success")},"好好猜比赛","确定");
            
        }
        
        if(!$scope.formData.guesscore && !$scope.formData.guesscore1 &&!$scope.formData.guesscore2){
            
            navigator.notification.alert("您不下注怎么猜",function() {console.log("Alert success")},"好好猜比赛","确定");
            
        }
        
        
        if(!$scope.formData.guesscore){
            
            //navigator.notification.alert("提示",function() {console.log("Alert success")},"能好好猜比赛么","确定");
            
        }else{
            
            var ggurl=g_baseurl+'/JujuDemo/servlet/Getballgamecore?userid='+g_userid+'&againstid='+g_againstid+'&homewincore='+ $scope.formData.guesscore +'&homenum='+g_homenum;
            
            //navigator.notification.alert("提示",function() {console.log("Alert success")},ggurl,"确定");
            console.log(ggurl);
            
            $rootScope.items = null;
            if (!$rootScope.items) {
                
                jx.load(ggurl,function(data){
                        console.log(JSON.stringify(data));
                        $rootScope.items = data.cerateresult;
                        
                        },'json');
                
                
                
            } else {
                console.log('data already loaded');
            }
            
            
            
            
            $location.path("/cbs2");
            
        }
        
        if(!$scope.formData.guesscore1){
            
            //navigator.notification.alert("提示",function() {console.log("Alert success")},"能好好猜比赛么","确定");
            
        }else{
            
            var ggurl=g_baseurl+'/JujuDemo/servlet/Getballgamecore?userid='+g_userid+'&againstid='+g_againstid+'&flatcore='+ $scope.formData.guesscore1 +'&homenum='+g_homenum;
            
            //navigator.notification.alert("提示",function() {console.log("Alert success")},ggurl,"确定");
            console.log(ggurl);
            
            $rootScope.items=null;
            if (!$rootScope.items) {
                
                jx.load(ggurl,function(data){
                        console.log(JSON.stringify(data));
                        $rootScope.items = data.cerateresult;
                        
                        },'json');
                
                
            } else {
                console.log('data already loaded');
            }
            
            
            $location.path("/cbs2");
            
         
            
        }
        
        
        if(!$scope.formData.guesscore2){
            
            //navigator.notification.alert("提示",function() {console.log("Alert success")},"能好好猜比赛么","确定");
            
        }else{
            
            var ggurl=g_baseurl+'/JujuDemo/servlet/Getballgamecore?userid='+g_userid+'&againstid='+g_againstid+'&visitingwincore='+ $scope.formData.guesscore2 +'&homenum='+g_homenum;
            
            //navigator.notification.alert("提示",function() {console.log("Alert success")},ggurl,"确定");
            console.log(ggurl);
            
            $rootScope.items=null;
            if (!$rootScope.items) {
                
                jx.load(ggurl,function(data){
                        console.log(JSON.stringify(data));
                        $rootScope.items = data.cerateresult;
                        
                        },'json');
                
                
                
            } else {
                console.log('data already loaded');
            }
            
    
            $location.path("/cbs2");
        }
        
        
        
        
        
    }
    


}


function Sendballgamecore($scope,$rootScope){
    
    console.log('获取房间号>>>g_homenum<<<<'+ g_homenum);
    console.log('获取用户ID>>>g_userid<<<<'+ g_userid);
    
    var gusurl=g_baseurl+'/JujuDemo/servlet/Sendballgamecore?userid='+g_userid+'&homenum='+g_homenum;
    
    console.log(gusurl);
    
    $rootScope.items=null;
    
    if (!$rootScope.items) {
        
        jx.load(gusurl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item11;
                $scope.$apply();
                },'json');
        
    } else {
        console.log('data already loaded');
    }
   
}

function Exithome($scope,$rootScope,$location){

    
  var exurl =g_baseurl+'/JujuDemo/servlet/Exithome?id='+g_userid;
  //console.log('>>>>>>>>>>>>>>>' + exurl);
  
    $scope.exhome=function(){
  
    $rootScope.items = null;
    
    if (!$rootScope.items) {
        
        jx.load(exurl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.cerateresult;
                $scope.$apply();
                },'json');
        
    } else {
        console.log('data already loaded');
    }
    
        navigator.notification.alert("",function() {console.log("您已经退出房间")},"退出房间","确定");
        
        $location.path("/step2");

        
    }



}

function getdmxCtrl($scope,$rootScope,$location){
  $scope.alertdmxNotify = function() {
        
        $rootScope.itemsmx = null;
        
        if (!$rootScope.itemsmx) {
            
            jx.load(g_baseurl+'/JujuDemo/servlet/Singleadventure',function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.itemsmx = data.item13;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        $location.path("/dmxview2");
        
    };
}

function createNewGameCtrl($scope,$rootScope,$location){

    
        $rootScope.items = null;
    
        if (!$rootScope.items) {
            
            jx.load(g_baseurl+'/JujuDemo/servlet/SendHomenum',function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item5;
                    
                    localStorage.g_gamenum = $rootScope.items.homenum;
                    
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }
        
        
        //console.log('>>>>>>>>>>获取游戏编号即桌号>>>>>>>>>>'+ localStorage.g_gamenum);
    
    
    
    
    $scope.creatNewGame = function() {
        
        //$scope.getNewGameNum();
       
        /*
         var g_codenum;
         var g_userid;
         var g_homenum;
         var g_againstid;
         var g_score;
         var g_gamename;
         var g_gamenum;
         
         */
        console.log("用户名" + localStorage.j_username);
        console.log("房间编号"+ g_homenum);
        console.log("游戏名" + g_gamename);
        console.log("游戏编号"+ localStorage.g_gamenum);
       
        
        var cngurl=g_baseurl+'/JujuDemo/servlet/GameUserinfo?id='+localStorage.j_username+'&gameuserid=1&gamehomenum='+localStorage.g_gamenum+'&gamename='+g_gamename+'&homenum='+g_homenum+'&isgameover=0';
        
        //console.log(cngurl);
        $rootScope.itemscn = null;
        if(!$rootScope.itemscn) {
            jx.load(cngurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.itemscn = data.cerateresult;
                    //console.log("------创建成功------"+ $rootScope.itemscn);
                    //if($rootScope.itemscn=1){}
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
    
    
        $location.path("/nophoneview");
        
        if(g_gamename == 'jgch'){
        
        $location.path("/jgchview");
        
        }else if(g_gamename == 'dice'){
        
         $location.path("/diceview");
        
        }else if(g_gamename == 'whoiswo'){
        
              $location.path("/whoiswo");
        
        }else if(g_gamename == 'mora'){
        
            $location.path("/moraview");
            
        }else if(g_gamename == 'kill'){
            
            $location.path("/killer");
        
        }else if(g_gamename == 'know'){
          
             $location.path("/know");
        }
        
    }




}

function ingGameListCtrl($scope,$rootScope,$location){
    
    console.log(">>>>>>房间号" + g_homenum + ">>>>>>>游戏名称" + g_gamename);
    var getinggurl= g_baseurl +'/JujuDemo/servlet/Gameinfolist?gamename='+ g_gamename +'&homenum=' + g_homenum;
        
        console.log("获取进行中的游戏列表"+ getinggurl);
        $rootScope.items = null;
        if (!$rootScope.items) {
            
            jx.load(getinggurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item15;
                    
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }

        $scope.joinGame = function(item) {
            
            
            
        console.log("用户名" + localStorage.j_username);
        console.log("游戏名"+ g_gamename);
        console.log("游戏编号"+ item.tablenum);
            if(!item.tablenum){
            
                
            
            }else{
        
        localStorage.g_gamenum = item.tablenum;
        var cngurl=g_baseurl+'/JujuDemo/servlet/GameUserinfo?id='+localStorage.j_username +'&gameuserid=0&gamehomenum='+ item.tablenum +'&gamename='+g_gamename+'&homenum='+g_homenum+'&isgameover=0';
        
        console.log(cngurl);

        $rootScope.itemscn = null;
        if(!$rootScope.itemscn) {
            
            jx.load(cngurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.itemscn = data.cerateresult;
                    
                    console.log("------加入成功------"+ $rootScope.itemscn);
                    
                    
                    
                    if($rootScope.itemscn=1){
                    
                    if(g_gamename=='nophone'){
                    
                    $location.path("/nophoneview2");
                    }
                    
                    if(g_gamename=='jgch'){
                    
                       $location.path("/jgchview2");
                     }
                    if(g_gamename=='dice'){
                    
                      $location.path("/diceviewwaiting");
                    
                    }
                    if(g_gamename=='whoiswo'){
                    
                     $location.path("/whoiswowo");

                    }
                    if(g_gamename=='kill'){
                    
                     $location.path("/jkiller");
                    
                    }
                    
                    if(g_gamename=='mora'){
                    
                    $location.path("/moraview");
                    
                    }
                    if(g_gamename=='know'){
                    
                    $location.path("/knowj");
                    
                    }

                    
                    
                    }
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
            }
    }
    
}
//nophone游戏排名列表,用户上传数据排名

function nophonestep3Ctrl($scope,$rootScope,$location){
    
var npscorelisturl = g_baseurl +'/JujuDemo/servlet/Sendnophonecover?gamehomenum='+ localStorage.g_gamenum;
    
    console.log("排名" + npscorelisturl);
    $rootScope.items = null;
    if (!$rootScope.items) {
        
        jx.load(npscorelisturl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item16;
                $scope.$apply();
                },'json');
     } else {
        console.log('data already loaded');
     }
     
    var exurl= g_baseurl +'/JujuDemo/servlet/Exitgamehome?id='+g_userid+'&gamehomenum='+ localStorage.g_gamenum;
    $scope.exitnophone = function() {
        $rootScope.items=null;
        // load in data from hacker news unless we already have
        if (!$rootScope.items) {
            jx.load(exurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.exitresult;
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
    }
    
    


}


//游戏发起者点开始游戏进入的第一个场景自动计时器启动
function nophonestep2Ctrl($scope,$timeout,$rootScope,$location){

    localStorage.g_userid = g_userid;
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ localStorage.g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    var starturl= g_baseurl +'/JujuDemo/servlet/Getnophoneflag?gamehomenum='+localStorage.g_gamenum +'&nophoneflag=1';
    
    console.log("--开始自动上传游戏开始数据-->>" + starturl);
    
    $rootScope.items = null;
    // load in data from hacker news unless we already have
    
    if (!$rootScope.items) {
        
        jx.load(starturl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.sum;
                //$scope.$apply();
                },'json');
    } else {
        console.log('data already loaded');
    }
   console.log("------NOPHONE游戏开始后第一步骤------" + starturl);
    
/*
   $scope.value = 0;
   
    function countdown() {
        $scope.value++;
        $scope.timeout = $timeout(countdown, 1000);
    }

    countdown();
    
    var stopurl= g_baseurl +'/JujuDemo/servlet/Getnophonecover?id='+g_userid+'&gamehomenum='+localStorage.g_gamenum+'&nophonecover=';
    
    $scope.stopgo = function(){
        
        console.log("游戏参与者和发起者停止游戏步骤");
        $timeout.cancel($scope.timeout);
        console.log("您用了[" + $scope.value + "]秒");
        
        stopurl +=  $scope.value;
        
        console.log("--用户点击停止按钮上传游戏数据-->>" + stopurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(stopurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    //$scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }
        
         $location.path("/nophone_is2");
        
 
    }
    
*/

}

//游戏发起者开始游戏第一步骤等待其他加入者准备开始
function nophonestep1Ctrl($scope,$timeout,$rootScope,$location){
    
    localStorage.g_userid = g_userid;
    
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ localStorage.g_userid);
    
    
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    var starturl= g_baseurl +'/JujuDemo/servlet/Getnophoneflag?gamehomenum='+localStorage.g_gamenum +'&nophoneflag=1';
    
    $scope.message='用户游戏编号'+ localStorage.g_gamenum;
    
    $scope.startgo = function(){
        
        $location.path("/nophone_is1");
    }
    
    
    var onurl = g_baseurl +'/JujuDemo/servlet/Personnum?gamehomenum='+localStorage.g_gamenum;
    
    $scope.onlinenum = function(){
        
        console.log("--获取在线用户人数方法-->>" + onurl);
        $rootScope.items = null;
        // load in data from hacker news unless we already have
        
        if (!$rootScope.items) {
            
            jx.load(onurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.personsum;
                    $scope.message = '当前游戏人数'+ data.personsum;
                    
                    },'json');
        } else {
            console.log('data already loaded');
        }
        
    }


}

function nophoneGameCtrl($scope,$timeout,$rootScope,$location){
    
    
    localStorage.g_userid = g_userid;
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ localStorage.g_userid );
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    var exurl= g_baseurl +'/JujuDemo/servlet/Exitgamehome?id='+g_userid+'&gamehomenum='+ localStorage.g_gamenum;
    
    console.log("--退出房间调用的方法-->>" + exurl);
    
    $scope.exitnophone = function() {
        
        $rootScope.items=null;
        // load in data from hacker news unless we already have
        if (!$rootScope.items) {
            
            jx.load(exurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.exitresult;
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
    }
    
    
    /*
    var onurl = g_baseurl +'/JujuDemo/servlet/Personnum?gamehomenum='+localStorage.g_gamenum;
    
    console.log("--获取在线用户人数方法-->>" + onurl);
    
    var starturl= g_baseurl +'/JujuDemo/servlet/Getnophoneflag?gamehomenum='+localStorage.g_gamenum +'&nophoneflag=1';
    
    
    console.log("--桌主nophone开始按钮上传数据-->>" + starturl);
    
    
    
    var npscorelisturl = g_baseurl +'/JujuDemo/servlet/Sendnophonecover?gamehomenum='+ localStorage.g_gamenum +'&sum=';
    
    
    
   
    $scope.value = 0;
    
    var stopurl= g_baseurl +'/JujuDemo/servlet/Getnophonecover?id='+g_userid+'&gamehomenum='+localStorage.g_gamenum+'&nophonecover=';
    
    
    function countdown() {
        $scope.value++;
        $scope.timeout = $timeout(countdown, 1000);
    }
    
    $scope.startgo = function(){
    
        console.log("start");
        countdown();
        
        $rootScope.items = null;
        // load in data from hacker news unless we already have
        
        if (!$rootScope.items) {
            
            jx.load(starturl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.sum;
                    
                    npscorelisturl += data.sum;
                    
                    console.log("排名" + npscorelisturl);
                    
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }
     
        $location.path("/nophone_is1");
        
     }
    
    var stopurl= g_baseurl +'/JujuDemo/servlet/Getnophonecover?id='+g_userid+'&gamehomenum='+localStorage.g_gamenum+'&nophonecover=';
    
    $scope.stopgo=function(){
        
        console.log("参与者stop");
        $timeout.cancel($scope.timeout);
        console.log("您用了[" + $scope.value + "]秒");
        stopurl +=  $scope.value;
        console.log("--桌主nophone停止按钮上传数据-->>" + stopurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            
            jx.load(stopurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }

        
        

    }
    
    $scope.npscorelist = function(){
       
        console.log("最终排名");
        
        console.log("排名" + npscorelisturl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            
            jx.load(npscorelisturl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item16;
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }

        
    
    }
    
    $scope.onlinenum = function(){
        
        $rootScope.items = null;
        // load in data from hacker news unless we already have
        
        if (!$rootScope.items) {
            
            jx.load(onurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.personsum;
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }

    }
    */
    
   
   /*
    $scope.test = function() {
        setInterval(function(){console.log('haha')},1000); }
    
    $scope.test(); 
    
    
    //var p = $timeout(function(){console.log('haha')},5000);
    
    //p.then(function(){console.log('x')});
    
    //$timeout.cancel(p);
    
    $scope.test = function() {
    setTimeout(function () {
    $scope.$apply(function () {
    $scope.user = "good";
    });
    }, 2000);
    }
    */
    
    
    
}

function autoGoCtrl($scope,$timeout,$location){
    
    console.log('获取球队得>>>againstid<<<<'+ g_againstid);
    console.log('获取房间号>>>g_homenum<<<<'+ g_homenum);
    console.log('获取用户ID>>>g_userid<<<<'+ g_userid);
    
    $scope.test = function() {
        
      
        
     setInterval(function(){
                 
             
                 
                 console.log('haha')},2000);
                    	//$location.path("/cbsteamdetail");
    }
    
    $scope.test();

    //location.path("/cbsteamdetail");
    }



function SearchTeamCtrl($scope, $rootScope,$location) {
    
    console.log('获取球队列表信息');
    console.log('---用户名---'+ g_userid);
    console.log('---房间号---'+ g_homenum);
    $scope.formData = {};
    
    $scope.search = function(){
        
           console.log(">>"+ $scope.formData.teamname);
          $rootScope.items= null;
        if (!$rootScope.items) {
           
            var ssurl = g_baseurl+'/JujuDemo/servlet/Serchballgame?teamname='+$scope.formData.teamname+'&isbegin=1';
            
            console.log(ssurl);
            
        jx.load(ssurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item7;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('获取比赛列表失败');
        }
    }
    
    $scope.loadItem = function(item) {
        g_againstid = item.againstid;
        //console.log('获取球队得>>>againstid<<<<'+ g_againstid);
        $rootScope.items = null;
        
        $location.path("/cbsteamdetail");

    };

    
    
}


function nophonestep1GameCtrl2($scope,$timeout,$rootScope,$location){
    
    var waiturl = g_baseurl +'/JujuDemo/servlet/Startnophone?gamehomenum='+localStorage.g_gamenum;
    
    console.log("等待开始状态URL" + waiturl);
    
    function countdown() {
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(waiturl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.nophoneflag;
                    
                    var ccc = data.nophoneflag;
                    
                    if( ccc =='1'){
                    
                    $timeout.cancel($scope.timeout);
                    
                    $location.path("/nophone_is1");
                    
                    }
                    
                    
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }
        
        
        
        $scope.timeout = $timeout(countdown, 1000);
        
    }
    
    $scope.waiting = function() {
        //setInterval(function(){console.log('haha')},1000);
        countdown();
        
    }
    
    $scope.waiting();
    
    $scope.exitnophone = function() {
        
        $timeout.cancel($scope.timeout);
        var exurl= g_baseurl +'/JujuDemo/servlet/Exitgamehome?id='+g_userid+'&gamehomenum='+ localStorage.g_gamenum;
         $rootScope.items=null;
        // load in data from hacker news unless we already have
        if (!$rootScope.items) {
            
            jx.load(exurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.exitresult;
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
    }


}


/*----------nophone游戏参与者--------------------------------
function nophoneGameCtrl2($scope,$timeout,$rootScope,$location){
    
    
    var exurl= g_baseurl +'/JujuDemo/servlet/Exitgamehome?id='+g_userid+'&gamehomenum='+ localStorage.g_gamenum;
    
    var waiturl = g_baseurl +'/JujuDemo/servlet/Startnophone?gamehomenum='+localStorage.g_gamenum;
    
    console.log("等待开始状态URL" + waiturl);
    
    $scope.value = 1;
    
    function countdown2() {
        $scope.value++;
        $scope.timeout = $timeout(countdown2, 1000);
    }
    
    function countdown() {
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(waiturl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.nophoneflag;
                    
                    var ccc = data.nophoneflag;
                    
                    if( ccc =='1'){
                    
                      $timeout.cancel($scope.timeout);
                      countdown2();
                    }
                   
                    
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }

       
        
        $scope.timeout = $timeout(countdown, 1000);
    
    }

    $scope.waiting = function() {
        //setInterval(function(){console.log('haha')},1000);
        countdown();
        
    }
    
    $scope.waiting();
    
    var stopurl= g_baseurl +'/JujuDemo/servlet/Getnophonecover?id='+g_userid+'&gamehomenum='+localStorage.g_gamenum+'&nophonecover=';
    
    $scope.stopgo = function(){
        
        console.log("stop");
        $timeout.cancel($scope.timeout);
        console.log("您用了[" + $scope.value + "]秒");
        stopurl +=  $scope.value;
        console.log("--参与者nophone停止按钮上传数据-->>" + stopurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            
            jx.load(stopurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }
        
        
        
        
    }
    
     var npscorelisturl = g_baseurl +'/JujuDemo/servlet/Sendnophonecover?gamehomenum='+ localStorage.g_gamenum;
    
    $scope.npscorelist = function(){
        
        console.log("最终排名");
        
        console.log("排名" + npscorelisturl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            
            jx.load(npscorelisturl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item16;
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }
        
        
        
    }


    $scope.exitnophone = function() {
        
        $rootScope.items=null;
        // load in data from hacker news unless we already have
        if (!$rootScope.items) {
            
            jx.load(exurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.exitresult;
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
    }
    
  


}
*/
//------游戏建立者准备开始击鼓传花游戏------
function jgchstep1GameCtrl1($scope,$timeout,$rootScope,$location){
    
    console.log(">>>>>>击鼓传花游戏准备开始<<<<<<");
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);

    var jgchurl = g_baseurl + '/JujuDemo/servlet/Senddrumflowerinfo?gamehomenum='+localStorage.g_gamenum+'&istimeover=1&gameuserid=1&id='+g_userid;
    
    $scope.exitgamehome= function(){
        
        var exgameurl = g_baseurl + "/JujuDemo/servlet/Exitgamehome?gamehomenum="+ localStorage.g_gamenum + "&id="+ g_userid;
        console.log(exgameurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(exgameurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
        
    }
    
    

    
    $scope.startgo = function(){
    
    console.log(">>>>>>游戏建立者击鼓传花游戏步骤1<<<<<<");
    console.log(jgchurl);
        
        $rootScope.items=null;
        // load in data from hacker news unless we already have
        if (!$rootScope.items) {
            
            jx.load(jgchurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.exitresult;
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
    
         $location.path("/jgchview2");
    
    }
}


//------游戏参与者等待开始击鼓传花游戏------
function jgchstep1GameCtrl2($scope,$timeout,$rootScope,$location){
    
    console.log(">>>>>>参与者击鼓传花游戏准备开始<<<<<<");
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    var jgchurl = g_baseurl + '/JujuDemo/servlet/Senddrumflowerinfo?gamehomenum='+localStorage.g_gamenum+'&istimeover=2&gameuserid=1&id='+g_userid;
    
    console.log(jgchurl);
    $scope.isplay;
    
    var g_timer;
    
    $scope.waiting =function(){
        
     g_timer = setInterval(function(){$scope.Getgameinfo();},1000);
        
    }
    
    $scope.Getgameinfo = function(){
        
    $rootScope.items=null;
        
        if (!$rootScope.items) {
            jx.load(jgchurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.isplay = data.randomid;
       
        console.log("游戏状态>>>1开始>>>0未开始>>>>"+ $scope.isplay);
                    
                    if($scope.isplay == g_userid){
                    
                     //console.log('PPPPPP' + $scope.isplay);
                   
                     clearInterval(g_timer);
                    
                     $location.path("/jgchview3");
                    
                    }
                   
        
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
   }
    
     $scope.waiting();
    
    $scope.exitgamehome= function(){
        
        var exgameurl = g_baseurl + "/JujuDemo/servlet/Exitgamehome?gamehomenum="+ localStorage.g_gamenum + "&id="+ g_userid;
        console.log(exgameurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(exgameurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
        
    }
    

}

function jgchstep2GameCtrl($scope,$timeout,$rootScope,$location){
    
    console.log(">>>>>>参与者击鼓传花传起来<<<<<<");
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    var jgchurl = g_baseurl + '/JujuDemo/servlet/Senddrumflowerinfo?gamehomenum='+localStorage.g_gamenum+'&istimeover=3&gameuserid=1&id='+g_userid;
     console.log(jgchurl);
    
    
    $scope.stopvalue = Math.floor(Math.random()*10);
    console.log('<<<<<<随机数字>>>>>>'+ $scope.stopvalue);
    
    $scope.gogogo = function(){
        
        
        if($scope.stopvalue == 2){
        
        // navigator.notification.alert("Alert",function() {console.log("Alert success")},"you got it","Close");
            
          $location.path("/jgchview4");
        
        }else{
        
        $rootScope.items=null;
        if (!$rootScope.items) {
            jx.load(jgchurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.randomid;
                    $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
    
        $location.path("/jgchview2");
            
        }
     }
    
    $scope.exitgamehome= function(){
        
        var exgameurl = g_baseurl + "/JujuDemo/servlet/Exitgamehome?gamehomenum="+ localStorage.g_gamenum + "&id="+ g_userid;
        console.log(exgameurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(exgameurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
        
    }
    
}


function jgchstep3GameCtrl($scope,$rootScope,$location){

   console.log('你赢了');
    
    $scope.exitgamehome= function(){
        
        var exgameurl = g_baseurl + "/JujuDemo/servlet/Exitgamehome?gamehomenum="+ localStorage.g_gamenum + "&id="+ g_userid;
        console.log(exgameurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(exgameurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
        
    }


}

//------摇骰子游戏创建者初始化游戏设置步骤1------

function diceGamesetupCtrl($scope,$rootScope,$location){
    
         console.log('摇骰子游戏开始');

}


function diceGamesetupbdxCtrl($scope,$rootScope,$location){
    
    console.log('比大小摇骰子游戏开始');
    
    $scope.dice1='img/dice/dice1.png';
    $scope.dice2='img/dice/dice2.png';
    $scope.dice3='img/dice/dice3.png';
    $scope.dice4='img/dice/dice4.png';
    $scope.dice5='img/dice/dice5.png';
    $scope.dice6='img/dice/dice6.png';
    
    
    $scope.dicenum1 = function(){
        
        g_dicenum = 1;
        console.log('比大小摇骰子数量>>'+g_dicenum+'<<');
        
        $location.path('/dice1viewbdx');
    }
    
   
    $scope.dicenum2 = function(){
        
        g_dicenum = 2;
        
        console.log('比大小摇骰子数量>>'+g_dicenum+'<<');
        
        $location.path('/dice2viewbdx');
    }
    
   
    $scope.dicenum3 = function(){
        
        g_dicenum = 3;
        
        console.log('比大小摇骰子数量>>'+g_dicenum+'<<');
        
        $location.path('/dice3viewbdx');
    }
    
   
    $scope.dicenum4 = function(){
        
        g_dicenum = 4;
        console.log('比大小摇骰子数量>>'+g_dicenum+'<<');
        $location.path('/dice4viewbdx');
    }
    
   
    $scope.dicenum5 = function(){
        
        g_dicenum = 5;
        
        console.log('比大小摇骰子数量>>'+g_dicenum+'<<');
        
        $location.path('/dice5viewbdx');
    }
    
   
    $scope.dicenum6 = function(){
        
        g_dicenum = 6;
        console.log('比大小摇骰子数量>>'+g_dicenum+'<<');
        $location.path('/dice6viewbdx');
    }
    
   
    
   
    
}


//------摇骰子游戏创建者初始化游戏设置步骤2------

function diceGamesetup2Ctrl($scope,$rootScope,$location){
    
    console.log('吹牛查看人数');
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    $scope.onlinep = function(){
    
    var diceurl = g_baseurl + '/JujuDemo/servlet/Personnum?gamehomenum='+localStorage.g_gamenum;
    
    console.log('吹牛查看人数URL>>>>>>' + diceurl);
    
    $rootScope.items=null;
    if (!$rootScope.items) {
        jx.load(diceurl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item17;
                $scope.$apply();
                
                },'json');
        
    } else {
        console.log('data already loaded');
    }
    
    }
    

    
    $scope.onlinep();
    $scope.onlinep();
    $scope.onlinep();
    
    
   
    
    $scope.gogoplay = function(){
        
        console.log('------开始------');
        
        navigator.notification.vibrate(1000);
        navigator.notification.vibrate(2000);
        navigator.notification.vibrate(3000);
        
       
    
        $location.path('/diceviewc2');
    
    }
    
    var watchID = null;
    // Start watching the acceleration
    //
    function startWatch() {
    
        // Update acceleration every 3 seconds
        var options = { frequency: 250 };
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    
    }
    
    function stopWatch() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }
    
    var count=0;
    var shake_time=1;
    var lastTime;
    function onSuccess(acceleration) {
        
        //var element = document.getElementById('accelerometer');
        if(Math.abs(acceleration.x)>13 || Math.abs(acceleration.y)>13  ||Math.abs(acceleration.z)>13){
            if(!lastTime){lastTime = new Date().getTime();};
            nowTime = new Date().getTime();
            if(nowTime-lastTime>1000){
                shake_time++;
                $scope.gogoplay();
            
            }
            
            lastTime=nowTime;
            count++;
            $scope.gogoplay();
            
        }
    }
    
    // onError: Failed to get the acceleration
    //
    function onError() {
        alert('onError!');
    }
    
    startWatch();

}

//摇骰子比大小游戏 6个骰子数目

function diceGamedice6Ctrl($scope,$rootScope,$location){
    
    
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    $scope.value1 = Math.floor(Math.random()*6+1);
    $scope.dice1 = 'partials/' + $scope.value1 + '.PNG';
    
    $scope.value2 = Math.floor(Math.random()*6+1);
    $scope.dice2 = 'partials/' + $scope.value2 + '.PNG';
    
    $scope.value3 = Math.floor(Math.random()*6+1);
    $scope.dice3 = 'partials/' + $scope.value3 + '.PNG';
    
    $scope.value4 = Math.floor(Math.random()*6+1);
    $scope.dice4 = 'partials/' + $scope.value4 + '.PNG';
    
    $scope.value5 = Math.floor(Math.random()*6+1);
    $scope.dice5 = 'partials/' + $scope.value5 + '.PNG';
    
    $scope.value6 = Math.floor(Math.random()*6+1);
    $scope.dice6 = 'partials/' + $scope.value6 + '.PNG';
    
    //比大小游戏
    var cuurl = g_baseurl + '/JujuDemo/servlet/GetbosonsNum?gamehomenum='+localStorage.g_gamenum +'&bosonsnum='+ g_dicenum + '&flag=1';
    
    console.log('设置骰子数量' + cuurl);
    
    
    $rootScope.items=null;
    if (!$rootScope.items) {
        jx.load(cuurl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.bosonsnumflag;
                
                $scope.$apply();
                
                },'json');
        
    } else {
        console.log('data already loaded');
    }
    
    
    
    var sdurl= g_baseurl + '/JujuDemo/servlet/GetbosonsCover?gamehomenum='+localStorage.g_gamenum + '&bosonscover='+ $scope.value1 +','+ $scope.value2+','+ $scope.value3 +','+ $scope.value4 +','+ $scope.value5 +','+ $scope.value6 +'&userid='+ g_userid;
    
    console.log('发送随机骰子数目' + sdurl);
    
    $scope.senddicenum = function(){
        
        
        
        $rootScope.items=null;
        if (!$rootScope.items) {
            jx.load(sdurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.bosonscoverflag;
                    
                    $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        $location.path("/dice6viewcbdxresult");
        
    }
    


}
function diceGamedice5Ctrl($scope,$rootScope,$location){
    
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    $scope.value1 = Math.floor(Math.random()*6+1);
    $scope.dice1 = 'partials/' + $scope.value1 + '.PNG';
    
    $scope.value2 = Math.floor(Math.random()*6+1);
    $scope.dice2 = 'partials/' + $scope.value2 + '.PNG';
    
    $scope.value3 = Math.floor(Math.random()*6+1);
    $scope.dice3 = 'partials/' + $scope.value3 + '.PNG';
    
    $scope.value4 = Math.floor(Math.random()*6+1);
    $scope.dice4 = 'partials/' + $scope.value4 + '.PNG';
    
    $scope.value5 = Math.floor(Math.random()*6+1);
    $scope.dice5 = 'partials/' + $scope.value5 + '.PNG';
    
    //比大小游戏
    var cuurl = g_baseurl + '/JujuDemo/servlet/GetbosonsNum?gamehomenum='+localStorage.g_gamenum +'&bosonsnum='+ g_dicenum + '&flag=1';
    
    console.log('设置骰子数量' + cuurl);
    
    
    $rootScope.items=null;
    if (!$rootScope.items) {
        jx.load(cuurl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.bosonsnumflag;
                
                $scope.$apply();
                
                },'json');
        
    } else {
        console.log('data already loaded');
    }
    
    
    
    var sdurl= g_baseurl + '/JujuDemo/servlet/GetbosonsCover?gamehomenum='+localStorage.g_gamenum + '&bosonscover='+ $scope.value1 +','+ $scope.value2+','+ $scope.value3 +','+ $scope.value4 +','+ $scope.value5 +'&userid='+ g_userid;
    
    console.log('发送随机骰子数目' + sdurl);
    
    $scope.senddicenum = function(){
        
        $rootScope.items=null;
        if (!$rootScope.items) {
            jx.load(sdurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.bosonscoverflag;
                    
                    $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        $location.path("/dice5viewcbdxresult");
        
    }

}

function diceGamedice4Ctrl($scope,$rootScope,$location){
    
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    $scope.value1 = Math.floor(Math.random()*6+1);
    $scope.dice1 = 'partials/' + $scope.value1 + '.PNG';
    
    $scope.value2 = Math.floor(Math.random()*6+1);
    $scope.dice2 = 'partials/' + $scope.value2 + '.PNG';
    
    $scope.value3 = Math.floor(Math.random()*6+1);
    $scope.dice3 = 'partials/' + $scope.value3 + '.PNG';
    
    $scope.value4 = Math.floor(Math.random()*6+1);
    $scope.dice4 = 'partials/' + $scope.value4 + '.PNG';
    
    //比大小
    var cuurl = g_baseurl + '/JujuDemo/servlet/GetbosonsNum?gamehomenum='+localStorage.g_gamenum +'&bosonsnum='+ g_dicenum + '&flag=1';
    
    console.log('设置骰子数量' + cuurl);
    
    
    $rootScope.items=null;
    if (!$rootScope.items) {
        jx.load(cuurl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.bosonsnumflag;
                
                $scope.$apply();
                
                },'json');
        
    } else {
        console.log('data already loaded');
    }
    
    
    
    var sdurl= g_baseurl + '/JujuDemo/servlet/GetbosonsCover?gamehomenum='+localStorage.g_gamenum + '&bosonscover='+ $scope.value1 +','+ $scope.value2+','+ $scope.value3 +','+ $scope.value4 +'&userid='+ g_userid;
    
    console.log('发送随机骰子数目' + sdurl);
    
    $scope.senddicenum = function(){
        
        $rootScope.items=null;
        if (!$rootScope.items) {
            jx.load(sdurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.bosonscoverflag;
                    
                    $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        $location.path("/dice4viewcbdxresult");
        
    }

}

function diceGamedice3Ctrl($scope,$rootScope,$location){
    
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    $scope.value1 = Math.floor(Math.random()*6+1);
    $scope.dice1 = 'partials/' + $scope.value1 + '.PNG';
    
    $scope.value2 = Math.floor(Math.random()*6+1);
    $scope.dice2 = 'partials/' + $scope.value2 + '.PNG';
    
    $scope.value3 = Math.floor(Math.random()*6+1);
    $scope.dice3 = 'partials/' + $scope.value3 + '.PNG';
    
    var cuurl = g_baseurl + '/JujuDemo/servlet/GetbosonsNum?gamehomenum='+localStorage.g_gamenum +'&bosonsnum='+ g_dicenum + '&flag=1';
    
    console.log('设置骰子数量' + cuurl);
    
    
    $rootScope.items=null;
    if (!$rootScope.items) {
        jx.load(cuurl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.bosonsnumflag;
                
                $scope.$apply();
                
                },'json');
        
    } else {
        console.log('data already loaded');
    }
    
    
    
    var sdurl= g_baseurl + '/JujuDemo/servlet/GetbosonsCover?gamehomenum='+localStorage.g_gamenum + '&bosonscover='+ $scope.value1 +','+ $scope.value2+','+ $scope.value3+'&userid='+ g_userid;
    
    console.log('发送随机骰子数目' + sdurl);
    
    $scope.senddicenum = function(){
        
        $rootScope.items=null;
        if (!$rootScope.items) {
            jx.load(sdurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.bosonscoverflag;
                    
                    $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        $location.path("/dice3viewcbdxresult");
        
    }
    
    
    
    
    

    
    
}


function diceGamedice2Ctrl($scope,$rootScope,$location){
    
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    $scope.value1 = Math.floor(Math.random()*6+1);
    $scope.dice1 = 'partials/' + $scope.value1 + '.PNG';
    
    $scope.value2 = Math.floor(Math.random()*6+1);
    $scope.dice2 = 'partials/' + $scope.value2 + '.PNG';
    
    
    var cuurl = g_baseurl + '/JujuDemo/servlet/GetbosonsNum?gamehomenum='+localStorage.g_gamenum +'&bosonsnum='+ g_dicenum + '&flag=1';
    
    console.log('设置骰子数量' + cuurl);
    
    
    $rootScope.items=null;
    if (!$rootScope.items) {
        jx.load(cuurl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.bosonsnumflag;
                
                $scope.$apply();
                
                },'json');
        
    } else {
        console.log('data already loaded');
    }
    
    
    
    var sdurl= g_baseurl + '/JujuDemo/servlet/GetbosonsCover?gamehomenum='+localStorage.g_gamenum + '&bosonscover='+ $scope.value1 +','+ $scope.value2+'&userid='+ g_userid;
    
    console.log('发送随机骰子数目' + sdurl);
    
    $scope.senddicenum = function(){
        
        $rootScope.items=null;
        if (!$rootScope.items) {
            jx.load(sdurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.bosonscoverflag;
                    
                    $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        $location.path("/dice2viewcbdxresult");
        
    }
    
 }
function diceGamedice1Ctrl($scope,$rootScope,$location){
    
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    $scope.value1 = Math.floor(Math.random()*6+1);
    $scope.dice1 = 'partials/' + $scope.value1 + '.PNG';
    
    //比大小游戏
    var cuurl = g_baseurl + '/JujuDemo/servlet/GetbosonsNum?gamehomenum='+localStorage.g_gamenum +'&bosonsnum='+ g_dicenum + '&flag=1';
    
    console.log('设置骰子数量' + cuurl);
    
    
    $rootScope.items=null;
    if (!$rootScope.items) {
        jx.load(cuurl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.bosonsnumflag;
                
                $scope.$apply();
                
                },'json');
        
    } else {
        console.log('data already loaded');
    }

    
    
    var sdurl= g_baseurl + '/JujuDemo/servlet/GetbosonsCover?gamehomenum='+localStorage.g_gamenum + '&bosonscover='+ $scope.value1 +'&userid='+ g_userid;
    
    console.log('发送随机骰子数目' + sdurl);
    
    $scope.senddicenum = function(){
        
        $rootScope.items=null;
        if (!$rootScope.items) {
            jx.load(sdurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.bosonscoverflag;
                    
                    $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        $location.path("/dice1viewcbdxresult");
        
    }

    



}

//比大小摇骰子游戏
function dice6GamefCtrl($scope,$rootScope,$location,$timeout){
    
    console.log('>>>>>>比大小结果获取<<<');
    console.log('摇骰子结果页面');
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    
    var dicejg = g_baseurl + "/JujuDemo/servlet/SendbosonsCover?gamehomenum="+ localStorage.g_gamenum +"&cate=1";
    
    console.log(dicejg);
    
    $scope.getdiceff = function(){
        $rootScope.items = null;
        if (!$rootScope.items) {
            
            jx.load(dicejg,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item18;
                    
                    if($rootScope.items.length >= 1){
                    
                     $timeout.cancel($scope.timeout);
                    
                    }
                    
                    $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
    }
    
    
    function countdown() {
        $scope.getdiceff();
        $scope.timeout = $timeout(countdown, 1000);
    }
    
    countdown();
    
    $scope.loadItem = function(item){
        
        console.log(item.bosonscover);
        $scope.gameusername = item.username;
        $scope.totalnum = item.totalnum;
        $scope.image = item.bosonscover;
        $scope.images = $scope.image.split(',');
        for(i=0;i<$scope.images.length;i++){
            $scope.dice1 = 'partials/' + $scope.images[0]+'.PNG';
            $scope.dice2 = 'partials/' + $scope.images[1]+'.PNG';
            $scope.dice3 = 'partials/' + $scope.images[2]+'.PNG';
            $scope.dice4 = 'partials/' + $scope.images[3]+'.PNG';
            $scope.dice5 = 'partials/' + $scope.images[4]+'.PNG';
            $scope.dice6 = 'partials/' + $scope.images[5]+'.PNG';
            //console.log("输出"+ $scope.images[i]+".PNG")
        }
    }
    
    $scope.exitgamehome= function(){
        
        var exgameurl = g_baseurl + "/JujuDemo/servlet/Exitgamehome?gamehomenum="+ localStorage.g_gamenum + "&id="+ g_userid;
        console.log(exgameurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(exgameurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
        
    }
    
    
}

function dice5GamefCtrl($scope,$rootScope,$location){
    
    $scope.exitgamehome= function(){
        
        var exgameurl = g_baseurl + "/JujuDemo/servlet/Exitgamehome?gamehomenum="+ localStorage.g_gamenum + "&id="+ g_userid;
        console.log(exgameurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(exgameurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
        
    }
    
    
    console.log('>>>>>>比大小结果获取<<<');
    console.log('摇骰子结果页面');
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    
    var dicejg = g_baseurl + "/JujuDemo/servlet/SendbosonsCover?gamehomenum="+ localStorage.g_gamenum +"&cate=1";
    
    console.log(dicejg);
    
    $scope.getdiceff = function(){
        $rootScope.items = null;
        if (!$rootScope.items) {
            
            jx.load(dicejg,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item18;
                    $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
    }
    
    
    $scope.getdiceff();
    
    $scope.loadItem = function(item){
        
        console.log(item.bosonscover);
        
        $scope.gameusername = item.username;
        
        $scope.totalnum = item.totalnum;
        
        $scope.image = item.bosonscover;
        
        $scope.images = $scope.image.split(',');
        
        for(i=0;i<$scope.images.length;i++){
            
            $scope.dice1 = 'partials/' + $scope.images[0]+'.PNG';
            $scope.dice2 = 'partials/' + $scope.images[1]+'.PNG';
            $scope.dice3 = 'partials/' + $scope.images[2]+'.PNG';
            $scope.dice4 = 'partials/' + $scope.images[3]+'.PNG';
            $scope.dice5 = 'partials/' + $scope.images[4]+'.PNG';
            $scope.dice6 = 'partials/' + $scope.images[5]+'.PNG';
            //console.log("输出"+ $scope.images[i]+".PNG")
        }
        
        
        
    }
    
    
    


}
function dice4GamefCtrl($scope,$rootScope,$location){
    
    $scope.exitgamehome= function(){
        
        var exgameurl = g_baseurl + "/JujuDemo/servlet/Exitgamehome?gamehomenum="+ localStorage.g_gamenum + "&id="+ g_userid;
        console.log(exgameurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(exgameurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
        
    }
    
    console.log('>>>>>>比大小结果获取<<<');
    console.log('摇骰子结果页面');
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    
    var dicejg = g_baseurl + "/JujuDemo/servlet/SendbosonsCover?gamehomenum="+ localStorage.g_gamenum +"&cate=1";
    
    console.log(dicejg);
    
    $scope.getdiceff = function(){
        $rootScope.items = null;
        if (!$rootScope.items) {
            
            jx.load(dicejg,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item18;
                    $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
    }
    
    
    $scope.getdiceff();
    
    $scope.loadItem = function(item){
        
        console.log(item.bosonscover);
        
        $scope.gameusername = item.username;
        
        $scope.totalnum = item.totalnum;
        
        $scope.image = item.bosonscover;
        
        $scope.images = $scope.image.split(',');
        
        for(i=0;i<$scope.images.length;i++){
            
            $scope.dice1 = 'partials/' + $scope.images[0]+'.PNG';
            $scope.dice2 = 'partials/' + $scope.images[1]+'.PNG';
            $scope.dice3 = 'partials/' + $scope.images[2]+'.PNG';
            $scope.dice4 = 'partials/' + $scope.images[3]+'.PNG';
            $scope.dice5 = 'partials/' + $scope.images[4]+'.PNG';
            $scope.dice6 = 'partials/' + $scope.images[5]+'.PNG';
            //console.log("输出"+ $scope.images[i]+".PNG")
        }
        
        
        
    }
    



}

function dice3GamefCtrl($scope,$rootScope,$location){
    
    $scope.exitgamehome= function(){
        
        var exgameurl = g_baseurl + "/JujuDemo/servlet/Exitgamehome?gamehomenum="+ localStorage.g_gamenum + "&id="+ g_userid;
        console.log(exgameurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(exgameurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
        
    }
    
    console.log('>>>>>>比大小结果获取<<<');
    console.log('摇骰子结果页面');
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    
    var dicejg = g_baseurl + "/JujuDemo/servlet/SendbosonsCover?gamehomenum="+ localStorage.g_gamenum +"&cate=1";
    
    console.log(dicejg);
    
    $scope.getdiceff = function(){
        $rootScope.items = null;
        if (!$rootScope.items) {
            
            jx.load(dicejg,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item18;
                    
                    
                    
                    
                    $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
    }
    
    
    $scope.getdiceff();
    
    $scope.loadItem = function(item){
        
        console.log(item.bosonscover);
        
        $scope.gameusername = item.username;
        
        $scope.totalnum = item.totalnum;
        
        $scope.image = item.bosonscover;
        
        $scope.images = $scope.image.split(',');
        
        for(i=0;i<$scope.images.length;i++){
            
            $scope.dice1 = 'partials/' + $scope.images[0]+'.PNG';
            $scope.dice2 = 'partials/' + $scope.images[1]+'.PNG';
            $scope.dice3 = 'partials/' + $scope.images[2]+'.PNG';
            $scope.dice4 = 'partials/' + $scope.images[3]+'.PNG';
            $scope.dice5 = 'partials/' + $scope.images[4]+'.PNG';
            $scope.dice6 = 'partials/' + $scope.images[5]+'.PNG';
            //console.log("输出"+ $scope.images[i]+".PNG")
        }
        
        
        
    }
    

    
}

function dice2GamefCtrl($scope,$rootScope,$location){
    $scope.exitgamehome= function(){
        
        var exgameurl = g_baseurl + "/JujuDemo/servlet/Exitgamehome?gamehomenum="+ localStorage.g_gamenum + "&id="+ g_userid;
        console.log(exgameurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(exgameurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
        
    }
    
    console.log('>>>>>>比大小结果获取<<<');
    console.log('摇骰子结果页面');
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    
    var dicejg = g_baseurl + "/JujuDemo/servlet/SendbosonsCover?gamehomenum="+ localStorage.g_gamenum +"&cate=1";
    
    console.log(dicejg);
    
    $scope.getdiceff = function(){
        $rootScope.items = null;
        if (!$rootScope.items) {
            
            jx.load(dicejg,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item18;
                    
                    
                    
                    
                    $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
    }
    
    
    $scope.getdiceff();
    
    $scope.loadItem = function(item){
        
        console.log(item.bosonscover);
        
        $scope.gameusername = item.username;
        
        $scope.totalnum = item.totalnum;
        
        $scope.image = item.bosonscover;
        
        $scope.images = $scope.image.split(',');
        
        for(i=0;i<$scope.images.length;i++){
            
            $scope.dice1 = 'partials/' + $scope.images[0]+'.PNG';
            $scope.dice2 = 'partials/' + $scope.images[1]+'.PNG';
            $scope.dice3 = 'partials/' + $scope.images[2]+'.PNG';
            $scope.dice4 = 'partials/' + $scope.images[3]+'.PNG';
            $scope.dice5 = 'partials/' + $scope.images[4]+'.PNG';
            $scope.dice6 = 'partials/' + $scope.images[5]+'.PNG';
            //console.log("输出"+ $scope.images[i]+".PNG")
        }
        
        
        
    }
    


}
function dice1GamefCtrl($scope,$rootScope,$location){

    $scope.exitgamehome= function(){
        
        var exgameurl = g_baseurl + "/JujuDemo/servlet/Exitgamehome?gamehomenum="+ localStorage.g_gamenum + "&id="+ g_userid;
        console.log(exgameurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(exgameurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
        
    }
    
    console.log('>>>>>>比大小结果获取<<<');
    console.log('摇骰子结果页面');
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    
    var dicejg = g_baseurl + "/JujuDemo/servlet/SendbosonsCover?gamehomenum="+ localStorage.g_gamenum +"&cate=1";
    
    console.log(dicejg);
    
    $scope.getdiceff = function(){
        $rootScope.items = null;
        if (!$rootScope.items) {
    
            jx.load(dicejg,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item18;
                    
                    
                    
                    
                    $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
    }
    
    
    $scope.getdiceff();
    
    $scope.loadItem = function(item){
    
        console.log(item.bosonscover);
        
        $scope.gameusername = item.username;
        $scope.image = 'partials/'+ item.bosonscover+'.PNG';
        $scope.totalnum = item.totalnum;
        
    
    }

}





function diceGamesetup3Ctrl($scope,$rootScope,$location){
    
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    $scope.value1 = Math.floor(Math.random()*6+1);
    $scope.dice1 = 'partials/' + $scope.value1 + '.PNG';
    
    $scope.value2 = Math.floor(Math.random()*6+1);
    $scope.dice2 = 'partials/' + $scope.value2 + '.PNG';
    
    $scope.value3 = Math.floor(Math.random()*6+1);
    $scope.dice3 = 'partials/' + $scope.value3 + '.PNG';
    
    $scope.value4 = Math.floor(Math.random()*6+1);
    $scope.dice4 = 'partials/' + $scope.value4 + '.PNG';
    
    $scope.value5 = Math.floor(Math.random()*6+1);
    $scope.dice5 = 'partials/' + $scope.value5 + '.PNG';
    
    $scope.value6 = Math.floor(Math.random()*6+1);
    $scope.dice6 = 'partials/' + $scope.value6 + '.PNG';
    
    $scope.alvalue = $scope.value1+','+$scope.value2+','+$scope.value3+','+$scope.value4+','+$scope.value5+','+$scope.value6;
    
    console.log('吹牛骰子随机数第一次bosonscover=' + $scope.alvalue);
    
    $scope.cnstart = function(){
    
    //吹牛游戏
    var cuurl = g_baseurl + '/JujuDemo/servlet/GetbosonsNum?gamehomenum='+localStorage.g_gamenum +'&bosonsnum=6'+ '&flag=0';
        
    console.log('设置骰子数量' + cuurl);
        
    $rootScope.items=null;
    if (!$rootScope.items) {
        jx.load(cuurl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item17;
                $scope.$apply();
                
                },'json');
        
    } else {
        console.log('data already loaded');
    }
        
       
    }
    
    $scope.cnstart();
  
    var sdurl= g_baseurl + '/JujuDemo/servlet/GetbosonsCover?gamehomenum='+localStorage.g_gamenum + '&bosonscover='+ $scope.alvalue +'&userid='+ g_userid;
   
    
    $scope.senddicenum = function(){
       
        
        navigator.notification.vibrate(3000);
        navigator.notification.vibrate(3000);
        
        
        console.log('发送随机骰子数目' + sdurl);
        
        $rootScope.items=null;
        if (!$rootScope.items) {
            jx.load(sdurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.bosonscoverflag;
                    $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
    
        $location.path("/diceviewc3");
    
        $scope.senopenf();
    
    }
   

    var sendopenflag = g_baseurl + "/JujuDemo/servlet/Getopenflag?gamehomenum="+ localStorage.g_gamenum;
    
    
    $scope.senopenf = function(){
        
        console.log('发送开盘标记' + sendopenflag);
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(sendopenflag,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
    }

}

//任何参与游戏的人点，开盘，直接显示摇骰子结果
function diceGamesetup4Ctrl($scope,$rootScope,$location){
    
    console.log('摇骰子结果页面');
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    var dicejg = g_baseurl + "/JujuDemo/servlet/SendbosonsCover?gamehomenum="+ localStorage.g_gamenum + "&cate=0";
    
    $scope.diceP1 = 'partials/1.PNG';
    $scope.diceP2 = 'partials/2.PNG';
    $scope.diceP3 = 'partials/3.PNG';
    $scope.diceP4 = 'partials/4.PNG';
    $scope.diceP5 = 'partials/5.PNG';
    $scope.diceP6 = 'partials/6.PNG';
    
    $scope.getdiceff = function(){
        
        
       console.log('获取吹牛结果' + dicejg);
       
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(dicejg,function(data){
    
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item18;
                    
                    $scope.diceN = data.item18[0].totalbosonsnum;
                    
                    console.log( 'TTTTTTT'+ data.item18[0].totalbosonsnum);
                    
                    $scope.diceN.split(",");
                    $scope.dicenum1 =  'x' + $scope.diceN[0];
                    $scope.dicenum2 =  'x' + $scope.diceN[2];
                    $scope.dicenum3 =  'x' + $scope.diceN[4];
                    $scope.dicenum4 =  'x' + $scope.diceN[6];
                    $scope.dicenum5 =  'x' + $scope.diceN[8];
                    $scope.dicenum6 =  'x' + $scope.diceN[10];
                    
                    console.log('FFFFFFFF' + $rootScope.items.length);
                    $scope.$apply();
                    
                    },'json');
        } else {
            console.log('data already loaded');
        }
    }
    
    
    
    $scope.getdiceff();
    $scope.getdiceff();
    
    
    $scope.loadItem = function(item){
    
        console.log(item.bosonscover);
        $scope.gameusername = item.username;
        $scope.image = item.bosonscover;
        $scope.images = $scope.image.split(',');
        
        for(i=0;i<$scope.images.length;i++){
            
            $scope.dice1 = 'partials/' + $scope.images[0]+'.PNG';
            $scope.dice2 = 'partials/' + $scope.images[1]+'.PNG';
            $scope.dice3 = 'partials/' + $scope.images[2]+'.PNG';
            $scope.dice4 = 'partials/' + $scope.images[3]+'.PNG';
            $scope.dice5 = 'partials/' + $scope.images[4]+'.PNG';
            $scope.dice6 = 'partials/' + $scope.images[5]+'.PNG';
            
            //console.log("");
        
        }
    
    }
    
    $scope.exitgamehome= function(){
        
        var exgameurl = g_baseurl + "/JujuDemo/servlet/Exitgamehome?gamehomenum="+ localStorage.g_gamenum + "&id="+ g_userid;
        console.log(exgameurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(exgameurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }

    
        $location.path("/step3");
    
    }
    

}

//摇骰子游戏---参与者等待视图-----
function diceGamewaitCtrl($scope,$rootScope,$location){
    
    console.log('摇骰子结果页面');
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    var waiturl = g_baseurl + '/JujuDemo/servlet/SendbosonsNum?gamehomenum='+ localStorage.g_gamenum;
    
    console.log(waiturl);
    
    $scope.waitopen = function(){
        $rootScope.items=null;
        if (!$rootScope.items) {
            jx.load(waiturl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.bosonsnum;
                    
                    
                    
                    if($rootScope.items == '6' && data.flag == '0' ){
                    
                        clearInterval(g_timer);
                        $location.path('/diceviewc2');
                    
                    }else if($rootScope.items == '5'){
                    
                     clearInterval(g_timer);
                     $location.path('/dice5viewbdx');
                    
                    }else if($rootScope.items == '4'){
                    
                     clearInterval(g_timer);
                     $location.path('/dice4viewbdx');
                    
                    }else if($rootScope.items == '3'){
                    
                    clearInterval(g_timer);
                    $location.path('/dice3viewbdx');
                    
                    }else if($rootScope.items == '2'){
                    
                    clearInterval(g_timer);
                    $location.path('/dice2viewbdx');
                    
                    }else if($rootScope.items == '1'){
                    
                    clearInterval(g_timer);
                    $location.path('/dice1viewbdx');
                    
                    }else if($rootScope.items == '6' && data.flag == '1'){
                    
                    clearInterval(g_timer);
                    $location.path('/dice6viewbdx');
                    
                    }

                    
                    $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
   }
   
    var g_timer;
   $scope.first = function(){
       g_timer = setInterval(function(){$scope.waitopen();},1000);
   
   }
   $scope.first();
}

function WhoiswosetupCtrl($scope,$rootScope,$timeout,$location){
    
    
    localStorage.g_userid = g_userid;
    console.log( "当前法官ID----"+localStorage.g_userid);
    
    $scope.exitgamehome = function(){
        
        var exgameurl = g_baseurl + "/JujuDemo/servlet/Exitgamehome?gamehomenum="+ localStorage.g_gamenum + "&id="+ g_userid;
        console.log(exgameurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(exgameurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
        
    }
    
    var onurl = g_baseurl +'/JujuDemo/servlet/Underpersonlist?gamehomenum='+localStorage.g_gamenum;
    
    $scope.onlinenum = function(){
        
        console.log("--获取在线用户人数方法-->>" + onurl);
        $rootScope.items = null;
        if (!$rootScope.items) {
           jx.load(onurl,function(data){
                    console.log(JSON.stringify(data));
                   
                   $rootScope.items = data.item17;
                   
                   for (var i = 0; i < $rootScope.items.length; i++) {
                   
                   console.log($rootScope.items[i].sum);
                   
                   $scope.usersum = '在线人数' + $rootScope.items[i].sum;
                   
                   
                   }
                   
                   
                   $scope.apply();
                   
                  
                   },'json');
        } else {
            console.log('data already loaded');
        }
        
    }
    
     //$scope.onlinenum();
     //setInterval(function(){ $scope.onlinenum()},2000);
    
    
    
   
    
    
    $scope.onlineuser = function(){
        console.log("--获取在线用户人员列表-->>" + onurl);
        $rootScope.users = null;
        if (!$rootScope.items) {
            jx.load(onurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.users = data.item17;
                    $scope.apply();
                    
                    },'json');
        } else {
            console.log('data already loaded');
        }
     }
    
    function countdown() {
        $scope.onlinenum();
        $scope.timeout = $timeout(countdown, 1000);
    }
    
     var randomccurl = g_baseurl +'/JujuDemo/servlet/Randomquestion?gamehomenum='+localStorage.g_gamenum;
   
    $scope.RandomCC = function(){
        
        console.log("--获取随机词汇-->>" + randomccurl);
    
        $rootScope.items = null;
        
        if (!$rootScope.items) {
            jx.load(randomccurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item20;
                    
                    $scope.title1 = data.item20.title1;
                    $scope.title2 = data.item20.title2;
                    
                    console.log('词汇1'+ $scope.title1 +'词汇2' + $scope.title2);
                    
                    
                    $scope.apply();
                    
                    },'json');
        } else {
            console.log('data already loaded');
        }

   
    }
   
    $scope.RandomCC();
    
    $scope.formData = {};
    
    $scope.sendcc = function(){
        
        console.log('get title1' + $scope.formData.t1 );
        console.log('get title2' + $scope.formData.t2 );
        
      if(!$scope.formData.t1 && !$scope.formData.t2){
            
       var sendccurl = g_baseurl +'/JujuDemo/servlet/Userquestion?gamehomenum='+localStorage.g_gamenum +'&title1='+ $scope.title1 +'&title2=' + $scope.title2 ;

      }else if(!$scope.formData.t1){
          
      var sendccurl = g_baseurl +'/JujuDemo/servlet/Userquestion?gamehomenum='+localStorage.g_gamenum +'&title1='+ $scope.title1 +'&title2=' + $scope.formData.t2 ;
      
      }else if(!$scope.formData.t2){
      
       var sendccurl = g_baseurl +'/JujuDemo/servlet/Userquestion?gamehomenum='+localStorage.g_gamenum +'&title1='+ $scope.formData.t1+'&title2='+$scope.formData.title2 ;
      }
      
        console.log('卧底游戏词汇发送' + sendccurl);
     
        $rootScope.items = null;
       
        if (!$rootScope.items) {
            
            jx.load(sendccurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
      
        
        $scope.gogogo();
    
     }
    
    
    $scope.gogogo = function(){
    
        var startgurl = g_baseurl +'/JujuDemo/servlet/Startundercover?gamehomenum='+ localStorage.g_gamenum ;
        
        console.log(startgurl);
        
        $rootScope.items = null;
        
        if (!$rootScope.items) {
            
            jx.load(startgurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    if(data.cerateresult == '0'){
                    
                    $scope.message = '人数不够';
                    
                    }else{
                    
                    $location.path('/whoiswogaming');
                    
                    }
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        

    
    }
    


}

function WhoiswofgCtrl($scope,$rootScope,$timeout,$location){
    
    console.log('<<<<<<谁是卧底游戏=当前用户ID>>>>>>>'+ g_userid);
    
    $scope.whoisfg = function(){
        
        var whofgurl = g_baseurl +'/JujuDemo/servlet/Underpersonlist?gamehomenum='+localStorage.g_gamenum;
        
        console.log(whofgurl);
        
        $rootScope.items = null;
        
        if (!$rootScope.items) {
            
            jx.load(whofgurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item17;
                    
                    console.log('>>>>>>>' + $rootScope.items.length);
                    console.log('>>>>>>>' + localStorage.g_userid);
                    
                    
                    var arr = [];
                    
                    for(var i = 0; i < $rootScope.items.length; i++){
                    
                    arr.push($rootScope.items[i].userid);
                    console.log('PPPP' + arr[i]);
                    
                    if($rootScope.items[i].gameuserid == '1'){
                    console.log('法官' + $rootScope.items[i].userid);
                    //console.log('>>>>>>>' + $rootScope.items[i].username);
                    if($rootScope.items[i].userid == localStorage.g_userid){
                    
                    $location.path('/whoiswo');
                    
                    $timeout.cancel($scope.timeout);
                    
                    }else {
                    
                    $location.path('/whoiswowo');
                    //$timeout.cancel($scope.timeout);
                    }
                    }
                    }
                    
                    console.log('CCCCCCCC' + arr.length);
                    
                    if(arr.indexOf(localStorage.g_userid) < 0){
                    
                    $location.path('/step3');
                    $timeout.cancel($scope.timeout);
                    
                    };
                    
                    
                    // $location.path("/killers1");
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
    }
    
    

    
    $scope.whoisfg();


}

function  WhoiswowaitingCtrl($scope,$rootScope,$timeout,$location){

    console.log('------谁是卧底游戏参与者等待游戏开始------'+ g_userid);
    
    var waiturl = g_baseurl +'/JujuDemo/servlet/Sendsingleundercover?gamehomenum='+ localStorage.g_gamenum + '&userid=' + g_userid;
    
     console.log(waiturl);
    
    $scope.waiting = function(){
      
        $rootScope.items = null;
        
        if (!$rootScope.items) {
            
            jx.load(waiturl,function(data){
                    console.log(JSON.stringify(data));
                    
                    $rootScope.items = data.item19;
                    
                    console.log('>>>>>>>><<<<<<' + data.item19[0].userid);
                    
                    if( data.item19[0].userid == "0"){
                    
                      console.log('人数不够无法游戏');
                    
                    }else{
                    
                    $timeout.cancel($scope.timeout);
                    
                    $location.path('/whoiswoplay');


                    }
                    
                    
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }

    
    }
    
    
    $scope.whoisfg = function(){
        
        var whofgurl = g_baseurl +'/JujuDemo/servlet/Underpersonlist?gamehomenum='+localStorage.g_gamenum;
        
        console.log(whofgurl);
        
        $rootScope.items = null;
        
        if (!$rootScope.items) {
            
            jx.load(whofgurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item17;
                    
                    console.log('>>>>>>>' + $rootScope.items.length);
                    console.log('>>>>>>>' + g_userid);
                    
                    
                    var arr = [];
                    
                    for(var i = 0; i < $rootScope.items.length; i++){
                    
                    arr.push($rootScope.items[i].userid);
                    console.log('PPPP' + arr[i]);
                    
                    if($rootScope.items[i].gameuserid == '1'){
                    console.log('法官' + $rootScope.items[i].userid);
                    //console.log('>>>>>>>' + $rootScope.items[i].username);
                    if($rootScope.items[i].userid == g_userid){
                    
                    $location.path('/whoiswo');
                    
                    $timeout.cancel($scope.timeout);
                    
                    }else {
                    
                    $location.path('/whoiswowo');
                    //$timeout.cancel($scope.timeout);
                    }
                    }
                    }
                    
                    console.log('CCCCCCCC' + arr.length);
                    
                    if(arr.indexOf(g_userid) < 0){
                    
                    $location.path('/step3');
                    $timeout.cancel($scope.timeout);
                    };

                    
                    // $location.path("/killers1");
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
    }
    
    

    
    
    function countdown() {
        $scope.whoisfg();
        $scope.waiting();
        $scope.timeout = $timeout(countdown, 1000);
    }
    countdown();
    
    
    $scope.goback =function(){
        
        $timeout.cancel($scope.timeout);

        var exgameurl = g_baseurl + "/JujuDemo/servlet/Exitgamehome?gamehomenum="+ localStorage.g_gamenum + "&id="+ g_userid;
        console.log(exgameurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(exgameurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
        
    }
    
    
}

//法官视图
function WhoiswoingCtrl ($scope,$rootScope,$timeout,$location){
    
    
    console.log('------谁是卧底游戏进行中------');
    
    $scope.message = "游戏进行中";
    
    var fggameover = g_baseurl +'/JujuDemo/servlet/Sendvoteoutcome?gamehomenum='+ localStorage.g_gamenum + '&flag=1';
    
    $scope.gameover = function(){
        
        $scope.message = "游戏进行中";
        
        console.log(fggameover);
        console.log('------法官结束游戏------');
        
        $rootScope.items = null;
        // load in data from hacker news unless we already have
        if (!$rootScope.items) {
            
            jx.load(fggameover,function(data){
                    
                    console.log(JSON.stringify(data));
                    
                    $rootScope.items = data.item20;
                    
                    if(!data.item20.content){
                    
                     console.log('------无法本轮游戏结果数据------');
                    
                    
                    
                    }else{
                    
                     console.log('------游戏结束1------' + data.item20.content);
                    
                     $scope.message = "游戏结束";
                    
                     $location.path('/whoiswogameover');
                    
                    }
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }

        
    }
    
}

function WhoiswoplayerCtrl($scope,$rootScope,$timeout,$location){
    
   console.log('------谁是卧底游戏进行中游戏参与者部分获取身份和词汇------');
   localStorage.g_userid = g_userid;
    var waiturl = g_baseurl +'/JujuDemo/servlet/Sendsingleundercover?gamehomenum='+ localStorage.g_gamenum + '&userid=' + localStorage.g_userid;
    console.log(waiturl);
    //localStorage.w_gdurl = waiturl;
    $scope.goback = function(){
        $timeout.cancel($scope.timeout);
        $location.path('/step3');
  
    }

    
    var gameinfourl = "http://203.100.80.135:8080/JujuDemo/servlet/Sendvoteoutcome?gamehomenum="+ localStorage.g_gamenum +"&flag=0";
    
    $scope.Getgameinfo = function(){
        
        console.log('参与者游戏状态获取一直监听' +  gameinfourl);
        
        $rootScope.items = null;
 
        if (!$rootScope.items) {
            jx.load(gameinfourl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item20;
                    
                    if(data.item20.content =='平民胜利'){
                    
                    console.log('------------平民胜利------------');
                    
                    $timeout.cancel($scope.timeout);
                    
                    $location.path('/whoiswogameover2');
                    
                    
                    }else if(data.item20.content =='卧底胜利'){
                    
                    console.log('------------卧底胜利------------');
                    
                     $timeout.cancel($scope.timeout);
                    
                     $location.path('/whoiswogameover2');
                    
                    }
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
      }
    
    
    $scope.value = 0;
    
    function countdown() {
        $scope.value++;
        $scope.Getgameinfo();
        $scope.timeout = $timeout(countdown, 1000);
    }
    
    countdown();


}


//法官视图
function WhoiswogameoverCtrl($scope,$rootScope,$timeout,$location){
    
     console.log('------谁是卧底游戏结束------'+ localStorage.g_gamenum);


    $scope.playgo = function(){
        
       console.log('------游戏法官继续游戏 再来一局------');
       var fgagurl = g_baseurl +'/JujuDemo/servlet/Getunderagainflag?gamehomenum='+ localStorage.g_gamenum + '&underagainflag=1';
       
        $rootScope.items = null;
        console.log(fgagurl);
       
        if (!$rootScope.items) {
            
            jx.load(fgagurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.getopenflag;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        $location.path('/whoiswo');
    
      }
    }


function WhoiswoplayergameoverCtrl($scope,$rootScope,$timeout,$location){

    $scope.playgo2 = function(){
       
        console.log('------游戏参与者继续游戏重玩------'+ localStorage.g_gamenum);
        
        var fgagurl = g_baseurl +'/JujuDemo/servlet/Sendunderagainflag?gamehomenum='+ localStorage.g_gamenum;
        
        $rootScope.items = null;
        console.log(fgagurl);
        
        if (!$rootScope.items) {
            
            jx.load(fgagurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.getopenflag;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        $location.path('/whoiswowo');
    }
}



function morasetup1Ctrl($scope,$rootScope,$timeout,$location){
    
    console.log('猜拳游戏开始');
    localStorage.g_userid = g_userid;
    console.log('>>>>>>获取用户ID<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
}


function killGamesetup1Ctrl($scope,$rootScope,$timeout,$location){
    
    console.log('杀人游戏开始');
    
    $scope.exitgamehome= function(){
        
        var exgameurl = g_baseurl + "/JujuDemo/servlet/Exitgamehome?gamehomenum="+ localStorage.g_gamenum + "&id="+ g_userid;
        console.log(exgameurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(exgameurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
        
    }
    

    var starturl = g_baseurl +'/JujuDemo/servlet/Startkill?gamehomenum='+ localStorage.g_gamenum;
   
    //var starturl = g_baseurl +'/JujuDemo/servlet/Startkill?gamehomenum=5632';
    //console.log(starturl);
    
    $scope.startplay = function(){
        
        $rootScope.items = null;
        // load in data from hacker news unless we already have
        if (!$rootScope.items) {
            
            jx.load(starturl,function(data){
                    console.log(JSON.stringify(data));
                    
                    $rootScope.items = data.cerateresult;
                    
                    if(!$rootScope.items){
                    
                    console.log("开始游戏");
                    
                    $location.path("/killers1");
                    
                    
                    }else{
                    
            navigator.notification.alert("人数不够哟,等待更多的玩家参与吧",function()
                                         {
                                         console.log("Alert success"
                                       
                                                     )},"友情提示","确定");
                    
                     console.log("人数不够哟");
                    
                    }
                    
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }

    
    
    }
    
    $scope.thby = function(){
    
    console.log('天黑闭眼Startkill');
        
        var thbyurl =  g_baseurl +'/JujuDemo/servlet/Getkillflag?gamehomenum='+ localStorage.g_gamenum+'&killflag=1';
        
        console.log('天亮了');
        console.log(thbyurl);
        
        $rootScope.items = null;
        
        if (!$rootScope.items) {
            
            jx.load(thbyurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.getopenflag;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
    
        
        
    $location.path("/killers2");
    
    }
    
    $scope.killeropen = function(){
        
        console.log('杀手杀人咯Sendjudgekilllist-1');
        $location.path("/killers3");
        
    }
    
    $scope.kill= function(){
        
        console.log('杀手杀人');
        $location.path("/killers4");
        
    }
    
    $scope.killclose=function(){
    
        console.log('杀手闭眼');
        $location.path("/killers5");
    }
    
    $scope.policeopen = function(){
        
        console.log('警察睁眼');
        $location.path("/killers6");
    }
    $scope.policeff= function(){
    
        console.log('警察验人');
        $location.path("/killers7");
    }
    
    $scope.policeclose=function(){
    
        console.log('警察闭眼');
        $location.path("/killers8");
    }
    
    $scope.allopen = function(){
        
        var allopenurl =  g_baseurl +'/JujuDemo/servlet/Getkillflag?gamehomenum='+ localStorage.g_gamenum+'&killflag=4';
        
        console.log('天亮了');
        console.log(allopenurl);
        
        $rootScope.items = null;
        // load in data from hacker news unless we already have
        if (!$rootScope.items) {
            
            jx.load(allopenurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.getopenflag;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }

         $location.path("/killers9");
    
    }

    $scope.fgql = function(){
    
    console.log('法官权利');
    console.log('当前用户ID'+ g_userid);
    console.log('当前游戏编号'+ localStorage.g_gamenum);
    $location.path("/killerfgm");
        
        
    }

}

function killGamesetup2Ctrl($scope,$rootScope,$timeout,$location){
    
    
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    $scope.gongtou = function(){
        
        console.log('------公投完成------');
        var gturl = g_baseurl +'/JujuDemo/servlet/Sendjudgekilllist?gamehomenum='+ localStorage.g_gamenum;
        
        console.log(gturl);
        console.log($rootScope.items);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(gturl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item23;
                    
                    console.log('公投结果' + $rootScope.items.length);
                    
                    if($rootScope.items.length == 1){
                    
                     $location.path('/killers9');
                    
                     }
                    
                
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            
            console.log('BBBB');
        
        }

        
        
         $location.path('/killers2');
        
        
    }
    
    $scope.replay = function(){
        
        console.log('重新开始');
        var replayurl =  g_baseurl +'/JujuDemo/servlet/Getkillflag?gamehomenum='+ localStorage.g_gamenum+'&killflag=6' + '&userid=' + g_userid;
        console.log(replayurl);
        $rootScope.items = null;
        // load in data from hacker news unless we already have
        if (!$rootScope.items) {
            
            jx.load(replayurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.getopenflag;
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }
        
        
        //$location.path("/killer");
        $location.path("/killerfg");
        
    }

    
    $scope.status = function(){
    
        console.log('------天亮了------');
        var userlisturl = g_baseurl +'/JujuDemo/servlet/Sendjudgekilllist?gamehomenum='+ localStorage.g_gamenum;
        
        console.log('------监听用户列表------'+userlisturl);
        
        $rootScope.items = null;
  
        if (!$rootScope.items) {
            
            jx.load(userlisturl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item19;
                    
                    if($rootScope.items.length > 1){
                    
                    $location.path('/killers10');
                    
                    }
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
    }
    
    $scope.status();


}

function JkillGamesetup1Ctrl($scope,$rootScope,$timeout,$location){

    console.log('参与者加入杀人游戏第一步骤确认或修改昵称');
    
    localStorage.g_userid = g_userid;
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ localStorage.g_userid );
    console.log('>>>>>>获取用户昵称<<<<<<'+ localStorage.nickname);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    
    $scope.replay = function(){
        
        console.log('重新开始');
        var replayurl =  g_baseurl +'/JujuDemo/servlet/Getkillflag?gamehomenum='+ localStorage.g_gamenum+'&killflag=6';
        console.log(replayurl);
        $rootScope.items = null;
        // load in data from hacker news unless we already have
        if (!$rootScope.items) {
            
            jx.load(replayurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.getopenflag;
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }
        
        
        //$location.path("/killer");
        $location.path("/killerfg");
        
    }

    
    
    $scope.exitgamehome= function(){
        
        var exgameurl = g_baseurl + "/JujuDemo/servlet/Exitgamehome?gamehomenum="+ localStorage.g_gamenum + "&id="+ g_userid;
        console.log(exgameurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(exgameurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
        
    }
    

    
    $scope.message = localStorage.nickname;
    
    $scope.formData = {};
    
    $scope.ccnickname= function(){
        
       if(!$scope.formData.nickname){
        
         console.log('使用默认昵称'+ localStorage.nickname);
            
         var cunameurl = g_baseurl +'/JujuDemo/servlet/Getkillname?gamehomenum='+ localStorage.g_gamenum + '&userid='+ g_userid +'&username='+localStorage.nickname;
        
        }else{
        
         console.log('新昵称'+ $scope.formData.nickname);
        
         var cunameurl = g_baseurl +'/JujuDemo/servlet/Getkillname?gamehomenum='+ localStorage.g_gamenum + '&userid='+ g_userid +'&username='+ $scope.formData.nickname;
            
        }
        
        
        
        console.log(cunameurl);
    
        
        $rootScope.items = null;
        // load in data from hacker news unless we already have
        if (!$rootScope.items) {
            
            jx.load(cunameurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
         $location.path("/jwkiller");
     
      }
}


function JkillGamesetup2Ctrl($scope,$rootScope,$timeout,$location){
    
    
    localStorage.g_userid = g_userid;
    console.log('>>>>>>获取用户ID<<<<<<'+ localStorage.g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    $scope.whoisfg = function(){
        
        var whofgurl = g_baseurl +'/JujuDemo/servlet/Killpersonlist?gamehomenum='+localStorage.g_gamenum;
        console.log(whofgurl);
        
        $rootScope.items = null;
      
        if (!$rootScope.items) {
            
            jx.load(whofgurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item17;
                    
                    console.log('>>>>>>>' + $rootScope.items.length);
                    console.log('>>>>>>>' + localStorage.g_userid);
                    
                   
                    var arr = [];
                    
                    for(var i = 0; i < $rootScope.items.length; i++){
                    
                    arr.push($rootScope.items[i].userid);
                    console.log('PPPP' + arr[i]);
                    
                    if($rootScope.items[i].gameuserid == '1'){
                    console.log('法官' + $rootScope.items[i].userid);
                    //console.log('>>>>>>>' + $rootScope.items[i].username);
                    if($rootScope.items[i].userid == localStorage.g_userid){
                    
                      $location.path('/killer');
                      $timeout.cancel($scope.timeout);
                    
                    }else {
                    
                      $location.path('/jwkiller');
                      //$timeout.cancel($scope.timeout);
                        }
                     }
                    }
                    
                    console.log('CCCCCCCC' + arr.length);
                    
                    if(arr.indexOf(localStorage.g_userid) < 0){
                    
                      $location.path('/step3');
                      $timeout.cancel($scope.timeout);
                    };
                    
                    
                    // $location.path("/killers1");
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
    }
 

     
  
    
    $scope.waiting = function(){
     var getpersonrole = g_baseurl +'/JujuDemo/servlet/Sendsinglekill?gamehomenum='+ localStorage.g_gamenum + '&userid='+ g_userid;
    
    console.log(getpersonrole);
    
    $rootScope.items = null;
    // load in data from hacker news unless we already have
    if (!$rootScope.items) {
        
        jx.load(getpersonrole,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item19;
                console.log("游戏状态等待");
                
               
                
                if(data.item19[0].username != '0' ){
                
                console.log("角色编号" + data.item19[0].ldentity);
                localStorage.rolenum = data.item19[0].ldentity;
                console.log("游戏开始");
                $location.path('/jwgame');
                $timeout.cancel($scope.timeout);
                
                }
                
                
                
                
                $scope.$apply();
                },'json');
        
      } else {
        console.log('data already loaded');
      }

    }
    
    function countdown() {
        $scope.whoisfg();
        $scope.waiting();
        $scope.timeout = $timeout(countdown, 1000);
    }
    
    countdown();
    
    $scope.exitgamehome= function(){
        
        var exgameurl = g_baseurl + "/JujuDemo/servlet/Exitgamehome?gamehomenum="+ localStorage.g_gamenum + "&id="+ g_userid;
        console.log(exgameurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(exgameurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        $timeout.cancel($scope.timeout);

        $location.path("/step3");
        
    }


}

function JkillGamesetup3Ctrl($scope,$rootScope,$timeout,$location){
    
     console.log('杀人游戏开始了哟');
     var cgamestatus = g_baseurl +'/JujuDemo/servlet/Sendtotianliang?gamehomenum='+ localStorage.g_gamenum;
     console.log('参与者监听游戏状态' + cgamestatus);
    
     $scope.jtgstatus = function(){
         $rootScope.items = null;
         // load in data from hacker news unless we already have
         if (!$rootScope.items) {
             jx.load(cgamestatus,function(data){
                     console.log(JSON.stringify(data));
                     $rootScope.items = data.item23;
                     
                     if($rootScope.items.length == 1){
                     
                      $location.path('/killers9');
                      $timeout.cancel($scope.timeout);
                     }

                     
                     
                     $scope.$apply();
                     },'json');
             
         } else {
             console.log('data already loaded');
         }
         
         
     }
     
    function countdown() {
        $scope.jtgstatus();
        $scope.timeout = $timeout(countdown, 1000);
    }
    
    countdown();
}

function killGamewhofCtrl($scope,$rootScope,$timeout,$location){
    
    console.log('谁是法官');
    localStorage.g_userid = g_userid;
    console.log('>>>>>>获取当前用户ID<<<<<<'+ localStorage.g_userid);
    console.log('>>>>>>获取当前游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    $scope.whoisfg = function(){
    
        var whofgurl = g_baseurl +'/JujuDemo/servlet/Killpersonlist?gamehomenum='+localStorage.g_gamenum;
        console.log(whofgurl);
        
        $rootScope.items = null;
        // load in data from hacker news unless we already have
        if (!$rootScope.items) {
            
            jx.load(whofgurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item17;
                    console.log('>>>>>>>' + $rootScope.items.length);
                    console.log('>>>>>>>' + localStorage.g_userid);
                    
                    
                    for(var i = 0; i < $rootScope.items.length; i++){
                    
                    if($rootScope.items[i].gameuserid == '1'){
                    
                    console.log('>>>>>>>' + $rootScope.items[i].userid);
                    //console.log('>>>>>>>' + $rootScope.items[i].username);
                    
                    
                    if($rootScope.items[i].userid == localStorage.g_userid){
                    
                    $location.path('/killer');
                    
                    }else{
                    
                    $location.path('/jwkiller');
                    
                    }
                    }
                    
                    
                    
                    }
                    
                    
                    // $location.path("/killers1");
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }

    
    }
    $scope.whoisfg();
    
    

}

function knowsetup1Ctrl($scope,$rootScope,$timeout,$location){

    localStorage.g_userid = g_userid;
    console.log('>>>>>>获取当前用户ID<<<<<<'+ localStorage.g_userid);
    console.log('>>>>>>获取当前游戏编号<<<<<<'+ localStorage.g_gamenum);


}

function knowjsetup1Ctrl($scope,$rootScope,$timeout,$location){

    localStorage.g_userid = g_userid;
    console.log('>>>>>>获取当前用户ID<<<<<<'+ localStorage.g_userid);
    console.log('>>>>>>获取当前游戏编号<<<<<<'+ localStorage.g_gamenum);

}

//---------------------------
function NavtoingGame($scope,$rootScope,$timeout,$location){
    
    //document.write("daaasdfasdfas");
    
    console.log("游戏名" + g_gamename);
    
    g_gamename="";
    localStorage.g_gamenum="";
    
    $scope.gameiconsrc = "./img/icons/nogame.png";
    
    function countdown() {
       
        if(!g_gamename){
            
            console.log("用户编号" + localStorage.j_username);
            console.log("房间编号"+ g_homenum);
            console.log("游戏名" + g_gamename);
            console.log("游戏编号"+ localStorage.g_gamenum);
            $scope.timeout = $timeout(countdown, 1000);
        }
    
    }

   
    
    
}

function NavtoGameCtrl($scope,$rootScope,$location,$timeout) {
    $rootScope.items = null;
    console.log('---游戏大厅---');
    
    console.log("用户编号" + localStorage.j_username);
    console.log("房间编号"+ g_homenum);
    console.log("游戏名" + g_gamename);
    console.log("游戏编号"+ localStorage.g_gamenum);
    
    $scope.gameiconsrc = "./img/icons/nogame.png";
    
    $scope.newgameicon = "./img/icons/nogame.png";
    
    function countdown() {
        $scope.inggamelist();
        $scope.timeout = $timeout(countdown, 2000);
    
    }
    
    
    $scope.inggamelist= function(){
        
        console.log(">>>>>>房间号" + g_homenum + ">>>>>>>游戏名称" + g_gamename);
        
        var getinggurl= g_baseurl +'/JujuDemo/servlet/Gameinfolist?gamename='+ g_gamename +'&homenum=' + g_homenum;
        
        console.log("获取进行中的游戏列表"+ getinggurl);
        $rootScope.items = null;
        if (!$rootScope.items) {
            
            jx.load(getinggurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item15;
                    
                    if($rootScope.items[0].id == "没有进行中的游戏"){
                    
                     console.log("自动新建游戏" + g_gamename);
                     autogamehomenum();
                    
                     }else{
                    
                       
                       $scope.message="";
                       $location.path("/step3");
                    
                    
                    }
                    
                      $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
    }
    
    $scope.autoNewgame = function(){
        
        autogamehomenum();
    
    
    }

    
    function autogamehomenum(){
        
        localStorage.g_gamenum = null;
    
        $rootScope.items = null;
        
        if (!$rootScope.items) {
            
            jx.load(g_baseurl+'/JujuDemo/servlet/SendHomenum',function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item5;
                    
                    localStorage.g_gamenum = $rootScope.items.homenum;
                    
                    console.log("自动获取游戏编号" + localStorage.g_gamenum);
                    
                    $scope.autocreatnewgame();
                    
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }
        
        

    
    }
 
    $scope.autocreatnewgame = function(){
    
    
        console.log("用户名" + localStorage.j_username);
        console.log("房间编号"+ g_homenum);
        console.log("游戏名" + g_gamename);
        console.log("游戏编号"+ localStorage.g_gamenum);
        
        
        var cngurl=g_baseurl+'/JujuDemo/servlet/GameUserinfo?id='+localStorage.j_username+'&gameuserid=1&gamehomenum='+localStorage.g_gamenum+'&gamename='+g_gamename+'&homenum='+g_homenum+'&isgameover=0';
        
        //console.log(cngurl);
        $rootScope.itemscn = null;
        if(!$rootScope.itemscn) {
            jx.load(cngurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.itemscn = data.cerateresult;
                    //console.log("------创建成功------"+ $rootScope.itemscn);
                    //if($rootScope.itemscn=1){}
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/nophoneview");
        
        if(g_gamename == 'jgch'){
            
            $location.path("/jgchview");
            
        }else if(g_gamename == 'dice'){
            
            $location.path("/diceview");
            
        }else if(g_gamename == 'whoiswo'){
            
            $location.path("/whoiswo");
            
        }else if(g_gamename == 'mora'){
            
            $location.path("/moraview");
            
        }else if(g_gamename == 'kill'){
            
            $location.path("/killer");
            
        }else if(g_gamename == 'know'){
            
            $location.path("/know");
        }
        

    
    
    }
    
    $scope.joinGame = function(item) {
        
        console.log("用户名" + localStorage.j_username);
        console.log("游戏名"+ g_gamename);
        console.log("游戏编号"+ item.tablenum);
        
        if(!item.tablenum){
             
            
            
        }else{
            
            localStorage.g_gamenum = item.tablenum;
            var cngurl=g_baseurl+'/JujuDemo/servlet/GameUserinfo?id='+localStorage.j_username +'&gameuserid=0&gamehomenum='+ item.tablenum +'&gamename='+g_gamename+'&homenum='+g_homenum+'&isgameover=0';
            
            console.log(cngurl);
            
            $rootScope.itemscn = null;
            if(!$rootScope.itemscn) {
                
                jx.load(cngurl,function(data){
                        console.log(JSON.stringify(data));
                        $rootScope.itemscn = data.cerateresult;
                        
                        console.log("------加入成功------"+ $rootScope.itemscn);
                        
                        
                        
                        if($rootScope.itemscn=1){
                        
                        if(g_gamename=='nophone'){
                        
                        $location.path("/nophoneview2");
                        }
                        
                        if(g_gamename=='jgch'){
                        
                        $location.path("/jgchview2");
                        }
                        if(g_gamename=='dice'){
                        
                        $location.path("/diceviewwaiting");
                        
                        }
                        if(g_gamename=='whoiswo'){
                        
                        $location.path("/whoiswowo");
                        
                        }
                        if(g_gamename=='kill'){
                        
                        $location.path("/jkiller");
                        
                        }
                        
                        if(g_gamename=='mora'){
                        
                        $location.path("/moraview");
                        
                        }
                        if(g_gamename=='know'){
                        
                        $location.path("/knowj");
                        
                        }
                        
                        
                        
                        }
                        $scope.$apply();
                        },'json');
                
            } else {
                console.log('data already loaded');
            }
        }
    }

    
    $scope.gotonophone = function(){
        
        g_gamename="nophone";
        console.log('游戏名称' + g_gamename);
        $scope.gameiconsrc = "./img/icons/np.png";
        
        $scope.newgameicon = "./img/icons/NewGame.PNG";
        
        $scope.inggamelist();
        
    }
    
    $scope.gotojgch = function(){
        
        g_gamename="jgch";
        
        console.log('游戏名称' + g_gamename);
        $scope.gameiconsrc = "./img/icons/jgch.png";
        $scope.newgameicon = "./img/icons/NewGame.PNG";
        
        $scope.inggamelist();
        
    }
    
    $scope.gotodice = function(){
        
        g_gamename="dice";
        
        console.log('游戏名称' + g_gamename);
        $scope.gameiconsrc = "./img/icons/dice.png";
        $scope.newgameicon = "./img/icons/NewGame.PNG";
        $scope.inggamelist();
        
    }
    
    $scope.gotowhoiswo = function(){
        
        g_gamename = "whoiswo";
        
        console.log('游戏名称' + g_gamename);
        $scope.gameiconsrc = "./img/icons/whoiswo.png";
        $scope.newgameicon = "./img/icons/NewGame.PNG";
        $scope.inggamelist();
        
    }
    $scope.gotomora = function(){
        
        g_gamename = "mora";
        
        console.log('游戏名称' + g_gamename);
        $scope.gameiconsrc = "./img/icons/mora.png";
        $scope.newgameicon = "./img/icons/NewGame.PNG";
        
        $scope.inggamelist();
        
    }
    
    $scope.gotokill = function(){
        
        g_gamename = "kill";
        
        console.log('游戏名称' + g_gamename);
        $scope.gameiconsrc = "./img/icons/kill.png";
        $scope.newgameicon = "./img/icons/NewGame.PNG";
        $scope.inggamelist();
        
    }
    
    $scope.gotozf = function(){
        
        g_gamename = "know";
        
        console.log('游戏名称' + g_gamename);
        $scope.gameiconsrc = "./img/icons/zf.png";
        $scope.newgameicon = "./img/icons/NewGame.PNG";
        $scope.inggamelist();
        
    }
    
    
    
}


