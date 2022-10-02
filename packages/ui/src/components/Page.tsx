import React from 'react';

type PageProps = {
  title: string;
  children: JSX.Element;
};
export default function Page({ title, children }: PageProps) {
  return (
    <>
      <h1 className="mt-3 mb-3">{title}</h1>
      {children}
    </>
  );
}
