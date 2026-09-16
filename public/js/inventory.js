'use strict';
const __properties = [
	{ order:1, base: "maxHP", key: "hp", titles: { en: "Health", tr: "Sağlık" }, group: 'def'},
	{ order:2, key: "def", titles: { en: "Defense", tr: "Defans" }, group: 'def' },
	{ order:3, key: "crit-resist-rate", titles: { en: "Critical Rate Resist", tr: "Kritik Oran Direnci" }, group: 'def' },
	{ order:4, key: "crit-dmg-resist-rate", titles: { en: "Critical Damage Resist", tr: "Kritik Hasar Direnci" }, group: 'def' },
	{ order:5, key: "fire-resist-rate", titles: { en: "Fire Resist", tr: "Alev Direnci" }, group: 'def', color: '#ff6c00' },
	{ order:6, key: "ice-resist-rate", titles: { en: "Ice Resist", tr: "Buz Direnci" }, group: 'def', color: '#00c4ff' },
	{ order:7, key: "lightning-resist-rate", titles: { en: "Lightning Resist", tr: "Işık Direnci" }, group: 'def', color: '#FFEA00' },
	{ order:8, key: "toxic-resist-rate", titles: { en: "Toxic Resist", tr: "Zehir Direnci" }, group: 'def', color: '#AAFF00' },
	{ order:9,key: "phsycal-resist-rate", titles: { en: "Physical Resist", tr: "Fiziksel Saldırı Direnci" }, group: 'def', color: '#FFFFFF' },
	{ order:10,key: "shadow-resist-rate", titles: { en: "Shadow Resist", tr: "Gölge Saldırı Direnci" }, group: 'def', color: '#DA70D6' },

	{ order:1, key:"atk", titles: { en: "Attack", tr: "Atak" }, group: 'atk' },
	{ order:2, key: "pierce-rate", titles:{ en: "Defense Pierce", tr: "Defans Delme" }, group: 'atk' },
	{ order:3, base: "critRate", key: "crit-rate", titles: { en: "Critical Rate", tr: "Kritik Oranı" }, group: 'atk' },
	{ order:4, key: "crit-dmg-rate", titles: { en: "Critical Damage", tr: "Kritik Hasar" }, group: 'atk' },
	{ order:5, key: "fire-dmg", titles: { en: "Fire Damage", tr: "Alev Hasarı" }, group: 'atk', color: '#ff6c00' },
	{ order:6, key: "ice-dmg", titles: { en: "Ice Damage", tr: "Buz Hasarı" }, group: 'atk', color: '#00c4ff' },
	{ order:7, key: "lightning-dmg", titles: { en: "Lightning Damage", tr: "Işık Hasarı" }, group: 'atk', color: '#FFEA00' },
	{ order:8, key: "toxic-dmg", titles: { en: "Toxic Damage", tr: "Zehir Hasarı" }, group: 'atk', color: '#AAFF00' },
	{ order:9,key: "phsycal-dmg", titles: { en: "Physical Damage", tr: "Fiziksel Hasar" }, group: 'atk', color: '#FFFFFF' },
	{ order:10,key: "shadow-dmg", titles: { en: "Shadow Damage", tr: "Gölge Hasarı" }, group: 'atk', color: '#DA70D6' },
	{ order:11, key: "steal-rate", titles: { en: "Steal Rate",  tr: "Sağlık Çalma Oranı" }, group: 'atk' },

	{ order:1, key: "luck-rate", titles: { en: "Item Find Luck", tr: "Ekipman Bulma Şansı" } },
	{ order:2, key: "gold-gain-rate", titles: { en: "Gold Find Luck", tr: "Altın Bulma Şansı" } }
];
const itemTypes = [
	{ key: 'helmet', type: 'def', baseProps: ['maxHP'] },
	{ key: 'gloves', type: 'atk', baseProps: ['armor'] },
	{ key: 'chest', type: 'def', baseProps: ['maxHP'] },
	{ key: 'bracers', type: 'atk', baseProps: ['armor'] },
	{ key: 'boots', type: 'def', baseProps: ['maxHP'] },
	{ key: 'ring', type: 'atk', baseProps: ['armor'] },
	{ key: 'leggings', type: 'def', baseProps: ['maxHP'] },
	{ key: 'necklace', type: 'atk', baseProps: ['armor'] },
	{ key: 'belt', type: 'def', baseProps: ['armor'] },
	{ key: 'weapon', type: 'atk', baseProps: ['minDmg', 'maxDmg'] }
];
function refreshInventory() {
    renderInventory(1);
    closeInventoryQuestionModal();
}
let _sortDirection;
function sortItems() {
    playClick();
    _sortDirection = _sortDirection ? 0 : 1;
    refreshInventory();
}
function askAutoWearItems() {
    askSomething('Auto wear best items', "autoWearItems()", 'modal_2x1');
}
function autoWearItems() {
    const _gears = getItems();
    const _wearedItems = _gears.filter(x => x.weared === mainCharacter.class);
    _wearedItems.forEach(x => x.gs = getPowerOfItem(x.id));
    let _hasChange;
    const _oldPower = getTotalPower().total;
    for(let _itemType of itemTypes) {
        const _rest = _gears.filter(x => !x.weared && x.type === _itemType.key && (!x.for || x.for === mainCharacter.class));
        const _current = _wearedItems?.find(x => x.type === _itemType.key);
        let _power = _current?.gs ?? 0, _i;
        if(_rest?.[0]) {
            _rest.forEach(x => x.gs = getPowerOfItem(x.id));
            for(let _item of _rest) {
                if(_item.gs > _power) {
                    _i = _item;
                    _power = _item.gs;
                }
            }
        }
        if(_i) {
            if(_current)
                delete _current.weared;
            _i.weared = mainCharacter.class;
            _hasChange = 1;
        }
    }
    refreshInventory();
    if(_hasChange) {
        PlaySound({ key: 'wear', volume: .3 });
        const _newPower = getTotalPower().total;
        changePower(_oldPower, _newPower);
    }
    else {
        playClick();
        warn('<span>' + getLangData('Nothing better to wear yet') + '</span>', 'warn');
    }
}
function getAvarageStatsScreenUI(_power) {
    return `
        <div class="flex char-avg-stats"><img src="./images/ui/game/sword.png" /><span class="char-avg-stats-value">${_power.atk.formatWithDots()}</span></div>
        <div class="flex char-avg-stats"><img src="./images/ui/game/shield.png" /><span class="char-avg-stats-value">${_power.def.formatWithDots()}</span></div>
    `;
}
function renderInventory(_noAnimation, _activeTab) {
    if(!_activeTab)
        _activeTab = 1;
    const _gears = getItems();
    const _power = getTotalPower();
    const _wearedItems = _gears.filter(x => x.weared === mainCharacter.class);
    let _content;
    switch(_activeTab) {
        case 2:
            _content = getGemTabContent();
            break;
        case 3:
            _content = getMiscTabContent();
            break;
        default:
            _content = getInventoryTabContent();
            break;
    }
    let _html = `
        <div class="menu-ui-left${_noAnimation ? '' : ' fade-me'}" id="character-screen">
            <div class="full flex menu-ui-left-content">
                <div id="avarage-stats-screen" class="flex inventory-character-screen-bottom">`
                 + getAvarageStatsScreenUI(_power) +  
               `</div>
                <div class="main-level-count-wrapper flex flex-jc-start wot-title">${getLangData('Lvl')}&nbsp;<span class="wot-title" id="main-level-count">${mainCharacter.level}</span><div lang="${getLang()}" id="main-class" class="w-100 flex flex-jc-start"><img class="title-badge" src="./images/ui/game/title-badge.png" />${getLangData(mainCharacter.class)}<img class="title-badge-r" src="./images/ui/game/title-badge-r.png" /></div></div>
                <div class="game-menu-button btn-info flex animate-me" onexactclick="openCharacterInfoModal()"><img class="info-icon" src="./images/ui/game/info.png" /></div>
                <div style="cursor:pointer" class="item item-helmet">${getItemIcon(_wearedItems.find(x => x.type === 'helmet'))}</div>
                <div style="cursor:pointer" class="item item-necklace"> ${getItemIcon(_wearedItems.find(x => x.type === 'necklace'))}</div>
                <div style="cursor:pointer" class="item item-belt"> ${getItemIcon(_wearedItems.find(x => x.type === 'belt'))}</div>
                <div style="cursor:pointer" class="item item-ring"> ${getItemIcon(_wearedItems.find(x => x.type === 'ring'))}</div>
                <div style="cursor:pointer" class="item item-bracers"> ${getItemIcon(_wearedItems.find(x => x.type === 'bracers'))}</div>
                <div style="cursor:pointer" class="item item-chest"> ${getItemIcon(_wearedItems.find(x => x.type === 'chest'))}</div>
                <div style="cursor:pointer" class="item item-leggings"> ${getItemIcon(_wearedItems.find(x => x.type === 'leggings'))}</div>
                <div style="cursor:pointer" class="item item-boots"> ${getItemIcon(_wearedItems.find(x => x.type === 'boots'))}</div>
                <div style="cursor:pointer" class="item item-gloves"> ${getItemIcon(_wearedItems.find(x => x.type === 'gloves'))}</div>
                <div style="cursor:pointer" class="item item-weapon"> ${getItemIcon(_wearedItems.find(x => x.type === 'weapon'))}</div>
                <div onexactclick="howToGetStronger()" class="flex power-bg">
<div style="text-shadow:0 0 .5vh #000;font-weight:600;height:100%;position:relative" class="flex">
<img class="power-icon" src="./images/ui/game/power-icon.png" />
<span class="character-total-power wot-title animate-me">${_power.total.formatWithDots()}</span></div></div>
</div></div><div class="flex menu-ui-right${_noAnimation ? '' : ' fade-me'}" id="inventory-list">
    <div class="flex inventory-tabs-container">
    <div lang="${getLang()}" onexactclick="switchInventoryTab(this, 1)" class="flex wot-title inventory-tab${_activeTab === 1 ? ' selected' : ''}">${getLangData('Item')}</div>
    <div lang="${getLang()}" onexactclick="switchInventoryTab(this, 2)" class="flex wot-title inventory-tab${_activeTab === 2 ? ' selected' : ''}">${getLangData('Gem')}</div>
    <div lang="${getLang()}" onexactclick="switchInventoryTab(this, 3)" class="flex wot-title inventory-tab${_activeTab === 3 ? ' selected' : ''}">${getLangData('Misc')}</div>
</div><div class="inventory-inner"><div id="inventory-slots" class="full flex">`;
    _html += _content + `</div></div><div class="flex flex-jc-end inventory-footer">
    <div class="w-100 flex flex-jc-start inventory-action-btns">
        <div class="game-menu-button flex animate-me${__account.slots >= 200 ? ' disabled' : ''}" onexactclick="askAddSlot()"><img src="./images/ui/game/add.png" /></div>
        <div class="game-menu-button flex animate-me" onexactclick="sortItems()"><img src="./images/ui/game/sort.png" /></div>
        <div class="game-menu-button flex animate-me" onexactclick="askFilterSellItems()"><img src="./images/ui/game/sell.png" /></div>
        <div class="game-menu-button flex animate-me" onexactclick="askAutoWearItems()"><img src="./images/ui/game/wear.png" /></div>
    </div>
    <div style="position:relative;height:80%" class="flex d-none"><img style="height:60%" src="./images/icons/coin.png" /><div style="font-size:2.6vh !important;font-weight:600;padding:0 1.6vh 0 .8vh;text-shadow:0 0 #000;color:#F7f7f7cc !important" class="d-none account-gold-value">${__account.gold.formatWithDots()}</div></div>
    </div>
        </div>`;
    updateMenuBottom(0);
    const _container = selectMenuContainer(0);
    _container.innerHTML = _html;
}
function calculateTotalCostIfGroupSell() {
    const _choices = document.querySelectorAll('.inventory-question .sell-choice.selected');
    if(!_choices?.[0])
        return 0;
    const _grades = [];
    for(let _c of _choices)
        _grades.push(parseInt(_c.getAttribute('data-key')));
    const _items = getItems();
    var _total = 0;
    for(let _item of _items.filter(x => !x.weared))
        if(_grades.indexOf(_item.grade) !== -1)
            _total += getItemSellCost(_item.id);
    return _total;
}
function getItemSellCost(_id) {
    const _uc = getItemUpdateCost(_id, 1);
    let _sc = _uc / 10;
    var _items = getItems();
    var _item = _items.find(x => x.id === _id);
    if(_item.sockets)
        for(let _s of _item.sockets)
            if(_s.grade)
                _sc += (_s.grade * 100);
    if(_sc <= 0)
        return 10;
    return _sc;
}
function sellItems() {
    const _choices = document.querySelectorAll('.inventory-question .sell-choice.selected');
    if(!_choices?.[0]) {
        playClick();
        return;
    }
    const _grades = [];
    for(let _c of _choices)
        _grades.push(parseInt(_c.getAttribute('data-key')));
    const _items = getItems();
    for(let _grade of _grades)
        for(let _item of _items.filter(x => !x.weared && x.grade === _grade))
            sellItem(_item.id, 1, 1);
    closeInventoryQuestionModal();
    checkUpdateAvailable2(1);
    //PlaySound({ key: 'sell' });
}
function selectFilterGrade(_elem) {
    if(hasClass(_elem, 'selected')){
        let _dk = _elem.getAttribute('data-key');
        if(_dk === '0') {
            const _choices = document.querySelectorAll('.inventory-question .sell-choice');
            for(let _c of _choices)
                removeClass(_c, 'selected');
        }
        else {
            const _c = document.querySelector(".inventory-question .sell-choice[data-key='0']");
            removeClass(_c, 'selected');
        }
        removeClass(_elem, 'selected');
    }
    else{
        let _dk = _elem.getAttribute('data-key');
        if(_dk === '0') {
            const _choices = document.querySelectorAll('.inventory-question .sell-choice');
            for(let _c of _choices)
                addClass(_c, 'selected');
        }
        addClass(_elem, 'selected');
    }
    document.getElementById('total-group-sell-cost').innerText = calculateTotalCostIfGroupSell();
}
function askFilterSellItems() {
    const _grades = [];
    for(let _i = 0; _i <= 3; _i++)
        _grades.push(_i);
    let _html = '';
    for(let _grade of _grades)
        _html += `<div onexactclick="selectFilterGrade(this)" class="flex sell-choice flex-jc-start animate-me" data-key="${_grade}"><div class="sell-choice-left flex animate-me"></div><div class="sell-choice-right wot-subtitle flex grade${_grade}">${getLangData(_grade > 0 ? 'Grade' : 'All') + (_grade > 0 ? ' ' + _grade : '')}</div></div>`;
    playClick();
    let _modal = `<div data-singleton-key="modal_square" class="full fade-me flex inventory-question inventory-question-sell-items">
        <div class="inventory-modal flex" style="flex-direction:column">
            <div class="flex question-modal-title-wrapper">
                <div class="flex w-100 wot-title">${getLangData('Group sell items')}</div>
                <div class="flex w-100 wot-subtitle">${getLangData('Total')}: <span id="total-group-sell-cost">0</span> <img style="height:2.6vh" src="./images/icons/coin.png" /></div>
            </div>
            <div class="flex w-100 question-modal-middle" style="flex:1">`
                + _html +
            `</div>
            <div class="w-100 flex flex-ai-end new-game-menu-buttons">
                <div class="new-game-menu-button flex animate-me" onexactclick="closeInventoryQuestionModal()">${getLangData('SKIP')}</div>
                <div class="new-game-menu-button flex animate-me" onexactclick="sellItems()">${getLangData('SELL')}</div>
            </div>
        </div>
    </div>`;
    const _div = document.createElement('div');
    _div.innerHTML = _modal;
    document.querySelector('#menu-ui').appendChild(_div.firstChild);
}
function getMiscItemIcon(_item) {
    if(!_item)
        return '';
    let _level = '';
    if(_item.count > 1)
        _level = '<span style="bottom:-.8vh;right:-.8vh;position:absolute;display:inline-block;padding:0 .8vh;color:#f7f7f7cc !important;font-size:2vh !important;background:#262626">' + _item.count + '</span>';
    return '<span class="item-in-slot full' + (_item.grade !== undefined ? ' grade' + _item.grade + '-item' : '') + '" style="display:inline-block;position:relative"><img style="background:#010101" onexactclick="openMiscItemInfoModal(\'' + _item.type + '\', ' + _item.grade + ')" class="item-img" src="./images/icons/' + _item.type + '.png"/>' + _level +
    (_item.new ? '<div style="height:2vh;width:2vh;top:-.5vh;right:-.5vh;position:absolute;background:darkred;border-radius:100%"></div>' : '') + '</span>';
}
function getMailAttachmentIcon(_item) {
    if(!_item)
        return '';
    let _level = '';
    if(_item.count > 1)
        _level = '<span style="bottom:-.8vh;right:-.8vh;position:absolute;display:inline-block;padding:0 .8vh;color:#f7f7f7cc !important;font-size:2vh !important;background:#262626">' + _item.count + '</span>';
    return '<span class="item-in-slot full' + (_item.grade !== undefined ? ' grade' + _item.grade + '-item' : '') + '" style="display:inline-block;position:relative"><img style="background:#010101" onexactclick="openMiscItemInfoModal(\'' + _item.type + '\', ' + _item.grade + ')" class="item-img" src="' + getRewardIcon(_item.grade??1, _item.key, _item.type).src + '"/>' + _level + '</span>';
}
function getGemItemIcon(_item, _c) {
    if(!_item)
        return '';
    let _level = '';
    if((_c ?? _item.count) > 1)
        _level = '<span style="bottom:-.8vh;right:-.8vh;position:absolute;display:inline-block;padding:0 .8vh;color:#f7f7f7cc !important;font-size:2vh !important;background:#262626">' + ((_c ?? _item.count) > 99 ? '99+' : (_c ?? _item.count)) + '</span>';
    return '<span class="item-in-slot full' + (_item.grade !== undefined ? ' grade' + _item.grade + '-item' : '') + '" style="display:inline-block;position:relative"><img style="background:#010101" data-gem-key="' + _item.key + '" data-gem-grade="' + _item.grade + '" onexactclick="openGemItemInfoModal(\'' + _item.key + '\', ' + _item.grade + ')" class="item-img" src="./images/gems/' + _item.key + _item.grade + '.png"/>' + _level +
    (_item.new ? '<div style="height:2vh;width:2vh;top:-.5vh;right:-.5vh;position:absolute;background:darkred;border-radius:100%"></div>' : '') + '</span>';
}
function getItemIcon(_item, _noBadge) {
    if(!_item)
        return '';
    let _level = '';
    let _diffIconHtml = '';
    if(!_item.weared && !_noBadge) {
        const _diff = getPowerDiffAgainstWearedOne(_item.id);
        if(_diff < 0)
            _diffIconHtml = '<img class="d-s power-diff-icon" src="./images/icons/power-down.png" />';
        else if(_diff > 0)
            _diffIconHtml = '<img class="d-s power-diff-icon" src="./images/icons/power-up.png" />';
    }
    // if(!_item.level || _item.level <= 1)
    //     _item.level = getRandomValue(1, 20);
    if(_item.level > 1){
        var _itemProps = _equips[_item.type]['grade' + _item.grade];
        _level = '<span class="item-level-badge item-stat-value-max' + (_item.level >= _itemProps.maxLevel ? '1' : '2') + '">' + _item.level + '</span>';
    }
    return _diffIconHtml + '<span class="item-in-slot full grade' + _item.grade + '-item" style="display:inline-block;position:relative" onexactclick="openItemInfoModal(' + _item.id + ')"><img style="background:#010101" class="item-img" src="./images/items/icons/' + (_item.for ? (_item.for + '/') : '') + _item.type + _item.grade + '.png"/>' + _level +
    (_item.new ? '<div class="inventory-item-new-badge"></div>' : '') + '</span>';
}
function getMinPropValue(_key, _item) {
    const _ep = _equips[_item.type]['grade' + _item.grade].props.find(x => x.key === _key); 
    return _ep.min;
}
function getMaxPropValue(_key, _item) {
    const _ep = _equips[_item.type]['grade' + _item.grade].props.find(x => x.key === _key); 
    return _ep.max;
}
function getRandomProps(_type, _grade, _level) {
    //var _propType = itemTypes.find(x => x.key === _type).type;
    //var _props = properties.filter(x => x.group === _propType || x.addTo?.indexOf(_type) >= 0);
    var _props = _equips[_type]['grade' + _grade].props;
    const _chosenPropKeys = [], _p = [];
    for(let _i = _grade < 1 ? 0 : 1; _i <= _grade;) {
        var _prop = _props[getRandomValue2(0, _props.length - 1)];
        if(_chosenPropKeys.indexOf(_prop.key) === -1) {
            _chosenPropKeys.push(_prop.key);
            //var _val = getRandomValue((1 + _grade) + (_grade * 20), (1 + _grade) + (_grade * 20) + ((_grade + 1) * 20));
            var _val = _prop.key.endsWith('-rate') ? parseFloat((getRandomValue2(_prop.min * 100, _prop.max * 100) / 100).toFixed(2)) :
            getRandomValue2(_prop.min, _prop.max);
            _p.push({key: _prop.key, value: _val });
            _i++;
        }
    }
    if(_level > 1) {
        var _itemProps = _equips[_type]['grade' + _grade];
        for(var _i = 1 ; _i < _level; _i++)
            for(let _prop of _p) {
                const _ep = _itemProps.props.find(x => x.key === _prop.key); 
                _prop.value += _ep.upgrade;
            }
    }
    return _p;
}
function pushItemIntoInventory(_item, _fromMail) {
    var _items = getItems();
    if(__account.slots <= _items.filter(x => !x.weared).length) {
        warn('<span>' + getLangData('No room in inventory') + '</span>', 'warn');
        if(!_fromMail) {
            //maile gönder
            _client.pushItemIntoMail(_item);
            checkUpdateAvailable2(4);
        }
        return false;
    }
    if(!__storyPlaying || _client.quickPlay) {
        _item.new = 1;
        _items.push(_item);
        PlaySound({ key: 'item' });
    }
    return true;
}
function getSpecificItem(_type, _grade, _class) {
    return getRandomItem(_grade, _type, _class);
}
function getRandomItem(_grade, _type, _class) {
    var _t = _type ??  itemTypes[getRandomValue2(0, itemTypes.length - 1)].key;
    // const _props = itemTypes.find(x => x.key === _t).baseProps;
    // const _baseProps = [];
    // for(let _p of _props){
    //     const _baseProp = __basePropValues[_p]['g' + _grade];
    //     const _min = MathFloor(_baseProp * .8);
    //     const _max = MathCeil(_baseProp * 1.2);
    //     _baseProps.push({ key: _p, value: getRandomValue(_min, _max)});
    // }

    const _item = { id: getRandomValue2(1000000000, 9999999999),
        grade: _grade,
        type: _t,
        for: _t === 'weapon' ? (_class ?? mainCharacter.class) : undefined,
        level: 1,
        //baseProps: _baseProps,
        props: getRandomProps(_t, _grade)
    };
    if(_item.grade > 1) {
        const _sockets = [];
        for(let _g = 2; _g <= _item.grade; _g++) {
            if(getRandomValue2(1, 5) === 1)
                _sockets.push({});
        }
        if(_sockets?.[0])
            _item.sockets = _sockets;
    }
    return _item;
}
function getRandomItems(_grade, _class) {
    const _items = [];
    for(let _i = _grade ?? 1; _i <= (_grade ?? 3); _i++)
        for(let _itemType of itemTypes) {
            _items.push(getSpecificItem(_itemType.key, _i, _class));
            if(_itemType.key === 'weapon')
                _items[_items.length - 1].for = _class ?? mainCharacter.class;
        }
    return _items;
}
var _testItems;
function getItems(_char) {
    // if(!__account.inventory?.[0])
    //     __account.inventory = getRandomItems();
    return (_char ?? __account).inventory ?? [];
}
function getPowerOfItems() {
    var _items = getItems().filter(x => x.weared === mainCharacter.class);
    let _power = 0;
    for(let _item of _items)
        _power += getPowerOfItem(_item.id);
    return _power;
}
function getTotalPower(_char) {
    const _weared = getItems(_char)?.filter(x => x.weared === (_char ?? mainCharacter).class) ?? [];
    // const _summary = {
    //     atk: 0, //((mainCharacter.baseProps.minDmg + mainCharacter.baseProps.maxDmg) / 2) * mainCharacter.level,
    //     def: 0, //mainCharacter.baseProps.armor * mainCharacter.level,
    //     hp: mainCharacter.baseProps.maxHP * mainCharacter.level
    // };
    const _rates = {
        atk: 0,//mainCharacter.baseProps.critRate,
        def: 0,
        hp: 0
    };
    // for(let _w of _weared) {
    //     if(_w.type === 'weapon')
    //         _summary.atk += ((_w.baseProps[0].value + _w.baseProps[1].value) /2);
    //     else if(_w.baseProps[0].key === 'armor')
    //         _summary.def += parseFloat(_w.baseProps[0].value);
    //     else
    //         _summary.hp += parseFloat(_w.baseProps[0].value);
    // }
    for(let _w of _weared){
        for(let _prop of _w.props){
            const _p = __properties.find(x => x.key === _prop.key);
            if(!_p.group)
                continue;
            const _ep = _equips[_w.type]['grade' + _w.grade].props.find(x => x.key === _prop.key); 
            _rates[_p.group] += parseFloat(_prop.value * _ep.power);
        }
        if(_w.sockets)
             for(let _socket of _w.sockets){
                if(!_socket.grade)
                    continue;
                const _props = __gems.find(x => x.key === _socket.key).grades.find(x => x.grade === _socket.grade).props;
                const _prop = _props.find(x => x.for.indexOf(_w.type) !== -1);
                const _p = __properties.find(x => x.key === _prop.key);
                if(!_p.group)
                    continue; 
                _rates[_p.group] += parseFloat(_prop.value);
            }
    }
    const _atk = MathRound(_rates.atk); // MathRound(_summary.atk + (_summary.atk * _rates.atk));
    const _def = MathRound(_rates.def); // MathRound(_summary.def + (_summary.def * _rates.def));
    //const _hp = MathRound(_summary.hp + (_summary.hp * _rates.hp));
    return { total: parseInt(_atk + _def), hp: 0, def: _def, atk: _atk };
}
function getPowerOfItem(_id) {
    if(!_id)
        return 0;
    var _items = getItems();
    var _item = _items.find(x => x.id === _id);
    let _power = 0;
    // for(let _prop of _item?.baseProps ?? [])
    //     _power += parseFloat(_prop.value);
    for(let _prop of _item?.props ?? []) {
        const _p = _equips[_item.type]['grade' + _item.grade].props.find(x => x.key === _prop.key); //properties.find(x => x.key === _prop.key);
        _power +=  (_prop.value * _p.power); //(_p.key.endsWith('-rate') ? 100 : 1) * parseFloat(_prop.value);
    }
    if(_item.sockets)
        for(let _socket of _item.sockets){
            if(!_socket.grade)
                continue;
            const _props = __gems.find(x => x.key === _socket.key).grades.find(x => x.grade === _socket.grade).props;
            const _prop = _props.find(x => x.for.indexOf(_item.type) !== -1);
            const _p = __properties.find(x => x.key === _prop.key);
            if(!_p.group)
                continue; 
            _power += _prop.value;
        }
    return _power;
}
function getPowerOfProps(_props, _type, _grade) {
    let _power = 0;
    for(let _prop of _props ?? []) {
        const _p = _equips[_type]['grade' + _grade].props.find(x => x.key === _prop.key); //properties.find(x => x.key === _prop.key);
        _power +=  (_prop.value * _p.power); //(_p.key.endsWith('-rate') ? 100 : 1) * parseFloat(_prop.value);
    }
    return MathRound(_power);
}
function getItemUpdateCost(_id, _force) {
    var _items = getItems();
    var _item = _items.find(x => x.id === _id);
    var _equip = _equips[_item.type]['grade' + _item.grade];
    if(_item.level >= _equip.maxLevel && !_force)
        return 0;
    return (_item.level ?? 1) * 1000 * (_item.grade);
}
function allPowerDiffOrItemUpgrades() {
    var _arr = [];
    var _items = getItems() ?? [];
    for(const _item of _items) {
        let _push = false;
        if(_item.level < mainCharacter.level && _item.weared === mainCharacter.class) {
            const _uc = getItemUpdateCost(_item.id);
            if(_uc > 0 && _uc <= __account.gold)
                _push = true;
        }
        if(!_push && !_item.weared) {
            if(getPowerDiffAgainstWearedOne(_item.id) > 0)
                _push = true;
        }
        if(_push)
            _arr.push({ type: 'controls', key: _item.id });
    }
    return _arr;
}
function getPowerDiffAgainstWearedOne(_id) {
    var _items = getItems();
    var _item = _items.find(x => x.id === _id); 
    if(_item?.for && _item.for !== mainCharacter.class)
        return 0;
    var _power = getPowerOfItem(_id);
    var _currentItemPower = !_item ? 0 : getPowerOfItem(_items.find(x => (x.type === _item.type) && (x.weared === mainCharacter.class))?.id);
    return _power - _currentItemPower;
}
function switchInventoryTab(_elem, _order, _noSound) {
    if(!_elem)
        _elem = document.querySelector('.inventory-tab.selected');
    else if(hasClass(_elem, 'selected'))
        return;
    else if(!_noSound)
        PlaySound({ key: 'switch' });
    const _tabs = document.querySelectorAll('.inventory-tab');
    for(let _tab of _tabs){
        removeClass(_tab, 'selected');
        if(_tab === _elem)
            addClass(_tab, 'selected');
    }
    const _slots = document.getElementById('inventory-slots');
    if(_slots){
        const _actionPanel = document.querySelector('.inventory-action-btns');
        switch(_order) {
            case 1:
                closeGemInfoModal(1);
                _slots.innerHTML = getInventoryTabContent();
                removeClass(_actionPanel, 'd-none');
                break;
            case 2:
                _slots.innerHTML = getGemTabContent();
                addClass(_actionPanel, 'd-none');
                break;
            case 3:
                closeGemInfoModal(1);
                _slots.innerHTML = getMiscTabContent();
                addClass(_actionPanel, 'd-none');
                break;
        }
        requestAnimationFrame(() => {
            _slots.scrollTop = 0;
        });
    }
}
function getMiscTabContent() {
    let _html = '';
    const _items = __account.misc.filter(x => x.count > 0).sort((a, b) => a.type - b.type);
    for(let _i = 0; _i < 30; _i++){
        _html += `<div class="item-slot flex">`;
        if(_items?.[_i]) {
            _html += getMiscItemIcon(_items[_i]);
            if(_items[_i].new)
                delete _items[_i].new;
        }
        _html += `</div>`;
    }
    return _html;
}
function getGemTabContent() {
    const _left = [];
    for(let i = 1; i <= 5; i++) {
        const _place = document.getElementById('melt-' + i);
        if(!_place)
            break;
        const _has = _place.querySelector('img');
        if(_has) {
            const _g = parseInt(_has.getAttribute("data-grade"));
            const _key = _has.getAttribute('data-key');
            const _current = _left.find(x => x.key === _key);
            if(_current)
                _current.count++;
            else
                _left.push({key:_key, count:1, grade:_g});
        }
    }
    let _html = '';
    const _items = __account.gems.filter(x => (x.count - (_left.find(y => y.grade === x.grade && y.key === x.key)?.count ?? 0)) > 0).sort((a, b) => 
        a.grade !== b.grade ? b.grade - a.grade : b.count - a.count
    );
    for(let _i = 0; _i < 60; _i++){
        _html += `<div class="item-slot flex">`;
        if(_items?.[_i]) {
            const _item = _items[_i];
            const _count = _item.count - (_left.find(x => x.grade === _item.grade && x.key === _item.key)?.count ?? 0);
            if(_count > 0) {
                _html += getGemItemIcon(_item, _count);
                if(_item.new)
                    delete _item.new;
            }
        }
        _html += `</div>`;
    }
    return _html;
}
function sortItemsFromBestToWorse(_gears) {
    const _items = _gears.filter(x => !x.weared).sort((a, b) => _sortDirection ? (getPowerDiffAgainstWearedOne(a.id) - getPowerDiffAgainstWearedOne(b.id)) : (getPowerDiffAgainstWearedOne(b.id) - getPowerDiffAgainstWearedOne(a.id)));
    return _items;
}
function getInventoryTabContent() {
    const _gears = getItems();
    let _html = '';
    const _items = sortItemsFromBestToWorse(_gears);
    for(let _i = 0; _i < __account.slots; _i++){
        _html += `<div` + (_items?.[_i] ? ' data-key="' + _items[_i].id + '" data-item-id="' + _items[_i].id + '"' : '') + ` class="item-slot flex">`;
        if(_items?.[_i]) {
            _html  += getItemIcon(_items[_i]);
            if(_items[_i].new)
                delete _items[_i].new;
        }
            //_html += '<img class="item-img grade' + _items[_i].grade + '-item" src="./images/items/' + _items[_i].type + _items[_i].grade + '.png"/>';
        _html += `</div>`;
    }
    return _html;
}
function selectGemForSocket(_type, _grade) {
    playClick();
    removeClass(document.getElementById('item-selection-approve-btn'), 'disabled');
    const _itemIcons = document.querySelectorAll('#gem-picking-area img');
    for(let _ic of _itemIcons) {
        removeClass(_ic, 'selected');
        if(_ic.getAttribute('data-gem-key') === _type &&
            _ic.getAttribute('data-gem-grade') === _grade.toString())
            addClass(_ic, 'selected');
    }
}
function acceptGemSelection(_id) {
    //seçili gem i bul
    const _itemIcon = document.querySelector('#gem-picking-area img.selected');
    if(_itemIcon) {
        PlaySound({ key: 'geminsert', volume:1, reset: true });
        var _items = getItems();
        var _item = _items.find(x => x.id === _id);
        const _oldPower = getTotalPower().total;
        const _grade = parseInt(_itemIcon.getAttribute('data-gem-grade'));
        const _key = _itemIcon.getAttribute('data-gem-key');
        closeInventoryQuestionModal();
        const _emptySocket = _item.sockets.find(x => !x.grade);
        _emptySocket.grade = _grade;
        _emptySocket.key = _key;
        __account.gems.find(x => x.key === _key && x.grade === _grade).count--;
        closeCharacterInfoModal();
        document.querySelector('.item-info-container-inner').innerHTML
        = getItemInfoModalHtml(_id);
        const _wrapper = getItemWrapper(_item);
        _wrapper.innerHTML = getItemIcon(_item);
        const _newPower = getTotalPower().total;
        changePower(_oldPower, _newPower);
        resetItemsUI();
        resetGemsUI();
        checkUpdateAvailable2(1);
    }
}
function tryRemoveSocket(_id, _socketIndex) {
    playClick();
    var _items = getItems();
    var _item = _items.find(x => x.id === _id);
    const _socket = _item.sockets.sort((a, b) => (b.grade ?? 0) - (a.grade ?? 0))[_socketIndex];
    const _cost = MathRound(10000 * Math.pow(2, (_item.grade - 1)));
    askSomething(`<img style="height:4vh" src="${getRewardIcon(_socket.grade, 'gem', _socket.key).src}" />&nbsp;${getLangData('Remove this gem for')} <b style="margin-left:1vh;color:#F3f4f5 !important">${_cost.formatWithDots()}</b>&nbsp;<img style="height:2.2vh" src="./images/icons/coin.png" />&nbsp;`, `acceptAndRemoveGemFromSocket(${_id}, ${_cost}, ${_socketIndex})`,1);
}
function acceptAndRemoveGemFromSocket(_id, _cost, _socketIndex) {
    playClick();
    if(__account.gold < _cost) {
        warn('<span>' + getLangData('Not enough gold') + '</span>', 'warn');
        return;
    }
    var _items = getItems();
    var _item = _items.find(x => x.id === _id);
    const _sockets = _item.sockets.sort((a, b) => (b.grade ?? 0) - (a.grade ?? 0));
    let _socket = _sockets[_socketIndex];
    const _oldPower = getTotalPower().total;
    updateGold(-_cost);
    closeInventoryQuestionModal();
    const _gem = __account.gems.find(x => x.key === _socket.key && x.grade === _socket.grade);
    if(_gem)
        _gem.count++;
    else
        __account.gems.push({key:_socket.key, grade:_socket.grade,count:1});
    closeCharacterInfoModal(1);
    _sockets[_socketIndex] = {};
    document.querySelector('.item-info-container-inner').innerHTML
    = getItemInfoModalHtml(_id);
    const _newPower = getTotalPower().total;
    changePower(_oldPower, _newPower);
    resetItemsUI();
    resetGemsUI();
    checkUpdateAvailable2(1);
}
function tryAddSocket(_id) {
    playClick();
    let _choices = getGemTabContent() ?? '';
    if(_choices)
        _choices = _choices.replace(/openGemItemInfoModal/g, 'selectGemForSocket');
    let _modal = `<div class="full fade-me flex inventory-question">
        <div class="inventory-modal">
            <div style="padding:6vh 4vh 4vh 4vh" class="flex">
                <span style="color:#f7f7f7dd !important;font-size:3vh !important">${getLangData('Pick a gem for socket')}</span>
            </div>
            <div class="flex w-100" style="padding:2vh;max-height:33vh;overflow-y:auto">
                <div id="gem-picking-area" class="flex w-100">`
               + _choices +
                `</div>
            </div>
            <div style="padding:4vh 2vh" class="flex">
                <div class="game-menu-button flex animate-me" style="cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onexactclick="closeInventoryQuestionModal()">${getLangData('CANCEL')}</div>
                <div id="item-selection-approve-btn" class="game-menu-button flex animate-me disabled" style="cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onexactclick="acceptGemSelection(${_id})">${getLangData('APPROVE')}</div>
            </div>
        </div>
    </div>`;
    const _div = document.createElement('div');
    _div.innerHTML = _modal;
    document.querySelector('#menu-ui').appendChild(_div.firstChild);
}
function getItemInfoModalHtml(_id) {
    var _items = getItems();
    var _item = _items.find(x => x.id === _id);
    var _itemProps = _equips[_item.type]['grade' + _item.grade];
    var updateCost = getItemUpdateCost(_id);
    var sellCost = getItemSellCost(_id);
    var _power = getPowerOfItem(_id);
    var _currentItemPower = getPowerOfItem(_items.find(x => (x.type === _item.type) && (x.weared === mainCharacter.class))?.id);
    var _powerDiff = _power - _currentItemPower;
    var _powerDiffHtml = '';
    if(_powerDiff > 0 && (!_item.for || _item.for === mainCharacter.class))
        _powerDiffHtml += ' (<img style="height:2.5vh" src="./images/icons/power-up.png" /> ' + parseInt(_powerDiff).formatWithDots() + ')';
    else if(_powerDiff < 0)
        _powerDiffHtml += ' (<img style="height:2.5vh" src="./images/icons/power-down.png" /> ' + MathAbs(parseInt(_powerDiff)).formatWithDots() + ')';
   
    var _props = ''; // '<div class="flex w-100 item-prop"><div class="flex w-100"><div class="flex flex-jc-start wot-subtitle w-50">' + getLangData('Gear Score') + ':</div><div class="flex flex-jc-end w-50 wot-subtitle">' + parseInt(_power).formatWithDots() + _powerDiffHtml + '</div></div></div>';
    let _socketsHtml = '', _socketProps = '';
    if(!_item.sockets) 
        _item.sockets = [{},{},{},{}];
    if(_item.sockets){
        
        // let _si = 0;
        // for(let _socket of _item.sockets.sort((a, b) => (b.grade ?? 0) - (a.grade ?? 0)))
        // {
        //     if(!_socket.grade)
        //         _socketsHtml += `<div onexactclick="tryAddSocket(${_id})" class="flex item-socket"><img class="empty-socket-icon" src="./images/ui/game/socket-empty.png" /></div>`;
        //     else {
        //         _socketsHtml += `<div onexactclick="tryRemoveSocket(${_id}, ${_si})" class="flex item-socket"><img src="./images/gems/${_socket.key}${_socket.grade}.png" /></div>`;
        //         var _gem = __gems.find(x => x.key === _socket.key);
        //         const _g = _gem.grades.find(x => x.grade === _socket.grade);
        //         const _gemProps = _g.props;
        //         const _pr = _gemProps.find(x => x.for.indexOf(_item.type) !== -1);
        //         const _p = __properties.find(x => x.key === _pr.key);
        //         _socketProps += '<div class="item-prop socket-prop flex w-100"><div class="flex flex-jc-start w-50">' + _p.titles[getLang()] + 
        // '</div><div class="flex flex-jc-end w-50 wot-subtitle">' + (_pr.value ? ((_p.key.endsWith('-rate')) ? '%' + parseFloat(_pr.value).toFixed(2) : _pr.value) + ' ' : '') + '</div></div>';
        //     }
        //     _si++;
        // }
        const _socketStats = _item.sockets.reduce((a, s) => {
            if (!s.key || !s.grade) return a;

            const p = __gems.find(x => x.key === s.key)?.grades?.find(x => x.grade === s.grade)?.props?.find(x => x.for.includes(_item.type));
            if (!p) return a;

            return (
                (a[p.key] ??= { key: p.key, maxGrade: 0, totalValue: 0 }),
                a[p.key].maxGrade = Math.max(a[p.key].maxGrade, s.grade),
                a[p.key].totalValue += +p.value,
                a
            );
        }, {});

        const _socketStatsSorted = Object.values(_socketStats)
            .sort((a, b) => b.maxGrade - a.maxGrade);

        // SOCKETLARI ÇİZ
        let _si = 0;

        for (const _socket of _item.sockets) {

            if (!_socket.grade) {
                _socketsHtml += `<div onexactclick="tryAddSocket(${_id})" class="flex item-socket">
                    <img class="empty-socket-icon" src="./images/ui/game/socket-empty.png" />
                </div>`;
            }
            else {
                _socketsHtml += `<div onexactclick="tryRemoveSocket(${_id}, ${_si})" class="flex item-socket">
                    <img src="./images/gems/${_socket.key}${_socket.grade}.png" />
                </div>`;
            }

            _si++;
        }

        // STATLARI ÇİZ
        for (const _stat of _socketStatsSorted) {
            const _p = __properties.find(x => x.key === _stat.key);

            _socketProps += `<div class="item-prop socket-prop flex w-100">
                <div class="flex flex-jc-start w-50">
                    ${_p.titles[getLang()]}:
                </div>
                <div class="flex flex-jc-end w-50 wot-subtitle">
                    ${_p.key.endsWith('-rate') ? '%' + _stat.totalValue.toFixed(2) : _stat.totalValue}
                </div>
            </div>`;
        }
    }
    if(_item.for && (_item.for !== mainCharacter.class))
        _props += '<div class="item-prop flex" style="font-size:3vh!important;width:100%;padding:1vh 7%;color:#9d987f !important">' + getLangData(_item.for).toProperCase() + ' item</div>';
    
    _equips[_item.type]['grade' + _item.grade].grade = 3;
    _item.grade = 3;
    _item.name = 'AynZaur';
     const __CLONE = structuredClone(_item); 
     for(let ci = 0; ci < 2; ci++) {
        var cprops = getRandomProps(__CLONE.type, __CLONE.grade, __CLONE.level);
        __CLONE.props.push(cprops[0]);
     }
    
    
    _props += renderItemProps(__CLONE);
    _props += _socketProps;
    _props += '<div class="item-prop flex w-100"><div class="flex flex-jc-start w-50 wot-subtitle">' + getLangData('Cost') + ':</div><div class="flex flex-jc-end w-50 wot-subtitle item-detail-cost">' + sellCost.formatWithDots() + '<img style="height:2vh;margin-left:.5vh" src="./images/icons/coin.png" /></div></div>';
    let _html = 
        `<div class="flex w-100 item-detail-container">
            <div class="flex flex-jc-start flex-ai-start item-detail-container-inner">
                <div class="item-modal-icon-container">
                    <div class="item-back-frame full">
                        <img src="./images/ui/game/weapon-bg1.gif" />
                    </div>
                    <img style="padding:14%" class="item-current-frame" src="./images/ui/game/items/AynZaur.png" />
                    <div class="item-front-frame full"></div>` +
                    //${(_item.for ? (_item.for + '/') : '')}${_item.type}${_item.grade}.png" class="full grade${_item.grade}-item${_item.grade > 5 ? ' glow' : ''}" />
                    `<div class="grade-letter d-none" style="position:absolute;font-size:7vh !important;bottom:-5%;left:-5%">${getItemGradeLetter(_item.grade)}</div>
                </div>
                <div class="item-detail-title-container">
                    <div class="item-detail-title wot-title">
                        ${getLangData('Lvl')}&nbsp;${_item.level ?? 1} - ${_item.name ?? getLangData(_item.type).toLocaleUpperCase(getLang())}
                    </div>
                    <div class="item-detail-desc wot-title">
                        UNCOMMON ITEM
                    </div>
                    <div class="flex flex-jc-start w-100 item-detail-power">
                         <div class="wot-subtitle item-detail-power-title"> 
                            ${getLangData('Gear Score')}:
                        </div>
                        <div class="flex flex-jc-start wot-subtitle item-detail-power-value">
                            ${parseInt(_power).formatWithDots() + _powerDiffHtml}
                        </div>
                    </div>
                    <div class="flex w-100 item-detail-top-splitter">
                        <img src="./images/ui/game/item-detail-top-splitter.png" />
                    </div>
                    <div style="height:50%" class="flex flex-jc-start w-100 item-socket-container">`
                        + _socketsHtml +
                    `</div>
                </div>
            </div>
            <div class="item-props-scroll-area">
                <div class="flex flex-jc-start flex-ai-start">`
                    + _props +
                `</div>
            </div>
        </div>
        <div class="flex w-100 item-detail-bottom-splitter">
            <img src="./images/ui/game/item-detail-bottom-splitter.png" />
        </div>
        <div class="flex w-100 game-menu-icon-buttons">
            <div class="game-menu-icon-button w-25${hasMaterial('ticket-random') ? '' : ' disabled'}" onexactclick="askRandomizeItem(${_id})"><img src="./images/ui/game/item-detail-btn1.png" /></div>
            <div class="game-menu-icon-button w-25${_itemProps.maxLevel > _item.level ? '' : ' disabled'}" onexactclick="upgradeItem(${_id})"><img src="./images/ui/game/item-detail-btn4.png" /></div>
            <div class="game-menu-icon-button w-25${(_item.weared === mainCharacter.class) ? ' disabled' : ''}" onexactclick="sellItem(${_id})"><img src="./images/ui/game/item-detail-btn3.png" /></div>
            <div class="equipment-wear-button game-menu-icon-button w-25${(_item.weared === mainCharacter.class) ? ' d-none' : ''}${(_item.for && (_item.for !== mainCharacter.class)) ? ' disabled' : ''}" onexactclick="wearItem(${_id})"><img src="./images/ui/game/item-detail-btn2.png" /></div>
            <div class="game-menu-icon-button w-25${(_item.weared === mainCharacter.class) ? '' : ' d-none'}" onexactclick="unWearItem(${_id})"><img src="./images/ui/game/item-detail-btn2.png" /></div>
        </div>
        <div class="flex game-menu-buttons-big d-none">
            <div lang="${getLang()}" class="game-menu-button animate-me flex${hasMaterial('ticket-random') ? '' : ' disabled'}" onexactclick="askRandomizeItem(${_id})"><div class="flex game-menu-button-inner"><div class="flex wot-title">${getLangData('RANDOMIZE')} (<img style="height:3vh" src="./images/icons/ticket-random.png" />)</div></div></div>
            <div lang="${getLang()}" class="game-menu-button animate-me flex${_itemProps.maxLevel > _item.level ? '' : ' disabled'}" onexactclick="upgradeItem(${_id})"><div class="flex game-menu-button-inner wot-title">${getLangData('UPDATE')}` + (updateCost > 0 ? ` (${updateCost.formatWithDots()} <img style="height:2vh;margin:0 0 0 1vh" src="./images/icons/coin.png" />)` : '') + `</div></div>
        </div>
        <div class="flex game-menu-buttons-small d-none">
            <div lang="${getLang()}" class="wot-title game-menu-button-half animate-me flex${(_item.weared === mainCharacter.class) ? ' disabled' : ''}" onexactclick="sellItem(${_id})">${getLangData('SELL')}</div>
            <div lang="${getLang()}" class="wot-title game-menu-button-half equipment-wear-button animate-me flex${(_item.weared === mainCharacter.class) ? ' d-none' : ''}${(_item.for && (_item.for !== mainCharacter.class)) ? ' disabled' : ''}" onexactclick="wearItem(${_id})">${getLangData('WEAR')}</div>
            <div lang="${getLang()}" class="wot-title game-menu-button-half animate-me flex${(_item.weared === mainCharacter.class) ? '' : ' d-none'}" onexactclick="unWearItem(${_id})">${getLangData('UNWEAR')}</div>
        </div>`
    return _html;
}
function openItemInfoModal(_id) {
    const _parent = document.querySelector('#inventory-list');
    if(!_parent)
        return;
    playClick();
    //Item Grade
    //Item Type
    //Item Update Level
    //Item Power
    //Item Pic
    //Item Stats
    //Item Power Difference
    //Item Update Cost
    var _html = `<div class="full item-info-container-parent menu-modal-right">
    <div class="full flex item-info-container">
        <div class="full flex item-info-container-inner">`
        + getItemInfoModalHtml(_id) +
		`</div>
    <div onexactclick="closeItemInfoModal()" class="item-info-modal-close"></div>
    </div> 
    <div class="shine-area"></div>
    </div>`;
    var _currentItemModal = document.querySelector('.item-info-container-parent');
    if(_currentItemModal)
        _currentItemModal.remove();
    const _div = document.createElement('div');
    _div.innerHTML = _html;
    _parent.appendChild(_div.firstChild);
    addClass(document.querySelector('#inventory-list'), 'item-info-opened');
    //document.getElementById('inventory-list').innerHTML += _html;
}
function renderItemProps(_item, _defaultColor) {
    let _props = '';
    for(let _prop of (_item.props ?? []).sort((a,b) => __properties.find(x => x.key === a.key).order - __properties.find(x => x.key === b.key).order)) {
        const _p = __properties.find(x => x.key === _prop.key);
        const _min = getMinPropValue(_prop.key, _item);
        const _max = getMaxPropValue(_prop.key, _item);
        let _quality;
        if(_prop.value === _max)
            _quality = 1;
        else {
            const _half = _min + (_max - _min) / 2;
            if(_prop.value >= _half)
                _quality = 2;
            else
                _quality = 3;
        }
        _props += '<div class="item-prop flex w-100"><div class="flex flex-jc-start w-50 page-detail-item-label"><img src="./images/ui/game/prop-badge.png" />' + _p.titles[getLang()] + 
        ':</div><div class="page-detail-item-value flex flex-jc-end w-50 item-stat-value-max' + _quality + '">' + (_prop.value ? ((_p.key.endsWith('-rate')) ? '%' + parseFloat(_prop.value).toFixed(2) : _prop.value) + ' ' : '') + (_item.level > 1 ? '</div>' :  '&nbsp;<span class="item-prop-gap wot-subtitle">(' + getMinPropValue(_prop.key, _item) + ' - ' + getMaxPropValue(_prop.key, _item) + ')</span></div>') + '</div>';
    }
    return _props;
}
function openMiscItemInfoModal(_type, _grade) {
    playClick();
    var _item = misc.find(x => x.type === _type);
    var _html = `<div class="full flex item-info-container-parent menu-modal-right">
        <div class="full flex item-info-container item-misc-info-container">
            <div class="flex w-100 page-detail-header-wrapper">
                <div lang="${getLang()}" class="one-line page-detail-header">${_grade > 0 ? getLangData('Grade').toLocaleUpperCase(getLang()) + ' ' + _grade + ' ' : ''}${_item.titles[getLang()].toLocaleUpperCase(getLang())}</div>
            </div>
            <div class="page-detail-splitter-thin"></div>
            <div class="flex w-100 page-detail-icon-wrapper">
                <img src="./images/icons/${_item.type}.png" />
            </div>
            <div class="flex w-100 flex-ai-start page-detail-desc-wrapper">
                <div class="flex page-detail-desc" style="width:80%">
                    ${_item.descriptions[getLang()]}
                </div>
                <div class="page-detail-splitter"></div>
                <div class="flex wot-subtitle" style="width:80%">
                    ${getLangData('Cost')}:&nbsp;${(_item.cost * (_grade ?? 1)).formatWithDots()}&nbsp;<img src="./images/icons/coin.png" style="height:2vh" />
                </div>
            </div>
            <div class="flex w-100 action-button-container ${_item.do ? '' : ' d-none'}">
                <div class="page-detail-splitter"></div>
                <div class="page-detail-button-half animate-me flex" onexactclick="sellMiscItem('${_item.type}', ${_grade})">${getLangData('SELL')}</div>
                <div class="page-detail-button-half animate-me flex" onexactclick="useMiscItem('${_item.type}', ${_grade})">${getLangData('USE')}</div>
            </div>
            <div class="flex w-100 action-button-container ${_item.do ? ' d-none' : ''}">
                <div class="page-detail-splitter"></div>
                <div class="page-detail-button animate-me flex" onexactclick="sellMiscItem('${_item.type}', ${_grade})">${getLangData('SELL')}</div>
            </div>
		    <div onexactclick="closeItemInfoModal()" class="item-info-modal-close"></div>
        </div>
    </div>`;
    var _currentItemModal = document.querySelector('.item-info-container-parent');
    if(_currentItemModal)
        _currentItemModal.remove();
    document.getElementById('inventory-list').innerHTML += _html;
}
function openGemItemInfoModal(_type, _grade) {
    const _parent = document.querySelector('.gem-info-container-parent');
    if(_parent) {
        addGemToMelt(_type, _grade);
        return;
    }
    playClick();
    var _item = __gems.find(x => x.key === _type);
    const _g = _item.grades.find(x => x.grade === _grade);
    var _props = _g.props;
    let _desc = '';
    for(let _p of _props)
    {
        const _pr = __properties.find(x => x.key === _p.key);
        for(let _f of _p.for)
            _desc += '<div class="gem-item-prop flex w-100"><div class="flex flex-jc-start w-50 page-detail-item-label"><img src="./images/ui/game/'+ _f +'.png" />' + getLangData(_f).toTitleCase() + 
            '</div><div class="flex flex-jc-end w-50 page-detail-item-value">' + ((_p.key.endsWith('-rate') ? '%' + parseFloat(_p.value).toFixed(2) : '+'+_p.value))+ '&nbsp;' +_pr.titles[getLang()]+ '</div></div>';
    }
    var _html = `<div class="full flex item-info-container-parent menu-modal-right">
        <div class="full flex gem-item-info-container item-info-container">
            <div class="flex w-100 page-detail-header-container">
                <div class="page-detail-gem-icon-wrapper flex">
                    <img src="./images/gems/${_type}${_grade}.png" class="page-detail-gem-icon" />
                </div>
                <div class="flex flex-jc-start page-detail-header-wrapper">
                    <div class="one-line page-detail-header" lang="${getLang()}">${_grade > 0 ? getLangData('Grade').toLocaleUpperCase(getLang()) + ' ' + _grade + ' ' : ''}${_item.titles[getLang()].toLocaleUpperCase(getLang())}</div>
                </div>
                <div class="page-detail-splitter"></div>
            </div>
            <div class="flex flex-ai-start w-100 page-detail-desc-wrapper">
                <div class="flex w-100 page-detail-desc-wrapper-inner">`
                    + _desc +
                `</div>
            </div>
            <div class="flex w-100 action-button-container">
                <div class="page-detail-splitter"></div>
                <div class="page-detail-button-half animate-me flex d-none" onexactclick="sellGemItem('${_type}', ${_grade})">${getLangData('SELL')}</div>
                <div class="page-detail-button animate-me flex" onexactclick="openGemMeltModal('${_type}', ${_grade})">${getLangData('MELT')}</div>
            </div>
		    <div onexactclick="closeItemInfoModal()" class="item-info-modal-close"></div>
        </div>
    </div>`;
    var _currentItemModal = document.querySelector('.item-info-container-parent');
    if(_currentItemModal)
        _currentItemModal.remove();
    document.getElementById('inventory-list').innerHTML += _html;
}
function hasMaterial(_type) {
    return __account.misc?.find(x => x.type === _type);
}
function getCharacterStats(_char) {
    const _c = _char ?? mainCharacter;
    if(!_c)
        return null;
    var _items = getItems(_char)?.filter(x => x.weared === _c.class) ?? [];
    if(!_items?.[0])
        return null;
    var _offensiveProps = [], _defensiveProps = [], _miscProps = [];//, _hpProps = [];
    // let _minDmg = mainCharacter.baseProps.minDmg * mainCharacter.level, 
    // _maxDmg = mainCharacter.baseProps.maxDmg * mainCharacter.level, 
    // _maxHP = mainCharacter.baseProps.maxHP * mainCharacter.level, 
    // _armor = mainCharacter.baseProps.armor * mainCharacter.level;
    // for(let _item of _items)
    //     for(let _prop of _item.baseProps)
    //         switch(_prop.key) {
    //             case 'minDmg':
    //                 _minDmg += parseInt(_prop.value);
    //                 break;
    //             case 'maxDmg':
    //                 _maxDmg += parseInt(_prop.value);
    //                 break;
    //             case 'armor':
    //                 _armor += parseInt(_prop.value);
    //                 break;
    //             case 'maxHP':
    //                 _maxHP += parseInt(_prop.value);
    //                 break;
    //         }
    for(let _prop of __properties.filter(x => x.group === 'atk').sort((a,b) => a.order - b.order)){
        _offensiveProps.push({key:_prop.key, color: _prop.color ?? '#f7f7f799', title: _prop.titles[getLang()], value: _prop.base ? _c.baseProps?.[_prop.base] ?? 0 : 0});
        for(let _item of _items){
            for(let _p of _item.props) {
                if(_prop.key === _p.key) {
                    let _current = _offensiveProps.find(x => x.key === _prop.key);
                    _current.value += parseFloat(_p.value);
                }
            }
            if(_item.sockets)
                for(let _socket of _item.sockets.filter(x => x.grade) ?? []) {
                    const _gem = __gems.find(x => x.key === _socket.key);
                    const _g = _gem.grades.find(x => x.grade === _socket.grade);
                    const _gemProps = _g.props;
                    const _pr = _gemProps.find(x => x.for.indexOf(_item.type) !== -1);
                    if(_prop.key === _pr.key) {
                        let _current = _offensiveProps.find(x => x.key === _prop.key);
                        _current.value += parseFloat(_pr.value);
                    }
                }
        }
    }
    for(let _prop of __properties.filter(x => x.group === 'def').sort((a,b) => a.order - b.order)){
        _defensiveProps.push({key:_prop.key, color: _prop.color ?? '#f7f7f799', title: _prop.titles[getLang()], value: _prop.base ? _c.baseProps?.[_prop.base] ?? 0 : 0});
        for(let _item of _items){
            for(let _p of _item.props) {
                if(_prop.key === _p.key) {
                    let _current = _defensiveProps.find(x => x.key === _prop.key);
                    _current.value += parseFloat(_p.value);
                }
            }
             if(_item.sockets)
                for(let _socket of _item.sockets.filter(x => x.grade) ?? []) {
                    const _gem = __gems.find(x => x.key === _socket.key);
                    const _g = _gem.grades.find(x => x.grade === _socket.grade);
                    const _gemProps = _g.props;
                    const _pr = _gemProps.find(x => x.for.indexOf(_item.type) !== -1);
                    if(_prop.key === _pr.key) {
                        let _current = _defensiveProps.find(x => x.key === _prop.key);
                        _current.value += parseFloat(_pr.value);
                    }
                }
        }
    }
    for(let _prop of __properties.filter(x => !x.group).sort((a,b) => a.order - b.order)){
        _miscProps.push({key:_prop.key, color: _prop.color ?? '#f7f7f799', title: _prop.titles[getLang()], value: _prop.base ? _c.baseProps?.[_prop.base] ?? 0 : 0});
        for(let _item of _items) {
            for(let _p of _item.props) {
                if(_prop.key === _p.key) {
                    let _current = _miscProps.find(x => x.key === _prop.key);
                    _current.value += parseFloat(_p.value);
                }
            }
            if(_item.sockets)
                for(let _socket of _item.sockets.filter(x => x.grade) ?? []) {
                    const _gem = __gems.find(x => x.key === _socket.key);
                    const _g = _gem.grades.find(x => x.grade === _socket.grade);
                    const _gemProps = _g.props;
                    const _pr = _gemProps.find(x => x.for.indexOf(_item.type) !== -1);
                    if(_prop.key === _pr.key) {
                        let _current = _miscProps.find(x => x.key === _prop.key);
                        _current.value += parseFloat(_pr.value);
                    }
                }
        }
    }
    return { 
        op: _offensiveProps, 
        dp: _defensiveProps, 
        mp: _miscProps
        // hp: _hpProps, 
        // armor: _armor, 
        // minDmg: _minDmg, 
        // maxDmg: _maxDmg, 
        // maxHP: _maxHP 
    };
}
function getArtifactStats() {
    var _bonuses = {
        atk: 0,
        def: 0
    }
    __artifactGroups.forEach(x => {
        if(x.count <= (__account.artifacts.filter(y => y.group === x.id)?.length ?? 0))
            _bonuses[x.bonus.key] = x.bonus.rate;
    });
    return _bonuses;
}
function applyBonusStats(_char) {
    const _c = _char ?? mainCharacter;
    if(!_c)
        return;
    var _bonuses = getArtifactStats();
    _c.bonusAtk = (1 + (_bonuses.atk / 100));
    _c.bonusDef = (1 + (_bonuses.def / 100));
}
function applyCharacterStats(hasMainCharacter, _char) {
    var _stats = getCharacterStats(_char) ?? { 
        op: [],
        dp: [],
        mp: []
    };
    if(!_char)
        applyBonusStats();
    const _c = _char ?? mainCharacter;
    let _atk = (_stats.op.find(x => x.key === 'atk')?.value ?? 0) + _c.level;
    const _atktv = _c.getTalentValue('passive-atk');
    if(_atktv > 0)
        _atk += MathRound(_atk * (_atktv / 100));
    _c.atk = _atk;
    let _cr = (_stats.op.find(x => x.key === 'crit-rate')?.value ?? 0) + 5;
    const _crtv = _c.getTalentValue('passive-crit-rate');
    if(_crtv > 0)
        _cr += _crtv;
    _c.critRate = _cr;
    _c.critDmgRate = _stats.op.find(x => x.key === 'crit-dmg-rate')?.value ?? 0;
    _c.stealRate = _stats.op.find(x => x.key === 'steal-rate')?.value ?? 0;
    _c.fireDmg = _stats.op.find(x => x.key === 'fire-dmg')?.value ?? 0;
    _c.lightningDmg = _stats.op.find(x => x.key === 'lightning-dmg')?.value ?? 0;
    _c.toxicDmg = _stats.op.find(x => x.key === 'toxic-dmg')?.value ?? 0;
    _c.iceDmg = _stats.op.find(x => x.key === 'ice-dmg')?.value ?? 0;
    _c.shadowDmg = _stats.op.find(x => x.key === 'shadow-dmg')?.value ?? 0;
    let _def = (_stats.dp.find(x => x.key === 'def')?.value ?? 0) + _c.level;
    const _deftv = _c.getTalentValue('passive-def');
    if(_deftv > 0)
        _def += MathRound(_def * (_deftv / 100));
    _c.def = _def;
    _c.critResistRate = _stats.dp.find(x => x.key === 'crit-resist-rate')?.value ?? 0;
    let _cdr = _stats.dp.find(x => x.key === 'crit-dmg-resist-rate')?.value ?? 0;
    const _cdrtv = _c.getTalentValue('passive-crit-dmg-resist-rate');
    if(_cdrtv > 0)
        _cdr += _cdrtv;
    _c.critDmgResistRate = _cdr;
    _c.fireResistRate = _stats.dp.find(x => x.key === 'fire-resist-rate')?.value ?? 0;
    _c.lightningResistRate = _stats.dp.find(x => x.key === 'lightning-resist-rate')?.value ?? 0;
    _c.toxicResistRate = _stats.dp.find(x => x.key === 'toxic-resist-rate')?.value ?? 0;
    _c.iceResistRate = _stats.dp.find(x => x.key === 'ice-resist-rate')?.value ?? 0;
    _c.shadowResistRate = _stats.dp.find(x => x.key === 'shadow-resist-rate')?.value ?? 0;
    let _hp = (_stats.dp.find(x => x.key === 'hp')?.value ?? 0) + (2 * + _c.level);
    const _hptv = _c.getTalentValue('passive-hp');
    if(_hptv > 0)
        _hp += MathRound(_hp * (_hptv / 100));
    _c.health = _c.hp = _c.maxHP = _hp;
    _c.luckRate = _stats.mp.find(x => x.key === 'luck-rate')?.value ?? 0;
    _c.goldGainRate = _stats.mp.find(x => x.key === 'gold-gain-rate')?.value ?? 0;
    if(episode.pvp) {    
        _c.pierceRate = _stats.op.find(x => x.key === 'pierce-rate')?.value ?? 0;
        _c.resilienceRate = _stats.dp.find(x => x.key === 'resilience-rate')?.value ?? 0;
    }
    if(!hasMainCharacter)
        _c.setHealth(_c.MAXHP, 0, 0);
    else
        _c.setHealth(_c.health, 0, 0);
}
function applyDefaultCharacterStats(_c) {
    _c.atk = 50;
    _c.critRate = 5;
    _c.critDmgRate = 0;
    _c.stealRate = 0;
    _c.fireDmg = 0;
    _c.lightningDmg = 0;
    _c.toxicDmg = 0;
    _c.iceDmg = 0;
    _c.shadowDmg = 0;
    _c.def = 50;
    _c.critResistRate = 0;
    _c.critDmgResistRate = 0;
    _c.fireResistRate = 0;
    _c.lightningResistRate = 0;
    _c.toxicResistRate = 0;
    _c.iceResistRate = 0;
    _c.shadowResistRate = 0;
    _c.health = _c.hp = _c.maxHP = _c.MAXHP = 10000;
    _c.luckRate = 0;
    _c.goldGainRate = 0;
    _c.pierceRate = 0;
    _c.resilienceRate = 0;
    _c.fatique = _c.maxFatique = 100;
}
function getItemGradeLetter(_grade) {
    switch(_grade) {
        case 1:
            return 'C';
        case 2:
            return 'B';
        case 3:
            return 'A';
        case 4:
            return 'S';
        case 5:
            return 'SR';
        case 6:
            return 'SS';
        case 7:
            return 'SSR';
        case 8:
            return 'SSS';
        default:
            return 'D';
    }
}
function openCharacterInfoModal() {
    closeCharacterInfoModal();
    playClick();
    var _level = mainCharacter.level;
    var _class = mainCharacter.class;
    _class = getLangData(_class).toProperCase();
    var _stats = getCharacterStats() ?? { 
        op: [],
        dp: [],
        mp: []
    };
    var _offensiveProps = _stats.op, _defensiveProps = _stats.dp, _miscProps = _stats.mp;
    let _props = '<div class="stats-group-stats-line"><img src="./images/ui/game/stats-line.png" /></div>';
    _props += '<div class="stats-group-title flex flex-jc-start">' + getLangData('Offensive Stats') + '<img src="./images/ui/game/stats-badge.png" /></div>';
    _props += '<div class="stats-group-stats-line"><img src="./images/ui/game/stats-line.png" /></div>';
    //var _atk = _offensiveProps.find(x => x.key === 'atk')?.value ?? 1;
    //var _dps = getTotalPower().atk;
    //_props += `<div style="color:#F7F7F780!important" class="stats-group-item">${getLangData('Base Damage')}: ${_stats.minDmg.formatWithDots()} - ${_stats.maxDmg.formatWithDots()}</div>`;
    for(let _o of _offensiveProps)
        _props += `<div style="padding:0 6%" class="w-100 flex"><div class="w-50 flex flex-jc-start">${_o.title}:</div><div class="flex w-50 flex-jc-end" style="color:#f3f4f5cc !important">${_o.key.endsWith('-rate') ? '% ' + _o.value.toFixed(2) : _o.value.formatWithDots()}</div></div>`;
    _props += '<div class="stats-group-stats-line"><img src="./images/ui/game/stats-line.png" /></div>';
    _props += '<div class="stats-group-title flex flex-jc-start">' + getLangData('Defensive Stats')  + '<img src="./images/ui/game/stats-badge.png" /></div>';
    _props += '<div class="stats-group-stats-line"><img src="./images/ui/game/stats-line.png" /></div>';
    //_props += `<div style="text-align:right;color:#F7F7F780!important" class="stats-group-item">${getLangData('Base Armor')}: ${_stats.armor.formatWithDots()}</div>`;
    for(let _o of _defensiveProps)
        _props += `<div style="padding:0 6%" class="w-100 flex"><div class="w-50 flex flex-jc-start">${_o.title}:</div><div class="flex w-50 flex-jc-end" style="color:#f3f4f5cc !important">${_o.key.endsWith('-rate') ? '% ' + _o.value.toFixed(2) : _o.value.formatWithDots()}</div></div>`;
    //_props += '<div style="margin-top:1vh;color:#f7f7f799 !important; position:relative" class="stats-group-title">' + getLangData('Other Stats') + '<img src="./images/icons/hp.png" style="opacity:.65;position:absolute;height:70%;top:15%;right:3vh" /></div>';
    //_props += `<div style="color:#F7F7F780!important" class="stats-group-item">${getLangData('Base Health')}: ${_stats.maxHP.formatWithDots()}</div>`;
    //for(let _o of _hpProps)
    //    _props += `<div${_o.color ? ' style="color:' + _o.color + '80!important"' : ''} class="stats-group-item">${_o.title}: ${_o.key.endsWith('-rate') ? '%' + _o.value.toFixed(2) : _o.value.formatWithDots()}</div>`;
    let _html = `<div class="full character-info-container-parent menu-modal-left">
    <div class="full flex character-info-container">
        <div class="flex character-info-header">
            <div class="full flex flex-jc-start">
                <div class="one-line flex flex-jc-start character-info-header-text">
                    <img src="./images/ui/game/stats-badge.png" />Lvl ${_level} - ${_class}
                </div>
            </div>
            <div class="flex flex-jc-end item-info-modal-close character-info-close" onexactclick="closeCharacterInfoModal()"></div>
        </div>
        <div class="character-info-scroll-area">
            <div class="flex flex-jc-start flex-ai-start" style="padding-bottom:2vh">`
                + _props +
                `<div class="stats-group-stats-line"><img src="./images/ui/game/stats-line.png" /></div>
                <div class="stats-group-title flex flex-jc-start">${getLangData('General')}<img src="./images/ui/game/stats-badge.png" /></div>
                <div class="stats-group-stats-line"><img src="./images/ui/game/stats-line.png" /></div>
                <div class="stats-group-item w-100 flex"><div class="w-50 flex flex-jc-start">${getLangData('Title:')}</div><div style="color:#f3f4f5cc !important" class="w-50 flex flex-jc-end">${getLangData(mainCharacter.title)}</div></div>
                <div class="stats-group-item w-100 flex"><div class="w-50 flex flex-jc-start">${getLangData('Experience')}:</div><div style="color:#f3f4f5cc !important" class="w-50 flex flex-jc-end">${mainCharacter.experience.formatWithDots()} / ${mainCharacter.maxExperience.formatWithDots()}</div></div>
                <div class="stats-group-item w-100 flex"><div class="w-50 flex flex-jc-start">${getLangData('Fatique')}:</div><div style="color:#f3f4f5cc !important" class="w-50 flex flex-jc-end">${mainCharacter.maxFatique.formatWithDots()}</div></div>
                <div class="stats-group-item w-100 flex"><div class="w-50 flex flex-jc-start">${getLangData('Total Power')}:</div><div style="color:#f3f4f5cc !important" class="w-50 flex flex-jc-end">${getTotalPower().total.formatWithDots()}</div></div>
                <div class="stats-group-item w-100 flex d-none"><div class="w-50 flex flex-jc-start">${getLangData('Progress')}:</div><div style="color:#f3f4f5cc !important" class="w-50 flex flex-jc-end">${__account.questStatus.order} / ${_npcQuests.length}</div></div>
            </div>
        </div>
    </div>
    </div>`;
    document.getElementById('character-screen').innerHTML += _html;
}
function openGemMeltModal(_type, _grade) {
    const _meltParent = document.querySelector('.gem-info-container-parent');
    if(!_meltParent)
        closeCharacterInfoModal(1);
    closeItemInfoModal(1);
    //playClick();
    let _html = `<div class="full gem-info-container-parent character-info-container-parent menu-modal-left"><div class="full flex character-info-container">
    <div class="flex" style="width:100%;height:12%">
    <div class="flex flex-jc-end item-info-modal-close" onexactclick="closeGemInfoModal()"></div>
    </div>
    <div style="width:100%;height:88%;padding:0 6% 6% 6%">
        <div class="flex full" style="position:relative">
            <div class="melt-path melt-path-1"></div>
            <div class="melt-path melt-path-2"></div>
            <div class="melt-path melt-path-3"></div>
            <div class="melt-path melt-path-4"></div>
            <div class="melt-path melt-path-5"></div>
            <div class="melt-place" id="melt-1" onexactclick="removeMeltGem(1)"></div>
            <div class="melt-place" id="melt-2" onexactclick="removeMeltGem(2)"></div>
            <div class="melt-place" id="melt-3" onexactclick="removeMeltGem(3)"></div>
            <div class="melt-place" id="melt-4" onexactclick="removeMeltGem(4)"></div>
            <div class="melt-place" id="melt-5" onexactclick="removeMeltGem(5)"></div>
            <div onexactclick="acceptMelt()" class="melt-btn game-btn2 flex">${getLangData('MELT')}</div>
        </div>
    </div>
    </div>
    </div>`;
    document.getElementById('character-screen').innerHTML += _html;
    setTimeout(() => {
        addGemToMelt(_type, _grade);
    }, 20);
}
function removeMeltGem(_num) {
    PlaySound({key:'gem', volume:.5});
    document.getElementById('melt-' + _num).innerHTML = '';
    updateGemMeltPlaces();
}
function addGemToMelt(_type, _grade) {
    let _ok, _p;
    const _btn = document.querySelector('.melt-btn');
    for(let i = 1; i <= 5; i++) {
        const _place = document.getElementById('melt-' + i);
        const _has = _place.querySelector('img');
        if(!_has && !_ok) {
            _ok = 1;
            _p = _place;
        }
        if(_has) {
            const _g = parseInt(_has.getAttribute("data-grade"));
            if(_g !== _grade) {
                warn('<span>' + getLangData('All gems must be in same grade') + '</span>', 'warn');
                return;
            }
        }
    }
    if(!_ok) {
        warn('<span>' + getLangData('Melt places are full') + '</span>', 'warn');
        return;
    }
    PlaySound({key:'gem', volume:.5});
    _p.innerHTML = "<img data-grade='" + _grade + "' data-key=" + _type + " src='./images/gems/" + _type + _grade + ".png' />";
    updateGemMeltPlaces();
}
// function updateGemMeltPlaces() {
//     const _defColor = '#f3f4f540';
//     let _key;
//     let _len = 0;
//     const _btn = document.querySelector('.melt-btn');
//     for(let i = 1; i <= 5; i++) {
//         const _place = document.getElementById('melt-' + i);
//         const _next = document.getElementById('melt-' + ((i + 1) > 5 ? 1 : (i + 1)));
//         const _img = _place.querySelector('img');
//         const _nextImg = _next.querySelector('img');
//         let _color = _defColor, _nextColor = _defColor;
//         if(_img) {
//             _len++;
//             _key = _img.getAttribute('data-key');
//             _color = __gems.find(x => x.key === _key).color;
//         }
//         if(_nextImg) {
//             _key = _nextImg.getAttribute('data-key');
//             _nextColor = __gems.find(x => x.key === _key).color;
//         }
//         if(i < 4)
//             document.querySelector('.melt-path-' + i).style.background = 'linear-gradient(' + _color + ',' + _nextColor + ')';
//         else
//             document.querySelector('.melt-path-' + i).style.background = 'linear-gradient(' + _nextColor + ',' + _color + ')';
//     }
//     if(_len < 5){
//         //addClass(_btn, 'disabled');
//         removeClass(_btn, 'glow');
//     }
//     else{
//         //removeClass(_btn, 'disabled');
//         addClass(_btn, 'glow');
//     }
//     switchInventoryTab(null, 2, 1);
// }
function updateGemMeltPlaces() {
    const _defColor = '#f3f4f540';
    let _key;
    let _len = 0;
    const _btn = document.querySelector('.melt-btn');

    for(let i = 1; i <= 5; i++) {
        const _place = document.getElementById('melt-' + i);
        const _next = document.getElementById('melt-' + ((i + 1) > 5 ? 1 : (i + 1)));
        const _img = _place.querySelector('img');
        const _nextImg = _next.querySelector('img');

        let _color = _defColor, _nextColor = _defColor;

        if(_img) {
            _len++;
            _key = _img.getAttribute('data-key');
            _color = __gems.find(x => x.key === _key).color;
            addClass(_place, 'melt-orb-glow');
        }
        else
            removeClass(_place, 'melt-orb-glow');
        if(_nextImg) {
            _key = _nextImg.getAttribute('data-key');
            _nextColor = __gems.find(x => x.key === _key).color;
            addClass(_next, 'melt-orb-glow');
        }
        else
            removeClass(_next, 'melt-orb-glow');
        const el = document.querySelector('.melt-path-' + i);
        if(_img && _nextImg)
            addClass(el, 'melt-path-glow');
        else 
            removeClass(el, 'melt-path-glow');
        if(i < 4)
            el.style.background = 'linear-gradient(' + _color + ',' + _nextColor + ')';
        else
            el.style.background = 'linear-gradient(' + _nextColor + ',' + _color + ')';
    }

    if(_len < 5){
        removeClass(_btn, 'glow');
    }
    else{
        addClass(_btn, 'glow');
    }

    switchInventoryTab(null, 2, 1);
}

