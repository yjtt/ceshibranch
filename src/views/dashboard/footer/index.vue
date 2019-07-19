<template>
	<div class="footer">
		<div id="service-footer" class="container-fluid ng-scope" style="left: 0px;">
		<div id="console-top-footer" class="console-top-footer common-page-footer frame-small-font-size ng-scope">
    		<div id="footer" class="footer-copyright-content common-link-inherit-color console-content-padding common-content-screen">
		        <div class="dropup pull-left">
		            <a class="console-footer-btn dropdown-toggle console-footer-btn-dropdown" >
		                <span class="hwsicon-frame-image-footer-earth"></span>
		                <span class="padding-left-20 ng-binding">中文（简体）</span>
		            </a>
		            <ul class="dropdown-menu dropdown-menu-language common-dropdown-menu common-font-size-common">
		                <!-- ngRepeat: languageArr in supportLanguage --><!-- ngIf: languageArr[0] !== language --><!-- end ngRepeat: languageArr in supportLanguage -->
		            </ul>
		        </div>

        		<div class="pull-right ng-scope" ng-if="localizationConfig.footerContentSwitch">
            		<span class="margin-left-3 pull-left margin-right4 ng-binding ng-scope" >©2018中国电信股份有限公司云计算分公司版权所有&nbsp;&nbsp;京ICP备&nbsp;12022551号&nbsp;&nbsp;增值电信业务经营许可证A2.B1.B2-20090001</span>
            		<div class="pull-left console-footer-vertical-line ng-scope"></div>
            		<a class="console-footer-btn pull-left user-application-a-no-outline ng-binding ng-scope" target="_blank" href="http://www.ctyun.cn/">天翼云首页</a>

                    <div class="pull-left console-footer-vertical-line ng-scope"></div>
                    <a class="console-footer-btn pull-left user-application-a-no-outline ng-binding ng-scope" target="_blank" href="http://www.ctyun.cn/terms">用户协议</a>

           			<div class="pull-left console-footer-vertical-line ng-scope"></div>
           			<a class="console-footer-btn pull-left user-application-a-no-outline ng-binding ng-scope" target="_blank" href="http://www.ctyun.cn/law">法律声明</a>
        		</div>
    		</div>
		</div>
	</div>
	<div class="ti-tooltip ti-tooltip-bottom frame-dropdown-tinyTip old-console-tips" style="left: 949px; top: 49px;">
		<div class="ti-tooltip-content" style="max-height: 92.5px; overflow-y: auto; padding: 1px;">跳转到其他节点
		</div>
		<div class="ti-tooltip-bottom-sqr"></div>
	</div>
	<div class="ti-tooltip ti-tooltip-bottom-right" style="top: 61px; right: 30px;">
		<div class="ti-tooltip-content" style="max-height: 92.5px; overflow-y: auto; padding: 1px;">帮助中心
		</div>
		<div class="ti-tooltip-bottom-right-sqr"></div>
	</div>
	</div>
</template>

<script>
	
</script>

<style>
	.footer {
		/*z-index:100005;*/
		/*background-color: #000;*/
	}
</style>
