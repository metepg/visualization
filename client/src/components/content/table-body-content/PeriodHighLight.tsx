import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isActive?: boolean;
}

const PeriodHighLight: React.FC<Props> = ({ children, isActive }) => (
  <div
    style={{
      borderLeft: '2px solid transparent',
      borderRight: '2px solid transparent',
      borderLeftColor: isActive ? 'rgba(227, 24, 55, 1)' : 'transparent',
      borderRightColor: isActive ? 'rgba(227, 24, 55, 1)' : 'transparent',
      backgroundColor: isActive ? 'rgba(227, 24, 55, 0.05)' : 'transparent',
      height: '100%',
      boxSizing: 'border-box',
    }}
  >
    {children}
  </div>
);

export default PeriodHighLight;
