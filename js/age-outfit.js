(function () {
  var FOLDER = 'image/不同年龄穿搭';

  var AGE_GROUPS = [
    {
      id: 'male',
      label: '男子',
      files: ['哈尼族男子服饰.jpg']
    },
    {
      id: 'child',
      label: '儿童',
      files: ['哈尼儿童 (男).jpg', '哈尼儿童（女）.jpg']
    },
    {
      id: 'young',
      label: '青年女子',
      files: ['哈尼少女.jpg']
    },
    {
      id: 'married',
      label: '已婚妇女',
      files: ['已婚妇女.jpg']
    },
    {
      id: 'elder',
      label: '老年妇女',
      files: ['老年妇女.jpg']
    }
  ];

  function encodePath(file) {
    return FOLDER.split('/').map(encodeURIComponent).join('/') + '/' + encodeURIComponent(file);
  }

  function AgeOutfitCarousel(root) {
    this.root = root;
    this.index = 0;
    this.dragging = false;
    this.startX = 0;
    this.deltaX = 0;

    this.track = root.querySelector('.age-outfit__track');
    this.tabs = root.querySelectorAll('.age-outfit__tab');
    this.cards = [];
    this.listItems = document.querySelectorAll('.article-list--age li');

    this.buildCards();
    this.bindEvents();
    this.goTo(0, false);
  }

  AgeOutfitCarousel.prototype.buildCards = function () {
    var self = this;
    AGE_GROUPS.forEach(function (group, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'age-outfit__card';
      btn.setAttribute('data-index', String(i));
      btn.setAttribute('aria-label', group.label);

      var inner = document.createElement('div');
      inner.className = 'age-outfit__card-inner';

      var wrap = document.createElement('div');
      wrap.className = 'age-outfit__img-wrap' + (group.files.length > 1 ? ' age-outfit__img-wrap--dual' : '');

      group.files.forEach(function (file) {
        var img = document.createElement('img');
        img.src = encodePath(file);
        img.alt = group.label;
        img.loading = i === 0 ? 'eager' : 'lazy';
        img.draggable = false;
        wrap.appendChild(img);
      });

      var label = document.createElement('span');
      label.className = 'age-outfit__label';
      label.textContent = group.label;

      inner.appendChild(wrap);
      inner.appendChild(label);
      btn.appendChild(inner);
      btn.addEventListener('click', function () {
        self.goTo(i);
      });

      self.track.appendChild(btn);
      self.cards.push(btn);
    });
  };

  AgeOutfitCarousel.prototype.layout = function () {
    var n = this.cards.length;
    var offset = this.dragging ? this.deltaX / 120 : 0;

    this.cards.forEach(function (card, i) {
      var diff = i - this.index - offset;
      var abs = Math.abs(diff);
      var clamped = Math.max(-2.5, Math.min(2.5, diff));
      var scale = i === this.index && !this.dragging ? 1 : Math.max(0.62, 1 - abs * 0.14);
      var rotateY = clamped * -22;
      var translateX = clamped * 58;
      var translateZ = i === this.index ? 80 : -abs * 60;
      var opacity = abs > 2.2 ? 0 : Math.max(0.25, 1 - abs * 0.22);

      card.classList.toggle('is-active', i === this.index && !this.dragging);
      card.style.transform =
        'translateX(' + translateX + '%) translateZ(' + translateZ + 'px) rotateY(' + rotateY + 'deg) scale(' + scale + ')';
      card.style.opacity = String(opacity);
      card.style.zIndex = String(100 - Math.round(abs * 10));
      card.style.pointerEvents = abs < 0.6 ? 'auto' : 'none';
    }, this);
  };

  AgeOutfitCarousel.prototype.goTo = function (i, animate) {
    this.index = (i + AGE_GROUPS.length) % AGE_GROUPS.length;
    this.tabs.forEach(function (tab, ti) {
      tab.classList.toggle('is-active', ti === this.index);
    }, this);
    this.listItems.forEach(function (li, lii) {
      li.classList.toggle('is-active', lii === this.index);
    }, this);
    this.layout();
  };

  AgeOutfitCarousel.prototype.bindEvents = function () {
    var self = this;

    this.root.querySelector('.age-outfit__nav--prev').addEventListener('click', function () {
      self.goTo(self.index - 1);
    });
    this.root.querySelector('.age-outfit__nav--next').addEventListener('click', function () {
      self.goTo(self.index + 1);
    });

    this.tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () {
        self.goTo(i);
      });
    });

    this.listItems.forEach(function (li, i) {
      li.addEventListener('click', function () {
        self.goTo(i);
        self.root.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });

    var viewport = this.root.querySelector('.age-outfit__viewport');

    function onStart(x) {
      self.dragging = true;
      self.startX = x;
      self.deltaX = 0;
    }

    function onMove(x) {
      if (!self.dragging) return;
      self.deltaX = x - self.startX;
      self.layout();
    }

    function onEnd() {
      if (!self.dragging) return;
      self.dragging = false;
      if (self.deltaX < -50) self.goTo(self.index + 1);
      else if (self.deltaX > 50) self.goTo(self.index - 1);
      else self.layout();
      self.deltaX = 0;
    }

    viewport.addEventListener('pointerdown', function (e) {
      viewport.setPointerCapture(e.pointerId);
      onStart(e.clientX);
    });
    viewport.addEventListener('pointermove', function (e) {
      onMove(e.clientX);
    });
    viewport.addEventListener('pointerup', onEnd);
    viewport.addEventListener('pointercancel', onEnd);

    window.addEventListener('keydown', function (e) {
      if (!self.root.matches(':hover') && document.activeElement && !self.root.contains(document.activeElement)) return;
      if (e.key === 'ArrowLeft') self.goTo(self.index - 1);
      if (e.key === 'ArrowRight') self.goTo(self.index + 1);
    });

    window.addEventListener('resize', function () {
      self.layout();
    });
  };

  function init() {
    var root = document.getElementById('age-outfit');
    if (!root) return;
    new AgeOutfitCarousel(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
