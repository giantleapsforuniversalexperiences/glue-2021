const linkResolverSitemap = require('./linkResolverSitemap.json');

const linkResolver = ({ node, key, value } = {}) => doc => {
	const linkType = doc.link_type;

	function returnFullPageSlug(uid) {
		const object = linkResolverSitemap.pages.find(obj => obj.uid === uid);
		return (object.slug) ? object.slug : `/${uid}`;
	}

	if (linkType === 'Media' || linkType === 'Web') {
    	return doc.url;
	}
	else if (linkType === 'Document') {
    	switch(doc.type) {
			case "home_page": return '/';
			case "blog_index_page": return returnFullPageSlug(doc.uid);
			case "blog_individual_page": return returnFullPageSlug(doc.uid);
			case "contact_page": return returnFullPageSlug(doc.uid);
			case "content_page": return returnFullPageSlug(doc.uid);
			case "work_index_page": return returnFullPageSlug(doc.uid);
			case "work_individual_page": return returnFullPageSlug(doc.uid);
			default: return `/`;
    	}
  	}
};

export default linkResolver;