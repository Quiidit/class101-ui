import React from 'react';
import Typography, { HeadlineTypoProps } from '.';

export default ({ children, ...restProps }: HeadlineTypoProps) => (
  <Typography md="Headline3" {...restProps}>
    {children}
  </Typography>
);
