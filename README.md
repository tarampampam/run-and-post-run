<p align="center">
  <img src="https://avatars.githubusercontent.com/u/44036562?s=200&v=4" alt="Logo" width="90" />
</p>

# Run and post run Action

![Release version][badge_release_version]
[![Build Status][badge_build]][link_build]
[![License][badge_license]][link_license]

A simple GitHub action that allows you to execute commands on place and in post-run, once a workflow job has ended.

[Linked GitHub issue][community_issue].

## Usage

```yaml
jobs:
  run-some-action:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run this action
        uses: gacts/run-and-post-run@v1
        with:
          run: echo "First"
              "(can be multiline)"
          post: |
            echo "First post"
            echo "(can run multiply commands)"
            ls -la /tmp \
              /bin /opt

      - name: Post command only
        uses: gacts/run-and-post-run@v1
        with:
          post: echo "Second post"
```

This above configuration will produce the following:

![CI output example](https://github.com/gacts/run-and-post-run/assets/7326800/a73d2138-c773-494a-9922-2ae182ba87d5)

More examples can be found in the [tests](./.github/workflows/tests.yml).

## Customizing

### Inputs

The following inputs can be used as `step.with` keys:

| Name                    |        Type        | Default | Required | Description                                                                |
|-------------------------|:------------------:|:-------:|:--------:|----------------------------------------------------------------------------|
| `run`                   | `string` or `list` |         |    no    | A commands that needs to be run in place                                   |
| `post`                  | `string` or `list` |         |   yes    | A commands that needs to be run once a workflow job has ended              |
| `working-directory`     |      `string`      |         |    no    | A working directory from which the command needs to be run                 |
| `shell`                 |      `string`      | `bash`  |    no    | A shell to use for executing `run` commands                                |
| `post-shell`            |      `string`      |         |    no    | A shell to use for executing `post` commands. Defaults to value of `shell` |
| `disable-command-trace` |     `boolean`      | `false` |    no    | Disable command trace for `run` and `post` commands                        |

## Releasing

To release a new version:

- Build the action distribution (`make build` or `npm run build`).
- Commit and push changes (including `dist` directory changes - this is important) to the `master|main` branch.
- Publish the new release using the repo releases page (the git tag should follow the `vX.Y.Z` format).

Major and minor git tags (`v1` and `v1.2` if you publish a `v1.2.Z` release) will be updated automatically.

> [!TIP]
> Use [Dependabot](https://bit.ly/45zwLL1) to keep this action updated in your repository.

## Support

[![Issues][badge_issues]][link_issues]
[![Pull Requests][badge_pulls]][link_pulls]

If you find any errors in the action, please [create an issue][link_create_issue] in this repository.

## License

This is open-source software licensed under the [MIT License][link_license].

[badge_build]:https://img.shields.io/github/actions/workflow/status/gacts/run-and-post-run/tests.yml?branch=main&maxAge=30
[badge_release_version]:https://img.shields.io/github/release/gacts/run-and-post-run.svg?maxAge=30
[badge_license]:https://img.shields.io/github/license/gacts/run-and-post-run.svg?longCache=true
[badge_release_date]:https://img.shields.io/github/release-date/gacts/run-and-post-run.svg?maxAge=180
[badge_commits_since_release]:https://img.shields.io/github/commits-since/gacts/run-and-post-run/latest.svg?maxAge=45
[badge_issues]:https://img.shields.io/github/issues/gacts/run-and-post-run.svg?maxAge=45
[badge_pulls]:https://img.shields.io/github/issues-pr/gacts/run-and-post-run.svg?maxAge=45

[link_build]:https://github.com/gacts/run-and-post-run/actions
[link_license]:https://github.com/gacts/run-and-post-run/blob/main/LICENSE
[link_issues]:https://github.com/gacts/run-and-post-run/issues
[link_create_issue]:https://github.com/gacts/run-and-post-run/issues/new
[link_pulls]:https://github.com/gacts/run-and-post-run/pulls

[community_issue]:https://github.com/orgs/community/discussions/26743
