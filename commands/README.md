# Commands

To add a new command, create a `.js` file that exports an object containing:

```js
{
    cmdRe: /^\.someCommand$/,// command regex
    description: 'this will show up in the help command',
    exec: msg => {}, // some function to call when the command is executed
}
```