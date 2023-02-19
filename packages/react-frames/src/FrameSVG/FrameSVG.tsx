import React, {
  type SVGProps,
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
  type CSSProperties,
  useRef,
  useCallback
} from 'react';
import { cx } from '@arwes/tools';
import { mergeRefs } from '@arwes/react-tools';
import { type FRAME_SVG_PATH_GENERIC, renderFrameSVGPaths } from '@arwes/frames';
import { useFrameSVGRenderer } from '../useFrameSVGRenderer/index';

interface FrameSVGProps extends SVGProps<SVGSVGElement> {
  paths?: FRAME_SVG_PATH_GENERIC[]
  onRender?: (svg: SVGSVGElement, width: number, height: number) => void
  className?: string
  style?: CSSProperties
  elementRef?: ForwardedRef<SVGSVGElement>
  children?: ReactNode
}

const FrameSVG = (props: FrameSVGProps): ReactElement => {
  const {
    paths,
    onRender: onRenderExternal,
    className,
    style,
    elementRef,
    children,
    ...otherProps
  } = props;

  const svgRef = useRef<SVGSVGElement>(null);

  const onRender = useCallback((svg: SVGSVGElement, width: number, height: number) => {
    if (paths) {
      renderFrameSVGPaths(svg, width, height, paths);
    }
    onRenderExternal?.(svg, width, height);
  }, [paths]);

  useFrameSVGRenderer(svgRef, onRender);

  return (
    <svg
      ref={mergeRefs(svgRef, elementRef)}
      className={cx('arwes-react-frames-framesvg', className)}
      xmlns='http://www.w3.org/2000/svg'
      // Even if it is still resized automatically, in case there is a delay
      // or the ResizeObserver API is not available, the SVG should be resized.
      preserveAspectRatio='none'
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'block',
        border: 0,
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        ...style
      }}
      {...otherProps}
    >
      {children}
    </svg>
  );
};

export type { FrameSVGProps };
export { FrameSVG };