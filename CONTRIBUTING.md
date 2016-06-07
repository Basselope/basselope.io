Git workflow guide:

To begin working, run `npm install` and then `gulp init` to build out the file-tree structure. For all new features,
create a new branch with a descriptive name; your dev and master should **always** reflect the upstream.

Before continuing work, **AND** before making a pull request and run the command:

```
git --rebase https://github.com/basselope/collatio.git dev
```