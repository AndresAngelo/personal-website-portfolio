# Support Information

## Support ownership

Production access, Vercel project settings, GitHub Actions secrets, provider credentials, and rollback authority belong to the project’s designated release owner. Assign named owners before production release; this package intentionally does not embed personal credentials or private contact data.

- Product/content owner: **Assign before release**
- Technical/release owner: **Assign before release**
- Support contact: **Use the project’s approved issue/support channel**
- Emergency escalation: **Use the release owner’s approved incident channel**

## What support should include

For a site issue, provide the deployed URL, route/locale, timestamp, browser and operating system, reproduction steps, expected/actual behavior, and relevant non-sensitive logs. For an API issue, include endpoint, HTTP status, response shape, correlation/deployment information if available, and whether the issue affects all visitors.

Never send API keys, `.env` files, tokens, private documents, or unredacted personal data through an issue or support channel.

## Triage guide

- **Content or media issue:** consult `CONTENT_GUIDE.md` and `docs/MAINTENANCE.md`.
- **Chat/API issue:** consult `docs/API.md`, check provider configuration without exposing values, and inspect Vercel function logs.
- **Deployment issue:** consult `docs/DEPLOYMENT.md` and `DEPLOYMENT_CHECKLIST.md`.
- **Security issue:** do not disclose sensitive details publicly; escalate privately to the release/security owner.
- **Possible bad release:** stop further rollout, identify the last known-good deployment, and follow the documented rollback procedure.

## Maintenance cadence

Review content, links, media, API behavior, provider configuration, security headers, and browser compatibility whenever the corresponding code or content changes. Keep this support document current when ownership or escalation channels are assigned.
