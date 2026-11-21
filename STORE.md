# Publishing Lisan to Google Play and the App Store

Everything the stores ask for is prepared in this repo. This guide walks through what's left: the decisions only you can make, your developer accounts, and clicking through each store console.

| Prepared | Where |
| --- | --- |
| Listing text (name, subtitle, descriptions, keywords, review notes) with character counts | [`store/listing.md`](store/listing.md) |
| Screenshots: iPhone 6.9″ (1290×2796) | `store/screenshots/ios-iphone-6.9/` |
| Screenshots: iPad 13″ (2064×2752) | `store/screenshots/ios-ipad-13/` |
| Screenshots: Android phone (1080×1920) | `store/screenshots/android-phone/` |
| Google Play icon 512×512 and feature graphic 1024×500 | `store/graphics/` |
| App Store icon 1024×1024 (already in the Xcode project as well) | `store/graphics/app-store-icon-1024.png` |
| Privacy policy page | [`privacy.html`](privacy.html) (also linked from the app's Settings) |
| iOS privacy manifest, export-compliance flag, permission texts | `ios/App/App/PrivacyInfo.xcprivacy`, `ios/App/App/Info.plist` |
| Android release signing, version numbering | `android/app/build.gradle` |
| Play upload key generator | `scripts/create-upload-key.sh` |
| Automatic builds: test APK, Play bundle, TestFlight upload | `.github/workflows/android.yml`, `ios-testflight.yml` |

To regenerate the screenshots after changing the app: run `npm start`, then `node scripts/store-screenshots.cjs`.

---

## 1. Decide these first

These are hard or impossible to change after your first upload.

1. **App ID / bundle ID: currently `app.lisan.turkish`.** It's permanent in both stores. Use a reverse domain you control, e.g. `com.yourname.lisan`. To change it, edit:
   - `appId` in `capacitor.config.json`
   - `applicationId` in `android/app/build.gradle`
   - `PRODUCT_BUNDLE_IDENTIFIER` in `ios/App/App.xcodeproj/project.pbxproj` (2 places)
2. **App name.** "Lisan: Learn Turkish Words" is the store name; the icon label on phones is "Lisan". App Store names must be unique, so check it's free when you create the app record (step 3.3).
3. **Contact email.** Replace `CONTACT_EMAIL` in `privacy.html` (2 places). Both stores also show a support email publicly.
4. **Privacy policy URL.** The stores need a public link. The simplest option is GitHub Pages:
   1. Create a `main` branch from this branch.
   2. Set **Settings → Pages → Source: GitHub Actions**.
   3. Run the "Deploy to GitHub Pages" workflow.

   The policy is then at `https://ammarhijran.github.io/language/privacy.html`. Any other public web page with the same text works too.

---

## 2. Google Play

### 2.1 Developer account
- Sign up at <https://play.google.com/console/signup>. There's a one-time US$25 fee and an identity check.
- **New personal accounts must run a closed test with at least 12 testers for 14 days before they can publish to production.** Plan for that. Organisation accounts are exempt.

### 2.2 Upload key (one time)
On any computer with Java:
```bash
bash scripts/create-upload-key.sh
```
1. Save the `.keystore` file and password in a password manager. **Never commit it.**
2. Add the 4 values it prints under **GitHub → Settings → Secrets and variables → Actions → New repository secret**:
   - `ANDROID_KEYSTORE_BASE64`
   - `ANDROID_KEYSTORE_PASSWORD`
   - `ANDROID_KEY_ALIAS`
   - `ANDROID_KEY_PASSWORD`

From then on, every push also produces `lisan-play-store-bundle` (an `.aab` file) under the **Android app** run in the Actions tab. That's the file you upload to Play.

### 2.3 Create the app in Play Console
1. **Create app:**
   - App name: `Lisan: Learn Turkish Words`
   - Default language: English (US)
   - App or game: App
   - Free or paid: Free
2. **Store listing:**
   - Short and full description from `store/listing.md`
   - App icon: `store/graphics/play-icon-512.png`
   - Feature graphic: `store/graphics/play-feature-graphic-1024x500.png`
   - Phone screenshots: `store/screenshots/android-phone/*`
   - Category: Education
   - Contact email: yours
3. **App content** (Policy → App content). Answer:

   | Section | Answer |
   | --- | --- |
   | Privacy policy | your privacy URL (step 1.4) |
   | Ads | No, my app does not contain ads |
   | App access | All functionality is available without special access |
   | Content rating | Run the questionnaire with category Education and answer **No** to everything. Result: Everyone / PEGI 3 |
   | Target audience | **13 and over** is simplest. Including under-13s opts you into the Families policy, which needs extra review. |
   | Data safety | Collects data: **No**. Shares data: **No**. See note below. |
   | Government / financial / health apps | No / none / no |

   > **Data safety note:** Lisan sends nothing to you or any server. Progress stays on the device. Speech is turned into text by Android's own speech-recognition service, and the app only keeps the resulting text in memory to score it. That's why "No data collected" is accurate. If you'd rather be conservative, you can declare *Audio → Voice or sound recordings*, processed ephemerally, not shared, for app functionality.
4. **Testing → Internal testing:**
   1. Create a release and upload the `.aab`.
   2. Accept **Play App Signing** when asked. Google keeps the final signing key and your upload key can be reset if lost.
   3. Add yourself as a tester and install from the opt-in link.
5. **Testing → Closed testing** (personal accounts): invite at least 12 testers and keep the test running for 14 days.
6. Then **apply for production access**, create a production release with the same `.aab`, and send it for review. Reviews usually take a few days.

> The test APK published by the "Android test build" GitHub release is signed with the repo's public *sideload* key. Play Store builds use your private upload key. Android won't update one with the other, so uninstall the test build before installing from Play.

---

## 3. App Store

### 3.1 Developer account
Enroll in the Apple Developer Program at <https://developer.apple.com/programs/enroll/>. It costs US$99/year. Individuals are usually approved in a day or two; organisations need a D-U-N-S number.

### 3.2 Get a build into App Store Connect
Choose one option.

**A. Xcode on a Mac**
```bash
npm install
npm run cap:sync
npm run ios:open
```
1. In Xcode, select the *App* target → **Signing & Capabilities**.
2. Tick *Automatically manage signing* and choose your team.
3. Choose **Product → Archive**, then **Distribute App → App Store Connect → Upload**.

**B. GitHub Actions, no Mac needed**
1. In App Store Connect, go to **Users and Access → Integrations → App Store Connect API**.
2. Create a team key with the **App Manager** role and download the `.p8` file. You can only download it once.
3. Add these repository secrets:
   - `APPLE_TEAM_ID`: Membership page on developer.apple.com
   - `APP_STORE_CONNECT_KEY_ID`
   - `APP_STORE_CONNECT_ISSUER_ID`
   - `APP_STORE_CONNECT_KEY_P8`: the full text of the `.p8` file
4. Open the Actions tab, choose **iOS → TestFlight**, then **Run workflow**.

   *This workflow hasn't run yet, because it needs your Apple account. If the first run fails, the log shows which step needs attention.*

### 3.3 Create the app record
In App Store Connect, go to **Apps → + → New App**:
- Platform: iOS
- Name: `Lisan: Learn Turkish Words`
- Primary language: English (U.S.)
- Bundle ID: the one from step 1.1. It appears after you register it, which Xcode or the workflow does automatically.
- SKU: `lisan-turkish`

### 3.4 Fill in the version page

| Field | Value |
| --- | --- |
| Screenshots | 6.9″ iPhone: `store/screenshots/ios-iphone-6.9/*` · 13″ iPad: `store/screenshots/ios-ipad-13/*` |
| Promotional text, description, keywords, subtitle | `store/listing.md` |
| Support URL / marketing URL | your choice (see `store/listing.md`) |
| Build | pick the uploaded build (it appears 10–30 min after upload) |
| App Review information | no sign-in required; paste the review notes from `store/listing.md` |
| Copyright | `2026 Your Name` |

Then fill in these App-level pages:
- **App Privacy:**
  1. Privacy policy URL.
  2. *Data collection*: "No, we do not collect data from this app". The bundled `PrivacyInfo.xcprivacy` matches this.
- **Age Rating:** answer *None* / *No* throughout. The result is 4+.
- **Pricing and Availability:** Free, all countries (or your choice).
- **Export compliance:** already answered. `ITSAppUsesNonExemptEncryption = NO` is in `Info.plist`, so Apple won't ask on every upload.

### 3.5 Test and submit
- **TestFlight:** builds are available to internal testers right away. External testers need a quick beta review.
- **Submit:** choose **Add for Review → Submit**. Reviews typically take 1–3 days.

---

## 4. Shipping updates
1. Bump the version: `npm version patch`, `minor` or `major`. Both apps read the version name from `package.json`.
2. Push.
   - **Android:** the build number is the Actions run number, so it always increases. Download the new `.aab` and upload it to a new Play release.
   - **iOS:** run **iOS → TestFlight** again, or Archive in Xcode after raising *Build* in the target's General tab.
3. If you changed anything visible, regenerate screenshots: `node scripts/store-screenshots.cjs`.
