import { DEFAULT_LOCATION, LOCAL_STORAGE_KEY } from '@/constants';

import { decrypt, encrypt } from './encryption';

export function getAllLocations(
  setDefault: boolean,
  currentLocation?: string
): string[] {
  const defaultLocations = [currentLocation ?? DEFAULT_LOCATION];
  let locations = [];
  try {
    locations = JSON.parse(
      decrypt(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '') ?? '[]'
    );
  } catch (_) {
    locations = [];
  }
  if (!locations || !Array.isArray(locations) || !locations.length) {
    if (setDefault) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        encrypt(JSON.stringify(defaultLocations))
      );
      return defaultLocations;
    }
    locations = [];
  }
  return locations;
}

export function getLatestLocation(): string {
  const locationArray = getAllLocations(false);
  return locationArray[0] ?? DEFAULT_LOCATION;
}

export function addLocation(location: string): void {
  const locationArray = getAllLocations(false);
  locationArray.unshift(location);
  const locationSet = new Set(locationArray);
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    encrypt(JSON.stringify([...locationSet]))
  );
}

export function removeLocation(location: string): void {
  const locationArray = getAllLocations(false);
  const locationSet = new Set(locationArray);
  locationSet.delete(location);
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    encrypt(JSON.stringify([...locationSet]))
  );
}

export function removeAllLocations(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}
