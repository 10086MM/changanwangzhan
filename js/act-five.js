(function () {
  var FONT = '"Noto Serif SC", serif';
  var TEXT = 'rgba(240,235,225,0.82)';
  var TEXT_DIM = 'rgba(240,235,225,0.5)';
  var GOLD = '#d4a84b';
  var CYAN = '#4ecdc4';

  var RADAR_DATA = [
    {
      name: '文旅经济',
      value: 8.2,
      detail: '规模化长街宴已形成节庆引流—农产品外销—村寨就业的简易乡村产业闭环，淡旺季客流不均衡为主要短板。'
    },
    {
      name: '社会价值',
      value: 8.0,
      detail: '长街宴成为跨民族交融的公共文化纽带，乡土社群联结属性突出，需兼顾游客体验与本土村寨生活边界。'
    },
    {
      name: '民俗礼仪',
      value: 6.7,
      detail: '核心祭祀、分福肉等古礼留存完好，外围观光宴席存在仪式简化问题，年轻群体礼仪传承有待加强。'
    },
    {
      name: '历史底蕴',
      value: 6.2,
      detail: '非遗名录背书+古老宗族传承基础扎实，目前对外传播对长街宴历史源流的科普深度不足。'
    },
    {
      name: '艺术审美',
      value: 5.5,
      detail: '原生哈尼服饰、乐作舞艺术内核底蕴丰厚，非遗艺术的文创开发、数字化转化为现阶段最大短板。'
    }
  ];

  var POSTER_COPY = {
    food: {
      title: '梯田农耕食俗',
      line: '从七彩糯米饭到梯田鱼，每一道菜都是四素同构生态系统的味觉注脚。',
      score: '关注维度：饮食 · 礼仪 · 产业链'
    },
    costume: {
      title: '哈尼服饰非遗',
      line: '针线是无字史书，纹样从衣角走向文创，传统美学正在寻找当代表达。',
      score: '关注维度：纹样 · 穿搭 · 文创转化'
    },
    dance: {
      title: '多民族共舞仪式',
      line: '拉手围圈，十二步十二转——歌舞是祭祀、团圆与民族团结的伦理展演。',
      score: '关注维度：乐作舞 · 仪式歌舞 · 社群凝聚'
    },
    tourism: {
      title: '乡村文旅发展',
      line: '三千桌宴席背后，是梯田产业、非遗政策与全域旅游交织的乡村振兴样本。',
      score: '关注维度：规模扩容 · 增收数据 · 文旅闭环'
    }
  };

  function avgScore() {
    var sum = RADAR_DATA.reduce(function (acc, d) { return acc + d.value; }, 0);
    return Math.round((sum / RADAR_DATA.length) * 10) / 10;
  }

  function buildOption(activeIndex) {
    var gradientArea = typeof echarts !== 'undefined' && echarts.graphic
      ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'rgba(78, 205, 196, 0.42)' },
        { offset: 0.55, color: 'rgba(212, 168, 75, 0.28)' },
        { offset: 1, color: 'rgba(212, 168, 75, 0.06)' }
      ])
      : 'rgba(212, 168, 75, 0.28)';

    var lineGradient = typeof echarts !== 'undefined' && echarts.graphic
      ? new echarts.graphic.LinearGradient(0, 0, 1, 1, [
        { offset: 0, color: CYAN },
        { offset: 1, color: GOLD }
      ])
      : GOLD;

    return {
      backgroundColor: 'transparent',
      animation: true,
      animationDuration: 1400,
      animationEasing: 'cubicOut',
      animationDurationUpdate: 400,
      textStyle: { fontFamily: FONT, color: TEXT },
      radar: {
        center: ['50%', '54%'],
        radius: '58%',
        startAngle: 90,
        splitNumber: 5,
        axisName: {
          fontFamily: FONT,
          fontSize: 14,
          lineHeight: 20,
          color: TEXT,
          formatter: function (name) {
            var idx = RADAR_DATA.findIndex(function (d) { return d.name === name; });
            var val = idx >= 0 ? RADAR_DATA[idx].value : '';
            if (idx === activeIndex) {
              return '{active|' + name + '}\n{scoreOn|' + val + '}';
            }
            return name + '\n{score|' + val + '}';
          },
          rich: {
            active: {
              color: CYAN,
              fontSize: 15,
              fontWeight: 700,
              lineHeight: 22
            },
            score: {
              color: GOLD,
              fontSize: 16,
              fontWeight: 700,
              lineHeight: 22
            },
            scoreOn: {
              color: GOLD,
              fontSize: 18,
              fontWeight: 900,
              lineHeight: 24,
              textShadowColor: 'rgba(212,168,75,0.6)',
              textShadowBlur: 8
            }
          }
        },
        axisNameGap: 14,
        splitLine: {
          lineStyle: { color: 'rgba(78, 205, 196, 0.18)' }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: [
              'rgba(78, 205, 196, 0.04)',
              'rgba(78, 205, 196, 0.09)'
            ]
          }
        },
        axisLine: {
          lineStyle: { color: 'rgba(240, 235, 225, 0.18)' }
        },
        indicator: RADAR_DATA.map(function (d) {
          return { name: d.name, max: 10 };
        })
      },
      series: [{
        type: 'radar',
        symbol: 'circle',
        symbolSize: function (_val, params) {
          return params.dimensionIndex === activeIndex ? 16 : 10;
        },
        triggerEvent: true,
        lineStyle: {
          color: lineGradient,
          width: 2.5,
          shadowBlur: 10,
          shadowColor: 'rgba(78, 205, 196, 0.45)'
        },
        areaStyle: { color: gradientArea },
        itemStyle: {
          color: GOLD,
          borderColor: '#fff',
          borderWidth: 2,
          shadowBlur: 14,
          shadowColor: 'rgba(212, 168, 75, 0.75)'
        },
        emphasis: {
          scale: true,
          lineStyle: { width: 3.5 },
          areaStyle: { color: 'rgba(78, 205, 196, 0.35)' },
          itemStyle: {
            shadowBlur: 28,
            shadowColor: 'rgba(212, 168, 75, 1)',
            borderWidth: 3
          }
        },
        data: [{
          value: RADAR_DATA.map(function (d) { return d.value; }),
          name: '非遗刻度'
        }]
      }]
    };
  }

  function initInsights() {
    var high = RADAR_DATA.reduce(function (a, b) { return a.value >= b.value ? a : b; });
    var low = RADAR_DATA.reduce(function (a, b) { return a.value <= b.value ? a : b; });

    var highVal = document.getElementById('insight-high-value');
    var highName = document.getElementById('insight-high-name');
    var lowVal = document.getElementById('insight-low-value');
    var lowName = document.getElementById('insight-low-name');
    var avgVal = document.getElementById('insight-avg-value');
    var dimList = document.getElementById('radar-insights-dims');

    if (highVal) highVal.textContent = high.value;
    if (highName) highName.textContent = high.name;
    if (lowVal) lowVal.textContent = low.value;
    if (lowName) lowName.textContent = low.name;
    if (avgVal) avgVal.textContent = avgScore();

    if (dimList) {
      dimList.innerHTML = RADAR_DATA.map(function (d, i) {
        return '<li><button type="button" class="radar-insights__dim-btn" data-index="' + i + '">' +
          '<span>' + d.name + '</span><strong>' + d.value + '</strong></button></li>';
      }).join('');
    }
  }

  function initRadar(dom) {
    if (!dom || typeof echarts === 'undefined') return;

    var chart = echarts.init(dom, null, { renderer: 'canvas' });
    var card = document.getElementById('radar-float-card');
    var cardDim = document.getElementById('radar-card-dim');
    var cardScore = document.getElementById('radar-card-score');
    var cardText = document.getElementById('radar-card-text');
    var activeIndex = -1;
    var pinnedIndex = null;
    var isTouch = window.matchMedia('(hover: none)').matches;

    function resolveDimIndex(params) {
      if (!params) return -1;
      if (params.componentType === 'radar' && params.name) {
        var byAxis = RADAR_DATA.findIndex(function (d) {
          return params.name.indexOf(d.name) === 0;
        });
        if (byAxis >= 0) return byAxis;
      }
      if (params.event && params.event.target && typeof params.event.target.__dimIdx === 'number') {
        return params.event.target.__dimIdx;
      }
      if (typeof params.dimensionIndex === 'number') return params.dimensionIndex;
      return -1;
    }

    function showCard(index) {
      if (index < 0 || !card) return;
      var item = RADAR_DATA[index];
      cardDim.textContent = item.name;
      cardScore.textContent = item.value + ' / 10';
      cardText.textContent = item.name + ' ' + item.value + ' 分｜' + item.detail;
      card.hidden = false;
      card.classList.add('is-visible');
      card.setAttribute('data-active-index', String(index));
    }

    function hideCard() {
      if (!card) return;
      card.classList.remove('is-visible');
      card.hidden = true;
      card.removeAttribute('data-active-index');
    }

    function setActive(index, pin) {
      if (index < 0) {
        if (!pin && pinnedIndex === null) {
          activeIndex = -1;
          hideCard();
          chart.setOption(buildOption(-1), { notMerge: true, lazyUpdate: false });
        }
        return;
      }
      activeIndex = index;
      if (pin) pinnedIndex = index;
      showCard(index);
      chart.setOption(buildOption(index), { notMerge: true, lazyUpdate: false });

      document.querySelectorAll('.radar-insights__dim-btn').forEach(function (btn) {
        btn.classList.toggle('is-active', Number(btn.getAttribute('data-index')) === index);
      });
    }

    chart.setOption(buildOption(-1));

    chart.on('mouseover', function (params) {
      if (isTouch) return;
      var idx = resolveDimIndex(params);
      if (idx >= 0) setActive(idx, false);
    });

    chart.on('mouseout', function () {
      if (isTouch || pinnedIndex !== null) return;
      setActive(-1, false);
    });

    chart.on('click', function (params) {
      var idx = resolveDimIndex(params);
      if (idx < 0) {
        if (pinnedIndex !== null) {
          pinnedIndex = null;
          setActive(-1, false);
        }
        return;
      }
      if (pinnedIndex === idx) {
        pinnedIndex = null;
        setActive(-1, false);
      } else {
        setActive(idx, true);
      }
    });

    document.querySelectorAll('.radar-insights__dim-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = Number(btn.getAttribute('data-index'));
        if (pinnedIndex === idx) {
          pinnedIndex = null;
          setActive(-1, false);
        } else {
          setActive(idx, true);
        }
      });
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }

  function initPoster() {
    var root = document.getElementById('memory-poster');
    if (!root) return;

    var preview = root.querySelector('.memory-poster__preview');
    var titleEl = root.querySelector('.memory-poster__card-title');
    var lineEl = root.querySelector('.memory-poster__card-line');
    var scoreEl = root.querySelector('.memory-poster__card-score');
    var selected = 'food';

    function render(key) {
      var data = POSTER_COPY[key];
      if (!data) return;
      selected = key;
      titleEl.textContent = data.title;
      lineEl.textContent = data.line;
      scoreEl.textContent = data.score;
      preview.classList.add('is-generated');
      root.querySelectorAll('.memory-poster__option').forEach(function (btn) {
        btn.classList.toggle('is-active', btn.getAttribute('data-key') === key);
      });
    }

    root.querySelectorAll('.memory-poster__option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        render(btn.getAttribute('data-key'));
      });
    });

    var genBtn = root.querySelector('.memory-poster__generate');
    if (genBtn) {
      genBtn.addEventListener('click', function () {
        render(selected);
        preview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }

    render('food');
  }

  function init() {
    initInsights();
    initRadar(document.getElementById('chart-heritage-radar'));
    initPoster();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
