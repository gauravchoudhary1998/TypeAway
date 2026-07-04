# TypeAway

A simple browser-based typing game built with vanilla JavaScript, HTML, and CSS. Hosted as a static website on Amazon S3.

## Live Demo

<a href="http://gaurav-typeaway.s3-website-us-west-1.amazonaws.com"> Click Here </a>

No installation needed — just open the link in a browser and start typing.

## Live Hosting

The game is served directly from an S3 bucket configured for static website hosting — no backend, no server, just static assets (`index.html`, JS, CSS) served over HTTP(S).

## CI/CD Pipeline

Deployment is automated with GitHub Actions:

- **Trigger:** every push to the `master` branch
- **Steps:**
  1. Checkout the repository
  2. Configure AWS credentials (via repository secrets — `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`, or an assumed IAM role)
  3. Sync the project files to the target S3 bucket using `aws s3 sync`

No manual deployment steps are required — merging to `master` is enough to push the latest version live.

## Required Repository Secrets

| Secret | Purpose |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM user/role access key for S3 deploy |
| `AWS_SECRET_ACCESS_KEY` | Corresponding secret key |
| `S3_BUCKET_NAME` | Target bucket for the static site |
| `AWS_REGION` | Region of the S3 bucket |

> Note: the IAM identity used should be scoped to least-privilege — `s3:PutObject`, `s3:DeleteObject`, and `s3:ListBucket` on the target bucket only.

## Local Development

Since this is a static site, you can preview it locally without any build step:

```bash
# clone the repo
git clone https://github.com/gauravchoudhary1998/TypeAway.git
cd TypeAway

# serve locally (any static server works)
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deployment Notes

- Changes pushed to `master` go live automatically — treat that branch as production.
- Use feature branches and pull requests for changes so the deploy pipeline isn't triggered accidentally.

