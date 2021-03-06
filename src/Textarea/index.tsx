// @flow
import React from 'react';
import styled, { css } from 'styled-components';

import { gray000, gray300, gray400, gray500, gray600, gray800, orange500, redError } from '../Colors';
import { HTMLTextareaProps } from '../interfaces/props';
import { body2 } from '../TextStyles';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  inline?: boolean;
  allowMessage?: string;
  warnMessage?: string;
  errorMessage?: string;
}

const StyledTextarea = styled.textarea`
  ${body2};
  color: ${gray800};
  border-radius: 1px;
  background-color: white;
  border: solid 1px ${gray300};
  width: 100%;
  height: 104px;
  padding: 12px 16px;
  box-sizing: border-box;

  &:hover {
    border: solid 1px ${gray400};
  }
  &:disabled {
    background-color: ${gray000};
    &:hover {
      cursor: not-allowed;
    }
  }
  &:focus {
    outline: none;
    border-color: ${gray800};
  }
  &::-webkit-input-placeholder {
    color: ${gray500};
  }
  &::-moz-placeholder {
    color: ${gray500};
  }
  &:-ms-input-placeholder {
    color: ${gray500};
  }
  &:-moz-placeholder {
    color: ${gray500};
  }

  &.error {
    border: solid 1px ${redError};
  }

  &.warn {
    border: solid 1px ${orange500};
  }
`;

const DescriptionStyle = css`
  margin: 0;
  margin-top: 4px;
  font-size: 11px;
  line-height: 16px;
  font-weight: normal;

  * {
    vertical-align: middle;
  }
`;

const ErrorText = styled.h6`
  ${DescriptionStyle};
  color: ${redError};
`;

const WarnText = styled.h6`
  ${DescriptionStyle};
  color: ${orange500};
`;

const AllowText = styled.h6`
  ${DescriptionStyle};
  color: ${gray600};
`;

const Container = styled.div<Props>`
  display: ${props => (props.inline ? 'inline-block' : 'block')};
`;

const DescriptionIcon = styled.img.attrs({ alt: '!' })`
  width: 16px;
  height: 16px;
  margin-right: 2px;
`;

export default class Textarea extends React.PureComponent<HTMLTextareaProps & Props> {
  public render() {
    const { className, style, inputStyle, inline, allowMessage, warnMessage, errorMessage, ...restProps } = this.props;

    return (
      <Container style={style} inline={inline}>
        <StyledTextarea
          className={`${className || ''} ${errorMessage ? ' error' : ''} ${warnMessage ? ' warn' : ''}`}
          style={inputStyle}
          {...restProps}
        />
        {allowMessage && !errorMessage && <AllowText>{allowMessage}</AllowText>}
        {errorMessage && (
          <ErrorText>
            <DescriptionIcon src="https://s3.ap-northeast-2.amazonaws.com/class101-ui/images/ic-danger-red.png" />
            <span>{errorMessage}</span>
          </ErrorText>
        )}
        {warnMessage && (
          <WarnText>
            <DescriptionIcon src="https://s3.ap-northeast-2.amazonaws.com/class101-ui/images/ic-danger-yellow.png" />
            <span>{warnMessage}</span>
          </WarnText>
        )}
      </Container>
    );
  }
}
