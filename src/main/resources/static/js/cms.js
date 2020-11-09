// JavaScript Document
//域名地址
var dh_host  = 'http://211.144.87.40/dhotelier';
var passPort = "AA92BED5436925D0DBD3CFC389A22DB8FA32";
var newsType = 0;
function newsAction(page,categoryId){
	var pageSize = pSize?pSize : 10;
	var currentPage = page?page : 1;	
	//信息列表
	$.getJSON(dh_host+"/api/jsonp/"+ selectList +"?fun=?",
		{
			//酒店 Passport(必填)
			"condition.hotel.derbyPassport" : passPort,
			//语种(必填)
			"condition.language" : "zh_CN",
			//标题搜索(可选)
			"condition.title" : "",
			//信息发布开始日期(可选)
			"condition.startTime" : "",
			//信息发布结束信息(可选)
			"condition.endTime" : "",
			//信息发布结束信息(可选)
			"condition.categoryId" : categoryId,
			//类型(可选 0为新闻, 1为促销信息 不填默认为0)
			"type" : newsType?newsType:0,
			// 分页起始记录(必填)
			"page.start" : pageSize*(currentPage - 1),
			// 页面显示记录条数(必填)
			"page.pageSize" : pageSize
		},
		function(data){
			// 处理错误信息，反馈给客户。处理方式可以更友好一些
			if (data.success != undefined && data.success == false) {
				alert(data.message);
				return;
			}
			//展示信息列表
			var newsTpl = renderNews(data);
			var content = $("#newsList");
			
			content.empty();
			content.html(newsTpl);
			//展示信息分页
			/*var paginationTpl = renderPagination(currentPage, pageSize, data.iTotalRecords, "newsAction");*/
			var paginationTpl = renderPagination(currentPage, pageSize, data.iTotalRecords, "newsAction", categoryId);
			$("#pagination").html(paginationTpl);
		}
	);
}

//展示信息列表
var newsPStyle="";
function renderNews(data){
	var tpl = "";	
	for(var p in data.aaData){
		if(selectList == "news"){
			var news = new News(data.aaData[p]);
			//详细页面链接地址
			var detailUrl = "viewNews.html?id=" + news.id;//详情页模板viewNews.html
			if(newsPStyle==1){
				detailUrl = "viewNews1.html?id=" + news.id;
			}
			if(news.isLink){
				detailUrl = dh_host + "/" + news.url;
			}
			if(template == "homelist" && selectList == "news")
			{
				tpl = tpl + '<li><span>'+news.publishDateTime+'</span><a href="' + detailUrl + '" target="_blank">' + getByHot(news.hot) + suolve(news.title) + '</a></li>';
			}
			else if(template == "newslist"  && selectList == "news")
			{
				tpl = tpl + '<li><span>'+news.publishDateTime+'</span><a href="' + detailUrl + '" target="_top">' + getByHot(news.hot) + news.title + '</a></li>';
			}
		}
		else
		{
			//详细页面链接地址
			var talent = new Talent(data.aaData[p]);
			var detailUrl = "talent.html?id=" + talent.id;//详情页模板viewNews.html
			if(talent.isLink){
				detailUrl = dh_host + "/" + talent.url;
			}
				if(template == "message" && selectList == "talent")
				{
					
					//var tpl = tpl + '<li class="talentlist">'+ detailUrl + talent.position +'|'+ talent.department +'|'+ talent.number +'|'+ talent.experience +'</li>';	
					tpl = tpl + '<li class="talentlist"><div class="nnm"><label>职位名称：</label><a href='+ detailUrl +'>'+ talent.position +'</a></div><div  class="nnm"><label>所属部门：</label><span>'+ talent.department +'</sapn></div><div  class="nnm"><label>招聘人数：</label><span>'+ talent.number +'</sapn></div><div  class="nnm"><label>工作经验：</label><span>'+ talent.experience +'</sapn></div></li>';	
				}
			
		}
		
		
	}
	return tpl;
}


