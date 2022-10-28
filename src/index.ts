interface Streak {
	currentCount: number
	lastLoginDate: string
	startDate: string
}

export function streakCounter(storage: Storage, date: Date): Streak {
	return {
		currentCount: 0,
		lastLoginDate: '28/10/2022',
		startDate: '28/10/2022',
	}
}
