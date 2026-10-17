/** In-memory handoff between routes. Never written to storage, URLs or logs. */
export type Theme = 'system' | 'light' | 'dark';
const state = { token: '', theme: 'system' as Theme };
export const session = {
  /** Read without consuming: React may run initializers and effects twice. */
  peekToken() {
    return state.token;
  },
  clearToken() {
    state.token = '';
  },
  putToken(token: string) {
    state.token = token;
  },
  getTheme() {
    return state.theme;
  },
  setTheme(theme: Theme) {
    state.theme = theme;
  },
};
