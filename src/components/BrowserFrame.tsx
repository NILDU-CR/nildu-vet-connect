type BrowserFrameProps = { src: string; srcSet?: string; sizes?: string; alt: string; url: string; eager: boolean; width: number; height: number };

// Marco de navegador sencillo para las capturas reales del portal: sin inclinación ni brillo.
const BrowserFrame = ({ src, srcSet, sizes, alt, url, eager, width, height }: BrowserFrameProps) => (
  <figure className="overflow-hidden rounded-lg border border-line bg-white shadow-[0_1px_2px_rgba(23,44,68,0.08),0_12px_32px_rgba(23,44,68,0.12)]">
    <div aria-hidden="true" className="flex h-7 items-center gap-1.5 border-b border-line bg-mist px-3">
      <span className="h-2 w-2 rounded-full bg-line" />
      <span className="h-2 w-2 rounded-full bg-line" />
      <span className="h-2 w-2 rounded-full bg-line" />
      <span className="ml-2 truncate font-mono text-[11px] text-ink">{url}</span>
    </div>
    <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} width={width} height={height} loading={eager ? "eager" : "lazy"} decoding="async" className="block h-auto w-full" />
  </figure>
);

export default BrowserFrame;
