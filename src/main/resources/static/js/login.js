
	$("ul.dropdown-menu").on("click", function(e) {  
		e.stopPropagation();
	}); 
	
	function forgetShow() {
		refreshForgetImg();
		$('.loginDiv').hide();
		$('.forgetDiv').show();
		$('.reset-success').hide();
	}
	
	function returnLogin() {
		$('.loginDiv').show();
		$('.forgetDiv').hide();	
		$('.reset-success').hide();
	}
	
	function foreigner() {
		$('.foreignerDiv').show();
		$('.registerDiv').hide();	
	}
	
	function confirm() {
		$('.registerDiv').show();
		$('.foreignerDiv').hide();
		$('#registerDropdown').dropdown('toggle')
	}

	function checkInputEmpty(obj, funTrue, funFalse) {
		obj.keyup(function() {
			var isAllInput = true;
			obj.each(function(i, v) {
				isAllInput = isAllInput && !!$.trim(this.value);
			});

			if (isAllInput) {
				funTrue();
			} else {
				funFalse();
			}
		});
	}
	
	checkInputEmpty($('#account,#password'), function() {
		$('#doLogin').removeClass('register-default');
	}, function() {
		$('#doLogin').addClass('register-default');
	})
	
	checkInputEmpty($('#forgetPhone'), function() {
		$('#forgetIverifycode').next('span').addClass('verification-current');
	}, function() {
		$('#forgetIverifycode').next('span').removeClass('verification-current');
	})
	
	checkInputEmpty($('#forgetPhone,#forgetIverifycode,#forgetPassword,#forgetNewPassword'), function() {
		$('#doResetPass').removeClass('register-default');
	}, function() {
		$('#doResetPass').addClass('register-default');
	})
	
	checkInputEmpty($('#registerPhone'), function() {
		$('#registerIverifycode').next('span').addClass('verification-current');
	}, function() {
		$('#registerIverifycode').next('span').removeClass('verification-current');
	})
	
	checkInputEmpty($('#registerPhone,#registerIverifycode,#registerPassword,#registerNewPassword'), function() {
		$('#doRegister').removeClass('register-default');
	}, function() {
		$('#doRegister').addClass('register-default');
	})
	
	/**
	 * 显示错误信息
	 */
	function showError(obj, msg) {
		if(!obj.hasClass("form-control-danger"))
		{
			obj.addClass("form-control-danger");
		}
		obj.focus();
		obj.next('div').html(msg);
	}
	
	/**
	 * 清除错误信息
	 */
	function clearError(obj) {
		if(obj.hasClass("form-control-danger"))
		{
			obj.removeClass("form-control-danger");
		}
		obj.next('div').html('');
	}
	
	/**
	 * 
	 */
	function allow(obj, className) {
		if (!obj.hasClass(className)) {
			return true;
		}
		return false;
	}
	
	/**
	 * 是否可以发送重置密码短信
	 */
	function allowForgetSend() {
		return !allow($('#forgetIverifycode').next('span'), 'verification-current');
	}
	
	/**
	 * 是否可以发送注册短信
	 */
	function allowRegisterSend() {
		return !allow($('#registerIverifycode').next('span'), 'verification-current');
	}
	
	/**
	 * 是否可以发送注册短信
	 */
	function loginCallBack() {
		$('#doLogin').addClass('register-default');
	}
	
	/**
	 * 是否可以发送注册短信
	 */
	function resetPassCallBack() {
		$('.resetSuccessDiv').show();
		$('#doResetPass').addClass('register-default');
		$('.loginDiv').hide();	
		$('.forgetDiv').hide();	
	}
	
	/**
	 * 是否可以发送注册短信
	 */
	function resetCountDownCallBack() {
		$('.loginDiv').show();	
		$('.forgetDiv').hide();	
		$('.resetSuccessDiv').hide();
		$('#account').val('')
		$('#password').val('')
	}
	
	/**
	 * 是否可以发送注册短信
	 */
	function registerCountDownCallBack() {
		$('.registerDiv').show();	
		$('.foreignerDiv').hide();
		$('.registerSuccessDiv').hide();
		$('#registerDropdown').dropdown('toggle')
	}
	
	/**
	 * 是否可以发送注册短信
	 */
	function registerCallBack() {
		$('.registerSuccessDiv').show();
		$('.registerDiv').hide();
		$('.foreignerDiv').hide();
		$('#doResetPass').addClass('register-default');
	
	}
	
	function logoutCallBack() {
	
	}
	
	/**
	 * 是否可以发送注册短信
	 */
	function beginSendCode() {
		$("[id$='captcha']").removeClass('verification-current');
	}
	
	/**
	 * 是否可以发送注册短信
	 */
	function stopSendCode() {
		$("[id$='captcha']").addClass('verification-current');
	}
	
	$(".nav > li > a").click(function(){
		$('#collapse').addClass("collapsed");
		$('#collapse').attr("aria-expanded",false);
		$("#navbar").removeClass("in");
		$("#navbar").attr("aria-expanded",false);
	});


$("#registerDropdown").click(function(){ 
      refreshRegisterImg();
});

$('.form-group input').on('focus', function(){
    $(this).next('.formControlFeedback').html('');
});

$('#forgetVerifyImg').on('click', function(){
    refreshForgetImg();
});

$('#registerVerifyImg').on('click', function(){
    refreshRegisterImg();
});