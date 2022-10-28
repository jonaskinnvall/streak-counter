export function formattedDate(date: Date): string {
	// return date without timestamp
	return date.toLocaleDateString('en-US')
}
