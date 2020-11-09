var params = {'passport':'A12219363C0E44A395057BAAB900BBB7','site':'https://mbe.dhotelier.com/bookingEngine','mallSite':'https://mbrmallcustomer.dhotelier.com/mbrmallcustomer'};
var lang = 'zh_CN';
var passport = params.passport;
var site = params.site;
var mallSite = params.mallSite;
var ctx = site + "/" + passport + "/" + lang;
var forVerifyUuId, regVerifyUuId;

function guid() {
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function refreshForgetImg() {
    forVerifyUuId = guid()
    $('#forgetVerifyImg').attr('src', site + '/getCaptcha?uuId=' + forVerifyUuId);  
}

function refreshRegisterImg() {
    regVerifyUuId = guid()
    $('#registerVerifyImg').attr('src', site + '/getCaptcha?uuId=' + regVerifyUuId);    
}

// 登录
function login () {
    clearError($('#account,#password,#doLogin'));
    if (isNull($('#account').val())) {
        showError($('#account'), '用户名不能为空！')
        return;
    }

    if (isNull($('#password').val())) {
        showError($('#password'), '密码不能为空！')
        return;
    }
    var paramMap = {};
    paramMap.hotelPassport = passport;
    paramMap.account = $('#account').val();
    paramMap.password = $.md5($('#password').val());

    var f=document.forms.queryPriceForm;
    var checkInDate = f.checkInDate.value;
    var checkOutDate = f.checkOutDate.value;
    var roomNum = f.roomNum.value;

    $.ajax({
        type: 'GET',
        url: ctx + '/embedMember/moban/login?fun=?',
        data: paramMap,
        dataType: 'jsonp',
        success: function (data) {
            if(!data.success){
                showError($('#doLogin'), data.message)
                return;
            }
            $('#account').val('');
            $('#password').val('')
            // 登录信息设置
            setUserInfo(data.object);
            //新开预定引擎查询页面
            // querys();
            // 登录成功网站自定义事件;
            loginCallBack && loginCallBack();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('登录失败')
        }
    });
}

// 退出登录
function logout () {
    $.ajax({
        type: 'GET',
        url: ctx + '/embedMember/moban/logout?fun=?',
        data: {'token': window.token},
        dataType: 'jsonp',
        success: function (data) {
            if(!data.success){
                alert(data.message);
                return;
            }
            setUserInfo();
            // 退出登录成功网站自定义事件;
            logoutCallBack && logoutCallBack();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown)
        }
    });
}

//获取登录用户信息
function getLoginInfo() {
    var userToken = getCookie('userToken');
    if (!isNull(userToken)) {
        $.ajax({
            type: 'GET',
            url: ctx + '/embedMember/moban/getLoginInfo?fun=?',
            data: {'token': userToken},
            dataType: 'jsonp',
            success: function (data) {
            	if (!data.success) {
            		alert('请重新登录')
            		return;
            	}
                // 登录信息设置
                setUserInfo(data.object);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown)
            }
        });
    } else {
        setUserInfo();
    }
}
getLoginInfo()
//查询
function querys() {
	var f=document.forms.queryPriceForm;
	if(f.checkInDate.value<gGetToday()){
		alert('入住日期先于今日！');
		f.checkInDate.value=gGetToday();
		f.checkOutDate.value=gDateAdd(f.checkInDate.value,0,0,1);
		return false;
	}
	
	if(f.checkInDate.value>=f.checkOutDate.value){
		alert('离店日期先于入住日期！');
		return false;
	}
	if(f.checkOutDate.value>gDateAdd(f.checkInDate.value,1,0,0)){
		alert('入住时间大于一年！');
		f.checkOutDate.value=gDateAdd(f.checkInDate.value,1,0,0);
		return false;
	}
	var checkInDate = f.checkInDate.value;
	var checkOutDate = f.checkOutDate.value;
	var roomNum = f.roomNum.value || 1;
    var adults = f.adults ? f.adults.value : 1;
    var promotionCode = f.promotionCode ? f.promotionCode.value : '';
	
	var token = window.token || '';
	var url = ctx + '/embedRoom/queryRoom?ci=' + checkInDate + '&co=' + checkOutDate + '&rn=' + roomNum + '&al=' + adults + '&pc=' + promotionCode + '&token=' + token;
    window.open(url);
}

