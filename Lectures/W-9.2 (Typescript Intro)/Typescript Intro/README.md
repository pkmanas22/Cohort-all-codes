# Installation

1. Install typescript globally

   ```
   npm i -g typescript
   ```

   Check your TypeScript version by running:

   ```
   tsc -v
   ```

2. Navigate to your project folder and initialize a `package.json` file by running:

   ```
   npm init
   ```

   or

   ```
   npm init -y
   ```

   This command initializes a `package.json` file without asking for any details.

3. Convert your project to a TypeScript environment by running:
   ```
   tsc --init
   ```
   or
   ```
   npx tsc --init
   ```
   This command generates a `tsconfig.json` file in your project directory.

# Compilation

1. Create a `.ts` file and compile it by running:

   ```
   tsc -b
   ```

   When we use `tsc -b`, it generates build information but does not create `.js` files in error. <br>
   On the other hand, simply using `tsc` without any flags also works but produces a warning in case of error; however, it does create the .js files as well.

2. Run the compiled `.js` file using Node.js:
   ```
   node *.js
   ```

# `tsconfig.json` file

## 1. target

The `target` property in the `tsconfig.json` file specifies the language version your TypeScript code will be compiled to. For example:

- If `"target": "es2016"` is set, arrow functions will be compiled the same way as arrow functions.

```
"use strict";
const greet = (name) => `Hello, ${name}!`;
```

- However, if `"target": "es5"` is set (an older version of ECMAScript), arrow functions will be compiled into regular functions.

```
"use strict";
var greet = function (name) { return "Hello, ".concat(name, "!"); };
```

Update your `tsconfig.json` file accordingly to specify the desired target version of ECMAScript.

## 2. rootDir

Where should the compiler look for `.ts` files. Good practise is for this to be the `src` (source) folder

## 3. outDir

Where should the compiler look for spit out the `.js` files.
Good practise is for this to be the `dist` (distribution) or (build) folder

# `.gitignore` file

Create a `.gitignore` file in your project directory and add `dist` and `node_modules` to prevent them from being pushed to GitHub.
