javascript: (function() {
	var qn = prompt("视频下载,选择清晰度:120,116,112,80,74,64,48,32,16", 116);
	var bv = "";
	var cid = "";
	// normal video
	if (typeof(window.__INITIAL_STATE__.bvid) != "undefined"){
		bv = window.__INITIAL_STATE__.bvid;
		cid = /cid=[0-9]+/.exec($("#link2").val())[0].substring(4);
	}
	// bangumi
	else{
		bv = window.__INITIAL_STATE__.epInfo.bvid;
		cid = window.__INITIAL_STATE__.epInfo.cid;
	}
	$.ajaxSetup({
		crossDomain: true,
		xhrFields: {
			withCredentials: true
		}
	});
	$.get("https://api.bilibili.com/x/player/playurl?bvid=" + bv + "&cid=" + cid + "&qn=" + qn + "&type=&otype=json&fourk=1",
	function(data, status) {
		var dlink = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
		dlink.href = data.data.durl[0]["url"].replace("http", "https");
		var ev = document.createEvent("MouseEvents");
		ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		dlink.dispatchEvent(ev);
		alert("待下载开始后,刷新页面来播放视频");
	})
})();