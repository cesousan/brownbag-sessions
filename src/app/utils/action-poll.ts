import { Observable, Subscription, Subject, interval } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

/**
 *
 * @param PollAction an Action to be triggered every time the pollInterval is met.
 * @param store the store containing the pollaction
 * @param pollInterval the interval in seconds, defaults value is 2 seconds
 * @return two functions: start and stop.
 */
export function pollMachine<T>(PollAction, store: Store<T>, pollInterval = 2): PollingMachine {
  const stop$: Subject<void> = new Subject();
  const polling: Observable<number> = interval(pollInterval * 1000).pipe(
    takeUntil(stop$),
    tap(() => store.dispatch(new PollAction())),
  );
  const start = () => polling.subscribe();

  const stop = () => stop$.next();

  return {
    start,
    stop
  };
}

export interface PollingMachine {
  start: () => Subscription;
  stop: () => void;
}
