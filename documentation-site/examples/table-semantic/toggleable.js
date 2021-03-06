// @flow
import React, {useState} from 'react';
import {Checkbox} from 'baseui/checkbox';
import {StyledLink as Link} from 'baseui/link';
import {
  Unstable_TableBuilder,
  Unstable_TableBuilderColumn,
} from 'baseui/table-semantic';

export default () => {
  const [data, setData] = useState([
    {
      foo: 10,
      bar: 'banana',
      url: 'https://example.com/b',
      selected: true,
    },
    {
      foo: 1,
      bar: 'carrot',
      url: 'https://example.com/c',
      selected: false,
    },
    {
      foo: 2,
      bar: 'apple',
      url: 'https://example.com/a',
      selected: false,
    },
  ]);

  const hasAny = Boolean(data.length);
  const hasAll = hasAny && data.every(x => x.selected);
  const hasSome = hasAny && data.some(x => x.selected);

  function toggleAll(event) {
    setData(data =>
      data.map(row => ({
        ...row,
        selected: !hasAll,
      })),
    );
  }

  function toggle(event) {
    const {name, checked} = event.currentTarget;

    setData(data =>
      data.map(row => ({
        ...row,
        selected: String(row.foo) === name ? checked : row.selected,
      })),
    );
  }

  return (
    <Unstable_TableBuilder data={data}>
      <Unstable_TableBuilderColumn
        overrides={{
          TableHeadCell: {style: {width: '1%'}},
          TableBodyCell: {style: {width: '1%'}},
        }}
        header={
          <Checkbox
            checked={hasAll}
            isIndeterminate={!hasAll && hasSome}
            onChange={toggleAll}
          />
        }
      >
        {row => (
          <Checkbox
            name={row.foo}
            checked={row.selected}
            onChange={toggle}
          />
        )}
      </Unstable_TableBuilderColumn>
      <Unstable_TableBuilderColumn header="Produce">
        {row => <Link href={row.url}>{row.bar}</Link>}
      </Unstable_TableBuilderColumn>
      <Unstable_TableBuilderColumn header="Quantity" numeric>
        {row => row.foo}
      </Unstable_TableBuilderColumn>
    </Unstable_TableBuilder>
  );
};
