# Calorie Tracker App

A simple calorie tracking app built with Next.js, TypeScript, and Prisma.


## Features

Implemented  | Feature             | Description
-- | -- | --
| ✅ | User Profiles | User accounts with editable attributes (age, sex, weight, etc.) and personalized calorie goals using the Mifflin-St Jeor formula.
| ✅ | Nutrition Database | Nutritionix API integration with real-time food search, detailed result display, and manual entry support for missing foods.  
|  | Food Logging | Food entry system with name/unit/quantity input, search/autocomplete, manual macro support, meal grouping, date selection, and full CRUD with user context.
|  | Calorie Counting | Fetches and display all meals for the current day with per-meal and daily calorie/macro totals, updating dynamically as entries change.
|  | Weight Tracking | Weight logging with date picker, per-user storage, progress tracking via table and graph, and optional goal weight.
|  | Daily/Weekly Logs | Stores dates with each log entry to enable daily meal views, calendar/graph-based logging streaks, and weekly calorie averages with trends.

## API
`/api/auth/current-user`

`/api/auth/signin`

`/api/auth/signout`

`/api/auth/signup`

`/api/protected/foods`

`/api/protected/users`

`/api/protected/nutritionix/nutrients`

`/api/protected/nutritionix/search`
