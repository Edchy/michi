"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/button";
import { AStrokeGuide } from "@/components/kana-stroke-guide";
import { brushWidth } from "@/content/writing";
import { Eye, RotateCcw, Trash2, Undo2 } from "lucide-react";

type InkPoint = {
  x: number;
  y: number;
  pressure: number;
};

type InkStroke = InkPoint[];

function drawStroke(
  context: CanvasRenderingContext2D,
  stroke: InkStroke,
  width: number,
  height: number,
  ink: string,
): void {
  if (stroke.length === 0) return;
  context.strokeStyle = ink;
  context.fillStyle = ink;
  context.lineCap = "round";
  context.lineJoin = "round";

  const first = stroke[0]!;
  if (stroke.length === 1) {
    context.beginPath();
    context.arc(
      first.x * width,
      first.y * height,
      brushWidth(first.pressure, Math.min(width, height)) / 2,
      0,
      Math.PI * 2,
    );
    context.fill();
    return;
  }

  for (let index = 1; index < stroke.length; index += 1) {
    const previous = stroke[index - 1]!;
    const point = stroke[index]!;
    context.lineWidth = brushWidth(point.pressure, Math.min(width, height));
    context.beginPath();
    context.moveTo(previous.x * width, previous.y * height);
    context.lineTo(point.x * width, point.y * height);
    context.stroke();
  }
}

