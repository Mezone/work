var Utils = {};

Utils.getCookie = function (name) {
    if (navigator.cookieEnabled) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr !== null) {
            return decodeURIComponent(arr[2]);
        }
    }
};

Utils.setCookie = function (name, value, day) {
    if (day == undefined) {
        if (navigator.cookieEnabled) {
            document.cookie = name + "=" + decodeURIComponent(value);
        }
    } else {
        var exp = new Date();
        exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
        if (navigator.cookieEnabled) {
            document.cookie = name + "=" + decodeURIComponent(value) + ";expires=" + exp.toGMTString();
        }
    }
};

Utils.isChrome = function(){
    return navigator.userAgent.toLowerCase().match(/chrome/) != null;
};

Utils.activeMenu = function(url){
    $('ul.sidebar-menu a').each(function(){
        var href = $(this).attr('href');
        if(href.indexOf(url) != -1){
            var li = $(this).parent();
            li.addClass('active');
            var ul = li.parent();
            if(ul.hasClass('submenu')){
                ul.parent().addClass('active').addClass('open');
            }
            return false;
        }
    });
};

Utils.collapseSidebar = function(){
    $("#sidebar-collapse").click();
};

Utils.bsErrorHtml = function(message){
    return '<div class="alert alert-danger fade in">' +
        '<button class="close" data-dismiss="alert" style="font-size: 16px;">×</button>'+
        '<i class="fa-fw fa fa-times"></i>' +
        '<strong>错误!</strong> ' + message +
        '</div>';
};

Utils.bsInfoHtml = function(message){
    return '<div class="alert alert-info fade in">' +
        '<button class="close" data-dismiss="alert">×</button>' +
        '<i class="fa-fw fa fa-info"></i>' +
        '<strong>Info!</strong>'  + message +
        '</div>';
};

Utils.bsSuccessHtml = function(message){
    return '<div class="alert alert-success fade in">' +
        '<button class="close" data-dismiss="alert">×</button>' +
        '<i class="fa-fw fa fa-info"></i>' +
        '<strong>Info!</strong>'  + message +
        '</div>';
};

/**
 * DateTime字符串转时间数值
 * @param dateTime 2016/09/01 24:00:00
 */
Utils.getDTNum = function(v){
    return new Date(v).getTime();
};

/**
 * 将时间转换成字符串
 * @param v Number
 * @returns {string} 2016/08/09 23:11:00
 */
Utils.getDTString = function(v){
    var date = new Date(v);
    return date.getFullYear() + '/' +
        this.zeroNum(date.getMonth() + 1) + '/' +
        this.zeroNum(date.getDate()) + ' ' +
        this.zeroNum(date.getHours()) + ':' +
        this.zeroNum(date.getMinutes()) + ':' +
        this.zeroNum(date.getSeconds());
};

/**
 * 将时间字符串格式化成标准字符串
 * @param v 20160901142125
 * @returns {string} 2016/09/01 14:21:25
 */
Utils.formatDTString = function(v){
    return v.substring(0, 4) + "/" +
        v.substring(4, 6) + "/" +
        v.substring(6, 8) + " " +
        v.substring(8, 10) + ":" +
        v.substring(10, 12) + ":" +
        v.substring(12, 14);
};

/**
 * 将时间字符串格式化成数字串形式的字符串
 * 2016/09/01 14:21:25 -> 20160901142125
 * @param v
 */
Utils.formatDT2DT = function(v){
    return v.replace(/\//g, '').replace(/:/g, '').replace(/ /g, '');
};

/**
 * 将时间转换成字符串
 * @param v Date
 * @returns {string} 20160901142125
 */
Utils.parseDTString = function(v){
    var date = new Date(v);
    return date.getFullYear() +
        this.zeroNum(date.getMonth() + 1) +
        this.zeroNum(date.getDate()) +
        this.zeroNum(date.getHours()) +
        this.zeroNum(date.getMinutes()) +
        this.zeroNum(date.getSeconds());
};

/**
 * 将小于10的数字前加0
 * @param v
 * @returns {string}
 */
Utils.zeroNum = function (v) {
    return v < 10 ? "0" + v : v + "";
};

/**
 * 格式化数字
 * @param v
 */
Utils.formatNum = function(v){
    var num = (v || 0).toString(), result = '';
    while(num.length > 3){
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if(num){
        result = num + result;
    }
    return result;
};

/**
 * 显示加载框
 * @param message
 */
Utils.loading = function (message) {
    if (typeof(message) == 'undefined') {
        message = '操作正在进行，请稍等...';
    }
    $('.loading-info span').text(message);
    $('.loading').show();
};

/**
 * 隐藏加载框
 */
Utils.unloading = function () {
    setTimeout(function(){
        $('.loading').hide();
    },100);
};

Utils.notifySuccess = function(message, title){
    toastr.success(message, title);
};

Utils.notifyError = function(message, title){
    toastr.error(message, title);
};

Utils.notifyWarning = function(message, title){
    toastr.warning("<span style='color:red'>"+message+"</span>", title);
};


/**
 * 正则验证车牌号是否合法
 */
Utils.isVehicleNumber = function(vehicleNumber) {
    var result = false;
    if (vehicleNumber.length == 7){
      var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
      result = express.test(vehicleNumber);
    }
    return result;
}

/**
 * img  当照片无法解析的时候 显示无图片
 */
Utils.showErrorImg = function(){
	console.log("here");
	var img = event.srcElement;
	img.src =basePath + '/static/images/notshow.jpeg';
	img.width = 450 ;
	img.height = 300 ;
	img.onerror = null;
};


/**
 * 米转经纬度度数
 */
Utils.meterToRadius = function(meter){
	return meter / (2 * Math.PI * 6378137.0) * 360;
}

/**
 * AJAX
 * @param url
 * @param data
 * @param callback
 */
Utils.ajax = function (url, data, callback, loading, errorCallback) {
    if(loading) Utils.loading();
    if(data){
        data.rt = 'json';
    }
    $.ajax({
        type: 'post',
        url: url,
        dataType: 'json',
        data: data,
        success: function (result) {
            if (result.code == 200) {
                if (callback)
                    callback(result.data);
            } else {
                if(errorCallback){
                    errorCallback();
                }
                if (result.code == 1001) {
                    //登录超时
//                    bootbox.alert({
//                        size: 'small',
//                        message: '登录超时，点击确定重新登陆系统',
//                        callback: function () {
//                            location.reload();
//                        }
//                    });
                    Utils.notifyWarning(result.data.errors, '<span style="color:red">提示</span>');
                } else {
                    Utils.notifyWarning(result.data.errors, '<span style="color:red">提示</span>');
                }
            }
        },
        error: function (msg) {
            if(errorCallback){
                errorCallback();
            }
            Utils.notifyError('网络异常', '错误');
        },
        complete: function () {
            if(loading)  Utils.unloading();
        }
    });
};


/** 
* 
* @param hex 例如:"#23ff45" 
* @param opacity 透明度 
* @returns {string} 
*/ 
Utils.hexToRgba = function(hex, opacity) { 
	return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"; 
}
