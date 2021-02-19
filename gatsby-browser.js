import * as React from 'react';
import { PreviewStoreProvider } from 'gatsby-source-prismic';
// import 'focus-visible/dist/focus-visible.js';

export const wrapRootElement = ({ element }) => (
	<PreviewStoreProvider>{element}</PreviewStoreProvider>
)