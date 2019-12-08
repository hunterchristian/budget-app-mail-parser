import { PURCHASE_NOTIFICATION_REGEX_GROUPS } from '@/purchaseNotificationRegexes';
import AmericanExpressHtml from './__examples__/AmericanExpress/mailinHtml';
import parseAmountFromHtml from './parseAmountFromHtml';

describe('parseAmountFromHtml()', () => {
  describe('American Express', () => {
    const { AMERICAN_EXPRESS_REGEX_GROUP } = PURCHASE_NOTIFICATION_REGEX_GROUPS;
    it('should not throw an error', () => {
      expect(
        parseAmountFromHtml.bind(
          null,
          AmericanExpressHtml,
          AMERICAN_EXPRESS_REGEX_GROUP.amount
        )
      ).not.toThrow();
    });
    it('should return the purchase amount from an HTML string using the provided regex', () => {
      expect(
        parseAmountFromHtml(
          AmericanExpressHtml,
          AMERICAN_EXPRESS_REGEX_GROUP.amount
        ).toString()
      ).toBe('14.99');
    });
  });
});
