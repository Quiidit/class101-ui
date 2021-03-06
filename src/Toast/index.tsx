import React, { ReactNode, ReactElement } from 'react';
import styled, { css } from 'styled-components';

import * as Colors from '../Colors';
import { elevation1 } from '../ElevationStyles';
import { IconProps } from '../Icon';
import { Position } from '../Position';
import { ToasterPosition } from '../Toaster';

import { fadeOutKeyFrames, slideDownKeyFrames, slideUpKeyFrames } from './keyframes';

export const DEFAULT_TIMEOUT = 5000;
export const UNMOUNT_ANIMATION_SECONDS = 0.2;

export interface Props {
  backgroundColor?: string;
  button?: ReactElement<IconProps> | string;
  color?: string;
  icon?: ReactElement<IconProps>;
  message: string;
  position?: ToasterPosition;
  timeout?: number;
  onButtonClicked?: () => void;
  onClose?: () => void;
  dismiss?: () => void;
}

interface State {
  unmount: boolean;
}

export default class Toast extends React.Component<Props, State> {
  public static defaultProps = {
    position: Position.TOP,
    timeout: DEFAULT_TIMEOUT,
  };

  public state: State = {
    unmount: false,
  };
  private unmountAnimationTimeout?: NodeJS.Timeout;

  public componentDidMount() {
    const { dismiss, timeout } = this.props;

    if (!timeout) {
      throw Error('No timeout prop!');
    }

    if (timeout > 0) {
      this.unmountAnimationTimeout = setTimeout(() => {
        this.setState({
          unmount: true,
        });
      }, timeout - UNMOUNT_ANIMATION_SECONDS * 1000);

      if (dismiss) {
        setTimeout(dismiss, timeout);
      } else {
        throw Error('No dismiss prop!');
      }
    }
  }

  public render() {
    const { button, dismiss, icon, message, onButtonClicked } = this.props;
    const { unmount } = this.state;

    return (
      <UnmountAnimation unmount={unmount}>
        <Container {...this.props}>
          {Boolean(icon) && (
            <Icon>
              {React.cloneElement(icon as React.DetailedReactHTMLElement<IconProps, HTMLElement>, { size: 18 })}
            </Icon>
          )}
          <Message>{message}</Message>
          {Boolean(button) && (
            <Action onClick={onButtonClicked || dismiss}>
              {typeof button !== 'object'
                ? button
                : React.cloneElement(button as React.DetailedReactHTMLElement<IconProps, HTMLElement>, { size: 18 })}
            </Action>
          )}
        </Container>
      </UnmountAnimation>
    );
  }

  public componentWillUnmount() {
    const { onClose } = this.props;

    if (this.unmountAnimationTimeout) {
      clearTimeout(this.unmountAnimationTimeout);
    }

    if (onClose) {
      onClose();
    }
  }
}

const unmountAnimationCss = css`
  animation: ${fadeOutKeyFrames} ${UNMOUNT_ANIMATION_SECONDS}s;
`;

const unmountedCss = css`
  opacity: 0;
`;

const UnmountAnimation = styled.div<{ unmount: boolean }>`
  ${props => props.unmount && unmountAnimationCss}
  ${props => props.unmount && unmountedCss}
`;

const Container = styled.div<Partial<Props>>`
  width: 280px;
  border-radius: 3px;
  padding: 14px 16px;
  line-height: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  background-color: ${props => props.backgroundColor || Colors.gray900};
  color: ${props => props.color || 'white'};
  margin-top: ${props =>
    props.position === Position.TOP || props.position === Position.TOP_LEFT || props.position === Position.TOP_RIGHT
      ? '20px'
      : 0};
  margin-bottom: ${props =>
    props.position === Position.BOTTOM ||
    props.position === Position.BOTTOM_LEFT ||
    props.position === Position.BOTTOM_RIGHT
      ? '20px'
      : 0};
  animation: ${props =>
      props.position === Position.TOP || props.position === Position.TOP_LEFT || props.position === Position.TOP_RIGHT
        ? slideDownKeyFrames
        : slideUpKeyFrames}
    0.1s ease-out;
  ${elevation1}
`;

const Icon = styled.span`
  height: 20px;
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

const Message = styled.span`
  line-height: 20px;
`;

const Action = styled.button`
  border: 0;
  background-color: inherit;
  color: inherit;
  cursor: pointer;
  font-size: inherit;
  margin-left: auto;
  padding: 0;

  &:active {
    outline: none;
  }
`;
