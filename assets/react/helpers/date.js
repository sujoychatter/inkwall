export default function formatDBDate(date){
	if(!date){
		return ""
	}
	var dateString = (new Date(date)).toString();
	return dateString.slice(0, dateString.length - 15);
}
