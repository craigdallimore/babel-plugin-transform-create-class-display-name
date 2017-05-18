# babel-transform-create-class-display-name

It would appear that one of the differences between `React.createClass` and [https://www.npmjs.com/package/create-react-class](create-react-class) is that the latter will no longer implictly add a `displayName` to the Component.

You might see `<Unknown>` in the react-devtools as a consequence.

This babel plugin will implicitly transform

```javascript
const Foo = reactCreateClass({

})
```

into

```javascript
const Foo = reactCreateClass({

  displayName : 'Foo'

})
```
