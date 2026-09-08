import Image from "next/image";
import type { MediaAsset } from "@/types/content";

export function Media({ asset, large = false }: { asset: MediaAsset; large?: boolean }) {
  if (asset.src)
    return (
      <div className={`relative ${large ? "aspect-[4/3]" : "aspect-[16/9]"}`}>
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={large ? "(max-width: 1024px) 100vw, 45vw" : "(max-width: 640px) 100vw, 33vw"}
          className="object-contain"
        />
      </div>
    );
  return (
    <figure className={`technical-panel ${large ? "min-h-72 sm:min-h-96" : "aspect-[16/9]"}`}>
      <svg viewBox="0 0 560 280" className="w-full" role="img" aria-label={asset.alt}>
        <g fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M35 235H525M65 35V245M495 35V245" opacity=".2" />
          {asset.kind === "festoon" ? (
            <>
              <path d="M75 80H485" strokeWidth="7" />
              <path
                d="M110 100Q150 310 200 100Q250 310 300 100Q355 310 410 100"
                stroke="#6cb48f"
                strokeWidth="4"
              />
              {[110, 200, 300, 410].map((x) => (
                <g key={x}>
                  <rect x={x - 12} y="75" width="24" height="25" fill="#20342b" />
                  <circle cx={x} cy="82" r="5" />
                </g>
              ))}
            </>
          ) : asset.kind === "mono" ? (
            <>
              {[90, 125, 160].map((y) => (
                <g key={y}>
                  <path d={`M85 ${y}H475`} strokeWidth="12" stroke="#6cb48f" />
                  <path d={`M320 ${y}v26h65`} />
                  <circle cx="320" cy={y} r="6" fill="#d6e4da" />
                </g>
              ))}
              <path d="M385 116v106H440" />
            </>
          ) : (
            <>
              <path d="M90 82H470V127H90Z" strokeWidth="3" />
              <path d="M100 97H460M100 113H460" stroke="#6cb48f" strokeWidth="4" />
              <path d="M150 82V52M420 82V52M135 52H165M405 52H435" />
              <rect x="280" y="127" width="55" height="40" fill="#20342b" />
              <path d="M307 167v42h110M357 152h60m-10-8 10 8-10 8" />
              <circle cx="307" cy="119" r="6" fill="#6cb48f" />
            </>
          )}
        </g>
      </svg>
      <figcaption className="px-5 pb-5 text-xs tracking-wide text-white/60">
        Схема принципа работы · без масштаба
      </figcaption>
    </figure>
  );
}
