var html = document.documentElement;

var fontsfile = document.createElement('link');
fontsfile.href = pathTemplate + 'css/fonts.css';
fontsfile.rel = 'stylesheet';
document.head.appendChild(fontsfile);

if (sessionStorage.fontsLoaded) {
    html.classList.add('fonts-loaded');
} else {
    var script = document.createElement('script');
    script.src = pathTemplate + 'js/fontfaceobserver.js';
    script.async = true;

    script.onload = function () {
        var OpenSans300 = new FontFaceObserver('OpenSans', {
            weight: '300'
        });
        var OpenSans300i = new FontFaceObserver('OpenSans', {
            weight: '300',
            style: 'italic'
        });
        var OpenSans400 = new FontFaceObserver('OpenSans', {
            weight: 'normal'
        });
        var OpenSans600 = new FontFaceObserver('OpenSans', {
            weight: '600'
        });

        Promise.all([
            OpenSans300.load(),
            OpenSans300i.load(),
            OpenSans400.load(),
            OpenSans600.load()
        ]).then(function () {
            html.classList.add('fonts-loaded');
            sessionStorage.fontsLoaded = true;
        });
    };
    document.head.appendChild(script);
}