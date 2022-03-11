import * as React from 'react';
import { Subject } from 'rxjs';

export const useDestroySubscription = (): Subject<boolean> => {
	const destroySubscription$ = new Subject<boolean>();
	React.useEffect(() => {
		return () => {
			destroySubscription$.next(true);
			destroySubscription$.complete();
		};
	}, []);

	return destroySubscription$;
};

export default useDestroySubscription;
