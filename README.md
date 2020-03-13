# vvfox website

| ![CI](https://github.com/WeFoxTech/wefox-site/workflows/CI/badge.svg) | ![preview](https://github.com/WeFoxTech/wefox-site/workflows/preview/badge.svg) | ![auto release](https://github.com/WeFoxTech/wefox-site/workflows/auto%20release/badge.svg) |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |


# setup dev

```bash
yarn
yarn boot
yarn gen
yarn dev
```

then edit it
open `http://localhost:3000` preview

# build

```bash
yarn gen
yarn build
yarn export

```

# release

Release is now automated

> .github/workflows/auto_release.yml

1. add `:prerelease` postfix on commit message.
2. then merge to `master` branch
3. the rest things will automatic complete soon

# prerelease

1. add `:release` postfix on commit message.
2. then merge to `master` branch.
3. the rest things will automatic complete soon

# licenses

[![CC by-nc-sa](https://img.wefox.tech/svg/Cc-by-nc-sa_icon.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode)
