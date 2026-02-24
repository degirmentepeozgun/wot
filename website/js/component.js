function component(_settings) { // { dataUrl: 'http://asdasdasd.com/', data: 1 }
	this.dataUrl = _settings.dataUrl;
	this.data = _settings.data;
	this.headerTemplate = _settings.headerTemplate ?? '';
	this.itemTemplate = _settings.itemTemplate;
	this.footerTemplate = _settings.footerTemplate ?? '';
	this.seperatorTemplate = _settings.seperatorTemplate ?? '';
	this.emptyTemplate = _settings.emptyTemplate ?? '';
	this.client = _settings.client ?? webClient;
	this.action = _settings.action?.toLowerCase() ?? 'get';
	this.postData = _settings.postData ?? {};
	this.beforeRender = _settings.beforeRender;
	this.beforeDataSet = _settings.beforeDataSet;
	this.before = _settings.before;
	this.after = _settings.after;
	this.appendContent = _settings.appendContent;
	this.mount = _settings.mount;
	this.useCache = _settings.useCache;
	this.failFunc = _settings.error;
	this.loader = _settings.loader;
	this.slide = _settings.slide;
	this.lazy = (_settings.lazy && _settings.dataUrl) ? _settings.lazy : false;
	this.paging = _settings.paging;
	this.renderAnimation = _settings.renderAnimation;
	this.container = document.getElementById(_settings.container);
	
	if (!this.loader?.disabled && this.container)
		this.container.innerHTML = this.headerTemplate + "<div class='component-content flex' style='opacity:.5;width:" + (this.loader?.width ?? '100%') + ";height:100% !important;position:relative;left:0;" + (this.loader?.style ?? '') + "'><img style='max-width:50px;max-height:50px' src='" + _rootPath + "assets/images/loader.gif' /></div>" + this.footerTemplate;
	const _self = this;

	this.renderStart = function () {
		if (_self.before)
			_self.before();
		if (!_self.data && _self.dataUrl) {
			if (_self.action === 'get')
				_self.client.get({
					url: _self.dataUrl, success: function (_data) {
						if (_data?.data && _self.beforeDataSet)
							_data.data = _self.beforeDataSet(_data, _self);
						_self.data = _data;
						_self.renderEnd();
					}, fail: function () {
						if (_self.failFunc)
							_self.failFunc();
						if (_self.emptyTemplate)
							_self.renderEnd();
					}, cache: _self.useCache
				});
			else
				_self.client.post({
					url: _self.dataUrl,
					data: _self.postData,
					success: function (_data) {
						if (_self.beforeDataSet)
							_data.data = _self.beforeDataSet(_data, _self);
						_self.data = _data;
						_self.renderEnd();
					},
					fail: function () {
						if (_self.failFunc)
							_self.failFunc();
						if (_self.emptyTemplate)
							_self.renderEnd();
					}
				});
		}
		else
		
		 _self.renderEnd();
			//  setTimeout(_self.renderEnd, pickRandomNumberF(0.5, 2) * 100);
	}

	this.renderEnd = function () {
		let _d = _self.data?.data;
		_self.totalRecords = _self?.data?.totalRecords ?? _self?.data?.data?.length ?? 0;
		if (_d) {
			if (!Array.isArray(_d))
				_d = [_d];
			else if (_d.length === 0)
				_d = null;
		}
		let _html = '';
		if (!_d) {
			_html = _self.emptyTemplate ?? '';
			_self.innerContent = _html;
			if (_self.container) {
				_self.container.style.setProperty('min-height', '0', 'important');
				_self.container.style.setProperty('height', 'auto', 'important');
			}
		}
		else {
			for (let i = 0; i < _d.length; i++) {
				if (i > 0)
					_html += _self.seperatorTemplate;
				if (_self.itemTemplate)
					_html += _self.renderTemplate(_d[i], i);
			}
			if (_self.beforeRender)
				_html = _self.beforeRender(_html);
			_self.innerContent = _html;
			_html = _self.headerTemplate + _html + _self.renderFooter();
		}
		if (_self.container) {
			if (!_self.appendContent)
				_self.container.innerHTML = _html;
			else
				_self.container.innerHTML += _html;
		}
		else {
			_self.container = document.getElementById(_settings.container);
			if (_self.container)
				_self.container.innerHTML = _html;
		}
			if (_self.after)
				_self.after(_d, _self.totalRecords, _settings);
		
	}

	this.renderFooter = function () {
		if (!_self.footer)
			_self.footer = _self.renderPage() + ((typeof _self.footerTemplate === 'string') ? _self.footerTemplate : _self.footerTemplate(_self));
		return _self.footer;
	}

	this.renderTemplate = function (_data, i) {
		if (_self.mount)
			_data = _self.mount(_data, i);
		if (_data)
			return _self.itemTemplate(_data, i);
		return '';
	}

	this.renderPage = function () {
		if (!_self.paging)
			return '';
		const _query = $.QueryString ?? {};
		const _pageSize = parseInt(_query?.ps ?? 4);
		if (_self.totalRecords <= _pageSize)
			return '';
		const _currentPage = parseInt(_query?.pg ?? 1);
		_query.pg = _currentPage;
		let _totalPages = Math.ceil(_self.totalRecords / _pageSize);
		const _diff = (_currentPage % 5);
		let _firstVisiblePage = _currentPage - _diff + 1;
		if (_firstVisiblePage < 1)
			_firstVisiblePage = 1;
		let _lastVisiblePage = _firstVisiblePage + 4;
		if (_lastVisiblePage > _totalPages)
			_lastVisiblePage = _totalPages;
		const pagingData = {
			totalRecords: _self.totalRecords,
			pageSize: _pageSize,
			query: _query,
			totalPages: _totalPages,
			currentPage: _currentPage,
			hasNext: _lastVisiblePage < _totalPages,
			hasPrev: _firstVisiblePage > 1,
			numbers: []
		};
		for (let i = _firstVisiblePage; i <= _lastVisiblePage; i++)
			pagingData.numbers.push({ no: i, selected: i == _currentPage });
		return getPagerTemplate(pagingData);
	}
	
	if (!this.lazy)
		this.renderStart();
	else {
		this.container.classList.add('turco-component');
		const _scrollElem = $(this.lazy.scrollElement);
		this.load = function () {
			if (_self.container.classList.contains('turco-component') && (_self.container.getBoundingClientRect().top <= window.innerHeight && _self.container.getBoundingClientRect().bottom >= 0)) {
				_self.renderStart();
				_self.container.classList.remove('turco-component');
			}
		}
		_scrollElem[0].addEventListener('scroll', this.load);
	}
}