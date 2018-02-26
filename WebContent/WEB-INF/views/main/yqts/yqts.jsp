<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/12/12 0012
  Time: 下午 4:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div style="padding: 1px">
    <div class="tabbable" style="padding-top: 2px">
        <ul class="nav nav-tabs nav-justified" id="myTab5">
            <li class="active">
                <a data-toggle="tab" href="#home5">

                    网络舆情
                </a>
            </li>

            <li class="tab-red ">
                <a data-toggle="tab" href="#profile5">
                    情报舆情
                </a>
            </li>

        </ul>

        <div class="tab-content">
            <div id="home5" class="tab-pane active">
                <table class="table table-condensed table-striped">
                    <tbody>
                    <tr>
                        <td class="padding-left-10">
                            1
                        </td>
                        <td>
                            <span style="color: green">
                                【正面舆情】测试舆情信息
                            </span>

                        </td>

                    </tr>
                    <tr>
                        <td class="padding-left-10">
                            2
                        </td>
                        <td>
                             <span style="color: red">
                                【负面】测试舆情信息
                            </span>

                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>

            <div id="profile5" class="tab-pane ">
                <table class="table table-condensed table-striped">
                <tbody>
                <tr>
                    <td class="padding-left-10">
                        1
                    </td>
                    <td>
                       测试舆情信息
                    </td>

                </tr>
                <tr>
                    <td class="padding-left-10">
                        2
                    </td>
                    <td>
                        测试舆情信息
                    </td>
                </tr>

                </tbody>
                </table>
            </div>
        </div>
    </div>
    <div  style="position: absolute;bottom: 2px;left: 10px">
        舆情信息需要与舆情系统对接
    </div>

</div>