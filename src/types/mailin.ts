interface EmailHeaders {
  to: string;
  from: string;
  'content-type': string;
  'mime-type': string;
}

interface EmailParticipant {
  address: string;
  name: string;
}

interface EmailAttachement {
  contentType: string;
  fileName: string;
  contentDisposition: string;
  transferEncoding: string;
  generatedFileName: string;
  contentId: string;
  checksum: string;
  length: string;
}

export interface MailinMsg {
  html: string;
  text: string;
  headers: EmailHeaders;
  priority: string;
  from: EmailParticipant[];
  to: EmailParticipant[];
  cc: EmailParticipant[];
  envelopeFrom: EmailParticipant[];
  envelopeTo: EmailParticipant[];
  attachments: EmailAttachement[];
  connection: {
    from: string;
    to: string;
    remoteAddress: string;
    authentication: {
      username: boolean;
      authenticated: boolean;
      state: string;
    };
  };
  dkim: string;
  spf: string;
  spamscore: number;
  language: string;
}

interface MailinMsgs {
  // mailingMsg must be parsed (via JSON.parse) from a string
  // into a JS object which conforms to the interface MailinMsg
  mailinMsg: string[];
}

interface Attachments {
  [attachmentFileName: string]: string;
}

export type MailinFormData = MailinMsgs & Attachments;
