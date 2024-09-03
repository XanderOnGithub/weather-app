const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
console.log('API_KEY:', API_KEY);

/**
 * Fetches the current weather and forecast for a given city.
 * 
 * @param {string} city - The name of the city to fetch the weather for.
 * @returns {Promise<any>} A promise that resolves to the weather data.
 */
export async function getCurrentWeather(city: string): Promise<any> {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`);
        if (!response.ok) {
            return;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return;
    }
}

/**
 * Saves the current weather data for a given city.
 * 
 * @param {string} city - The name of the city to save the weather for.
 * @returns {Promise<void>} A promise that resolves when the weather data is saved.
 * @throws Will throw an error if unable to save the current weather.
 */
export async function saveCurrentWeather(city: string): Promise<void> {
    try {
        const weatherData = await getCurrentWeather(city);
        const currentWeather = weatherData.current;
        // Do something with the current weather data
        console.log('Current weather:', currentWeather);
    } catch (error) {
        console.error('Error saving current weather:', error);
        throw error;
    }
}