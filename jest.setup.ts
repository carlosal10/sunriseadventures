import React from 'react';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    alt,
    fill: _fill,
    priority: _priority,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    alt?: string;
    fill?: boolean;
    priority?: boolean;
  }) => React.createElement('img', { alt: alt ?? '', ...props }),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: React.ReactNode;
  }) => React.createElement('a', { href, ...props }, children),
}));
