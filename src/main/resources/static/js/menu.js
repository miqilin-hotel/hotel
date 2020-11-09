
/*获得主菜单*/
function renderIndexMenu(jsonData) {
    var container = $("#menu");
    var menuContent = "";

    for (var p = 0, len = jsonData.tops.length; p < len; p++) {
        var menu = new MenuNode(jsonData.tops[p]);
        menuContent = linkMenuContent(menu , menuContent);
    }
	
    container.html(menuContent);
	if(jsonData.current.parentName){
		$(".current_value,.current_value2").html(jsonData.current.parentName);//插入一级menu name
		$(".current_value1").html(jsonData.current.currentName);
		//jsonData.current.currentName//二级menu name
	}

}


/*获得子菜单*/
function renderSubMenu(data) {
    renderIndexMenu(data);   //先渲染主菜单

    var subMenuContent = "";
    var subMenus = data.childs;
    for (var k = 0, subLen = subMenus.length; k < subLen; k++) {
        var sub = new MenuNode(subMenus[k]);
        subMenuContent = linkMenuContent(sub , subMenuContent);
    }
    $(".left_nav_box ul").html(subMenuContent);
}

function linkMenuContent(menu , menuContent) {
    var menuHref = "javascript:void(0);";
    if (menu.type != 1) {
        menuHref = menu.url;
    }

    if (menu.type == 1) {
        menuContent += "<li>" + pageHrefBuilder(menu.id, menu.name) + "</li>";
    } else {
        menuContent += "<li>" + linkHrefBuilder(menu.id,menu.name, menuHref) + "</li>";
    }
    return menuContent;
}





/**************如下代码是预订页/CPS页菜单*******************/

/*获得主菜单*/
function renderIndexMenuCps(jsonData) {
	
    var container = $("#menu");
    var menuContent = "";

    for (var p = 0, len = jsonData.tops.length; p < len; p++) {
        var menu = new MenuNode(jsonData.tops[p]);
        menuContent = linkMenuContentCps(menu , menuContent);
    }
    container.html(menuContent);
}
function linkMenuContentCps(menu , menuContent) {
    var menuHref = "javascript:void(0);";
    if (menu.type != 1) {
        menuHref = menu.url;
    }

    if (menu.type == 1) {
        menuContent += "<li>" + pageHrefBuilderCps(menu.id, menu.name) + "</li>";
    } else {
        menuContent += "<li>" + linkHrefBuilderCps(menu.id,menu.name, menuHref) + "</li>";
    }
    return menuContent;
}
function pageHrefBuilderCps(id, name, currentName) {
    var clazz = "";
    if (name == currentName) {
       clazz += "class=\"active\"";
    }
    return "<a href='http://www.loristarhotel.cn/page.html?id=" + id + "' " + clazz + " data-id='" + id + "'>" + name + "</a>";
}


function linkHrefBuilderCps(id, name, url, currentName) {
    var clazz = "";
    if (name == currentName) {
       clazz += "class=\"active\"";
    }
    return "<a href='http://www.loristarhotel.cn/" + url + "'" /*+ "target='_blank'" */+ clazz + " data-id='" + id + "'>" + name + "</a>";
}

function staticHrefBuilderCps(id, name, url, currentName) {
    var clazz = "";
    if (name == currentName) {
        clazz += "class=\"active\"";
    }
    return "<a href='http://www.loristarhotel.cn/" + url + "'" + clazz + " data-id='" + id + "'>" + name + "</a>";
}
/*********************************/


/**************如下代码是预订页/CPS页英文版菜单*******************/

/*获得主菜单*/
function renderIndexMenuCpsEn(jsonData) {
	
    var container = $("#menu");
    var menuContent = "";

    for (var p = 0, len = jsonData.tops.length; p < len; p++) {
        var menu = new MenuNode(jsonData.tops[p]);
        menuContent = linkMenuContentCpsEn(menu , menuContent);
    }
    container.html(menuContent);
}
function linkMenuContentCpsEn(menu , menuContent) {
    var menuHref = "javascript:void(0);";
    if (menu.type != 1) {
        menuHref = menu.url;
    }

    if (menu.type == 1) {
        menuContent += "<li>" + pageHrefBuilderCpsEn(menu.id, menu.name) + "</li>";
    } else {
        menuContent += "<li>" + linkHrefBuilderCpsEn(menu.id,menu.name, menuHref) + "</li>";
    }
    return menuContent;
}
function pageHrefBuilderCpsEn(id, name, currentName) {
    var clazz = "";
    if (name == currentName) {
       clazz += "class=\"active\"";
    }
    return "<a href='http://www.loristarhotel.cn/en/page.html?id=" + id + "' " + clazz + " data-id='" + id + "'>" + name + "</a>";
}


function linkHrefBuilderCpsEn(id, name, url, currentName) {
    var clazz = "";
    if (name == currentName) {
       clazz += "class=\"active\"";
    }
    return "<a href='http://www.loristarhotel.cn/en/" + url + "'" /*+ "target='_blank'" */+ clazz + " data-id='" + id + "'>" + name + "</a>";
}

function staticHrefBuilderCpsEn(id, name, url, currentName) {
    var clazz = "";
    if (name == currentName) {
        clazz += "class=\"active\"";
    }
    return "<a href='http://www.loristarhotel.cn/en" + url + "'" + clazz + " data-id='" + id + "'>" + name + "</a>";
}
/*********************************/
