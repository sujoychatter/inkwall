export default function formatDBDateTime(date){
	if(!date){
		return ""
	}
	var dateString = (new Date(date)).toDateString();
	return dateString
}