function newsAction1(page,categoryId){
	var pageSize = pSize?pSize : 10;
	var currentPage = page?page : 1;	
	//信息列表
	$.getJSON(dh_host+"/api/jsonp/"+ selectList +"?fun=?",
		{
			//酒店 Passport(必填)
			"condition.hotel.derbyPassport" : passPort,
			//语种(必填)
			"condition.language" : "zh_CN",
			//标题搜索(可选)
			"condition.title" : "",
			//信息发布开始日期(可选)
			"condition.startTime" : "",
			//信息发布结束信息(可选)
			"condition.endTime" : "",
			//信息发布结束信息(可选)
			"condition.categoryId" : categoryId,
			//类型(可选 0为新闻, 1为促销信息 不填默认为0)
			"type" : newsType?newsType:0,
			// 分页起始记录(必填)
			"page.start" : pageSize*(currentPage - 1),
			// 页面显示记录条数(必填)
			"page.pageSize" : pageSize
		},
		function(data){
			// 处理错误信息，反馈给客户。处理方式可以更友好一些
			if (data.success != undefined && data.success == false) {
				alert(data.message);
				return;
			}
			//展示信息列表
			var newsTpl = renderNews1(data);
			var content = $("#newsList");
			
			content.empty();
			content.html(newsTpl);
			//展示信息分页
			/*var paginationTpl = renderPagination(currentPage, pageSize, data.iTotalRecords, "newsAction");*/
			var paginationTpl = renderPagination(currentPage, pageSize, data.iTotalRecords, "newsAction", categoryId);
			$("#pagination").html(paginationTpl);
		}
	);
}

//展示信息列表
var newsPStyle="";
function renderNews1(data){
	var tpl = "";	
	for(var p in data.aaData){
		if(selectList == "news"){
			var news = new News(data.aaData[p]);
			//详细页面链接地址
			var detailUrl = "video_play.html?id=" + news.id;//详情页模板viewNews.html
			if(newsPStyle==1){
				detailUrl = "video_play.html?id=" + news.id;
			}
			if(news.isLink){
				detailUrl = dh_host + "/" + news.url;
			}
			if(template == "homelist" && selectList == "news")
			{
				tpl = tpl + '<li><span>'+news.publishDateTime+'</span><a href="' + detailUrl + '" target="_blank">' + getByHot(news.hot) + suolve(news.title) + '</a></li>';
			}
			else if(template == "newslist"  && selectList == "news")
			{
				tpl = tpl + '<li><span>'+news.publishDateTime+'</span><a href="' + detailUrl + '" target="_top">' + getByHot(news.hot) + news.title + '</a></li>';
			}
		}
		else
		{
			//详细页面链接地址
			var talent = new Talent(data.aaData[p]);
			var detailUrl = "talent.html?id=" + talent.id;//详情页模板viewNews.html
			if(talent.isLink){
				detailUrl = dh_host + "/" + talent.url;
			}
				if(template == "message" && selectList == "talent")
				{
					
					//var tpl = tpl + '<li class="talentlist">'+ detailUrl + talent.position +'|'+ talent.department +'|'+ talent.number +'|'+ talent.experience +'</li>';	
					tpl = tpl + '<li class="talentlist"><div class="nnm"><label>职位名称：</label><a href='+ detailUrl +'>'+ talent.position +'</a></div><div  class="nnm"><label>所属部门：</label><span>'+ talent.department +'</sapn></div><div  class="nnm"><label>招聘人数：</label><span>'+ talent.number +'</sapn></div><div  class="nnm"><label>工作经验：</label><span>'+ talent.experience +'</sapn></div></li>';	
				}
			
		}
		
		
	}
	return tpl;
}



