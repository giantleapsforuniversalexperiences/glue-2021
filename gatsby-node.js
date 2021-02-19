const path = require('path');
const fs = require('fs');

exports.onCreateWebpackConfig = ({ actions }) => {
	actions.setWebpackConfig({
      	resolve: {
          	modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      	},
  	});
};

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const {
    	GATSBY_PRISMIC_PREVIEW_PATH,
    	GATSBY_PRISMIC_ACCESS_TOKEN,
    	GATSBY_PRISMIC_REPO,
    } = process.env;

    createPage({
    	path: GATSBY_PRISMIC_PREVIEW_PATH,
    	component: path.resolve(__dirname, 'src/templates/previews.js'),
    	context: {
        	repositoryName: GATSBY_PRISMIC_REPO,
        	accessToken: GATSBY_PRISMIC_ACCESS_TOKEN,
      	},
	});
	
	// Home - create the home page
	const homePage = await graphql(`{
		allPrismicHomePage {
			nodes {
				id
			}
		}
	}`);

	homePage.data.allPrismicHomePage.nodes.forEach((page) => createPage({
		path: '/',
		component: path.resolve(__dirname, 'src/templates/home.js'),
		context: { id: page.id },
	}));


	// Content - create all content pages
	const contentPages = await graphql(`{
		allPrismicContentPage {
			nodes {
				id
				uid
				data {
					page_parent {
						uid
				  	}
				}
			}
		}
	}`);

	contentPages.data.allPrismicContentPage.nodes.forEach((page) => createPage({
		path: (page.data.page_parent.uid) ? `/${page.data.page_parent.uid}/${page.uid}` : `/${page.uid}`,
		component: path.resolve(__dirname, 'src/templates/content.js'),
		context: { id: page.id },
	}));


	// Work Index - create the work index page
	const workIndexPage = await graphql(`{
		allPrismicWorkIndexPage {
			nodes {
				id
				uid
			}
		}
	}`);
	const workIndexSlug = workIndexPage.data.allPrismicWorkIndexPage.nodes[0].uid;

	workIndexPage.data.allPrismicWorkIndexPage.nodes.forEach((page) => createPage({
		path: `/${workIndexSlug}`,
		component: path.resolve(__dirname, 'src/templates/work-index.js'),
		context: { id: page.id },
	}));


	// Work Individual - create the work individual pages
	const workIndividualPage = await graphql(`{
		allPrismicWorkIndividualPage {
			nodes {
				id
				uid
			}
		}
	}`);

	workIndividualPage.data.allPrismicWorkIndividualPage.nodes.forEach((page) => createPage({
		path: `/${workIndexSlug}/${page.uid}`,
		component: path.resolve(__dirname, 'src/templates/work-individual.js'),
		context: { id: page.id },
	}));


	// Blog Index - create the blog index page
	const blogIndexPage = await graphql(`{
		allPrismicBlogIndexPage {
			nodes {
				data {
					featured_blog {
						document {
							... on PrismicBlogIndividualPage {
								uid
							}
						}
					}
				}
				id
				uid
			}
		}
	}`);
	const blogIndexSlug = blogIndexPage.data.allPrismicBlogIndexPage.nodes[0].uid;

	blogIndexPage.data.allPrismicBlogIndexPage.nodes.forEach((page) => createPage({
		path: `/${blogIndexSlug}`,
		component: path.resolve(__dirname, 'src/templates/blog-index.js'),
		context: { id: page.id, featuredBlogUid: page.data.featured_blog.document.uid },
	}));


	// Blog Individual - create the work individual pages
	const blogIndividualPage = await graphql(`{
		allPrismicBlogIndividualPage {
			nodes {
				id
				uid
			}
		}
	}`);

	blogIndividualPage.data.allPrismicBlogIndividualPage.nodes.forEach((page) => createPage({
		path: `/${blogIndexSlug}/${page.uid}`,
		component: path.resolve(__dirname, 'src/templates/blog-individual.js'),
		context: { id: page.id },
	}));


	// linkResolver sitemap -  generate a sitemap json file which is used in the linkResolver to apply the correct URLs for links in pages
	const allPages = await graphql(`{
		allPrismicBlogIndexPage {
			nodes {
				uid
			}
		}
		allPrismicBlogIndividualPage {
			nodes {
				uid
			}
		}
		allPrismicContentPage {
			nodes {
				uid
				data {
					page_parent {
						uid
				  	}
				}
			}
		}
		allPrismicWorkIndexPage {
			nodes {
				uid
			}
		}
		allPrismicWorkIndividualPage {
			nodes {
				uid
			}
		}
	}`).then((result) => {
        if (result.errors) {
            return Promise.reject(result.errors);
		}

		const sitemap = {
            pages: [],
		};

		result.data.allPrismicBlogIndexPage.nodes.forEach((page) => {
			const uid = page.uid;
			
			sitemap.pages.push({
				uid: uid,
				slug: `/${blogIndexSlug}`,
			});
		});

		result.data.allPrismicBlogIndividualPage.nodes.forEach((page) => {
			const uid = page.uid;
			
			sitemap.pages.push({
				uid: uid,
				slug: `/${blogIndexSlug}/${uid}`,
			});
		});
		
		result.data.allPrismicContentPage.nodes.forEach((page) => {
			const parentUid = page.data.page_parent.uid;
			const uid = page.uid;

			sitemap.pages.push({
				uid: uid,
				slug: (parentUid) ? `/${parentUid}/${uid}` : `/${uid}`,
			});
		});

		result.data.allPrismicWorkIndexPage.nodes.forEach((page) => {
			const uid = page.uid;
			
			sitemap.pages.push({
				uid: uid,
				slug: `/${workIndexSlug}`,
			});
		});

		result.data.allPrismicWorkIndividualPage.nodes.forEach((page) => {
			const uid = page.uid;
			
			sitemap.pages.push({
				uid: uid,
				slug: `/${workIndexSlug}/${uid}`,
			});
		});

		// Create linkResolver sitemap JSON file
		fs.writeFile('src/utility/linkResolverSitemap.json', JSON.stringify(sitemap), 'utf8', (err) => {
			if (err) throw err;
		});
	});

}
