# Concierge.pk launch guide — Alvi172 / Namecheap / Cloudflare
Updated 15 November 2026

## Choose your website format
Recommended for the main business website: extract Concierge-GitHub-Pages.zip and upload its HTML files and assets folder into the root of your GitHub repository. This gives separate page URLs and is easier for search engines to discover.
For a one-file upload: use the separate standalone index.html download. It contains all 29 page views, imagery and catalogue data, with hash navigation. It relies on JavaScript and is less suitable for search indexing than the multi-page version. Do not overwrite the multi-page homepage with the standalone file unless choosing the one-file approach.

## 1. GitHub
Sign in as Alvi172. Create a repository named concierge-website (private is fine). Use Add file > Upload files. Upload either the extracted multi-page website with assets, or the standalone index.html. Keep index.html directly at the repository root. Commit the files to main. If the repository already exists, replace the corresponding website files; keep any existing deployment configuration you still use. Do not upload the ZIP as your website.

## 2. Cloudflare Pages
In Cloudflare, open Workers & Pages, create a Pages project and connect your GitHub repository Alvi172/concierge-website. Authorise only the repository access needed. Use production branch main, framework None, build command exit 0, build output directory . (a single dot), root directory blank. Deploy and open the exact pages.dev hostname Cloudflare provides. If Pages is already connected, committing updated files should trigger a new deployment; inspect the deployment status.

## 3. Prepare the domain
Add concierge.pk to Cloudflare and review the imported DNS records. Save a copy of the current DNS first. Preserve all email MX, SPF, DKIM, DMARC, verification and other active subdomain records. Imported records may be incomplete. Follow Cloudflare's DNSSEC migration instructions if DNSSEC is enabled. Cloudflare assigns two specific nameservers: copy these, do not invent them.

## 4. Namecheap
Sign in > Domain List > Manage next to concierge.pk > Domain tab > Nameservers > Custom DNS. Replace the old nameservers with the two assigned by Cloudflare and save using the green checkmark. This changes DNS management, not domain ownership or renewal. Keep renewing the domain at Namecheap. Wait for Cloudflare to show Active; DNS changes may take time. After the switch, edit DNS in Cloudflare, not Namecheap Advanced DNS. If Namecheap only supplies DNS for a domain registered elsewhere, change nameservers at the actual registrar instead.

## 5. Attach the website
Open your Cloudflare Pages project > Custom domains > Set up a custom domain. Add concierge.pk and follow the DNS prompts; repeat for www.concierge.pk. Add the domains to the project before making manual records. Approve replacing conflicting website records only; preserve email and unrelated records. Use the exact pages.dev target provided by your project. Wait for custom-domain and HTTPS activation. There is no need to enter GitHub Pages IP addresses or enable GitHub Pages hosting.

## 6. Launch checks
Open both https://concierge.pk and https://www.concierge.pk. Test the five hero slides, navigation, Pakistan desk, sourcing page, eSIM search, Day/Days filters and WhatsApp messages. Check that the selected eSIM package and final price appear in the message before sending. Open the Google enquiry form and submit your own test enquiry, then verify receipt in your Google account. Test on mobile and desktop. If you use domain email, test sending and receiving after DNS changes.

## 7. Before advertising
Confirm your service coverage, supplier availability, starting fees, business contact/identity details, privacy wording and cancellation terms. New service fees are indicative proposals, not competitor quotations. Obtain approval and consent before gift photos, property access or Hall of Fame features. For pre-shipment work, agree checklist, sampling and reporting limits; accredited audits and specialist testing are separate. The eSIM catalogue has 3,255 packages with the previously applied 10% markup, not a fresh supplier-price import. Non-PTA compatibility is conditional: confirm the exact model, carrier unlock, plan and current roaming requirements before payment. No claim of PTA approval or guaranteed unblocking is made.

## Updates and recovery
Replace the relevant files in GitHub and commit; monitor Cloudflare's deployment. Keep a copy of the previous release so you can revert. If the site is blank, check index.html is at root and the build output is . . If eSIM search fails on the multi-page version, check assets/concierge-catalogue.json was uploaded. Local file opening can block JSON loading: use the deployed site or a local web server. The standalone version embeds its catalogue.

## Official instructions
Cloudflare static HTML: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
Cloudflare custom domains: https://developers.cloudflare.com/pages/configuration/custom-domains/
Namecheap nameservers: https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-to-change-dns-for-a-domain/
GitHub Pages usage limits: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
Pakistan DIRBS/foreign roaming guidance: https://mofa.gov.pk/pta-device-identification-registration-blocking-system-dirbs
