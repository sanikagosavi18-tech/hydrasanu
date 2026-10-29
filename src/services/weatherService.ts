import { AgroWeatherData } from '../types';

export const AGRICULTURAL_HUBS = [
  { name: 'Nashik', state: 'Maharashtra', lat: 19.9975, lon: 73.7898, region: 'Grapes, Onions, Tomato' },
  { name: 'Karnal', state: 'Haryana', lat: 29.6857, lon: 76.9905, region: 'Basmati Rice, Wheat' },
  { name: 'Ludhiana', state: 'Punjab', lat: 30.9010, lon: 75.8573, region: 'Wheat, Paddy, Cotton' },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lon: 75.8577, region: 'Soybean, Wheat, Potato' },
  { name: 'Rajkot', state: 'Gujarat', lat: 22.3039, lon: 70.8022, region: 'Groundnut, Cotton' },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lon: 79.0882, region: 'Oranges, Cotton, Soybean' },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lon: 82.9739, region: 'Vegetables, Paddy, Mustard' },
  { name: 'Guntur', state: 'Andhra Pradesh', lat: 16.3067, lon: 80.4365, region: 'Chilli, Cotton, Tobacco' },
  { name: 'Mandya', state: 'Karnataka', lat: 12.5244, lon: 76.8958, region: 'Sugarcane, Paddy' },
];

export function getWeatherDescription(code: number): string {
  switch (code) {
    case 0:
      return 'Clear Sky';
    case 1:
      return 'Mainly Clear';
    case 2:
      return 'Partly Cloudy';
    case 3:
      return 'Overcast';
    case 45:
    case 48:
      return 'Fog & Morning Mist';
    case 51:
    case 53:
    case 55:
      return 'Light Drizzle';
    case 61:
    case 63:
    case 65:
      return 'Rain Showers';
    case 71:
    case 73:
    case 75:
      return 'Light Snow';
    case 80:
    case 81:
    case 82:
      return 'Heavy Showers';
    case 95:
    case 96:
    case 99:
      return 'Thunderstorm & Rain';
    default:
      return 'Partly Cloudy';
  }
}

// Fallback baseline weather in case user is offline or API fails
export const DEFAULT_FALLBACK_WEATHER: AgroWeatherData = {
  locationName: 'Nashik',
  stateOrCountry: 'Maharashtra, India',
  latitude: 19.9975,
  longitude: 73.7898,
  current: {
    temp: 27,
    apparentTemp: 28,
    humidity: 58,
    weatherCode: 1,
    weatherDescription: 'Mainly Clear & Sunny',
    precipitation: 0,
    windSpeed: 8,
    windDirection: 210,
    soilTemp: 23,
  },
  daily: [
    { date: '2026-10-27', dayName: 'Today', weatherCode: 1, description: 'Mainly Clear', maxTemp: 31, minTemp: 18, rainProbability: 10, precipitationSum: 0 },
    { date: '2026-10-28', dayName: 'Tomorrow', weatherCode: 2, description: 'Partly Cloudy', maxTemp: 30, minTemp: 19, rainProbability: 15, precipitationSum: 0 },
    { date: '2026-10-29', dayName: 'Wednesday', weatherCode: 3, description: 'Overcast Sky', maxTemp: 29, minTemp: 18, rainProbability: 25, precipitationSum: 0.2 },
    { date: '2026-10-30', dayName: 'Thursday', weatherCode: 61, description: 'Scattered Showers', maxTemp: 27, minTemp: 19, rainProbability: 60, precipitationSum: 6.4 },
    { date: '2026-10-31', dayName: 'Friday', weatherCode: 2, description: 'Partly Sunny', maxTemp: 29, minTemp: 17, rainProbability: 20, precipitationSum: 0 },
    { date: '2026-11-01', dayName: 'Saturday', weatherCode: 0, description: 'Clear Sunny', maxTemp: 31, minTemp: 17, rainProbability: 5, precipitationSum: 0 },
    { date: '2026-11-02', dayName: 'Sunday', weatherCode: 0, description: 'Sunny & Bright', maxTemp: 32, minTemp: 18, rainProbability: 5, precipitationSum: 0 },
  ],
  hourly: [
    { time: '06:00', temp: 19, rainProbability: 5, windSpeed: 5, weatherCode: 1 },
    { time: '09:00', temp: 24, rainProbability: 10, windSpeed: 7, weatherCode: 1 },
    { time: '12:00', temp: 29, rainProbability: 10, windSpeed: 10, weatherCode: 2 },
    { time: '15:00', temp: 31, rainProbability: 15, windSpeed: 11, weatherCode: 2 },
    { time: '18:00', temp: 27, rainProbability: 10, windSpeed: 8, weatherCode: 1 },
    { time: '21:00', temp: 23, rainProbability: 5, windSpeed: 6, weatherCode: 0 },
  ],
  advisory: {
    sprayCondition: 'Optimal',
    sprayMessage: 'Wind speeds under 10 km/h with zero immediate rain forecast. Favorable absorption window for foliar nutrient sprays.',
    irrigationAdvisory: 'Moderate soil moisture loss. Light furrow or drip irrigation recommended for standing vegetables & pulses.',
    diseaseRisk: 'Low',
    diseaseRiskMessage: 'Relative humidity under 60% with mild breezes. Low fungal spore germination risk.',
    harvestingAdvice: 'Sunny and dry days ahead. Excellent conditions for crop harvesting, threshing, and open yard sun drying.',
  },
};

