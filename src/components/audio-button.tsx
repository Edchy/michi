import { Button } from "@/components/button";
import { Volume2 } from "lucide-react";

export function AudioButton({
  onClick,
  label = "Play sound",
  className,
}: {
  onClick: () => void;
  label?: string;
  className?: string;
}) {
  return (
    <Button
      icon
      variant="secondary"
      onClick={onClick}
      data-audio-control
      className={className}
      aria-label={`${label}. Press Space.`}
      title={`${label} (Space)`}
    >
      <SpeakerIcon />
      <span className="sr-only">{label}</span>
    </Button>
  );
}

export function SpeakerIcon({ className }: { className?: string }) {
  return <Volume2 aria-hidden size={26} strokeWidth={1.8} className={className} />;
}