// 注册发送验证码
function sendRegisterVerifyCode() {
    var captcha = $('#register_captcha');
    if (!allowRegisterSend()) {
        return;
    }

    clearError($('#registerPhone,#registerIverifycode'));

    if (isNull($('#registerPhone').val())) {
        showError($('#registerPhone'), '请输入您的电话号码！');
        return;
    }

    if (!checkPhone($('#registerPhone').val())) {
        showError($('#registerPhone'), '手机号格式不对！');
        return;
    }
    if (isNull($('#regVerifyImgCode').val())) {
        showError($('#regVerifyImgCode'), '请输入图形验证码！');
        return;
    }
    // 发送验证码
    commonSendVerify(captcha, $('#registerPhone').val(), regVerifyUuId, $('#regVerifyImgCode'));
}

// 忘记密码发送验证码
function sendForgetVerifyCode() {
    var captcha = $('#forget_captcha');
    if (!allowForgetSend()) {
        return
    }

    clearError($('#forgetPhone,#forgetIverifycode,#forgetPassword,#forgetNewPassword'));

    if (isNull($('#forgetPhone').val())) {
        showError($('#forgetPhone'), '请输入您的电话号码！');
        return;
    }

    if (!checkPhone($('#forgetPhone').val())) {
        showError($('#forgetPhone'), '手机号格式不对！');
        return;
    }
    if (isNull($('#forVerifyImgCode').val())) {
        showError($('#forVerifyImgCode'), '请输入图形验证码！');
        return;
    }
    $.ajax({
        type: 'GET',
        url: ctx + '/embedMember/moban/register/check?fun=?',
        data: {'phone': $.trim($('#forgetPhone').val())},
        dataType: 'jsonp',
        success: function (data) {
            if (!data.success) {
                showError($('#forgetPhone'), data.message);
                return;
            }

            // 发送验证码
            commonSendVerify(captcha, $('#forgetPhone').val(), forVerifyUuId, $('#forVerifyImgCode'));
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showError($('#forgetPhone'), errorThrown);
        }
    });
}

// 发送验证码
function commonSendVerify(obj, phone, uuId, captchaObj) {
    clearError($('#regVerifyImgCode,#forVerifyImgCode'));

    if (obj.hasClass('countdown')) {
        return
    }
    obj.addClass('countdown');
    $.ajax({
        type: 'GET',
        url: ctx + '/embedMember/moban/verifycode/sendWithCapcha?fun=?',
        data: {
            'phone': $.trim(phone)
            ,'captcha': $.trim(captchaObj.val())
            ,'uuId': $.trim(uuId)
            },
        dataType: 'jsonp',
        success: function (data) {
            if(!data.success){
                obj.removeClass('countdown');
                showError(captchaObj, data.message);
                return;
            }
            beginSendCode && beginSendCode();
            countDown(obj, 30, function (showObj) {
                showObj.removeClass('countdown');
                showObj.html('发送验证码');
                stopSendCode && stopSendCode();
            }, '已发送');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showError(captchaObj, '发送失败');
        }
    });
}

//注册
function register () {
    if ($('#member_register').attr('disable')) {
        return;
    }
    clearError($('#registerPhone,#registerIverifycode,#registerPassword,registerNewPassword'));
    if (!checkForm('register')) {
        return;
    };

    var params = {};
    createParam(params, 'register');
    $('#member_register').attr("disabled", true);
    $.ajax({
        type: 'GET',
        url: ctx + '/embedMember/moban/register?fun=?',
        data: params,
        dataType: 'jsonp',
        success: function (data) {
            $('#member_register').removeAttr("disabled");
            if(!data.success){
                showError($('#doRegister'), data.message)
                return;
            }
            restForm('register');
            countDown($('#register_captcha'), 0, function (showObj) {
                showObj.removeClass('countdown');
                showObj.html('发送验证码');
            });
            countDown($('#registerSuccess'), 3, function (showObj) {
                registerCountDownCallBack && registerCountDownCallBack();
                // 登录信息设置
                setUserInfo(data.object);
            }, '');
            // 注册成功网站自定义事件;
            registerCallBack && registerCallBack();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('注册失败')
        }
    });
}

