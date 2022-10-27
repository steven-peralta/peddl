import React from 'react';
import { Container } from 'react-bootstrap';

type PageProps = {
  title: string;
  children: JSX.Element | JSX.Element[];
};
export default function Content({ title, children }: PageProps) {
  return (
    <Container>
      <h1 className="mb-3 mt-3">{title}</h1>
      {children}
    </Container>
  );
}
