import React, { useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';

export const RemoteSvg = ({ uri = '', color = '#000', width = 24, height = 24 }) => {
  const [xml, setXml] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const res = await fetch(uri);
      let text = await res.text();

      // Loại bỏ fill/stroke cứng
      // text = text.replace(/fill="[^"]*"/gi, '').replace(/stroke="[^"]*"/gi, '');

      // Hoặc chuyển thành currentColor
      text = text.replace(/fill="[^"]*"/gi, 'fill="currentColor"');

      if (isMounted) setXml(text);
    })();

    return () => {
      isMounted = false;
    };
  }, [uri]);

  if (!xml) return null;

  // color prop ở SvgXml sẽ áp cho currentColor
  return <SvgXml xml={xml} color={color} width={width} height={height} />;
};