function getByHot(hot){
	if("" === hot){
		return "";
	}
	if(hot){
		return '<img src="http://211.144.87.45/dhotelier/static/images2/gif-0309.gif" />';
	}else{
		return '<img src="http://211.144.87.45/dhotelier/static/images2/gif-0313.gif" />'
	}
}
//展示信息列表分页
function renderPagination(currentPage, pageSize, total, clickFun, categoryId) {
    var showPage = 5;
    var totalPage = parseInt(total / pageSize) + (total % pageSize == 0 ? 0 : 1);
    var startPage = 1;
    var endPage = totalPage;
    var _showPage = (showPage - 1) / 2;
    if (currentPage - startPage > _showPage) {
        startPage = currentPage - _showPage;
    }
    if (endPage - currentPage > _showPage) {
        endPage = currentPage + _showPage;
    }
    if (startPage == 1 && endPage != totalPage && (endPage - startPage + 1) != showPage) {
        endPage = startPage + showPage - 1;
        if (endPage > totalPage) {
            endPage = totalPage;
        }
    }
    if (endPage == totalPage && startPage != 1 && (endPage - startPage + 1) != showPage) {
        startPage = endPage - showPage + 1;
        if (startPage < 1) {
            startPage = 1;
        }
    }
    var currentPageHtm = '<a href="javascript:void(0);" class="currentPage">' + currentPage + '</a>';
    var tpl = "";
    if (currentPage != 1) {
         tpl += '<a href="javascript:void(0);" onclick="' + clickFun + '(' + (currentPage - 1) + (categoryId ? "," + categoryId : "") + ')">上一页</a>';
    }
    for (var i = startPage; i <= endPage; i++) {
        if (i == currentPage) {
            tpl += currentPageHtm;
        } else {
            tpl += '<a href="javascript:void(0);" onclick="' + clickFun + '(' + i + ')">' + i + '</a>';
        }
    }

    if (currentPage != totalPage) {
        tpl += '<a href="javascript:void(0);" onclick="' + clickFun + '(' + (currentPage + 1) + (categoryId ? "," + categoryId : "") + ')">下一页</a>';
    }
    return tpl;
}


/**-------------------------------------------------------------------------------------------------------------------------**/
function picturesAction(typeid, pic, callBackFun) {
//图片列表
    $.getJSON(dh_host + "/api/jsonp/pictures?fun=?",
        {
            //饭店Passport
            "derbyPassport":passPort,
            //图片类型 。获取type值的方法
            //登陆dh后台，网站设置>网站营销发布>图片管理
            "type":typeid
        },
        // 处理错误信息，反馈给客户。处理方式可以更友好一些
        function (data) {
            if (data.success != undefined && data.success == false) {
                alert(data.message);
                return;
            }
            // 展示图片信息
            var content = $("#photos");
            content.empty();
			for (var i=0; i < data.length; i++) {
				var obj = data[i];
				var name = obj[0].substring(0,obj[0].length-4);
				var url = obj[1];
				var id = obj[2];
				var type = obj[3];
				var seq = obj[4];
                var showName = obj[5];
                if (pic == "picture") {
                    $('<a href=' + dh_host + '/' + url + ' rel=' + dh_host + '/' + url + '>' + showName + '</a>').appendTo(content);
                }
                else {
                    $('<div class="panel"><img src=' + dh_host + '/' + url + ' /></div>').appendTo(content);
                }
            }
            if (pic == "picture") {
                callBackFun(data);
            }
            pictureswitch();
        }
    );
}



function picturesAction1(typeid, pic, callBackFun) {
//图片列表
    $.getJSON(dh_host + "/api/jsonp/pictures?fun=?",
        {
            //饭店Passport
            "derbyPassport":passPort,
            //图片类型 。获取type值的方法
            //登陆dh后台，网站设置>网站营销发布>图片管理
            "type":typeid
        },
        // 处理错误信息，反馈给客户。处理方式可以更友好一些
        function (data) {
            if (data.success != undefined && data.success == false) {
                alert(data.message);
                return;
            }
            // 展示图片信息
            var content = $("#KinSlideshow");
            content.empty();
			var PicNum=data.length<=4?data.length:4;
			for (var i=0; i < PicNum; i++) {
				var obj = data[i];
				var name = obj[0].substring(0,obj[0].length-4);
				var url = obj[1];
				var id = obj[2];
				var type = obj[3];
				var seq = obj[4];
                var showName = obj[5];
                if (pic == "picture") {
                    $('<a href=' + dh_host + '/' + url + ' rel=' + dh_host + '/' + url + '>' + showName + '</a>').appendTo(content);
                }
                else {
                    //$('<div class="panel"><img src=' + dh_host + '/' + url + ' /></div>').appendTo(content);
					
					$('<a href="#" rel=""><img src=' + dh_host + '/' + url + ' width="236" height="217" alt=""/></a>').appendTo(content);
                }
            }
            if (pic == "picture") {
                callBackFun(data);
            }
			
            pictureswitch();
        }
    );
}


