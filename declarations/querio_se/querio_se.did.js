export const idlFactory = ({ IDL }) => {
  const TokenFrequency = IDL.Record({
    'token' : IDL.Text,
    'frequency' : IDL.Nat16,
  });
  const Engine = IDL.Service({
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
        [IDL.Bool],
        [],
      ),
    'add_to_feed' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Int],
        [],
      ),
    'autoscale' : IDL.Func([], [IDL.Nat], []),
    'autoscale_feed' : IDL.Func([], [IDL.Nat], []),
    'balance' : IDL.Func([], [IDL.Nat], ['query']),
    'get_feed' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'get_workers' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'remove' : IDL.Func([IDL.Text, IDL.Vec(TokenFrequency)], [IDL.Bool], []),
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
    'upgrade' : IDL.Func([IDL.Vec(IDL.Nat8)], [], []),
    'upgrade_feed' : IDL.Func([IDL.Vec(IDL.Nat8)], [], []),
  });
  return Engine;
};
export const init = ({ IDL }) => { return []; };
