import React from 'react';
import { Text, View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { SvgUri } from 'react-native-svg';
import { twMerge } from 'tailwind-merge';

import RiveAnimation from '@/shared/ui/animations/RiveAnimation';
import { RemoteSvg } from '@/shared/ui/svg/RemoteSvg';

type HtmlTextProps = {
  html: string;
  className?: string;
  oneLine?: boolean;
};

const createRenderNode =
  (oneLine: boolean) =>
  (
    node: any,
    index: number,
    _siblings: any[],
    _parent: any,
    defaultRenderer: (children: any[], parent: any) => React.ReactNode
    // eslint-disable-next-line max-params
  ) => {
    const textLineProps = oneLine ? { numberOfLines: 1 as const } : {};

    // 1) Nếu là text node, wrap trong <Text> để chắc chắn hiển thị bên trong <View>
    if (node.type === 'text') {
      const text = node.data?.trim();
      if (!text) return null;
      return (
        <Text
          key={index}
          {...textLineProps}
          textBreakStrategy="balanced"
          lineBreakMode="clip"
          className="items-center justify-center text-justify font-bevietnampro text-sm text-white"
        >
          {text}
        </Text>
      );
    }

    if (node.name === 'span') {
      const spanClass = node.attribs.class || node.attribs.className || '';
      return (
        <View key={index}>
          {node.children.map((child: any) => {
            if (child.type === 'text') {
              const text = child.data?.trim();
              if (!text) return null;
              return (
                <Text
                  key={index}
                  {...textLineProps}
                  textBreakStrategy="balanced"
                  lineBreakMode="clip"
                  className={twMerge(` ${spanClass}`)}
                >
                  {text}
                </Text>
              );
            }
          })}
        </View>
      );
    }

    // 2) Wrap <p> thành <View row> và đệ quy render các con
    if (node.name === 'p') {
      const pClass = node.attribs.class || node.attribs.className || '';
      return (
        <View
          key={index}
          className={twMerge(`flex-1 flex-row items-center justify-center ${pClass}`)}
        >
          {node.children.map((child: any, i: number) =>
            createRenderNode(oneLine)(child, i, node.children, node, defaultRenderer)
          )}
        </View>
      );
    }

    // 3) Thay <img src="…svg"> thành <SvgUri>
    if (
      node.name === 'img' &&
      typeof node.attribs.src === 'string' &&
      (node.attribs.src.endsWith('.svg') || node.attribs.src.endsWith('.riv'))
    ) {
      const {
        src,
        width,
        height,
        animationname: animationName,
        currentcolor: currentColor,
      } = node.attribs;

      return animationName ? (
        <RiveAnimation
          key={index}
          className={`size-7 max-w-7 px-1`}
          animationName={animationName}
          autoplay
          source={src}
        />
      ) : currentColor ? (
        <RemoteSvg
          key={index}
          uri={src}
          color={currentColor}
          width={Number(width) || 24}
          height={Number(height) || 24}
        />
      ) : (
        <SvgUri key={index} uri={src} width={Number(width) || 24} height={Number(height) || 24} />
      );
    }

    // 4) Render <b> thành <Text> in đậm, cách icon một chút
    if (node.name === 'b') {
      return (
        <Text key={index} className="items-center justify-center font-bevietnampro-bold text-white">
          {node.children.map((child: any, i: number) =>
            createRenderNode(oneLine)(child, i, node.children, node, defaultRenderer)
          )}
        </Text>
      );
    }

    // 5) Fallback: để HTMLView tự xử lý (ví dụ các thẻ a, i, span…)
    return defaultRenderer(node.children, node);
  };

export default function HtmlText({ html, className, oneLine = true }: HtmlTextProps) {
  return (
    <View className={className}>
      <HTMLView value={html} renderNode={createRenderNode(oneLine)} />
    </View>
  );
}
