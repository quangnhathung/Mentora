import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function LockSvg(props: any) {
  return (
    <Svg
      width={17}
      height={19}
      viewBox="0 0 17 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.179 8.313h-.911V5.64C14.268 2.53 11.68 0 8.5 0 5.32 0 2.732 2.53 2.732 5.64v2.673h-.91C.815 8.313 0 9.11 0 10.092v7.126C0 18.202.816 19 1.821 19H15.18C16.184 19 17 18.202 17 17.219v-7.125c0-.984-.816-1.781-1.821-1.781zm-3.947 0H5.768V5.64c0-1.474 1.226-2.672 2.732-2.672 1.507 0 2.732 1.198 2.732 2.672v2.671z"
        fill="#BABABA"
      />
    </Svg>
  );
}

export default LockSvg;
