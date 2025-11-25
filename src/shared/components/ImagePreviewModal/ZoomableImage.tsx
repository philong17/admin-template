import { Image as MantineImage } from '@mantine/core';
import { useState } from 'react';
import type { MouseEvent } from 'react';

interface ZoomableImageProps {
  src: string | null | undefined;
  alt?: string;
  maxHeight?: string | number;
  maxWidth?: string | number;
}

export const ZoomableImage = ({ src, alt, maxHeight = '90vh', maxWidth = '90vw' }: ZoomableImageProps) => {
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [scrollPos, setScrollPos] = useState({ left: 0, top: 0 });

  const handleDoubleClick = (e: MouseEvent<HTMLImageElement>) => {
    if (scale === 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setOrigin({ x, y });
      setScale(2.5);
    } else {
      setScale(1);
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (scale > 1) {
      setIsDragging(true);
      setStartPos({ x: e.clientX, y: e.clientY });
      setScrollPos({ left: e.currentTarget.scrollLeft, top: e.currentTarget.scrollTop });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging && scale > 1) {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      e.currentTarget.scrollLeft = scrollPos.left - dx;
      e.currentTarget.scrollTop = scrollPos.top - dy;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight,
        maxWidth,
        width: '100%',
        height: '100%',
        cursor: scale === 1 ? 'zoom-in' : isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}>
      <MantineImage
        src={src}
        alt={alt}
        radius='md'
        onDoubleClick={handleDoubleClick}
        style={{
          maxWidth: scale === 1 ? '100%' : 'none',
          maxHeight: scale === 1 ? '100%' : 'none',
          width: scale === 1 ? 'auto' : 'auto',
          height: scale === 1 ? 'auto' : 'auto',
          transform: scale > 1 ? `scale(${scale})` : 'none',
          transformOrigin: `${origin.x}% ${origin.y}%`,
          transition: isDragging ? 'none' : 'transform 0.3s ease',
          objectFit: 'contain',
          pointerEvents: 'auto',
        }}
      />
    </div>
  );
};
