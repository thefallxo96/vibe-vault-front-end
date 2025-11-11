import React, { useRef, useState } from "react";

/**
 * BottomSheet
 * - Swipe down to close on touch
 * - For desktop, show as centered modal if `centerOnDesktop` is true
 */
export default function BottomSheet({
  open,
  onClose,
  children,
  centerOnDesktop = false,
  title = "Details",
}) {
  const sheetRef = useRef(null);
  const startY = useRef(0);
  const [translate, setTranslate] = useState(0);

  if (!open) return null;

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    setTranslate(0);
  };

  const handleTouchMove = (e) => {
    const delta = e.touches[0].clientY - startY.current;
    if (delta > 0) setTranslate(delta);
  };

  const handleTouchEnd = () => {
    if (translate > 90) {
      onClose?.();
    } else {
      setTranslate(0);
    }
  };

  return (
    <div className="fixed inset-0 z-[90]">
      <div className="absolute inset-0 bg-black/40" onClick={() => onClose?.()} />

      <div
        ref={sheetRef}
        className={`absolute left-0 right-0 bg-white dark:bg-gray-900 shadow-xl
          ${centerOnDesktop ? "md:inset-0 md:mx-auto md:max-w-2xl md:h-[70vh] md:rounded-2xl" : ""}
          ${centerOnDesktop ? "bottom-auto md:flex md:flex-col md:justify-start" : "bottom-0 rounded-t-2xl"}
          p-4`}
        style={{
          transform: centerOnDesktop ? undefined : `translateY(${translate}px)`,
          transition: translate ? "none" : "transform 160ms ease",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="mx-auto w-10 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 mb-3 md:hidden" />
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">{title}</h3>
          <button
            onClick={() => onClose?.()}
            className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto max-h-[65vh] md:max-h-full">{children}</div>
      </div>
    </div>
  );
}
