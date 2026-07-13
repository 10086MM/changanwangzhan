(function () {
  var FONT = '"Noto Serif SC", serif';
  var TEXT = 'rgba(240,235,225,0.78)';
  var TEXT_DIM = 'rgba(240,235,225,0.55)';
  var GRID = 'rgba(240,235,225,0.12)';
  var echartsPool = {};
  var visitorChartInstance = null;

  function disposeEcharts(id) {
    if (echartsPool[id]) {
      echartsPool[id].dispose();
      delete echartsPool[id];
    }
  }

  function getEchart(dom, forceRecreate) {
    if (!dom || typeof echarts === 'undefined') return null;

    var existing = echarts.getInstanceByDom(dom) || echartsPool[dom.id];
    if (existing && !forceRecreate) {
      echartsPool[dom.id] = existing;
      try { existing.resize(); } catch (e) { /* ignore */ }
      return existing;
    }

    disposeEcharts(dom.id);
    if (dom.clientWidth < 8 || dom.clientHeight < 8) {
      return null;
    }

    echartsPool[dom.id] = echarts.init(dom, null, { renderer: 'canvas' });
    return echartsPool[dom.id];
  }

  function ensureChart(dom, initFn) {
    if (!dom) return;
    try {
      if (dom.clientWidth < 8 || dom.clientHeight < 8) {
        dom.dataset.chartReady = '0';
        return;
      }
      initFn(dom);
      dom.dataset.chartReady = '1';
    } catch (err) {
      console.error('[charts]', dom.id || dom, err);
      dom.dataset.chartReady = '0';
    }
  }

  function resizeAllCharts() {
    Object.keys(echartsPool).forEach(function (id) {
      var inst = echartsPool[id];
      if (!inst) return;
      try { inst.resize(); } catch (e) { /* ignore */ }
    });
    if (visitorChartInstance) {
      try { visitorChartInstance.resize(); } catch (e) { /* ignore */ }
    }
  }

  function axisStyle() {
    return {
      axisLine: { lineStyle: { color: GRID } },
      axisTick: { show: false },
      axisLabel: { color: TEXT, fontFamily: FONT, fontSize: 17 },
      nameTextStyle: { color: TEXT_DIM, fontFamily: FONT, fontSize: 15 },
      splitLine: { lineStyle: { color: GRID } }
    };
  }

  function initFestivalPie(dom) {
    var chart = getEchart(dom);
    if (!chart) return;

    var INK = 'rgba(61, 43, 31, 0.88)';
    var INK_SOFT = 'rgba(61, 43, 31, 0.62)';

    chart.setOption({
      backgroundColor: 'transparent',
      textStyle: { fontFamily: FONT, color: INK },
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>{c}%（{d}%）',
        textStyle: { fontFamily: FONT, fontSize: 15 }
      },
      legend: {
        orient: 'horizontal',
        bottom: 0,
        left: 'center',
        textStyle: { color: INK, fontSize: 15, fontFamily: FONT },
        itemWidth: 16,
        itemHeight: 16,
        itemGap: 18
      },
      series: [{
        name: '节庆类型',
        type: 'pie',
        radius: ['38%', '64%'],
        center: ['50%', '44%'],
        padAngle: 2,
        data: [
          { value: 45, name: '十月年（秋收谢神·规模最大）' },
          { value: 30, name: '昂玛突（春耕祭祀）' },
          { value: 25, name: '苦扎扎（田间管护）' }
        ],
        color: ['#6b4a2e', '#d4a84b', '#c4885a'],
        label: {
          show: true,
          position: 'outside',
          formatter: '{c}%',
          color: INK,
          fontSize: 16,
          fontFamily: FONT,
          fontWeight: 600
        },
        labelLine: {
          show: true,
          length: 14,
          length2: 10,
          lineStyle: { color: INK_SOFT, width: 1 }
        },
        itemStyle: {
          borderRadius: 8,
          borderColor: 'rgba(245, 239, 230, 0.9)',
          borderWidth: 2
        },
        emphasis: {
          scale: true,
          scaleSize: 6,
          label: { fontSize: 18 }
        }
      }]
    });
  }

  function initVillageBox(dom) {
    var chart = getEchart(dom);
    if (!chart) return;

    var INK = 'rgba(61, 43, 31, 0.88)';
    var INK_SOFT = 'rgba(61, 43, 31, 0.55)';
    var GRID_LIGHT = 'rgba(61, 43, 31, 0.12)';
    var HINT_IDLE = '点击图例即可查看单项数据';
    var HINT_FOCUS = '再次点击即可返回';

    var xData = ['昂玛突', '苦扎扎', '十月年', '甲寅咪涛'];
    var tableBoxData = [
      [255, 280, 300, 320, 345],
      [50, 65, 85, 105, 120],
      [30, 42, 55, 68, 80],
      [100, 112, 125, 138, 150]
    ];
    var userBoxData = [
      [850, 920, 1000, 1080, 1150],
      [200, 300, 400, 500, 600],
      [150, 210, 275, 330, 400],
      [500, 580, 650, 720, 800]
    ];

    var visibility = { showTables: true, showPeople: true };

    var hintEl = document.getElementById('chart-village-box-hint');
    if (!hintEl) {
      hintEl = document.createElement('p');
      hintEl.id = 'chart-village-box-hint';
      hintEl.className = 'chart-legend-hint';
      var wrap = dom.closest('.chart-block') || dom.parentElement;
      if (wrap) wrap.appendChild(hintEl);
    }

    function updateHint() {
      if (!hintEl) return;
      var focused = !(visibility.showTables && visibility.showPeople);
      hintEl.textContent = focused ? HINT_FOCUS : HINT_IDLE;
    }

    function lightAxis() {
      return {
        axisLine: { show: true, lineStyle: { color: INK_SOFT, width: 1.5 } },
        axisTick: { show: true, lineStyle: { color: INK_SOFT } },
        axisLabel: { color: INK, fontFamily: FONT, fontSize: 15 },
        nameTextStyle: { color: INK_SOFT, fontFamily: FONT, fontSize: 14 },
        splitLine: { show: true, lineStyle: { color: GRID_LIGHT } }
      };
    }

    function buildLegendData() {
      var items = [];
      if (visibility.showTables) {
        items.push({ name: '宴席桌数', icon: 'rect', itemStyle: { color: '#9a7ec8' } });
      }
      if (visibility.showPeople) {
        items.push({ name: '参与人数', icon: 'rect', itemStyle: { color: '#6a9e6a' } });
      }
      return items;
    }

    function applyVisibility() {
      var legendData = buildLegendData();
      var selected = {};
      legendData.forEach(function (item) {
        selected[item.name] = true;
      });
      chart.setOption({
        legend: { data: legendData, selected: selected },
        yAxis: [
          {
            show: visibility.showTables,
            name: visibility.showTables ? '宴席桌数' : ''
          },
          {
            show: visibility.showPeople,
            name: visibility.showPeople ? '参与人数' : '',
            splitLine: { show: false }
          }
        ],
        series: [
          { id: 'village-tables', data: visibility.showTables ? tableBoxData : [] },
          { id: 'village-people', data: visibility.showPeople ? userBoxData : [] }
        ]
      });
      updateHint();
    }

    var axis = lightAxis();

    chart.setOption({
      backgroundColor: 'transparent',
      textStyle: { fontFamily: FONT, color: INK },
      tooltip: {
        trigger: 'item',
        textStyle: { fontFamily: FONT, fontSize: 15, color: INK },
        formatter: function (params) {
          if (!params || !params.value) return '';
          var v = params.value;
          return params.seriesName + ' · ' + params.name +
            '<br/>最小值：' + v[1] +
            '<br/>下四分位：' + v[2] +
            '<br/>中位数：' + v[3] +
            '<br/>上四分位：' + v[4] +
            '<br/>最大值：' + v[5];
        }
      },
      legend: {
        data: buildLegendData(),
        bottom: 28,
        left: 'center',
        textStyle: { color: INK, fontSize: 16, fontFamily: FONT },
        itemWidth: 18,
        itemHeight: 18,
        itemGap: 28,
        selectedMode: true
      },
      grid: { left: '8%', right: '10%', top: '12%', bottom: '22%', containLabel: true },
      xAxis: Object.assign({
        type: 'category',
        data: xData,
        boundaryGap: true
      }, axis),
      yAxis: [
        Object.assign({
          type: 'value',
          name: '宴席桌数',
          min: 0,
          max: 375,
          interval: 75
        }, axis),
        Object.assign({
          type: 'value',
          name: '参与人数',
          min: 0,
          max: 1250,
          interval: 250,
          splitLine: { show: false }
        }, axis)
      ],
      series: [
        {
          id: 'village-tables',
          name: '宴席桌数',
          type: 'boxplot',
          yAxisIndex: 0,
          data: tableBoxData,
          itemStyle: { color: 'rgba(154,126,200,0.35)', borderColor: '#9a7ec8', borderWidth: 2 },
          emphasis: { itemStyle: { borderColor: '#b8a0e0', borderWidth: 2 } }
        },
        {
          id: 'village-people',
          name: '参与人数',
          type: 'boxplot',
          yAxisIndex: 1,
          data: userBoxData,
          itemStyle: { color: 'rgba(106,158,106,0.35)', borderColor: '#6a9e6a', borderWidth: 2 },
          emphasis: { itemStyle: { borderColor: '#8bc48b', borderWidth: 2 } }
        }
      ]
    });

    updateHint();

    chart.off('legendselectchanged');
    chart.on('legendselectchanged', function (params) {
      if (params.name === '宴席桌数') {
        if (visibility.showTables && visibility.showPeople) {
          visibility.showPeople = false;
        } else if (visibility.showTables && !visibility.showPeople) {
          visibility.showPeople = true;
        } else {
          visibility.showTables = true;
          visibility.showPeople = false;
        }
      } else if (params.name === '参与人数') {
        if (visibility.showTables && visibility.showPeople) {
          visibility.showTables = false;
        } else if (!visibility.showTables && visibility.showPeople) {
          visibility.showTables = true;
        } else {
          visibility.showPeople = true;
          visibility.showTables = false;
        }
      }
      applyVisibility();
    });
  }

  function initLuchunBars(dom) {
    var chart = getEchart(dom);
    if (!chart) return;

    var INK = 'rgba(61, 43, 31, 0.88)';
    var INK_SOFT = 'rgba(61, 43, 31, 0.55)';
    var GRID_LIGHT = 'rgba(61, 43, 31, 0.12)';
    var HINT_IDLE = '点击图例即可查看单项数据';
    var HINT_FOCUS = '再次点击即可返回';

    var yearList = ['2025', '2024', '2023', '2004'];
    var tableData = [3265, 3200, 4065, 2041];
    var peopleData = [13, 11.62, 12, 3];
    var TABLE_UNIT = 100;
    var PERSON_UNIT = 1;
    var ICON_SIZE = 18;
    var ICON_GAP = 2;
    var LABEL_RESERVE = 78;
    var TABLE_ICON = 'image/chart-icon-table.svg';
    var PERSON_ICON = 'image/chart-icon-person.svg';
    var TABLE_LEGEND = 'image://image/chart-icon-table.svg';
    var PERSON_LEGEND = 'image://image/chart-icon-person.svg';

    var tableIconCounts = tableData.map(function (v) {
      return Math.floor(v / TABLE_UNIT);
    });
    var peopleIconCounts = peopleData.map(function (v) {
      return Math.floor(v / PERSON_UNIT);
    });
    var maxTableIcons = Math.max.apply(null, tableIconCounts);
    var maxPeopleIcons = Math.max.apply(null, peopleIconCounts);
    var maxIcons = Math.max(maxTableIcons, maxPeopleIcons);

    var hintEl = document.getElementById('chart-luchun-bars-hint');
    if (!hintEl) {
      hintEl = document.createElement('p');
      hintEl.id = 'chart-luchun-bars-hint';
      hintEl.className = 'chart-legend-hint';
      var wrap = dom.closest('.chart-block') || dom.parentElement;
      if (wrap) wrap.appendChild(hintEl);
    }

    function updateHint() {
      if (!hintEl) return;
      var focused = !(luchunVisibility.showTables && luchunVisibility.showPeople);
      hintEl.textContent = focused ? HINT_FOCUS : HINT_IDLE;
    }

    function buildSeriesData(counts, rawValues) {
      return counts.map(function (count, i) {
        return [i, count, rawValues[i]];
      });
    }

    function formatValue(rawValue, isPeople) {
      var rawText = Number(rawValue);
      var num = Number.isInteger(rawText) ? String(rawText) : rawText.toFixed(2);
      return isPeople ? num + ' 万' : num + ' 桌';
    }

    function makePictorialRender(iconUrl, yShift, isPeople) {
      return function (params, api) {
        var iconCount = api.value(1);
        var rawValue = api.value(2);
        var catIdx = api.value(0);
        var origin = api.coord([0, catIdx]);
        var children = [];
        var plotWidth = api.size([maxIcons, 0])[0];
        var usable = Math.max(80, plotWidth - LABEL_RESERVE);
        var step = usable / Math.max(maxIcons, 1);
        var size = Math.max(10, Math.min(ICON_SIZE, step - 1));

        for (var i = 0; i < iconCount; i++) {
          children.push({
            type: 'image',
            style: {
              image: iconUrl,
              x: origin[0] + i * step,
              y: origin[1] - size / 2 + yShift,
              width: size,
              height: size
            }
          });
        }

        children.push({
          type: 'text',
          style: {
            text: formatValue(rawValue, isPeople),
            x: origin[0] + plotWidth - 4,
            y: origin[1] + yShift,
            fill: INK,
            font: '600 14px "Noto Serif SC", serif',
            textAlign: 'right',
            textVerticalAlign: 'middle'
          }
        });

        return { type: 'group', children: children };
      };
    }

    var tableSeriesData = buildSeriesData(tableIconCounts, tableData);
    var peopleSeriesData = buildSeriesData(peopleIconCounts, peopleData);
    var luchunVisibility = { showTables: true, showPeople: true };

    function buildLegendData() {
      var items = [];
      if (luchunVisibility.showTables) {
        items.push({ name: '宴席桌数（桌）', icon: TABLE_LEGEND });
      }
      if (luchunVisibility.showPeople) {
        items.push({ name: '参与人次（万）', icon: PERSON_LEGEND });
      }
      return items;
    }

    function applyLuchunVisibility() {
      var legendData = buildLegendData();
      var selected = {};
      legendData.forEach(function (item) {
        selected[item.name] = true;
      });
      chart.setOption({
        legend: { data: legendData, selected: selected },
        series: [
          { id: 'luchun-table-icons', data: luchunVisibility.showTables ? tableSeriesData : [] },
          { id: 'luchun-people-icons', data: luchunVisibility.showPeople ? peopleSeriesData : [] }
        ]
      });
      updateHint();
    }

    chart.setOption({
      backgroundColor: 'transparent',
      textStyle: { fontFamily: FONT, color: INK },
      tooltip: {
        trigger: 'item',
        textStyle: { fontFamily: FONT, fontSize: 15 },
        formatter: function (params) {
          if (!params.value) return '';
          var raw = params.value[2];
          var unit = params.seriesId === 'luchun-table-icons'
            ? '桌（每图标代表 ' + TABLE_UNIT + ' 桌）'
            : '万人次（每图标代表 ' + PERSON_UNIT + ' 万）';
          return params.seriesName + '<br/>' + yearList[params.value[0]] + '年：' + raw + unit;
        }
      },
      legend: {
        data: buildLegendData(),
        bottom: 8,
        left: 'center',
        textStyle: { color: INK, fontSize: 16, fontFamily: FONT },
        itemWidth: 22,
        itemHeight: 22,
        itemGap: 28
      },
      grid: { left: 12, right: 12, top: 24, bottom: 56, containLabel: true },
      yAxis: {
        type: 'category',
        data: yearList,
        inverse: false,
        axisLine: { show: true, lineStyle: { color: INK_SOFT, width: 1.5 } },
        axisTick: { show: true, lineStyle: { color: INK_SOFT } },
        axisLabel: {
          color: INK,
          fontFamily: FONT,
          fontSize: 16,
          formatter: function (v) { return v + '年'; }
        },
        splitLine: { show: false }
      },
      xAxis: {
        type: 'value',
        min: 0,
        max: maxIcons,
        axisLine: { show: true, lineStyle: { color: INK_SOFT, width: 1.5 } },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: true, lineStyle: { color: GRID_LIGHT, type: 'dashed' } }
      },
      series: [
        {
          id: 'luchun-table-icons',
          name: '宴席桌数（桌）',
          type: 'custom',
          renderItem: makePictorialRender(TABLE_ICON, -12, false),
          encode: { x: 1, y: 0 },
          data: tableSeriesData,
          z: 2
        },
        {
          id: 'luchun-people-icons',
          name: '参与人次（万）',
          type: 'custom',
          renderItem: makePictorialRender(PERSON_ICON, 12, true),
          encode: { x: 1, y: 0 },
          data: peopleSeriesData,
          z: 2
        }
      ]
    });

    updateHint();

    chart.off('legendselectchanged');
    chart.on('legendselectchanged', function (params) {
      if (params.name === '宴席桌数（桌）') {
        if (luchunVisibility.showTables && luchunVisibility.showPeople) {
          luchunVisibility.showPeople = false;
        } else if (luchunVisibility.showTables && !luchunVisibility.showPeople) {
          luchunVisibility.showPeople = true;
        } else {
          luchunVisibility.showTables = true;
          luchunVisibility.showPeople = false;
        }
      } else if (params.name === '参与人次（万）') {
        if (luchunVisibility.showTables && luchunVisibility.showPeople) {
          luchunVisibility.showTables = false;
        } else if (!luchunVisibility.showTables && luchunVisibility.showPeople) {
          luchunVisibility.showTables = true;
        } else {
          luchunVisibility.showPeople = true;
          luchunVisibility.showTables = false;
        }
      }
      applyLuchunVisibility();
    });
  }

  function initRegionDonut(dom) {
    var chart = getEchart(dom);
    if (!chart) return;

    var INK = 'rgba(61, 43, 31, 0.88)';
    var regions = [
      { name: '核心区（红河4县）', value: 45, color: '#e8c96a' },
      { name: '辐射区（普洱/建水）', value: 30, color: '#6a9e6a' },
      { name: '复刻区（景区展演）', value: 25, color: '#5a8ec4' }
    ];

    chart.setOption({
      backgroundColor: 'transparent',
      textStyle: { fontFamily: FONT, color: INK },
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>占比：{c}%（{d}%）',
        textStyle: { fontFamily: FONT, fontSize: 15 }
      },
      legend: {
        orient: 'horizontal',
        bottom: 0,
        left: 'center',
        textStyle: { color: INK, fontSize: 15, fontFamily: FONT },
        itemWidth: 16,
        itemHeight: 16,
        itemGap: 18,
        data: regions.map(function (r) { return r.name; })
      },
      series: [{
        name: '地域分布',
        type: 'pie',
        radius: '62%',
        center: ['50%', '44%'],
        padAngle: 1.5,
        data: regions.map(function (r) {
          return {
            name: r.name,
            value: r.value,
            itemStyle: { color: r.color }
          };
        }),
        label: {
          show: true,
          position: 'inside',
          formatter: '{c}%',
          color: INK,
          fontSize: 18,
          fontFamily: FONT,
          fontWeight: 700
        },
        labelLine: { show: false },
        itemStyle: {
          borderRadius: 4,
          borderColor: 'rgba(245, 239, 230, 0.92)',
          borderWidth: 2
        },
        emphasis: {
          scale: true,
          scaleSize: 6,
          label: { fontSize: 20 }
        }
      }]
    });
  }

  var pointValueLabelsPlugin = {
    id: 'pointValueLabels',
    afterDatasetsDraw: function (chart) {
      if (chart.canvas.id !== 'chart-visitor-line') return;
      var ctx = chart.ctx;
      var dataset = chart.data.datasets[0];
      var meta = chart.getDatasetMeta(0);
      if (!meta || !meta.data) return;
      meta.data.forEach(function (point, i) {
        if (!point || point.skip) return;
        ctx.save();
        ctx.fillStyle = '#4a3c31';
        ctx.font = '600 17px "Noto Serif SC", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        var val = Number(dataset.data[i]);
        var text = Number.isInteger(val) ? String(val) : val.toFixed(2);
        ctx.fillText(text, point.x, point.y - 14);
        ctx.restore();
      });
    }
  };

  // 蓝色折线/填充向左右延展至绘图区边缘；数据点仍由 x.offset 保持不贴边
  var extendedBlueAreaPlugin = {
    id: 'extendedBlueArea',
    beforeDatasetsDraw: function (chart) {
      if (chart.canvas.id !== 'chart-visitor-line') return;
      var meta = chart.getDatasetMeta(0);
      var area = chart.chartArea;
      if (!meta || !meta.data || !meta.data.length || !area) return;

      var pts = meta.data.filter(function (p) { return p && !p.skip; });
      if (pts.length < 2) return;

      var first = pts[0];
      var last = pts[pts.length - 1];
      var ctx = chart.ctx;
      var fill = 'rgba(122, 184, 200, 0.12)';
      var stroke = '#7ab8c8';

      ctx.save();
      // 左侧延伸填充
      ctx.beginPath();
      ctx.moveTo(area.left, first.y);
      ctx.lineTo(first.x, first.y);
      ctx.lineTo(first.x, area.bottom);
      ctx.lineTo(area.left, area.bottom);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      // 右侧延伸填充
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(area.right, last.y);
      ctx.lineTo(area.right, area.bottom);
      ctx.lineTo(last.x, area.bottom);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      // 左右水平折线延伸
      ctx.beginPath();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 2.5;
      ctx.moveTo(area.left, first.y);
      ctx.lineTo(first.x, first.y);
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(area.right, last.y);
      ctx.stroke();
      ctx.restore();
    }
  };

  var avgLineValuePlugin = {
    id: 'avgLineValueLabel',
    afterDatasetsDraw: function (chart) {
      if (chart.canvas.id !== 'chart-visitor-line') return;
      var yScale = chart.scales.y;
      var area = chart.chartArea;
      if (!yScale || !area) return;
      var avg = chart.data.datasets[1] && chart.data.datasets[1].data[0];
      if (avg == null) return;
      var y = yScale.getPixelForValue(avg);
      var ctx = chart.ctx;
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = '#e8a04a';
      ctx.lineWidth = 2;
      ctx.moveTo(area.left, y);
      ctx.lineTo(area.right, y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#e8a04a';
      ctx.font = '600 17px "Noto Serif SC", serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(Number(avg).toFixed(2), area.left + 4, y);
      ctx.restore();
    }
  };

  function drawVisitorLine(canvas) {
    if (typeof Chart === 'undefined') return;
    if (canvas.clientWidth < 8 || canvas.clientHeight < 8) return;

    if (visitorChartInstance) {
      try { visitorChartInstance.resize(); } catch (e) { /* ignore */ }
      return;
    }

    var avg = 12.21;
    var tickFont = { family: FONT, size: 17 };
    var axisColor = 'rgba(61, 52, 40, 0.72)';
    var gridColor = 'rgba(61, 52, 40, 0.12)';

    visitorChartInstance = new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['2023', '2024', '2025'],
        datasets: [
          {
            label: '参与人次（万）',
            data: [12, 11.62, 13],
            borderColor: '#7ab8c8',
            backgroundColor: 'rgba(122, 184, 200, 0.12)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.2,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: '#7ab8c8',
            pointBorderColor: '#7ab8c8',
            order: 1
          },
          {
            label: '平均参与人数（万人次）',
            data: [avg, avg, avg],
            borderColor: '#e8a04a',
            backgroundColor: 'transparent',
            borderDash: [6, 4],
            borderWidth: 2,
            showLine: false,
            pointRadius: 0,
            pointHoverRadius: 0,
            fill: false,
            tension: 0,
            order: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 28, left: 56, right: 32, bottom: 8 } },
        scales: {
          y: {
            min: 10,
            max: 15,
            grid: { color: gridColor },
            border: { display: false },
            ticks: { color: axisColor, font: tickFont, stepSize: 1 },
            title: { display: true, text: '参与人次（万）', color: axisColor, font: tickFont }
          },
          x: {
            offset: true,
            grid: { display: false },
            border: { display: false },
            ticks: { color: axisColor, font: { family: FONT, size: 18 }, padding: 8 }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            align: 'center',
            labels: {
              color: axisColor,
              font: tickFont,
              boxWidth: 32,
              padding: 18,
              filter: function (item) {
                return item.datasetIndex === 1;
              }
            }
          },
          tooltip: {
            filter: function (item) {
              return item.datasetIndex === 0;
            },
            callbacks: {
              label: function (ctx) {
                return '参与人次：' + ctx.raw + ' 万';
              }
            }
          }
        }
      },
      plugins: [extendedBlueAreaPlugin, pointValueLabelsPlugin, avgLineValuePlugin]
    });
  }

  function init() {
    ensureChart(document.getElementById('chart-festival-pie'), initFestivalPie);
    ensureChart(document.getElementById('chart-village-box'), initVillageBox);
    ensureChart(document.getElementById('chart-luchun-bars'), initLuchunBars);
    ensureChart(document.getElementById('chart-visitor-line'), drawVisitorLine);
    ensureChart(document.getElementById('chart-region-donut'), initRegionDonut);
    window.setTimeout(resizeAllCharts, 120);
    window.setTimeout(resizeAllCharts, 480);
  }

  function scheduleInitWhenVisible() {
    var targets = [
      'chart-festival-pie',
      'chart-village-box',
      'chart-luchun-bars',
      'chart-visitor-line',
      'chart-region-donut'
    ];

    init();

    if (typeof IntersectionObserver === 'undefined') return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.dataset.chartReady === '1') {
          resizeAllCharts();
          return;
        }
        init();
      });
    }, { threshold: [0.05, 0.2] });

    targets.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleInitWhenVisible);
  } else {
    scheduleInitWhenVisible();
  }

  var resizeTimer = 0;
  window.addEventListener('resize', function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      resizeAllCharts();
      init();
    }, 180);
  });

  window.HaniCharts = {
    init: init,
    resize: resizeAllCharts
  };
})();
