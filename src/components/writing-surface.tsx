"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/button";
import { brushWidth } from "@/content/writing";

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

export function WritingSurface({ glyph, onComplete }: { glyph: string; onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<InkStroke[]>([]);
  const activeStroke = useRef<InkStroke | null>(null);
  const [strokeCount, setStrokeCount] = useState(0);

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
    redraw();
  }

  function undo() {
    strokes.current = strokes.current.slice(0, -1);
    setStrokeCount(strokes.current.length);
    redraw();
  }

  function clear() {
    strokes.current = [];
    activeStroke.current = null;
    setStrokeCount(0);
    redraw();
  }

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="relative aspect-square w-[min(78vw,320px)] overflow-hidden rounded-[var(--radius-lg)] bg-surface shadow-[inset_0_0_0_1px_var(--color-line)]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-kana text-[clamp(10rem,56vw,14rem)] leading-none text-ink opacity-20"
        >
          {glyph}
        </span>
        <canvas
          ref={canvasRef}
          aria-label={`Drawing area for tracing ${glyph}`}
          className="absolute inset-0 h-full w-full touch-none select-none"
          onPointerDown={beginStroke}
          onPointerMove={extendStroke}
          onPointerUp={finishStroke}
          onPointerCancel={finishStroke}
        />
      </div>

      <div className="flex min-h-11 items-center justify-center gap-2">
        <Button variant="ghost" onClick={undo} disabled={strokeCount === 0}>
          Undo
        </Button>
        <Button variant="ghost" onClick={clear} disabled={strokeCount === 0}>
          Clear
        </Button>
      </div>

      <Button variant="primary" wide onClick={onComplete}>
        Continue
      </Button>
    </div>
  );
}