//忘记密码
function resetPass () {
    if ($('#forget_password').attr('disable')) {
        return;
    }
    clearError($('#forgetPhone,#forgetIverifycode,#forgetPassword,#forgetNewPassword'));
    if (!checkForm('forget')) {
        return;
    };

    var params = {};
    createParam(params, 'forget');
    $('#forget_password').attr("disabled", true);
    $.ajax({
        type: 'GET',
        url: ctx + '/embedMember/moban/password/reset?fun=?',
        data: params,
        dataType: 'jsonp',
        success: function (data) {
            $('#forget_password').removeAttr('disabled');
            if(!data.success){
                showError($('#doResetPass'), data.message)
                return;
            }
            restForm('forget');

            countDown($('#forget_captcha'), 0, function (showObj) {
                showObj.removeClass('countdown');
                showObj.html('发送验证码');
            });
            countDown($('#resetSuccess'), 3, function (showObj) {
                resetCountDownCallBack && resetCountDownCallBack();
            }, '');
            // 重置密码成功网站自定义事件;
            resetPassCallBack && resetPassCallBack();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('重置失败')
        }
    });
}

function createParam(params, key) {
    params.account = $('#' + key + 'Phone').val();
    params.password = $.md5($('#' + key + 'Password').val());
    params.phone = $('#' + key + 'Phone').val();
    params.verifyCode = $('#' + key + 'Iverifycode').val();
}

function checkForm(key) {
    if (isNull($('#' + key + 'Phone').val())) {
        showError($('#' + key + 'Phone'), '请输入您的电话号码!')
        return false;
    }
    if (!checkPhone($('#' + key + 'Phone').val())) {
        showError($('#' + key + 'Phone'), '手机号格式不对!')
        return false;
    }
    if (isNull($('#' + key + 'Iverifycode').val())) {
        showError($('#' + key + 'Iverifycode'), '请输入验证码!')
        return false;
    }
    if (!$('#' + key + 'Password').val().match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/)) {
        showError($('#' + key + 'Password'), '密码必须至少8位且包含大小写字母和数字!')
        return false;
    }
    if ($('#' + key + 'Password').val() != $('#' + key + 'NewPassword').val()) {
        showError($('#' + key + 'Password'), '');
        showError($('#' + key + 'NewPassword'), '两次密码输入不一致，请重新输入!')
        return false;
    }
    return true;
}

// 重置
function restForm(key) {
    $('#' + key + 'Phone').val('');
    $('#' + key + 'Phone').val('');
    $('#' + key + 'Iverifycode').val('');
    $('#' + key + 'Password').val('');
    $('#' + key + 'NewPassword').val('');
}

// 我的预定
function searchOrder (lang) {
    window.open(ctx + '/embedOrder/searchOrder');
}

// 登录信息设置
function setUserInfo(memInfo) {
    if (memInfo) {
        $('#loginBtn').hide();
        $('#login_offline').show();
        var html = '',userInfo = '';
        if (memInfo.openSeniorMem && memInfo.type && memInfo.type == '2') {
            userInfo = memInfo.account + '<span>' + (memInfo.levelName || memInfo.levelType) + '</span>';
            $('#exp').html(memInfo.experienceValue);
            $('#point').html(memInfo.point);
            $('#seniorInfo').show();
            $('#menuMall').show();
            $('#menuCenter').show();
        } else {
            userInfo = memInfo.account + '<span class="bg-none">' + (memInfo.levelName || memInfo.levelType) + '</span>';
            $('#exp').html('');
            $('#point').html('');
            $('#seniorInfo').hide();
            $('#menuMall').hide();
            $('#menuCenter').hide();
        }
        $('#userInfo').html(userInfo)
        $('#registerBtn').hide()
        $('#myOrder').hide()
        window.token = memInfo.token || getCookie('userToken');
    } else {
        $('#loginBtn').show();
        $('#login_offline').hide();
        $('#userInfo').html('')
        $('#registerBtn').show()
        $('#myOrder').show()
        window.token = '';
    }
    setCookie('userToken', window.token);
}

