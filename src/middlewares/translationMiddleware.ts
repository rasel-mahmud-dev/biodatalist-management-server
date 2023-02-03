
// use localization middleware
import i18next from "i18next";
import i18nextMiddleware from "i18next-http-middleware";
import FilesystemBackend from "i18next-fs-backend";
import path from "path";


i18next
    .use(FilesystemBackend)
    .use(i18nextMiddleware.LanguageDetector)
    .init(
        {
            backend: {
                loadPath: path.resolve( 'public/locales/{{lng}}/{{ns}}.json')
            },
            debug: false,
            detection: {
                lookupHeader: "lng",
                lookupPath: "lng",
                order: [ 'header', 'cookie'],
                caches: ['header']
            },
            // saveMissing: true,
            fallbackLng: 'en',
            preload: ['en', 'bn']
        },
        (err, t) => {
            if (err) return console.error(err);
            // console.log(t)
            // console.log('i18next is ready...');
            // console.log(t('welcome'));
            // console.log(t('welcome', { lng: 'bn' }));
        }
    );



export default i18nextMiddleware.handle(i18next)
