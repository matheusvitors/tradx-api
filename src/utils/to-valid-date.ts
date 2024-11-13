export const toValidDate = (dateString: string) => {
	const [day, month, yearAndTime] = dateString.split('/');
	const [year, time] = yearAndTime.split(' ');
	const formattedDateString = `${year}-${month}-${day} ${time}`;
	return new Date(formattedDateString);
}
