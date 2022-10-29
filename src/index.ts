import { formattedDate } from './utils'

interface Streak {
	currentCount: number
	lastLoginDate: string
	startDate: string
}

const KEY = 'streak'

function shouldIncrementOrResetStreakCount(
	currentDate: Date,
	lastLoginDate: string,
): 'increment' | undefined {
	const difference =
		currentDate.getDate() - parseInt(lastLoginDate.split('/')[1])
	if (difference === 1) {
		return 'increment'
	}
	return undefined
}

export function streakCounter(storage: Storage, date: Date): Streak {
	const streakInLocalStorage = storage.getItem(KEY)
	if (streakInLocalStorage) {
		try {
			const streak = JSON.parse(streakInLocalStorage)
			const state = shouldIncrementOrResetStreakCount(
				date,
				streak.lastLoginDate,
			)
			const SHOULD_INCREMENT = state === 'increment'

			if (SHOULD_INCREMENT) {
				const updatedStreak = {
					...streak,
					currentCount: streak.currentCount + 1,
					lastLoginDate: formattedDate(date),
				}

				storage.setItem(KEY, JSON.stringify(updatedStreak))
				return updatedStreak
			}
			return streak
		} catch (error) {
			console.error('Failed to parse streak from localStorage')
		}
	}

	const streak = {
		currentCount: 1,
		lastLoginDate: formattedDate(date),
		startDate: formattedDate(date),
	}

	storage.setItem(KEY, JSON.stringify(streak))

	return streak
}
