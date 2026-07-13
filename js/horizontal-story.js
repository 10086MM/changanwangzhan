(function () {
  var DESKTOP_MIN = 1024;
  var track = document.getElementById('story-track');
  var nav = document.getElementById('story-nav');
  if (!track) return;

  var panels = Array.prototype.slice.call(track.querySelectorAll('.story-panel'));
  var navItems = nav
    ? Array.prototype.slice.call(nav.querySelectorAll('.story-nav__item'))
    : [];

  function isStoryMode() {
    return window.innerWidth >= DESKTOP_MIN;
  }

  function enableStoryMode() {
    document.documentElement.classList.toggle('story-layered', isStoryMode());
    if (isStoryMode()) {
      window.setTimeout(resizeCharts, 400);
      observePanels();
    }
  }

  function resizeCharts() {
    if (window.HaniCharts && typeof window.HaniCharts.resize === 'function') {
      window.HaniCharts.resize();
      return;
    }
    if (typeof echarts === 'undefined') return;
    document.querySelectorAll('.chart-echarts').forEach(function (el) {
      var inst = echarts.getInstanceByDom(el);
      if (inst) inst.resize();
    });
  }

  function activeIndex() {
    var mid = window.scrollY + window.innerHeight * 0.42;
    var idx = 0;
    panels.forEach(function (panel, i) {
      var top = panel.offsetTop;
      if (top <= mid) idx = i;
    });
    return idx;
  }

  function panelScrollEl(panel) {
    return panel.querySelector('.story-panel__scroll');
  }

  function goToPanel(index) {
    if (index < 0 || index >= panels.length) return;
    var top = panels[index].offsetTop;
    window.scrollTo({ top: top, behavior: 'smooth' });
    setActiveNav(index);
  }

  function setActiveNav(index) {
    navItems.forEach(function (item, i) {
      item.classList.toggle('is-active', i === index);
    });
  }

  function nearestScrollable(target) {
    return target.closest('.story-panel__scroll');
  }

  function canScrollVertically(el, delta) {
    if (!el || el.scrollHeight <= el.clientHeight) return false;
    if (delta > 0) {
      return el.scrollTop + el.clientHeight < el.scrollHeight - 2;
    }
    return el.scrollTop > 2;
  }

  var panelObserver = null;

  function observePanels() {
    if (!isStoryMode() || typeof IntersectionObserver === 'undefined') return;

    if (panelObserver) {
      panelObserver.disconnect();
    }

    panelObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('is-inview', entry.intersectionRatio >= 0.52);
      });
    }, { threshold: [0, 0.35, 0.52, 0.75, 1] });

    panels.forEach(function (panel) {
      panelObserver.observe(panel);
    });
  }

  var scrollRaf = 0;
  window.addEventListener('scroll', function () {
    if (!isStoryMode()) return;
    if (scrollRaf) return;
    scrollRaf = window.requestAnimationFrame(function () {
      scrollRaf = 0;
      setActiveNav(activeIndex());
    });
  }, { passive: true });

  function currentPanelInner() {
    var idx = activeIndex();
    var panel = panels[idx];
    if (!panel) return null;
    var inner = panelScrollEl(panel);
    if (inner) return inner;
    return document.activeElement && nearestScrollable(document.activeElement);
  }

  document.addEventListener('keydown', function (event) {
    if (!isStoryMode()) return;
    var idx = activeIndex();
    var inner = currentPanelInner();

    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      if (inner && canScrollVertically(inner, 1)) return;
      event.preventDefault();
      goToPanel(idx + 1);
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      if (inner && canScrollVertically(inner, -1)) return;
      event.preventDefault();
      goToPanel(idx - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      goToPanel(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      goToPanel(panels.length - 1);
    }
  });

  var wheelLock = false;
  var wheelUnlockTimer = 0;

  function canScrollHorizontally(el, delta) {
    if (!el || el.scrollWidth <= el.clientWidth + 2) return false;
    if (delta > 0) {
      return el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
    }
    return el.scrollLeft > 2;
  }

  function nearestHorizontalScroll(target) {
    var el = target;
    while (el && el !== document.body) {
      if (el.scrollWidth > el.clientWidth + 2) {
        var ox = window.getComputedStyle(el).overflowX;
        if (ox === 'auto' || ox === 'scroll' || el.classList.contains('pattern-coverflow__viewport')) {
          return el;
        }
      }
      el = el.parentElement;
    }
    return null;
  }

  document.addEventListener('wheel', function (event) {
    if (!isStoryMode()) return;
    if (wheelLock) {
      event.preventDefault();
      return;
    }

    var horiz = nearestHorizontalScroll(event.target);
    if (horiz) {
      var hDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (hDelta && canScrollHorizontally(horiz, hDelta)) {
        event.preventDefault();
        horiz.scrollLeft += hDelta;
        return;
      }
    }

    var direction = event.deltaY > 0 ? 1 : event.deltaY < 0 ? -1 : 0;
    if (!direction) return;

    var inner = currentPanelInner();
    if (inner && canScrollVertically(inner, direction)) return;

    var idx = activeIndex();
    var next = idx + direction;
    if (next < 0 || next >= panels.length) return;

    event.preventDefault();
    wheelLock = true;
    if (wheelUnlockTimer) window.clearTimeout(wheelUnlockTimer);
    goToPanel(next);
    wheelUnlockTimer = window.setTimeout(function () {
      wheelLock = false;
      wheelUnlockTimer = 0;
    }, 700);
  }, { passive: false });

  navItems.forEach(function (item, index) {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      goToPanel(index);
    });
  });

  var coverStartBtn = document.getElementById('cover-start-btn');
  if (coverStartBtn) {
    coverStartBtn.addEventListener('click', function () {
      goToPanel(1);
    });
  }

  if (typeof IntersectionObserver !== 'undefined') {
    var chartObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          window.setTimeout(resizeCharts, 350);
        }
      });
    }, { threshold: 0.25 });
    panels.forEach(function (panel) {
      chartObserver.observe(panel);
    });
  }

  window.addEventListener('resize', function () {
    enableStoryMode();
    resizeCharts();
  });

  enableStoryMode();
  setActiveNav(0);
  if (isStoryMode() && panels[0]) {
    panels[0].classList.add('is-inview');
  }
})();
