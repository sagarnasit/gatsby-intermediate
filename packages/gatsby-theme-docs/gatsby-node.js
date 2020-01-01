const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const withDefaults = require('./utils/default-options');

exports.onPreBootstrap = ({ store }, options) => {
    const { program } = store.getState();
    const { contentPath } = withDefaults(options);
    const dir = path.join(program.directory, contentPath);

    if (!fs.existsSync(dir)) {
        mkdirp.sync(dir);
    }
}

exports.createSchemaCustomization = ({ actions }) => {
    actions.createTypes(`
        type DocsPage implements Node @dontInfer {
            id: ID!
            title: String!
            path: String!
            updated: Date! @dateformat
            body: String!
        }
    `)
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId }, options) => {
    const { basePath } = withDefaults(options);
    const parent = getNode(node.parent);

    // Only work on Mdx file created by this theme
    if (
        node.internal.type !== 'Mdx' ||
        // sourceInstanceName will be options name set with source plugin int theme config.
        parent.sourceInstanceName !== 'gatsby-theme-docs'
    ) {
        return;
    }

    // Treat `index.mdx` link `index.html`.
    const pageName = parent.name !== 'index' ? parent.name : '';

    actions.createNode({
        id: createNodeId(`DocsPage-${node.id}`),
        title: node.frontmatter.title || parent.name,
        updated: parent.modifiedTime,
        parent: node.id,
        path: path.join('/', basePath, parent.relativeDirectory, pageName), // relativeDirectory will take care for /docs/react/hooks for example
        internal: {
            type: 'DocsPage',
            contentDigest: node.internal.contentDigest,
        }
    });
}

exports.createResolvers = ({ createResolvers }) => {
    createResolvers({
        DocsPage: {
            body: {
                type: 'String!',
                // What we are doing here is that telling gatsby to use the same 
                // resolver Mdx uses for `body` field for the `DocsPage` type `body` field.
                resolve: (source, args, context, info) => {
                    // Load resolver for `Mdx` type `body` field.
                    const type = info.schema.getType('Mdx');
                    const mdxFields = type.getFields();
                    const resolver = mdxFields.body.resolve;

                    const mdxNode = context.nodeModel.getNodeById({ id: source.parent });

                    return resolver(mdxNode, args, context, {
                        fieldName: 'body'
                    })
                }
            }
        }
    })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
    const result = await graphql(`
        query {
            allDocsPage {
                nodes {
                    id
                    path
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panic('Errors loading docs', result.errors);
    }

    const pages = result.data.allDocsPage.nodes;
    console.log(pages);
    pages.forEach(page => {
        actions.createPage({
            path: page.path,
            component: require.resolve('./src/templates/docs-page-template.js'),
            context: {
                pageId: page.id,
            },
        })
    });
}