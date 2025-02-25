import { QuerioSearch } from './index.js';

(async () => {
    const querioSearch = new QuerioSearch();
    const page = 0;
    const chain = 0;

    const result = await querioSearch.search("dao", page, chain);
    console.log(result);
})();