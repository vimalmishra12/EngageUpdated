"use strict";
var landing = require('../../pages/engageExperienceApp/landing.page.js');
var sts;

module.exports = {

    ENG_LAND_TC_1: async function () {
        sts = await landing.isInitialized();
        await assertion.assertEqual(sts.pageStatus, true, "Landing page status mismatch");
        // await assertion.assert((sts.signup_btnText instanceof Error) === false, "Get started button issue - " + sts.signup_btnText);
        // await assertion.assert((sts.login_btnText instanceof Error) === false, "I have an account button issue - " + sts.login_btnText);
        //  await assertion.assertEqual(sts.brandLogo_img_exists, true, "Brand logo does not exist");
        //  await assertion.assertEqual(sts.selectedLangImg_exists, true, "Language image does not exist");
    },
    ENG_LAND_TC_2: async function (testdata) {
        sts = await landing.click_signupBtn();
        await assertion.assertEqual(sts.pageStatus, true, "Page is not launched. ");

    },

    ENG_LAND_TC_3: async function (testdata) {
        sts = await landing.click_loginBtn();
        await assertion.assertEqual(sts.pageStatus, true, "Page is not launched. ");

    },

    ENG_LAND_TC_4: async function (testdata) {
        sts = await landing.click_languageSelector_dropdown(testdata);
        await assertion.assertEqual(sts, true, "languageSelector_dropdown are not Clicked");
    },

    ENG_LAND_TC_5: async function (testdata) {
        sts = await landing.getData_landingPage(testdata);
        await assertion.assertEqual(sts.headingText, testdata.headingText, "headingText Values is not as expected.");
        await assertion.assertEqual(sts.subheadingText, testdata.subheadingText, "subheadingText Values is not as expected.");
        await assertion.assertEqual(sts.signupBtn, testdata.signupBtn, "signupBtn Values is not as expected.");
        await assertion.assertEqual(sts.loginBtn, testdata.loginBtn, "loginBtn Values is not as expected.");
        await assertion.assertEqual(sts.brandLogo_img, true, "brandLogo_img Values is not as expected.");
      
        },

}