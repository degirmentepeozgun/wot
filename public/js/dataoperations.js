function isObject(_obj) {
	return (_obj && (_obj === Object(_obj)));
}
function DataOperations(_apiUrl) {
	this.apiUrl = 'https://webapi.kitap12.com/wot/';
	this.post = async function (_url, _formdata, _func, _failfunc) {
		try {
            const request = new Request(this.apiUrl + _url, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(_formdata)
            });
            const response = await fetch(request);
            if(response.ok) {
                let _json = await response.json();
                if (_json && _json.data && _func)
                    _func(_json);
                else if (_json && _json.statusCode > 700)
                    _func({ statusCode: _json.statusCode });
                else if (_failfunc)
                    _failfunc(_json);
            }
            else {
                let ex = response;
                if ((ex.status === 102 || ex.status === 0) && _func)
                    _func({ statusCode: 102 });
                else if (ex.status === 400 && _func)
                    _func({ statusCode: 400 });
                else if (_failfunc)
                    _failfunc();
			}
		}
		catch {
            if(_failfunc)
                _failfunc();
		}
	}
}
let webClient = new DataOperations();