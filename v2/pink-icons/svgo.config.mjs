export default {
	plugins: [
		{
			name: 'preset-default',
			params: {
				overrides: {
					cleanupIds: false,
					inlineStyles: {
						onlyMatchedOnce: false
					}
				}
			}
		}
	]
};
