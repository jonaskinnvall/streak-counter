# @jonaskinnvall/streak-counter - a basic streak counter

This is a basic streak counter - inspired by Duolingo - written in Typescript
meant for the browser (uses `LocalStorage`).

## Install

```shell
npm install @jonaskinnvall/streak-counter
yarn add @jonaskinnvall/streak-counter
```

## Usage

[![Edit streak-counter (ts-course) (forked)](https://codesandbox.io/static/img/play-codesandbox.svg)][def]

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

[def]:
 https://codesandbox.io/s/streak-counter-ts-course-forked-9efhdy?fontsize=14&hidenavigation=1&theme=dark
