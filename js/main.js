(function () {
  var navToggle = document.querySelector('.nav-toggle');

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('is-active');
    });
  }

  function setFrameHeight(iframe, height) {
    if (height > 0) {
      iframe.style.height = Math.ceil(height) + 'px';
    }
  }

  function resizeFromDocument(iframe) {
    try {
      var win = iframe.contentWindow;
      var doc = iframe.contentDocument || win.document;
      if (!doc || !doc.body) return;

      iframe.style.height = '8000px';

      win.requestAnimationFrame(function () {
        var height = Math.max(
          doc.body.scrollHeight,
          doc.body.offsetHeight,
          doc.documentElement.scrollHeight,
          doc.documentElement.offsetHeight
        );
        setFrameHeight(iframe, height);
      });
    } catch (_) {}
  }

  document.querySelectorAll('.embed-frame').forEach(function (iframe) {
    iframe.setAttribute('scrolling', 'no');

    iframe.addEventListener('load', function () {
      resizeFromDocument(iframe);
      [100, 300, 600, 1200, 2500, 4000, 6000].forEach(function (delay) {
        window.setTimeout(function () {
          resizeFromDocument(iframe);
        }, delay);
      });
    });
  });

  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'embed-resize') return;

    document.querySelectorAll('.embed-frame').forEach(function (iframe) {
      try {
        if (iframe.contentWindow === event.source) {
          setFrameHeight(iframe, event.data.height);
        }
      } catch (_) {}
    });
  });
})();
