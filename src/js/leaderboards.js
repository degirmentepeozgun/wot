'use strict';
function leaderboards() {
	this.cacheKey = "wot-offline-scores";
	const _self = this;
	this.offlineData = [
		{ name: 'Mehmet', point: 30000 },
		{ name: 'Ozgun', point: 29100 },
		{ name: 'EgeMan', point: 24300 },
		{ name: 'Buğra', point: 17400 },
		{ name: 'Mur@t', point: 16600 },
		{ name: 'Yiiwiit', point: 10500 },
		{ name: 'MG', point: 9100 },
		{ name: 'Felon', point: 7200 },
		{ name: 'Kan€', point: 7000 }
	]
	this.hmacSha256Hex = async function(secretBase64, message) {
		const keyBytes = Uint8Array.from(
			atob(secretBase64),
			c => c.charCodeAt(0)
		);

		const key = await crypto.subtle.importKey(
			"raw",
			keyBytes,
			{ name: "HMAC", hash: "SHA-256" },
			false,
			["sign"]
		);

		const sig = await crypto.subtle.sign(
			"HMAC",
			key,
			new TextEncoder().encode(message)
		);

		return [...new Uint8Array(sig)]
			.map(b => b.toString(16).padStart(2, "0"))
			.join("");
	}
	this.getData = function() {
		const _cachedData = JSON.parse(localStorage.getItem(this.cacheKey) ?? '{}');
		if(!_cachedData.name){
			const _x = { name: __account.id, offlineScores: [] };
			localStorage.setItem(this.cacheKey, JSON.stringify(_x));
			return _x;
		}
		__account.id = _cachedData.name;
		return _cachedData;
	}
	this.createToken = function() {
		if(!__story?.mission)
			return false;
		const _payload = {
			deviceId: this.data.name,
			missionKey: __story.mission
		};
		this.sessionGuid = '1';
		this.secretKey = '2';
		return;

		webClient.post('missionsession/start', _payload, function(_resp) {
			const _response = _resp.data;
			_self.sessionGuid = _response.sessionGuid;
			_self.secretKey = _response.secretKey;
		}, function(_failResponse) {
			PlaySound({key:'nointernet',volume:1});
			warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/ui/menu-icons/internet.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('No Internet') + '</span></div>', null, null, 1);
			//token oluşturulamadı, internet yok vs. Kullanıcıyı uyar
		});
	}
	this.get = function(_func) {
		if(!_func)
			return;
		if(!this.data?.name)
		{
			_func([]);
			return;
		}
		const _respData = [...this.offlineData];
		if(_respData?.length > 10)
			_respData.splice(9,1);
		const _me = _respData.find(x => x.id === this.data.name);
		if(_me){
			_me.me = 1;
			_me.point = __story.point;
		}
		else
			_respData.push({id:this.data.name, point:__story.point, me:1});
		_respData.sort((a, b) => b.point - a.point);
		_func(_respData);
		return;

		webClient.get('leaderboards/get?deviceid=' + this.data.name + '&missionkey=' + __story.mission, function(_resp) {
			if(_resp.data?.length > 10)
				_resp.data.splice(9,1);
			const _me = _resp.data.find(x => x.id === _self.data.name);
			if(_me)
				_me.me = 1;
			_func(_resp.data);
		}, function(_failResponse) {
			PlaySound({key:'nointernet',volume:1});
			warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/ui/menu-icons/internet.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('No Internet') + '</span></div>', null, null, 1);
			//token oluşturulamadı, internet yok vs. Kullanıcıyı uyar
		});
	}
	this.updateScore = function(_key, _score, _warn, _func) {
		const _off = this.data.offlineScores.find(x => x.key === _key);
		let _updateCache;
		if(_off) {
			if(_off.score < _score) {
				_off.score = _score;
				_updateCache = 1;
				if(_warn) {
					//yeni rekorun diye uyar
					PlaySound({key:'newrecord',volume:1});
					warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/ui/menu-icons/punch-blast.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('New Record') + '</span></div>', null, null, 1);
				}
			}
		}
		else {
			this.data.offlineScores.push({key:_key, score:_score});
			_updateCache = 1;
		}
		if(_updateCache)
			localStorage.setItem(this.cacheKey, JSON.stringify(this.data));
		_func();
	}
	this.set = function(_func) {
		if(!__storyScene?.leaderBoards?.calculate || !__story?.mission || !this.secretKey || !this.sessionGuid)
			return false;
		const _score = __story.point;
		if(_score <= 0)
			return false;
		
		const _missionKey = __story.mission;
		setTimeout(() => {
			_self.updateScore(_missionKey, _score, 1, _func);
		}, 1000);

		return true;


		const _deviceId = this.data.name;
		//const _missionKey = __story.mission;
		const _sessionGuid = this.sessionGuid;
		const _secretKey = this.secretKey;
		const payload = `${_sessionGuid}|${_deviceId}|${_missionKey}|${_score}`;
		this.hmacSha256Hex(_secretKey, payload).then(_signature => {
			const _payload = {
				deviceId:_deviceId,
				missionKey: _missionKey,
				sessionGuid: _sessionGuid,
				name: _self.data.name,
				point: _score,
				signature: _signature
			}
			webClient.post('leaderboards/edit', _payload, function(_resp) {
				_self.updateScore(_missionKey, _score, _resp.data?.isNewRecord, _func);
			}, function() {	
				//internete bağlanamazsa burası çalışır
				PlaySound({key:'nointernet',volume:1});
				warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/ui/menu-icons/internet.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('No Internet') + '</span></div>', null, null, 1);
				_self.updateScore(_missionKey, _score, 1, _func);
			});
		});
		return true;
	}
	this.data = _self.getData();
}