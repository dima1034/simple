﻿define(['durandal/app', 'context', 'plugins/router', 'plugins/http'],
    function (app, context, router, http) {

        var courseTitle = null,
            content = null,

            canActivate = function () {
                if (context.course.hasIntroductionContent == false) {
                    return { redirect: '#objectives' };
                }
                return true;
            },

            activate = function (queryString) {
                if (queryString && queryString.lock) {
                    router.isNavigationLocked(queryString.lock.toLowerCase() == "true");
                }

                this.courseTitle = "\"" + context.course.title + "\"";

                var that = this;
                return Q.fcall(function () {
                    return http.get('content/content.html').then(function (response) {
                        that.content = response;
                    }).fail(function () {
                        that.content = '';
                    }).always(function () {
                        app.trigger('user:set-progress-clear');
                    });
                });

            },

            startCourse = function () {
                if (router.isNavigationLocked()) {
                    return;
                }
                router.navigate('objectives');

            };

        return {
            courseTitle: courseTitle,
            content: content,
            router: router,

            startCourse: startCourse,
            canActivate: canActivate,
            activate: activate
        };
    }
);