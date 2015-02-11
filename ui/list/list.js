// 初始化
mui.init();

// 所有的方法都放到这里
mui.plusReady(function(){
	initDb();
	initList();
	
	qiao.on('dela', 'tap', function(){
		qiao.h.update(db, 'delete from t_plan_day_todo where id=' + $(this).data('id'));
		initList();
		
		qiao.h.query(db, 'select max(id) mid from t_plan_day_done', function(res){
			var id = (res.rows.item(0).mid) ? res.rows.item(0).mid : 0;
			qiao.h.update(db, 'insert into t_plan_day_done (id, plan_title) values (' + (id+1) + ', "' + $(target).data('title') + '")');
		});
	});
});

// 初始化数据库
function initDb(){
	db = qiao.h.db();
//	qiao.h.update(db, 'drop table t_plan_day');
	qiao.h.update(db, 'create table if not exists t_plan_day_todo (id unique, plan_title, plan_content)');
}

// 初始化待办事项
function initList(){
	var $ul = $('#todolist').empty();
	qiao.h.query(db, 'select * from t_plan_day order by id desc', function(res){
		for (i = 0; i < res.rows.length; i++) {
			$ul.append(genLi(res.rows.item(i)));
		}

		showList($ul);
	});
}
function genLi(data){
	var li = 
		'<li class="mui-table-view-cell">' +
			'<div class="mui-slider-right mui-disabled">' + 
				'<a class="mui-btn mui-btn-green dela" data-id="' + data.id + '" data-title="' + data.plan_title + '">完成</a>' + 
			'</div>' + 
			'<div class="mui-slider-handle">' + 
				data.plan_title + 
			'</div>' + 
		'</li>';
		
	return li;
}
function showList(ul){
	if(ul.find('li').size() > 0 &&  ul.is(':hidden')) ul.show();
}