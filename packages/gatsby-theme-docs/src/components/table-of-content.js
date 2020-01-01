/** @jsx jsx */
import { jsx } from 'theme-ui';
import { graphql, Link, useStaticQuery } from 'gatsby';

const TableOfContent = () => {
    const data = useStaticQuery(graphql`
        query {
            allDocsPage {
                nodes {
                    id
                    title
                    path
                }
            }
        }
    `);

    const pages = data.allDocsPage.nodes;

    return (
        <div>
            <h2>Explore the Docs</h2>
            <ul>
                {pages.map(({ id, title, path }) => (
                    <li key={id}>
                        <Link
                            to={path}
                            sx={{
                                '&.active': {
                                    fontStyle: 'italic',
                                    textDecoration: 'none',
                                    color: 'grey',
                                }
                            }}
                            activeClassName="active"
                        >
                            {title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TableOfContent;