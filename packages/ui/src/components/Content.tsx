import React from 'react';
import { Container } from 'react-bootstrap';

type PageProps = {
  title?: string;
  style?: React.CSSProperties;
  children: JSX.Element | JSX.Element[];
};
export default function Content({ title, children, style }: PageProps) {
  return (
    <Container style={style ?? { marginTop: '76px' }}>
      {title && <h1 className="mb-3 mt-3">{title}</h1>}
      {children}
    </Container>
  );
}
