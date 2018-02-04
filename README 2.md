# Client Web Application Core Library

## Introduction

The client web application core user interface library has been developed as a joint effort across cx/ux, qa, and development. The goal of the library is to provide consistent quality standards across domains and individual feature teams which then affords rapid development and reuse of shared ui components and common design standards. It provides a mechanism for teams to share code that is production ready, i.e. meets quality guidelines, functional/non-functional requirements, and is easily distributable and updatable.

The open source model is what drives the development and progression to core's usefulness and evolution. We would hope that we remain inclusive to the needs of teams across the group in providing them with patterns and solutions that aid in an increase in overall velocity. In the same way, we hope that teams contribute back to the library both in improving what is already there as well as introducing new components and solutions.

Want to be involved in the discussion regarding how core is maintained, how it evolves, what components are good candidates, and how existing ones can be improved? There are a couple ways you can go about bringing your insight and knowledge to help us improve:

1. [Come to the guild.](http://confluence.sandbox.extranet.group/display/EN/Front-End+Guild)
2. More ways to contribute coming in the future :smirk:

## Installation Guide

For normal development, this module can be added as a dependency to your local project via:

```javascript
npm i -S cwa-core
```
**Note** you may need to set your npm registry appropriately to the following:
```javascript
http://nexus.sandbox.extranet.group/nexus/content/groups/npm-master/
```
by running

```javascript
npm config set registry <registry url>
```
or by running the installation via:

```javascript
npm i --registry http://nexus.sandbox.extranet.group/nexus/content/groups/npm-master/
```
more information can be found at [npm-config](https://docs.npmjs.com/misc/config#registry)


The above will update your local project's package.json by adding it as a dependency. **Note:** the above allows for you to use the components from core but in a read-only fashion. You will not be able to make any changes to the library itself. If there is a need to extend a component or add a new candidate there is a review process and that discussion, for the time being, can be kicked off at the guild, but if changes are needed then please refer to the below.

###### Linking Core for local development and testing

Since core has been developed as a node module and because its code lives within [Gerrit](http://gerrit.sandbox.extranet.group/), as do other projects hosted within the Sandbox, and the easiest way to test changes locally is to clone the repo which can be found [here](http://gerrit.sandbox.extranet.group/#/admin/projects/client-web-application/core). Once you've cloned the repository and run ```npm install ```, you can then run ```npm link``` which will create a globally-installed symbolic link from cwa-core to the current folder. Once this has been completed you can navigate to your project's root and run ```npm link cwa-core``` which will create a symlink from the local node_modules folder to the global symlink. More information on npm and linking can be found [here](https://docs.npmjs.com/cli/link).

Once the above has been completed, you can make changes to cwa-core in the ```src``` directory and then execute ```npm run build``` which will transpile the changes and that will kick off any follow-up build processes in your local project if you've configured an associated watch task.

**Note:** Because Radium, which is a set of tools to manage inline styles on React elements, requires individual projects that consume core components to apply a ```<StyleRoot>``` component at the topmost level within an application because of the following:

> StyleRoot wraps its children in a plain div followed by the root style sheet. Radium plugins, like keyframes and media queries, use this style sheet to inject CSS at runtime. Because the style sheet appears after your rendered elements, it is populated correctly during a server render.

It is required that, for the time-being, teams include [Radium](https://github.com/FormidableLabs/radium) as a dependency of their projects via ```npm i -S radium``` and the dependency will be added as a peer of core. Thus eliminating the bug where multiple instances of Radium are detected and also removing the errors thrown in the console.

**Note:** For those linking core in development you'll need to include Radium in core itself to test the Storybook output if you are not testing directly from within a host application. You will also need it in order to run the unit tests. We are currently investigating alternatives to Radium so any input is appreciated.:smile:

###### Versioning
We follow the Semver specification for versioning and release management so please refer to the following if you do not know what that is. [Semantic Versioning Specification](http://semver.org/#semantic-versioning-specification-semver)

### Running Tests
Currently the unit test are using [jasmine](https://jasmine.github.io/) which is a behavior-driven development framework for testing JavaScript code. It does not depend on any other JavaScript frameworks.

The current convention for testing your code is to include a test directory alongside your component. This allows for easier portability if a component is moved as its assets and core dependencies are packaged together within the same directory and this holds true for the unit tests as well.

In order for jasmine to pick up your newly added tests then please follow the below naming convention:

- [filename].spec.js

To run your test simply use ```npm test```, which will use [nyc](https://github.com/istanbuljs/nyc) to log any failing unit tests and report your overall coverage to your respective terminal or command prompt.

### Build Commands
```npm run build```
To trigger the build and output the needed files that are used for the package you can run this command. This is the same command that will be run internally when either a patchset or master build is triggered by Jenkins. For local development, this command can be run to transpile all of the code in **src** via babel and output it to **lib**.

```npm run transpile```
This command is run by the build command described above with the exception that it does not run any clean task prior to transpiling your code from ES6 -> ES5.

```npm run clean:[lib|coverage]```
This will recursively remove all files and directories in the respective directories. **lib** for transpiled source and **coverage** which is where the reports for the unit test coverage are kept.

```npm run storybook```
This kicks off a webpack dev server and spawns a child process on a given port, one for each **brand** and **channel** that has been configured in the **.storybook/brandInfo.js** file. Storybook and the additional commands that are supported can be referenced in the **STORYBOOK.md** file located in the root of the project. The basic concept behind Storybook is that any component can be stubbed and displayed locally via webpack and alternatively an application instance can be deployed. This is useful for a couple reasons:
1. If you are developing locally on core alone then there is no other means to view your changes other than linking, but linking requires you to host another application that implements a development server.
2. For rapid design and ux feedback, Storybook is a great tool for other stakeholders to use which does not require a development environment.

#### Storybook

Storybook is a UI dev tool which allows developers to see the React components they are developing without having to run the actual application. It also allows a developer to interact with the component and change properties live (e.g. button label).

##### Setup

Storybook is configured and ready to use. However due to a bug in the installer you will need to do the following if you clone this repo or delete `node_modules`:
```
npm install
npm install
npm rebuild
```

**Note:** Storybook requires node version 6.9.x to successfully install and run the storybook application. It might be the case that when the initial npm install runs it might throw errors while bootstrapping the storybook dependencies. This can be resolved by running ```npm run storybook``` again if errors were thrown on ```npm install```.

##### Running it

```npm run storybook``` will start a local server. Just visit `localhost:6006` in a browser.

##### Static output

The ```npm run build-storybook``` script will create a static site that can be hosted elsewhere. This will allow other stakeholders to browse the components without needing a local dev instance. As a developer you do not really need to use this. If you want to try it out you will need a local web server to point to the `.out` directory. You then have to visit `localhost/<brand>/index.html` to browse the static site. Again, you can navigate the various brands via the UI.

##### Eject scripts

There are a couple of eject scripts in `package.json`. See the `storybook` package documentation in gerrit for more information.

##### Writing stories

There are stories for most, if not all, components. The stories are in the `story.js` file placed next to each component. Browse the stories to see how to write more.

For more information on how to write stories and the plugins see the following:
* [storybook in gerrit](http://gerrit.sandbox.local:8080/#/admin/projects/client-web-application/storybook)
* [create-storybook in gerrit](http://gerrit.sandbox.local:8080/#/admin/projects/client-web-application/create-storybook)
* [Official Storybook documentation](https://getstorybook.io/docs)
* [Component property controls plugin](https://github.com/storybooks/storybook-addon-knobs)
* [Usage info plugin](https://github.com/storybooks/react-storybook-addon-info)
* [Startup options plugin](https://github.com/storybooks/storybook-addon-options)

For more information on storybook please checkout their [docs](https://getstorybook.io/docs).

### Components
The core ui library follows the atomic design principle for architecting its components. Therefore, each component will need to be defined as either a block, module, or pattern.
##### Blocks
Applied to web interfaces, blocks are our HTML tags, such as a form label, an input or a button. They are the lowest level and all other components are built on top or consume them internally.
##### Modules
Modules are groups of atoms bonded together and are the smallest fundamental units of a compound. These modules take on their own properties and serve as the backbone of our design systems. For example, a form label, input or button aren’t too useful by themselves, but combine them together as a form and now they can actually do something together.
##### Patterns
Patterns can consist of similar and/or different module types. For example, a masthead pattern might consist of diverse components like a logo, primary navigation, search form, and list of social media channels. But a “product grid” pattern might consist of the same module (possibly containing a product image, product title and price) repeated over and over again.

Building up from modules to patterns encourages creating standalone, portable, reusable components.

### Brand Assets
Currently the assets all live within their respective brand/channel directories. Each individual project is responsible for how they copy these assets into their application bundles. The paths for say fonts are specified using the ```!default``` rule which allows feature teams to specify the path to these as a sass variable within the project code itself. If this is not specified then by default the reference to the fonts is '../fonts' which assumes that the font are in a directory one level above the css once it is compiled.

- sass
- images
- fonts
- icons

### Naming Conventions
Naming for files should be lowercase, separated by dashes and namespaced to the category that they are described by, e.g. component, actions, store, etc.

###### **Why?**
- Easy to quickly identify the purpose of the file via the category.
- Keeps a consistent naming pattern which is helpful for jumping between projects.

| Avoid                         	| Recommended                    	|
|-------------------------------	|--------------------------------	|
| SomeComponent.js              	| some.component.js              	|
| another-crazy-component.js    	| another-crazy.component.js     	|
| UserStore.js                  	| user.store.js                  	|
| HappinessTracker-component.js 	| happiness-tracker.component.js 	|

You can namespace the files with the following categories:

- component
- store
- actions
- config
- utils

##### Components/Classes
Components and classes should be CapitalisedCamelCase

```javascript
/* AVOID */
const tabComponent = React.createClass();
const tabComponent = () => {}

function tabComponent() {}
function person() {}

/* RECOMMENDED */
const TabComponent = React.createClass();
const TabComponent = () => {}

function Person () {}
function TabComponent() {}
```

### Coding Standards
##### Single Responsibility
Define one component per file and write the least amount of code for it's purpose. As a rule of thumb, any changes to the component shouldn't affect anything else.

###### **Why?**
- Small blocks of code are easier to test and mock.
- It's easier to read, understand and maintain.
- It's easier to find and fix bugs.
- Helps making code more reusable.

```javascript
/* AVOID */
const List = ({ list }) => {
    const ListItem = ({ label }) => (
        <li>{label}</li>
    );

    if (list.length) {
        return list.map(item => <ul><ListItem label={item.label} /></ul>);
    }
    return <span />;
}
export default List;

/* RECOMMENDED */

// list-item.component.js
export const ListItem = ({ label }) => <li>{label}</li>;

// list.component.js
import { ListItem } from 'list-item.component';

export const List = ({ list }) => {
    return (list || []).map((item, index) => (
        <ul><ListItem key={index} label={item.label} /></ul>
    )) || <noscript />;
}
```
##### Functional components vs. Container components
Functional components by their definition are just pure JavaScript functions that return a React element (HTML markup). Functional components should return the same expected output given the props that are passed in. They will be the building blocks that you can use inside your Container components. The majority of your application should be made up of functional components.

Container components  hold some state or deal with state. These components will be fetching the initial state from the stores and firing actions. They are parent level components that use functional components inside of them.

##### Functional Components (A.K.A Pure, Stateless, Dumb, Presentational)
Write any presentational components, so components that have no state, as normal functions instead of using the React.createClass() method.

###### **Why?**
- Predictable behaviour - i.e. Returns the same markup given the same props.
- Easier to reason about when writing test.
- Writing your components like this makes things more reusable and exportable.

**Note**: You can not use any React lifecycle methods inside functional components, if you need to use these, then instead create a normal Stateful component. In addition, you can not return null from a stateless component until [react@v15.0.0](https://facebook.github.io/react/blog/2016/04/07/react-v15.html#functional-components-can-now-return-null-too)

##### Implicit Return
In ES6 you can also use implicit returns.
##### **Why?**
- You write less code.
- Makes things more readable.

```javascript
/* GOOD */
const Text = (props) => {
  return (
    <p>{props.children}</p>
  )
};

/* BETTER */
const Greeter = props => <p>Hello {props.children}</p>;
```

##### DefaultProps
You should add default props when needed.

```javascript
/* RECOMMENDED */
const Greeter = ({ name = 'World' }) => (
  <p>Hello {name}</p>
)

// Would return <p>Hello World</p> if no argument is passed
```

```javascript
/* AVOID */
class Table extends PureComponent {
  render() {
    return (
      <div>
        {this.props.items.map(i =>
          // USING THIS.PROPS.OPTIONS || [] CAUSES THE SHALLOW EQUALITY
          // CHECK TO FAIL AND THUS WILL CAUSE A RE-RENDER
          <Cell data={i} options={this.props.options || []} />
         )}
       </div>
     );
  }
}

/* BETTER */
const default = [];
class Table extends PureComponent {
  render() {
    return (
      <div>
        {this.props.items.map(i =>
          <Cell data={i} options={this.props.options || default} />
         )}
       </div>
     );
  }
}

/* RECOMMENDED */
class Table extends PureComponent {
  render() {
    return (
      <div>
        {this.props.items.map(i =>
          <Cell data={i} options={this.props.options} />
         )}
       </div>
     );
  }
}

Table.defaultProps = { options: [] };
```

##### PropTypes
You should add propTypes to your components
###### **Why?**
- As your app grows it's helpful to ensure that components are used correctly.
- Allows other developers to quickly understand the types that can be passed in.
- Gives warnings when invalid types are used.

For a full list of propTypes, please consult the [React documentation](https://facebook.github.io/react/docs/reusable-components.html#prop-validation).

```javascript
/* RECOMMENDED */
const Greeter = props => <p>Hello {props.name}</p>;

Greeter.propTypes = {
  name: React.PropTypes.string
}
```

##### Late Function Binding
You should bind your functions early either within the constructor, via class properties, or autobind decorators.
###### **Why?**
- There are performance implications since the function is reallocated on every render
- Arrow functions adopt the this binding of the enclosing scope (in other words, they don’t change the meaning of this), so things just work automatically.
```javascript
/* AVOID */
class Person extends React.Component {
  constructor(props) {
    super(props);
  }
  onChange(e) {
    console.log('clicked');
  }
  render() {
    return <button onClick={e => this.onChange(e)}>Continue</button>
  }
}

/* RECOMMENDED */
class Person extends React.Component {
  constructor(props) {
    super(props);
  }
  onChange = () => {
    // call this function from render
    // and this.whatever in here works fine.
  }
  render() {
    return <button onClick={this.onChange}>Continue</button>
  }
}
```

##### Comments
Write comments for every function, method and component you create. Each function should have a comment using the [jsDoc](http://usejsdoc.org/) syntax including names, descriptions, params and returns.

###### **Why?**
- It helps us create documentation faster using jsDoc, instead of writing it from scratch.
- Helps other developers understand your intentions when writing a block of code.
- Helps you structure your components cleaner and think better about how to structure your tests.

```javascript
/**
* @name ListComponent
* @param {Object[]} list - List of elements
* @param {string} list[].label - The list item label
* @return {string} - A HTML output with <ul>{children}</ul>
*/

export default const ListComponent = ({ list }) => <ul><ListItem label={item.label} /></ul>;
```
For a full list of options and documentation about jsDoc, you can always consult the [jsDoc](usejsdoc.org) library.

### Testing
Unit tests ensure that individual components of the app work as expected. Assertions test the component API against all expected input params and types for both happy and unhappy scenarios.

Integration tests ensure that component collaborations work as expected. Assertions may test component API, UI or components interaction with a store.

Functional tests ensure that the application works as expected from the users perspective. Assertions test the user interface from within a browser.
##### Jasmine [:link:](http://jasmine.github.io/)

Jasmine is a testing framework for JavaScript which aims to be easy to read. A simple test looks like the below, where **describe()** describes a suite of tests and **it()** is an individual test specification.

```javascript
// source code
function helloWorld() {
  return 'Hello world!';
}

// test code
describe('Hello world', () => {
  it('says hello', () => {
    expect(helloWorld()).toEqual('Hello world!');
  });
});
```

##### Enzyme [:link:](http://airbnb.io/enzyme/)
Enzyme is a JavaScript Testing utility for React that makes it easier to assert, manipulate and traverse your React Component's output. It provides a clear API for setting props, state, and triggering events and much more.
