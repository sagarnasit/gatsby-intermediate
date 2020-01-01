import React from 'react';
import { graphql } from 'gatsby';
import DocsPage from '../components/docs-page'

export const query = graphql`
    query ($pageId: String!) {
        docsPage(id: {eq: $pageId}) {
            id
            title
            updated(fromNow: true)
            body
        }
    }
`;

const DocsPageTemplate = ({ data }) => <DocsPage page={data.docsPage} />;

export default DocsPageTemplate;
