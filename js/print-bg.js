/**
 * 民族图鉴背景 · 01/02 交替 + 滚动交叉淡入
 */
(function () {
  'use strict';

  var DESKTOP_MIN = 1024;

  function isStoryMode() {
    return window.innerWidth >= DESKTOP_MIN &&
      document.documentElement.classList.contains('story-layered');
  }

  function createPrintLayer(variant) {
    var el = document.createElement('div');
    el.className = 'ethnic-print-bg ethnic-print-bg--' + variant;
    var wash = document.createElement('div');
    wash.className = 'ethnic-print-bg__wash';
    el.appendChild(wash);
    return el;
  }

  function initFixedStack() {
    var root = document.querySelector('.ethnic-bg');
    if (!root || root.querySelector('.ethnic-print-stack')) return;

    var stack = document.createElement('div');
    stack.className = 'ethnic-print-stack';
    stack.setAttribute('aria-hidden', 'true');

    var layerA = createPrintLayer('a');
    layerA.classList.add('ethnic-print-stack__layer', 'ethnic-print-stack__layer--a', 'is-active');
    var layerB = createPrintLayer('b');
    layerB.classList.add('ethnic-print-stack__layer', 'ethnic-print-stack__layer--b');

    stack.appendChild(layerA);
    stack.appendChild(layerB);
    root.insertBefore(stack, root.querySelector('.ethnic-bg__corner'));
  }

  function initPanelPrint() {
    var panels = document.querySelectorAll('.story-panel');
    panels.forEach(function (panel, i) {
      if (panel.querySelector('.ethnic-print-bg')) return;
      var variant = i % 2 === 0 ? 'a' : 'b';
      panel.insertBefore(createPrintLayer(variant), panel.firstChild);
    });
  }

  function activePanelIndex() {
    var panels = document.querySelectorAll('.story-panel');
    if (!panels.length) return 0;
    var mid = window.scrollY + window.innerHeight * 0.42;
    var idx = 0;
    panels.forEach(function (panel, i) {
      if (panel.offsetTop <= mid) idx = i;
    });
    return idx;
  }

  function updateFixedCrossfade() {
    if (isStoryMode()) return;

    var stack = document.querySelector('.ethnic-print-stack');
    if (!stack) return;

    var layerA = stack.querySelector('.ethnic-print-stack__layer--a');
    var layerB = stack.querySelector('.ethnic-print-stack__layer--b');
    if (!layerA || !layerB) return;

    var idx = activePanelIndex();
    var panels = document.querySelectorAll('.story-panel');
    var panel = panels[idx];
    if (!panel) return;

    var start = panel.offsetTop;
    var span = Math.max(window.innerHeight * 0.85, 1);
    var t = Math.min(1, Math.max(0, (window.scrollY - start) / span));

    var showB = idx % 2 === 1;
    if (idx < panels.length - 1 && t > 0.35) {
      var nextEven = (idx + 1) % 2 === 0;
      var blend = Math.min(1, (t - 0.35) / 0.45);
      if (nextEven) {
        layerA.style.opacity = String(1 - blend);
        layerB.style.opacity = String(blend);
      } else {
        layerB.style.opacity = String(1 - blend);
        layerA.style.opacity = String(blend);
      }
      return;
    }

    layerA.style.opacity = showB ? '0' : '1';
    layerB.style.opacity = showB ? '1' : '0';
  }

  var rafId = 0;
  function onScroll() {
    if (rafId) return;
    rafId = window.requestAnimationFrame(function () {
      rafId = 0;
      updateFixedCrossfade();
    });
  }

  function boot() {
    initFixedStack();
    initPanelPrint();
    updateFixedCrossfade();
  }

  function init() {
    boot();
    window.setTimeout(boot, 100);
    window.setTimeout(boot, 500);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', boot);

    if (typeof MutationObserver !== 'undefined') {
      new MutationObserver(boot).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
