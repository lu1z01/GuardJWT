import { useState, type ReactNode } from 'react';
import { print, type Value } from '../core/parsing/json';
export function JsonTree({
  value,
  selected,
  onSelect,
}: {
  value: Value;
  selected?: string;
  onSelect: (pointer: string) => void;
}) {
  const [wrap, setWrap] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [query, setQuery] = useState('');
  let count = 0;
  function render(v: Value, path: string, depth: number): ReactNode {
    if (++count > 500) return <span>…</span>;
    if (v === null || typeof v !== 'object')
      return (
        <span
          className={
            'syntax-' +
            (typeof v === 'string'
              ? 'string'
              : typeof v === 'number' || typeof v === 'bigint'
                ? 'number'
                : 'literal')
          }
        >
          {print(v, false)}
        </span>
      );
    const array = Array.isArray(v),
      entries = Object.entries(v);
    return (
      <>
        {array ? '[' : '{'}
        {'\n'}
        {entries.map(([k, child], i) => {
          if (count > 500) return null;
          const pointer =
            path + '/' + k.replace(/~/g, '~0').replace(/\//g, '~1');
          return (
            <span key={k}>
              {'  '.repeat(depth + 1)}
              {!array && (
                <>
                  <button
                    className={
                      'json-key ' +
                      (selected === pointer ? 'selected ' : '') +
                      (query &&
                      (pointer + ' ' + print(child, false))
                        .toLowerCase()
                        .includes(query.toLowerCase())
                        ? 'search-match'
                        : '')
                    }
                    aria-label={'Inspect claim ' + pointer}
                    onClick={() => onSelect(pointer)}
                  >
                    {JSON.stringify(k)}
                  </button>
                  {': '}
                </>
              )}
              {render(child, pointer, depth + 1)}
              {i < entries.length - 1 ? ',' : ''}
              {'\n'}
            </span>
          );
        })}
        {'  '.repeat(depth)}
        {array ? ']' : '}'}
      </>
    );
  }
  return (
    <>
      <div className="toolbar json-controls">
        <button aria-pressed={wrap} onClick={() => setWrap(!wrap)}>
          Wrap lines
        </button>
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Collapse all' : 'Expand all'}
        </button>
        <input
          aria-label="Find in visible JSON"
          placeholder="Find in visible JSON"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setExpanded(true);
          }}
        />
      </div>
      <pre
        tabIndex={0}
        aria-label="JSON payload viewer"
        className={'json-tree ' + (wrap ? '' : 'no-wrap')}
      >
        {expanded ? render(value, '', 0) : '{ … }'}
      </pre>
      {count > 500 && (
        <p className="muted">
          Interactive view limited to 500 nodes. Raw JSON and Claims search
          retain the full input.
        </p>
      )}
    </>
  );
}
