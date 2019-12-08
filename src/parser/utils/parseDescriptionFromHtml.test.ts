import { PURCHASE_NOTIFICATION_REGEX_GROUPS } from '@/purchaseNotificationRegexes';
import AmericanExpressHtml from './__examples__/AmericanExpress/mailinHtml';
import AmericanExpressHtmlWithLinkDescription from './__examples__/AmericanExpress/mailinHtml_withLinkDescription';
import parseDescriptionFromHtml from './parseDescriptionFromHtml';

describe('parseDescriptionFromHtml()', () => {
  describe('American Express', () => {
    const { AMERICAN_EXPRESS_REGEX_GROUP } = PURCHASE_NOTIFICATION_REGEX_GROUPS;
    it('should not throw an error', () => {
      expect(
        parseDescriptionFromHtml.bind(
          null,
          AmericanExpressHtml,
          AMERICAN_EXPRESS_REGEX_GROUP.description
        )
      ).not.toThrow();
    });
    it('should return the purchase description from an HTML string using the provided regex', () => {
      expect(
        parseDescriptionFromHtml(
          AmericanExpressHtml,
          AMERICAN_EXPRESS_REGEX_GROUP.description
        ).toString()
      ).toBe('GOOGLE SERVICES');
    });
  });
  describe('American Express - description as link', () => {
    const { AMERICAN_EXPRESS_REGEX_GROUP } = PURCHASE_NOTIFICATION_REGEX_GROUPS;
    it('should not throw an error', () => {
      expect(
        parseDescriptionFromHtml.bind(
          null,
          AmericanExpressHtmlWithLinkDescription,
          AMERICAN_EXPRESS_REGEX_GROUP.description
        )
      ).not.toThrow();
    });
    it('should return the purchase description from an HTML string using the provided regex when description is formatted as a link', () => {
      expect(
        parseDescriptionFromHtml(
          AmericanExpressHtmlWithLinkDescription,
          AMERICAN_EXPRESS_REGEX_GROUP.description
        ).toString()
      ).toBe('AMAZON US PRIME');
    });
  });
});
