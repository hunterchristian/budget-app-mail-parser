import { PURCHASE_NOTIFICATION_REGEX_GROUPS } from '@/parser/regexes';
import AmericanExpressHtml from '../__examples__/AmericanExpress/mailinHtml';
import WellsFargoText from '../__examples__/WellsFargo/mailinText';
import parseDate from './parseDate';

describe('parseDate()', () => {
  describe('American Express', () => {
    const { AMERICAN_EXPRESS_REGEX_GROUP } = PURCHASE_NOTIFICATION_REGEX_GROUPS;
    it('should not throw an error', () => {
      expect(
        parseDate.bind(
          null,
          AmericanExpressHtml,
          AMERICAN_EXPRESS_REGEX_GROUP.date,
          null
        )
      ).not.toThrow();
    });
    it('should return the purchase date from an HTML string using the provided regex', () => {
      expect(
        parseDate(
          AmericanExpressHtml,
          AMERICAN_EXPRESS_REGEX_GROUP.date,
          null
        ).toString()
      ).toBe('Thu, Jan 02, 2020');
    });
    it('should apply transformations to the parsed date', () => {
      expect(
        parseDate(
          AmericanExpressHtml,
          AMERICAN_EXPRESS_REGEX_GROUP.date,
          AMERICAN_EXPRESS_REGEX_GROUP.transformations.date
        ).toString()
      ).toBe('Thu Jan 02 2020');
    });
  });
  describe('Wells Fargo', () => {
    const { WELLS_FARGO_REGEX_GROUP } = PURCHASE_NOTIFICATION_REGEX_GROUPS;
    it('should not throw an error', () => {
      expect(
        parseDate.bind(null, WellsFargoText, WELLS_FARGO_REGEX_GROUP.date, null)
      ).not.toThrow();
    });
    it('should return the purchase date from a plain text string using the provided regex', () => {
      expect(
        parseDate(WellsFargoText, WELLS_FARGO_REGEX_GROUP.date, null).toString()
      ).toBe('01/02/2020');
    });
    it('should apply transformations to the parsed date', () => {
      expect(
        parseDate(
          WellsFargoText,
          WELLS_FARGO_REGEX_GROUP.date,
          WELLS_FARGO_REGEX_GROUP.transformations.date
        ).toString()
      ).toBe('Thu Jan 02 2020');
    });
  });
});
