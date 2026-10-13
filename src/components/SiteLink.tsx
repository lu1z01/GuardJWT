import type { ComponentProps } from 'react';
/** Keep the language provider mounted during same-tab navigation. */
export function SiteLink({ onClick, ...props }: ComponentProps<'a'>) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          props.target ||
          props.download !== undefined ||
          !props.href
        )
          return;
        const url = new URL(props.href, window.location.href);
        if (
          url.origin !== window.location.origin ||
          url.search ||
          url.hash ||
          !['/', '/docs', '/privacy', '/security', '/about'].includes(
            url.pathname,
          )
        )
          return;
        event.preventDefault();
        if (url.pathname !== window.location.pathname) {
          window.history.pushState(null, '', url.pathname);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      }}
    />
  );
}
