import { withAnimator } from '@arwes/animation';

import { FrameLinesProps, FrameLines as Component } from './FrameLines.component';

// TODO: withAnimator does not support a functional React component declared
// in "function Component () {}" notation with "defaultProps".
const FrameLines = withAnimator()(Component as any);

export { FrameLinesProps, FrameLines };
