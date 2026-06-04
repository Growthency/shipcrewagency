/** Drifting gradient blobs + optional engineering grid. CSS-animated, no JS. */
export function Atmosphere({
  grid = true,
  blobs = true,
}: {
  grid?: boolean;
  blobs?: boolean;
}) {
  return (
    <div className="aurora" aria-hidden="true">
      {blobs && (
        <>
          <span className="aurora__blob aurora__blob--1" />
          <span className="aurora__blob aurora__blob--2" />
          <span className="aurora__blob aurora__blob--3" />
        </>
      )}
      {grid && <div className="grid-overlay" />}
    </div>
  );
}
