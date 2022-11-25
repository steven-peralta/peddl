import React, { SetStateAction } from 'react';

export type ReactState<T> = [T, React.Dispatch<SetStateAction<T>>];
