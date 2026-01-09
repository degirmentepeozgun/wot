'use strict';
function leaderboards() {
	this.cacheKey = "wot-offline-scores";
	const _self = this;
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
	this.createToken = function() {
		if(!__story?.leaderboards?.calculate || !__story?.mission)
			return false;
		const _payload = {
			deviceId:__account.id,
			missionKey: __story.mission
		};
		webClient.post('missionsession/start', _payload, function(_resp) {
			const _response = _resp.data;
			_self.sessionGuid = _response.sessionGuid;
			_self.secretKey = _response.secretKey;
		}, function(_failResponse) {
			//token oluşturulamadı, internet yok vs. Kullanıcıyı uyar
		});
	}
	this.get = function(_func) {
		if(!_func)
			return;
		webClient.get('leaderboards/get', _payload, function(_resp) {
			_func(_resp.data);
		}, function(_failResponse) {
			//token oluşturulamadı, internet yok vs. Kullanıcıyı uyar
		});
	}
	this.updateScore = function(_key, _score, _warn) {
		if(!this.offlineScores)
			this.offlineScores = JSON.parse(localStorage.get(this.cacheKey) ?? '[]');
		const _off = this.offlineScores.find(x => x.key === _key);
		let _updateCache;
		if(_off) {
			if(_off.score < _score) {
				_off.score = _score;
				_updateCache = 1;
				if(_warn) {
					//yeni rekorun diye uyar
					//warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/icons/tick.png" />&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + getLangData('Feedback Sent') + '</span></div>', null, null, 1);
				}
			}
		}
		else {
			this.offlineScores.push({key:_key, score:_score});
			_updateCache = 1;
		}
		if(_updateCache)
			localStorage.set(this.cacheKey, JSON.stringify(this.offlineScores));
	}
	this.set = function() {
		if(!__story?.leaderboards?.calculate || !__story?.mission || !this.signature || !this.sessionGuid)
			return false;
		const _calc = __story.leaderboards.calculate();
		const _score = _calc.score;
		if(_score <= 0)
			return false;
		const _deviceId = __account.id;
		const _missionKey = __story.mission;
		const _sessionGuid = this.sessionGuid;
		const _secretKey = this.secretKey;
		const payload = `${_sessionGuid}|${_deviceId}|${_missionKey}|${_score}`;
		hmacSha256Hex(_secretKey, payload).then(_signature => {
			const _payload = {
				deviceId:_deviceId,
				missionKey: _missionKey,
				sessionGuid: _sessionGuid,
				name: __acount.name,
				point: _score,
				signature: _signature
			}
			webClient.post('leaderboards/edit', _payload, function(_response) {
				_self.updateScore(_missionKey, _score, _response.newRecord);
			}, function() {	
				//internete bağlanamazsa burası çalışır
				_self.updateScore(_missionKey, _score, 1);
			});
		});
	}
}