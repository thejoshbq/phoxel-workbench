#!/usr/bin/env bash
set -euo pipefail

# Pull the latest successful, relative-base Labrynth demo artifact and embed it
# into the site's public dir (public/labrynth-demo/). This keeps the embedded
# demo in sync with Labrynth deployments: every site deploy pulls the freshest
# published demo instead of carrying a vendored, drift-prone snapshot.
#
# Used by `npm run sync-demo` (and `npm run build:full`) locally, and by the
# Deploy Site workflow in CI before `npm run build`.
#
# Requires the `gh` CLI authenticated with READ access to the Labrynth repo's
# Actions artifacts:
#   - locally: your normal `gh auth login`
#   - in CI:   GH_TOKEN set to a PAT with `actions:read` on $LABRYNTH_REPO
#              (the default GITHUB_TOKEN cannot read another org's artifacts).
#
# Note: this pulls the last *published* demo artifact, not local uncommitted
# Labrynth changes. To preview local Labrynth work, build labrynth/web with
# `VITE_BASE=./ npm run build:demo` and copy its dist/ into public/labrynth-demo/.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_ROOT="$(dirname "$SCRIPT_DIR")"
DEST="$SITE_ROOT/public/labrynth-demo"

LABRYNTH_REPO="${LABRYNTH_REPO:-Otis-Lab-MUSC/labrynth}"
DEMO_WORKFLOW="${LABRYNTH_DEMO_WORKFLOW:-deploy-demo.yml}"
ARTIFACT="${LABRYNTH_DEMO_ARTIFACT:-labrynth-demo}"

echo "[build-demo] Resolving latest successful '$DEMO_WORKFLOW' run on $LABRYNTH_REPO..."
run_id="$(gh run list --repo "$LABRYNTH_REPO" --workflow "$DEMO_WORKFLOW" \
  --status success --limit 1 --json databaseId --jq '.[0].databaseId')"
if [ -z "${run_id:-}" ]; then
  echo "[build-demo] ERROR: no successful '$DEMO_WORKFLOW' run found on $LABRYNTH_REPO" >&2
  exit 1
fi

echo "[build-demo] Downloading artifact '$ARTIFACT' from run $run_id..."
rm -rf "$DEST"
mkdir -p "$DEST"
gh run download "$run_id" --repo "$LABRYNTH_REPO" --name "$ARTIFACT" --dir "$DEST"

if [ ! -f "$DEST/index.html" ]; then
  echo "[build-demo] ERROR: artifact '$ARTIFACT' did not contain index.html — aborting" >&2
  exit 1
fi

echo "[build-demo] Embedded '$ARTIFACT' (run $run_id) into public/labrynth-demo/"
