import { searchText } from '../i18n/translate';
import { useI18n } from '../i18n/context';
export function CommandPalette({
  command,
  setCommand,
  commands,
  onChoose,
  onClose,
}: {
  command: string;
  setCommand: (value: string) => void;
  commands: readonly string[];
  onChoose: (name: string) => void;
  onClose: () => void;
}) {
  const { tr } = useI18n();
  return (
    <div className="modal-backdrop" onClick={() => onClose()}>
      <div
        className="command-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={tr('Command palette')}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Tab') {
            const controls =
              e.currentTarget.querySelectorAll<HTMLElement>('input,button');
            const first = controls[0],
              last = controls[controls.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last?.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first?.focus();
            }
          }
        }}
      >
        <input
          autoFocus
          aria-label={tr('Find command')}
          placeholder={tr('Find a command…')}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        {commands
          .filter((n) => searchText(tr(n)).includes(searchText(command)))
          .map((n) => (
            <button key={n} onClick={() => onChoose(n)}>
              {tr(n)}
            </button>
          ))}
        <button onClick={() => onClose()}>{tr('Close')}</button>
      </div>
    </div>
  );
}
