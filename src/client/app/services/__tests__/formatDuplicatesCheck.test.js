const assert = require('chai').assert;
import { formatDuplicatesCheckTableData } from '../format';
import {
  noDuplicateFields,
  noVariantFormula,
  oneVariantTwoInstances,
  oneVariantThreeInstances,
  oneVariantFourInstances,
  twoVariantsTwoandTwoInstances
} from './__test_only_fakes__/form.fake';

const format = formatDuplicatesCheckTableData;

const results = {
  noDuplicates: format(noDuplicateFields),
  noVariants: format(noVariantFormula),
  oneVariantLen2: format(oneVariantTwoInstances),
  oneVariantLen3: format(oneVariantThreeInstances),
  oneVariantLen4: format(oneVariantFourInstances),
  twoVariantsLen4: format(twoVariantsTwoandTwoInstances)
};

describe('formatDuplicatesCheck', () => {
  it('returns an array of objects with expected values', () => {
    assert.isEmpty(
      results.noDuplicates,
      `returns empty array if arg has no duplicate GET_FIELD values`
    );
    assert.isEmpty(
      results.noVariants,
      `returns empty array if arg has duplicate GET_FIELD values
       with no variant formula value`
    );
    assert.isNotEmpty(
      results.oneVariantLen2,
      `returns a non empty array if arg has duplicate GET_FIELD values
       with variant formula value`
    );
    assert.equal(
      results.oneVariantLen2.length,
      2,
      `returns an array with two elements if arg contains two entries
       with a matching GET_FIELD and formula variant`
    );
    assert.equal(
      results.oneVariantLen3.length,
      3,
      `returns an array with three elements if arg contains three entries
       with a matching GET_FIELD and formula variants`
    );
    assert.equal(
      results.oneVariantLen4.length,
      4,
      `returns an array with three elements if arg contains four entries
       with a matching GET_FIELD and formula variants`
    );
    assert.equal(
      results.twoVariantsLen4.length,
      4,
      `returns an array with three elements if arg contains two pairs of entries
       with a matching GET_FIELD both with formula variants`
    );
  });
});
