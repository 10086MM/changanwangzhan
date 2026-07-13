/**
 * 智能内容装饰 v4
 * 左右边距对称纹样为主 · 文字区少装饰
 */
(function () {
  'use strict';

  var ZONE_SELECTOR = '.page, .cover-screen, .article-block';
  var SECTION_SELECTOR = '.intro, .dashboard, .act-one-header, .content-block, .ritual-flow, .memory-poster, .cloth-section';

  var PLACEMENTS = {
    rich: [
      { role: 'margin', side: 'left',  pattern: 'pattern-papercut',       top: '4%',  size: 132 },
      { role: 'margin', side: 'right', pattern: 'pattern-papercut-window', top: '4%',  size: 120, flip: true },
      { role: 'margin', side: 'left',  pattern: 'pattern-octagon',        top: '18%', size: 96 },
      { role: 'margin', side: 'right', pattern: 'pattern-sun',            top: '18%', size: 96 },
      { role: 'margin', side: 'left',  pattern: 'pattern-fern',           top: '34%', size: 80 },
      { role: 'margin', side: 'right', pattern: 'pattern-yi-zigzag',      top: '34%', size: 76, flip: true },
      { role: 'margin', side: 'left',  pattern: 'pattern-papercut-bird',  top: '50%', size: 84 },
      { role: 'margin', side: 'right', pattern: 'pattern-papercut',       top: '50%', size: 84 },
      { role: 'margin', side: 'left',  pattern: 'pattern-miao',           top: '66%', size: 72 },
      { role: 'margin', side: 'right', pattern: 'pattern-diamond',        top: '66%', size: 72 },
      { role: 'margin', side: 'left',  pattern: 'pattern-scroll',         bottom: '10%', size: 108 },
      { role: 'margin', side: 'right', pattern: 'pattern-flower',         bottom: '10%', size: 64 }
    ],
    moderate: [
      { role: 'margin', side: 'left',  pattern: 'pattern-papercut',   top: '6%',  size: 108 },
      { role: 'margin', side: 'right', pattern: 'pattern-octagon',    top: '6%',  size: 100, flip: true },
      { role: 'margin', side: 'left',  pattern: 'pattern-cloud',    top: '38%', size: 88 },
      { role: 'margin', side: 'right', pattern: 'pattern-geometry', top: '38%', size: 68, flip: true },
      { role: 'margin', side: 'left',  pattern: 'pattern-fern',       top: '62%', size: 72 },
      { role: 'margin', side: 'right', pattern: 'pattern-scroll',   bottom: '8%', size: 88, flip: true }
    ],
    'light-text': [
      { role: 'margin', side: 'left',  pattern: 'pattern-scroll',   top: '5%',  size: 64 },
      { role: 'margin', side: 'right', pattern: 'pattern-scroll',   top: '5%',  size: 64, flip: true },
      { role: 'margin', side: 'left',  pattern: 'pattern-geometry', bottom: '8%', size: 48 },
      { role: 'margin', side: 'right', pattern: 'pattern-flower',   bottom: '8%', size: 44 }
    ],
    'light-image': [
      { role: 'margin', side: 'left',  pattern: 'pattern-octagon', top: '2%', size: 52 },
      { role: 'margin', side: 'right', pattern: 'pattern-diamond', top: '2%', size: 48, flip: true }
    ]
  };

  var SECTION_PLACEMENTS = {
    rich: [
      { role: 'margin', side: 'left',  pattern: 'pattern-papercut-bird', top: '4%',  size: 72 },
      { role: 'margin', side: 'right', pattern: 'pattern-papercut',      top: '4%',  size: 72, flip: true }
    ],
    moderate: [
      { role: 'margin', side: 'left',  pattern: 'pattern-scroll', top: '5%', size: 60 },
      { role: 'margin', side: 'right', pattern: 'pattern-scroll', top: '5%', size: 60, flip: true }
    ],
    'light-text': [
      { role: 'margin', side: 'left',  pattern: 'pattern-geometry', top: '3%', size: 40 },
      { role: 'margin', side: 'right', pattern: 'pattern-geometry', top: '3%', size: 40, flip: true }
    ],
    'light-image': []
  };

  var PAIR_COUNT = { rich: 5, moderate: 3, 'light-text': 2, 'light-image': 1 };

  var VIEWBOX_MAP = {
    'pattern-cloud': '0 0 120 60',
    'pattern-scroll': '0 0 100 30',
    'pattern-papercut-bird': '0 0 100 100',
    'pattern-papercut-window': '0 0 100 100',
    'pattern-fern': '0 0 100 100',
    'pattern-yi-zigzag': '0 0 100 100',
    'pattern-watermark': '0 0 100 100',
    'pattern-papercut': '0 0 100 100'
  };

  var ASPECT_MAP = {
    'pattern-cloud': 0.5,
    'pattern-scroll': 0.3
  };

  var SIDE_OFFSET = { left: '3.5%', right: '3.5%' };

  function countChars(zone) {
    var clone = zone.cloneNode(true);
    clone.querySelectorAll('.content-decor-container, script, style').forEach(function (n) { n.remove(); });
    return (clone.textContent || '').replace(/\s+/g, '').length;
  }

  function countMedia(zone) {
    var selectors = [
      'img', 'canvas', 'iframe', '.chart-echarts', '.figure-image',
      '.pattern-showcase', '.embed-frame', '.age-outfit__viewport',
      '.media-placeholder video', '.radar-dashboard', '.chart-canvas-wrap'
    ];
    var total = 0;
    selectors.forEach(function (sel) { total += zone.querySelectorAll(sel).length; });
    return total;
  }

  function analyzeDensity(zone, isSection) {
    var chars = countChars(zone);
    var images = countMedia(zone);

    if (isSection) {
      if (chars < 120 && images === 0) return 'rich';
      if (images >= 1) return 'light-image';
      if (chars > 400) return 'light-text';
      return chars < 250 ? 'moderate' : 'light-text';
    }

    if (chars < 300 && images === 0) return 'rich';
    if (images >= 3 && chars < 600) return 'light-image';
    if (images >= 2 && chars < 900) return 'light-image';
    if (chars > 900) return 'light-text';
    if (chars > 600 && images === 0) return 'light-text';

    return 'moderate';
  }

  /** 按密度选取：仅左右对称纹样，文字区不加中间水印 */
  function pickBalanced(placements, density) {
    var left   = placements.filter(function (p) { return p.side === 'left'; });
    var right  = placements.filter(function (p) { return p.side === 'right'; });
    var pairs  = Math.min(left.length, right.length, PAIR_COUNT[density] || 2);
    var picked = [];

    for (var i = 0; i < pairs; i++) {
      picked.push(left[i], right[i]);
    }
    return picked;
  }

  function createSvgDecor(config) {
    var wrap = document.createElement('div');
    var slug = config.pattern.replace('pattern-', '');
    wrap.className = 'content-decor content-decor--' + slug;
    if (config.role) wrap.classList.add('content-decor--' + config.role);
    if (config.side === 'left')  wrap.classList.add('content-decor--side-left');
    if (config.side === 'right') wrap.classList.add('content-decor--side-right');
    if (config.side === 'center') wrap.classList.add('content-decor--side-center');

    var size = config.size || 80;
    var aspect = ASPECT_MAP[config.pattern] || 1;
    wrap.style.width = size + 'px';
    wrap.style.height = Math.round(size * aspect) + 'px';

    if (config.side === 'center') {
      wrap.style.top = config.top || '20%';
      wrap.style.left = '50%';
      wrap.style.marginLeft = (-size / 2) + 'px';
      if (config.offsetY != null) wrap.style.marginTop = config.offsetY + 'px';
    } else {
      if (config.top != null)    wrap.style.top = config.top;
      if (config.bottom != null) wrap.style.bottom = config.bottom;
      if (config.side === 'left')  wrap.style.left = SIDE_OFFSET.left;
      if (config.side === 'right') wrap.style.right = SIDE_OFFSET.right;
    }

    var transforms = [];
    if (config.rotate) transforms.push('rotate(' + config.rotate + 'deg)');
    if (config.flip) transforms.push('scaleX(-1)');
    if (transforms.length) wrap.style.transform = transforms.join(' ');

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', VIEWBOX_MAP[config.pattern] || '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('aria-hidden', 'true');
    var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '#' + config.pattern);
    svg.appendChild(use);
    wrap.appendChild(svg);
    return wrap;
  }

  function decorateZone(zone, isSection) {
    if (zone.dataset.decorApplied === 'true' && zone.dataset.decorVersion === '4') return;

    if (zone.dataset.decorVersion !== '4') {
      zone.querySelectorAll('.content-decor-container').forEach(function (c) { c.remove(); });
      zone.classList.remove('content-decor-zone');
      zone.className = zone.className.replace(/decor-density--\S+/g, '').trim();
      delete zone.dataset.decorApplied;
      delete zone.dataset.decorDensity;
    }

    var density = analyzeDensity(zone, isSection);
    var pool = isSection ? SECTION_PLACEMENTS : PLACEMENTS;
    var placements = pool[density] || pool.moderate || [];

    if (!placements.length) {
      zone.dataset.decorApplied = 'skip';
      return;
    }

    zone.classList.add('content-decor-zone', 'decor-density--' + density);
    zone.dataset.decorDensity = density;

    var picked = pickBalanced(placements, density);

    var container = document.createElement('div');
    container.className = 'content-decor-container';
    container.setAttribute('aria-hidden', 'true');

    picked.forEach(function (cfg) {
      container.appendChild(createSvgDecor(cfg));
    });

    zone.insertBefore(container, zone.firstChild);
    zone.dataset.decorApplied = 'true';
    zone.dataset.decorVersion = '4';
  }

  /** 分层滚动模式下，为每幕面板复制左右纹样栏 */
  function cloneSideRailsToPanels() {
    var leftTpl = document.querySelector('.ethnic-bg__rail--left');
    var rightTpl = document.querySelector('.ethnic-bg__rail--right');
    if (!leftTpl || !rightTpl) return;

    document.querySelectorAll('.story-panel').forEach(function (panel) {
      if (panel.querySelector('.ethnic-panel-rails')) return;
      var layer = document.createElement('div');
      layer.className = 'ethnic-panel-rails';
      layer.setAttribute('aria-hidden', 'true');
      layer.appendChild(leftTpl.cloneNode(true));
      layer.appendChild(rightTpl.cloneNode(true));
      var veil = document.createElement('div');
      veil.className = 'ethnic-bg__veil';
      layer.appendChild(veil);
      panel.insertBefore(layer, panel.firstChild);
    });
  }

  function shouldDecorateSection(section) {
    if (section.dataset.decorApplied) return false;
    if (section.closest('.content-decor-container')) return false;
    var parentZone = section.closest('.content-decor-zone');
    if (!parentZone) return true;
    var pd = parentZone.dataset.decorDensity;
    if (pd === 'rich' || pd === 'light-text' || pd === 'light-image') return false;
    return true;
  }

  function scanZones() {
    document.querySelectorAll(ZONE_SELECTOR).forEach(function (zone) {
      if (zone.classList.contains('page') || zone.classList.contains('cover-screen') ||
          (zone.classList.contains('article-block') && !zone.classList.contains('page'))) {
        decorateZone(zone, false);
      }
    });

    document.querySelectorAll(SECTION_SELECTOR).forEach(function (section) {
      if (shouldDecorateSection(section)) decorateZone(section, true);
    });
  }

  function observeDynamicContent() {
    if (!window.MutationObserver) return;
    var timer = null;
    var observer = new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(scanZones, 500);
    });
    var track = document.getElementById('story-track');
    if (track) observer.observe(track, { childList: true, subtree: true });
  }

  function init() {
    cloneSideRailsToPanels();
    scanZones();
    observeDynamicContent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.EthnicContentDecor = { analyzeDensity: analyzeDensity, rescan: scanZones };
})();
