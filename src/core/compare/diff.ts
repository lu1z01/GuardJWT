import { claims } from '../claims/explore';
import { object, print, type Obj } from '../parsing/json';
import { words } from '../policy/evaluate';
function fields(value: Obj) {
  return new Map(
    claims(value)
      .filter((c) => !object(c.value) || !Object.keys(c.value).length)
      .map((c) => [c.pointer, c]),
  );
}
export function compare(a: Obj, b: Obj) {
  const left = fields(a),
    right = fields(b);
  return [...new Set([...left.keys(), ...right.keys()])].flatMap((path) => {
    const x = left.get(path),
      y = right.get(path);
    if (print(x?.value, false) === print(y?.value, false)) return [];
    const semantic = [
      'roles',
      'scope',
      'scp',
      'groups',
      'permissions',
      'aud',
    ].includes(x?.name ?? y?.name ?? '');
    const before = words(x?.value),
      after = words(y?.value);
    const beforeSet = new Set(before),
      afterSet = new Set(after);
    return [
      {
        path,
        status: !x ? 'Added' : !y ? 'Removed' : 'Changed',
        before: print(x?.value, false),
        after: print(y?.value, false),
        added: semantic ? after.filter((v) => !beforeSet.has(v)) : [],
        removed: semantic ? before.filter((v) => !afterSet.has(v)) : [],
      },
    ];
  });
}
