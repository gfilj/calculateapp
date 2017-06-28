// 初始化
mui.init({
	keyEventBind : {
		backbutton : false,
		menubutton : false
	}
});

// 所有方法都放到这里
mui.plusReady(function(){
	window.addEventListener('detailItem', detailItemHandler);
});

// 展示待办事项
function detailItemHandler(event){
	qiao.h.indexPage().evalJS("showBackBtn();");

	var detailId = event.detail.id;
	var sql = 'select * from t_plan_day_todo where id=' + detailId;
	
	
	
	qiao.h.query(db, sql, function(res){
		if(res.rows.length > 0){
			var data = res.rows.item(0);
			$('#detailTitle').text(data.plan_title);
			$('#detailContent').html(data.plan_content);
			
			qiao.h.show('detail', 'slide-in-right', 300);
		}
	});
	
	var sqlNumber = 'select * from t_number_detail where id=' + detailId;
	console.log(sqlNumber);
	var numberArr = new Array();
	qiao.h.query(db, sqlNumber, function(resNumer){
		if(resNumer.rows.length > 0){
			for (i = 0; i < resNumer.rows.length; i++) {
				numberArr.push(resNumer.rows.item(i).plan_number);
			}		
		};
		$('#detailNumberContent').html(numberArr.join("-"));
	});
	
}