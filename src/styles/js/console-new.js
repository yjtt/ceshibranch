$(function(){
	//header的点击效果
	$(".frame-menu-left>.menu-dropdown").click(function(e){
		$(".dropdown-menu").not($(".dropdown-menu").eq($(this).index()-2)).hide().siblings().removeClass('console-topbar-btn-click')
		$(".dropdown-menu").eq($(this).index()-2).toggle().siblings().toggleClass('console-topbar-btn-click')
		//$(this).children('a').toggleClass('console-topbar-btn')
		$(document).click(function(e){
			$(".dropdown-menu").hide()
			$(".frame-menu-left>.menu-dropdown").children('a').addClass('console-topbar-btn').removeClass('console-topbar-btn-click')
		})
		 e.stopPropagation();
	})
	$(".frame-menu-right .menu-dropdown").click(function(e){
		$(".frame-menu-right .menu-dropdown>ul").not($(this).children('ul')).hide()

		$(this).children('ul').toggle()
		$(document).click(function(){
			$(".frame-menu-right .menu-dropdown>ul").hide()
		})
		 e.stopPropagation();
	})

	// 资源池平铺
	function docuZy(){
		$(".console-topbar-btn").addClass('dis-inline')
		$(".console-topbar-btn-click").removeClass('dis-inline')
	}
	$(".console-menu-region").click(function(e){
		$(this).children('a').toggleClass('dis-inline')
		$(document).click(function(){
			docuZy()
		})
		 e.stopPropagation();
	})
	$(".sub-region-name-link").click(function(e){
	  	$('.region-tiled-submenu').show();
	  	var parentName = $(this).find('span').html();
	  	$('#parentName').html(parentName);
	  	
	  	$('.region-tiled-submenu').siblings().hide()
	  	$(document).click(function(){
			docuZy()

		})
		 e.stopPropagation();
  	})
  	$(".submenu-back").click(function(e){
  		$('.region-tiled-submenu').hide()
  		$('.region-tiled-submenu').siblings().show()
  		$(document).click(function(e){
			docuZy()
		})
		 e.stopPropagation();
  	})
	//帮助中心的hover效果
	$(".console-topbar-btn-help").hover(function(){
		$(this).children(".coM_hellp").stop().toggle()
	})
	//其他节点的hover效果
	$(".console-topbar-btn-oldConsole").hover(function(){
		$(".frame-dropdown-tinyTip").toggle()
	})
	//控制中心的tab切换
	$(".home-submenu-items>li").click(function(){
		$(".home-submenu-items>li").removeClass("curr")
		$(this).addClass('curr')
		$(".home-responsive-screen>div").eq($(this).index()).removeClass('con-hide')
		$($(".home-responsive-screen>div").eq($(this).index()).siblings().addClass('con-hide'))
	})
	//控制台tab切换
	/*$(".ti-leftmenu-level1").click(function(){
		$(".service-content-view").addClass('ng-hide')
		$(".service-content-view").eq($(this).index()-1).removeClass('ng-hide')
	})*/
	//云硬盘备份的tab切换
	$(".ti-tabs>li").click(function(){
		$(".ng-isolate-scope").removeClass("ti-tab-active")
		$(this).addClass("ti-tab-active")
		$(".coM_table").css("display","none")
		$(".ecsVmDetailVolumesDiv").css("display","none")
		$(".coM_table").eq($(this).index()).css("display","block")
		$(".ecsVmDetailVolumesDiv").eq($(this).index()).css("display","block")
	})
	//弹性云主机提示语点击关闭
	$(".frame-cloud-close").click(function(){
		$(this).parent().parent().hide()
	})
	//弹性云主机所有运行状态
	$(".coM-state_act").click(function(e){
		$(this).find('.coM_running-state').toggle()
		$(this).find('.coM-label-selected').toggle()
		$(this).children().eq(0).toggleClass("ti-select-container-down")
		name()
		$(document).click(function(){
			state()
		})
		 e.stopPropagation();

	})
	//刷新hover效果
	$(".coM_Refresh").hover(function(){
		$(this).children().children().eq(1).stop(true).toggle()
	})
	//下拉菜单更换内容
	$(".coM_running-state li").click(function(){
		$(this).parent().parent().prev().prev().html($(this).children().html())
		$(".coM_running-state li").removeClass('ti-dropdown-option-selected')
		$(this).addClass('ti-dropdown-option-selected')
	})
	//添加网卡的下拉菜单
	$(".coM-label-selected li").click(function(){
		$(this).find().toggleClass('ti-icon ti-icon-checkmark')
		$(this).parent().parent().prev().prev().children().after("<div class='ti-multiselect-box-cell ng-scope'><span class='ti-box-cell-key ng-binding'>"+$(this).children().next().html()+"</span><span class='ti-icon ti-icon-close ti-icon-close-staic'></span></div>")
		$(this).toggleClass('ti-dropdown-option-selected')
		$(".coM_ct-aq").children().addClass('ti-select-container-down')
	})
	function state(){
		$(".coM_running-state").hide()
		$(".coM-label-selected").hide()
		$(".coM-state_act").children().removeClass('ti-select-container-down')
	}

	//收藏hover
	$(".collection").hover(function(){
		$(this).next().stop(true).toggle()
	})
	//弹性云主机下名称下拉菜单
	$(".coM_name").click(function(e){
		$(".coM_select-name").toggle()
		$(this).toggleClass("ti-select-container-focused")
		state()
		$(document).click(function(){
			name()
		})
		 e.stopPropagation();
	})
	function name(){
		$(".coM_select-name").hide()
		$(".coM_name").removeClass('ti-select-container-focused')
	}
	$(".coM_ul li").click(function(){
		$(this).parent().parent().prev().children().eq(0).html($(this).children().html())
		$(".coM_ul li").removeClass('ti-dropdown-option-selected')
		$(this).addClass('ti-dropdown-option-selected')

		$(".coM_select-name").toggle()
		$('.coM_name').toggleClass("ti-select-container-focused")
	})
	//弹性云主机跳转详情
	$(".coM_target").click(function(){
		$("#vmList").parent().parent().prev().show()
		$("#vmList").parent().parent().hide()
	})
	//云硬盘备份-备份表格下拉效果
	$(".ti-odd-tr *[details-icon-column]").click(function(){
		$(this).parent().next().toggle()
		$(this).children().children().toggleClass("ti-icon-angle-transform-up-thin")
	})
		$("#ebsDiv").on('click',".ti-accordion-panel",function(){
			$(this).next().slideToggle()
			$(this).find(".ti-icon").toggleClass("ti-icon-angle-transform-up")
		})
		$("#ipList").on('click',".ti-accordion-panel",function(){
			$(this).next().slideToggle()
			$(this).find(".ti-icon").toggleClass("ti-icon-angle-transform-up")
		})
	//全选
	$(".coM_select").click(function(){
		if(this.checked==true){
			$("*[ti-checkbox]").each(function(){
				this.checked=true
			})
		}else{
			$("*[ti-checkbox]").each(function(){
				this.checked=false
			})
		}
	})
	
	//弹性云主机更多下拉
	$(".coM_more").click(function(e){
		$(".coM_more").not($(this)).parent().next().hide()
		$(this).parent().next().toggle()
		$(document).click(function(e){
			
			$(".coM_more").parent().next().hide()

		})
		 e.stopPropagation();
	})
	//页码显示条数
	$(".ti-page-size-option").click(function(e){
		$(this).toggleClass("ti-select-container-focused")
		$(this).toggleClass("ti-select-container-down")
		$(this).children().next().next().toggle()
		$(document).click(function(e){
			$(".ti-page-size-option").children().next().next().hide()
			$(".ti-page-size-option").removeClass('ti-select-container-focused')
			$(".ti-page-size-option").removeClass("ti-select-container-down")
		})
		 e.stopPropagation();
	})
	$(".coM_page-num li").click(function(){
		$(this).parent().parent().parent().children().eq(0).html($(this).children().html())
		$(".coM_page-num li").removeClass("ti-dropdown-option-selected")
		$(this).addClass("ti-dropdown-option-selected")
	})
	//帮助图标的hover
	$(".cti-helpTip-icon").hover(function(){
		$(this).children().toggle()
	})
	//备份策略名称hover
	$(".coM_names-hover").hover(function(){
		$(this).children().children(".ti-tooltip").stop(true).toggle()
	})
	//日历
	$(".ti-icon-calendar").click(function(e){
		$(this).parent().next().show()
		$(".ti-date-picker").click(function(e){

			$(document).click(function(e){
				$(".ti-icon-calendar").parent().next().hide()
			})
			 e.stopPropagation();
		})
		$(document).click(function(e){
			$(".ti-icon-calendar").parent().next().hide()
		})
		 e.stopPropagation();
	})
	$(".ti-date-picker-footer-right>.ti-date-picker-footer-btn").click(function(){
		$(".ti-icon-calendar").parent().next().hide()
	})
	$(".ti-date-picker-table .ti-date-default-day").click(function(){
		$(".ti-date-picker-table .ti-date-default-day").removeClass("ti-date-current-day")
		$(this).addClass("ti-date-current-day")
		
	})
	//日历月份下拉
	$(".ti-date-picker-year-month").click(function(){
		$(this).parent().toggleClass("ti-header-year-month-picker-expand")
		$(this).siblings().toggle()
	})
	//日历选择年月
	$(".ti-header-month-default-state").click(function(){
		$(this).addClass("ti-date-picker-selected-year-month")
		$(this).siblings().removeClass("ti-date-picker-selected-year-month")
	})
	//监控下的选择时间
	$(".ti-btn-group>.ti-btn-item-container").click(function(){
		$(this).addClass("ti-active")
		$(this).siblings().removeClass("ti-active")
	})
	function setAll(_this){
		var This=_this.parent().parent().parent()
		if(!$(".ng-pristine").checked){
			This.parent().find(".coM_select").prop("checked",false); // 子复选框某个不选择，全选也被取消
		}
		var choicelength=This.find(".ng-pristine").length;

		var choiceselect=This.find(".ng-pristine:not(:disabled):checked").length;
		if(choicelength==choiceselect){
			This.parent().find(".coM_select").prop("checked",true); 
		}
	}
	$(".ng-pristine").click(function(){
		setAll($(this))
	})
	//当页面滚动时更多效果消失页码数效果消失
	$(document).scroll(function(){
		$(".ti-page-size-option").removeClass("ti-select-container-focused")
		$(".ti-page-size-option").removeClass("ti-select-container-down")
		$(".ti-page-size-option").children().next().next().hide()
		$(".coM_more").parent().next().hide()
	})	
	//标签搜索的下拉
	$(".advanced-search button").click(function(){
		$(this).toggleClass("cti-advancedSearch-btn-active")
		$(".cti-advancedSearch-panel").slideToggle()
		$(this).children().toggleClass("icon-cloud-action-double-fold")
	})
	
	
	//网卡开关
	$(".ti-switch").click(function(){
		$(this).toggleClass('ti-switch-off')
	})
	
  function getMaxValue(arr){
  	var a=arr[0]
  	for(var k in arr){
  		a=arr[k]
  	}
  	return a;
  }
  $('.ti-modal-dialog').each(function(index){
  		// $(this).width($(this).parent().width())
			$(this).myDrag({
				parent:".vms_Box",
				randomPosition:false,
				direction:'all',
				handler:'.ti-modal-header'
				
			});
		});

})
  
