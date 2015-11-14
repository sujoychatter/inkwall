export default function ajax(url, content_type, callback, data, x) {
	try {
		x = new(window.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
		x.open(data ? 'POST' : 'GET', url, 1);
		x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		x.setRequestHeader('Content-type', content_type);
		x.onreadystatechange = function () {
			x.readyState > 3 && callback && callback(x.responseText, x);
		};
		x.send(data)
	} catch (e) {
		window.console && console.log(e);
	}
}