export interface Streak {
	currentCount: number
	lastLoginDate: string
	startDate: string
}

export function formattedDate(date: Date): string {
	// return date without timestamp
	return date.toLocaleDateString('en-US')
}
