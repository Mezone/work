<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/12/12 0012
  Time: 下午 4:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<style>

    .tickets-container .tickets-list .ticket-item{
        position:relative;
        background-color:#fff;
        -webkit-box-shadow:0 0 3px rgba(0,0,0,.2);
        -moz-box-shadow:0 0 3px rgba(0,0,0,.2);
        box-shadow:0 0 3px rgba(0,0,0,.2);
        -webkit-border-radius:3px;
        -webkit-background-clip:padding-box;
        -moz-border-radius:3px;
        -moz-background-clip:padding;
        border-radius:3px;
        background-clip:padding-box;
        margin-bottom:8px;
        padding:0 15px;
        vertical-align:top;
        cursor: pointer;
    }
    .tickets-container .tickets-list .ticket-item:last-child{margin-bottom:0}
    .tickets-container .tickets-list .ticket-item .ticket-user{height:50px;padding:10px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}
    .tickets-container .tickets-list .ticket-item .ticket-user .user-name{margin-left:5px;font-size:13px}
    .tickets-container .tickets-list .ticket-item .ticket-user:hover { background-color: #e6e6e6}
    .tickets-container .tickets-list .ticket-item .ticket-time i{color:#ccc}
    .tickets-container .tickets-list .ticket-item .ticket-state i{font-size:13px;color:#fff;line-height:20px}
    @media(max-width:1200px){
        .tickets-container .tickets-list .ticket-item .ticket-user{border-bottom:1px solid #eee}
    }


    .header-avatar {
        width: 125px;
        height: 125px;
        -webkit-border-radius: 50%;
        -webkit-background-clip: padding-box;
        -moz-border-radius: 50%;
        -moz-background-clip: padding;
        border-radius: 50%;
        background-clip: padding-box;
        border: 5px solid #f5f5f5;
        -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        -moz-box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        margin: 10px auto;
    }

     .yjdjoperate{
        width: 50px;
        height: 50px;
        line-height: 50px;
        font-size: 24px;
        text-align: center;
        background-image: linear-gradient(to bottom,#eee 0,#fbfbfb 100%);
        z-index: 100;
        -webkit-border-radius: 50%;
        -webkit-background-clip: padding-box;
        -moz-border-radius: 50%;
        -moz-background-clip: padding;
        border-radius: 50%;
        background-clip: padding-box;
        box-shadow: 0 1px 6px rgba(0,0,0,.175);
        color: #444;
         cursor: pointer;
    }

    .bg-themeprimary {
        background-color: #2dc3e8!important;
    }


    .listview:not(.lv-lg):not(.lv-message) .lv-item {
        padding: 10px 20px;
    }

    @media (min-width: 480px) {
        .listview.lv-lg .lv-item {
            padding: 17px 35px 17px 25px;
        }
    }

    @media (max-width: 767px) {
        .listview.lv-lg .lv-item {
            padding: 17px 35px 17px 20px;
        }
    }

    .listview.lv-lg .lv-item:hover {
        background-color: #FFFFDB;
    }

    .listview .lv-item {
        position: relative;
        display: block;
        -webkit-transition: background-color;
        -o-transition: background-color;
        transition: background-color;
        -webkit-transition-duration: 300ms;
        transition-duration: 300ms;
    }

    .listview .lv-item .lv-small {
        font-size: 12px;
        color: #A9A9A9;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        width: 100%;
    }

    .listview .lv-item .checkbox,
    .listview .lv-item.media {
        margin: 0;
    }

    .listview .lv-item .lv-actions {
        position: absolute;
        right: 15px;
        top: 10px;
    }

    @media (max-width: 480px) {
        .listview .lv-item .lv-actions {
            right: 7px;
        }
    }

    .listview .lv-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
    }

    .listview a.lv-item:hover {
        background: #ECF9FF;
    }

    .listview [class*="lv-img"] {
        border-radius: 50%;
    }

    .listview .lv-img {
        width: 48px;
        height: 48px;
    }

    .listview .lv-img-sm {
        width: 35px;
        height: 35px;
    }

    .listview.lv-bordered .lv-item:not(:last-child) {
        border-bottom: 1px solid #f0f0f0;
    }

    .listview .lv-attrs {
        list-style: none;
        padding: 0;
        margin: 5px 0 0 0;
    }

    .listview .lv-attrs > li {
        display: inline-block;
        padding: 2px 10px 3px;
        font-size: 12px;
        margin-top: 5px;
        margin-right: 2px;
    }

    .listview .lv-attrs > li:not(.info):not(.primary):not(.warning):not(.danger) {
        border: 1px solid #dedede;
        background: #ffffff;
        color: #5e5e5e;
    }

    .listview .lv-attrs > li.info {
        border: 1px solid #00bcd4;
        background: #00bcd4;
        color: #ffffff;
    }

    .listview .lv-attrs > li.primary {
        border: 1px solid #2196f3;
        background: #2196f3;
        color: #ffffff;
    }

    .listview .lv-attrs > li.warning {
        border: 1px solid #ff9800;
        background: #ff9800;
        color: #ffffff;
    }

    .listview .lv-attrs > li.danger {
        border: 1px solid #f44336;
        background: #f44336;
        color: #ffffff;
    }

    .listview .lv-attrs > li > a {
        display: block;
    }

    .listview:not(.lv-message) .lv-title {
        color: #000;
    }

    [class*="lv-img"] {
        border-radius: 50%;
    }

    .lv-img {
        width: 48px;
        height: 48px;
    }




    .lv-message .lv-item.right {
        text-align: right;
    }

    .lv-message .lv-item.right .lv-avatar {
        margin-right: 0;
        margin-left: 15px;
    }

    .lv-message .lv-item:not(.right) .ms-item {
        background: #ffc107;
        color: #fff;
    }

    .lv-message .lv-item.right .ms-item {
        background: #eee;
    }

    .lv-avatar {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        color: #FFF;
        text-align: center;
        line-height: 34px;
        font-size: 15px;
        margin-right: 15px;
        padding: 0 !important;
        text-transform: uppercase;
    }

    .lv-avatar > img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        vertical-align: top;
    }

    .ms-item {
        padding: 13px 19px 15px;
        border-radius: 2px;
        display: inline-block;
    }

    @media (min-width: 768px) {
        .ms-item {
            max-width: 70%;
        }
    }

    .ms-date {
        display: block;
        color: #B3B3B3;
        margin-top: 7px;
    }

    .ms-date > i {
        font-size: 14px;
        vertical-align: bottom;
        line-height: 100%;
    }

    .ms-reply {
        position: relative;
        margin: 0 !important;
    }

    .ms-reply textarea {
        width: 100%;
        font-size: 13px;
        border: 0;
        padding: 10px 8px;
        resize: none;
        height: 60px;
    }

    .ms-reply a {
        position: absolute;
        top: 0;
        right: 0;
        border: 0;
        height: 100%;
        font-size: 25px;
    }

</style>
<div>
    <div class="col-lg-4 col-sm-4 col-xs-12" style="padding-left: 0px; padding-right: 0px;">
        <div class="tabbable">
            <ul class="nav nav-tabs nav-justified" id="myTab5">
                <li class="active">
                    <a data-toggle="tab" href="#home5">
                        单位
                    </a>
                </li>

                <li class="tab-red ">
                    <a data-toggle="tab" href="#profile5">
                        任务组
                    </a>
                </li>

            </ul>

            <div class="tab-content">
                <div id="home5" class="tab-pane active">
                    <ul id="yjdjry_tree" class="ztree" style="height: 319px;overflow-y: auto"></ul>
                </div>

                <div id="profile5" class="tab-pane ">
                    <div class="tickets-container">
                        <ul class="tickets-list" id="yjdj-rwlist-ul" style="padding-left: 0px;padding-top: 5px; ">
                            <li class="ticket-item">
                                <div class="row">
                                    <div class="ticket-user col-lg-12 col-sm-12">
                                        <span class="user-name">8月31号任务群组</span>
                                    </div>
                                </div>
                            </li>
                            <li class="ticket-item">
                                <div class="row">
                                    <div class="ticket-user col-lg-12 col-sm-12">
                                        <span class="user-name">5月15号任务群组</span>
                                    </div>
                                </div>
                            </li>
                            <li class="ticket-item">
                                <div class="row">
                                    <div class="ticket-user col-lg-12  col-sm-12">
                                        <span class="user-name">4月22号任务群组</span>
                                    </div>
                                </div>
                            </li>
                            <li class="ticket-item">
                                <div class="row">
                                    <div class="ticket-user col-lg-12 col-sm-12">
                                        <span class="user-name">3月11号任务群组</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    </div>
    <div class="col-lg-8 col-sm-8 col-xs-12" style="padding-left: 0px; padding-right: 0px;">
        <div id="yjdj-ryxx" class="col-lg-12 col-md-12 col-sm-12" style="display: none;">
            <div class="col-lg-12 col-md-12 col-sm-12 text-center">
                <img src="https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=33e1b6209616fdfad86cc1e88cb4eb69/a08b87d6277f9e2f930650031430e924b899f38e.jpg" alt="" class="header-avatar">
            </div>
            <div class="contact-info text-center">
                <p>
                    姓名: 张三
                    <br>
                    单位: 河海派出所
                </p>
                <p>
                    电话: +1 1 2345 6789
                    <br>
                    手机: +1 9 876 5432
                    <br>
                    呼号: +1 9 876 5432
                </p>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 text-center">

                <i class="fa fa-microphone orange yjdjoperate"></i>
                &nbsp;&nbsp;
                <i name="openchat" class="fa  fa-comment-o orange yjdjoperate"></i>
                &nbsp;&nbsp;
                <i class="fa  fa-video-camera orange yjdjoperate"></i>
            </div>
        </div>

        <div id="yjdj-rwxx"  class="col-lg-12 col-md-12 col-sm-12" style="display: none;">
             <div class="contact-info text-center">
                <p>
                   任务名称: 8月31号任务
                    <br>
                    任务时间: 2017-08-31 08:00:00
                </p>
                <p>
                    指挥长: 张三
                    <br>
                    手机: +1 9 876 5432
                    <br>
                    电话: +1 9 876 5432
                </p>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 text-center">
                <i name="openchat" class="fa  fa-comment-o orange yjdjoperate"></i>
            </div>
        </div>

        <div  id="yjdj-chat" class="widget flat radius-bordered"  style="margin: 0px 1px 2px 2px;display: none">
            <div class="widget-header bg-themeprimary">
                <span class="widget-caption">消息</span>
            </div>

            <div class="widget-body"  style="padding: 0px;">
                <div class="widget-main ">
                    <div class="listview lv-message">


                        <div class="lv-body" style="height:250px;overflow-y: auto">
                            <div class="lv-item media">

                                <div class="media-body">
                                    <div class="ms-item">
                                        车次即将到达指定地点，请做好准备
                                    </div>
                                    <small class="ms-date"><i class="zmdi zmdi-time"></i> 20/02/2015 at 09:00</small>
                                </div>
                            </div>

                            <div class="lv-item media right">

                                <div class="media-body">
                                    <div class="ms-item">
                                        收到
                                    </div>
                                    <small class="ms-date"><i class="zmdi zmdi-time"></i> 20/02/2015 at 09:30</small>
                                </div>
                            </div>

                            <div class="lv-item media">

                                <div class="media-body">
                                    <div class="ms-item">
                                        下一步计划上报
                                    </div>
                                    <small class="ms-date"><i class="zmdi zmdi-time"></i> 20/02/2015 at 09:33</small>
                                </div>
                            </div>

                            <div class="lv-item media right">

                                <div class="media-body">
                                    <div class="ms-item">
                                       收到
                                    </div>
                                    <small class="ms-date"><i class="zmdi zmdi-time"></i> 20/02/2015 at 10:10</small>
                                </div>
                            </div>

                            <div class="lv-item media">

                                <div class="media-body">
                                    <div class="ms-item">
                                        车辆离开
                                    </div>
                                    <small class="ms-date"><i class="zmdi zmdi-time"></i> 20/02/2015 at 10:24</small>
                                </div>
                            </div>
                        </div>

                        <div class="lv-footer ms-reply">
                            <textarea placeholder="What's on your mind..."></textarea>

                            <a href="javascript:void(0);" class="btn btn-info shiny">发送</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<SCRIPT type="text/javascript">
    var yjdjNodes =[
        { id:1, pId:0, name:"常州市公安局", open:true},
        { id:11, pId:1, name:"新北区"},
        { id:111, pId:11, name:"河海派出所"},
        { id:1111, pId:111, name:"人员1"},
        { id:1112, pId:111, name:"人员2"},
        { id:112, pId:11, name:"三井派出所"},
        { id:113, pId:11, name:"青龙派出所"},
        { id:12, pId:1, name:"天宁区"},
        { id:121, pId:12, name:"河海派出所"},
        { id:122, pId:12, name:"三井派出所"},
        { id:123, pId:12, name:"青龙派出所"},
        { id:13, pId:1, name:"钟楼区"},
        { id:131, pId:13, name:"河海派出所"},
        { id:132, pId:13, name:"三井派出所"},
        { id:133, pId:13, name:"青龙派出所"}
    ];

    var setting = {
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: onClickYjdjTree
        }
    };

    $(document).ready(function(){
        $.fn.zTree.init($("#yjdjry_tree"), setting, yjdjNodes);
    });

    function onClickYjdjTree(event, treeId, treeNode, clickFlag){
        $("#yjdj-ryxx").css({"display": "block"});
        $("#yjdj-rwxx").css({"display": "none"});
        $("#yjdj-chat").css({"display": "none"});
    }

    $("#yjdj-rwlist-ul li").click(function(){
        $("#yjdj-ryxx").css({"display": "none"});
        $("#yjdj-rwxx").css({"display": "block"});
        $("#yjdj-chat").css({"display": "none"});

    });
    $("i[name='openchat']").click(function(){
        $("#yjdj-ryxx").css({"display": "none"});
        $("#yjdj-rwxx").css({"display": "none"});
        $("#yjdj-chat").css({"display": "block"});
    });
</SCRIPT>