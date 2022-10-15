import * as React from 'react';
import { Range, getTrackBackground } from 'react-range';

export type SliderProps = {
  step: number;
  min: number;
  max: number;
  onChange: (values: number[]) => void;
};

function Slider({ step = 1, min = 18, max = 100, onChange }: SliderProps) {
  const [values, setValues] = React.useState([20, 40]);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Range
        max={max}
        min={min}
        onChange={(v) => {
          setValues(v);
          onChange(v);
        }}
        renderThumb={({ index, props, isDragged }) => (
          <div
            className="form-label"
            {...props}
            style={{
              ...props.style,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-28px',
                left: '-14px',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '14px',
                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                padding: '4px',
                borderRadius: '4px',
                backgroundColor: 'black',
              }}
            >
              {values[index].toFixed(1)}
            </div>
            <div
              style={{
                height: '16px',
                width: '5px',
                backgroundColor: isDragged ? 'black' : '#CCC',
              }}
            />
          </div>
        )}
        renderTrack={({ props, children }) => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '.5rem',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors: ['#ccc', 'black', '#ccc'],
                  min,
                  max,
                }),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          </div>
        )}
        rtl={rtl}
        step={STEP}
        values={values}
      />
      {/* <span> */}
      {/*  onchange value 1: */}
      {/*  <span id="output">{values[0].toFixed(1)}</span> */}
      {/*  onchange value 2: */}
      {/*  <span id="output">{values[1].toFixed(1)}</span> */}
      {/* </span> */}
    </div>
  );
}

export default Slider;
