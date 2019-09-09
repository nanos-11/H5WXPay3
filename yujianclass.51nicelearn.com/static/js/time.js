$(function() {
				var nowDate = new Date();
				var spaceday = 1;
				nowDate.setDate(nowDate.getDate() + spaceday);
				var month=nowDate.getMonth() + 1 ;
				var day= nowDate.getDate();
				if(month<=9){
					$(".month").html("0" + month);
				}
				else{
					$(".month").html(month);
				}
				if(day<=9){
					$(".day").html("0" + day)
				}
				else{
					$(".day").html(day);
				}
		});
$(function() {
				var nowDate = new Date();
				var spaceday = 1;
				nowDate.setDate(nowDate.getDate() + spaceday);
				var month=nowDate.getMonth() + 1 ;
				var day= nowDate.getDate();
				if(month<=9){
					$("#month").html("0" + month);
				}
				else{
					$("#month").html(month);
				}
				if(day<=9){
					$("#day").html("0" + day)
				}
				else{
					$("#day").html(day);
				}
		});

























