export type RuntimeState = {
  lastError: string | null;
  readyAt: string | null;
  startedAt: string;
};

export function createRuntimeState(): RuntimeState {
  return {
    lastError: null,
    readyAt: null,
    startedAt: new Date().toISOString(),
  };
}
