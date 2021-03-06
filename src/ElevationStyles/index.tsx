import { css } from 'styled-components';

export type ElevationValue = 1 | 2 | 3 | 4 | 5;
export interface ElevationProps {
  /** 그림자 깊이 */
  elevation?: ElevationValue;
}

export const elevation1 = css`
  box-shadow: 0 1px 3px -1px rgba(41, 42, 43, 0.16), 0 0 1px 1px rgba(0, 0, 0, 0.04);
`;

export const elevation2 = css`
  box-shadow: 0 2px 6px -2px rgba(41, 42, 43, 0.16);
`;

export const elevation3 = css`
  box-shadow: 0 8px 10px -4px rgba(41, 42, 43, 0.2);
`;

export const elevation4 = css`
  box-shadow: 0 12px 16px -6px rgba(41, 42, 43, 0.2);
`;

export const elevation5 = css`
  box-shadow: 0 24px 32px -8px rgba(41, 42, 43, 0.24);
`;