//留言提交
$("#messageForm").submit(function () {
    if ($("#msgnickname").val() == "") {
        alert("昵称不能为空");
        $("#msgnickname").focus();
        return false;
    } else if ($("#msgtitle").val() == "") {
        alert("标题不能为空");
        $("#msgtitle").focus()
        return false;
    } else if ($("#msgdescription").val() == "") {
        alert("描述不能为空");
        $("#msgdescription").focus()
        return false;
    } else if ($("#msgcontact").val() == "") {
        alert("请输入邮箱地址");
        $("#msgcontact").focus()
        return false;
    } else if ($("#msgcaptcha").val() == "") {
        alert("请输入验证码");
        $("#msgcaptcha").focus()
        return false;
    }
    $.ajax({
        url:dh_host + "/api/jsonp/message-save",
        type:"post",
        dataType:"jsonp",
        jsonp:"fun",
        async:false,
        cache:false,
        data:$("#messageForm").serialize(),
        success:function (data) {
            if (!data.success) {
                var val = parseInt(data.message);
                if (val == -1) {
                    alert("无效的饭店！");
                } else if (val == -2) {
                    alert("留言不合法!");
                } else if (val == -3) {
                    alert("无效的验证码!");
                } else if (val < 0) {
                    alert("未知错误!");
                }
                refreshCaptcha();
            } else {
                alert("您的留言已提交成功。");
                location.reload();
            }
        }
    });
    return false;
});


function showFirstPic(firstPic) {//新闻缩略图
    if (firstPic != "") {
        return '<img src="' + firstPic + '" />';
    }
    return "";
}

function suolve(str) { //字符截取
    var sub_length = 35;
    var temp1 = str.replace(/[^\x00-\xff]/g, "**");//精髓
    var temp2 = temp1.substring(0, sub_length);
    //找出有多少个*
    var x_length = temp2.split("\*").length - 1;
    var hanzi_num = x_length / 2;
    sub_length = sub_length - hanzi_num;//实际需要sub的长度是总长度-汉字长度
    var res = str.substring(0, sub_length);
    if (sub_length < str.length) {
        var end = res + "…";
    } else {
        var end = res;
    }
    return end;
}


function messagesAction(page) {
    var pageSize = 10;
    var currentPage = page ? page : 1;
    //信息列表
    $.getJSON(dh_host + "/api/jsonp/messages?fun=?",
        {
            //饭店 Passport(必填)
            "condition.hotel.derbyPassport":passPort,
			"condition.language":"zh_CN",
            //标题搜索(可选)
            "condition.title":"",
            //信息发布开始日期(可选)
            "condition.startTime":"",
            //信息发布结束日期(可选)
            "condition.endTime":"",
            // 分页起始记录(必填)
            "page.start":pageSize * (currentPage - 1),
            // 页面显示记录条数(必填)
            "page.pageSize":pageSize
        },
        function (data) {
            // 处理错误信息，反馈给客户。处理方式可以更友好一些
            if (data.success != undefined && data.success == false) {
                alert(data.message);
                return;
            }
            //展示信息列表
            var messagesTpl = renderMessage(data);
            var content = $("#messagesList");
            content.empty();
            $(messagesTpl).appendTo(content);
            //展示信息分页
            var paginationTpl = renderPagination(currentPage, pageSize, data.iTotalRecords, "messagesAction");
            $("#messagesPagination").html(paginationTpl);
        }
    );

}


