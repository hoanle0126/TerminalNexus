#!/usr/bin/env bash
# ─── TerminalNexus Bundle Script ──────────────────────────────────────────────
# Creates a clean ZIP archive ready for Gumroad / LemonSqueezy distribution.
# Usage: ./scripts/bundle.sh [version]
# Example: ./scripts/bundle.sh 1.0.0
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

VERSION="${1:-1.0.0}"
OUTPUT_DIR="./dist"
ARCHIVE_NAME="terminalnexus-v${VERSION}"
TMP_DIR="/tmp/${ARCHIVE_NAME}"

echo "📦 Bundling TerminalNexus v${VERSION}..."

# Clean up any previous run
rm -rf "${TMP_DIR}" "${OUTPUT_DIR}/${ARCHIVE_NAME}.zip"
mkdir -p "${OUTPUT_DIR}"

# Copy project files (exclude build artifacts, secrets, personal files)
rsync -av --progress . "${TMP_DIR}" \
  --exclude='.git' \
  --exclude='.next' \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='.env*' \
  --exclude='*.log' \
  --exclude='.DS_Store' \
  --exclude='tsconfig.tsbuildinfo' \
  --exclude='public/avatar.png' \
  --exclude='scripts'

# Copy .env.example (it's safe to include)
cp .env.example "${TMP_DIR}/.env.example" 2>/dev/null || true

# Ensure demo avatar placeholder exists
mkdir -p "${TMP_DIR}/public/demo"
echo "# Replace this file with your demo avatar (400x400 PNG)" \
  > "${TMP_DIR}/public/demo/README.md"

# Create the ZIP
(cd /tmp && zip -r "${OLDPWD}/${OUTPUT_DIR}/${ARCHIVE_NAME}.zip" "${ARCHIVE_NAME}")

# Clean up temp
rm -rf "${TMP_DIR}"

SIZE=$(du -sh "${OUTPUT_DIR}/${ARCHIVE_NAME}.zip" | cut -f1)
echo ""
echo "✅ Bundle created: ${OUTPUT_DIR}/${ARCHIVE_NAME}.zip (${SIZE})"
echo "   Upload to Gumroad at: https://app.gumroad.com/products/new"