export async function fetchAgroWeather(
  lat: number,
  lon: number,
  locationName: string,
  stateName: string
): Promise<AgroWeatherData> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,soil_temperature_0_to_7cm&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&timezone=auto`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Weather service returned ${res.status}`);
    }

    const data = await res.json();
    const current = data.current;
    const daily = data.daily;
    const hourly = data.hourly;

    // Process daily forecasts (next 7 days)
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const formattedDaily = daily.time.slice(0, 7).map((dStr: string, idx: number) => {
      const d = new Date(dStr);
      const dayName = idx === 0 ? 'Today' : idx === 1 ? 'Tomorrow' : daysOfWeek[d.getDay()];
      const code = daily.weather_code[idx] ?? 1;
      return {
        date: dStr,
        dayName,
        weatherCode: code,
        description: getWeatherDescription(code),
        maxTemp: Math.round(daily.temperature_2m_max[idx]),
        minTemp: Math.round(daily.temperature_2m_min[idx]),
        rainProbability: Math.round(daily.precipitation_probability_max?.[idx] ?? 10),
        precipitationSum: daily.precipitation_sum?.[idx] ?? 0,
      };
    });

    // Process hourly (next 8 3-hour steps)
    const formattedHourly = [];
    const nowHour = new Date().getHours();
    for (let i = 0; i < 24 && formattedHourly.length < 8; i += 3) {
      const targetIdx = Math.min(nowHour + i, hourly.time.length - 1);
      const timeStr = hourly.time[targetIdx]?.split('T')[1]?.slice(0, 5) || `${targetIdx}:00`;
      formattedHourly.push({
        time: timeStr,
        temp: Math.round(hourly.temperature_2m[targetIdx]),
        rainProbability: Math.round(hourly.precipitation_probability?.[targetIdx] ?? 10),
        windSpeed: Math.round(hourly.wind_speed_10m[targetIdx]),
        weatherCode: hourly.weather_code[targetIdx] ?? 1,
      });
    }

    // Compute Agricultural Rules
    const currentWind = Math.round(current.wind_speed_10m);
    const currentRain = current.precipitation;
    const currentHumidity = Math.round(current.relative_humidity_2m);
    const currentTemp = Math.round(current.temperature_2m);
    const todayRainProb = formattedDaily[0]?.rainProbability ?? 10;
    const tomorrowRainProb = formattedDaily[1]?.rainProbability ?? 10;

    // Spray condition
    let sprayCondition: 'Optimal' | 'Caution' | 'Unfavorable' = 'Optimal';
    let sprayMessage = 'Calm winds and zero rain threat. Ideal time for pesticide & fertilizer foliar spraying.';

    if (currentWind > 16 || currentRain > 0.5 || todayRainProb > 50) {
      sprayCondition = 'Unfavorable';
      sprayMessage = `Winds at ${currentWind} km/h or elevated rain probability. High risk of chemical drift and wash-off. Postpone spraying.`;
    } else if (currentWind >= 11 || todayRainProb >= 30) {
      sprayCondition = 'Caution';
      sprayMessage = `Moderate wind (${currentWind} km/h). Restrict spraying to early morning (7:00 - 9:30 AM) with anti-drift nozzles.`;
    }

    // Disease risk
    let diseaseRisk: 'Low' | 'Moderate' | 'High' = 'Low';
    let diseaseRiskMessage = 'Dry atmosphere and moderate temperature. Low fungal disease spore incubation.';

    if (currentHumidity > 75 && currentTemp >= 18 && currentTemp <= 29) {
      diseaseRisk = 'High';
      diseaseRiskMessage = `High relative humidity (${currentHumidity}%) combined with warm temperature (${currentTemp}°C) provides ideal conditions for PlantVillage fungal pathogens (Early Blight & Downy Mildew). Scout lower leaves.`;
    } else if (currentHumidity >= 65) {
      diseaseRisk = 'Moderate';
      diseaseRiskMessage = `Humidity at ${currentHumidity}%. Ensure good aeration between rows and monitor for bacterial spot lesions.`;
    }

    // Irrigation
    let irrigationAdvisory = 'Normal soil moisture demand. Recommended to irrigate according to standard crop stage.';
    if (todayRainProb > 55 || tomorrowRainProb > 55) {
      irrigationAdvisory = `Precipitation anticipated (${Math.max(todayRainProb, tomorrowRainProb)}% chance). Hold off irrigation to prevent soil saturation and root asphyxiation.`;
    } else if (currentTemp > 32) {
      irrigationAdvisory = `High daytime heat (${currentTemp}°C) causing high evapotranspiration. Evening or early morning drip irrigation recommended.`;
    }

    // Harvesting
    const next3DaysRainProb = Math.max(
      formattedDaily[0]?.rainProbability ?? 0,
      formattedDaily[1]?.rainProbability ?? 0,
      formattedDaily[2]?.rainProbability ?? 0
    );
    const harvestingAdvice =
      next3DaysRainProb < 25
        ? 'Sunny dry spell over the next 72 hours. Excellent window for harvesting, thresher operation, and open sun-drying.'
        : 'Intermittent moisture or cloudy conditions expected. Keep harvested produce under waterproof tarpaulins.';

    return {
      locationName,
      stateOrCountry: stateName,
      latitude: lat,
      longitude: lon,
      current: {
        temp: currentTemp,
        apparentTemp: Math.round(current.apparent_temperature),
        humidity: currentHumidity,
        weatherCode: current.weather_code,
        weatherDescription: getWeatherDescription(current.weather_code),
        precipitation: current.precipitation,
        windSpeed: currentWind,
        windDirection: current.wind_direction_10m,
        soilTemp: Math.round(current.soil_temperature_0_to_7cm ?? 22),
      },
      daily: formattedDaily,
      hourly: formattedHourly,
      advisory: {
        sprayCondition,
        sprayMessage,
        irrigationAdvisory,
        diseaseRisk,
        diseaseRiskMessage,
        harvestingAdvice,
      },
    };
  } catch (error) {
    console.warn('Failed to fetch live Open-Meteo weather, using realistic fallback:', error);
    return {
      ...DEFAULT_FALLBACK_WEATHER,
      locationName: locationName || DEFAULT_FALLBACK_WEATHER.locationName,
      stateOrCountry: stateName || DEFAULT_FALLBACK_WEATHER.stateOrCountry,
      latitude: lat,
      longitude: lon,
    };
  }
}

