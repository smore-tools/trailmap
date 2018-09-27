![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# TrailMap

TrailMap is a simple Functional Component to be used with `@stencil/router` within Stencil apps. It simplifies the process of grouping a set of routes and mapping URLs to a path where content can be found.

## Getting Started

```bash
npm install @smore/trailmap
```

Add `TrailMap` to your `<stencil-route-switch>` definiton (most likely in `app-root`.) Under the hood, it will generate the necessary `<stencil-route>` and `<stencil-router-redirect>` elements.
```tsx
import { TrailMap } from '@smore/trailmap';

/** More on this below */
const DocPaths = new Map<string, string>([
    ['hello-world', 'content/intro/hello-world.md']
])

...

<stencil-router>
    <stencil-route-switch scrollTopOffset={0}>
        <stencil-route url='/' component='page-home' exact={true} />
        <TrailMap base='/docs' component='page-docs' paths={DocPaths} />
        <stencil-route component='page-notfound' />
    </stencil-route-switch>
</stencil-router>
```

## Rendering Content
The component you pass to `component` will be passed `MatchResults` with both `name` and `path`. 

In order to render the content, you will likely need to do something like:

```tsx
export class MyComponent {
    @Prop() match: MatchResults;

    componentDidLoad() {
        fetch(this.match.params.path)
            .then(res => res.text())
            .then(content => this.handleContent(content))
    }
}
```

If all of your content is an `.md` file contained in `/content`, then you might consider fetching using the `paths` value to store just the document path (`intro/hello-world`) and fetching `content/${this.match.params.path}.md` in the component

## API

#### TrailMap Props

** base **
The base URL for this group of routes, for example `/docs`

** component **
The component that should be rendered when a route matches, for example `page-docs`.

** paths **
A `Map<string, string>` object containing all possible valid routes.

The *key* of each entry represents the url path, appended to `base` (for example, `hello-world` would become `/docs/hello-world`)

The *value* of each entry represents a path to the content, to be passed to the component as `MatchResults.params.path` (for example, `/content/intro/hello-world.md`)
