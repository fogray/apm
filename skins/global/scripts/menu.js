$(document).ready(function(){
    
    var ctx = $("#ctx").val();
    var homePageUrl = $("#homePageUrl").val();
    var component = $('#component').val();
    
    var k=0;
    //将菜单的路径填写到pagebar
    fillPageBarText();
//    sessionStorage.clear();
    var menuJsonStr = sessionStorage.getItem("menu"+ctx+component);
    
    if(menuJsonStr){
        //生成菜单
        generateMenuDom(JSON.parse(menuJsonStr));
        //激活当前页面的菜单
        makeMenuActive();
    }else{
        //获取菜单数据
        $.post(ctx+"/menu/queryMenu?menu_type=menu-"+component,function(menuJson){
            
            //生成菜单
            generateMenuDom(menuJson);
            //激活当前页面的菜单
            makeMenuActive();
            //缓存菜单
            sessionStorage.setItem("menu"+ctx+component,JSON.stringify(menuJson));
        });
    }
    
    //生成菜单
    function generateMenuDom(menuArr){
        var menuHtml = "";
        for(var i=0;i<menuArr.length;i++){
            var menuObj = menuArr[i];
            menuHtml += menuNodeDomFactory(menuObj,0);
        }
        
        $("#page-menu").html(menuHtml);
    }
    
    //生成菜单节点dom的工厂
    function menuNodeDomFactory(menuObj,level){
        
        var hasSubMenu = "children" in menuObj && menuObj["children"].length > 0;
        
        var isGroupHead = "type" in menuObj && menuObj["type"] == "groupHead";
        
        var nodeHtml = "";
        
        if(isGroupHead){
            nodeHtml += "<li class='heading'>";
            nodeHtml += "<h3>"+menuObj.text+"</h3>";
            nodeHtml += "</li>";
        }else{
            nodeHtml += "<li class='nav-item level-"+level+"'>";
            
            if(hasSubMenu){
                nodeHtml += "<a href='javascript:;' class='nav-link nav-toggle'>";
                nodeHtml += "<i class='fa "+menuObj.icon+"'></i>";
                nodeHtml += "<span class='title'>"+menuObj.text+"</span>";
                nodeHtml += "<span class='arrow'></span>";
            }else{
                k++;
                var index = k;
                if("id" in menuObj){
                    index=menuObj.id;
                }
                nodeHtml += "<a href='"+menuObj.url+"' class='nav-link no-submenu' index='"+index+"'>";
                nodeHtml += "<i class='fa "+menuObj.icon+"'></i>";
                nodeHtml += "<span class='title'>"+menuObj.text+"</span>";
            }
            
            nodeHtml +=    "</a>";
            
            if(hasSubMenu){
                level++;
                nodeHtml += subMenuDomFactory(menuObj["children"],level);
            }
            
            nodeHtml +=    "</li>";
        }
        
        return nodeHtml;
    }
    
    //下级菜单dom的工厂
    function subMenuDomFactory(subMenuArr,level){
        var sunMenuHtml = "<ul class='sub-menu'>";
        for(var i=0;i<subMenuArr.length;i++){
            var menuObj = subMenuArr[i];
            sunMenuHtml += menuNodeDomFactory(menuObj,level);
        }
        sunMenuHtml += "</ul>";
        
        return sunMenuHtml;
    }
    
    //末级节点的点击事件
    $("#page-menu").on("click",".no-submenu",function(){
        var $a=$(this);
        //记录页面导航信息
        recordMenuPath($a);
        //页面跳转
        pageForwarding($a);
    });
    
    //页面跳转
    function pageForwarding($a){
        
        var url = $a.attr("href");
        var index = $a.attr("index");
        
        if(index){
            $a.attr("href",url+"#"+index);
        }
        
        //记录页面的index，用于页面刷新后打开相应的左侧菜单
        sessionStorage.setItem("pageIndex",index);
        
        if(url.indexOf("http")<0){
            url="http://"+window.location.host+url;
        }
        var urlObj=parseUrl(url);
        //如果菜单url和当前页url一致，则刷新当前页
        if((urlObj.pathname+urlObj.search) == (window.location.pathname + window.location.search)){
            window.location.reload();
        }else{
            window.location.href=$a.attr("href");
        }
    }
    
    //记录菜单的路径
    function recordMenuPath($target){
        var menuPathArr = [];
        
        $navItems = $target.parents(".nav-item");
        $navItems.each(function(){
            var $a = $(this).find("a").first();
            var $title = $a.find(".title");
            
            var menuObj ={
                "id":$a.attr("index"),
                "text":$title.text(),
                "url":$a.attr("href")
            };
            menuPathArr.unshift(menuObj);
        });
        
        sessionStorage.setItem("menuPath", JSON.stringify(menuPathArr));
    }
    
    //将菜单的路径填写到pagebar
    function fillPageBarText(){
        var menuPathArr=[];
        
        //判断当前是否为首页
        if(window.location.href.indexOf(homePageUrl) > -1){
            sessionStorage.removeItem("menuPath");
        }
        
        if(sessionStorage.getItem("menuPath")){
            menuPathArr = JSON.parse(sessionStorage.getItem("menuPath"));
        }
        var pageBarHtml = "<li>";
        pageBarHtml += "<a href='"+homePageUrl+"'>首页</a>";
        pageBarHtml += "<i class='fa fa-circle'></i>";
        pageBarHtml += "</li>";
        for(var i = 0;i < menuPathArr.length;i++){
            var menuPathObj = menuPathArr[i];
            pageBarHtml += "<li>";
            pageBarHtml += "<span>"+menuPathObj.text+"</span>";
            if(i != menuPathArr.length-1){
                pageBarHtml += "<i class='fa fa-circle'></i>";
            }
            pageBarHtml += "</li>";
        }
        
        $("#page-breadcrumb").html(pageBarHtml);
    }
    
    //激活当前页面的菜单
    function makeMenuActive(){
        
        var hash=window.location.hash;
        //如果页面有hash，则以hash为准，没有hash就以sessionStorage中的为准
        if(!hash){
            hash = "#"+sessionStorage.getItem("pageIndex");
        }
        if(hash){
            sessionStorage.setItem("pageIndex",hash.replace("#",""));
        }
        
        var activeLink=$('#page-menu').find("a[index='"+hash.replace("#","")+"']");    
        activeLink.parents(".nav-item").addClass("active");
        
        var $activeObj = $(".nav-item.active");
        if($activeObj.size()>0){
            $activeObj.each(function(){
                $(".arrow",this).addClass("open").before("<span class='selected'></span>");
            });
        }
    }
    
    //解析URL工具
    function parseUrl(url) {
        var r = {
            protocol: /([^\/]+:)\/\/(.*)/i,
            host: /(^[^\:\/]+)((?:\/|:|$)?.*)/,
            port: /\:?([^\/]*)(\/?.*)/,
            pathname: /([^\?#]+)(\??[^#]*)(#?.*)/
        };
        var tmp, res = {};
        res["href"] = url;
        for (p in r) {
            tmp = r[p].exec(url);
            res[p] = tmp[1];
            url = tmp[2];
            if (url === "") {
                url = "/";
            }
            if (p === "pathname") {
                res["pathname"] = tmp[1];
                res["search"] = tmp[2];
                res["hash"] = tmp[3];
            }
        }
        return res;
    };
});