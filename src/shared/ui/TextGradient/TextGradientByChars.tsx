import { Canvas, Paragraph, Skia, TextAlign, useFonts } from '@shopify/react-native-skia';
import { useMemo } from 'react';

export const MyParagraph = () => {
  const customFontMgr = useFonts({
    Roboto: [
      require('@assets/fonts/BeVietnamPro-Regular.ttf'),
      require('@assets/fonts/BeVietnamPro-Bold.ttf'),
    ],
  });

  const paragraph = useMemo(() => {
    // Are the font loaded already?
    if (!customFontMgr) {
      return null;
    }
    const paragraphStyle = {
      textAlign: TextAlign.Center,
    };
    const textStyle = {
      color: Skia.Color('black'),
      fontFamilies: ['Roboto'],
      fontSize: 50,
    };
    return Skia.ParagraphBuilder.Make(paragraphStyle, customFontMgr)
      .pushStyle(textStyle)
      .addText('Say Hello to ')
      .pushStyle({ ...textStyle, fontStyle: { weight: 500 } })
      .addText('Skia 🎨')
      .pop()
      .build();
  }, [customFontMgr]);

  // Render the paragraph
  return (
    <Canvas style={{ width: 256, height: 256 }}>
      <Paragraph paragraph={paragraph} x={0} y={0} width={300} />
    </Canvas>
  );
};