//展示信息列表
function renderMessage(data) {
    var tpl = "";
    for (var p in data.aaData) {
        var msg = new Message(data.aaData[p]);
        var each = '<div class="msglist">'
            + '<div class="msgn">'
            + '<span class="nick">' + msg.nickname + '</span>'
            + '<span class="crtitme">[' + msg.createTime + ']</span>'
            + '</div>'
            + '<div class="msgtitle">标题：' + msg.title + '</div>'
            + '<div class="msgdescription">' + msg.description + '</div>';
        if (msg.status == 2) {
            each += '<div class="msgreply"><label>饭店回复</label>：' + msg.replyText + '<div class="replyTime"><span>' + msg.replyTime + '</span></div></div>'
        }
        each += '</div>';

        tpl += each;
    }
    return tpl;
}

function refreshCaptcha() {
    var cpt = document.getElementById('img_captcha');
    var src = cpt.src;
    cpt.src = src + '?' + Math.random();
}


function picturesScroll(typeid) {
//图片列表
$.getJSON(dh_host+"/api/jsonp/pictures?fun=?",
		{			
			//饭店Passport
			"derbyPassport": passPort,
			//图片类型 。获取type值的方法
			//登陆dh后台，网站设置>网站营销发布>图片管理
			"type":typeid
		},
		// 处理错误信息，反馈给客户。处理方式可以更友好一些
		function (data) {
			if(data.success != undefined && data.success == false){
			   alert(data.message);
			   return;
			}
			// 展示图片信息
			var content = $("#gallery");
			content.empty();
			for (var i=0; i < data.length; i++) {
				var obj = data[i];
				var name = obj[0].substring(0,obj[0].length-4);
				var url = obj[1];
				var id = obj[2];
				var type = obj[3];
				var seq = obj[4];
                var showName = obj[5];
				$('<a href='+ dh_host +'/'+ url+' rel='+ dh_host +'/'+ url +' title='+ showName +'><img src='+ dh_host +'/'+ url+' /><br/>'+showName+'</a>').appendTo(content);
				/*$('<li><a href="#"><img src='+ dh_host +'/'+ url+' /></a><span>'+ name +'</span></li>').appendTo(content);*/
				
			}
			/*pictureScroll();*/
			suningImagesfn()
		}
);
}

//会议，宴会预订
$(function(){	
	$("#conferenceForm").submit(function () {
		var contactPerson = $("#contactPerson").val();
		var company = $("#company").val();
		var mail = $("#mail").val();	
		var phone = $("#phone").val();
		var meetingroom = $("#meetingroom").val();
		var seatStyle = $("#seatStyle").val();
		var checkInDate = $("#checkInDate").val();
		var checkOutDate = $("#checkOutDate").val();
		var activity = $("#activity").val();
		var number = $("#number").val();
		var remarks = $("#remarks").val();
		if(contactPerson == "")
		{
			alert("请输入姓名");
			return false;
		}
		else if(company == "")
		{
			alert("请输入公司名称");
			return false;
		}
		else if(mail == "")
		{		
			alert("请输入电子邮箱");
			return false;
		}
		else if(phone == "")
		{
			alert("请输入电话号码");
			return false;
		}
		else if(meetingroom == "")
		{
			alert("请选择会议厅");
			return false;
		}
		else if(seatStyle == "")
		{
			alert("请选择座位样式");
			return false;
		}
		else if($.trim(checkInDate).length < 1)
		{
			alert("请输入开始日期");
			return false;
		}
		else if($.trim(checkOutDate).length < 1)
		{
			alert("请输入结束日期");
			return false;
		}
		else if(activity == "")
		{
			alert("请选择会议/活动类别");
			return false;
		}
		else if(number == "")
		{
			alert("请输入出席人数");
			return false;
		}
		
		$.ajax({
			url:dh_host + "/api/jsonp/" + selectSave+ "",//conference-save会议，banquet-save宴会

			type:"post",
			dataType:"jsonp",
			jsonp:"fun",
			async:false,
			cache:false,
			data:$("#conferenceForm").serialize(),
			success:function (data) {
				alert("预订提交成功");
			}
		});
		return false;
	});
});



	function picturesScroll2(typeid) {
//图片列表
$.getJSON(dh_host+"/api/jsonp/pictures?fun=?",
		{			
			//酒店Passport
			"derbyPassport": passPort,
			//图片类型 。获取type值的方法
			//登陆dh后台，网站设置>网站营销发布>图片管理
			"type":typeid
		},
		// 处理错误信息，反馈给客户。处理方式可以更友好一些
		function (data) {
			if(data.success != undefined && data.success == false){
			   alert(data.message);
			   return;
			}
			// 展示图片信息
			var content = $("#pikame");
			content.empty();
			for (var i=0; i < data.length; i++) {
				var obj = data[i];
				var name = obj[0].substring(0,obj[0].length-4);
				var url = obj[1];
				var id = obj[2];
				var type = obj[3];
				$('<li><a href="#"><img src='+ dh_host +'/'+ url+' /></a></li>').appendTo(content);
				/*$('<li><a href="#"><img src='+ dh_host +'/'+ url+' /></a><span>'+ name +'</span></li>').appendTo(content);*/
			}
			pictureScroll2();
		}
);
}

