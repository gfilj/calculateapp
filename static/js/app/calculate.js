// 初始化
mui.init({
	keyEventBind : {
		backbutton : false,
		menubutton : false
	}
});
// 所有方法都放到这里
mui.plusReady(function(){
	window.addEventListener('calculateItem', calculateItemHandler);
	
	qiao.on('.addNumberBtn', 'tap', addNumberItem);
});

// 展示计算页面
function calculateItemHandler(event){
	qiao.h.indexPage().evalJS("showBackBtn();");
	qiao.h.update(db, 'create table if not exists t_number_detail (id, plan_number)');
	var calculateid = event.detail.itemid;
	$('p').text(calculateid);
	qiao.h.show('calculate', 'slide-in-left', 300);
	/*var sql = 'select * from t_plan_day_todo where id=' + detailId;
	qiao.h.query(db, sql, function(res){
		if(res.rows.length > 0){
			var data = res.rows.item(0);
			$('#detailTitle').text(data.plan_title);
			$('#detailContent').html(data.plan_content);
			
			qiao.h.show('detail', 'slide-in-right', 300);
		}
	});*/
}

function addNumberItem(event){
	var sql  = 'insert into t_number_detail (id, plan_number) values (' + $.trim($('p').text()) + ', ' + $.trim($('#addNumber').val()) + ')';
	console.log(sql);
	qiao.h.update(db, sql);
}
