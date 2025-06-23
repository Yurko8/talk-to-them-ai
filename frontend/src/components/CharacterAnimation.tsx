import React from "react";

type CharacterAnimationProps = {
  character: string;
  status: "blinking" | "listening" | "talking";
};

export default function CharacterAnimation({ character, status }: CharacterAnimationProps) {
  const videoSrc = `/characters_new/${character}/${status}.mp4`;

  return (
    <video
      key={videoSrc} // ensures the video reloads when status changes
      src={videoSrc}
      autoPlay
      loop
      muted
      className="w-full max-w-md rounded-xl"
    />
  );
}
