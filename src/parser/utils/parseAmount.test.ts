import { PURCHASE_NOTIFICATION_REGEX_GROUPS } from '@/parser/regexes';
import AmericanExpressHtml from '../__examples__/AmericanExpress/mailinHtml';
import WellsFargoText from '../__examples__/WellsFargo/mailinText';
import parseAmount from './parseAmount';

describe('parseAmount()', () => {
  describe('American Express', () => {
    const { AMERICAN_EXPRESS_REGEX_GROUP } = PURCHASE_NOTIFICATION_REGEX_GROUPS;
    it('should not throw an error', () => {
      expect(
        parseAmount.bind(
          null,
          AmericanExpressHtml,
          AMERICAN_EXPRESS_REGEX_GROUP.amount
        )
      ).not.toThrow();
    });
    it('should return the purchase amount from an HTML string using the provided regex', () => {
      expect(
        parseAmount(
          AmericanExpressHtml,
          AMERICAN_EXPRESS_REGEX_GROUP.amount
        ).toString()
      ).toBe('89.19');
    });
  });
  describe('Wells Fargo', () => {
    const { WELLS_FARGO_REGEX_GROUP } = PURCHASE_NOTIFICATION_REGEX_GROUPS;
    it('should not throw an error', () => {
      expect(
        parseAmount.bind(null, WellsFargoText, WELLS_FARGO_REGEX_GROUP.amount)
      ).not.toThrow();
    });
    it('should return the purchase amount from a plain text string using the provided regex', () => {
      expect(
        parseAmount(WellsFargoText, WELLS_FARGO_REGEX_GROUP.amount).toString()
      ).toBe('53.48');
    });
  });
});
