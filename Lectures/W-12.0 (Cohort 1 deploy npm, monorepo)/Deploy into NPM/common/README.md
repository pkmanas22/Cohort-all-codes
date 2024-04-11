1. Initialize npm
```
npm init -y
```

2. Initialize typescript
```
npx tsc --init
```

3. Complete your code

4. Update in `package.json`
- Update `name` as `@manaskp/mymodule`
- Update `version` every time you publish your module
- Update `main` to your directory. In my case I use typescript so, I have to enter the `.js`. So `dist/index.js`

4. Build typescript code
- First change `rootDir = 'src' ` and `outDir = 'dist'` in `tsconfig.json`
- Update `declaration = true` in this file. So that it will generate `index.d.ts`. This file is for type definition
- THen build the code
```
tsc -b
```

4. Then login to npm
```
npm login
```
5. Then publish it to public
```
npm publish --access=public
```
6. Create a `.npmignore` file and put `src/` in it.
```
npx npmignore
```
7. Pack the published file, and it will generate `.zip` file
```
npm pack
```

8. Then import in ur needed place, by
```
npm i {npm module name}
```