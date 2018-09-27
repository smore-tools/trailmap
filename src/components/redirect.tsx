import { FunctionalComponent } from '@stencil/core';

interface Props {
    /** The base URL for this group of routes */
    url: string;
    /** The path to which any bare redirects (for example, `/docs` or `/docs/` rather than `/docs/:name`) should be pointed */
    redirect: string;
}

export const Redirect: FunctionalComponent<Props> = ({ url, redirect }) => ([
    <stencil-route url={url} exact routeRender={() => <stencil-router-redirect url={redirect} />} />,
    <stencil-route url={url + '/'} exact routeRender={() => <stencil-router-redirect url={redirect} />} />
])