// 会员中心
function mbrCenter() {
    window.open(mallSite + '/member-auth?passport=' + passport + '&lang=' + lang + '&token=' + (window.token || ''));
}

// 积分商城
function mbrMall() {
    window.open(mallSite + '/mall-auth?passport=' + passport + '&lang=' + lang + '&token=' + (window.token || ''));
}

// 房间订单
function myRoomOrder() {
    window.open(ctx + '/embedMember/orderList?status=&token=' + (window.token || ''));
}

// function setCookie(name, value) {
//     document.cookie = name + '=' + value;
// }

function setCookie(name, value) {
    if( name == 'userToken' ) {
        var exp = new Date();
        exp.setTime(exp.getTime() + 1000 * 60 * 60 *6);
        document.cookie = name + '=' + value + '; expires=' + exp.toUTCString();        
    }else {
        document.cookie = name + '=' + value;
    }
}

function getCookie(name) {
    var arr,reg=new RegExp('(^| )'+name+'=([^;]*)(;|$)');
    if(arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    else {
        return '';
    }
}

/**
 * 手机号验证长度和位数
 * @param
 * @return
 * @author nancy.wang
 * @Time 2017/11/16
 */
function checkPhone(phone){
    if((/^1(3|4|5|7|8)\d{9}$/.test(phone))){
        return true;
    }
    return false;
}

// 倒计时处理
var timeoutId;
function countDown(showObj, waitSecond ,func, content) {
    if (waitSecond == undefined) {
        waitSecond = 0;
    }
    showObj.html((content || '') +  '(' + waitSecond + 's'+')');
    if (waitSecond > 0) {
        // 倒计时未结束的场合
        timeoutId = setTimeout(function() {
            countDown(showObj, --waitSecond, func, content); // 计数
        }, 1000);
    } else {
        // 倒计时结束的场合
        func && func(showObj);
        clearTimeout(timeoutId);
    }
}

function isNull(expression) {
    if (expression == undefined || expression == null || expression == 'null' || expression == 'undefined' || expression == '') {
        return true;
    }
    return false;
}

//********日期函数********
var gDateDelimiter='-';		//日期分隔符
function gGetDateTimeStr(iChoice,oDate){
	var yy=oDate.getFullYear(), mm=oDate.getMonth()+1, dd=oDate.getDate();
	var hh=oDate.getHours(), nn=oDate.getMinutes(), ss=oDate.getSeconds();
	if(mm<10) mm='0'+mm;
	if(dd<10) dd='0'+dd;
	if(hh<10) hh='0'+hh;
	if(nn<10) nn='0'+nn;
	if(ss<10) ss='0'+ss;
	if(iChoice==0) return (yy+gDateDelimiter+mm+gDateDelimiter+dd);
	if(iChoice==1) return (hh+':'+nn+':'+ss);
	if(iChoice==2) return (yy+gDateDelimiter+mm+gDateDelimiter+dd+' '+hh+':'+nn+':'+ss);
	return '';
}
function gDateAdd(dateStr,addYear,addMonth,addDate){
	var dt=new Date(Date.parse(gReplace(dateStr,'-','/')));
	dt.setFullYear(dt.getFullYear()+addYear);
	dt.setMonth(dt.getMonth()+addMonth);
	dt.setDate(dt.getDate()+addDate);
	return gGetDateTimeStr(0,dt);
}
function gGetToday(){
	return gGetDateTimeStr(0,new Date());
}
function gReplace(src,sFor,sBy){
	if(sFor==''||sBy=='') return src;
	for(var l=sFor.length,s='',p0=0,p;(p=src.indexOf(sFor,p0))>=0;s+=src.substring(p0,p)+sBy,p0=p+l);
	return (s+src.substring(p0));
}
//********日期函数结束********


//**选择日历，离店自动弹出
function checkInWeb(){
var co = document.getElementById('checkOutDate');
if (!co) return;
if(this.value>=co.value){
co.value = gDateAdd(this.value,0,0,1);
}
co.focus();
}

//预订自动加载时间
function MM_preloadcalendar() { //v3.0
  try{
	var sdt=gGetToday();
	var f=document.queryPriceForm;
	f.checkInDate.value=sdt;
	f.checkOutDate.value=gDateAdd(sdt,0,0,1);		
	f.hotelCode.value=hotelCode;
	f.language.value=language;
  }
  catch (e){
  }
}
MM_preloadcalendar();


//one日历插件
$(function(){
	//搜索按钮的淡入淡出
	$('.icon-search').on('click',function(){
		$('.search-pack-up').hide(300);
		$('.search-develop').show(300);
	})
	
	$('.icon-close').on('click',function(){
		$('.search-develop').hide(300);
		$('.search-pack-up').show(300);
	})
	var weekDay = ['周日','周一','周二','周三','周四','周五','周六'];
	//日历插件调用
    function getStartTimeElem()
        {
            var startElem = {
                elem: '#calendar',
                btns: ['confirm', 'now'],
                min: $('#calendar').val(),
                trigger: 'click',
                done: function () {
                    //处理 选择后的星期
                    var date = $('#calendar').val();
                    console.log("date",date);
                    //非清空时的处理
                    if (!isNull(date)) {
                        var week = weekDay[new Date(date).getDay()];
                        $('.weekS').text(week);
                        //处理结束时间
                        var nextDate = new Date(date);
                        nextDate.setDate(nextDate.getDate() + 1);
                        var endTime = new XDate(nextDate).toString("yyyy-MM-dd");
                        var endHtml = '<label>离店时间:</label><input type="text" class="input-times" value="' + endTime + '" id="calendar1" size="16" name="checkOutDate" data-date-autoclose="true" data-date-language="cn" data-date-rtl="false" data-date-format="yyyy-mm-dd" data-min-view="2" data-provide="datetimepicker-inline"/>';
                        $('.endDate').html(endHtml);
                        laydate.render(getEndTimeElem());
                        $('#calendar1').focus();
                    }

                }
            };
            if(!isNull(lang)&& lang == "en_US")
            {
                startElem.lang = "en";
            }
            return startElem;
        }

        function getEndTimeElem()
        {
            var endTimeElem = {
                elem: '#calendar1',
                btns: ['confirm', 'now'],
                min: $('#calendar1').val(),
                trigger: 'click',
                done: function () {
                    var date = $('#calendar1').val();
                    var week = weekDay[new Date(date).getDay()];
                    $('.weekE').text(week);
                }
            };
            if(!isNull(lang)&& lang == "en_US")
            {
                endTimeElem.lang = "en";
            }
            return endTimeElem;
        }

        
	laydate.render(getStartTimeElem());
	laydate.render(getEndTimeElem());
	//预定房间数
	$('.icon-add').on('click',function(){
		var value = $('.room-box input').val();
		value++;
		if(value > 4) {
			return false;
		}
		$('.room-box input').val(value);
	})
	
	$('.icon-reduce').on('click',function(){
		var value = $('.room-box input').val();
		value--;
		if(value < 1) {
			return false;
		}
		$('.room-box input').val(value);
	})
	
	//手动输入房间数的时候确保是正整数
	$('.room-box input').on('keyup',function(){
		if(this.value.length == 1) {
			this.value=this.value.replace(/[^1-9]/g,'')
		}else {
			this.value=this.value.replace(/\D/g,'')
		}
	})
	$('.room-box input').on('afterpaste',function(){
		if(this.value.length == 1) {
			this.value=this.value.replace(/[^1-9]/g,'')
		}else {
			this.value=this.value.replace(/\D/g,'')
		}
	})
		
})
