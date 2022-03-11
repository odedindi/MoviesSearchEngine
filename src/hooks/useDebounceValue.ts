import * as React from 'react';

import { Subject } from 'rxjs';
import {
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
} from 'rxjs/operators';

type useDebouncedValueArgs = {
	time: number;
	initialValue: string;
};

type UseDebouncedValue = (
	args?: Partial<useDebouncedValueArgs>,
) => [string, (v: string) => void];

export const useDebouncedValue: UseDebouncedValue = ({
	time,
	initialValue,
} = {}) => {
	const [value, setVal] = React.useState<string>(() => initialValue ?? '');
	const [values$] = React.useState<Subject<string>>(
		() => new Subject<string>(),
	);

	React.useEffect(() => {
		const subscription = values$
			.pipe(
				map((v) => v.trim()),
				distinctUntilChanged(),
				filter((v) => v.length >= 2),
				debounceTime(time ?? 750),
			)
			.subscribe(setVal);
		return () => subscription.unsubscribe();
	}, [time, values$]);

	return [value, (v: string) => values$.next(v)];
};
