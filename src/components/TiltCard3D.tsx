import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  maxAngle?: number;
  scaleOnHover?: number;
  onClick?: () => void;
  id?: string;
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  className = '',
  maxAngle = 5,
  scaleOnHover = 1.008,
  onClick,
  id
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates normalized to -0.5 to +0.5
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Calculate rotate angles (subtle & restrained)
    const tiltY = mouseX * maxAngle * 2;
    const tiltX = -mouseY * maxAngle * 2;

    setRotX(tiltX);
    setRotY(tiltY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
  };

  // Dynamic subtle shadow displacement
  const shadowX = -rotY * 1.5;
  const shadowY = rotX * 1.5;

  return (
    <div
      id={id}
      className="perspective-1200 w-full"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotX,
          rotateY: rotY,
          scale: isHovered ? scaleOnHover : 1
        }}
        whileTap={{ scale: 0.99 }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 26,
          mass: 0.5
        }}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `${shadowX}px ${shadowY + 12}px 36px rgba(32, 29, 26, 0.06), 0 2px 8px rgba(32, 29, 26, 0.03)`
            : '0 4px 20px rgba(36, 33, 30, 0.02)'
        }}
        className={`relative transition-all duration-300 ${className}`}
      >
        <div style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }} className="w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
