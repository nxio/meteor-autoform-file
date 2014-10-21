Package.describe({
    name: 'naxio:autoform-file',
    summary: "Upload and manage files easily with AutoForm and CollectionFS",
    version: "0.0.3",
    git: "http://github.com/nxio/meteor-autoform-file.git"
});

Package.onUse(function(api) {
    api.versionsFrom('METEOR@0.9.4');
    api.use(['templating'], 'client');
    api.add_files('lib/client/autoform-file.html', 'client');
    api.add_files('lib/client/autoform-file.css', 'client');
    api.add_files('lib/client/autoform-file.js', 'client');
});