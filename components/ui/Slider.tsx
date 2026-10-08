"use client";

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
};

export default function Slider({ label, value, min, max, step = 1, onChange }: SliderProps) {
  return (
    <label className="block text-sm">
      <span className="flex justify-between font-bold">
        <span>{label}</span>
        <span className="math">{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
