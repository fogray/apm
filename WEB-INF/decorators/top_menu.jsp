<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" buffer="none"%>

<div id="portal_menu" class="menu">
</div>

<script>
    $(document).ready(function(){
        $.post("${ctx}/menu/queryMenu",function(menuData){
            var html="";
            var k=1;
            for(var i=0;i<menuData.length;i++){
                var menuObj = menuData[i];
                var mTarget = menuObj.target ? menuObj.target : '_blank';
                var url = menuObj.url;
                if (url && url != '') {
                    html+="<ul class='menu_item'> <a href='"+url+"' target='"+mTarget+"'><span class='label'>"+menuObj.text+"</span> </a>";
                } else {
                    html+="<ul class='menu_item'> <a href='javascript:;'><span class='label'>"+menuObj.text+"</span> </a>";
                }
                var subMenuArr = "children" in menuObj ? menuObj["children"] : [];
                if (subMenuArr.length > 0) {
                    html+="<div class='sub_menu_layout'><li class='sub_menu_item'><ul>";
                    for(var j=0;j<subMenuArr.length>0;j++){
                        var subMenuObj = subMenuArr[j];
                        var _target = subMenuObj.target ? subMenuObj.target : '_blank';
                        html+="<li> <a index='"+k+"' target='"+_target+"' href='"+subMenuObj.url+"'> <span class='label'>"+subMenuObj.text+"</span> </a> </li>";
                        k++;
                    }
                    html+="</ul>";
                    html+="</li></div>";
                }
                html+="</ul>";
            }
            
            $("#portal_menu").html(html);
            
            $(".menu_item").each(function(){
                $(this).hover(function(){
                    //$(".sub_menu_item", $(this)).css("display", "inline-block");
                    $(".sub_menu_item", $(this)).slideDown();
                }, function(){
                    $(".sub_menu_item", $(this)).css("display", "none");
                    //$(".sub_menu_item", $(this)).slideUp();
                });
            });
        });
    });
    
</script>