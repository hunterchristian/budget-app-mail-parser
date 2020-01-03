import { PURCHASE_NOTIFICATION_REGEX_GROUPS } from '@/parser/regexes';
import AmericanExpressHtml from '../__examples__/AmericanExpress/mailinHtml';
import WellsFargoText from '../__examples__/WellsFargo/mailinText';
import parseDescription from './parseDescription';

describe('parseDescription()', () => {
  describe('American Express', () => {
    const { AMERICAN_EXPRESS_REGEX_GROUP } = PURCHASE_NOTIFICATION_REGEX_GROUPS;
    it('should not throw an error', () => {
      expect(
        parseDescription.bind(
          null,
          AmericanExpressHtml,
          AMERICAN_EXPRESS_REGEX_GROUP.description
        )
      ).not.toThrow();
    });
    it('should return the purchase description from an HTML string using the provided regex', () => {
      expect(
        parseDescription(
          AmericanExpressHtml,
          AMERICAN_EXPRESS_REGEX_GROUP.description
        ).toString()
      ).toBe('AMAZON MARKETPLACE');
    });
  });
  describe('Wells Fargo', () => {
    const { WELLS_FARGO_REGEX_GROUP } = PURCHASE_NOTIFICATION_REGEX_GROUPS;
    it('should not throw an error', () => {
      expect(
        parseDescription.bind(
          null,
          WellsFargoText,
          WELLS_FARGO_REGEX_GROUP.description
        )
      ).not.toThrow();
    });
    it('should return the purchase description from a plain text string using the provided regex', () => {
      expect(
        parseDescription(
          WellsFargoText,
          WELLS_FARGO_REGEX_GROUP.description
        ).toString()
      ).toBe('FLOWER CHILD AUSTIN in AUSTIN USA');
    });
  });
});
