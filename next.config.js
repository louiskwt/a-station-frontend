const withPWA = require('next-pwa');

module.exports = {
	images: {
		domains: ['res.cloudinary.com']
	},
	pwa: {
		dest: 'public',
		register: true,
		skipWaiting: true
	}
};
