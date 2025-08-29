'use strict';
const __properties = [
	{ order:1, base: "maxHP", key: "hp", titles: { en: "Health", tr: "Sağlık" }, group: 'def'},
	{ order:2, key: "def", titles: { en: "Defense", tr: "Defans" }, group: 'def' },
	{ order:3, key: "crit-resist-rate", titles: { en: "Critical Rate Resist", tr: "Kritik Oran Direnci" }, group: 'def' },
	{ order:4, key: "crit-dmg-resist-rate", titles: { en: "Critical Damage Resist", tr: "Kritik Hasar Direnci" }, group: 'def' },
	{ order:5, key: "fire-resist-rate", titles: { en: "Fire Resist", tr: "Alev Direnci" }, group: 'def', color: '#ff6c00' },
	{ order:6, key: "ice-resist-rate", titles: { en: "Ice Resist", tr: "Buz Direnci" }, group: 'def', color: '#00c4ff' },
	{ order:7, key: "lightning-resist-rate", titles: { en: "lightning Resist", tr: "Işık Direnci" }, group: 'def', color: '#FFEA00' },
	{ order:8, key: "toxic-resist-rate", titles: { en: "Toxic Resist", tr: "Zehir Direnci" }, group: 'def', color: '#AAFF00' },
	{ order:9,key: "phsycal-resist-rate", titles: { en: "Physical Resist", tr: "Fiziksel Saldırı Direnci" }, group: 'def', color: '#FFFFFF' },

	{ order:1, key:"atk", titles: { en: "Attack", tr: "Atak" }, group: 'atk' },
	{ order:2, key: "pierce-rate", titles:{ en: "Defense Pierce", tr: "Defans Delme" }, group: 'atk' },
	{ order:3, base: "critRate", key: "crit-rate", titles: { en: "Critical Rate", tr: "Kritik Oranı" }, group: 'atk' },
	{ order:4, key: "crit-dmg-rate", titles: { en: "Critical Damage", tr: "Kritik Hasar" }, group: 'atk' },
	{ order:5, key: "fire-dmg", titles: { en: "Fire Damage", tr: "Alev Hasarı" }, group: 'atk', color: '#ff6c00' },
	{ order:6, key: "ice-dmg", titles: { en: "Ice Damage", tr: "Buz Hasarı" }, group: 'atk', color: '#00c4ff' },
	{ order:7, key: "lightning-dmg", titles: { en: "Lightning Damage", tr: "Işık Hasarı" }, group: 'atk', color: '#FFEA00' },
	{ order:8, key: "toxic-dmg", titles: { en: "Toxic Damage", tr: "Zehir Hasarı" }, group: 'atk', color: '#AAFF00' },
	{ order:9,key: "phsycal-dmg", titles: { en: "Physical Damage", tr: "Fiziksel Hasar" }, group: 'atk', color: '#FFFFFF' },
	{ order:10, key: "steal-rate", titles: { en: "Steal Rate",  tr: "Sağlık Çalma Oranı" }, group: 'atk' },

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
    document.getElementById('book-content-1')
    .innerHTML = renderInventory();
}
let _sortDirection;
function sortItems() {
    episode.playSound({ key: 'click' });
    _sortDirection = _sortDirection ? 0 : 1;
    refreshInventory();
}
function askAutoWearItems() {
    askSomething('Auto wear best items', "autoWearItems()");
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
    //document.getElementById('book-content-1').innerHTML = this.render();
    refreshInventory();
    if(_hasChange) {
        episode.playSound({ key: 'wear', volume: .3 });
        const _newPower = getTotalPower().total;
        changePower(_oldPower, _newPower);
    }
    else {
        episode.playSound({ key: 'click' });
        warn('<span>' + getLangData('Nothing better to wear yet') + '</span>', 'warn');
    }
}
function getAvarageStatsScreenUI(_power) {
    return `
        <div class="flex" style="justify-content:center;width:33.3%;padding:0 .5vh"><img src="./images/icons/sword.png" style="height:4vh" />&nbsp;<span style="font-weight:600;color:#f7f7f7!important;font-size:3vh!important">${_power.atk.formatWithDots()}</span></div>
        <div class="flex" style="justify-content:center;width:33.3%;padding:0 .5vh"><img src="./images/icons/shield.png" style="height:4vh" />&nbsp;<span style="font-weight:600;color:#f7f7f7!important;font-size:3vh!important">${_power.def.formatWithDots()}</span></div>
    `;
}
function renderInventory(_tab) {
    const _gears = getItems();
    const _power = getTotalPower();
    const _wearedItems = _gears.filter(x => x.weared === mainCharacter.class);
    let _html = `<div class="flex full inventory-screen need-money">
        <div style="width:50%;height:100%;padding:4.5% 0 4.5% 8%;position:relative" id="character-screen">
            <div class="full flex" style="position:relative;box-shadow:inset 0 0 2vh #262626;background:url(./images/icons/warrior-inv.png), radial-gradient(#fff, #fff, ${mainCharacter.color}, #000);background-repeat:no-repeat;background-size:contain;background-position:center;border:2vh solid #5d5a49;border-right-width:.8vh;border-top-left-radius:1.6vh;border-bottom-left-radius:1.6vh">
                <div id="avarage-stats-screen" class="flex" style="opacity:.75;position:absolute;bottom:.25vh;left:0;width:100%;height:10%;background:#000">`
                 + getAvarageStatsScreenUI(_power) +  
               `</div>
                <div class="game-menu-button btn-info flex animate-me" style="cursor:pointer;color:#F4BB44 !important;line-height:4.6vh!important;font-size:3vh!important" onclick="openCharacterInfoModal()">${getLangData('INFO')}</div>
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
                <div style="position:absolute;width:80%;height:5.6vh;margin-bottom:1vh;background:url(./images/icons/power-bg.png);
background-size:contain;background-position:center;background-repeat:no-repeat;bottom:10%" class="flex">
<div style="text-shadow:0 0 .5vh #000;font-weight:600;height:100%;position:relative" class="flex">
<span class="character-total-power animate-me" style="color:#f7f7f7!important;font-size:3vh!important;margin-top:.5vh;font-weight:600">${_power.total.formatWithDots()}</span></div></div>
</div></div><div style="width:50%;height:100%;padding:4.5% 8% 4.5% 0;position:relative" id="inventory-list">
    <div style="width:100%;height:6vh;background:#5d5a49;padding:1vh;border-top-right-radius:1.6vh" class="flex">
    <div onclick="switchInventoryTab(this, 1)" class="flex animate-me inventory-tab selected" style="width:33%;height:100%">${getLangData('Item')}</div>
    <div onclick="switchInventoryTab(this, 2)" class="flex animate-me inventory-tab" style="width:33%;height:100%;border-left: .55vh solid">${getLangData('Gem')}</div>
    <div onclick="switchInventoryTab(this, 3)" class="flex animate-me inventory-tab" style="width:34%;height:100%;border-left: .55vh solid">${getLangData('Misc')}</div>
</div><div style="box-shadow:.2vh -.2vh .2vh #5d5a49;width:100%;height:calc(100% - 12vh);border-bottom-right-radius:1.6vh;padding:.4vh 0 0 0;background:#5d5a49"><div id="inventory-slots" class="full flex" style="overflow-y:auto">`;
    _html += getInventoryTabContent() + `</div></div><div class="flex flex-jc-end" style="width:100%;height:6vh;background:#5d5a49;border-top:.4vh solid #ffffff40;box-shadow: 0 -.8vh 2.4vh #000">
    <div style="height:100%;flex:1" class="w-100 flex flex-jc-end">
        <div class="game-menu-button flex animate-me${__account.slots >= 200 ? ' disabled' : ''}" style="padding:0;aspect-ratio:13/10;cursor:pointer;color:#F4BB44 !important;font-size:3vh !important;margin:0 .5vh" onclick="askAddSlot()">+</div>
        <div class="game-menu-button flex animate-me" style="padding:0;aspect-ratio:13/10;cursor:pointer;color:#F4BB44 !important;font-size:2.6vh !important;margin:0 .5vh" onclick="sortItems()"><img style="height:2vh" src="./images/icons/sort.png" /></div>
        <div class="game-menu-button flex animate-me" style="padding:0;aspect-ratio:13/10;cursor:pointer;color:#F4BB44 !important;font-size:2.6vh !important;margin:0 .5vh" onclick="askFilterSellItems()"><img style="height:3vh" src="./images/icons/sell.png" /></div>
        <div class="game-menu-button flex animate-me" style="padding:0;aspect-ratio:13/10;cursor:pointer;color:#F4BB44 !important;font-size:2.6vh !important;margin:0 .5vh" onclick="askAutoWearItems()"><img style="height:3vh" src="./images/icons/wear.png" /></div>
    </div>
    <div style="position:relative;height:80%" class="flex d-none"><img style="height:60%" src="./images/icons/coin.png" /><div style="font-size:2.6vh !important;font-weight:600;padding:0 1.6vh 0 .8vh;text-shadow:0 0 #000;color:#F7f7f7cc !important" class="d-none account-gold-value">${__account.gold.formatWithDots()}</div></div>
    </div>
        </div>
    </div>`;
    return _html;
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
    const _sc = _uc / 10;
    if(_sc <= 0)
        return 10;
    return _sc;
}
function sellItems() {
    const _choices = document.querySelectorAll('.inventory-question .sell-choice.selected');
    if(!_choices?.[0]) {
        episode.playSound({ key: 'click' });
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
    //episode.playSound({ key: 'sell' });
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
        _html += `<div onclick="selectFilterGrade(this)" class="flex sell-choice flex-jc-start animate-me" data-key="${_grade}"><div class="sell-choice-left flex animate-me"></div><div class="sell-choice-right flex grade${_grade}">${getLangData(_grade > 0 ? 'Grade' : 'All') + (_grade > 0 ? ' ' + _grade : '')}</div></div>`;
    episode.playSound({ key: 'click' });
    let _modal = `<div class="full flex inventory-question">
        <div class="inventory-modal">
            <div style="padding:6vh 4vh 4vh 4vh" class="flex">
                <div class="flex w-100" style="color:#f7f7f7dd !important;font-size:3vh !important">${getLangData('Group sell items')}</div>
                <div class="flex w-100" style="padding:1vh"><span style="font-size:2.8vh !important;color:#f7f7f7ab !important">${getLangData('Total')}: <span id="total-group-sell-cost">0</span> <img style="height:2.6vh" src="./images/icons/coin.png" /></span></div>
            </div>
            <div style="padding:6vh 4vh 4vh 4vh" class="flex">`
                + _html +
            `</div>
            <div style="padding:4vh 2vh" class="flex">
                <div class="game-menu-button flex animate-me" style="cursor:pointer;color:#F4BB44 !important;min-width:10vw;font-size:3vh !important" onclick="sellItems()">${getLangData('SELL')}</div>
                <div class="game-menu-button flex animate-me" style="cursor:pointer;color:#F4BB44 !important;min-width:10vw;font-size:3vh !important" onclick="closeInventoryQuestionModal()">${getLangData('SKIP')}</div>
            </div>
        </div>
    </div>`;
    const _div = document.createElement('div');
    _div.innerHTML = _modal;
    document.querySelector('.my-pop-up-wrapper:has(.my-pop-up)').appendChild(_div.firstChild);
}
function getMiscItemIcon(_item) {
    if(!_item)
        return '';
    let _level = '';
    if(_item.count > 1)
        _level = '<span style="bottom:-.8vh;right:-.8vh;position:absolute;display:inline-block;padding:0 .8vh;color:#f7f7f7cc !important;font-size:2vh !important;background:#262626">' + _item.count + '</span>';
    return '<span class="full' + (_item.grade !== undefined ? ' grade' + _item.grade + '-item' : '') + '" style="display:inline-block;position:relative"><img style="background:#010101" onclick="openMiscItemInfoModal(\'' + _item.type + '\', ' + _item.grade + ')" class="item-img" src="./images/icons/' + _item.type + '.png"/>' + _level +
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
            _diffIconHtml = '<img class="d-s" src="./images/icons/power-down.png" style="z-index:2;top:-.25vh;left:-.25vh;position:absolute;height:2.5vh" />';
        else if(_diff > 0)
            _diffIconHtml = '<img class="d-s" src="./images/icons/power-up.png" style="z-index:2;top:-.25vh;left:-.25vh;position:absolute;height:2.5vh" />';
    }
    // if(!_item.level || _item.level <= 1)
    //     _item.level = getRandomValue(1, 20);
    if(_item.level > 1)
        _level = '<span class="item-level-badge" style="color:#f7f7f7cc !important">' + _item.level + '</span>';
    return _diffIconHtml + '<span class="full grade' + _item.grade + '-item" style="display:inline-block;position:relative"><img style="background:#010101" onclick="openItemInfoModal(' + _item.id + ')" class="item-img" src="./images/items/icons/' + (_item.for ? (_item.for + '/') : '') + _item.type + _item.grade + '.png"/>' + _level +
    (_item.new ? '<div style="z-index:2;height:2vh;width:2vh;top:-.5vh;right:-.5vh;position:absolute;background:darkred;border-radius:100%"></div>' : '') + '</span>';
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
    for(let _i = 1; _i <= _grade;) {
        var _prop = _props[getRandomValue2(0, _props.length - 1)];
        if(_chosenPropKeys.indexOf(_prop.key) === -1) {
            _chosenPropKeys.push(_prop.key);
            //var _val = getRandomValue((1 + _grade) + (_grade * 20), (1 + _grade) + (_grade * 20) + ((_grade + 1) * 20));
            var _val = getRandomValue2(_prop.min, _prop.max);
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
function pushItemIntoInventory(_item) {
    var _items = getItems();
    if(__account.slots <= _items.filter(x => !x.weared).length) {
        warn('<span>' + getLangData('No room in inventory') + '</span>', 'warn');
        return false;
    }
    _item.new = 1;
    _items.push(_item);
    episode.playSound({ key: 'item' });
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
    return { id: getRandomValue2(1000000000, 9999999999),
        grade: _grade,
        type: _t,
        for: _t === 'weapon' ? (_class ?? mainCharacter.class) : undefined,
        level: 1,
        //baseProps: _baseProps,
        props: getRandomProps(_t, _grade)
    };
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
    for(let _w of _weared)
        for(let _prop of _w.props){
            const _p = __properties.find(x => x.key === _prop.key);
            if(!_p.group)
                continue;
            const _ep = _equips[_w.type]['grade' + _w.grade].props.find(x => x.key === _prop.key); 
            _rates[_p.group] += parseFloat(_prop.value * _ep.power);
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
    return _power;
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
    var _items = getItems()?.filter(x => !x.weared) ?? [];
    for(const _item of _items) {
        let _push = false;
        const _uc = getItemUpdateCost(_item.id);
        if(_uc > 0 && _uc <= __account.gold)
            _push = true;
        else if(getPowerDiffAgainstWearedOne(_item.id) > 0)
            _push = true;
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
function switchInventoryTab(_elem, _order) {
    if(!_elem)
        _elem = document.querySelector('.inventory-tab.selected');
    else if(hasClass(_elem, 'selected'))
        return;
    else
        episode.playSound({ key: 'switch' });
    const _tabs = document.querySelectorAll('.inventory-tab');
    for(let _tab of _tabs){
        removeClass(_tab, 'selected');
        if(_tab === _elem)
            addClass(_tab, 'selected');
    }
    const _slots = document.getElementById('inventory-slots');
    switch(_order) {
        case 1:
            _slots.innerHTML = getInventoryTabContent();
            break;
        case 2:
            _slots.innerHTML = getGemTabContent();
            break;
        case 3:
            _slots.innerHTML = getMiscTabContent();
            break;
    }
}
function getGemTabContent() {
    return '<div class="flex full" style="font-size:3vh;background:#262626;color:#ff6c00!important">' + getLangData('Coming Soon') + '</div>';
}
function getMiscTabContent() {
    let _html = '';
    const _items = __account.misc.sort((a, b) => a.type - b.type);
    for(let _i = 0; _i < __account.slots; _i++){
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
function getInventoryTabContent() {
    const _gears = getItems();
    let _html = '';
    const _items = _gears.filter(x => !x.weared).sort((a, b) => _sortDirection ? (getPowerDiffAgainstWearedOne(a.id) - getPowerDiffAgainstWearedOne(b.id)) : (getPowerDiffAgainstWearedOne(b.id) - getPowerDiffAgainstWearedOne(a.id)));
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
function openItemInfoModal(_id) {
    episode.playSound({ key: 'click' });
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
    var _props = '<div class="flex" style="width:100%;height:30%"><div style="height:100%;color:#f7f7f7 !important;font-size:3vh!important">' + getLangData('Gear Score') + ': ' + parseInt(_power).formatWithDots() + _powerDiffHtml + '</div></div>';
       
    if(_item.for && (_item.for !== mainCharacter.class))
        _props += '<div class="item-prop flex" style="font-size:3vh!important;width:100%;height:25%;color:#f7f7f7ab !important">' + getLangData(_item.for).toProperCase() + ' item</div>';
    _props += renderItemProps(_item);
    _props += '<div class="item-prop flex flex-jc-end" style="padding:1vh 5%;font-size:2.6vh!important;width:100%;height:25%;color:#f7f7f799 !important">Cost: <span style="color:#f7f7f7cc !important">' + sellCost.formatWithDots() + '</span> <img style="height:2vh" src="./images/icons/coin.png" /></div>';
    //Item Grade
    //Item Type
    //Item Update Level
    //Item Power
    //Item Pic
    //Item Stats
    //Item Power Difference
    //Item Update Cost
    var _html = `<div class="full item-info-container-parent" style="z-index:2;position:absolute;padding:4.5% 8% 4.5% 0;top:0;left:0;margin:4% 6% 4% 0;width:94%;height:92%">
    <div class="full flex item-info-container" style="position:relative;overflow:hidden;background:radial-gradient(#262626, #000);border-radius:1.6vh;border:.4vh solid darkgoldenrod">
        <div class="flex" style="width:100%;height:10%">
            <div style="width:10%;height:100%"></div>
            <div style="height:100%;width:80%" class="flex">
                <div class="one-line" style="font-size:3.2vh !important;line-height:100%;font-weight:600;color:#F4BB44 !important">Lvl ${_item.level ?? 1} - ${getLangData(_item.type).toLocaleUpperCase(getLang())}</div>
            </div>
            <div style="width:10%;height:100%" class="flex"></div>
        </div>
        <div style="height:20%;width:100%" class="flex">
            <div style="height:80%;aspect-ratio:1/1;position:relative">
                <img src="./images/items/icons/${(_item.for ? (_item.for + '/') : '')}${_item.type}${_item.grade}.png" class="full grade${_item.grade}-item${_item.grade > 5 ? ' glow' : ''}" />
                <div class="grade-letter" style="position:absolute;font-size:7vh !important;bottom:-.6vh;right:-3.6vh;transform:rotate(-8deg);-webkit-transform:rotate(-8deg)">${getItemGradeLetter(_item.grade)}</div>
            </div>
        </div>
        <div style="width:100%;height:40%;overflow-y:auto">
            <div class="flex flex-jc-start flex-ai-start">
                ${_props}
            </div>
        </div>
        <div class="flex" style="width:100%;height:20%">
            <div class="game-menu-button animate-me flex${hasMaterial('ticket-random') ? '' : ' disabled'}" style="width:90%;height:40%" onclick="askRandomizeItem(${_id})"><div class="flex" style="height:80%;color:#F4BB44 !important;font-size:3vh !important">${getLangData('RANDOMIZE')} (1&nbsp;<img style="height:3vh" src="./images/icons/ticket-random.png" />&nbsp;)</div></div>
            <div class="game-menu-button animate-me flex${_itemProps.maxLevel > _item.level ? '' : ' disabled'}" style="width:90%;height:40%" onclick="upgradeItem(${_id})"><div class="flex" style="height:80%;color:#F4BB44 !important;font-size:3vh !important">${getLangData('UPDATE')}` + (updateCost > 0 ? ` (${updateCost.formatWithDots()} <img style="height:3vh" src="./images/icons/coin.png" />)` : '') + `</div></div>
        </div>
        <div class="flex" style="width:100%;height:10%;justify-content:space-evenly">
            <div class="game-menu-button animate-me flex${(_item.weared === mainCharacter.class) ? ' disabled' : ''}" style="width:42.5%;height:80%;color:#F4BB44 !important;font-size:3vh !important" onclick="sellItem(${_id})">${getLangData('SELL')}</div>
            <div class="game-menu-button animate-me flex${(_item.weared === mainCharacter.class) ? ' d-none' : ''}${(_item.for && (_item.for !== mainCharacter.class)) ? ' disabled' : ''}" style="width:42.5%;height:80%;color:#F4BB44 !important;font-size:3vh !important" onclick="wearItem(${_id})">${getLangData('WEAR')}</div>
            <div class="game-menu-button animate-me flex${(_item.weared === mainCharacter.class) ? '' : ' d-none'}" style="width:42.5%;height:80%;color:#F4BB44 !important;font-size:3vh !important" onclick="unWearItem(${_id})">${getLangData('UNWEAR')}</div>
        </div>
		<div onclick="closeItemInfoModal()" style="position:absolute;top:0;right:0;padding:2vh;font-weight:600;font-size:5vh!important;line-height:3vh !important;color:darkgoldenrod !important">&times;</div>
        <div id="shine"></div>
    </div>
    </div>`;
    var _currentItemModal = document.querySelector('.item-info-container-parent');
    if(_currentItemModal)
        _currentItemModal.remove();
    document.getElementById('inventory-list').innerHTML += _html;
}
function renderItemProps(_item, _defaultColor) {
    let _props = '';
    for(let _prop of (_item.props ?? []).sort((a,b) => __properties.find(x => x.key === a.key).order - __properties.find(x => x.key === b.key).order)) {
        const _p = __properties.find(x => x.key === _prop.key);
        _props += '<div class="item-prop flex" style="font-weight:600;font-size:3vh;width:100%;height:25%;color:' + (_p.color ?? _defaultColor ?? '#F4BB44dd') + ' !important">' + (_prop.value ? ((_p.key.endsWith('-rate')) ? '%' + parseFloat(_prop.value).toFixed(2) : '+' + _prop.value) + ' ' : '') + _p.titles[getLang()] + (_item.level > 1 ? '</div>' :  ' (' + getMinPropValue(_prop.key, _item) + ' - ' + getMaxPropValue(_prop.key, _item) + ')</div>');
    }
    return _props;
}
function openMiscItemInfoModal(_type) {
    episode.playSound({ key: 'click' });
    var _item = misc.find(x => x.type === _type);
    var _html = `<div class="full flex item-info-container-parent" style="z-index:2;position:absolute;padding:4.5% 8% 4.5% 0;top:0;left:0;margin:4% 6% 4% 0;width:94%;height:92%">
        <div class="full flex item-info-container" style="overflow:hidden;background:radial-gradient(#262626, #000);border-radius:1.6vh;border:.4vh solid darkgoldenrod;position:relative">
            <div class="flex" style="width:100%;height:10%">
                <div style="width:10%;height:100%"></div>
                <div style="height:100%;width:80%" class="flex">
                    <div class="one-line" style="font-size:3vh !important;font-weight:600;color:#F4BB44 !important">${_item.titles[getLang()].toLocaleUpperCase(getLang())}</div>
                </div>
                <div style="width:10%;height:100%" class="flex"></div>
            </div>
            <div style="height:30%;width:100%" class="flex">
                <div style="height:80%;aspect-ratio:1/1;position:relative">
                    <img src="./images/icons/${_item.type}.png" class="full" />
                </div>
            </div>
            <div class="flex flex-ai-start" style="width:100%;height:50%;overflow-y:auto">
                <div class="flex" style="color:#f7f7f780 !important; font-size:3vh !important; width:80%">
                    ${_item.descriptions[getLang()]}
                </div>
                <div style="width:100%;text-align:center;color:#f7f7f7 !important; font-size:2.6vh !important; padding:3vh">
                    Cost:&nbsp;${_item.cost.formatWithDots()}&nbsp;<img src="./images/icons/coin.png" style="height:2vh" />
                </div>
            </div>
            <div class="flex${_item.do ? '' : ' d-none'}" style="width:100%;height:10%;justify-content:space-evenly">
                <div class="game-menu-button animate-me flex" style="width:42.5%;height:70%;color:#F4BB44 !important;font-size:3vh !important" onclick="sellMiscItem('${_item.type}')">${getLangData('SELL')}</div>
                <div class="game-menu-button animate-me flex" style="width:42.5%;height:70%;color:#F4BB44 !important;font-size:3vh !important" onclick="useMiscItem('${_item.type}')">${getLangData('USE')}</div>
            </div>
            <div class="flex${_item.do ? ' d-none' : ''}" style="width:100%;height:10%;justify-content:space-evenly">
                <div class="game-menu-button animate-me flex" style="width:80%;height:70%;color:#F4BB44 !important;font-size:3vh !important" onclick="sellMiscItem('${_item.type}')">${getLangData('SELL')}</div>
            </div>
		    <div onclick="closeItemInfoModal()" style="position:absolute;top:0;right:0;padding:2vh;font-weight:600;font-size:5vh!important;line-height:3vh !important;color:darkgoldenrod !important">&times;</div>
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
        return false;
    var _items = getItems(_char)?.filter(x => x.weared === _c.class) ?? [];
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
        for(let _item of _items)
            for(let _p of _item.props) {
                if(_prop.key === _p.key) {
                    let _current = _offensiveProps.find(x => x.key === _prop.key);
                    _current.value += parseFloat(_p.value);
                }
            }
    }
    for(let _prop of __properties.filter(x => x.group === 'def').sort((a,b) => a.order - b.order)){
        _defensiveProps.push({key:_prop.key, color: _prop.color ?? '#f7f7f799', title: _prop.titles[getLang()], value: _prop.base ? _c.baseProps?.[_prop.base] ?? 0 : 0});
        for(let _item of _items)
            for(let _p of _item.props) {
                if(_prop.key === _p.key) {
                    let _current = _defensiveProps.find(x => x.key === _prop.key);
                    _current.value += parseFloat(_p.value);
                }
            }
    }
    for(let _prop of __properties.filter(x => !x.group).sort((a,b) => a.order - b.order)){
        _miscProps.push({key:_prop.key, color: _prop.color ?? '#f7f7f799', title: _prop.titles[getLang()], value: _prop.base ? _c.baseProps?.[_prop.base] ?? 0 : 0});
        for(let _item of _items)
            for(let _p of _item.props) {
                if(_prop.key === _p.key) {
                    let _current = _miscProps.find(x => x.key === _prop.key);
                    _current.value += parseFloat(_p.value);
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
    var _stats = getCharacterStats(_char);
    if(!_stats)
        return;
    if(!_char)
        applyBonusStats();
    const _c = _char ?? mainCharacter;
    _c.atk = (_stats.op.find(x => x.key === 'atk')?.value ?? 0) + _c.level;
    _c.critRate = (_stats.op.find(x => x.key === 'crit-rate')?.value ?? 0) + 5;
    _c.critDmgRate = _stats.op.find(x => x.key === 'crit-dmg-rate')?.value ?? 0;
    _c.stealRate = _stats.op.find(x => x.key === 'steal-rate')?.value ?? 0;
    _c.fireDmg = _stats.op.find(x => x.key === 'fire-dmg')?.value ?? 0;
    _c.lightningDmg = _stats.op.find(x => x.key === 'lightning-dmg')?.value ?? 0;
    _c.toxicDmg = _stats.op.find(x => x.key === 'toxic-dmg')?.value ?? 0;
    _c.iceDmg = _stats.op.find(x => x.key === 'ice-dmg')?.value ?? 0;
    _c.def = (_stats.dp.find(x => x.key === 'def')?.value ?? 0) + _c.level;
    _c.critResistRate = _stats.dp.find(x => x.key === 'crit-resist-rate')?.value ?? 0;
    _c.critDmgResistRate = _stats.dp.find(x => x.key === 'crit-dmg-resist-rate')?.value ?? 0;
    _c.fireResistRate = _stats.dp.find(x => x.key === 'fire-resist-rate')?.value ?? 0;
    _c.lightningResistRate = _stats.dp.find(x => x.key === 'lightning-resist-rate')?.value ?? 0;
    _c.toxicResistRate = _stats.dp.find(x => x.key === 'toxic-resist-rate')?.value ?? 0;
    _c.iceResistRate = _stats.dp.find(x => x.key === 'ice-resist-rate')?.value ?? 0;
    _c.hp = _c.maxHP = (_stats.dp.find(x => x.key === 'hp')?.value ?? 0) + (2 * + _c.level);
    _c.luckRate = _stats.mp.find(x => x.key === 'luck-rate')?.value ?? 0;
    _c.goldGainRate = _stats.mp.find(x => x.key === 'gold-gain-rate')?.value ?? 0;
    if(episode.pvp) {    
        _c.pierceRate = _stats.op.find(x => x.key === 'pierce-rate')?.value ?? 0;
        _c.resilienceRate = _stats.dp.find(x => x.key === 'resilience-rate')?.value ?? 0;
    }
    if(!hasMainCharacter)
        _c.setHealth(_c.getMaxHP(), 0, 0, 13);
    else
        _c.setHealth(_c.health, 0, 0, 14);
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
    }
}
function openCharacterInfoModal() {
    episode.playSound({ key: 'click' });
    var _level = mainCharacter.level;
    var _class = mainCharacter.class;
    _class = getLangData(_class).toProperCase();
    var _stats = getCharacterStats();
    var _offensiveProps = _stats.op, _defensiveProps = _stats.dp, _miscProps = _stats.mp;
    let _props = '<div style="color:#f7f7f7cc !important; position:relative" class="stats-group-title">' + getLangData('Offensive Stats') + '<img src="./images/icons/sword.png" style="opacity:.65;position:absolute;height:70%;top:15%;right:3vh" /></div>';
    //var _atk = _offensiveProps.find(x => x.key === 'atk')?.value ?? 1;
    //var _dps = getTotalPower().atk;
    //_props += `<div style="color:#F7F7F780!important" class="stats-group-item">${getLangData('Base Damage')}: ${_stats.minDmg.formatWithDots()} - ${_stats.maxDmg.formatWithDots()}</div>`;
    for(let _o of _offensiveProps)
        _props += `<div${_o.color ? ' style="font-weight:600;color:' + _o.color + '!important"' : ''} class="stats-group-item">${_o.title}: ${_o.key.endsWith('-rate') ? '%' + _o.value.toFixed(2) : _o.value.formatWithDots()}</div>`;
    _props += '<div style="text-align:right;color:#f7f7f7cc !important;position:relative;margin-top:1vh" class="stats-group-title"><img src="./images/icons/shield.png" style="opacity:.65;position:absolute;height:70%;top:15%;left:3vh" />' + getLangData('Defensive Stats')  + '</div>';
    //_props += `<div style="text-align:right;color:#F7F7F780!important" class="stats-group-item">${getLangData('Base Armor')}: ${_stats.armor.formatWithDots()}</div>`;
    for(let _o of _defensiveProps)
        _props += `<div${_o.color ? ' style="font-weight:600;text-align:right;color:' + _o.color + '!important"' : ''} class="stats-group-item">${_o.title}: ${_o.key.endsWith('-rate') ? '%' + _o.value.toFixed(2) : _o.value.formatWithDots()}</div>`;
    //_props += '<div style="margin-top:1vh;color:#f7f7f799 !important; position:relative" class="stats-group-title">' + getLangData('Other Stats') + '<img src="./images/icons/hp.png" style="opacity:.65;position:absolute;height:70%;top:15%;right:3vh" /></div>';
    //_props += `<div style="color:#F7F7F780!important" class="stats-group-item">${getLangData('Base Health')}: ${_stats.maxHP.formatWithDots()}</div>`;
    //for(let _o of _hpProps)
    //    _props += `<div${_o.color ? ' style="color:' + _o.color + '80!important"' : ''} class="stats-group-item">${_o.title}: ${_o.key.endsWith('-rate') ? '%' + _o.value.toFixed(2) : _o.value.formatWithDots()}</div>`;
    let _html = `<div class="full character-info-container-parent" style="overflow:hidden;z-index:2;position:absolute;padding:4.5% 0 4.5% 8%;top:0;left:0;margin:4% 0 4% 6%;width:94%;height:92%"><div class="full flex character-info-container character-info-container-${mainCharacter.class}">
    <div class="flex" style="width:100%;height:10%"><div style="height:100%;width:80%;padding:0 3vh" class="flex flex-jc-start"><div class="one-line" style="font-size:3.2vh !important;line-height:200%;font-weight:600;color:#F4BB44 !important">${getLangData('Level')} ${_level} - ${_class}</div></div>
    <div class="flex flex-jc-end" style="height:100%;width:20%;padding-right:2vh"><img style="opacity:.75;cursor:pointer;height:60%;margin-right:.4vw" onclick="closeCharacterInfoModal()" src="./images/icons/close.png" /></div>
    </div>
    <div style="width:100%;height:90%;overflow-y:auto">
        <div class="flex flex-jc-start flex-ai-start" style="padding-bottom:2vh">
            ${_props}
            <div style="font-weight:600;color:#f7f7f7cc !important;margin-top:1vh" class="stats-group-title">${getLangData('General')}</div>
            <div style="font-weight:600;color:#f7f7f799!important" class="stats-group-item">${getLangData('Title')}: ${mainCharacter.title}</div>
            <div style="font-weight:600;color:#f7f7f799!important" class="stats-group-item">${getLangData('Experience')}: ${mainCharacter.experience.formatWithDots()} / ${mainCharacter.maxExperience.formatWithDots()}</div>
            <div style="font-weight:600;color:#f7f7f799!important" class="stats-group-item">${getLangData('Fatique')}: ${mainCharacter.maxFatique.formatWithDots()}</div>
            <div style="font-weight:600;color:#f7f7f799!important" class="stats-group-item">${getLangData('Total Power')}: ${getTotalPower().total.formatWithDots()}</div>
            <div style="font-weight:600;color:#f7f7f799!important" class="stats-group-item">${getLangData('Main Quest Progress')}: ${__account.questStatus.order} / ${_npcQuests.length}</div>
        </div>
    </div>
    </div>
    </div>`;
    document.getElementById('character-screen').innerHTML += _html;
}
function closeItemInfoModal() {
    episode.playSound({ key: 'click' });
    const _parent = document.querySelector('.item-info-container-parent');
    if(_parent)
        _parent.remove();
}
function closeCharacterInfoModal() {
    episode.playSound({ key: 'click' });
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
    episode.playSound({ key: 'wear', volume: .3 });
    closeItemInfoModal();
    const _newPower = getTotalPower().total;
    changePower(_oldPower, _newPower);
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
    episode.playSound({ key: 'wear', volume: .3 });
    const _newPower = getTotalPower().total;
    changePower(_oldPower, _newPower);
}
function getItemWrapper(_item) {
    let _wrapper;
    if(!_item.weared)
        _wrapper = document.querySelector('.item-slot[data-item-id="' + _item.id + '"]');
    else
        _wrapper = document.querySelector('.inventory-screen .item.item-' + _item.type);
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
    const _oldPower = getTotalPower().total;
    _item.level++;
    for(let _prop of _item.props) {
        const _ep = _itemProps.props.find(x => x.key === _prop.key); 
        _prop.value += _ep.upgrade;
    }
    updateGold(-updateCost);
    document.querySelector('.account-gold-value').innerText = __account.gold.formatWithDots();
    episode.playSound({ key: 'upgrade', volume: .5, reset: true });
    closeItemInfoModal();
    closeCharacterInfoModal();
    openItemInfoModal(_id);
    shine(1000, document.querySelector('.item-info-container'));
    const _wrapper = getItemWrapper(_item);
    _wrapper.innerHTML = getItemIcon(_item);
    const _newPower = getTotalPower().total;
    changePower(_oldPower, _newPower);
}
function rollbackOldStats(_id) {
    if(!_randomizedOldProps)
        return;
    episode.playSound({ key: 'click' });
    var _items = getItems();
    var _item = _items.find(x => x.id === _id);
    const _oldPower = getTotalPower().total;
    _item.props = JSON.parse(JSON.stringify(_randomizedOldProps));
    closeItemInfoModal();
    closeCharacterInfoModal();
    openItemInfoModal(_id);
    const _wrapper = getItemWrapper(_item);
    _wrapper.innerHTML = getItemIcon(_item);
    const _newPower = (_item.weared === mainCharacter.class) ? getTotalPower().total : 0;
    changePower(_oldPower, _newPower);
}
function askConfirmNewStats(_id) {
    const _misc = __account.misc.find(x => x.type === 'ticket-random');
    var _items = getItems();
    var _item = _items.find(x => x.id === _id);
    var oldPropsHTML = renderItemProps({
        type:_item.type, 
        grade:_item.grade,
        level:_item.level,
        props:_randomizedOldProps
    });
    var newPropsHTML = renderItemProps(_item);
    var _retry = _misc?.count > 0;
    let _modal = `<div class="full flex inventory-question">
        <div class="inventory-modal random-approve-modal">
            <div class="flex random-stats-container">
                <div class="flex random-stats-wrapper random-stats-old">
                    <div class="flex random-stats-title">${getLangData('Old Version')}</div>
                    <div class="random-stats-card flex flex-ai-start"><div class="w-100 flex">` + oldPropsHTML.replace(/item[-]prop/g, 'item-prop one-line') + `</div></div>
                </div>
                <div class="flex random-stats-wrapper random-stats-new">
                    <div class="flex random-stats-title">${getLangData('New Version')}</div>
                    <div class="random-stats-card flex flex-ai-start"><div class="w-100 flex">` + newPropsHTML.replace(/item[-]prop/g, 'item-prop one-line') + `</div></div>
                </div>
            </div>
            <div class="flex random-stats-question">
                <span style="color:#f7f7f7dd !important;font-size:3vh !important">${getLangData('Choose an action')}</span>
            </div>
            <div style="padding-bottom:2vh" class="flex random-stats-actions">
                <div class="game-menu-button flex animate-me w-100${_retry ? '' : ' disabled'}" style="cursor:pointer;color:#F4BB44 !important;min-width:10vw;min-width:10vw;font-size:3vh !important" onclick="closeInventoryQuestionModal();acceptAndRandomizeItem(${_id})">${getLangData('RETRY')}</div>
                <div class="game-menu-button flex animate-me w-100" style="cursor:pointer;color:#F4BB44 !important;min-width:10vw;min-width:10vw;font-size:3vh !important" onclick="closeInventoryQuestionModal();rollbackOldStats(${_id})">${getLangData('KEEP OLD STATS')}</div>
                <div class="game-menu-button flex animate-me w-100" style="cursor:pointer;color:#F4BB44 !important;min-width:10vw;min-width:10vw;font-size:3vh !important" onclick="closeInventoryQuestionModal()">${getLangData('ACCEPT NEW STATS')}</div>
            </div>
        </div>
    </div>`;
    const _div = document.createElement('div');
    _div.innerHTML = _modal;
    document.querySelector('.my-pop-up-wrapper:has(.my-pop-up)').appendChild(_div.firstChild);
}
function sellMiscItem(_type) {
    episode.playSound({ key: 'click' });
    const _item = __account.misc.find(x => x.type === _type);
    const _miscItem = misc.find(x => x.type === _type);
    let _modal = `<div class="full flex inventory-question">
        <div class="inventory-modal">
            <div style="padding:6vh 2vh 2vh 2vh" class="flex">
                 <span class="flex">
                    <div id="decrease-count-btn" class="game-menu-button flex animate-me disabled" style="margin:0 1vh;cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onclick="decreaseSellCount('${_type}')">-</div>
                    &nbsp;<span id="sell-count" style="font-size:3vh !important;color:#f7f7f7 !important">1</span>&nbsp;
                    <div id="increase-count-btn" class="game-menu-button flex animate-me${_item.count > 1 ? '' : ' disabled'}" style="margin:0 1vh;cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onclick="increaseSellCount('${_type}')">+</div>          
                </span>
            </div>
            <div style="padding:4vh 2vh" class="flex">
                <span style="color:#f7f7f7dd !important;font-size:3vh !important">${getLangData('Sell this item for')} <b id="misc-sell-cost" style="color:#F4BB44 !important">${_miscItem.cost.formatWithDots()}</b> <img style="height:2vh" src="./images/icons/coin.png" /></span>
            </div>
            <div style="padding:4vh 2vh" class="flex">
                <div class="game-menu-button flex animate-me" style="cursor:pointer;color:#F4BB44 !important;min-width:10vw;min-width:10vw;font-size:3vh !important" onclick="acceptMiscSellCount('${_type}')">${getLangData('YES')}</div>
                <div class="game-menu-button flex animate-me" style="cursor:pointer;color:#F4BB44 !important;min-width:10vw;min-width:10vw;font-size:3vh !important" onclick="closeInventoryQuestionModal()">${getLangData('NO')}</div>
            </div>
        </div>
    </div>`;
    const _div = document.createElement('div');
    _div.innerHTML = _modal;
    document.querySelector('.my-pop-up-wrapper:has(.my-pop-up)').appendChild(_div.firstChild);
}
function increaseSellCount(_type) {
    episode.playSound({ key: 'click' });
    const _item = __account.misc.find(x => x.type === _type);
    const _miscItem = misc.find(x => x.type === _type);
    const _sc = document.getElementById('sell-count');
    let _count = parseInt(_sc.innerText) + 1;
    _sc.innerText = _count;
    if(_count >= _item.count)
        addClass(document.getElementById('increase-count-btn'), 'disabled');
    removeClass(document.getElementById('decrease-count-btn'), 'disabled');
    const _cost = _count * _miscItem.cost;
    document.getElementById('misc-sell-cost').innerText = _cost.formatWithDots();
}
function decreaseSellCount(_type) {
    episode.playSound({ key: 'click' });
    const _miscItem = misc.find(x => x.type === _type);
    const _sc = document.getElementById('sell-count');
    let _count = parseInt(_sc.innerText) - 1;
    _sc.innerText = _count;
    if(_count <= 1)
        addClass(document.getElementById('decrease-count-btn'), 'disabled');
    removeClass(document.getElementById('increase-count-btn'), 'disabled');
    const _cost = _count * _miscItem.cost;
    document.getElementById('misc-sell-cost').innerText = _cost.formatWithDots();
}
function acceptMiscSellCount(_type) {
    episode.playSound({ key: 'click' });
    const _itemIndex = __account.misc.findIndex(x => x.type === _type);
    const _item = __account.misc[_itemIndex];
    const _miscItem = misc.find(x => x.type === _type);
    const _sc = document.getElementById('sell-count');
    const _count = parseInt(_sc.innerText);
    const _cost = _count * _miscItem.cost;
    updateGold(_cost);
    _item.count -= _count;
    if(_item.count === 0)
        __account.misc.splice(_itemIndex, 1);
    document.querySelector('.account-gold-value').innerText = __account.gold.formatWithDots();
    closeItemInfoModal();
    closeInventoryQuestionModal();
    _client.saveState();
    switchInventoryTab(null, 3);
}
function useMiscItem(_type) {
    episode.playSound({ key: 'click' });
    const _itemIndex = __account.misc.findIndex(x => x.type === _type);
    const _item = __account.misc[_itemIndex];
    const _miscItem = misc.find(x => x.type === _type);
    if(_miscItem.do(_miscItem)) {
        _item.count--;
        if(_item.count === 0)
            __account.misc.splice(_itemIndex, 1);
        _client.saveState();
    }
    closeItemInfoModal();
    switchInventoryTab(null, 3);
}
function sellItem(_id, _noSound, _imediateSell) {
    var sellCost = getItemSellCost(_id);
    if(_imediateSell) {
        acceptAndSellItem(_id, sellCost, _noSound);
        return;
    }
    askSomething(`${getLangData('Sell this equipment for')} <b style="margin-left:1vh;color:#F4BB44 !important">${sellCost}</b> <img style="height:2vh" src="./images/icons/coin.png" />`, `acceptAndSellItem(${_id}, ${sellCost})`, _noSound);
}
function askRandomizeItem(_id) {
    askSomething(`${getLangData('Change attributes of this item for')} <b style="margin-left:1vh;color:#F4BB44 !important">1</b> ${getLangData('dice')}`, `acceptAndRandomizeItem(${_id})`);
}
function askAddSlot() {
    episode.playSound({ key: 'click' });
    const _cost = 10000;
    let _modal = `<div class="full flex inventory-question">
        <div class="inventory-modal">
            <div style="padding:6vh 4vh 4vh 4vh" class="flex">
                <span style="color:#f7f7f7dd !important;font-size:3vh !important">${getLangData('Enlarge inventory capacity')}</span>
            </div>
            <div class="flex" style="padding:2vh">
                <span class="flex">
                    <div id="decrease-slot-btn" class="game-menu-button flex animate-me disabled" style="margin:0 1vh;cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onclick="decreaseSlotAmount()">-</div>
                    &nbsp;<span id="slot-amount" style="font-size:3vh !important;color:#f7f7f7 !important">10</span>&nbsp;
                    <div id="increase-slot-btn" class="game-menu-button flex animate-me" style="margin:0 1vh;cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onclick="increaseSlotAmount()">+</div>          
                </span>
            </div>
            <div style="padding:2vh" class="flex">
                <span style="color:#f7f7f7 !important;font-size:3vh !important">Cost:&nbsp;<span id="slot-cost" style="font-size:3vh !important;color:#f7f7f7 !important">${_cost.formatWithDots()}</span>&nbsp;<img src="./images/icons/coin.png" style="height:3vh" /></span>
            </div>
            <div style="padding:4vh 2vh" class="flex">
                <div class="game-menu-button flex animate-me" style="cursor:pointer;color:#F4BB44 !important;min-width:10vw;font-size:3vh !important" onclick="acceptInventorySlot()">${getLangData('YES')}</div>
                <div class="game-menu-button flex animate-me" style="cursor:pointer;color:#F4BB44 !important;min-width:10vw;font-size:3vh !important" onclick="closeInventoryQuestionModal()">${getLangData('NO')}</div>
            </div>
        </div>
    </div>`;
    const _div = document.createElement('div');
    _div.innerHTML = _modal;
    document.querySelector('.my-pop-up-wrapper:has(.my-pop-up)').appendChild(_div.firstChild);
}
const _selectionItems = [];
function useItemSelectionTicket(_level) {
    _selectionItems.length = 0;
    for(let _it of itemTypes)
        _selectionItems.push(getSpecificItem(_it.key, _level));
    let _choices = '';
    for(let _item of _selectionItems)
        _choices += `<div class="selection-item" onclick="selectSelectionItem(${_item.id}, this)" style="width:17%;aspect-ratio:1/1;position:relative;cursor:pointer">
            <img src="./images/items/icons/${(_item.for ? (_item.for + '/') : '')}${_item.type}${_item.grade}.png" class="full grade${_item.grade}-item${_item.grade > 5 ? ' glow' : ''}" />
        </div>`;
    let _modal = `<div class="full flex inventory-question">
        <div class="inventory-modal">
            <div style="padding:6vh 4vh 4vh 4vh" class="flex">
                <span style="color:#f7f7f7dd !important;font-size:3vh !important">${getLangData('Choose your gift')}</span>
            </div>
            <div class="flex" style="padding:2vh">`
               + _choices +
            `</div>
            <div style="padding:4vh 2vh" class="flex">
                <div id="item-selection-approve-btn" class="game-menu-button flex animate-me disabled" style="cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onclick="acceptItemSelection()">${getLangData('APPROVE')}</div>
                <div class="game-menu-button flex animate-me" style="cursor:pointer;color:#F4BB44 !important;font-size:3vh !important" onclick="closeInventoryQuestionModal()">${getLangData('CANCEL')}</div>
            </div>
        </div>
    </div>`;
    const _div = document.createElement('div');
    _div.innerHTML = _modal;
    document.querySelector('.my-pop-up-wrapper:has(.my-pop-up)').appendChild(_div.firstChild);
}
function selectSelectionItem(_id, _elem) {
    episode.playSound({ key: 'click' });
    removeClass(document.getElementById('item-selection-approve-btn'), 'disabled');
    const _itemIcons = document.querySelectorAll('.selection-item');
    for(let _ic of _itemIcons) {
        removeClass(_ic, 'selected');
        if(_ic === _elem)
            addClass(_ic, 'selected');
    }
}
function acceptItemSelection() {
    const _itemIcons = document.querySelectorAll('.selection-item');
    for(let _i = 0; _i < _itemIcons.length; _i++) {
        const _item = _itemIcons[_i];
        if(hasClass(_item, 'selected'))
        {
            const _choice = _selectionItems[_i];
            pushItemIntoInventory(_choice);
            const _miscItem = __account.misc.find(x => x.type === 'ticket-item-selection');
            _miscItem.count--;
            if(_miscItem.count === 0)
                __account.misc = __account.misc.filter(x => x.type !== 'ticket-item-selection');
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
    episode.playSound({ key: 'click' });
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
    episode.playSound({ key: 'click' });
    const _sa = document.getElementById('slot-amount');
    let _amount = parseInt(_sa.innerText);
    const _cost = calculateSlotCost(_amount);
    const _sc = document.getElementById('slot-cost');
    _sc.innerText = _cost.formatWithDots();
    _amount -= 10;
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
        episode.playSound({ key: 'click' });
        warn('<span>' + getLangData('Not enough gold') + '</span>', 'warn');
        return;
    }
    updateGold(-_cost);
    document.querySelector('.account-gold-value').innerText = __account.gold.formatWithDots();
    episode.playSound({ key: 'upgrade', volume: .5, reset: true });
    closeItemInfoModal();
    __account.slots += _amount;
    _client.saveState();
    refreshInventory();
}
function acceptAndSellItem(_id, _cost, _noSound) {
    // if(!_noSound)
    //     episode.playSound({ key: 'sell' });
    const _iq = document.querySelector('.inventory-question');
    if(_iq)
        _iq.remove();
    var _items = getItems();
    var _index = _items.findIndex(x => x.id === _id);
    _items.splice(_index, 1);
    updateGold(_cost);
    refreshInventory();
}
let _randomizedOldProps;
function acceptAndRandomizeItem(_id) {
    const _iq = document.querySelector('.inventory-question');
    if(_iq)
        _iq.remove();
    const _miscIndex = __account.misc.findIndex(x => x.type === 'ticket-random');
    if(_miscIndex === -1 && !_rollback) {
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
    episode.playSound({ key: 'upgrade', volume: .5, reset: true });
    closeItemInfoModal();
    closeCharacterInfoModal();
    openItemInfoModal(_id);
    const _wrapper = getItemWrapper(_item);
    _wrapper.innerHTML = getItemIcon(_item);
    const _newPower = (_item.weared === mainCharacter.class) ? getTotalPower().total : 0;
    changePower(_oldPower, _newPower);
    askConfirmNewStats(_id);
}
function closeInventoryQuestionModal() {
    var _qm = document.querySelector('.inventory-question');
    if(_qm) {
        episode.playSound({ key: 'click' });
        _qm.remove();
    }
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
        let _counter = 10, _step = MathFloor(_diff / 10);
        powerDiffTimer = setInterval(function() {
            _old += _step;
            if(_old < 0)
                _old = 0;
            _counter--;
            episode.playSound({ key: 'count', reset: true });
            if(_counter <= 0) {
                clearInterval(powerDiffTimer);
                powerDiffTimer = null;
                _uiElem.innerText = _new.formatWithDots();
                removeClass(_uiElem, 'power-up-text');
                removeClass(_uiElem, 'power-down-text');
                _lastNewStats = undefined;
            }
            else
                _uiElem.innerText = _old.formatWithDots();
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
    { minRate:1, maxRate: 25, key: 'item' },
    { minRate:26, maxRate: 50, key: 'gold' },
    { minRate:51, maxRate: 75, key: 'misc' },
    { minRate:76, maxRate: 100, key: 'pot' },
]
function getChestReward(_grade, _rewardKey, _rewardType, _count) {
    const _val = getRandomValue2(1, 100);
    const _reward = _rewardKey ? { key: _rewardKey } : _chestRewards.find(x => x.minRate <= _val && x.maxRate >= _val);
    switch(_reward.key) {
        case 'item':
            {
                const _itemTypeIndex = getRandomValue2(0, itemTypes.length - 1);
                const _type = _rewardType ?? itemTypes[_itemTypeIndex];
                const _item = getRandomItem(_grade, _type.key);
                let _src;
                if(_item.type === 'weapon')
                {
                    var _class = getRandomValue2(1, Object.keys(_allEnemies).filter(x => x.startsWith('enemy0')).length);
                    _item.for = _allEnemies['enemy0' + _class]().class;
                    _src = './images/items/icons/' + _item.for + '/' + _item.type + _item.grade.toString() + '.png';
                }
                else
                    _src = './images/items/icons/' + _item.type + _item.grade.toString() + '.png';
                pushItemIntoInventory(_item);
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
                const _val = getRandomValue2(_min, _max);
                updateGold(_val);
                return {
                    type: 'gold',
                    src: './images/icons/gold.png',
                    count: _val
                }
            }
        case 'pot':
            {
                const _val = _count ?? getRandomValue2(1, _grade);
                updatePot(_val);
                return {
                    type: 'pot',
                    src: './images/icons/pot.png',
                    count: _val
                }
            }
        case 'misc':
            {
                const _misc = _rewardType ? misc.find(x => x.type === _rewardType) : misc[getRandomValue2(0, misc.length -1)];
                const _val = getRandomValue2(1, _grade);
                if(_misc.graded)
                    updateMisc({ type: _misc.type, count: 1, grade: _val });
                else
                    updateMisc({ type: _misc.type, count: _val });
                const _result = {
                    type: _misc.type,
                    title: _misc.titles[getLang()],
                    src: './images/icons/' + _misc.type + '.png',
                    count: _misc.graded ? 1 : _val
                };
                if(_misc.graded)
                    _result.grade = _val;
                return _result;
            }
    }
}
function warnChestReward(_cr) {
    var _crTitle = getLangData(_cr.title ?? _cr.type);
    episode.playSound({key: 'chestreward', volume: .3, reset: true });
    _crTitle = _crTitle.charAt(0).toLocaleUpperCase(getLang()) + _crTitle.substring(1);
    warn('<div class="flex heading achievement' + (_cr.grade ? ' grade' + _cr.grade + '-item' : '') + '" style="position:relative"><img style="height:12vh" src="' + _cr.src + '" />&nbsp;' + (_cr.count ?? 1) + 'x&nbsp;<span style="text-shadow:0 0 .8vh #000;color:#ffffffcc !important;flex:1">' + _crTitle + '</span></div>', 'level-up', null, 1);
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