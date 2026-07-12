import React from 'react'

function LogoMark({ size = 34, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 120 120'
      role='img'
      aria-label='Kimdienhomes'
      className={className}
    >
      <polygon points='15,68 60,26 68,34 30,70 30,105 15,105' fill='#C69A54' />
      <polygon
        points='34,105 34,74 84,28 116,58 116,105 100,105 100,66 84,51 50,82 50,90 88,90 100,105 34,105'
        fill='#16375E'
      />
    </svg>
  );
}

export default LogoMark