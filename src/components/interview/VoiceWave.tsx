"use client";

export default function VoiceWave() {

  const bars = [
    20,
    36,
    24,
    42,
    18,
    34,
    14,
    40,
    28,
    38,
  ];

  return (

    <div
      className="
        flex
        items-end
        justify-center
        gap-[6px]
        h-20
      "
    >

      {bars.map(
        (
          height,
          index
        ) => (

          <div
            key={index}
            className="
              wave-bar
              rounded-full
              bg-gradient-to-t
              from-purple-500
              via-violet-400
              to-cyan-400
            "
            style={{
              height: `${height}px`,
              width: "7px",
              animationDelay: `${index * 0.1}s`,
            }}
          />

        )
      )}

    </div>

  );
}