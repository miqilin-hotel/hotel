/*
 newsJson: news json object
 return: news object.
 function: news object convert from news json object.
 */
function News(newsJson) {
    //标题
    this.title = newsJson[0];
    //发布时间
    this.publishDateTime = newsJson[1];
    //id标识
    this.id = newsJson[2];
    //内容静态生成的html相对地址
    this.url = newsJson[3];
    //分类
    this.category = newsJson[4];
    //语种
    this.language = newsJson[5];
    //颜色
    this.color = newsJson[6];
    //类型
    this.type = newsJson[7];
    //是否置顶
    this.topStatus = convertToBoolean(newsJson[8]);
    //热点
    this.hot = newsJson[9];
    //创建时间
    this.createTime = newsJson[10];
    //过期时间
    this.expiredTime = newsJson[11];
    //新闻内容
    this.content = newsJson[12];
    //是否连接新闻
    this.isLink = convertToBoolean(newsJson[13]);
    //新闻首图片
    this.firstPic = newsJson[14];
    //促销为：PROMOTION，优惠套餐为：PACKAGEPLAN。无：""
    this.rateType = newsJson[15];
    //rateType：PROMOTION，rateId为促销Id，rateType：PACKAGEPLAN,套餐ID。无：""
    this.rateId = newsJson[16];
    //允许预订链接
    this.allowBookLink = newsJson[17];
    //文章摘要
    this.summaryText = newsJson[18];
    //文章摘要图片
    this.summaryImageUrl = newsJson[19];
    return this;
}

function Message(messageJson) {
    //id标识
    this.id = messageJson[0];
    //标题
    this.title = messageJson[1];
    //发布时间
    this.contact = messageJson[2];
    //留言内容
    this.description = messageJson[3];
    //昵称
    this.nickname = messageJson[4];
    //内容静态生成的html相对地址
    this.url = messageJson[5];
    //发布时间
    this.createTime = messageJson[6];
    //状态
    this.status = messageJson[7];
    //酒店留言
    this.replyText = messageJson[8];
    //酒店留言时间
    this.replyTime = messageJson[9];
    return this;
}

function Talent(talentJson) {
    //id标识
    this.id = talentJson[0];
    //职位名称
    this.position = talentJson[1];
    //所属部门
    this.department = talentJson[2];
    //招聘人数
    this.number = talentJson[3];
    //工作经验
    this.experience = talentJson[4];
    //年龄
    this.age = talentJson[5];
    //薪酬
    this.salary = talentJson[6];
    //性别要求(0:man,1:woman,2:not limit)
    this.sex = talentJson[7];
    //发布时间
    this.publishDateTime = talentJson[8];
    //内容静态生成的html相对地址
    this.url = talentJson[9];
    //语种
    this.language = talentJson[10];
    //创建时间
    this.createTime = talentJson[11];
    //过期时间
    this.expiredTime = talentJson[12];
    //内容首图片
    this.firstPic = talentJson[13];
    //内容
    this.content = talentJson[14];
    return this;
}
function Purchase(purchaseJson) {
    //id标识
    this.id = purchaseJson[0];
    //采购联系方式
    this.contact = purchaseJson[1];
    //采购项目名称
    this.name = purchaseJson[2];
    //采购数量
    this.number = purchaseJson[3];
    //发布时间
    this.publishDateTime = purchaseJson[4];
    //内容静态生成的html相对地址
    this.url = purchaseJson[5];
    //语种
    this.language = purchaseJson[6];
    //创建时间
    this.createTime = purchaseJson[7];
    //过期时间
    this.expiredTime = purchaseJson[8];
    //内容首图片
    this.firstPic = purchaseJson[9];
    //说明
    this.content = purchaseJson[10];
    return this;
}

function MenuNode(json) {
    this.id = json.id;
    this.name = json.name;
    this.hasLeaf = json.hasLeaf;
    this.type = json.type;
    this.url = json.url;
    this.picId = json.picId;
    this.subMenus = json.subMenus;
}

function convertToBoolean(obj) {
    return obj === "ENABLED"
}
/*
 paramName: parameter key in the page url
 return: parameter value in the page url
 function: get current page url and get the parameter value by parameter key
 */
function getParam(name) {
    return getParamFromUrl(name);
}
function getParamFromUrl(paramName) {
    var query = location.search;
    if (query != null || query != "") {
        query = query.replace(/^\?+/, "");
        var qArray = query.split("&");
        var len = qArray.length;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                var sArray = qArray[i].split("=", 2);
                if (sArray[0] && sArray[1] && sArray[0] == paramName) {
                    return unescape(sArray[1]);
                }
            }
        }
    }
    return null;
}

function langConvert(lang) {
    if (lang == "en") {
        return "en_US";
    } else {
        return "zh_CN";
    }
}

function hrefBuilder(menu) {
    var menuContent = "";
    var menuHref = "javascript:void(0);";
    if (menu.type != 1) {
        menuHref = menu.url;
    }
    if (menu.type == 1) {
        menuContent = "<li>" + pageHrefBuilder(menu.id, menu.name) + "</li>";
    } else if (menu.type == 0) {
        menuContent = "<li>" + staticHrefBuilder(menu.id, menu.name, menuHref) + "</li>";
    } else {
        menuContent = "<li>" + linkHrefBuilder(menu.id, menu.name, menuHref) + "</li>";
    }
    return menuContent;
}



function pageHrefBuilder(id, name, currentName) {
    var clazz = "";
    if (id == nodeId ) {
       clazz += "class=\"active\"";
    }
    return "<a href='page.html?id=" + id + "' " + clazz + " data-id='" + id + "'>" + name + "</a>";
}


function linkHrefBuilder(id, name, url, currentName) {
    var clazz = "";
    if (id == nodeId ) {
       clazz += "class=\"active\"";
    }
    return "<a href='" + url + "'" /*+ "target='_blank'" */+ clazz + " data-id='" + id + "'>" + name + "</a>";
}

function staticHrefBuilder(id, name, url, currentName) {
    var clazz = "";
    if (id == nodeId  ) {
        clazz += "class=\"active\"";
    }
    return "<a href='" + url + "'" + clazz + " data-id='" + id + "'>" + name + "</a>";
}





/*
 page: frame page of category
 height: page height in the iframe
 function: reset newsDetailContent
 */
function resetFrameHeight(page, height) {
    document.getElementById("newsDetailContent").height = height + 20;
}