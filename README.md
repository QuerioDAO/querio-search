# querio-search - README & Terms of Use



Welcome to the **querio-search** npm package! This package enables seamless integration with the [Querio](https://querio.io/) search engine, providing powerful search capabilities for your applications.

## Installation

To install the querio-search package, run:

```sh
npm install querio-search
```

## Supported Chains

```js
export const Chains = [
  { title: "All", id: 0 },
  { title: "ICP", id: 1 },
  { title: "ETH", id: 2 },
  { title: "XLM", id: 3 },
  { title: "NEAR", id: 4 },
  { title: "BNB", id: 5 },
  { title: "SOL", id: 6 },
  { title: "ADA", id: 7 },
  { title: "DOT", id: 8 },
  { title: "MATIC", id: 9 },
  { title: "ARB", id: 10 },
  { title: "OP", id: 11 },
];
```

## Usage

A functional example WebApp is available in `example/querio-search-webapp`, demonstrating how to integrate and utilize querio-search with a real-world implementation. This example includes API interactions, usage and best practices to help you get started. 

A quick example on how to import and configure querio-search in your project:

```js
import QuerioSearch from 'querio-search';

const search = new QuerioSearch();

const query = 'NFT';
const page = 1;
const selectedChain = 0; // 0 = all supported chains

const result = await client.search(query, page, selectedChain);
```

## Terms of Use & Attribution Requirements

By using the querio-search package, you agree to comply with the following terms:

### 1. **Attribution & Branding**

To maintain brand consistency and acknowledge Querio’s technology, you must display proper attribution when using the querio-search package:

- **Logo Placement**: The Querio logo must be displayed within or next to the search box in a clearly visible manner.
- **Watermark & Attribution Text**: The search box must include the exact watermark text **"Search with Querio"** or **"Powered by Querio"**, positioned within or immediately adjacent to the search field.
- **Branding Assets**: You must use the official Querio logo, available in the repository under:
  - `/assets/querio_light.svg` (for light backgrounds)
  - `/assets/querio_dark.svg` (for dark backgrounds)
- **Design Guidelines**: The Querio logo and watermark text must remain unaltered in color, proportion, and readability.
- **Removal Prohibition**: You may not remove, obscure, or modify the attribution text or logo.

### 2. **Usage Restrictions**

- Before using the querio-search package, users must notify us of their intent via our official channels: [X](https://twitter.com/querio_io), [Discord](https://discord.gg/Jvb8Xmzgdv), [OpenChat](https://oc.app/community/qbzct-jaaaa-aaaar-au2gq-cai/?ref=jviq4-waaaa-aaaar-aqq7a-cai), or  [Telegram](https://t.me/+VXpWvtRUSyU0MmFk).

- You **must not** alter, manipulate, or interfere with the search results provided by Querio in any way.

- You **must not** alter, manipulate, or interfere with the search results provided by Querio in any way.

- You **must not** use the querio-search package in applications that promote hate speech, violence, or illegal activities.

- You **must not** resell, sublicense, or distribute this package as a standalone product.

- You **must not** modify, reverse-engineer, or tamper with the package to remove its branding requirements.

- Unauthorized use of the querio-search package without proper attribution is a violation of these terms and may result in restrictions on access to Querio services or legal action.

### 4. **Compliance & Enforcement**

Querio reserves the right to:

- Monitor compliance with these terms.
- Deny access or take action against users who violate the branding and usage requirements.
- Modify these terms as necessary, with continued use constituting agreement to any updates.

## Updates & Contributions

This package is **open-source** and welcomes contributions! Feel free to submit issues, feature requests, or pull requests.

## License

This project is licensed under the **MIT License**, but **requires compliance with the branding and attribution requirements outlined above**. See the LICENSE file for more details.

## Contact

For questions, support, or branding guidelines, please contact us via [X](https://twitter.com/querio_io), [Discord](https://discord.gg/Jvb8Xmzgdv), [OpenChat](https://oc.app/community/qbzct-jaaaa-aaaar-au2gq-cai/?ref=jviq4-waaaa-aaaar-aqq7a-cai), or [Telegram](https://t.me/+VXpWvtRUSyU0MmFk).

By integrating or using the querio-search package, you acknowledge and agree to these Terms of Use.
