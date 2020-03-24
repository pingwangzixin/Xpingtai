var pageUrl = [
	'/newEaxm/tpl/branch_subject/Student-selection.html',
	'/newEaxm/tpl/branch_class/class.html',
	'/goClass/index.html'
];

function addParams(url){
	if(getParameter('schoolId')==null||getParameter('schoolId')==''){
		window.location.href = portalIp;
		return false;
	}
	url+='?schoolId='+getParameter('schoolId')
		+'&areaCode='+getParameter('areaCode')
		+'&createId='+getParameter('createId')
		+'&createName='+getParameter('createName')
		+'&schoolYear='+getParameter('schoolYear')
		+'&semester='+getParameter('semester');
	return url;
}

//跳转页面
function toPage(index){
	window.location.href= addParams(pageUrl[index]);
}
