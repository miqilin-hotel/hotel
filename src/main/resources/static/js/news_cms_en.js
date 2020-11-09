// JavaScript Document
//域名地址
var dh_host  = 'http://211.144.87.40/dhotelier';
var passPort = "AA92BED5436925D0DBD3CFC389A22DB8FA32";

var dhp_host  = 'http://54.222.162.71/dhweb';
var dhp_passPort = "A12219363C0E44A395057BAAB900BBB7";


var newsType = 0;
function newsAction(page, categoryId){
	var pageSize = pSize?pSize : 10;
	var currentPage = page?page : 1;	
	//信息列表
	$.getJSON(dhp_host+"/api/" + action + "?fun=?",
		{
			"hid": dhp_passPort,
			"lang": 'en_US',
			"catg": categoryId,
			"type": newsType ? newsType : 0,    //类型(可选 0为新闻, 1为促销信息 默认为0)
			"pageNo": currentPage,
			"pageSize": pageSize
		},
		function (data) {
			// 处理错误信息，反馈给客户。处理方式可以更友好一些
			if (data.success != undefined && data.success == false) {
				alert(data.message);
				return;
			}

			//展示信息列表
			var newsTpl = renderNews(data, action);
			var content = $("#newsList");
			content.empty();
			content.html(newsTpl);
			////展示信息分页
			var paginationTpl = renderPagination(currentPage, pageSize, data.iTotalRecords, "newsAction", categoryId);
			$("#pagination").html(paginationTpl);
		}
	);
}
//展示信息列表
function renderNews(data){
	var tpl = "";	
	for(var p in data.aaData){
		if(action == "news"){
			var news = new News(data.aaData[p]);
			//详细页面链接地址
			var detailUrl = "viewNews.html?id=" + news.id;//详情页模板viewNews.html
			if(news.isLink){
				detailUrl = dh_host + "/" + news.url;
			}
			if(template == "homelist" && action == "news")
			{
				tpl = tpl + '<li><div class="title"><span>'+news.publishDateTime+'</span><a href="' + detailUrl + '" target="_top">' + getByHot(news.hot) + suolve(news.title) + '</a></div></li>';
			}
			else if(template == "newslist"  && action == "news")
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
				if(template == "message" && action == "talent")
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
function renderPagination(currentPage, pageSize, total, clickFun){
	var showPage = 5;
	var totalPage = parseInt(total/pageSize) + (total % pageSize == 0 ? 0 : 1);
	var startPage = 1;
	var endPage = totalPage;
	var _showPage = (showPage-1)/2;
	if(currentPage-startPage > _showPage){
		startPage =  currentPage - _showPage;
	}
	if(endPage - currentPage > _showPage){
		endPage =  currentPage + _showPage;
	}
	if(startPage == 1 && endPage != totalPage && (endPage - startPage + 1) != showPage){
		endPage = startPage + showPage - 1;
		if(endPage > totalPage){
			endPage = totalPage;
		}
	}
	if(endPage == totalPage && startPage != 1 && (endPage - startPage + 1) != showPage){
		startPage = endPage - showPage + 1;
		if(startPage < 1){
			startPage = 1;
		}
	}
	var currentPageHtm = '<a href="javascript:void(0);" class="currentPage">' + currentPage + '</a>';
	var tpl = "";
	if (currentPage != 1){
		tpl += '<a href="javascript:void(0);" onclick="' + clickFun + '(' + (currentPage-1) + ')">上一页</a>';
	}
	for(var i=startPage; i <= endPage; i++){
		if(i == currentPage){
			tpl += currentPageHtm;
		}else{
			tpl += '<a href="javascript:void(0);" onclick="' + clickFun + '(' + i + ')">' + i + '</a>';
		}
	}

	if (currentPage != totalPage){
		tpl += '<a href="javascript:void(0);" onclick="' + clickFun + '(' + (currentPage+1) + ')">下一页</a>';
	}
	return tpl;
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
        tpl += '<a href="javascript:void(0);" onclick="' + clickFun + '(' + (currentPage - 1) + (categoryId ? "," + categoryId : "") + ')">Pre</a>';
    }
    for (var i = startPage; i <= endPage; i++) {
        if (i == currentPage) {
            tpl += currentPageHtm;
        } else {
            tpl += '<a href="javascript:void(0);" onclick="' + clickFun + '(' + i + (categoryId ? "," + categoryId : "") + ')">' + i + '</a>';
        }
    }

    if (currentPage != totalPage) {
        tpl += '<a href="javascript:void(0);" onclick="' + clickFun + '(' + (currentPage + 1) + (categoryId ? "," + categoryId : "") + ')">Next</a>';
    }
    return tpl;
}


/**-------------------------------------------------------------------------------------------------------------------------**/
function homePageAction(lang, picId, callBackFun/*, activeId*/) {     //首页
    menuAction(lang, callBackFun/*, activeId*/);
   picturesAction(picId);
	
}

function aboutPageAction(lang, nodeId, style, callBackFun, hasRenderPic) {   //内容页
    whichMenuAction(lang, nodeId, style, callBackFun);//调用菜单方法
	
	/*判断是否给hasRenderPic传参没有则通过页面ID号，获取图片*/
    var hasRenderPic = hasRenderPic ? hasRenderPic : "YES";
    if (hasRenderPic == "YES") {
        nodePicAction(nodeId);//调用获取图片方法，参数为页面ID号
    }
    aboutAction(nodeId, lang);//根据页面ID号参数和语言参数，来获得页页面内容
}

function newsPageAction(lang, newsId, picId, renderMenuFun, renderViewNewsFun, activeId) {    //新闻内容
    menuAction(lang, renderMenuFun, activeId);
    picturesAction(picId);
    viewNewsAction(newsId, renderViewNewsFun);
}

function messagePageAction(lang, nodeId, picId, style, renderMenuFun) {    //留言
    whichMenuAction(lang, nodeId, style, renderMenuFun);
    picturesAction(picId);
    messagesAction(1);
}

function pictureScrollAction(lang, picId, albumId, renderMenuFun) { //图片相册
    picturesAction(picId);
    menuAction(lang, renderMenuFun);
    picturesScroll(albumId);
}

/**
*lang 语言
*nodeId 页面参数
*style 菜单类型
*callBackFun 回调函数
*/

function whichMenuAction(lang, nodeId, style, callBackFun) {
    if (style == "combo" && nodeId != "") {
        comboMenuAction(nodeId, lang, callBackFun);
    } else {
        menuAction(lang, callBackFun, nodeId);
    }
}

/*获得一级菜单*/
function menuAction(lang, callBackFun/*, activeId*/) {
    $.getJSON(dh_host + "/api/jsonp/casMenu?fun=?",
        {
            "condition.hotel.derbyPassport": passPort,
            "condition.language": langConvert(lang)
        },
        function (data) {
            if (data.success != undefined && data.success == false) {
                alert(data.message);
                return;
            }
            callBackFun(data/*, activeId*/);
        }
    );
}



/**
*获得子菜单   获得页面ID获得子菜单数据，并把获取到的子菜单数据传给回调数去处理
*/
function comboMenuAction(nodeId, lang, callBackFun) {
    $.getJSON(dh_host + "/api/jsonp/comboMenu?fun=?",
        {
            "condition.hotel.derbyPassport": passPort,
            "condition.language": langConvert(lang),
            "id": nodeId
        },
        function (data) {
            if (data.success != undefined && data.success == false) {
                alert(data.message);
                return;
            }
            callBackFun(data);
        }
    );
}

function nodePicAction(nodeId, pic, callBackFun) {
    var url = dh_host + "/api/jsonp/nodePic?fun=?";
    var param = {
        //酒店Passport
        "derbyPassport": passPort,
        //图片类型 。获取type值的方法
        //登陆dh后台，网站设置>网站营销发布>图片管理
        "nodeId": nodeId
    };
    retrievePicturesAction(url, param, pic, callBackFun);
}

function picturesAction(typeid, pic, callBackFun) {
    var url = dh_host + "/api/jsonp/pictures?fun=?";
    var param = {
        //酒店Passport
        "derbyPassport": passPort,
        //图片类型 。获取type值的方法
        //登陆dh后台，网站设置>网站营销发布>图片管理
        "type": typeid
    };
    retrievePicturesAction(url, param, pic, callBackFun);
}


function picturesActionI(typeid) {
	var arrUrl = new Array();
	var arrT = new Array();
	var pictureListConfig = new Array();
	//图片列表
	$.getJSON(dh_host+"/api/jsonp/pictures?fun=?",
			{			
				//酒店Passport
				"derbyPassport": passPort,
				//图片类型 。获取type值的方法
				//登录dh后台，网站设置>网站营销发布>图片管理
				"type":typeid
			},
			// 处理错误信息，反馈给客户。处理方式可以更友好一些
			function (data) {
				if(data.success != undefined && data.success == false){
				   alert(data.message);
				   return;
				}
				// 展示图片信息
				for (var i=0; i < data.length; i++) {
					var obj = data[i];
					var name = obj[0].substring(0,obj[0].length-4);
					var url = obj[1];
					var id = obj[2];
					var type = obj[3];
					var seq = obj[4];
					var showName = obj[5];
					var url_l = dh_host + '/' +url;
					arrUrl.push(url_l);		
					arrT.push(showName);	
				}
				for(var i= 0;i<arrUrl.length;i++)
					{
						pictureListConfig.push({"image":arrUrl[i]});
					}
					BackgroundInfo = pictureListConfig;
					switchPic(BackgroundInfo);
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
			}
			
			suningnivoSlider();
		}
);
}


function retrievePicturesAction(url, param, pic, callBackFun) {
	
	var arrUrl = new Array();
	var arrT = new Array();
	var pictureListConfig = new Array();
	
//图片列表
    $.getJSON(url, param,
        // 处理错误信息，反馈给客户。处理方式可以更友好一些
        function (data) {
            if (data.success != undefined && data.success == false) {
                alert(data.message);
                return;
            }
            // 展示图片信息
            var content = $("#kinMaxShow");
            content.empty();
            for (var p in data) {
                var obj = data[p];
                var name = obj[0].substring(0, obj[0].length - 4);
                var url = obj[1];
                var id = obj[2];
                var type = obj[3];
				var seq = obj[4];
				var showName = obj[5];
					
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
			}
			
			suningnivoSlider();
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
        url: dh_host + "/api/jsonp/message-save",
        type: "post",
        dataType: "jsonp",
        jsonp: "fun",
        async: false,
        cache: false,
        data: $("#messageForm").serialize(),
        success: function (data) {
            if (!data.success) {
                var val = parseInt(data.message);
                if (val == -1) {
                    alert("无效的酒店！");
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
    var sub_length =80;
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
function suolve1(str) { //字符截取
    var sub_length = 27;
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
function suolve2(str) { //字符截取
    var sub_length = 230;
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
            //酒店 Passport(必填)
            "condition.hotel.derbyPassport": passPort,
            "condition.language": newsLanguage,
            //标题搜索(可选)
            "condition.title": "",
            //信息发布开始日期(可选)
            "condition.startTime": "",
            //信息发布结束日期(可选)
            "condition.endTime": "",
            // 分页起始记录(必填)
            "page.start": pageSize * (currentPage - 1),
            // 页面显示记录条数(必填)
            "page.pageSize": pageSize
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
            each += '<div class="msgreply"><label>酒店回复</label>：' + msg.replyText + ' <span>' + msg.replyTime + '</span></div>'
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



/*
*获得页面内容
*noId 页面号
*lang 语言版本
*/
function aboutAction(nodeId, lang) {
    $.getJSON(dh_host + "/api/jsonp/aboutDetail?fun=?",
        {
            "condition.hotel.derbyPassport": passPort,
            "condition.language": langConvert(lang),
            "id": nodeId
        },
        function (data) {
            if (data.success != undefined && data.success == false) {
                alert(data.message);
                return;
            }
            var current = $("#content1_1");//页面内容插入的位置
			current.html(data[1]);
			fooPosition();
        }
    );
}


/*********************************************************/




function switch_new1(){
	var num=sum_num;//num=sum_num
	//var sum=1;
	var time=1;
	var interval;
	
	if(num<=1){
		$(".b1 ,.b2 , .b3").css("display","none");
	}else if( num==2){
		$(".b3").css("display","none")
	}
	interval=setInterval( run,3000);
	function run(){
		if(num==1 || num==0){
			
		}else if(num==2){
			if (time==1){
				$('.b2').mousemove();
				time=2;	
			}else if(time==2){
				$('.b1').mousemove();
				time=1;	
			}			
		}else{
			if (time==3){
				$('.b1').mousemove();
				time=1;	
			}else if(time==1){
				$('.b2').mousemove();
				time=2;	
			}else if(time==2){
				$('.b3').mousemove();
				time=3;
			}			
		}

	}
	$('.b1').mousemove(function(){
		$(".cc").stop();
		$(".b1").css("background-image","url(images/pr2.png)");
		$(".b2 , .b3").css("background-image","url(images/pr1.png)");
		$('.cc').animate({
			'margin-left':'0px'
		})
		//alert();
		$(".b1").css(" background" , "#000");	
		
	})
	$('.b2').mousemove(function(){
		$(".cc").stop();
		$('.cc').animate({
			'margin-left':'-317px'
		})
		$(".b2").css("background-image","url(images/pr2.png)");
		$(".b1 , .b3").css("background-image","url(images/pr1.png)");
				
	})
	$('.b3').mousemove(function(){
		$(".cc").stop();
		$('.cc').animate({
			'margin-left':'-634px'
		})
		$(".b3").css("background-image","url(images/pr2.png)");
		$(".b2 , .b1").css("background-image","url(images/pr1.png)");	
					
	})

}
