# Versioning

Versioning consists in 3 steps. Specifying a bump (which can be `patch`, `minor` or `major`), updating package versions, and releasing.

## Automatic PR flow

### Bumping

To specify a new bump in the package versions, you can use the `bump-x` script, where `x` is the bump type.

This will automatically generate a [changeset](https://github.com/changesets/changesets). A changeset is a file that contains the bump intent, and a list of all commits that will be included in the release.

### Releasing

After bumping, you should commit and push the changesets. This will trigger a GitHub action that will automatically create a release PR to your branch. This PR will contain all the changesets that have been pushed since the last release.

## CLI flow

### Bumping

To specify a new bump in the package versions, you can use the `bump-x` script, where `x` is the bump type.

This will automatically generate a [changeset](https://github.com/changesets/changesets). A changeset is a file that contains the bump intent, and a list of all commits that will be included in the release.

### Updating package versions

To apply the bump intents, and change the package versions accordingly, you can use the `version` script. This will automatically update all the `CHANGELOG.md` files, and the `package.json` files.

### Releasing

If everything looks good, you can release the new version using the `release` script. This will automatically create a new git tag, and publish the packages to npm. Don't forget to commit!

## Pre-releasing

Sometimes, you will want to release a pre-release version. Firstly, be sure to be in a branch that is not `main`. Then, you can use the `pre` script, which will enter the current branch into pre-release mode. While in pre-release mode, all other actions are the same, but the version will be suffixed with `-next.X`.

Before merging this pre-release branch into `main`, be sure to exit the pre-release mode using the `pre` script again.
