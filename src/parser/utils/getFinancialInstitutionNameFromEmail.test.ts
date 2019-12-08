import { ORIGINAL_SENDER_REGEX } from '@/purchaseNotificationRegexes';

describe('getFinancialInstitutionNameFromEmail()', () => {
  it('should return the first string that matches the ORIGINAL_SENDER regex', () => {
    const EXAMPLE_NAME = 'TEST NAME';
    const EXAMPLE_HTML = `---------- Forwarded message ---------<br>From: <strong class="gmail_sendername" dir="auto">${EXAMPLE_NAME}</strong>`;
    const match = EXAMPLE_HTML.match(ORIGINAL_SENDER_REGEX);
    expect(match).not.toBeNull();
    expect(match[0]).toBe(EXAMPLE_NAME);
  });
});
