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
): 'increment' | 'reset' {
	const difference =
		currentDate.getDate() - parseInt(lastLoginDate.split('/')[1])
	if (difference === 1) {
		return 'increment'
	}
	return 'reset'
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
			const SHOULD_RESET = state === 'reset'

			if (SHOULD_INCREMENT) {
				const updatedStreak: Streak = {
					...streak,
					currentCount: streak.currentCount + 1,
					lastLoginDate: formattedDate(date),
				}

				storage.setItem(KEY, JSON.stringify(updatedStreak))
				return updatedStreak
			}
			if (SHOULD_RESET) {
				const updatedStreak: Streak = {
					currentCount: 1,
					startDate: formattedDate(date),
					lastLoginDate: formattedDate(date),
				}
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
