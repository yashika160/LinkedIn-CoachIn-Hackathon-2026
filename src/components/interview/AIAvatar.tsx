"use client";

export default function VoiceWave() {
  return (
    <div className="flex items-end gap-[5px] h-14">

      {[18, 32, 24, 40, 20, 34, 14, 30].map(
        (height, index) => (

          <div
            key={index}
            className="
              w-[6px]
              rounded-full
              bg-gradient-to-t
              from-purple-500
              to-cyan-400
              animate-pulse
            "
            style={{
              height,
              animationDelay: `${index * 0.12}s`,
            }}
          />

        )
      )}

    </div>
  );
}