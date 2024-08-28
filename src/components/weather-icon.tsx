import Image from 'next/image';

import { iconURL } from '@/constants';

export default function WeatherIcon({
  id,
  description,
  size,
  isPriority,
}: Readonly<{
  id: string;
  description: string;
  size: number;
  isPriority?: boolean;
}>) {
  return (
    <div
      style={{
        background: `radial-gradient(circle at center, color-mix(in srgb, gray, lightgray 50%) 0%, transparent 50%)`,
      }}
    >
      <Image
        src={iconURL(id)}
        width={size}
        height={size}
        alt={`Weather icon for ${description}`}
        priority={isPriority}
      />
    </div>
  );
}
