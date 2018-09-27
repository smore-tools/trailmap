import { FunctionalComponent } from '@stencil/core';
import { Redirect } from './redirect';

interface Props {
    /** The base URL for this group of routes, for example `/docs` */
    base: string;
    
    /**
     * The component that should be rendered when a route matches, for example `page-docs` 
     * This component will be passed `MatchResults` with both `name` and `path`
     */
    component: string;

    /** 
     * A `Map<string, string>` object containing all possible valid routes
     * 
     * The *key* of each entry represents the url path, appended to `base` (for example, `hello-world` would become `/docs/hello-world`)
     * 
     * The *value* of each entry represents a path to the content, to be passed to the component as `MatchResults.params.path` (for example, `/content/intro/hello-world.md`)
     */
    paths: Map<string, string>;
}

export const TrailMap: FunctionalComponent<Props> = (props) => {
    const url = props.base.trim().replace(/^\/|\/$/g, '');
    const firstPage = Array.from(props.paths.keys())[0];

    return [
        <Redirect url={`/${url}`} redirect={`/${url}/${firstPage}`} />,
        <stencil-route url={`/${url}/:name`} routeRender={({ history, match, pages }) => {
            const name = match.params.name;
            const path = props.paths.get(name);
            
            const ChildComponent = props.component;
            const childProps = { history, match: { ...match, params: { ...match.params, path } }, pages };

            return (path)
                ? <ChildComponent {...childProps} />
                : <stencil-router-redirect url="/404"></stencil-router-redirect>
        }} />
    ]
}