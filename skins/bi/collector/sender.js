var APM_SENDER = {
    is_complete: true,
    corsSend: function(url, params) {
        var xhr = new XMLHttpRequest();
        if ('withCredentials' in xhr) {

        } else {
            xhr = XDomainRequest();
        }
        if (!xhr) return;
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(toParams(params));
        xhr.onload = function(){
            console.log(xhr.responseText);
        };
        function toParams(params) {
            var result = [];
            var k=null;
            for (k in params) {
                if (params.hasOwnProperty(k)) {
                    var type = Object.prototype.toString.call(params[k]);
                    var v = '';
                    if (type === "[object Array]" || type === '[object Object]') {
                        v = (params[k]===undefined || params[k]===null ? "" : encodeURIComponent(JSON.stringify(params[k])));
                    } else {
                        v = (params[k]===undefined || params[k]===null ? "" : encodeURIComponent(params[k]));
                    }
                    result.push(k+'='+v);
                }
            }
            if (result.length > 0) return result.join('&');
            return null;
        }
    },
    sendData: function(url, params) {
        if (!this.is_complete) setTimeout('sendData('+url+','+params+')', 1000);
        this.is_complete = false;
        var form = document.createElement('form');
        form.method = 'POST';
        form.id = "beacon_form";
        
        form.enctype = "application/x-www-form-urlencoded";
        
        var k=null;
        for (k in params) {
            if (params.hasOwnProperty(k)) {
                var input = document.createElement("input");
                input.type = "hidden"; 
                input.name = k;
                var type = Object.prototype.toString.call(params[k]);
                if (type === "[object Array]" || type === '[object Object]') {
                    input.value = (params[k]===undefined || params[k]===null ? "" : encodeURIComponent(JSON.stringify(params[k])));
                } else {
                    input.value = (params[k]===undefined || params[k]===null ? "" : encodeURIComponent(params[k]));
                }
                form.appendChild(input);
            }
        }
        
        function remove(id) {
            var el = document.getElementById(id);
            if (el) {
                el.parentNode.removeChild(el);
            }
        }
        
        function submit() {
            var iframe, name = "insapm_post-" + encodeURIComponent(form.action) + "-" + Math.random();
            
            try {
                iframe = document.createElement('<iframe name="' + name + '">');    // IE <= 8
            } catch (e) {
                iframe = document.createElement("iframe");
            }
            
            form.action = url;
            iframe.name = iframe.id = name;
            
            iframe.style.display = form.style.display = "none";
            iframe.src="javascript:false";
            
            remove(iframe.id);
            remove(form.id);
            
            if (document.body) {
                document.body.appendChild(iframe);
            }
            var iFrmDocument = (iframe.contentWindow || iframe.contentDocument);
            if (iFrmDocument.document) {
                iFrmDocument = iFrmDocument.document;
            }
            if (iFrmDocument.body) {
                iFrmDocument.body.appendChild(form);
            }else {
                iFrmDocument.appendChild(form);
            }
            try {
                form.submit();
            } catch (e) {
            	alert(e);
            }
            
            setTimeout(function() { remove(iframe.id);this.is_complete = true; }, 500);
        }
        
        submit();
    }
};