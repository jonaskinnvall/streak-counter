import { JSDOM } from 'jsdom'
import { streakCounter } from '../src'
import { formattedDate } from '../src/utils'

describe('streakCounter', () => {
	let mockLocalStorage: Storage
	beforeEach(() => {
		const mockJSDom = new JSDOM('', { url: 'https://localhost' })
		mockLocalStorage = mockJSDom.window.localStorage
	})

	afterEach(() => {
		mockLocalStorage.clear()
	})

	it('should return a streak object with currentCount, lastLoginDate and startDate', () => {
		const date = new Date()
		const streak = streakCounter(mockLocalStorage, date)

		expect(streak.hasOwnProperty('currentCount')).toBe(true)
		expect(streak.hasOwnProperty('lastLoginDate')).toBe(true)
		expect(streak.hasOwnProperty('startDate')).toBe(true)
	})

	it('should return a streak starting at 1 and keep track of lastLoginDate', () => {
		const date = new Date()
		const streak = streakCounter(mockLocalStorage, date)

		const dateFormatted = formattedDate(date)

		expect(streak.currentCount).toBe(1)
		expect(streak.lastLoginDate).toBe(dateFormatted)
	})

	it('should store the streak in localStorage', () => {
		const date = new Date()
		const key = 'streak'
		streakCounter(mockLocalStorage, date)

		const streakAsString = mockLocalStorage.getItem(key)
		expect(streakAsString).not.toBeNull()
	})

	describe('with a pre-populated streak', () => {
		let mockLocalStorage: Storage

		beforeEach(() => {
			const mockJSDom = new JSDOM('', { url: 'https://localhost' })
			mockLocalStorage = mockJSDom.window.localStorage

			const date = new Date('10/20/2022')
			const streak = {
				currentCount: 1,
				startDate: formattedDate(date),
				lastLoginDate: formattedDate(date),
			}

			mockLocalStorage.setItem('streak', JSON.stringify(streak))
		})
		afterEach(() => {
			mockLocalStorage.clear()
		})

		it('should return the streak from localStorage', () => {
			const date = new Date('10/20/2022')
			const streak = streakCounter(mockLocalStorage, date)

			expect(streak.startDate).toBe('10/20/2022')
		})

		it('should increment the streak', () => {
			const date = new Date('10/21/2022')
			const streak = streakCounter(mockLocalStorage, date)

			expect(streak.currentCount).toBe(2)
		})

		it('should not increment streak when login days not consecutive', () => {
			const date = new Date('10/22/2022')
			const streak = streakCounter(mockLocalStorage, date)

			expect(streak.currentCount).toBe(1)
		})

		it('should save the incremented streak to localStorage', () => {
			const key = 'streak'
			const date = new Date('10/21/2022')

			streakCounter(mockLocalStorage, date)

			const streakAsString = mockLocalStorage.getItem(key)
			const streak = JSON.parse(streakAsString || '')

			expect(streak.currentCount).toBe(2)
		})

		it('should reset if not consecutive', () => {
			const date = new Date('10/21/2022')
			const streak = streakCounter(mockLocalStorage, date)

			expect(streak.currentCount).toBe(2)

			const dateUpdated = new Date('10/23/2022')
			const streakUpdated = streakCounter(mockLocalStorage, dateUpdated)

			expect(streakUpdated.currentCount).toBe(1)
		})
	})
})
