'use client';

import { useReducer, useEffect } from 'react';
import { SpotifyTrack } from '@/models/spotifyApiResponses';
import { AsyncState, AsyncAction } from '@/models/async';

const initialState: AsyncState<SpotifyTrack[]> = {
	status: 'idle',
	data: null,
	error: null,
};

function reducer<T>(
	_state: AsyncState<T>,
	action: AsyncAction<T>,
): AsyncState<T> {
	if (action.type === 'fetch')
		return { status: 'loading', data: null, error: null };
	if (action.type === 'success')
		return { status: 'success', data: action.data, error: null };
	if (action.type === 'error')
		return { status: 'error', data: null, error: action.error };

	throw new Error('Unhandled action type');
}

export function useSpotifyTrackSearch(query: string) {
	const [state, dispatch] = useReducer(reducer<SpotifyTrack[]>, initialState);

	useEffect(() => {
		if (!query) return;

		dispatch({ type: 'fetch' });

		fetch('/api/spotify/token')
			.then((res) => {
				if (!res.ok) throw new Error(`Token error: ${res.status}`);
				return res.json() as Promise<{ accessToken: string }>;
			})
			.then(({ accessToken }) => {
				const url = new URL('https://api.spotify.com/v1/search');
				url.searchParams.set('q', query);
				url.searchParams.set('type', 'track');

				return fetch(url, {
					headers: { Authorization: `Bearer ${accessToken}` },
				});
			})
			.then((res) => {
				if (!res.ok) throw new Error(`Spotify API error: ${res.status}`);
				return res.json() as Promise<{ tracks: { items: SpotifyTrack[] } }>;
			})
			.then((data) => dispatch({ type: 'success', data: data.tracks.items }))
			.catch((err: unknown) => {
				dispatch({
					type: 'error',
					error: err instanceof Error ? err.message : 'Unknown error',
				});
			});
	}, [query]);

	return {
		tracks: state.data,
		loading: state.status === 'loading',
		error: state.error,
	};
}
