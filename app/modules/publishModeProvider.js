﻿define(['includedModules/modulesInitializer', 'templateSettings'], function (modulesInitializer, templateSettings) {

    "use strict";

    var viewmodel = {
        init: init,
        isPreview: false,
        isScormEnabled: false,
        isReview: false
    };

    function init(publishMode) {
        if (publishMode === 'Publish' || publishMode === 'Lms') {
            viewmodel.isScormEnabled = modulesInitializer.hasModule('lms');
        }
        if (publishMode === 'Review') {
            viewmodel.isReview = true;
        }
        if (publishMode === 'Preview') {
            viewmodel.isPreview = true;
        }

        if (viewmodel.isPreview || viewmodel.isReview) {
            templateSettings.allowCrossDeviceSaving = false;
            templateSettings.xApi.enabled = false;
        }
    }

    return viewmodel;
});