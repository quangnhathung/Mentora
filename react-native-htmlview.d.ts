declare module 'react-native-htmlview' {
  import type * as React from 'react';
  import { Component } from 'react';
  import { type TextStyle, type ViewStyle } from 'react-native';

  export interface HTMLViewProps {
    /** HTML content to render */
    value: string;

    /** Optional style overrides for HTML tags */
    stylesheet?: Record<string, TextStyle | ViewStyle>;

    /** Called when a link is pressed */
    onLinkPress?: (url: string) => void;

    /** Called when the HTML is parsed */
    onParsed?: (dom: any) => void;

    /** Function to customize node rendering */
    renderNode?: (
      node: any,
      index: number,
      siblings: any[],
      parent: any,
      defaultRenderer: (children: any[], parent: any) => React.ReactNode
    ) => React.ReactNode;

    /** Optional custom root component */
    RootComponent?: React.ComponentType<any>;

    /** Optional custom text component */
    textComponentProps?: any;

    /** Container style */
    style?: ViewStyle;
  }

  export default class HTMLView extends Component<HTMLViewProps> {}
}
