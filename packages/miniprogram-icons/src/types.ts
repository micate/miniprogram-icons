import type { ImageProps } from '@tarojs/components';
import { CSSProperties } from 'react';

export interface MiniProgramIconsConfig {
  // 用户可以通过 module augmentation 扩展此接口
  // strictProps: true;
}

export interface StrictIconProps {
  /** 传入 'inherit' 可使用 MiniProgramIconsProvider 提供的默认尺寸 */
  size: number | 'inherit' | (string & {});
  /** 传入 'inherit' 可使用 MiniProgramIconsProvider 提供的默认颜色 */
  color: 'inherit' | (string & {});
}

export interface DefaultIconProps {
  size?: number | string;
  color?: string;
}

export type IconProps = Omit<ImageProps, 'src' | 'style'> & {
  filled?: boolean;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
  className?: string;
  style?: CSSProperties;
} & (MiniProgramIconsConfig extends { strictProps: true } ? StrictIconProps : DefaultIconProps);
