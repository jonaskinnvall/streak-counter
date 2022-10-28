# @jonaskinnvall/streak-counter - a basic streak counter

This is a basic streak counter - inspired by Duolingo - written in Typescript
meant for the browser (uses `LocalStorage`).

## Install

```shell
npm install @jonaskinnvall/streak-counter
yarn add @jonaskinnvall/streak-counter
```

## Usage

```js
import { streakCounter } from '@jonaskinnvall/streak-counter'

const today = new Date()
const streak = streakCounter(localstorage, today)
// streak returns an object:
// {
//   currentCount: 1,
//   lastLoginDate:'28/10/2022',
//   startDate:'28/10/2022'
// }
```
