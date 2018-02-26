/**
 * Created by Administrator on 2017/1/11.
 */
var module = {};

/**
 * 模块控制器
 */
module.control = (function(){

    var _f_ = {};

    /**
     * 添加模块
     * @param moduleId
     * @param moduleBelong
     * @param moduleName
     * @param closeable
     */
    _f_.add = function(moduleId,moduleBelong, moduleName, closeable){
        var li = '<li module-id="' + moduleId +'" module-belong="'+moduleBelong+'" closeable="' + closeable + '"><span>' + moduleName + '</span>';
        if(closeable !== undefined && closeable == 'true'){
            li += '<a href="javascript:;" class="close-btn" title="关闭"><i class="fa fa-trash-o"></i></a>';
        }
        li += '</li>';
        $('#module-list').append(li);
        var mDiv = '<div id="module-' + moduleId + '" class="tabs-pane"></div>';
        $('#tabs-modules').append(mDiv);
        _f_.selected(moduleId);
    };

    /**
     * 选择模块
     * @param moduleId
     */
    _f_.selected = function(moduleId){
        var mbar = $('#module-list li[module-id=' + moduleId + ']');
        var mbel = $('#module-list li[module-id=' + moduleId + ']').attr('module-belong');
        if(!mbar.hasClass('active')){
            $('.module-menu').css('color','white');
            $('.menu-dropdown').css('color','white');
            $('#module-list li').removeClass('active');
            mbar.addClass('active');
            $('.module-menu[module-id='+moduleId+']').css('color','#2b84ea');
            $('.menu-dropdown[module-belong='+mbel+']').css('color','#2b84ea');
            $('.tabs-pane').removeClass('active');
            $('#module-' + moduleId).addClass('active');
        }
    };

    /**
     * 关闭一个模块
     * @param moduleId
     */
    _f_.close = function(moduleId){
        var mbar = $('#module-list li[module-id=' + moduleId + ']');
        var mbel = $('#module-list li[module-id=' + moduleId + ']').attr('module-belong');
        if(mbar.hasClass('active')){
            $('.module-menu').css('color','white');
            $('.menu-dropdown[module-belong='+mbel+']').css('color','white');
            var pmbar = mbar.prev();
            var pmid = pmbar.attr('module-id');
            var pbel=pmbar.attr('module-belong');
            pmbar.addClass('active');
            $('.module-menu[module-id='+pmid+']').css('color','#2b84ea');
            $('.menu-dropdown[module-belong='+pbel+']').css('color','#2b84ea');
            $('#module-' + pmid).addClass('active');
        }
        mbar.remove();
        $('#module-' + moduleId).remove();
        delete module[moduleId];
    };

    /**
     * 加载模块
     * @param moduleId
     * @param callback
     */
    _f_.open = function(moduleId,moduleBelong, moduleName, moduleUrl, closeable, callback){
        var module = $('#module-list li[module-id=' + moduleId + ']');
        if(module.length > 0){
            _f_.selected(moduleId);
            if(callback) callback();
        }else{
            _f_.add(moduleId,moduleBelong, moduleName, closeable);
            $('#module-' + moduleId).load(moduleUrl, {rt: 'json'}, function(response, status){
                if(status == 'success'){
                    $.getScript(basePath + '/static/js/modules/'+ moduleBelong + '/' + moduleId + '.js', function(){
                        if(callback){
                            callback();
                        }
                    });
                }else {
                    //登录超时
                    bootbox.alert({
                        size: 'small',
                        message: '登录超时，点击确定重新登陆系统',
                        callback: function () {
                            location.reload();
                        }
                    });
                }
            });
        }
    };

    /**
     * 调用模块
     * @param moduleId
     * @param moduleBelong
     * @param callback
     */
    _f_.call = function(moduleId,moduleBelong, callback){
        var module = $('#module-list li[module-id=' + moduleId + ']');
        if(module.length > 0){
            _f_.selected(moduleId);
            if(callback){
                callback();
            }
        }else{
            var menu = $('.module-menu[module-id=' + moduleId + ']');
            var moduleName = menu.find('span.menu-text').text();
            var moduleUrl = menu.attr('module-url');
            var closeable = menu.attr('closeable');
            _f_.open(moduleId,moduleBelong, moduleName, moduleUrl, closeable, callback);
        }
    };

    $('#module-list').on('click', 'li', function(){
        _f_.selected($(this).attr('module-id'));
    });

    $('#module-list').on('click', 'a.close-btn', function(e){
        e.stopPropagation();
        _f_.close($(this).parent().attr('module-id'));
    });

    $('#tabs-bar-left-btn').on('click', function(){
        var left = $('#tabs-container').scrollLeft();
        if(left > 0){
            left -= 80;
            if(left < 0){
                left = 0
            }
            $('#tabs-container').animate({
                scrollLeft: left + 'px'
            }, 100);
        }
    });

    $('#tabs-bar-right-btn').on('click', function(){
        var mbarsWidth = 0;
        $('#module-list li').each(function(){
            mbarsWidth += $(this).outerWidth(true);
        });
        var tabsContainerWidth = $('#tabs-container').width();
        if(mbarsWidth > tabsContainerWidth){
            var left = $('#tabs-container').scrollLeft();
            if(left + tabsContainerWidth < mbarsWidth){
                $('#tabs-container').animate({
                    scrollLeft: (left + 80) + 'px'
                }, 100);
            }
        }
    });

    $('#tabs-bar-close-other-btn').on('click', function(){
        $('#module-list li').each(function(){
            if(!$(this).hasClass('active')){
                var closeable = $(this).attr('closeable');
                if(closeable == 'true'){
                    var moduleId = $(this).attr('module-id');
                    _f_.close(moduleId);
                }
            }
        });
        $('#tabs-container').scrollLeft(0);
    });

    $('#tabs-bar-close-all-btn').on('click', function(){
        $('#module-list li').each(function(){
            var closeable = $(this).attr('closeable');
            if(closeable == 'true'){
                var moduleId = $(this).attr('module-id');
                _f_.close(moduleId);
            }
        });
        $('#tabs-container').scrollLeft(0);
    });

    /* 暴露的接口 */
    return {
        call: _f_.call,
        open: _f_.open
    }

})();

//菜单控制器
$('.module-menu').on('click', function(){
    var moduleId = $(this).attr('module-id');
    var moduleBelong=$(this).attr('module-belong');
    var moduleName = $(this).find('span.menu-text').text();
    var moduleUrl = $(this).attr('module-url');
    var closeable = $(this).attr('closeable');
    module.control.open(moduleId,moduleBelong, moduleName, moduleUrl, closeable);
});
//默认初始化主页
//module.control.call('home','main');