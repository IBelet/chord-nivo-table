import React, { useState } from 'react';
import { ResponsiveChord } from '@nivo/chord';
import './App.scss';

const headers = ['S', 'F', 'G', 'V', 'N', 'H', 'O', 'W'];

const defaultValues = [
  [78, 4, 10, 18, 12, 10, 13, 10],
  [10, 93, 1, 33, 9, 69, 21, 25],
  [1, 0, 61, 1, 16, 1, 20, 3],
  [0, 0, 4, 39, 17, 0, 2, 1],
  [1, 1, 6, 7, 42, 1, 3, 2],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 3, 1, 1, 5, 20, 0],
  [9, 1, 15, 1, 3, 14, 21, 59],
];

export const App = () => (
  <div className="app">
    <NivoChord />
    <Table />
  </div>
);

const Table = () => {
  const [rows, setRows] = useState(defaultValues);

  const sums = rows.map((row, i) => (
    <td>
      <button type="button">
        {rows.reduce((acc, item) => acc + +item[i], 0)}
      </button>
    </td>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th />
          {headers.map(header => (
            <th>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, outerIndex) => (
          <tr>
            <th>{headers[outerIndex]}</th>
            {row.map((num, innerIndex) => (
              <td>
                <input
                  type="number"
                  value={num}
                  min="0"
                  max="100"
                  onChange={(event) => {
                    rows[outerIndex][innerIndex] = event.target.value;
                    setRows([...rows]);
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
        <tr>
          <th />
          {sums}
        </tr>
      </tbody>
    </table>
  );
};

const NivoChord = () => (
  <ResponsiveChord
    matrix={defaultValues}
    keys={headers}
    margin={{
      top: 30, right: 30, bottom: 30, left: 30,
    }}
    innerRadiusRatio={0.95}
  />
);
