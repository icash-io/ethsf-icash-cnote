import mandrill from 'mandrill-api/mandrill'
const mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_API_KEY);

const messageTemplate = {
  from_email: "no-reply@stowittoken.com",
  from_name: 'STOW IT Token',
  important: true,
  merge: true,
  merge_language: 'handlebars',
}

function sendTemplate(message, templateName) {
  mandrill_client.messages.sendTemplate({
    template_name: templateName,
    template_content: null,
    message: message,
    async: true,
  }, result => {
    // console.log('Email sent:', result);
  }, error => {
    console.log('Error sending email:', error);
  });
}

// Send template 01
export function sendStartKycEmail(toEmail, userAccessToken) {
  const kycUrl = process.env.FRONTEND_URL + '/verify?accessToken=' + userAccessToken;
  const templateName = 'kyc-link-after-registration-no-gap';
  const message = {
    ...messageTemplate,
    subject: 'Verify your Identity for the STOW IT Token Crowdsale',
    to: [{
      email: toEmail,
      name: '',
      type: 'to',
    }],
    global_merge_vars: [{
        name: 'user-email',
        content: toEmail,
      },
      {
        name: 'kyc-url',
        content: kycUrl,
      }],
  };
  sendTemplate(message, templateName);
}

// Send template 01a
export function sendResetTokenEmail(toEmail, userAccessToken) {
  const kycUrl = process.env.FRONTEND_URL + '/verify?accessToken=' + userAccessToken;
  const templateName = 'new-kyc-registration-link';
  const message = {
    ...messageTemplate,
    subject: 'New Verification for STOW IT Token Crowdsale',
    to: [{
      email: toEmail,
      name: '',
      type: 'to',
    }],
    global_merge_vars: [{
        name: 'user-email',
        content: toEmail,
      },
      {
        name: 'kyc-url',
        content: kycUrl,
      }],
  };
  sendTemplate(message, templateName);
}

// Send template 02
export function sendKycDoneBeforeSaleEmail(toEmail) {
  const templateName = 'kyc-verification-completed-before-crowdsale';
  const message = {
    ...messageTemplate,
    subject: 'Identity Verification Successful for STOW IT Token Crowdsale',
    to: [{
      email: toEmail,
      name: '',
      type: 'to',
    }],
    global_merge_vars: [{
        name: 'user-email',
        content: toEmail,
      }],
  };
  sendTemplate(message, templateName);
}

// Send template 03
export function sendSaleIsLiveEmail(toEmail, icoEthAddress, userEthAddress) {
  const templateName = 'crowdsale-is-open-with-registration-link';
  const message = {
    ...messageTemplate,
    subject: 'STOW IT TOKEN CROWDSALE IS LIVE',
    to: [{
      email: toEmail,
      name: '',
      type: 'to',
    }],
    global_merge_vars: [{
        name: 'user-email',
        content: toEmail,
      },
      {
        name: 'ico-eth-address',
        content: icoEthAddress,
      },
      {
        name: 'user-eth-address',
        content: userEthAddress,
      }],
  };
  sendTemplate(message, templateName);
}

// Send template 03a
export function sendKycDoneDuringSaleEmail(toEmail, icoEthAddress, userEthAddress) {
  const templateName = 'kyc-verification-completed-during-crowdsale';
  const message = {
    ...messageTemplate,
    subject: 'Link to Participate in Crowdsale for STOW IT Token',
    to: [{
      email: toEmail,
      name: '',
      type: 'to',
    }],
    global_merge_vars: [{
        name: 'user-email',
        content: toEmail,
      },
      {
        name: 'ico-eth-address',
        content: icoEthAddress,
      },
      {
        name: 'user-eth-address',
        content: userEthAddress,
      }],
  };
  sendTemplate(message, templateName);
}

// Send template 04
export function sendThankYouForContributingEmail(toEmail) {
  const templateName = 'crowdsale-participation-thank-you';
  const message = {
    ...messageTemplate,
    subject: 'Crowdsale Contribution Successful',
    to: [{
      email: toEmail,
      name: '',
      type: 'to',
    }],
    global_merge_vars: [{
        name: 'user-email',
        content: toEmail,
      }],
  };
  sendTemplate(message, templateName);
}