function acceptMelt(_force) {
    const _keys = [];
    let _grade;
    let _possibilities = [];
    for(let i = 1; i <= 5; i++) {
        const _place = document.getElementById('melt-' + i);
        const _img = _place.querySelector('img');
        if(_img) {
            const _key = _img.getAttribute('data-key');
            _keys.push(_key);
            const _possibility = _possibilities.find(x => x.key === _key);
            if(_possibility)
                _possibility.value += 20;
            else
                _possibilities.push({key:_key, value:20});
            _grade = parseInt(_img.getAttribute('data-grade'));
        }
        else
            break;
    }
    if(_keys.length < 5) {
        playClick();
        warn('<span>' + getLangData('Need more gem to melt') + '</span>', 'warn');
        return;
    }
    const _key = _keys[getRandomValue2(0, _keys.length - 1)];
    const _g = __gems.find(x => x.key === _key);
    const _hasGrade = _g.grades.find(x=> x.grade === (_grade + 1));
    if(!_hasGrade) {
        playClick();
        warn('<span>' + getLangData('You can not melt more') + '</span>', 'warn');
        return;
    }
    if(!_force && _possibilities.length > 1) {
        let _choices = '';
        for(let _p of _possibilities.sort((a,b) => b.value - a.value))
            _choices += '<div class="flex gem-possibility">' + 
        getGemItemIcon({key:_p.key,count:1,grade:_grade + 1}) +
        '<div class="w-100 flex p-2" style="padding-top:1vh">%' + _p.value + '</div></div>';
        askSomething(
            `<div class="flex w-100 p-2">
                <span style="color:#F4BB44 !important;font-size:3.2vh !important">${getLangData('Different Gems Selected')}</span>
            </div>
            <div class="flex w-100 p-2" style="padding-top:1vh">
                <span style="color:#f3f4f5ab !important;font-size:3vh !important">${getLangData('New gem possibilities')}</span>
            </div>
            <div class="flex gem-possibilities w-100" style="padding:2vh 4%">`
            + _choices +
            `</div>
            <div class="flex w-100" style="padding-top:2vh">
                <span style="color:#f3f4f5cc !important;line-height:2vh !important;font-size:3vh !important">${getLangData('Continue Anyway')}?</span>
            </div>`, 'acceptMelt(1)');
        return;
    }
    else if(_force)
        closeInventoryQuestionModal();
    for(let _k of _keys)
        __account.gems.find(x => x.key === _k && x.grade === _grade).count--;
    updateGem(_key, _grade + 1, 1);
	updateGlobalQuest('melt-gem');
    closeGemInfoModal();
    switchInventoryTab(null, 2);
    PlaySound({ key: 'upgrade', volume: .5, reset: true, force: true });
    warn(`<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="./images/gems/${_key}${_grade + 1}.png" />&nbsp;1x&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">${getLangData('Gem')}</span></div>`, null, null, 1);
}
function closeItemInfoModal(_noSound) {
    removeClass(document.querySelector('#inventory-list'), 'item-info-opened');
    if(!_noSound)
        playClick();
    const _parent = document.querySelector('.item-info-container-parent');
    if(_parent)
        _parent.remove();
}
function closeGemInfoModal(_noSound) {
    const _places = document.querySelectorAll('.melt-place') ?? [];
    for(let _p of _places)
        _p.innerHTML = '';
    switchInventoryTab(null, 2);
    closeCharacterInfoModal(_noSound);
}
function closeCharacterInfoModal(_noSound) {
    if(!_noSound)
        playClick();
    const _parent = document.querySelector('.character-info-container-parent');
    if(_parent)
        _parent.remove();
}
function unWearItem(_id) {
    var _items = getItems();
    var _item = _items.find(x => x.id === _id);
    if(!_item.weared)
        return;
    const _emptySlot = document.querySelector('.item-slot:not([data-item-id])');
    if(!_emptySlot) {
        warn('<span>' + getLangData('No room in inventory') + '</span>', 'warn');
        return;
    }
    const _oldPower = getTotalPower().total;
    delete _item.weared;
    _emptySlot.innerHTML = getItemIcon(_item);
    _emptySlot.setAttribute('data-item-id', _item.id);
    const _slot = document.querySelector('.item-' + _item.type);
    _slot.innerHTML = '';
    PlaySound({ key: 'wear', volume: .3 });
    closeItemInfoModal();
    const _newPower = getTotalPower().total;
    changePower(_oldPower, _newPower);
    resetItemsUI();
    checkUpdateAvailable2(1);
}
function wearStatusItem(_id, _power, _force) {
    if(!_force && mainCharacter.lastItemEquipTime > (_gameTick - 500))
        return;
    if(!_id) { 
        const _child = document.querySelector('.status-item-container .red-action-btn');
        if(_child?.onexactclick)
            _child.onexactclick();
        return;
    }
    wearItem(_id);
    const _parent = document.querySelector('div[data-status-item-id="' + _id + '"]');
    if(_parent)
        _parent.remove();
    const _child = document.querySelector('.status-item-container');
    if(!_child)
        delete mainCharacter.hasAdvicedItem;
    addDmgFrame({
        val: _power,
        img: './images/icons/power-up.png',
        x: mainCharacter.LEFT,
        from:mainCharacter,
        y: episode.cHeight - mainCharacter.yPosition - mainCharacter.HEIGHT
    });
	mainCharacter.addObject({ key: 'hit', position: 'middle', scale:1.2 });
    PlaySound({key:'itemweared', volume:.5, reset: true});
    mainCharacter.lastItemEquipTime = _gameTick;
}
function wearItem(_id) {
    var _items = getItems();
    var _item = _items.find(x => x.id === _id);
    if(_item.weared === mainCharacter.class)
        return;
    const _oldPower = getTotalPower().total;
    var _oldItem = _items.find(x => (x.weared === mainCharacter.class) && x.type === _item.type);
    if(_oldItem?.weared === mainCharacter.class)
        delete _oldItem.weared;
    _item.weared = mainCharacter.class;
    const _slot = document.querySelector('.item-' + _item.type);
    if(_slot) {
        const _oldSlot = document.querySelector('.item-slot[data-item-id="' + _item.id + '"]');
        if(_oldItem) {
            if(_oldSlot){
                _oldSlot.innerHTML = getItemIcon(_oldItem);
                _oldSlot.setAttribute('data-item-id', _oldItem.id);
            }
        }
        else if(_oldSlot)
        {
            _oldSlot.innerHTML = '';
            _oldSlot.removeAttribute('data-item-id');
        }
        _slot.innerHTML = getItemIcon(_item);
    }
    closeItemInfoModal();
    PlaySound({ key: 'wear', volume: .3 });
    const _newPower = getTotalPower().total;
    changePower(_oldPower, _newPower);
    resetItemsUI();
    checkUpdateAvailable2(1);
}
function getItemWrapper(_item) {
    let _wrapper;
    if(!_item.weared)
        _wrapper = document.querySelector('.item-slot[data-item-id="' + _item.id + '"]');
    else
        _wrapper = document.querySelector('#menu-ui .item.item-' + _item.type);
    return _wrapper;
}

