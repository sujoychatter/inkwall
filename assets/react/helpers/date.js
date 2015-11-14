export default function formatDBDate(date){
	var dateString = (new Date(date)).toString();
	return dateString.slice(0, dateString.length - 15);
}
