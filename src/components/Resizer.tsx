export function Resizer({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  function clamp(n: number) {
    onChange(Math.max(210, Math.min(550, n)));
  }
  return (
    <div
      className="resizer"
      role="separator"
      aria-label={label}
      aria-orientation="vertical"
      aria-valuemin={210}
      aria-valuemax={550}
      aria-valuenow={value}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.preventDefault();
          clamp(value + (e.key === 'ArrowRight' ? 10 : -10));
        }
      }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        e.currentTarget.dataset.start = String(e.clientX);
        e.currentTarget.dataset.width = String(value);
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId))
          clamp(
            Number(e.currentTarget.dataset.width) +
              e.clientX -
              Number(e.currentTarget.dataset.start),
          );
      }}
      onPointerUp={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId))
          e.currentTarget.releasePointerCapture(e.pointerId);
      }}
    />
  );
}