export interface DetectedLocationResult {
  lat: number;
  lon: number;
  name: string;
  state: string;
  source: 'gps' | 'ip' | 'cached' | 'fallback';
}

/**
 * Automatically detects the user's location using GPS with instant fallback to IP geolocation.
 * Zero setup required, works across all browsers and embedded iframes.
 */
export async function detectLocationAutomatically(): Promise<DetectedLocationResult> {
  // 1. Try GPS with short timeout first
  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    try {
      const gpsResult = await new Promise<DetectedLocationResult>((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('GPS timeout')), 4000);
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            clearTimeout(timer);
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            try {
              const geoRes = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
              );
              if (geoRes.ok) {
                const geoData = await geoRes.json();
                const name = geoData.locality || geoData.city || geoData.principalSubdivision || 'Local Farm';
                const state = geoData.principalSubdivision
                  ? `${geoData.principalSubdivision}, ${geoData.countryName || 'India'}`
                  : geoData.countryName || 'India';
                resolve({ lat, lon, name, state, source: 'gps' });
                return;
              }
            } catch {}
            resolve({
              lat,
              lon,
              name: `GPS Farm (${lat.toFixed(2)}°N)`,
              state: `${lon.toFixed(2)}°E`,
              source: 'gps',
            });
          },
          (err) => {
            clearTimeout(timer);
            reject(err);
          },
          { timeout: 4000, enableHighAccuracy: false }
        );
      });
      return gpsResult;
    } catch {
      // GPS not granted or timed out, seamlessly fall through to IP geolocation
    }
  }

  // 2. IP-based Geolocation (0 permissions needed, instant, reliable in iframes)
  try {
    const ipRes = await fetch('https://ipwho.is/');
    if (ipRes.ok) {
      const ipData = await ipRes.json();
      if (ipData && ipData.success !== false && ipData.latitude && ipData.longitude) {
        return {
          lat: ipData.latitude,
          lon: ipData.longitude,
          name: ipData.city || ipData.region || 'Local Farm',
          state: `${ipData.region || ''}, ${ipData.country || 'India'}`.replace(/^,\s*/, ''),
          source: 'ip',
        };
      }
    }
  } catch (err) {
    console.warn('IP location fetch failed:', err);
  }

  // 3. Fallback to cached location if available
  try {
    const cached = localStorage.getItem('hydramind_detected_location');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.lat && parsed.lon) {
        return { ...parsed, source: 'cached' };
      }
    }
  } catch {}

  // 4. Default agricultural hub (Nashik)
  return {
    lat: DEFAULT_FALLBACK_WEATHER.latitude,
    lon: DEFAULT_FALLBACK_WEATHER.longitude,
    name: DEFAULT_FALLBACK_WEATHER.locationName,
    state: DEFAULT_FALLBACK_WEATHER.stateOrCountry,
    source: 'fallback',
  };
}

/**
 * Complete Automatic Location & Weather Detection pipeline
 */
export async function getLiveWeatherAutomatically(): Promise<{
  weather: AgroWeatherData;
  location: DetectedLocationResult;
}> {
  const loc = await detectLocationAutomatically();
  const weather = await fetchAgroWeather(loc.lat, loc.lon, loc.name, loc.state);
  try {
    localStorage.setItem('hydramind_detected_location', JSON.stringify(loc));
  } catch {}
  return { weather, location: loc };
}

export async function detectDeviceLocation(): Promise<{
  lat: number;
  lon: number;
  name: string;
  state: string;
}> {
  const result = await detectLocationAutomatically();
  return {
    lat: result.lat,
    lon: result.lon,
    name: result.name,
    state: result.state,
  };
}
