#!/usr/bin/env bash
# Creates your private Google Play *upload key* and prints the four values to
# add as GitHub repository secrets (Settings → Secrets and variables → Actions).
#
#   bash scripts/create-upload-key.sh
#
# Keep the generated .keystore file and its password somewhere safe (e.g. a
# password manager). Never commit it. With Play App Signing, Google holds the
# real app signing key, and a lost upload key can be reset through Play support.
set -euo pipefail

KEYSTORE="${1:-lisan-upload.keystore}"
ALIAS="lisan-upload"

if [ -e "$KEYSTORE" ]; then
  echo "$KEYSTORE already exists — not overwriting it." >&2
  exit 1
fi

read -r -s -p "Choose a keystore password (at least 6 characters): " PASSWORD; echo
read -r -s -p "Repeat the password: " PASSWORD2; echo
[ "$PASSWORD" = "$PASSWORD2" ] || { echo "Passwords don't match." >&2; exit 1; }

keytool -genkeypair -v \
  -keystore "$KEYSTORE" -alias "$ALIAS" \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -storepass "$PASSWORD" -keypass "$PASSWORD" \
  -dname "CN=Lisan upload key"

if base64 --help 2>&1 | grep -q -- '-w'; then B64=$(base64 -w0 "$KEYSTORE"); else B64=$(base64 -i "$KEYSTORE" | tr -d '\n'); fi

cat <<EOF

Created $KEYSTORE. Add these GitHub repository secrets:

  ANDROID_KEYSTORE_BASE64   = (the long line below)
  ANDROID_KEYSTORE_PASSWORD = the password you just chose
  ANDROID_KEY_ALIAS         = $ALIAS
  ANDROID_KEY_PASSWORD      = the password you just chose

----- ANDROID_KEYSTORE_BASE64 -----
$B64
-----------------------------------
EOF
