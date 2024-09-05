'use client';

import { useEffect, useState } from 'react';

import Card from '@/components/card';
import Loading from '@/components/loading';
import Message from '@/components/message';
import WeatherIcon from '@/components/weather-icon';
import { apiURLForecast } from '@/constants';
import type {
  ForecastData,
  ForecastDataItem,
  ForecastWeatherResponse,
  ResponseError,
} from '@/types';
import { getFormattedDate } from '@/utils/helpers';

function WeatherListItem({
  time,
  icon,
  temperature,
  description,
}: Readonly<{
  time: string;
  icon: string;
  temperature: string;
  description: string;
}>) {
  return (
    <li className='flex items-center gap-x-4'>
      <div className='font-medium'>{time}</div>
      <div className='flex flex-grow items-center'>
        <WeatherIcon id={icon} description={description} size={50} />
        <div className='text-sm text-zinc-500'>{temperature}</div>
      </div>
      <div className='text-sm font-medium'>{description}</div>
    </li>
  );
}

export default function ForecastCard({
  location,
}: Readonly<{ location: string }>) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    timeStyle: 'short',
  };

  const [forecastData, setForecastData] = useState<ForecastData>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchForecastData = async () => {
    const res = await fetch(apiURLForecast(location));
    const data = await res.json();
    if (res.ok) {
      const successData = data as ForecastWeatherResponse;
      const { list } = successData;
      let timezoneOffset = successData.city.timezone * 1000;

      const obj: Record<string, any> = {};
      const todayDate = getFormattedDate(
        dateOptions,
        new Date(),
        timezoneOffset
      );

      list.forEach((item) => {
        const dateObj = new Date(item.dt_txt);
        let date = getFormattedDate(dateOptions, dateObj);
        if (date === todayDate) date = 'Today';
        const time = getFormattedDate(timeOptions, dateObj);
        if (!obj[date]) obj[date] = [];
        const objItem: ForecastDataItem = {
          time,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
          temperature: {
            max: item.main.temp_max,
            min: item.main.temp_min,
            unit: '°C',
          },
        };
        obj[date].push(objItem);
      });

      setForecastData(obj);
    } else {
      const errorData = data as ResponseError;
      setErrorMessage(
        `Error ${errorData?.cod}: ${errorData?.message ?? 'An error occurred'}`
      );
    }
  };

  useEffect(() => {
    fetchForecastData();
  }, []);

  return (
    <Card title='5-day Forecast (3 Hours)' isLoaded={Boolean(forecastData)}>
      {errorMessage ? (
        <div className='min-h-[10.5rem]'>
          <Message type='error' message={errorMessage} />
        </div>
      ) : !forecastData ? (
        <div className='min-h-[10.5rem]'>
          <Loading />
        </div>
      ) : (
        Object.keys(forecastData).map((key, i1) => (
          <div key={`date-${i1}`} className='mb-8 last:mb-0'>
            <h3 className='mb-4 text-zinc-500'>{key}</h3>
            <ol>
              {forecastData[key].map((item, i2) => (
                <WeatherListItem
                  key={`time-${i2}`}
                  time={item.time}
                  icon={item.icon}
                  temperature={`${item.temperature.max} / ${item.temperature.min}${item.temperature.unit}`}
                  description={item.description}
                />
              ))}
            </ol>
          </div>
        ))
      )}
    </Card>
  );
}
