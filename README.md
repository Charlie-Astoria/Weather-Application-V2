# Weather Buddy ☀️🌧️ (v2)

Weather Buddy is a cute, interactive weather application built using **Expo + React Native**, with a small **MVVM-style** architecture and a React Native Web browser view.

It uses the free **Open-Meteo** API (no key required) to show:

- Current weather
- **5-day forecast**
- **5-day weather history**
- Animated weather backgrounds
- A cat-based **Weather Mascot** that reacts to loading, errors, and conditions

---

## Features

- 🔍 **City search**
  - Type any city name (e.g., *Manila*, *Tokyo*, *London*)
  - Geocoded via Open-Meteo geocoding API
- 🌡 **Current weather card**
  - Temperature in °C
  - Simple condition label
  - City + country
  - Weather-dependent background color and icon
- 📅 **5-day forecast**
  - Horizontal scrollable list
  - Each card shows date, icon, high / low temp, rain
  - Tap a card to see details with a cute helper message
- 📈 **5-day history**
  - Last 5 days of max / min temperature
  - Daily rainfall totals
- 🐱 **Weather Mascot**
  - Emoji cat reacts to:
    - Loading (“checking the sky for you…”)
    - Errors (“couldn’t find that city, nyaaa~”)
    - Sunny / cloudy / rainy / stormy conditions
- 🎨 **Visual polish**
  - Animated GIF background based on weather code
  - Mood-based card colors (sunny yellow, rainy blue, etc.)

---

## Architecture (MVVM-style)

The app follows a light MVVM pattern:

- **View (Screens & Components)**
  - `App.js` – sets up navigation (Home + About) with React Navigation.
  - `screens/HomeScreen.js` – main dashboard: search, mascot, current, forecast, history.
  - `screens/AboutScreen.js` – simple information / credits screen.
  - `components/` – reusable UI:
    - `SearchBar.js` – text input + button.
    - `WeatherCard.js` – current weather summary.
    - `ForecastList.js` – 5-day forecast (tappable cards).
    - `HistoryList.js` – last 5 days of data.
    - `WeatherMascot.js` – helper cat that responds to state.
- **ViewModel**
  - `hooks/useWeatherViewModel.js`
    - Manages all state for the Home screen:
      - `city`, `cityInput`
      - `weather` (current), `forecastDays`, `historyDays`
      - `loading`, `error`
    - Talks directly to the Open-Meteo API:
      - Geocoding endpoint for city → latitude/longitude
      - Forecast endpoint with `past_days=5` and `forecast_days=5`
    - Maps API responses into simple objects that components can render.
- **Icons & Backgrounds**
  - `components/icons/WeatherIconsHelper.js`
    - Maps Open-Meteo weather codes + time of day → PNG icons
    - Uses assets from `assets/` (sun, cloud, rainy, snow, thunder, moon).
  - `components/icons/WeatherIcons.js`
    - Maps codes → animated GIF URLs for the background `ImageBackground`.

---

## Folder Structure

Inside the app folder:

```text
weather-app-v2/
  App.js
  index.js
  README.md
  package.json
  assets/
    sun.png
    cloud.png
    rainy.png
    snow.png
    thunder.png
    moon.png
    icon.png
    ...
  screens/
    HomeScreen.js
    AboutScreen.js
  hooks/
    useWeatherViewModel.js
  components/
    SearchBar.js
    WeatherCard.js
    ForecastList.js
    HistoryList.js
    WeatherMascot.js
    icons/
      WeatherIconsHelper.js
      WeatherIcons.js
```

---

## How to Run

> Requires Node.js, npm (or yarn), and Expo CLI (or `npx expo`).

1. Open a terminal in the app folder:

   ```bash
   cd weather-app-v2
   ```

2. Install dependencies (first time only):

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the Expo dev server:

   ```bash
   npm start
   # or
   yarn start
   ```

4. Choose how to run:
   - Press **`w`** to open the web (browser) version.
   - Press **`a`** to run Android emulator.
   - Press **`i`** to run iOS simulator (Mac only).
   - Or scan the QR code with **Expo Go** on your phone.

---

## Plug-and-Play Helpers (optional)

For convenience, you can use the included helper scripts:

- **Windows:** `run.bat`
- **Mac/Linux:** `run.sh`

These scripts run `npm install` (if needed) and then `npm start`.

---

## Where Things Connect

- `HomeScreen` uses:
  - `useWeatherViewModel` to get:
    - current weather
    - 5-day forecast
    - 5-day history
    - loading/error state
  - `SearchBar` to update `cityInput` and trigger `handleSearch`.
  - `WeatherMascot` for a fun, friendly status indicator.
  - `WeatherCard`, `ForecastList`, and `HistoryList` to render data.
- `useWeatherViewModel` uses:
  - Open-Meteo APIs via `fetch`.
  - `getWeatherIcon` and `getWeatherGIF` helpers to choose icons & backgrounds.

This README should give a quick tour to anyone opening the app in an IDE or grading your project.
