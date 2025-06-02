
export default ({ env }) => ({
  documentation: {
    enabled: true,
    config: {
      contentTypes: {
        'api::page.page': {},
      },
    },
  },
  email: {
    config: {
      provider: 'strapi-provider-email-smtp',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'), //SMTP Host
        port: env('SMTP_PORT', 587), //SMTP Port
        secure: env('SMTP_SECURE', false),
        username: env('SMTP_USER'),
        password: env('SMTP_PASS'),
        rejectUnauthorized: true,
        requireTLS: env('SMTP_REQUIRE_TLS', true),
        connectionTimeout: env('SMTP_CONNECTION_TIMEOUT', 1),
      },
    },
    settings: {
      defaultFrom: env('SMTP_USER'),
      defaultReplyTo: env('SMTP_USER'),
    }, 
  },    
});
