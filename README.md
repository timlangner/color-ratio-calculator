# chayns® React Pagemaker Template

## `project.json` file

This file will determine several aspects of the build chain.

| Parameter    | Usage                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------- |
| internalName | The internal name of your project, will be used to determine the build path for staging builds. |
| subproject   | The name of your subproject, helpful if you have multiple frontends in a single project.        |
| externalName | The external name of your project, will be used in the title of generated HTML file.            |

## Development

1. Install all project dependencies with `yarn`
2. Adjust your `project.json` file.
3. Start your webpack-dev-server for debugging your project with `yarn start`

    > The webpack-dev-server is now running on your localhost on the port 8080. If the port is not available you can change it in the `webpack.config.js`.

    > `yarn start` runs the server in HTTPS mode.

4. Enable eslint in your development environment. _(not necessary, but recommended)_
5. Implement the example Tapp to your [chayns® site][https://chayns.net].
    1. Go to configuration -> Tapps
    2. Click `Add Tapp`
    3. Use external content
    4. Give the Tapp a name and type in the following URL : `https://localhost:8080`
    5. Click `add`
6. Start development.

> **Hint:** Writing Tapps with React? You might also want to take a look at our [React Style Guide][https://github.com/tobitsoftware/chayns-guides/blob/master/tobitreactjsxstyleguide.md].

## Building

You can build this project via `yarn build`.

You can also build this project with sourceMaps for testing via `yarn build:staging`.
It then can be found at https://tappqa.tobit.com/{internalName}/{subproject}/
