import { PURCHASE_NOTIFICATION_REGEX_GROUPS } from '@/purchaseNotificationRegexes';
import AmericanExpressHtml from './__examples__/AmericanExpress/mailinHtml';
import AmericanExpressHtmlWithLinkDescription from './__examples__/AmericanExpress/mailinHtml_withLinkDescription';
import parseDateFromHtml from './parseDateFromHtml';

describe('parseDateFromHtml()', () => {
  describe('American Express', () => {
    const { AMERICAN_EXPRESS_REGEX_GROUP } = PURCHASE_NOTIFICATION_REGEX_GROUPS;
    it('should not throw an error', () => {
      expect(
        parseDateFromHtml.bind(
          null,
          AmericanExpressHtml,
          AMERICAN_EXPRESS_REGEX_GROUP.date
        )
      ).not.toThrow();
    });
    it('should return the purchase date from an HTML string using the provided regex', () => {
      expect(
        parseDateFromHtml(
          AmericanExpressHtml,
          AMERICAN_EXPRESS_REGEX_GROUP.date
        ).toString()
      ).toBe('Sun, Nov 17, 2019');
    });
  });
  describe('American Express - description as link', () => {
    const { AMERICAN_EXPRESS_REGEX_GROUP } = PURCHASE_NOTIFICATION_REGEX_GROUPS;
    it('should not throw an error', () => {
      expect(
        parseDateFromHtml.bind(
          null,
          AmericanExpressHtmlWithLinkDescription,
          AMERICAN_EXPRESS_REGEX_GROUP.date
        )
      ).not.toThrow();
    });
    it('should return the purchase date from an HTML string using the provided regex when description is formatted as a link', () => {
      expect(
        parseDateFromHtml(
          AmericanExpressHtmlWithLinkDescription,
          AMERICAN_EXPRESS_REGEX_GROUP.date
        ).toString()
      ).toBe('Wed, Oct 30, 2019');
    });
  });
});
