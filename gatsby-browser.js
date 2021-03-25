import * as React from 'react';
import { PreviewStoreProvider } from 'gatsby-source-prismic';

export const wrapRootElement = ({ element }) => (
	<PreviewStoreProvider>{element}</PreviewStoreProvider>
)

async function loadPolyfills() {
	if (typeof window.IntersectionObserver === 'undefined') {
    	await require('intersection-observer');
	}
}

loadPolyfills();