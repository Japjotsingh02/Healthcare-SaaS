import { BRAND_MARK } from '../../lib/assets';

interface Props {
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}

/** Raster mark from `public/images` (AVIF with WebP fallback). */
export default function BrandMark({
  className = 'h-11 w-11 rounded-md object-contain',
  width = 44,
  height = 44,
  alt = 'MediCore',
}: Props) {
  return (
    <picture className={className}>
      <source srcSet={BRAND_MARK.avif} type="image/avif" />
      <source srcSet={BRAND_MARK.webp} type="image/webp" />
      <img src={BRAND_MARK.webp} alt={alt} width={width} height={height} className="h-full w-full object-contain" />
    </picture>
  );
}
