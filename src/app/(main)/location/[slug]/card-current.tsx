'use client';

import { useEffect, useState } from 'react';

import IcArrowUp from '@/assets/arrow-up.svg';
import Card from '@/components/card';
import Loading from '@/components/loading';
import Message from '@/components/message';
import WeatherIcon from '@/components/weather-icon';
import { apiURLCurrent } from '@/constants';
import type {
  CurrentWeatherResponse,
  ResponseError,
  WeatherData,
} from '@/types';
import { toTitleCase } from '@/utils/helpers';

export default function CurrentCard({
  location,
}: Readonly<{ location: string }>) {
  const todayDate = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchWeatherData = async () => {
    const res = await fetch(apiURLCurrent(location));
    const data = await res.json();
    if (res.ok) {
      const successData = data as CurrentWeatherResponse;
      setWeatherData({
        icon: successData.weather[0].icon,
        description: toTitleCase(successData.weather[0].description),
        temperature: {
          value: Math.round(successData.main.temp),
          unit: '°C',
        },
        humidity: {
          value: successData.main.humidity,
          unit: '%',
        },
        windSpeed: {
          value: successData.wind.speed,
          unit: 'm/s',
        },
        windDegree: successData.wind.deg,
        visibility: {
          value: successData.visibility / 1000,
          unit: 'km',
        },
      });
    } else {
      const errorData = data as ResponseError;
      setErrorMessage(
        `Error ${errorData?.cod}: ${errorData?.message ?? 'An error occurred'}`
      );
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <Card>
      {errorMessage ? (
        <div className='min-h-[10.5rem]'>
          <Message type='error' message={errorMessage} />
        </div>
      ) : !weatherData ? (
        <div className='min-h-[10.5rem]'>
          <Loading />
        </div>
      ) : (
        <div className='grid grid-cols-[2fr_1fr_1fr_2fr] grid-rows-[repeat(5,auto)]'>
          <h2 className='col-span-full text-lg'>{todayDate}</h2>
          <div className='col-span-2 row-span-2 self-center justify-self-center'>
            <WeatherIcon
              id={weatherData.icon}
              description={weatherData.description}
              size={100}
              isPriority
            />
          </div>
          <div className='col-span-2 self-center justify-self-center text-5xl'>
            {`${weatherData.temperature.value}${weatherData.temperature.unit}`}
          </div>
          <div className='col-span-2 justify-self-center text-center text-lg'>
            {weatherData.description}
          </div>
          <div className='justify-self-center text-sm text-zinc-500'>
            Humidity
          </div>
          <div className='col-span-2 justify-self-center text-sm text-zinc-500'>
            Winds
          </div>
          <div className='justify-self-center text-sm text-zinc-500'>
            Visibility
          </div>
          <div className='flex items-center gap-x-1 justify-self-center font-medium'>
            <div className='text-lg'>{weatherData.humidity.value}</div>
            <sub className='bottom-0 text-sm'>{weatherData.humidity.unit}</sub>
          </div>
          <div className='col-span-2 flex items-center gap-x-1 justify-self-center font-medium'>
            <IcArrowUp
              width={16}
              height={16}
              style={{
                rotate: `${weatherData.windDegree}deg`,
              }}
            />
            <div className='text-lg'>{weatherData.windSpeed.value}</div>
            <sub className='bottom-0 text-sm'>{weatherData.windSpeed.unit}</sub>
          </div>
          <div className='flex items-center gap-x-1 justify-self-center font-medium'>
            <div className='text-lg'>{weatherData.visibility.value}</div>
            <sub className='bottom-0 text-sm'>
              {weatherData.visibility.unit}
            </sub>
          </div>
        </div>
      )}
    </Card>
  );
}
