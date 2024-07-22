"use strict";
var action = require('../../core/actionLibrary/baseActionLibrary.js')
var selectorFile = jsonParserUtil.jsonParser(selectorDir)


module.exports = {
    headingText: selectorFile.css.ComproEngage.landing.headingText,
    subheadingText: selectorFile.css.ComproEngage.landing.subheadingText,
    signupBtn: selectorFile.css.ComproEngage.landing.signupBtn,
    loginBtn: selectorFile.css.ComproEngage.landing.loginBtn,
    brandLogo_img: selectorFile.css.ComproEngage.landing.brandLogo_img,
    languageSelector_dropdown: selectorFile.css.ComproEngage.landing.languageSelector_dropdown,
    languageSelector_dropdown_list: selectorFile.css.ComproEngage.landing.languageSelector_dropdown_list,


    isInitialized: async function () {
        var res;
        await logger.logInto(await stackTrace.get());
        await action.waitForDocumentLoad();
        res = {
            pageStatus: await action.waitForDisplayed(this.brandLogo_img),
        };
        return res;
    },

    getData_landingPage: async function () {
        await logger.logInto(await stackTrace.get());
        await browser.pause(1000);
        var obj;
     
        obj = {
            headingText: ((await action.getElementCount(this.headingText)) > 0) ? await action.getText(this.headingText) : null,
            subheadingText: ((await action.getElementCount(this.subheadingText)) > 0) ? await action.getText(this.subheadingText) : null,
            signupBtn: ((await action.getElementCount(this.signupBtn)) > 0) ? await action.getText(this.signupBtn) : null,
            loginBtn: ((await action.getElementCount(this.loginBtn)) > 0) ? await action.getText(this.loginBtn) : null,
            brandLogo_img: ((await action.getElementCount(this.brandLogo_img)) > 0) ? await action.waitForDisplayed(this.brandLogo_img) : false,
           languageSelector_dropdown: ((await action.getElementCount(this.languageSelector_dropdown)) > 0) ? await action.getText(this.languageSelector_dropdown) : null,
        }
       
        console.log(obj);
        return obj;
    },


    click_signupBtn: async function () {
        await logger.logInto(await stackTrace.get());
        var res;
        res = await action.click(this.signupBtn);
        if (true == res) {
            await logger.logInto(await stackTrace.get(), " signupBtn is clicked");
            res = await require('./signup.page').isInitialized();
        }
        else {
            await logger.logInto(await stackTrace.get(), res + "signupBtn is NOT clicked", 'error');
        }
        return res;
    },

    click_loginBtn: async function () {
        await logger.logInto(await stackTrace.get());
        var res;
        res = await action.click(this.loginBtn);
        if (true == res) {
            await logger.logInto(await stackTrace.get(), " loginBtn is clicked");
            res = await require('./login.page').isInitialized();
        }
        else {
            await logger.logInto(await stackTrace.get(), res + "loginBtn is NOT clicked", 'error');
        }
        return res;
    },

    // click_languageSelector_dropdown: async function () {
    //     await logger.logInto(await stackTrace.get());
    //     var res;
    //     res = await action.click(this.languageSelector_dropdown);
    //     if (true == res) {
    //         await logger.logInto(await stackTrace.get(), " languageSelector_dropdown is clicked");
    //     }
    //     else {
    //         await logger.logInto(await stackTrace.get(), res + "languageSelector_dropdown is NOT clicked", 'error');
    //     }
    //     return res;
    // },
    click_languageSelector_dropdown: async function (lang) {
        await logger.logInto(await stackTrace.get());
        let res = await action.click(this.languageSelector_dropdown);
        if (true == res) {
            let list, i;
            list = await action.findElements(this.languageSelector_dropdown_list);
            res = null;
            console.log(list.length);
            for (i = 2; i <= list.length + 1; i++) {
                console.log(lang);
                if (lang == (await action.getText(this.languageSelector_dropdown_list + ":nth-child(" + i + ")"))) {
                    res = await action.click(this.languageSelector_dropdown_list + ":nth-child(" + i + ")");
                    await logger.logInto(await stackTrace.get(), "Value " + lang + " selected from the drop down");
                    await action.waitForDocumentLoad();
                    if (true == res)
                        res = await action.waitForDisplayed(this.languageSelector_dropdown);
                    break;
                }
            }
            if (res == null) {
                res = lang + " -- language not found in the dropdown";
                await logger.logInto(await stackTrace.get(), res, 'error');
            }
        }

        else {
            res = res + " -- Error in clicking language Selector Arrow";
            await logger.logInto(await stackTrace.get(), res, 'error');
        }
        return res;
    }

};

