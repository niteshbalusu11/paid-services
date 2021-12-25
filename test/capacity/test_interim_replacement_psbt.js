const {test} = require('@alexbosworth/tap');

const method = require('./../../capacity/interim_replacement_psbt');

const makeArgs = overrides => {
  const args = {
    increase_public_key: '02f0de5929182b6300d1b3f4b3bd4e3455bb67ff171d9580679848aa140f52c7d0',
    increase_signature: '304402207d3c92e6a512d5167edda7802bf41666196a5133cd299e86be10d84fbc7ca661022024f8f912adc955d3f79f344d52e566284d02161d6b76aa1b70f4ed4a9f25ab2b',
    increase_transaction: '02000000000101003e82436e87b765489f9cb751d4fc274663de11d6ba3df262644b14af42dee60000000000ffffffff02400d03000000000016001421f75e4e4856f78428d064cb4727a5f69dbf2f2c36c9022a01000000160014f31af4302c0136489ece54214340aae4b33463e102483045022100bb39fb591305b4b160424cae3066ac3e73aa3c8b667ffdbfde1de13ed951fec00220196c02d47c051ae407e9072c4c76a0a06c18f4a7022f9a8c704a9aa2a4d34ae901210316acb9cd74b7836aceae5ffdb07cb2ef67ed65eaba2ea270869924036b7de45f00000000',
    increase_transaction_vin: 1,
    open_transaction: '02000000000101edad35ee0a8adb71c44e5d67164d5ccd7a56663645f0eed815d90c50a8c600e90000000000000000000240420f0000000000220020e75299243b0183e4590eb71df6f8aafba7de577ba7f3ff01ec42a82e5e5d97a7eb91f62901000000160014edd4f86b73acd6150895dcecd1aabebf8825db880247304402207a78ce93fbb062fec068b35c2c282e1dbc93d791eaff2ba177a86b8eca96128502207c5f53acf07a865228f776f7f5725c8e72204db9134fdb7b7ef6876bd3f30fe201210316acb9cd74b7836aceae5ffdb07cb2ef67ed65eaba2ea270869924036b7de45f00000000',
    signature: '30450221009e2eeee8c0c9d14b95a4611e4fb83b931325e22dc5939ddc6cc81e1d84e5c51402200ae907b0b681442e327add8fadd3f46710b19880e143d41febdc3fe8decb1a12',
    unsigned_transaction: '01000000026dbdcc66dc7ae49d0bbf7dd6b7c24989f8c510d2c8a8f72978b1eaf5a322d2090000000000ffffffff6f8ad13d8647cd2d00a0147841da0e7bb8439a9c48590ffa7347f86228db3cd70000000000ffffffff01af1d120000000000220020b994281c8afe338fff73a267398542f3f37136ee62db9fb1a8d6db40db1e5a4700000000',
    witness_script: '5221021796f279ccded2657631746376c26c01e45837a8c58e81f9f186fc50581c5733210301117f54de2db419e379fe45e2eeaabd65482d871694be994a6c134ab6475c8a52ae',
  };

  Object.keys(overrides).forEach(k => args[k] = overrides[k]);

  return args;
};

const tests = [
  {
    args: makeArgs({}),
    description: 'Create interim replacement PSBT',
    expected: {
      psbt: '70736274ff01008701000000026dbdcc66dc7ae49d0bbf7dd6b7c24989f8c510d2c8a8f72978b1eaf5a322d2090000000000ffffffff6f8ad13d8647cd2d00a0147841da0e7bb8439a9c48590ffa7347f86228db3cd70000000000ffffffff01af1d120000000000220020b994281c8afe338fff73a267398542f3f37136ee62db9fb1a8d6db40db1e5a47000000000001012b40420f0000000000220020e75299243b0183e4590eb71df6f8aafba7de577ba7f3ff01ec42a82e5e5d97a72202021796f279ccded2657631746376c26c01e45837a8c58e81f9f186fc50581c57334830450221009e2eeee8c0c9d14b95a4611e4fb83b931325e22dc5939ddc6cc81e1d84e5c51402200ae907b0b681442e327add8fadd3f46710b19880e143d41febdc3fe8decb1a120122020301117f54de2db419e379fe45e2eeaabd65482d871694be994a6c134ab6475c8a4830450221009e2eeee8c0c9d14b95a4611e4fb83b931325e22dc5939ddc6cc81e1d84e5c51402200ae907b0b681442e327add8fadd3f46710b19880e143d41febdc3fe8decb1a1201010304010000000105475221021796f279ccded2657631746376c26c01e45837a8c58e81f9f186fc50581c5733210301117f54de2db419e379fe45e2eeaabd65482d871694be994a6c134ab6475c8a52ae0001011f400d03000000000016001421f75e4e4856f78428d064cb4727a5f69dbf2f2c220202f0de5929182b6300d1b3f4b3bd4e3455bb67ff171d9580679848aa140f52c7d047304402207d3c92e6a512d5167edda7802bf41666196a5133cd299e86be10d84fbc7ca661022024f8f912adc955d3f79f344d52e566284d02161d6b76aa1b70f4ed4a9f25ab2b01010304010000000000',
    },
  },
];

tests.forEach(({args, description, error, expected}) => {
  return test(description, async ({end, strictSame, throws}) => {
    if (!!error) {
      throws(() => method(args), new Error(error), 'Got error');
    } else {
      const res = method(args);

      strictSame(res, expected, 'Got expected result');
    }

    return end();
  });
});