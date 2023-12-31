/* @jsx jsx */
import { ReactElement } from 'react';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';

import { useBleepsOnAnimator } from '../utils/useBleepsOnAnimator';
import { FRAME_POLYLINE, FrameProps, Frame } from '../utils/Frame';

interface FramePentagonProps <E> extends FrameProps<E> {
  lineWidth?: number
  squareSize?: number
  inverted?: boolean
}

function FramePentagon <E> (props: FramePentagonProps<E> & WithAnimatorInputProps): ReactElement {
  const { animator, className, lineWidth, squareSize, inverted, ...otherProps } = props;

  useBleepsOnAnimator({
    entering: 'assemble',
    exiting: 'assemble'
  });

  const { space, outline } = useTheme();
  const ss = squareSize as number;

  let polyline1: FRAME_POLYLINE = [];
  let polyline2: FRAME_POLYLINE = [];

  if (!inverted) {
    polyline1 = [
      [0, '100%'],
      [`100% - ${ss}`, '100%'],
      ['100%', `100% - ${ss}`],
      ['100%', 0]
    ];
    polyline2 = [
      [0, 0]
    ];
  }
  else {
    polyline1 = [
      [0, 0],
      [0, `100% - ${ss}`],
      [ss, '100%'],
      ['100%', '100%']
    ];
    polyline2 = [
      ['100%', 0]
    ];
  }

  return (
    <Frame
      {...otherProps}
      className={cx('arwes-frame-pentagon', className)}
      css={{
        padding: `${space(2)}px ${space(4)}px`
      }}
      shapes={[
        polyline1.concat(polyline2)
      ]}
      polylines={[
        polyline1,
        // Polyline2 joins with ending vertexes of Polyline1.
        [
          polyline1[polyline1.length - 1],
          ...polyline2,
          polyline1[0]
        ]
      ]}
      lineWidth={outline(lineWidth)}
    />
  );
}

FramePentagon.defaultProps = {
  lineWidth: 1,
  squareSize: 15
};

export { FramePentagonProps, FramePentagon };
