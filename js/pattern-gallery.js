(function () {
  var TRADITIONAL_DATA = [
    { file: '水车纹.png', name: '水车纹', meaning: '记录梯田灌溉智慧，承载哈尼族生产记忆。' },
    { file: '云雷纹.png', name: '云雷纹', meaning: '模拟哀牢山多变气候，呼应自然神秘性。' },
    { file: '太阳纹.png', name: '太阳纹', meaning: '崇拜万物根本，穿戴可获平安吉祥。' },
    { file: '犬齿纹.png', name: '犬齿纹', meaning: '纪念神狗赐粮传说，寓意辟邪祈福保平安。' },
    { file: '猫头鹰眼纹.png', name: '猫头鹰眼纹', meaning: '驱邪避鬼护身，多用于儿童帽饰与妇女衣襟。' },
    { file: '蝴蝶纹样.png', name: '蝴蝶纹', meaning: '取灵动之意，为黑色服饰增添鲜活气息。' },
    { file: '白鹇鸟纹.jpg', name: '白鹇鸟纹', meaning: '纪念救族神鸟，象征祥瑞降临。' },
    { file: '鱼纹.png', name: '鱼纹', meaning: '崇拜梯田鱼，象征生命富足，多见于挂饰。' },
    { file: '龙头纹.png', name: '龙头纹', meaning: '象征吉祥神圣，多用于银饰点缀。' },
    { file: '莲花纹.png', name: '莲花纹', meaning: '象征纯洁高尚，平衡服饰暗色调。' },
    { file: '蕨纹.png', name: '蕨纹', meaning: '取材山野野菜，体现与自然共生的生存智慧。' },
    { file: '八角花纹.png', name: '八角花纹', meaning: '原型为药用野草，象征顽强生命力与健康。' },
    { file: '几何纹样.jpg', name: '几何纹样', meaning: '象征秩序与理性，寓意生生不息、宇宙和谐。' },
    { file: '植物纹样.jpg', name: '植物纹样', meaning: '象征生命繁荣，寓意生机勃勃、多子多福。' },
    { file: '寿字纹.jpg', name: '寿字纹', meaning: '象征长寿安康，寓意福寿绵长、吉祥如意。' },
    { file: '卷草纹.jpg', name: '卷草纹', meaning: '象征连绵不断，寓意万代长春、吉庆有余。' },
    { file: '云气纹.jpg', name: '云气纹', meaning: '象征高升祥瑞，寓意平步青云、前程似锦。' },
    { file: '螃蟹纹.jpg', name: '螃蟹纹', meaning: '象征纵横驰骋，寓意金榜题名、富甲天下。' },
    { file: '三角纹.jpg', name: '三角纹', meaning: '象征稳定力量，寓意辟邪护身、步步高升。' }
  ];

  var INNOVATION_FILES = [
    '1d00b91cd09dad097762a53b02a4a5a2.jpg',
    '1ec1b8bec68531064c4d2e3d75582378.jpg',
    '274b07d66a03f4bad8f85e58c98fcb0b.jpg',
    '6c525a7df88990525b94964f9ef57331.jpg',
    '7df5c2f6a7ac9eeda3d8d400159760b6.jpg',
    '958101d3b08896a625b8f8f40e68ec86.jpg',
    'b3ff322331627c55feb0ea5a98bbd551.jpg',
    'db4ab697fb638d561c94f347fc28e52e.jpg',
    'f0f6f306a41669d8432395554d40ed9c.jpg'
  ];

  var INNOVATION_DATA = [
    { name: '简笔八角花', meaning: '保留八角花骨架，线条更利落，适合现代服饰留白。' },
    { name: '梯田线语', meaning: '以梯田层理为灵感，表达土地与劳作记忆。' },
    { name: '几何重组纹', meaning: '传统几何元素拆解重组，形成当代秩序感。' },
    { name: '色块图腾', meaning: '放大单一图腾符号，强化视觉识别与品牌感。' },
    { name: '渐变云雷', meaning: '云雷纹简化并渐变处理，适配潮流面料。' },
    { name: '折线犬齿', meaning: '犬齿纹抽象为折线，保留护佑寓意更现代。' },
    { name: '镜像太阳', meaning: '太阳纹对称延展，寓意光明与循环。' },
    { name: '织带复合纹', meaning: '多纹样拼接成织带，可用于服饰边饰。' },
    { name: '极简蕨叶', meaning: '蕨纹高度概括，强调自然与生命力。' }
  ];

  var CULTURAL_FILES = [
    '冰箱贴 (2).jpg', '冰箱贴.jpg', '手机气囊.jpg', '抱枕.jpg',
    '文件夹.jpg', '文件夹2.jpg', '明信片 (2).jpg', '明信片.jpg',
    '杯垫实拍图.jpg', '杯垫平面图.jpg', '编织袋.jpg'
  ];

  var CULTURAL_DATA = [
    { name: '冰箱贴', meaning: '日常备忘中的哈尼纹样，把记忆留在生活角落。' },
    { name: '冰箱贴', meaning: '可收藏可赠予的迷你符号，便于文化传播。' },
    { name: '手机气囊', meaning: '随身可带的纹样符号，让传统走进日常。' },
    { name: '抱枕', meaning: '居家软装中的民族色，舒适与审美并存。' },
    { name: '文件夹', meaning: '学习办公场景里的文化标识。' },
    { name: '文件夹', meaning: '纹样应用于文具，延续使用中的文化感知。' },
    { name: '明信片', meaning: '可寄可藏的梯田记忆，分享长街宴故事。' },
    { name: '明信片', meaning: '图像化叙事载体，连接外地游客与哈尼山水。' },
    { name: '杯垫', meaning: '餐桌上的纹样点缀，实用与礼仪并重。' },
    { name: '杯垫（设计稿）', meaning: '纹样产品化平面稿，便于批量生产。' },
    { name: '编织袋', meaning: '可重复使用的环保载体，纹样随行走传播。' }
  ];

  var TRADITIONAL_FOLDERS = ['image/传统纹样（重叠式的）', 'image/传统纹样'];
  var INNOVATION_FOLDERS = ['image/创新纹样（重叠式的）', 'image/创新纹样'];
  var CULTURAL_FOLDERS = ['image/文创产品（重叠式的）', 'image/文创产品'];

  var tooltipEl;
  var modalEl;
  var modalImg;
  var modalTitle;
  var modalMeaning;

  function encodePath(folder, file) {
    return folder.split('/').map(encodeURIComponent).join('/') + '/' + encodeURIComponent(file);
  }

  function resolveSrc(folders, file, img) {
    var folderIndex = 0;
    img.src = encodePath(folders[folderIndex], file);
    if (folders.length > 1) {
      img.onerror = function () {
        if (folderIndex < folders.length - 1) {
          folderIndex += 1;
          img.onerror = null;
          img.src = encodePath(folders[folderIndex], file);
        }
      };
    }
  }

  function ensurePatternUI() {
    if (tooltipEl) return;

    tooltipEl = document.createElement('div');
    tooltipEl.id = 'pattern-info-tooltip';
    tooltipEl.className = 'pattern-info-tooltip';
    tooltipEl.hidden = true;
    document.body.appendChild(tooltipEl);

    modalEl = document.createElement('div');
    modalEl.id = 'pattern-info-modal';
    modalEl.className = 'pattern-info-modal';
    modalEl.hidden = true;
    modalEl.innerHTML =
      '<div class="pattern-info-modal__panel" role="dialog" aria-modal="true" aria-labelledby="pattern-info-modal-title">' +
        '<button type="button" class="pattern-info-modal__close" aria-label="关闭">×</button>' +
        '<img class="pattern-info-modal__img" alt="">' +
        '<h3 class="pattern-info-modal__title" id="pattern-info-modal-title"></h3>' +
        '<p class="pattern-info-modal__meaning"></p>' +
      '</div>';
    document.body.appendChild(modalEl);

    modalImg = modalEl.querySelector('.pattern-info-modal__img');
    modalTitle = modalEl.querySelector('.pattern-info-modal__title');
    modalMeaning = modalEl.querySelector('.pattern-info-modal__meaning');

    modalEl.querySelector('.pattern-info-modal__close').addEventListener('click', closeModal);
    modalEl.addEventListener('click', function (e) {
      if (e.target === modalEl) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  function showTooltip(meta, x, y) {
    tooltipEl.innerHTML = '<strong>' + meta.name + '</strong><span>' + meta.meaning + '</span>';
    tooltipEl.hidden = false;
    tooltipEl.classList.add('is-visible');
    var rect = tooltipEl.getBoundingClientRect();
    tooltipEl.style.left = Math.min(x + 14, window.innerWidth - rect.width - 12) + 'px';
    tooltipEl.style.top = Math.max(y - rect.height - 12, 8) + 'px';
  }

  function hideTooltip() {
    if (!tooltipEl) return;
    tooltipEl.classList.remove('is-visible');
    tooltipEl.hidden = true;
  }

  function openModal(meta, src, alt) {
    modalImg.src = src;
    modalImg.alt = alt || meta.name;
    modalTitle.textContent = meta.name;
    modalMeaning.textContent = meta.meaning;
    modalEl.hidden = false;
    document.body.classList.add('pattern-modal-open');
  }

  function closeModal() {
    if (!modalEl) return;
    modalEl.hidden = true;
    document.body.classList.remove('pattern-modal-open');
  }

  function bindInteractive(button, meta, img) {
    button.addEventListener('mouseenter', function (e) {
      showTooltip(meta, e.clientX, e.clientY);
    });
    button.addEventListener('mousemove', function (e) {
      if (!tooltipEl.hidden) showTooltip(meta, e.clientX, e.clientY);
    });
    button.addEventListener('mouseleave', hideTooltip);
    button.addEventListener('click', function () {
      hideTooltip();
      openModal(meta, img.currentSrc || img.src, img.alt);
    });
  }

  function buildCatalog(container) {
    buildTraditionalSpotlight(container);
  }

  function buildTraditionalSpotlight(container) {
    if (!container) return;
    ensurePatternUI();
    container.innerHTML = '';
    container.classList.add('pattern-showcase--spotlight');

    var wrap = document.createElement('div');
    wrap.className = 'pattern-spotlight';
    wrap.innerHTML =
      '<span class="pattern-showcase__tagline">✦ 聚光展台 · 19 种传统纹样</span>' +
      '<div class="pattern-spotlight__stage">' +
        '<div class="pattern-spotlight__glow"></div>' +
        '<img class="pattern-spotlight__hero-img" alt="">' +
        '<div class="pattern-spotlight__info">' +
          '<span class="pattern-spotlight__index"></span>' +
          '<h4 class="pattern-spotlight__name"></h4>' +
          '<p class="pattern-spotlight__meaning"></p>' +
        '</div>' +
      '</div>' +
      '<div class="pattern-spotlight__rail-wrap">' +
        '<p class="pattern-spotlight__rail-label">点击缩略图切换 · 大图查看寓意</p>' +
        '<div class="pattern-spotlight__rail"></div>' +
      '</div>' +
      '<p class="pattern-spotlight__hint">自动轮播中 · 悬停暂停</p>';

    container.appendChild(wrap);

    var stage = wrap.querySelector('.pattern-spotlight__stage');
    var heroImg = wrap.querySelector('.pattern-spotlight__hero-img');
    var indexEl = wrap.querySelector('.pattern-spotlight__index');
    var nameEl = wrap.querySelector('.pattern-spotlight__name');
    var meaningEl = wrap.querySelector('.pattern-spotlight__meaning');
    var rail = wrap.querySelector('.pattern-spotlight__rail');
    var activeIndex = 0;
    var timer = null;
    var paused = false;

    function showItem(index, fromUser) {
      activeIndex = index;
      var item = TRADITIONAL_DATA[index];
      stage.classList.add('is-switching');
      heroImg.classList.add('is-fade');

      setTimeout(function () {
        resolveSrc(TRADITIONAL_FOLDERS, item.file, heroImg);
        indexEl.textContent = String(index + 1).padStart(2, '0');
        nameEl.textContent = item.name;
        meaningEl.textContent = item.meaning;
        heroImg.classList.remove('is-fade');
        stage.classList.remove('is-switching');
      }, fromUser ? 180 : 220);

      rail.querySelectorAll('.pattern-spotlight__thumb').forEach(function (btn, i) {
        btn.classList.toggle('is-active', i === index);
      });
    }

    TRADITIONAL_DATA.forEach(function (item, index) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pattern-spotlight__thumb' + (index === 0 ? ' is-active' : '');
      btn.setAttribute('aria-label', item.name);

      var img = document.createElement('img');
      img.alt = item.name;
      img.loading = index < 12 ? 'eager' : 'lazy';
      resolveSrc(TRADITIONAL_FOLDERS, item.file, img);

      btn.appendChild(img);
      btn.addEventListener('click', function () {
        showItem(index, true);
        resetAuto();
      });
      btn.addEventListener('dblclick', function () {
        openModal(item, img.currentSrc || img.src, img.alt);
      });
      rail.appendChild(btn);
    });

    heroImg.addEventListener('click', function () {
      var item = TRADITIONAL_DATA[activeIndex];
      openModal(item, heroImg.currentSrc || heroImg.src, item.name);
    });

    function tick() {
      if (paused) return;
      showItem((activeIndex + 1) % TRADITIONAL_DATA.length, false);
    }

    function resetAuto() {
      clearInterval(timer);
      timer = setInterval(tick, 4000);
    }

    wrap.addEventListener('mouseenter', function () { paused = true; });
    wrap.addEventListener('mouseleave', function () { paused = false; });

    showItem(0, false);
    resetAuto();
    observeAnimate(container);
  }

  function buildInnovationCoverflow(container) {
    if (!container) return;
    ensurePatternUI();
    container.innerHTML = '';
    container.classList.add('pattern-showcase--coverflow');

    var root = document.createElement('div');
    root.className = 'pattern-coverflow';
    root.innerHTML =
      '<span class="pattern-showcase__tagline">✦ 3D 流光廊 · 破圈创新纹样</span>' +
      '<div class="pattern-coverflow__shell">' +
        '<button type="button" class="pattern-coverflow__nav pattern-coverflow__nav--prev" aria-label="上一张">‹</button>' +
        '<div class="pattern-coverflow__viewport"><div class="pattern-coverflow__track"></div></div>' +
        '<button type="button" class="pattern-coverflow__nav pattern-coverflow__nav--next" aria-label="下一张">›</button>' +
      '</div>' +
      '<div class="pattern-coverflow__progress"><div class="pattern-coverflow__progress-bar"></div></div>' +
      '<p class="pattern-coverflow__hint">← 拖动 / 滚轮 / 箭头切换 · 居中卡片点击查看 →</p>';

    container.appendChild(root);

    var viewport = root.querySelector('.pattern-coverflow__viewport');
    var track = root.querySelector('.pattern-coverflow__track');
    var progressBar = root.querySelector('.pattern-coverflow__progress-bar');
    var prevBtn = root.querySelector('.pattern-coverflow__nav--prev');
    var nextBtn = root.querySelector('.pattern-coverflow__nav--next');
    var cards = [];
    var drag = { active: false, moved: false, startX: 0, scrollLeft: 0 };

    INNOVATION_FILES.forEach(function (file, index) {
      var meta = INNOVATION_DATA[index] || { name: '创新纹样', meaning: '' };
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'pattern-coverflow__card';

      var img = document.createElement('img');
      img.className = 'pattern-coverflow__img';
      img.alt = meta.name;
      img.loading = index < 3 ? 'eager' : 'lazy';
      resolveSrc(INNOVATION_FOLDERS, file, img);

      var inner = document.createElement('div');
      inner.className = 'pattern-coverflow__card-inner';
      inner.innerHTML =
        '<div class="pattern-coverflow__cap">' +
          '<strong>' + meta.name + '</strong>' +
          '<p>' + meta.meaning + '</p>' +
        '</div>';
      inner.insertBefore(img, inner.firstChild);

      card.appendChild(inner);
      bindInteractive(card, meta, img);
      card.addEventListener('click', function (e) {
        if (drag.moved) {
          e.preventDefault();
          e.stopImmediatePropagation();
          drag.moved = false;
        }
      }, true);
      track.appendChild(card);
      cards.push(card);
    });

    function getCenterIndex() {
      var center = viewport.scrollLeft + viewport.clientWidth / 2;
      var idx = 0;
      var min = Infinity;
      cards.forEach(function (card, i) {
        var c = card.offsetLeft + card.offsetWidth / 2;
        var d = Math.abs(c - center);
        if (d < min) {
          min = d;
          idx = i;
        }
      });
      return idx;
    }

    function scrollToIndex(index, smooth) {
      var i = Math.max(0, Math.min(cards.length - 1, index));
      var card = cards[i];
      if (!card) return;
      var left = card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2;
      viewport.scrollTo({ left: left, behavior: smooth ? 'smooth' : 'auto' });
    }

    function snapToNearest() {
      scrollToIndex(getCenterIndex(), true);
    }

    function updateCoverflow() {
      var rect = viewport.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var maxDist = rect.width * 0.55;

      cards.forEach(function (card) {
        var cr = card.getBoundingClientRect();
        var dist = (cr.left + cr.width / 2 - centerX) / maxDist;
        dist = Math.max(-1, Math.min(1, dist));
        var abs = Math.abs(dist);
        var rotateY = dist * -52;
        var scale = 0.72 + (1 - abs) * 0.28;
        var translateZ = (1 - abs) * 80 - 30;
        card.style.transform = 'rotateY(' + rotateY.toFixed(1) + 'deg) translateZ(' + translateZ.toFixed(0) + 'px) scale(' + scale.toFixed(3) + ')';
        card.style.opacity = (0.35 + (1 - abs) * 0.65).toFixed(2);
        card.style.zIndex = String(Math.round((1 - abs) * 100));
        card.classList.toggle('is-center', abs < 0.15);
      });

      var scrollMax = track.scrollWidth - viewport.clientWidth;
      if (scrollMax > 0) {
        progressBar.style.width = (viewport.scrollLeft / scrollMax * 100) + '%';
      }
    }

    viewport.addEventListener('scroll', updateCoverflow, { passive: true });
    window.addEventListener('resize', updateCoverflow);

    viewport.addEventListener('pointerdown', function (e) {
      drag.active = true;
      drag.moved = false;
      drag.startX = e.clientX;
      drag.scrollLeft = viewport.scrollLeft;
      viewport.classList.add('is-dragging');
      if (viewport.setPointerCapture) viewport.setPointerCapture(e.pointerId);
    }, { capture: true });

    viewport.addEventListener('pointermove', function (e) {
      if (!drag.active) return;
      var dx = e.clientX - drag.startX;
      if (Math.abs(dx) > 5) drag.moved = true;
      viewport.scrollLeft = drag.scrollLeft - dx;
    });

    function endDrag(e) {
      if (!drag.active) return;
      drag.active = false;
      viewport.classList.remove('is-dragging');
      if (viewport.releasePointerCapture && e.pointerId != null) {
        try { viewport.releasePointerCapture(e.pointerId); } catch (_) {}
      }
      if (drag.moved) snapToNearest();
    }

    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);

    viewport.addEventListener('wheel', function (e) {
      var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!delta) return;
      e.preventDefault();
      e.stopPropagation();
      viewport.scrollLeft += delta;
      updateCoverflow();
    }, { passive: false });

    prevBtn.addEventListener('click', function () {
      scrollToIndex(getCenterIndex() - 1, true);
    });
    nextBtn.addEventListener('click', function () {
      scrollToIndex(getCenterIndex() + 1, true);
    });

    requestAnimationFrame(function () {
      scrollToIndex(0, false);
      updateCoverflow();
    });
    observeAnimate(container);
  }

  function buildCulturalBento(container) {
    if (!container) return;
    ensurePatternUI();
    container.innerHTML = '';
    container.classList.add('pattern-showcase--bento');

    var root = document.createElement('div');
    root.className = 'pattern-bento';
    root.innerHTML =
      '<span class="pattern-showcase__tagline">✦ 磁贴拼贴墙 · 可带走的哈尼记忆</span>' +
      '<div class="pattern-bento__grid"></div>' +
      '<p class="pattern-bento__hint">悬停上滑揭示寓意 · 点击查看大图</p>';

    container.appendChild(root);
    var grid = root.querySelector('.pattern-bento__grid');

    CULTURAL_FILES.forEach(function (file, index) {
      var meta = CULTURAL_DATA[index] || { name: '文创', meaning: '' };
      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'pattern-bento__item';
      item.setAttribute('aria-label', meta.name + '：' + meta.meaning);

      var img = document.createElement('img');
      img.alt = meta.name;
      img.loading = index < 6 ? 'eager' : 'lazy';
      resolveSrc(CULTURAL_FOLDERS, file, img);

      item.innerHTML =
        '<span class="pattern-bento__tag">' + meta.name + '</span>' +
        '<div class="pattern-bento__shine"></div>' +
        '<div class="pattern-bento__img-wrap"></div>' +
        '<div class="pattern-bento__overlay">' +
          '<strong>' + meta.name + '</strong>' +
          '<p>' + meta.meaning + '</p>' +
        '</div>';

      item.querySelector('.pattern-bento__img-wrap').appendChild(img);

      item.addEventListener('mousemove', function (e) {
        var r = item.getBoundingClientRect();
        var sx = ((e.clientX - r.left) / r.width) * 100;
        var sy = ((e.clientY - r.top) / r.height) * 100;
        item.querySelector('.pattern-bento__shine').style.background =
          'radial-gradient(circle at ' + sx + '% ' + sy + '%, rgba(255,255,255,0.5), transparent 55%)';
      });

      item.addEventListener('click', function () {
        openModal(meta, img.currentSrc || img.src, img.alt);
      });

      grid.appendChild(item);
    });

    observeAnimate(container);
  }

  function observeAnimate(el) {
    if (!el || typeof IntersectionObserver === 'undefined') {
      if (el) el.classList.add('is-animate');
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-animate');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    obs.observe(el);
  }

  function buildSlider(container, folders, files, dataList) {
    buildInnovationCoverflow(container);
  }

  function buildShelf(container) {
    buildCulturalBento(container);
  }

  function init() {
    buildCatalog(document.getElementById('pattern-catalog-traditional'));
    buildSlider(
      document.getElementById('pattern-slider-innovation'),
      INNOVATION_FOLDERS,
      INNOVATION_FILES,
      INNOVATION_DATA
    );
    buildShelf(document.getElementById('pattern-shelf-cultural'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