export function WritingSurface({
  glyph,
  mode = "trace",
  onReadyChange,
}: {
  glyph: string;
  mode?: "trace" | "recall";
  onReadyChange: (ready: boolean) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<InkStroke[]>([]);
  const activeStroke = useRef<InkStroke | null>(null);
  const [strokeCount, setStrokeCount] = useState(0);
  const [showGuide, setShowGuide] = useState(mode === "trace");
  const [guideReplay, setGuideReplay] = useState(0);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bounds = canvas.getBoundingClientRect();
    if (bounds.width === 0 || bounds.height === 0) return;
    const pixelRatio = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.round(bounds.width * pixelRatio);
    canvas.height = Math.round(bounds.height * pixelRatio);
    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(pixelRatio, pixelRatio);
    context.clearRect(0, 0, bounds.width, bounds.height);
    const ink = getComputedStyle(canvas).getPropertyValue("--color-ink").trim();
    for (const stroke of strokes.current) {
      drawStroke(context, stroke, bounds.width, bounds.height, ink);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(redraw);
    observer.observe(canvas);
    redraw();
    return () => observer.disconnect();
  }, [redraw]);

  function pointFromEvent(event: React.PointerEvent<HTMLCanvasElement>): InkPoint {
    const bounds = event.currentTarget.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)),
      y: Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height)),
      pressure: event.pressure,
    };
  }

  function beginStroke(event: React.PointerEvent<HTMLCanvasElement>) {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    activeStroke.current = [pointFromEvent(event)];
  }

  function extendStroke(event: React.PointerEvent<HTMLCanvasElement>) {
    const stroke = activeStroke.current;
    if (!stroke) return;
    const events = event.nativeEvent.getCoalescedEvents?.() ?? [event.nativeEvent];
    for (const pointer of events) {
      const bounds = event.currentTarget.getBoundingClientRect();
      stroke.push({
        x: Math.max(0, Math.min(1, (pointer.clientX - bounds.left) / bounds.width)),
        y: Math.max(0, Math.min(1, (pointer.clientY - bounds.top) / bounds.height)),
        pressure: pointer.pressure,
      });
    }
    redraw();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bounds = canvas.getBoundingClientRect();
    const context = canvas.getContext("2d");
    if (!context) return;
    const ink = getComputedStyle(canvas).getPropertyValue("--color-ink").trim();
    drawStroke(context, stroke, bounds.width, bounds.height, ink);
  }

  function finishStroke(event: React.PointerEvent<HTMLCanvasElement>) {
    const stroke = activeStroke.current;
    if (!stroke) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    strokes.current = [...strokes.current, stroke];
    activeStroke.current = null;
    setStrokeCount(strokes.current.length);
    onReadyChange(true);
    redraw();
  }

  function undo() {
    strokes.current = strokes.current.slice(0, -1);
    setStrokeCount(strokes.current.length);
    onReadyChange(strokes.current.length > 0);
    redraw();
  }

  function clear() {
    strokes.current = [];
    activeStroke.current = null;
    setStrokeCount(0);
    onReadyChange(false);
    redraw();
  }

  function retryRecall() {
    clear();
    setShowGuide(false);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <div className="relative aspect-square w-[min(calc(100vw-40px),420px)] overflow-hidden">
        {showGuide && mode === "trace" && glyph === "あ" ? (
          <span key={guideReplay} className="pointer-events-none absolute inset-0 select-none">
            <AStrokeGuide animated />
          </span>
        ) : showGuide && mode === "trace" ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-kana text-[clamp(10rem,56vw,14rem)] leading-none text-ink opacity-20"
          >
            {glyph}
          </span>
        ) : null}
        <canvas
          ref={canvasRef}
          aria-label={
            mode === "trace"
              ? `Drawing area for tracing ${glyph}`
              : "Blank drawing area for the sound prompt"
          }
          className="absolute inset-0 h-full w-full touch-none select-none"
          onPointerDown={beginStroke}
          onPointerMove={extendStroke}
          onPointerUp={finishStroke}
          onPointerCancel={finishStroke}
        />
        {showGuide && mode === "recall" && glyph === "あ" ? (
          <span className="pointer-events-none absolute inset-0 z-10 select-none">
            <AStrokeGuide comparison />
          </span>
        ) : showGuide && mode === "recall" ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 flex select-none items-center justify-center font-kana text-[clamp(10rem,56vw,14rem)] leading-none text-accent opacity-55"
          >
            {glyph}
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-2" aria-label="Drawing tools">
        <Button
          icon
          className="writing-tool"
          variant="ghost"
          onClick={undo}
          disabled={strokeCount === 0}
          aria-label="Undo last stroke"
          title="Undo last stroke"
        >
          <Undo2 size={18} strokeWidth={1.8} aria-hidden />
          <span className="sr-only">Undo</span>
        </Button>
        <Button
          icon
          className="writing-tool"
          variant="ghost"
          onClick={clear}
          disabled={strokeCount === 0}
          aria-label="Clear drawing"
          title="Clear drawing"
        >
          <Trash2 size={18} strokeWidth={1.8} aria-hidden />
          <span className="sr-only">Clear</span>
        </Button>
        {mode === "trace" && glyph === "あ" && (
          <Button
            icon
            className="writing-tool"
            variant="ghost"
            onClick={() => {
              clear();
              setGuideReplay((value) => value + 1);
            }}
            aria-label="Replay stroke order"
            title="Replay stroke order"
          >
            <RotateCcw size={18} strokeWidth={1.8} aria-hidden />
            <span className="sr-only">Replay stroke order</span>
          </Button>
        )}
        {mode === "recall" &&
          (showGuide ? (
            <Button
              icon
              className="writing-tool"
              variant="ghost"
              onClick={retryRecall}
              aria-label="Try again"
              title="Try again"
            >
              <RotateCcw size={18} strokeWidth={1.8} aria-hidden />
              <span className="sr-only">Try again</span>
            </Button>
          ) : (
            <Button
              icon
              className="writing-tool"
              variant="ghost"
              onClick={() => setShowGuide(true)}
              disabled={strokeCount === 0}
              aria-label="Reveal shape"
              title="Reveal shape"
            >
              <Eye size={18} strokeWidth={1.8} aria-hidden />
              <span className="sr-only">Reveal shape</span>
            </Button>
          ))}
      </div>
    </div>
  );
}
