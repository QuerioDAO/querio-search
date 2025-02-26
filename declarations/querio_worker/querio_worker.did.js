export const idlFactory = ({ IDL }) => {
  const TokenFrequency = IDL.Record({
    'token' : IDL.Text,
    'frequency' : IDL.Nat16,
  });
  const SearchResultItem = IDL.Record({
    'url' : IDL.Text,
    'title' : IDL.Text,
    'chain' : IDL.Nat,
    'heading' : IDL.Text,
    'snippet' : IDL.Text,
    'icon_data' : IDL.Text,
  });
  const SearchResult = IDL.Record({
    'total' : IDL.Nat,
    'pages' : IDL.Nat,
    'items' : IDL.Vec(SearchResultItem),
  });
  const Worker = IDL.Service({
    'add' : IDL.Func(
        [
          IDL.Text,
          IDL.Vec(TokenFrequency),
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Text,
        ],
        [IDL.Nat32],
        [],
      ),
    'balance' : IDL.Func([], [IDL.Nat], ['query']),
    'remove' : IDL.Func([IDL.Text, IDL.Vec(TokenFrequency)], [IDL.Bool], []),
    'search' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Nat],
        [SearchResult],
        ['query'],
      ),
    'suggest' : IDL.Func([IDL.Text, IDL.Nat], [IDL.Vec(IDL.Text)], ['query']),
    'update' : IDL.Func(
        [
          IDL.Text,
          IDL.Vec(TokenFrequency),
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Text,
        ],
        [IDL.Bool],
        [],
      ),
  });
  return Worker;
};
export const init = ({ IDL }) => { return []; };