function upgradeItem(_id) {
    var _items = getItems();
    var _item = _items.find(x => x.id === _id);
    var _itemProps = _equips[_item.type]['grade' + _item.grade];
    if(_item.level >= mainCharacter.level) {
        warn('<span>' + getLangData('Your level must be higher than or equal to item level') + '</span>', 'warn');
        return;
    }
    if(_item.level >= (_itemProps.maxLevel ?? 1)) {
        warn('<span>' + getLangData('You can not update anymore') + '</span>', 'warn');
        return;
    }
    var updateCost = getItemUpdateCost(_id);
    if(__account.gold < updateCost) {
        warn('<span>' + getLangData('Not enough gold') + '</span>', 'warn');
        return;
    }
    if(!shine(1000, document.querySelector('.item-info-container')))
        return;
    const _oldPower = getTotalPower().total;
    _item.level++;
    for(let _prop of _item.props) {
        const _ep = _itemProps.props.find(x => x.key === _prop.key); 
        _prop.value += _ep.upgrade;
    }
    updateGold(-updateCost);
    //document.querySelector('.account-gold-value').innerText = __account.gold.formatWithDots();
    //closeItemInfoModal();
    closeCharacterInfoModal();
    //openItemInfoModal(_id);
	updateGlobalQuest('update-item');
    document.querySelector('.item-info-container-inner').innerHTML
    = getItemInfoModalHtml(_id);
    const _wrapper = getItemWrapper(_item);
    _wrapper.innerHTML = getItemIcon(_item);
    const _newPower = getTotalPower().total;
    changePower(_oldPower, _newPower);
    resetItemsUI();
    checkUpdateAvailable2(1);
}
function rollbackOldStats(_id) {
    if(!_randomizedOldProps)
        return;
    playClick();
    var _items = getItems();
    var _item = _items.find(x => x.id === _id);
    const _oldPower = getTotalPower().total;
    _item.props = JSON.parse(JSON.stringify(_randomizedOldProps));
    closeItemInfoModal();
    closeCharacterInfoModal();
    openItemInfoModal(_id);
    resetMiscUI();
    const _wrapper = getItemWrapper(_item);
    _wrapper.innerHTML = getItemIcon(_item);
    const _newPower = (_item.weared === mainCharacter.class) ? getTotalPower().total : 0;
    changePower(_oldPower, _newPower);
    resetItemsUI();
    checkUpdateAvailable2(1);
}
function askConfirmNewStats(_id, _noAnimation) {
    const _misc = __account.misc.find(x => x.type === 'ticket-random');
    var _items = getItems();
    var _item = _items.find(x => x.id === _id);
    var oldPropsHTML = renderItemProps({
        type:_item.type, 
        grade:_item.grade,
        level:_item.level,
        props:_randomizedOldProps
    });
    const _oldPower = getPowerOfProps(_randomizedOldProps, _item.type, _item.grade);
    const _newPower = getPowerOfProps(_item.props, _item.type, _item.grade);
    var newPropsHTML = renderItemProps(_item);
    var _retry = _misc?.count > 0;
    let _modal = `<div class="full${_noAnimation ? '' : ' fade-me'} flex inventory-question">
        <div class="inventory-modal random-approve-modal">
            <div class="flex random-stats-container">
                <div class="flex random-stats-wrapper random-stats-old">
                    <div class="flex random-stats-title">${getLangData('Old Version')}</div>
                    <div class="random-stats-card flex flex-ai-start"><div class="w-100 flex">` + oldPropsHTML.replace(/item[-]prop/g, 'item-prop one-line') + `</div></div>
                    <div class="random-stats-gear-score flex flex-jc-start w-100"><span style="color:#9d987f !important">${getLangData("Gear Score")}:</span>&nbsp;${_oldPower.formatWithDots()}</div>
                </div>
                <div class="flex random-stats-wrapper random-stats-new">
                    <div class="flex random-stats-title">${getLangData('New Version')}</div>
                    <div class="random-stats-card flex flex-ai-start"><div class="w-100 flex">` + newPropsHTML.replace(/item[-]prop/g, 'item-prop one-line') + `</div></div>
                    <div class="random-stats-gear-score flex flex-jc-end w-100"><img${_newPower === _oldPower ? ' class="d-none"' : ''} src="./images/icons/${_newPower > _oldPower ? 'upgrade' : 'power-down'}.png" style="opacity:1 !important" /><span style="color:#9d987f !important">${getLangData("Gear Score")}:</span>&nbsp;${_newPower.formatWithDots()}</div>
                </div>
                <div style="position: absolute;width: 5vh;margin-top: 6vh;">
                    <img src="./images/icons/swap-right.png" style="height: 5vh" />
                    <img src="./images/icons/swap-right.png" style="height: 5vh;transform: scale(-1,1);-webkit-transform: scale(-1,1)" />
                </div>
            </div>
            <div class="flex random-stats-question">
                <span style="color:#f7f7f7dd !important;font-size:3vh !important">${getLangData('Choose an action')}</span>
            </div>
            <div style="padding-bottom:2vh" class="flex random-stats-actions">
                <div class="game-menu-button flex animate-me w-100${_retry ? '' : ' disabled'}" style="cursor:pointer;color:#F4BB44 !important;min-width:10vw;min-width:10vw;font-size:3vh !important" onexactclick="closeInventoryQuestionModal();acceptAndRandomizeItem(${_id},1)">${getLangData('RETRY')}</div>
                <div class="game-menu-button flex animate-me w-100" style="cursor:pointer;color:#F4BB44 !important;min-width:10vw;min-width:10vw;font-size:3vh !important" onexactclick="closeInventoryQuestionModal();rollbackOldStats(${_id})">${getLangData('KEEP OLD STATS')}</div>
                <div class="game-menu-button flex animate-me w-100" style="cursor:pointer;color:#F4BB44 !important;min-width:10vw;min-width:10vw;font-size:3vh !important" onexactclick="closeInventoryQuestionModal()">${getLangData('ACCEPT NEW STATS')}</div>
            </div>
        </div>
    </div>`;
    const _div = document.createElement('div');
    _div.innerHTML = _modal;
    document.querySelector('#menu-ui').appendChild(_div.firstChild);
}
function sellMiscItem(_type, _grade) {
    playClick();
    const _item = __account.misc.find(x => x.type === _type  && (!_grade || (_grade && x.grade === _grade)));
    const _miscItem = misc.find(x => x.type === _type);
    let _modal = `<div class="full flex inventory-question">
        <div class="inventory-modal">
            <div style="padding:6vh 2vh 2vh 2vh" class="flex">
                 <span class="flex">
                    <div id="decrease-count-btn" class="game-menu-button flex animate-me disabled" style="margin:0 1vh;cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onexactclick="decreaseSellCount('${_type}', ${_grade})">-</div>
                    &nbsp;<span id="sell-count" style="font-size:3vh !important;color:#f3f4f5 !important">1</span>&nbsp;
                    <div id="increase-count-btn" class="game-menu-button flex animate-me${_item.count > 1 ? '' : ' disabled'}" style="margin:0 1vh;cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onexactclick="increaseSellCount('${_type}', ${_grade})">+</div>          
                </span>
            </div>
            <div style="padding:4vh 2vh" class="flex">
                <span style="color:#f3f4f5cc !important;font-size:3vh !important">${getLangData('Sell this item for')} <b id="misc-sell-cost" style="color:#F3f4f5 !important">${(_miscItem.cost * (_grade ?? 1)).formatWithDots()}</b> <img style="height:2vh" src="./images/icons/coin.png" /></span>
            </div>
            <div style="padding:4vh 2vh" class="flex">
                <div class="game-menu-button flex animate-me" style="cursor:pointer;color:#9d987f;min-width:80px;font-size:3vh !important" onexactclick="acceptMiscSellCount('${_type}', ${_grade})">${getLangData('YES')}</div>
                <div class="game-menu-button flex animate-me" style="cursor:pointer;color:#9d987f;min-width:80px;font-size:3vh !important" onexactclick="closeInventoryQuestionModal()">${getLangData('NO')}</div>
            </div>
        </div>
    </div>`;
    const _div = document.createElement('div');
    _div.innerHTML = _modal;
    document.querySelector('#menu-ui').appendChild(_div.firstChild);
}
function increaseSellCount(_type, _grade) {
    playClick();
    const _item = __account.misc.find(x => x.type === _type && (!_grade || (_grade && x.grade === _grade)));
    const _miscItem = misc.find(x => x.type === _type);
    const _sc = document.getElementById('sell-count');
    let _count = parseInt(_sc.innerText) + 1;
    _sc.innerText = _count;
    if(_count >= _item.count)
        addClass(document.getElementById('increase-count-btn'), 'disabled');
    removeClass(document.getElementById('decrease-count-btn'), 'disabled');
    const _cost = _count * _miscItem.cost * (_grade ?? 1);
    document.getElementById('misc-sell-cost').innerText = _cost.formatWithDots();
}
function decreaseSellCount(_type, _grade) {
    playClick();
    const _miscItem = misc.find(x => x.type === _type);
    const _sc = document.getElementById('sell-count');
    let _count = parseInt(_sc.innerText) - 1;
    _sc.innerText = _count;
    if(_count <= 1)
        addClass(document.getElementById('decrease-count-btn'), 'disabled');
    removeClass(document.getElementById('increase-count-btn'), 'disabled');
    const _cost = _count * _miscItem.cost * (_grade ?? 1);
    document.getElementById('misc-sell-cost').innerText = _cost.formatWithDots();
}
function acceptMiscSellCount(_type, _grade) {
    playClick();
    const _itemIndex = __account.misc.findIndex(x => x.type === _type && (!_grade || (_grade && x.grade === _grade)));
    const _item = __account.misc[_itemIndex];
    const _miscItem = misc.find(x => x.type === _type);
    const _sc = document.getElementById('sell-count');
    const _count = parseInt(_sc.innerText);
    const _cost = _count * _miscItem.cost * (_grade ?? 1);
    updateGold(_cost);
    _item.count -= _count;
    if(_item.count === 0)
        __account.misc.splice(_itemIndex, 1);
    //document.querySelector('.account-gold-value').innerText = __account.gold.formatWithDots();
    closeItemInfoModal();
    closeInventoryQuestionModal();
    _client.saveState();
    switchInventoryTab(null, 3);
}
function useMiscItem(_type, _grade) {
    playClick();
    const _itemIndex = __account.misc.findIndex(x => x.type === _type && (!_grade || (_grade && x.grade === _grade)));
    const _item = __account.misc[_itemIndex];
    const _miscItem = misc.find(x => x.type === _type);
    if(_miscItem.do(_miscItem, _grade)) {
        _item.count--;
        if(_item.count === 0)
            __account.misc.splice(_itemIndex, 1);
        _client.saveState();
    }
    closeItemInfoModal();
    switchInventoryTab(null, 3);
    checkUpdateAvailable2(1);
}
function sellItem(_id, _noSound, _imediateSell) {
    var sellCost = getItemSellCost(_id);
    if(_imediateSell) {
        acceptAndSellItem(_id, sellCost, _noSound);
        return;
    }
    askSomething(`${getLangData('Sell this equipment for')} <b style="margin-left:1vh;color:#F3f4f5 !important">${sellCost.formatWithDots()}</b> <img style="height:2vh" src="./images/icons/coin.png" />`, `acceptAndSellItem(${_id}, ${sellCost})`, _noSound);
}
function askRandomizeItem(_id) {
    askSomething(`${getLangData('Change attributes of this item for')} <b style="margin-left:1vh;color:#F4BB44 !important">1</b> ${getLangData('dice')}`, `acceptAndRandomizeItem(${_id})`);
}
function askAddSlot() {
    playClick();
    const _cost = 10000;
    let _modal = `<div class="full fade-me flex inventory-question inventory-question-add-slot">
        <div class="inventory-modal">
            <div class="flex inventory-modal-title">
                ${getLangData('Enlarge inventory capacity')}
            </div>
            <div class="inventory-question-add-slot-inner flex w-100">
                <div class="inventory-question-add-slot-inner-left flex">
                    <img src="./images/ui/game/bag.png" />
                </div>
                <div class="inventory-question-add-slot-inner-right flex">
                    <div class="flex inventory-question-add-slot-count">
                        <span class="flex flex-jc-start w-100">
                            <div class="flex slot-amount-border">
                                <div id="decrease-slot-btn" class="flex animate-me disabled" onexactclick="decreaseSlotAmount()"><img src="./images/ui/game/arrow-left.png" /></div>
                                <div id="slot-amount">10</div>
                                <div id="increase-slot-btn" class="flex animate-me" onexactclick="increaseSlotAmount()"><img src="./images/ui/game/arrow-right.png" /></div>          
                            </div>
                        </span>
                    </div>
                    <div class="flex inventory-question-add-slot-cost flex-jc-start w-100">
                        <span class="flex">${getLangData('Cost')}:<span id="slot-cost">${_cost.formatWithDots()}</span><img src="./images/icons/coin.png" style="height:3vh" /></span>
                    </div>
                </div>
            </div>
            <div class="flex new-game-menu-buttons">
                <div class="new-game-menu-button flex animate-me" onexactclick="closeInventoryQuestionModal()">${getLangData('NO')}</div>
                <div class="new-game-menu-button flex animate-me" onexactclick="acceptInventorySlot()">${getLangData('YES')}</div>
            </div>
        </div>
    </div>`;
    const _div = document.createElement('div');
    _div.innerHTML = _modal;
    const parentEl = document.querySelector('#menu-ui');
    (parentEl ?? _gameUI).appendChild(_div.firstChild);
}
function selectAvatarImage(_order) {
    const _item = document.querySelector('.avatar-image' + _order);
    if(_item) {
        playClick();
        const _items = document.querySelectorAll('.avatar-item');
        if(_items)
            _items.forEach(x => removeClass(x, 'selected'));
        addClass(_item, 'selected');
        const _selectionWrapper = document.querySelector('.avatar-selection-inner');
        _selectionWrapper.setAttribute('data-selected', _order.toString());
    }
}
function chooseAvatar() {
    const _selectionWrapper = document.querySelector('.avatar-selection-inner');
    const _order = _selectionWrapper.getAttribute('data-selected');
    const _tba = document.querySelector('.top-bar-avatar');
    if(_tba)
        _tba.src = './images/ui/game/avatars/avatar' + _order + '.png';
    closeInventoryQuestionModal();
    __account.avatarOrder = _order;
    _client.saveState();
}
function askAvatar() {
    playClick();
    let _avatarHTML = '';
    for(let i = 1; i < 22; i++) 
        _avatarHTML += `<div onexactclick="selectAvatarImage(${i})" class="avatar-image${i} flex avatar-item"><img src="./images/ui/game/avatars/avatar${i}.png" /></div>`;
    let _modal = `<div data-singleton-key="modal_7x4" class="full fade-me flex inventory-question show-ui avatars-container">
        <div class="inventory-modal">
            <div class="flex inventory-modal-title">
                ${getLangData('Choose Your Avatar')}
            </div>
            <div class="avatar-selection-inner flex w-100">`
               + _avatarHTML + 
            `</div>
            <div class="flex new-game-menu-buttons">
                <div class="new-game-menu-button flex animate-me" onexactclick="closeInventoryQuestionModal()">${getLangData('IGNORE')}</div>
                <div class="new-game-menu-button flex animate-me" onexactclick="chooseAvatar()">${getLangData('ACCEPT')}</div>
            </div>
        </div>
    </div>`;
    const _div = document.createElement('div');
    _div.innerHTML = _modal;
    const parentEl = document.querySelector('#menu-ui');
    (parentEl ?? _gameUI).appendChild(_div.firstChild);
}
const _selectionItems = [];
function useItemSelectionTicket(_level) {
    _selectionItems.length = 0;
    for(let _it of itemTypes)
        _selectionItems.push(getSpecificItem(_it.key, _level));
    let _choices = '';
    for(let _item of _selectionItems)
        _choices += `<div class="selection-item" onexactclick="selectSelectionItem(${_item.id}, this)" style="width:17%;aspect-ratio:1/1;position:relative;cursor:pointer">
            <img src="./images/items/icons/${(_item.for ? (_item.for + '/') : '')}${_item.type}${_item.grade}.png" class="full grade${_item.grade}-item${_item.grade > 5 ? ' glow' : ''}" />
        </div>`;
    let _modal = `<div class="full fade-me flex inventory-question">
        <div class="inventory-modal">
            <div style="padding:6vh 4vh 4vh 4vh" class="flex">
                <span style="color:#f7f7f7dd !important;font-size:3vh !important">${getLangData('Choose your gift')}</span>
            </div>
            <div class="flex" style="padding:2vh">`
               + _choices +
            `</div>
            <div style="padding:4vh 2vh" class="flex">
                <div class="game-menu-button flex animate-me" style="cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onexactclick="closeInventoryQuestionModal()">${getLangData('CANCEL')}</div>
                <div id="item-selection-approve-btn" class="game-menu-button flex animate-me disabled" style="cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onexactclick="acceptItemSelection(${_level})">${getLangData('APPROVE')}</div>
            </div>
        </div>
    </div>`;
    const _div = document.createElement('div');
    _div.innerHTML = _modal;
    document.querySelector('#menu-ui').appendChild(_div.firstChild);
}
function useGemSelectionTicket(_level) {
    _selectionItems.length = 0;
    for(let _it of __gems)
        _selectionItems.push({key:_it.key, grade:_level});
    let _choices = '';
    for(let _item of _selectionItems)
        _choices += `<div class="selection-item" onexactclick="selectSelectionItem(null, this)" style="width:17%;aspect-ratio:1/1;position:relative;cursor:pointer">
            <img src="./images/gems/${_item.key + _item.grade.toString()}.png" class="full grade${_item.grade}-item${_item.grade > 5 ? ' glow' : ''}" />
        </div>`;
    let _modal = `<div class="full fade-me flex inventory-question">
        <div class="inventory-modal">
            <div style="padding:6vh 4vh 4vh 4vh" class="flex">
                <span style="color:#f7f7f7dd !important;font-size:3vh !important">${getLangData('Choose your gift')}</span>
            </div>
            <div class="flex" style="padding:2vh">`
               + _choices +
            `</div>
            <div style="padding:4vh 2vh" class="flex">
                <div class="game-menu-button flex animate-me" style="cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onexactclick="closeInventoryQuestionModal()">${getLangData('CANCEL')}</div>
                <div id="item-selection-approve-btn" class="game-menu-button flex animate-me disabled" style="cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onexactclick="acceptGemTicketSelection()">${getLangData('APPROVE')}</div>
            </div>
        </div>
    </div>`;
    const _div = document.createElement('div');
    _div.innerHTML = _modal;
    document.querySelector('#menu-ui').appendChild(_div.firstChild);
}
function selectSelectionItem(_id, _elem) {
    playClick();
    removeClass(document.getElementById('item-selection-approve-btn'), 'disabled');
    const _itemIcons = document.querySelectorAll('.selection-item');
    for(let _ic of _itemIcons) {
        removeClass(_ic, 'selected');
        if(_ic === _elem)
            addClass(_ic, 'selected');
    }
}
function acceptGemTicketSelection() {
    const _itemIcons = document.querySelectorAll('.selection-item');
    for(let _i = 0; _i < _itemIcons.length; _i++) {
        const _item = _itemIcons[_i];
        if(hasClass(_item, 'selected'))
        {
            const _choice = _selectionItems[_i];
            updateGem(_choice.key, _choice.grade, 1);
            //pushItemIntoInventory(_choice);
            const _miscItem = __account.misc.find(x => x.type === 'ticket-gem-selection' && x.grade === _choice.grade);
            _miscItem.count--;
            if(_miscItem.count === 0)
                __account.misc = __account.misc.filter(x => !(x.type === 'ticket-gem-selection' && x.grade === _choice.grade));
            _client.saveState();
            closeInventoryQuestionModal();
            switchInventoryTab(null, 3);
	        PlaySound({key:'bell', volume:.5, reset: true});
            break;
        }
    }
}
function acceptItemSelection(_level) {
    const _itemIcons = document.querySelectorAll('.selection-item');
    for(let _i = 0; _i < _itemIcons.length; _i++) {
        const _item = _itemIcons[_i];
        if(hasClass(_item, 'selected'))
        {
            const _choice = _selectionItems[_i];
            pushItemIntoInventory(_choice);
            const _miscItem = __account.misc.find(x => x.type === 'ticket-item-selection' && x.grade === _level);
            _miscItem.count--;
            if(_miscItem.count === 0)
                __account.misc = __account.misc.filter(x => !(x.type === 'ticket-item-selection' && x.grade === _level));
            _client.saveState();
            closeInventoryQuestionModal();
            switchInventoryTab(null, 3);
            break;
        }
    }
}
function calculateSlotCost(_amount) {
    const _max = parseInt(_amount / 10);
    let _cost = 0;
    for(let _i = __account.slots + 10; _i <= __account.slots + _amount; _i += 10)
        _cost += (((_i - __startSlotAmount) / 10) * 10000);
    return _cost;
}
function increaseSlotAmount() {
    playClick();
    const _sa = document.getElementById('slot-amount');
    let _amount = parseInt(_sa.innerText);
    _amount += 10;
    const _cost = calculateSlotCost(_amount);
    const _sc = document.getElementById('slot-cost');
    _sc.innerText = _cost.formatWithDots();
    if((_amount + __account.slots) >= 200)
        addClass(document.getElementById('increase-slot-btn'), 'disabled');
    removeClass(document.getElementById('decrease-slot-btn'), 'disabled');
    _sa.innerText = _amount;
}
function decreaseSlotAmount() {
    playClick();
    const _sa = document.getElementById('slot-amount');
    let _amount = parseInt(_sa.innerText);
    _amount -= 10;
    const _cost = calculateSlotCost(_amount);
    const _sc = document.getElementById('slot-cost');
    _sc.innerText = _cost.formatWithDots();
    if(_amount <= 10)
        addClass(document.getElementById('decrease-slot-btn'), 'disabled');
    removeClass(document.getElementById('increase-slot-btn'), 'disabled');
    _sa.innerText = _amount;
}
function acceptInventorySlot() {
    const _sa = document.getElementById('slot-amount');
    let _amount = parseInt(_sa.innerText);
    const _cost = calculateSlotCost(_amount);
    if(__account.gold < _cost) {
        playClick();
        warn('<span>' + getLangData('Not enough gold') + '</span>', 'warn');
        return;
    }
    updateGold(-_cost);
    //document.querySelector('.account-gold-value').innerText = __account.gold.formatWithDots();
    PlaySound({ key: 'upgrade', volume: .5, reset: true });
    closeItemInfoModal();
    __account.slots += _amount;
    _client.saveState();
    refreshInventory();
}
function acceptAndSellItem(_id, _cost, _noSound) {
    // if(!_noSound)
    //     PlaySound({ key: 'sell' });
    const _iq = document.querySelector('.inventory-question');
    if(_iq)
        _iq.remove();
    var _items = getItems();
    var _index = _items.findIndex(x => x.id === _id);
    _items.splice(_index, 1);
    updateGold(_cost);
    refreshInventory();
    checkUpdateAvailable2(1);
}
let _randomizedOldProps;
function acceptAndRandomizeItem(_id, _noAnimation) {
    const _iq = document.querySelector('.inventory-question');
    if(_iq)
        _iq.remove();
    const _miscIndex = __account.misc.findIndex(x => x.type === 'ticket-random');
    if(_miscIndex === -1) {
        warn('<span>' + getLangData('Not enough ticket') + '</span>', 'warn');
        return;
    }
    var _items = getItems();
    var _index = _items.findIndex(x => x.id === _id);
    var _item = _items[_index];
    const _oldPower = (_item.weared === mainCharacter.class) ? getTotalPower().total : 0;
    _randomizedOldProps = JSON.parse(JSON.stringify(_item.props));
    _item.props = getRandomProps(_item.type, _item.grade, _item.level);
    const _ticket = __account.misc[_miscIndex];
    if(_ticket?.count > 1)
        _ticket.count--;
    else
        __account.misc.splice(_miscIndex, 1);
    PlaySound({ key: 'upgrade', volume: .5, reset: true });
    closeItemInfoModal();
    closeCharacterInfoModal();
    openItemInfoModal(_id);
    resetMiscUI();
    const _wrapper = getItemWrapper(_item);
    _wrapper.innerHTML = getItemIcon(_item);
    const _newPower = (_item.weared === mainCharacter.class) ? getTotalPower().total : 0;
    changePower(_oldPower, _newPower);
    resetItemsUI();
    askConfirmNewStats(_id, _noAnimation);
    checkUpdateAvailable2(1);
}
function resetMiscUI() {
    const _tabs = document.querySelectorAll('.inventory-tab');
    if(hasClass(_tabs[2], 'selected'))
        switchInventoryTab(null, 3);
}
function resetGemsUI() {
    const _tabs = document.querySelectorAll('.inventory-tab');
    if(hasClass(_tabs[1], 'selected'))
        switchInventoryTab(null, 2);
}
function resetItemsUI() {
    const _tabs = document.querySelectorAll('.inventory-tab');
    if(hasClass(_tabs[0], 'selected'))
        switchInventoryTab(null, 1);
}
function closeInventoryQuestionModal(_noSound) {
    var _qm = document.querySelector('.inventory-question');
    if(_qm) {
        if(!_noSound)
            playClick();
        _qm.remove();
        return true;
    }
    return false;
}
var powerDiffTimer, _lastNewStats;
function changePower(_old, _new) {
    const _diff = _new - _old;
    const _uiElem = document.querySelector('.character-total-power');
    if(_uiElem) {
        if(powerDiffTimer) {
            clearInterval(powerDiffTimer);
            powerDiffTimer = null;
            if(_lastNewStats !== undefined)
                _uiElem.innerText = _lastNewStats.formatWithDots();
            removeClass(_uiElem, 'power-up-text');
            removeClass(_uiElem, 'power-down-text');
        }
        _lastNewStats = _new;
        if(_diff > 0)
            addClass(_uiElem, 'power-up-text');
        else if(_diff < 0)
            addClass(_uiElem, 'power-down-text');
        else
            return;
        let _step = _diff / 10;
        let _counter = 10;
        powerDiffTimer = setInterval(function() {
            _old += _step;
            if(_old < 0)
                _old = 0;
            _counter--;
            PlaySound({ key: 'count', reset: true, volume:.5 });
            if(_counter <= 0) {
                clearInterval(powerDiffTimer);
                powerDiffTimer = null;
                _uiElem.innerText = _new.formatWithDots();
                removeClass(_uiElem, 'power-up-text');
                removeClass(_uiElem, 'power-down-text');
                _lastNewStats = undefined;
            }
            else
                _uiElem.innerText = MathRound(_old).formatWithDots();
        }, 100);
    }
    applyCharacterStats(1);
    var _ass = document.getElementById('avarage-stats-screen');
    if(_ass) {
        const _power = getTotalPower();
        _ass.innerHTML = getAvarageStatsScreenUI(_power);
    }
    _client.saveState();
}
const _chestRewards = [
    { minRate:1, maxRate: 10, key: 'item' },
    { minRate:11, maxRate: 25, key: 'ticket' },
    { minRate:26, maxRate: 40, key: 'gem' },
    { minRate:41, maxRate: 60, key: 'gold' },
    { minRate:61, maxRate: 80, key: 'misc' },
    { minRate:81, maxRate: 100, key: 'pot' },
];
function getChestReward(_grade, _rewardKey, _rewardType, _count, _fromMail) {
    const _val = getRandomValue2(1, 100);
    const _reward = _rewardKey ? { key: _rewardKey } : _chestRewards.find(x => x.minRate <= _val && x.maxRate >= _val);
    switch(_reward.key) {
        case 'item':
            {
                const _type = _rewardType ?? itemTypes[getRandomValue2(0, itemTypes.length - 1)];
                const _item = _fromMail ?? getRandomItem(_grade, _type.key);
                let _src;
                if(_item.type === 'weapon')
                {
                    if(!_item.for){
                        var _class = getRandomValue2(1, Object.keys(_allEnemies).filter(x => x.startsWith('enemy0')).length);
                        _item.for = _allEnemies['enemy0' + _class]().class;
                    }
                    _src = './images/items/icons/' + _item.for + '/' + _item.type + _item.grade.toString() + '.png';
                }
                else
                    _src = './images/items/icons/' + _item.type + _item.grade.toString() + '.png';
                if(!pushItemIntoInventory(_item, _fromMail ? 1 : undefined))
                    return undefined;
                return {
                    type: _item.type,
                    src: _src,
                    level: 1,
                    grade: _grade
                };
            }
        case 'gold':
            {
                const _max = _grade * 5000;
                const _min = parseInt(_max / 2);
                const _val = _count ?? getRandomValue2(_min, _max);
                updateGold(_val);
                return {
                    type: 'gold',
                    title: 'Gold',
                    src: './images/icons/gold.png',
                    count: _val
                }
            }
        case 'ticket':
            {
                const _tixCount = _count ?? (_grade ?? 1);
                updateTicket(_tixCount);
                return {
                    title: getLangData('Portal'),
                    type: 'ticket',
                    src: './images/icons/key.png',
                    count: _tixCount
                }
            }
        case 'exp':
            {
                const _max = _grade * 1000;
                const _min = parseInt(_max / 2);
                const _val = _count ?? getRandomValue2(_min, _max);
                updateExperience(_val);
                return {
                    type: 'exp',
                    src: './images/icons/exp.png',
                    count: _val
                }
            }
        case 'pot':
            {
                const _gr = _grade ?? 1;
                let _val = _count ?? _gr;
                if(_val < _gr)
                    _val = _gr;
                updatePot(_val, null, 1);
                return {
                    type: 'pot',
                    title: getLangData('Potion'),
                    src: './images/icons/pot.png',
                    count: _val
                }
            }
        case 'fragment':
            {
                const _type = (_rewardType?.key && _rewardType?.name)
                ? _rewardType : __fragments[getRandomValue2(0, __fragments.length - 1)];
                const _val = _count ?? getRandomValue2(1, 5);
                const _f = __account.fragments.find(x => x.key === _type.key);
                if(!__account.fragments)
                    __account.fragments = [];
                if(_f)
                    _f.count += _val;
                else 
                    __account.fragments.push({key:_type.key, grade:0, count:_val});
                _client.saveState();
                return {
                    title: _type.name,
                    type: 'fragment-' + _type.key,
                    src: './images/fragments/' + _type.key + '.png',
                    count: _val
                }
            }
        case 'gem':
            {
                const _type = (_rewardType?.type ?? _rewardType)
                ? ({ key: _rewardType?.type ?? _rewardType }) : __gems[getRandomValue2(0, __gems.length - 1)];
                const _val = _count ?? 1;
                if(!_grade)
                    _grade = 1;
                updateGem(_type.key, _grade, _val);
                return {
                    title: _type.titles[getLang()],
                    type: _type.key,
                    src: './images/gems/' + _type.key + _grade.toString() + '.png',
                    count: _val
                }
            }
        case 'misc':
            {
                const _misc = _rewardType ? misc.find(x => x.type === _rewardType) : misc[getRandomValue2(0, misc.length -1)];
                const _val = _count ?? 1;
                if(_misc.graded)
                    updateMisc({ type: _misc.type, count: _val, grade: _grade ?? 1 });
                else
                    updateMisc({ type: _misc.type, count: _val });
                const _result = {
                    type: _misc.type,
                    title: _misc.titles[getLang()],
                    src: './images/icons/' + _misc.type + '.png',
                    count: _val
                };
                if(_misc.graded)
                    _result.grade = _grade ?? 1;
                return _result;
            }
    }
}
function warnChestReward(_cr) {
    if(!_cr)
        return;
    var _crTitle = getLangData(_cr.title ?? _cr.type);
    PlaySound({key: 'chestreward', volume: .3, reset: true });
    _crTitle = _crTitle.charAt(0).toLocaleUpperCase(getLang()) + _crTitle.substring(1);
    warn('<div class="flex achievement important" style="position:relative"><img style="height:12vh" src="' + _cr.src + '" />&nbsp;' + (_cr.count ?? 1).formatWithDots() + 'x&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + _crTitle + '</span></div>', null, null, 1);
}
function getRewardIcon(_grade,_rewardKey, _rewardType) {
    switch(_rewardKey) {
        case 'item':
            {
                const _item = getRandomItem(_grade, _rewardType);
                let _src;
                if(_item.type === 'weapon')
                {
                    _item.for = episode.realClass ?? mainCharacter.class;
                    _src = './images/items/icons/' + _item.for + '/' + _item.type + _item.grade.toString() + '.png';
                }
                else
                    _src = './images/items/icons/' + _item.type + _item.grade.toString() + '.png';
                return {
                    type: _item.type,
                    src: _src,
                    level: 1,
                    grade: _grade
                };
            }
        case 'ticket':
            {
                return {
                    type: 'ticket',
                    src: './images/icons/key.png'
                }
            }
        case 'fragment':
            {
                return {
                    type: _rewardType,
                    src: './images/fragments/' + _rewardType + '.png'
                }
            }
         case 'gem':
            {
                return {
                    type: _rewardType,
                    src: './images/gems/' + _rewardType + _grade.toString() + '.png'
                }
            }
        case 'misc':
            {
                const _misc = misc.find(x => x.type === _rewardType);
                return {
                    type: _misc.type,
                    src: './images/icons/' + _misc.type + '.png'
                };
            }
        default:
            {
                return {
                    type: _rewardKey,
                    src: './images/icons/' + _rewardKey + '.png'
                }
            }
    }
}
Number.prototype.formatWithDots = function() {
    var _num = this.toString();
    var _result ='', _count = 0;
    for(let _i = _num.length - 1; _i >= 0; _i--) {
        _result = _num[_i] + _result;
        _count++;
        if((_count % 3) === 0 && _count < _num.length)
            _result = '.' + _result;
    }
    return _result;
}
String.prototype.toTitleCase = function() {
    if(this.length > 0)
        return this[0].toString().toLocaleUpperCase(getLang()) + this.substring(1);
    return this;
}