function picturesActionC(typeid) {
//图片列表
$.getJSON(dh_host+"/api/jsonp/pictures?fun=?",
		{			
			//酒店Passport
			"derbyPassport": passPort,
			//图片类型 。获取type值的方法
			//登陆dh后台，网站设置>网站营销发布>图片管理
			"type":typeid
		},
		// 处理错误信息，反馈给客户。处理方式可以更友好一些
		function (data) {
			if(data.success != undefined && data.success == false){
			   alert(data.message);
			   return;
			}
			// 展示图片信息
			var content = $("#kinMaxShow");
			content.empty();
			for (var i=0; i < data.length; i++) {
				var obj = data[i];
				var name = obj[0].substring(0,obj[0].length-4);
				var url = obj[1];
				var id = obj[2];
				var type = obj[3];
				var seq = obj[4];
                var showName = obj[5];
				
				
				
				
				//$('<div><a href="#"><img src='+ dh_host +'/'+ url+'  /></a></div>').appendTo(content);
                
				/******图片名称做成链接********/
				
				
				var nameValue=showName.match("http://");//判断图片是否有带http://的链接
				var nameValue1=showName.match("javascript:");
				
				
				if(!nameValue1){
					targetValue="_blank";
				}else{
					targetValue="_parent";
				}
				
				
				if( nameValue || nameValue1 ){
				  herfA=showName;	
				  $('<div><a href="'+herfA+'"  target="'+targetValue+'"><img  src='+ dh_host +'/'+ url+' /></a></div>').appendTo(content);
				}else{
				 
				   $('<div><img src='+ dh_host +'/'+ url+'  /></div>').appendTo(content);
				}
				
				
				
				
				
				
				
				
					//
					//$('<div><img src='+ dh_host +'/'+ url+'  /></div>').appendTo(content);
			}
			
			suningnivoSlider()
		}
);
}

function picturesScroll4(typeid) {
//图片列表
$.getJSON(dh_host+"/api/jsonp/pictures?fun=?",
		{			
			//饭店Passport
			"derbyPassport": passPort,
			//图片类型 。获取type值的方法
			//登陆dh后台，网站设置>网站营销发布>图片管理
			"type":typeid
		},
		// 处理错误信息，反馈给客户。处理方式可以更友好一些
		function (data) {
			if(data.success != undefined && data.success == false){
			   alert(data.message);
			   return;
			}
			// 展示图片信息
			var content = $("#gallery4");
			content.empty();
			for (var i=0; i < data.length; i++) {
				var obj = data[i];
				var name = obj[0].substring(0,obj[0].length-4);
				var url = obj[1];
				var id = obj[2];
				var type = obj[3];
				var seq = obj[4];
                var showName = obj[5];
				$('<li><img src='+ dh_host +'/'+ url+' /><h2>'+showName+'</h2><span><h3>'+showName+'</h3></span></li>').appendTo(content);
				
				
			}
			suningImagesfn()
		}
);
}