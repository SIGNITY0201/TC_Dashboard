// --- 1. 데이터 ---
const regions = {'서울특별시':['강남구','강동구','강북구','강서구','관악구','광진구','구로구','금천구','노원구','도봉구','동대문구','동작구','마포구','서대문구','서초구','성동구','성북구','송파구','양천구','영등포구','용산구','은평구','종로구','중구','중랑구'],'부산광역시':['강서구','금정구','기장군','남구','동구','동래구','부산진구','북구','사상구','사하구','서구','수영구','연제구','영도구','중구','해운대구'],'대구광역시':['군위군','남구','달서구','달성군','동구','북구','서구','수성구','중구'],'인천광역시':['강화군','계양구','남동구','동구','미추홀구','부평구','서구','연수구','옹진군','중구'],'광주광역시':['광산구','남구','동구','북구','서구'],'대전광역시':['대덕구','동구','서구','유성구','중구'],'울산광역시':['남구','동구','북구','울주군','중구'],'세종특별자치시':['세종시'],'경기도':['가평군','고양시','과천시','광명시','광주시','구리시','군포시','김포시','남양주시','동두천시','부천시','성남시','수원시','시흥시','안산시','안성시','안양시','양주시','양평군','여주시','연천군','오산시','용인시','의왕시','의정부시','이천시','파주시','평택시','포천시','하남시','화성시'],'강원특별자치도':['강릉시','고성군','동해시','삼척시','속초시','양구군','양양군','영월군','원주시','인제군','정선군','철원군','춘천시','태백시','평창군','홍천군','화천군','횡성군'],'충청북도':['괴산군','단양군','보은군','영동군','옥천군','음성군','제천시','증평군','진천군','청주시','충주시'],'충청남도':['계룡시','공주시','금산군','논산시','당진시','보령시','부여군','서산시','서천군','아산시','예산군','천안시','청양군','태안군','홍성군'],'전북특별자치도':['고창군','군산시','김제시','남원시','무주군','부안군','순창군','완주군','익산시','임실군','장수군','전주시','정읍시','진안군'],'전라남도':['강진군','고흥군','곡성군','광양시','구례군','나주시','담양군','목포시','무안군','보성군','순천시','신안군','여수시','영광군','영암군','완도군','장성군','장흥군','진도군','함평군','해남군','화순군'],'경상북도':['경산시','경주시','고령군','구미시','김천시','문경시','봉화군','상주시','성주군','안동시','영덕군','영양군','영주시','영천시','예천군','울릉군','울진군','의성군','청도군','청송군','칠곡군','포항시'],'경상남도':['거제시','거창군','고성군','김해시','남해군','밀양시','사천시','산청군','양산시','의령군','진주시','창녕군','창원시','통영시','하동군','함안군','함양군','합천군'],'제주특별자치도':['서귀포시','제주시']};

// 공급자 정보 설정
const suppliers = {
    default: {
        name: '(주)시그니티',
        bizNo: '사업자등록번호 : 524-81-02411',
        manager: '최재훈',
        phone: '1800-9512 / 010-8132-9047',
        email: 'Terracasa_@naver.com'
    },
    gyeongsang: {
        name: '클로드 디',
        bizNo: '사업자등록번호 : 502-40-44290',
        manager: '곽명희',
        phone: '010-6277-0339',
        email: 'claudedesignlab@naver.com'
    }
};

const gyeongsangArea = ['부산광역시', '대구광역시', '울산광역시', '경상북도', '경상남도'];

// --- 데크 색상 카테고리 ---
const deckColorCategories = [
    { group: '자연석 st', type: 'natural', items: [
        { value: '거창석 st (연회색)', label: '거창석 st\n(연회색)' },
        { value: '고흥석 st (중회색)', label: '고흥석 st\n(중회색)' },
        { value: '마천석 st (암회색)', label: '마천석 st\n(암회색)' },
    ]},
    { group: '인조석 st', type: 'artificial', items: [
        { value: '그레이', label: '그레이' },
        { value: '다크그레이', label: '다크그레이' },
        { value: '아이보리', label: '아이보리' },
        { value: '베이지', label: '베이지' },
    ]},
    { group: '우드 st', type: 'wood', items: [
        { value: '우드', label: '우드' },
    ]},
];

const deckColorPriceMap = { natural: 80000, artificial: 90000, wood: 90000 };

const deckColorImageMap = {
    '거창석 st (연회색)': 'images/거창석.png',
    '고흥석 st (중회색)': 'images/고흥석.png',
    '마천석 st (암회색)': 'images/마천석.png',
    '그레이': 'images/그레이.png',
    '다크그레이': 'images/다크그레이.png',
    '아이보리': 'images/아이보리.png',
    '베이지': 'images/베이지.png',
    '우드': 'images/우드.png',
};

function getDeckColorType(colorValue) {
    for (const cat of deckColorCategories) {
        for (const item of cat.items) {
            if (item.value === colorValue) return cat.type;
        }
    }
    return null;
}

function buildDeckColorSelectHTML() {
    let html = '<option value="">선택</option>';
    deckColorCategories.forEach(cat => {
        html += `<optgroup label="── ${cat.group} ──">`;
        cat.items.forEach(item => {
            html += `<option value="${item.value}">${item.label}</option>`;
        });
        html += '</optgroup>';
    });
    return html;
}

function updateDeckColorPreview(tr, colorValue) {
    const optionTd = tr.querySelector('td:nth-child(5)');
    if (!colorValue || !deckColorImageMap[colorValue]) {
        optionTd.innerHTML = '<input type="text" class="excel-input" placeholder="옵션 입력">';
        return;
    }
    optionTd.innerHTML = `<div style="text-align:center; padding:2px;"><img src="${deckColorImageMap[colorValue]}" alt="${colorValue}" style="width:100%; max-width:140px; border-radius:4px; border:1px solid #ddd;"><div style="font-size:10px; color:#666; margin-top:2px;">※ 참고용 이미지</div></div>`;
}

function calcDeckSpec(el) {
    const tr = el.closest('tr');
    const topW = parseFloat(tr.querySelector('.spec-top-w')?.value) || 0;
    const topH = parseFloat(tr.querySelector('.spec-top-h')?.value) || 0;
    const totalArea = (topW * topH) / 1000000;
    const qtyInput = tr.querySelector('.qty');
    qtyInput.value = totalArea > 0 ? Math.ceil(totalArea) : '';
    calcRow(el);
}

function calcCheolpanSpec(el) {
    const tr = el.closest('tr');
    const length = parseFloat(tr.querySelector('.spec-cheol-length')?.value) || 0;
    const height = parseFloat(tr.querySelector('.spec-cheol-height')?.value) || 0;
    const qtyInput = tr.querySelector('.qty');
    if (length > 0) {
        const baseQty = Math.ceil(length / 1000);
        const heightMultiplier = height > 600 ? 2 : 1;
        qtyInput.value = baseQty * heightMultiplier;
    } else {
        qtyInput.value = '';
    }
    calcRow(el);
}

function handleDeckColorChange(sel) {
    const tr = sel.closest('tr');
    const priceInput = tr.querySelector('.price');
    const prodSelect = tr.querySelector('td:nth-child(2) select');
    updateDeckColorPreview(tr, sel.value);
    if (!sel.value) { calcRow(sel); return; }
    // 스톤 첼판은 색상과 무관하게 단가 고정 (40,000원)
    if (prodSelect && prodSelect.value === '스톤 첼판') {
        priceInput.dataset.basePrice = 40000;
        priceInput.value = 40000;
    } else {
        const colorType = getDeckColorType(sel.value);
        if (colorType) {
            const unitPrice = deckColorPriceMap[colorType];
            priceInput.dataset.basePrice = unitPrice;
            priceInput.value = unitPrice;
        }
    }
    calcRow(sel);
}

// 전화번호 자동 하이픈
function formatPhone(input) {
    let val = input.value.replace(/[^0-9]/g, '');
    if (val.length <= 3) {
        input.value = val;
    } else if (val.length <= 7) {
        input.value = val.slice(0, 3) + '-' + val.slice(3);
    } else if (val.length <= 11) {
        input.value = val.slice(0, 3) + '-' + val.slice(3, 7) + '-' + val.slice(7);
    } else {
        input.value = val.slice(0, 3) + '-' + val.slice(3, 7) + '-' + val.slice(7, 11);
    }
}

// 제품 카테고리 정의
const productCategories = [
    {
        label: "System Pergola",
        items: ["New OASIS (수동)", "New OASIS (전동)"]
    },
    {
        label: "Sky Pergola",
        items: ["Mirage"]
    },
    {
        label: "Glass",
        items: ["Glass Sliding", "Glass Folding", "Fix Glass"]
    },
    {
        label: "Screen",
        items: ["Zip Screen"]
    },
    {
        label: "Deck",
        items: ["스톤 데크 (+페데스탈)", "스톤 데크 (+각관)", "스톤 첼판"]
    },
    {
        label: "기타",
        items: ["직접 입력"]
    },
    {
        label: "──단종──",
        items: ["OASIS (수동)", "OASIS (전동)"]
    }
];

// --- OASIS 단가표 ---
const oasisManualPriceTable = {
    2600: [3200000, 3400000, 3600000, 3800000, 4000000, 4200000, 4400000],
    2775: [3240000, 3450000, 3660000, 3870000, 4080000, 4290000, 4500000],
    2950: [3280000, 3500000, 3720000, 3940000, 4160000, 4380000, 4600000],
    3125: [3320000, 3550000, 3780000, 4010000, 4240000, 4470000, 4700000],
    3300: [3360000, 3600000, 3840000, 4080000, 4320000, 4560000, 4800000],
    3475: [3400000, 3650000, 3900000, 4150000, 4400000, 4650000, 4900000],
    3650: [3440000, 3700000, 3960000, 4220000, 4480000, 4740000, 5000000],
    3825: [3480000, 3750000, 4020000, 4290000, 4560000, 4830000, 5100000],
    4000: [3520000, 3800000, 4080000, 4360000, 4640000, 4920000, 5200000],
    4175: [3560000, 3850000, 4140000, 4430000, 4720000, 5010000, 5300000],
    4350: [3600000, 3900000, 4200000, 4500000, 4800000, 5100000, 5400000],
    4525: [3640000, 3950000, 4260000, 4570000, 4880000, 5190000, 5500000],
    4700: [3680000, 4000000, 4320000, 4640000, 4960000, 5280000, 5600000],
    4875: [3720000, 4050000, 4380000, 4710000, 5040000, 5370000, 5700000],
    5050: [3760000, 4100000, 4440000, 4780000, 5120000, 5460000, 5800000],
    5225: [3800000, 4150000, 4500000, 4850000, 5200000, 5550000, 5900000],
    5400: [3840000, 4200000, 4560000, 4920000, 5280000, 5640000, 6000000]
};

const oasisElectricPriceTable = {
    2600: [3600000, 3850000, 4100000, 4350000, 4600000, 4850000, 5100000],
    2775: [3640000, 3900000, 4160000, 4420000, 4680000, 4940000, 5200000],
    2950: [3680000, 3950000, 4220000, 4490000, 4760000, 5030000, 5300000],
    3125: [3720000, 4000000, 4280000, 4560000, 4840000, 5120000, 5400000],
    3300: [3760000, 4050000, 4340000, 4630000, 4920000, 5210000, 5500000],
    3475: [3800000, 4100000, 4400000, 4700000, 5000000, 5300000, 5600000],
    3650: [3840000, 4150000, 4460000, 4770000, 5080000, 5390000, 5700000],
    3825: [3880000, 4200000, 4520000, 4840000, 5160000, 5480000, 5800000],
    4000: [3920000, 4250000, 4580000, 4910000, 5240000, 5570000, 5900000],
    4175: [3960000, 4300000, 4640000, 4980000, 5320000, 5660000, 6000000],
    4350: [4000000, 4350000, 4700000, 5050000, 5400000, 5750000, 6100000],
    4525: [4040000, 4400000, 4760000, 5120000, 5480000, 5840000, 6200000],
    4700: [4080000, 4450000, 4820000, 5190000, 5560000, 5930000, 6300000],
    4875: [4120000, 4500000, 4880000, 5260000, 5640000, 6020000, 6400000],
    5050: [4160000, 4550000, 4940000, 5330000, 5720000, 6110000, 6500000],
    5225: [4200000, 4600000, 5000000, 5400000, 5800000, 6200000, 6600000],
    5400: [4240000, 4650000, 5060000, 5470000, 5880000, 6290000, 6700000],
    5575: [4280000, 4700000, 5120000, 5540000, 5960000, 6380000, 6800000],
    5750: [4320000, 4750000, 5180000, 5610000, 6040000, 6470000, 6900000],
    5925: [4360000, 4800000, 5240000, 5680000, 6120000, 6560000, 7000000]
};

// --- Mirage 단가표 ---
// Span(열): 2000, 2500, 3000, 3500, 4000, 4500, 5000
// Pivot(행): 2000 ~ 10000 (500단위)
const miragePriceTable = {
    spanKeys: [2000, 2500, 3000, 3500, 4000, 4500, 5000],
    pivotKeys: [2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000],
    prices: {
        2000: [3230000, 3510000, 3800000, 4080000, 4360000, 4650000, 4930000],
        2500: [3370000, 3660000, 3960000, 4250000, 4550000, 4840000, 5140000],
        3000: [3510000, 3820000, 4120000, 4430000, 4730000, 5040000, 5350000],
        3500: [3650000, 3970000, 4290000, 4600000, 4920000, 5240000, 5560000],
        4000: [3790000, 4120000, 4450000, 4780000, 5110000, 5440000, 5770000],
        4500: [3930000, 4270000, 4610000, 4950000, 5290000, 5630000, 5980000],
        5000: [4070000, 4420000, 4780000, 5130000, 5480000, 5830000, 6190000],
        5500: [4210000, 4570000, 4940000, 5300000, 5670000, 6030000, 6390000],
        6000: [5470000, 6070000, 6660000, 7250000, 7850000, 8440000, 9030000],
        6500: [6340000, 6970000, 7600000, 8240000, 8870000, 9500000, 10130000],
        7000: [6580000, 7240000, 7900000, 8550000, 9210000, 9870000, 10520000],
        7500: [6830000, 7510000, 8190000, 8870000, 9550000, 10230000, 10910000],
        8000: [7080000, 7780000, 8480000, 9190000, 9890000, 10600000, 11300000],
        8500: [7320000, 8050000, 8780000, 9500000, 10230000, 10960000, 11690000],
        9000: [7570000, 8320000, 9070000, 9820000, 10570000, 11330000, 12080000],
        9500: [7810000, 8590000, 9360000, 10140000, 10910000, 11690000, 12470000],
        10000: [8300000, 9210000, 10110000, 11010000, 11920000, 12820000, 13730000]
    }
};

function calculateMiragePrice(spanVal, pivotVal) {
    const spanKeys = miragePriceTable.spanKeys;
    const pivotKeys = miragePriceTable.pivotKeys;

    // 올림(ceiling) 방식으로 가장 가까운 테이블 값 찾기
    let spanIdx = -1;
    for (let i = 0; i < spanKeys.length; i++) {
        if (spanVal <= spanKeys[i]) { spanIdx = i; break; }
    }
    if (spanIdx === -1) return 0; // 스팬이 테이블 범위 초과

    let pivotKey = -1;
    for (let i = 0; i < pivotKeys.length; i++) {
        if (pivotVal <= pivotKeys[i]) { pivotKey = pivotKeys[i]; break; }
    }
    if (pivotKey === -1) return 0; // 피봇이 테이블 범위 초과

    const row = miragePriceTable.prices[pivotKey];
    if (row && row[spanIdx] !== undefined) {
        return row[spanIdx];
    }
    return 0;
}

const stayManualPivots = Object.keys(oasisManualPriceTable).map(Number);
const stayElectricPivots = Object.keys(oasisElectricPriceTable).map(Number);

// 기본 비용 항목
const defaultConsItems = [
    { cat: "직접 공사비", name: "경비", spec: "출장비", price: 200000 },
    { cat: "자재 반입비", name: "운임", spec: "화물비" }
];

function getSpanIndex(span) {
    if (span <= 1000) return 0; if (span <= 1500) return 1; if (span <= 2000) return 2; if (span <= 2500) return 3; if (span <= 3000) return 4; if (span <= 3500) return 5; if (span <= 4000) return 6; return -1;
}

function calculatePergolaPrice(model, type, span, pivotVal) {
    const sIdx = getSpanIndex(span);
    if (sIdx === -1) return 0;

    if (model === 'OASIS' || model === 'STAY') {
        const pivot = parseInt(pivotVal);
        let priceList;
        if(type === 'manual') {
            priceList = oasisManualPriceTable[pivot];
        } else {
            priceList = oasisElectricPriceTable[pivot];
        }

        if (priceList && priceList[sIdx] !== undefined) {
            return priceList[sIdx];
        }
    }
    return 0;
}

// --- 초기화 및 함수 정의 ---
// --- 행정 처리 비용 기본 항목 ---
const defaultAdminItems = [
    { name: '감리비', spec: '제품가액 대비', unit: '%', rate: 5, isPercent: true },
    { name: '공과잡비', spec: '제품가액 대비', unit: '%', rate: 5, isPercent: true },
    { name: '기업이윤', spec: '제품가액 대비', unit: '%', rate: 4, isPercent: true },
    { name: '선급금이행증권', spec: '증권 발행비', unit: '건', qty: 1, price: 200000 },
    { name: '하자이행증권', spec: '증권 발행비', unit: '건', qty: 1, price: 200000 }
];

document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toLocaleDateString('ko-KR');
    document.getElementById('view-date').textContent = today;
    initRegions();
    addRow();
    initConsTable();
    initAdminTable();
});

function initRegions() {
    const doSelect = document.getElementById('region-do');
    let opts = '<option value="">시/도 선택</option>';
    Object.keys(regions).forEach(r => opts += `<option value="${r}">${r}</option>`);
    doSelect.innerHTML = opts;
}

// 통합된 핸들러 (지역 변경 시 공급자 업데이트 + 비용 업데이트 + 시군구 업데이트)
function handleRegionChange(select) {
    const val = select.value;
    const siSelect = document.getElementById('region-si');

    // 1. 시/군/구 업데이트
    if(val && regions[val]) {
        let sOpts = '<option value="">시/군/구 선택</option>';
        regions[val].forEach(s => sOpts += `<option value="${s}">${s}</option>`);
        siSelect.innerHTML = sOpts;
        siSelect.disabled = false;
    } else {
        siSelect.innerHTML = '<option value="">시/군/구</option>';
        siSelect.disabled = true;
    }

    // 2. 공급자 정보 업데이트
    updateSupplierInfo(val);

    // 3. 비용 업데이트
    updateCosts();
}

function updateSupplierInfo(regionDo) {
    let supplierData = suppliers.default;
    if (gyeongsangArea.includes(regionDo)) {
        supplierData = suppliers.gyeongsang;
    }

    document.getElementById('supplier-name').textContent = supplierData.name;
    document.getElementById('supplier-biz-no').textContent = supplierData.bizNo;
    document.getElementById('supplier-manager').textContent = supplierData.manager;
    document.getElementById('supplier-phone').textContent = supplierData.phone;
    document.getElementById('supplier-email').textContent = supplierData.email;

    // Footer update
    const footerText = `${supplierData.name} | 담당자: ${supplierData.manager} | 연락처: ${supplierData.phone}`;
    document.getElementById('footer-info').textContent = footerText;
}

function updateCosts() {
    const rDo = document.getElementById('region-do').value;
    if (rDo) {
        updateFreightCost(rDo);
        updateTravelCost(rDo);
    }
}

function updateFreightCost(regionDo) {
    let cost = 0;
    if (regionDo === '제주특별자치도') cost = 1800000;
    else if (regionDo.includes('경상') || regionDo.includes('부산') || regionDo.includes('대구') || regionDo.includes('울산')) cost = 500000;
    else if (regionDo.includes('전라') || regionDo.includes('전북') || regionDo.includes('광주')) cost = 500000;
    else if (regionDo.includes('충청') || regionDo.includes('대전') || regionDo.includes('세종')) cost = 400000;
    else if (regionDo.includes('강원')) cost = 500000;
    else if (regionDo.includes('경기') || regionDo.includes('인천') || regionDo.includes('서울')) cost = 300000;

    const consRows = document.querySelectorAll('#cons-tbody tr');
    consRows.forEach(row => {
        const nameInput = row.querySelector('td:nth-child(2) input');
        if (nameInput && nameInput.value === "운임") {
            const priceInput = row.querySelector('.c-price');
            priceInput.value = cost;
            calcCons(priceInput);
        }
    });
}

function updateTravelCost(regionDo) {
    let cost = 200000;
    if (regionDo === '서울특별시' || regionDo === '경기도') cost = 0;

    const consRows = document.querySelectorAll('#cons-tbody tr');
    consRows.forEach(row => {
        const nameInput = row.querySelector('td:nth-child(2) input');
        const specInput = row.querySelector('td:nth-child(3) input');
        if (nameInput && nameInput.value === "경비" && specInput && specInput.value === "출장비") {
            const priceInput = row.querySelector('.c-price'); priceInput.value = cost; calcCons(priceInput);
        }
    });
}

function addRow() {
    const tbody = document.getElementById('est-tbody');
    const tr = document.createElement('tr');
    let prodOpts = '<option value="">선택</option>';
    productCategories.forEach(cat => {
        prodOpts += `<optgroup label="-- ${cat.label} --">`;
        cat.items.forEach(item => { prodOpts += `<option value="${item}">${item}</option>`; });
        prodOpts += `</optgroup>`;
    });
    tr.innerHTML = `<td><input type="tel" class="excel-input text-center" placeholder="No"></td><td><select class="excel-input" onchange="handleProdChange(this)">${prodOpts}</select><input type="text" class="excel-input hidden-on-print force-hidden" placeholder="품명 입력"></td><td class="spec-cell"><input type="text" class="excel-input text-center" placeholder="규격"></td><td><select class="excel-input text-center color-select" onchange="calcRow(this)" disabled><option value="">선택</option><option value="화이트">화이트</option><option value="차콜">차콜</option><option value="기타">기타 (할증)</option></select></td><td class="option-cell"><input type="text" class="excel-input" placeholder="옵션"></td><td><input type="text" class="excel-input text-center" value="식"></td><td><input type="text" class="excel-input text-center qty" oninput="calcRow(this)" placeholder="0" value="1"></td><td><input type="text" class="excel-input text-right price" oninput="handleManualPrice(this)" placeholder="0" data-base-price="0"></td><td class="text-right px-2"><span class="sum">0</span></td><td class="text-center hidden-on-print"><button onclick="delRow(this)" class="text-red-500 font-bold p-1 text-sm">×</button></td>`;
    tbody.appendChild(tr);
}

function handleProdChange(sel) {
    const tr = sel.closest('tr'); const specCell = tr.querySelector('.spec-cell'); const optionCell = tr.querySelector('.option-cell'); const customInput = sel.nextElementSibling; const colorSelect = tr.querySelector('.color-select');

    // Zip Screen 사용자 수정 플래그 초기화
    const priceInput = tr.querySelector('.price');
    if (priceInput) delete priceInput.dataset.userEdited;

    // 색상 옵션 및 단위 기본값으로 초기화
    colorSelect.innerHTML = '<option value="">선택</option><option value="화이트">화이트</option><option value="차콜">차콜</option><option value="기타">기타 (할증)</option>';
    const otherOption = colorSelect.querySelector('option[value="기타"]');
    colorSelect.disabled = false; colorSelect.value = '';
    tr.querySelector('td:nth-child(6) input').value = "식";

    // "직접 입력" or "custom" handling
    if(sel.value === 'custom' || sel.value === '직접 입력') {
        sel.classList.add('force-hidden');
        customInput.classList.remove('force-hidden');
        customInput.focus();

        // Clear cells but keep as input
        specCell.innerHTML = '<input type="text" class="excel-input text-center" placeholder="규격">';
        optionCell.innerHTML = '<input type="text" class="excel-input" placeholder="옵션 입력">';

        // Update "기타" option to "+15%"
        otherOption.textContent = "기타 (+15%)";
        colorSelect.disabled = false;
        return;
    } else {
        sel.classList.remove('force-hidden');
        customInput.classList.add('force-hidden');
    }

    const isOasis = sel.value.includes("OASIS");
    const isMirage = sel.value === "Mirage";
    const isGlass = sel.value.includes("Glass");
    const isDeck = sel.value.includes("스톤 데크");
    const isCheolpan = sel.value === "스톤 첼판";
    const isZipScreen = sel.value === "Zip Screen";

    if (isOasis || isGlass || isMirage || isZipScreen) {
        otherOption.textContent = "기타 (+15%)";
    } else if (!isDeck && !isCheolpan) {
        otherOption.textContent = "기타 (할증)";
        colorSelect.disabled = true;
    }

    if (isOasis) {
        let pivotOpts = '<option value="">선택</option>'; let pivotList = [];
        const isManual = sel.value.includes("수동");
        pivotList = isManual ? stayManualPivots : stayElectricPivots;

        pivotList.forEach(p => pivotOpts += `<option value="${p}">${p}</option>`);
        let heightSelectHtml = `<div class="spec-row"><span class="spec-label">H</span><select class="excel-input spec-input spec-height" onchange="calcPergola(this)"><option value="3000이하">3000이하</option><option value="6000이하">6000이하 (+100만)</option></select></div>`;

        specCell.innerHTML = `<div class="spec-container"><div class="spec-row"><span class="spec-label">Span</span><input type="tel" class="excel-input spec-input spec-span" placeholder="입력(mm)" oninput="calcPergola(this)"></div><div class="spec-row"><span class="spec-label">Pivot</span><select class="excel-input spec-input spec-pivot" onchange="calcPergola(this)">${pivotOpts}</select></div>${heightSelectHtml}</div>`;

        optionCell.innerHTML = `<div class="option-container"><label class="option-row option-label"><input type="checkbox" class="opt-led" onchange="calcRow(this)"><span>LED 싱글 라인등</span></label><div class="option-row"><label class="option-label"><input type="checkbox" class="opt-pillar-chk" onchange="togglePillarInput(this)"><span>기둥 추가</span></label><input type="tel" class="option-qty-input opt-pillar" placeholder="0" min="0" disabled oninput="calcRow(this)"></div></div>`;
    } else if (isMirage) {
        // Mirage: 스팬/피봇 모두 자유 입력, 높이(h) 선택
        specCell.innerHTML = `<div class="spec-container"><div class="spec-row"><span class="spec-label">Span</span><input type="tel" class="excel-input spec-input spec-span" placeholder="입력(mm)" oninput="calcMirage(this)"></div><div class="spec-row"><span class="spec-label">Pivot</span><input type="tel" class="excel-input spec-input spec-pivot" placeholder="입력(mm)" oninput="calcMirage(this)"></div><div class="spec-row"><span class="spec-label">H</span><select class="excel-input spec-input spec-height" onchange="calcMirage(this)"><option value="3000이하">3000이하 (무료)</option><option value="4000이하">4000이하 (+50만)</option></select></div></div>`;

        // Mirage 색상: 프레임(화이트/차/기타15%) + 원단(화이트/베이지/차콜) 분리
        colorSelect.innerHTML = '<option value="">프레임 선택</option><option value="화이트">화이트</option><option value="차콜">차콜</option><option value="기타">기타 (+15%)</option>';
        colorSelect.disabled = false;

        // 옵션: 원단 색상 선택 + LED 포함
        optionCell.innerHTML = `<div class="option-container"><div class="option-row" style="gap:4px;"><span style="font-size:11px;color:#666;font-weight:600;min-width:28px;">원단</span><select class="excel-input mirage-fabric" style="flex:1;" onchange="calcRow(this)"><option value="">선택</option><option value="화이트">화이트</option><option value="베이지">베이지</option><option value="차콜">차콜</option></select></div><label class="option-row option-label"><input type="checkbox" class="opt-mirage-led" onchange="calcRow(this)"><span>LED 포함 (+50만)</span></label></div>`;
    } else if (sel.value === "Glass Sliding") {
        specCell.innerHTML = `<select class="excel-input text-center glass-spec" onchange="calcRow(this)"><option value="2500_under">2500mm 미만</option><option value="2500_over">2500mm 이상</option></select>`;
        optionCell.innerHTML = `<input type="text" class="excel-input" value="" readonly>`;
    } else if (sel.value === "Glass Folding") {
        specCell.innerHTML = `<input type="text" class="excel-input text-center" placeholder="규격 입력">`;
        optionCell.innerHTML = `<input type="text" class="excel-input" placeholder="옵션 입력">`;
        tr.querySelector('td:nth-child(6) input').value = "짝";
    } else if (sel.value === "Fix Glass") {
        specCell.innerHTML = '<input type="text" class="excel-input text-center" placeholder="규격 입력">';
        optionCell.innerHTML = `<input type="text" class="excel-input" value="시공비별도" readonly>`;
    } else if (isZipScreen) {
        specCell.innerHTML = `<div class="spec-container"><div class="spec-row"><span class="spec-label">W</span><input type="tel" class="excel-input spec-input spec-width" placeholder="가로" oninput="calcZipScreen(this)"><span class="spec-unit">mm</span></div><div class="spec-row"><span class="spec-label">H</span><input type="tel" class="excel-input spec-input spec-height-zip" placeholder="세로" oninput="calcZipScreen(this)"><span class="spec-unit">mm</span></div></div>`;
        colorSelect.innerHTML = '<option value="">선택</option><option value="화이트">화이트</option><option value="다크그레이">다크그레이</option>';
        colorSelect.disabled = false;
        optionCell.innerHTML = '<input type="text" class="excel-input" placeholder="옵션 입력">';
        tr.querySelector('td:nth-child(6) input').value = "m2";
    } else if (isDeck) {
        specCell.innerHTML = `<div class="spec-container"><div class="spec-row"><span class="spec-label" style="width:auto;font-size:10px;">상판</span><input type="tel" class="excel-input spec-input spec-top-w" placeholder="가로" style="width:50px;" oninput="calcDeckSpec(this)"><span class="spec-unit">×</span><input type="tel" class="excel-input spec-input spec-top-h" placeholder="세로" style="width:50px;" oninput="calcDeckSpec(this)"><span class="spec-unit">mm</span></div></div>`;
        optionCell.innerHTML = `<input type="text" class="excel-input" placeholder="옵션 입력">`;
        tr.querySelector('td:nth-child(6) input').value = "m2";
        colorSelect.innerHTML = buildDeckColorSelectHTML();
        colorSelect.disabled = false;
        colorSelect.setAttribute('onchange', 'handleDeckColorChange(this)');
        tr.querySelector('.qty').readOnly = true;
    } else if (isCheolpan) {
        specCell.innerHTML = `<div class="spec-container"><div class="spec-row"><span class="spec-label" style="width:auto;font-size:10px;">첼판</span><input type="tel" class="excel-input spec-input spec-cheol-length" placeholder="길이" style="width:50px;" oninput="calcCheolpanSpec(this)"><span class="spec-unit">×</span><input type="tel" class="excel-input spec-input spec-cheol-height" placeholder="높이" style="width:50px;" oninput="calcCheolpanSpec(this)"><span class="spec-unit">mm</span></div></div>`;
        optionCell.innerHTML = `<input type="text" class="excel-input" placeholder="옵션 입력">`;
        tr.querySelector('td:nth-child(6) input').value = "m";
        colorSelect.innerHTML = buildDeckColorSelectHTML();
        colorSelect.disabled = false;
        colorSelect.setAttribute('onchange', 'handleDeckColorChange(this)');
        tr.querySelector('.qty').readOnly = true;
    } else {
        // Restore default cells for other items
        specCell.innerHTML = '<input type="text" class="excel-input text-center" placeholder="규격">';
        optionCell.innerHTML = '<input type="text" class="excel-input" placeholder="옵션 입력">';
    }
    tr.querySelector('.price').value = ''; tr.querySelector('.price').dataset.basePrice = 0; calcRow(sel);
}

function togglePillarInput(chk) { const input = chk.closest('.option-row').querySelector('.opt-pillar'); input.disabled = !chk.checked; if(!chk.checked) input.value = ''; calcRow(chk); }
function handleManualPrice(el) {
    const tr = el.closest('tr');
    const prodSelect = tr.querySelector('td:nth-child(2) select');
    if (prodSelect && prodSelect.value === 'Zip Screen') {
        el.dataset.userEdited = 'true';
    }
    el.dataset.basePrice = el.value;
    calcRow(el);
}

function calcPergola(el) {
    const tr = el.closest('tr'); const prodName = tr.querySelector('td:nth-child(2) select').value;
    const span = parseInt(tr.querySelector('.spec-span')?.value) || 0; const pivot = parseInt(tr.querySelector('.spec-pivot')?.value) || 0; const heightVal = tr.querySelector('.spec-height')?.value;
    if (span > 0 && pivot > 0) {
        let model = "STAY", type = "manual";
        if(prodName.includes("OASIS")) model = "OASIS";
        if(prodName.includes("전동")) type = "electric";

        let basePrice = calculatePergolaPrice(model, type, span, pivot);
        if (heightVal === '6000이하') basePrice += 1000000;
        if (prodName.includes("New OASIS")) basePrice += 500000;
        const priceInput = tr.querySelector('.price'); priceInput.dataset.basePrice = basePrice; calcRow(el);
    }
}

function calcMirage(el) {
    const tr = el.closest('tr');
    const span = parseInt(tr.querySelector('.spec-span')?.value) || 0;
    const pivot = parseInt(tr.querySelector('.spec-pivot')?.value) || 0;
    const heightVal = tr.querySelector('.spec-height')?.value;

    if (span > 0 && pivot > 0) {
        let basePrice = calculateMiragePrice(span, pivot);
        if (heightVal === '4000이하') basePrice += 500000;
        const priceInput = tr.querySelector('.price');
        priceInput.dataset.basePrice = basePrice;
        calcRow(el);
    }
}

function calcZipScreen(el) {
    const tr = el.closest('tr');
    const w = parseInt(tr.querySelector('.spec-width')?.value) || 0;
    const h = parseInt(tr.querySelector('.spec-height-zip')?.value) || 0;
    const qtyInput = tr.querySelector('.qty');
    if (w > 0 && h > 0) {
        const area = (w * h) / 1000000;
        qtyInput.value = Math.round(area * 100) / 100; // 소수점 2자리
    } else {
        qtyInput.value = '';
    }
    calcRow(el);
}

function calcRow(el) {
    const tr = el.closest('tr'); const priceInput = tr.querySelector('.price'); const qtyInput = tr.querySelector('.qty'); const colorSelect = tr.querySelector('td:nth-child(4) select');
    const prodSelect = tr.querySelector('td:nth-child(2) select');

    // Check if "Direct Input" mode
    let prodName = prodSelect.value;
    if (prodSelect.classList.contains('force-hidden')) {
         prodName = '직접 입력';
    }

    let basePrice = parseFloat(priceInput.dataset.basePrice);
    if (isNaN(basePrice)) basePrice = 0;
    if (priceInput.value === '-') basePrice = 0;

    if (prodName === "Glass Sliding") {
        const specVal = tr.querySelector('.glass-spec')?.value;
        if (specVal === '2500_over') basePrice = 600000;
        else basePrice = 500000;
    } else if (prodName === "Glass Folding") {
        basePrice = 350000;
    } else if (prodName === "Fix Glass") {
        basePrice = 150000;
    } else if (prodName.includes("스톤 데크")) {
        // 데크: 색상 기반 단가 — handleDeckColorChange에서 설정
        // basePrice는 dataset에서 가져옴 (변경 없음)
    } else if (prodName === "스톤 첼판") {
        basePrice = 40000;
    } else if (prodName === "Zip Screen") {
        // 사용자가 객단가를 직접 수정한 경우(data-user-edited) 그 값을 유지
        if (priceInput.dataset.userEdited === 'true') {
            basePrice = parseFloat(priceInput.value) || 150000;
        } else {
            basePrice = 150000;
        }
    }

    if (colorSelect.value === '기타') {
        if (prodName.includes("OASIS") || prodName.includes("Glass") || prodName === '직접 입력' || prodName === 'Mirage' || prodName === 'Zip Screen') basePrice = Math.round(basePrice * 1.15);
    }
    let optionAddon = 0;
    if (prodName.includes("OASIS")) {
        const isManual = prodName.includes("수동");
        if (tr.querySelector('.opt-led')?.checked) optionAddon += isManual ? 1000000 : 500000;
        if (tr.querySelector('.opt-pillar-chk')?.checked) optionAddon += (parseInt(tr.querySelector('.opt-pillar')?.value)||0) * 500000;
    }
    if (prodName === "Mirage") {
        if (tr.querySelector('.opt-mirage-led')?.checked) optionAddon += 500000;
    }

    let finalUnitPrice = basePrice + optionAddon;

    // 품목 선택을 통한 자동 단가가 아닌, 직접 입력 상태인 경우 덮어쓰기 방지
    if (prodSelect.classList.contains('force-hidden') || prodName === '직접 입력' || prodName === 'custom') {
         // 그대로 둠
    } else if (prodName === 'Zip Screen' && priceInput.dataset.userEdited === 'true') {
         // Zip Screen 사용자 수정 객단가 유지
    } else {
         priceInput.value = finalUnitPrice !== 0 ? finalUnitPrice : '';
    }

    const qty = parseFloat(qtyInput.value) || 0;
    const sum = finalUnitPrice * qty;
    tr.querySelector('.sum').textContent = sum.toLocaleString();

    syncAutoCalcItems();
}

function syncAutoCalcItems() {
    let oasisTotalQty = 0;
    let newOasisTotalQty = 0;
    let glassTotalQty = 0;
    let glassFoldingTotalQty = 0;
    let fixGlassQty = 0;
    let stoneDeckPedestalQty = 0;  // 스톤 데크 (+페데스탈)
    let stoneDeckTubeQty = 0;     // 스톤 데크 (+각관)
    let stoneCheolpanQty = 0;     // 스톤 첼판
    let hasManualOasisLed = false;
    let mirageTotalQty = 0;
    let mirageConsData = []; // 각 Mirage 행의 스팬*피봇 면적 저장
    let zipScreenTotalQty = 0;

    const prodRows = document.querySelectorAll('#est-tbody tr');
    prodRows.forEach(row => {
        const prodSelect = row.querySelector('td:nth-child(2) select');
        const qtyInput = row.querySelector('.qty');
        if (prodSelect && qtyInput) {
            const prodName = prodSelect.value;
            const qty = parseFloat(qtyInput.value) || 0;
            if (prodName.includes("New OASIS")) newOasisTotalQty += qty;
            else if (prodName.includes("OASIS")) oasisTotalQty += qty;
            if (prodName.includes("Glass Sliding")) glassTotalQty += qty;
            if (prodName === "Glass Folding") glassFoldingTotalQty += qty;
            if (prodName.includes("Fix Glass")) fixGlassQty += qty;
            if (prodName === "스톤 데크 (+페데스탈)") stoneDeckPedestalQty += qty;
            if (prodName === "스톤 데크 (+각관)") stoneDeckTubeQty += qty;
            if (prodName === "스톤 첼판") stoneCheolpanQty += qty;

            if (prodName.includes("OASIS (수동)")) {
                if (row.querySelector('.opt-led')?.checked) {
                    hasManualOasisLed = true;
                }
            }

            if (prodName === "Zip Screen") zipScreenTotalQty += qty;

            if (prodName === "Mirage") {
                mirageTotalQty += qty;
                const span = parseInt(row.querySelector('.spec-span')?.value) || 0;
                const pivot = parseInt(row.querySelector('.spec-pivot')?.value) || 0;
                if (span > 0 && pivot > 0) {
                    // 면적(m2) = span(mm) * pivot(mm) / 1,000,000
                    const area = (span * pivot) / 1000000;
                    mirageConsData.push({ area: area, qty: qty });
                }
            }
        }
    });

    let fixGlassConsFound = false;
    let glassConsFound = false;
    let glassFoldingConsFound = false;
    let oasisConsFound = false;
    let newOasisConsFound = false;
    let stoneDeckPedestalConsFound = false;
    let stoneDeckTubeConsFound = false;
    let stoneDeckTubeMaterialFound = false;
    let stoneCheolpanConsFound = false;
    let mirageConsFound = false;
    let zipScreenConsFound = false;

    const existingConsRows = document.querySelectorAll('#cons-tbody tr');
    existingConsRows.forEach(row => {
        const nameInput = row.querySelector('td:nth-child(2) input');
        const specInput = row.querySelector('td:nth-child(3) input');
        if (nameInput) {
            if (nameInput.value === "Fix Glass") fixGlassConsFound = true;
            if (nameInput.value === "Glass Sliding") glassConsFound = true;
            if (nameInput.value === "Glass Folding") glassFoldingConsFound = true;
            if (nameInput.value === "OASIS") oasisConsFound = true;
            if (nameInput.value === "New OASIS") newOasisConsFound = true;
            if (nameInput.value === "Mirage") mirageConsFound = true;
            if (nameInput.value === "Zip Screen") zipScreenConsFound = true;

            if (nameInput.value === "스톤데크") {
                if (specInput && specInput.value.includes("페데스탈")) stoneDeckPedestalConsFound = true;
                if (specInput && specInput.value.includes("각관")) stoneDeckTubeConsFound = true;
            }
            if (nameInput.value === "각관") {
                if (specInput && specInput.value.includes("각관 구입비")) stoneDeckTubeMaterialFound = true;
            }
            if (nameInput.value === "스톤 첼판") {
                stoneCheolpanConsFound = true;
            }
        }
    });

    if (fixGlassQty > 0 && !fixGlassConsFound) {
        addConsRow({ cat: '직접 공사비', name: 'Fix Glass', spec: '시공비', price: 30000 });
    }
    if (glassTotalQty > 0 && !glassConsFound) {
        addConsRow({ cat: '직접 공사비', name: 'Glass Sliding', spec: '시공비', price: 0 });
    }
    if (glassFoldingTotalQty > 0 && !glassFoldingConsFound) {
        addConsRow({ cat: '직접 공사비', name: 'Glass Folding', spec: '시공비', price: 100000 });
    }
    if (oasisTotalQty > 0 && !oasisConsFound) {
        addConsRow({ cat: '직접 공사비', name: 'OASIS', spec: '기술료/시공자재비', price: 800000 });
    }
    if (newOasisTotalQty > 0 && !newOasisConsFound) {
        addConsRow({ cat: '직접 공사비', name: 'New OASIS', spec: '기술료/시공자재비/실측비', price: 1000000 });
    }
    if (mirageTotalQty > 0 && !mirageConsFound) {
        addConsRow({ cat: '직접 공사비', name: 'Mirage', spec: '시공비', price: 0 });
    }
    if (zipScreenTotalQty > 0 && !zipScreenConsFound) {
        addConsRow({ cat: '직접 공사비', name: 'Zip Screen', spec: '기술료/시공자재비', price: 0 });
    }
    if ((stoneDeckPedestalQty > 0 || stoneDeckTubeQty > 0) && !stoneDeckPedestalConsFound) {
        addConsRow({ cat: '직접 공사비', name: '스톤데크', spec: '스톤데크+페데스탈 시공', unit: 'm2', price: 30000 });
    }
    if (stoneDeckTubeQty > 0 && !stoneDeckTubeConsFound) {
        addConsRow({ cat: '직접 공사비', name: '스톤데크', spec: '+ 각관 시공', unit: 'm2', price: 30000 });
    }
    if (stoneDeckTubeQty > 0 && !stoneDeckTubeMaterialFound) {
        addConsRow({ cat: '자재 구입비', name: '각관', spec: '각관 구입비 및 운임', unit: 'm2', price: 40000 });
    }
    if (stoneCheolpanQty > 0 && !stoneCheolpanConsFound) {
        addConsRow({ cat: '직접 공사비', name: '스톤 첼판', spec: '첼판 마감 비용', unit: 'm', price: 30000 });
    }

    const consRows = document.querySelectorAll('#cons-tbody tr');
    consRows.forEach(row => {
        const nameInput = row.querySelector('td:nth-child(2) input');
        const qtyInput = row.querySelector('.c-qty');
        const priceInput = row.querySelector('.c-price');
        const specInput = row.querySelector('td:nth-child(3) input');

        if (nameInput && nameInput.value === "OASIS") {
            if (qtyInput) qtyInput.value = oasisTotalQty;
            priceInput.value = 800000;
            calcCons(qtyInput, false);
        }

        if (nameInput && nameInput.value === "New OASIS") {
            if (qtyInput) qtyInput.value = newOasisTotalQty;
            priceInput.value = 1000000;
            calcCons(qtyInput, false);
        }

        if (nameInput && nameInput.value === "Glass Sliding") {
            if (glassTotalQty > 0) {
                if (glassTotalQty < 9) {
                    qtyInput.value = 1;
                    priceInput.value = 600000;
                    if(specInput) specInput.value = "기본 시공비 (9짝 미만)";
                } else {
                    qtyInput.value = glassTotalQty;
                    priceInput.value = 70000;
                    if(specInput) specInput.value = "짝당 시공비";
                }
            } else {
                qtyInput.value = 0;
                priceInput.value = 0;
            }
            calcCons(qtyInput, false);
        }

        if (nameInput && nameInput.value === "Glass Folding") {
            if (glassFoldingTotalQty > 0) {
                if (glassFoldingTotalQty < 6) {
                    qtyInput.value = 1;
                    priceInput.value = 600000;
                    if(specInput) specInput.value = "기본 시공비 (6짝 미만)";
                } else {
                    qtyInput.value = glassFoldingTotalQty;
                    priceInput.value = 100000;
                    if(specInput) specInput.value = "짝당 시공비";
                }
            } else {
                qtyInput.value = 0;
                priceInput.value = 0;
            }
            calcCons(qtyInput, false);
        }

        if (nameInput && nameInput.value === "Fix Glass") {
            if (fixGlassQty > 0) {
                qtyInput.value = fixGlassQty;
                priceInput.value = 30000;
            } else {
                qtyInput.value = 0;
                priceInput.value = 0;
            }
            calcCons(qtyInput, false);
        }

        // Mirage 시공비: Glass Sliding과 유사한 구조
        // 24m² 이하: 기본 시공비 1,200,000원 (수량1, 단가1,200,000)
        // 24m² 초과: m²당 50,000원 (수량=면적, 단가=50,000)
        if (nameInput && nameInput.value === "Mirage") {
            if (mirageTotalQty > 0 && mirageConsData.length > 0) {
                let totalArea = 0;
                mirageConsData.forEach(d => { totalArea += d.area * d.qty; });
                if (totalArea <= 26) {
                    qtyInput.value = 1;
                    priceInput.value = 1300000;
                    if(specInput) specInput.value = "기본 시공비 (26m² 이하)";
                } else {
                    qtyInput.value = Math.ceil(totalArea);
                    priceInput.value = 50000;
                    if(specInput) specInput.value = "m²당 시공비";
                }
            } else {
                qtyInput.value = 0;
                priceInput.value = 0;
            }
            calcCons(qtyInput, false);
        }

        if (nameInput && nameInput.value === "운임") {
            let requiredTrucks = Math.ceil((oasisTotalQty + newOasisTotalQty) / 2);
            if (mirageTotalQty > 0) requiredTrucks += Math.ceil(mirageTotalQty / 2);
            if (glassTotalQty > 0) requiredTrucks += 1;
            if (glassFoldingTotalQty > 0) requiredTrucks += 1;
            if (zipScreenTotalQty > 0) requiredTrucks += 1;
            if (stoneDeckPedestalQty > 0) requiredTrucks += 1;
            if (stoneDeckTubeQty > 0) requiredTrucks += 1;
            if (stoneCheolpanQty > 0) requiredTrucks += 1;
            if (qtyInput) qtyInput.value = requiredTrucks > 0 ? requiredTrucks : 1;
            calcCons(qtyInput, false);
        }

        if (nameInput && nameInput.value === "양중비") {
            let liftingCount = 1;
            if (glassTotalQty > 0 || glassFoldingTotalQty > 0) liftingCount += 1;
            if (qtyInput) qtyInput.value = liftingCount;
            calcCons(qtyInput, false);
        }

        // Zip Screen 시공비 자동 연동: 12m² 이하 기본 60만원, 초과 시 m²당 5만원
        if (nameInput && nameInput.value === "Zip Screen") {
            if (zipScreenTotalQty > 0) {
                if (zipScreenTotalQty <= 12) {
                    if(qtyInput) qtyInput.value = 1;
                    priceInput.value = 600000;
                    if(specInput) specInput.value = "기본 시공비 (12m² 이하)";
                } else {
                    if(qtyInput) qtyInput.value = Math.ceil(zipScreenTotalQty);
                    priceInput.value = 50000;
                    if(specInput) specInput.value = "m²당 시공비";
                }
                row.querySelector('td:nth-child(4) input').value = "m2";
            } else {
                if(qtyInput) qtyInput.value = 0;
                priceInput.value = 0;
            }
            calcCons(qtyInput, false);
        }

        // 스톤 데크 수량(m2) 자동 연동
        if (nameInput && nameInput.value === "스톤데크") {
            if (specInput && specInput.value.includes("페데스탈")) {
                const combinedDeckQty = stoneDeckPedestalQty + stoneDeckTubeQty;
                if (combinedDeckQty > 0) {
                    if(qtyInput) qtyInput.value = Math.ceil(combinedDeckQty);
                    priceInput.value = 30000;
                    row.querySelector('td:nth-child(4) input').value = "m2";
                } else {
                    if(qtyInput) qtyInput.value = 0;
                    priceInput.value = 0;
                }
                calcCons(qtyInput, false);
            }
            if (specInput && specInput.value.includes("각관")) {
                if (stoneDeckTubeQty > 0) {
                    if(qtyInput) qtyInput.value = Math.ceil(stoneDeckTubeQty);
                    priceInput.value = 30000;
                    row.querySelector('td:nth-child(4) input').value = "m2";
                } else {
                    if(qtyInput) qtyInput.value = 0;
                    priceInput.value = 0;
                }
                calcCons(qtyInput, false);
            }
        }
        // 각관 자재 구입비 자동 연동
        if (nameInput && nameInput.value === "각관") {
            if (specInput && specInput.value.includes("각관 구입비")) {
                if (stoneDeckTubeQty > 0) {
                    if(qtyInput) qtyInput.value = Math.ceil(stoneDeckTubeQty);
                    priceInput.value = 40000;
                    row.querySelector('td:nth-child(4) input').value = "m2";
                } else {
                    if(qtyInput) qtyInput.value = 0;
                    priceInput.value = 0;
                }
                calcCons(qtyInput, false);
            }
        }
        // 스톤 첼판 수량(m) 자동 연동
        if (nameInput && nameInput.value === "스톤 첼판") {
            if (stoneCheolpanQty > 0) {
                if(qtyInput) qtyInput.value = Math.ceil(stoneCheolpanQty);
                priceInput.value = 30000;
                row.querySelector('td:nth-child(4) input').value = "m";
            } else {
                if(qtyInput) qtyInput.value = 0;
                priceInput.value = 0;
            }
            calcCons(qtyInput, false);
        }
    });

    const discountArea = document.getElementById('discount-message-area');
    const existingWarning = discountArea.querySelector('.warning-text');
    if (existingWarning) existingWarning.remove();

    if (hasManualOasisLed) {
        const warningMsg = document.createElement('div');
        warningMsg.className = 'warning-text';
        warningMsg.innerHTML = '<strong>주의:</strong> 수동(Manual) 선택 시 LED 수신기, SMPS, 리모컨, 부속함 등을 별도 구매해야 하므로 LED 비용이 높게 측정될 수 있습니다. 전동(Electric)을 선택하시면 통합 부품으로 더 합리적인 비용이 책정됩니다.';
        discountArea.appendChild(warningMsg);
    }

    sortConsRows();
    calcTotal(true);
}

function sortConsRows() {
    const tbody = document.getElementById('cons-tbody');
    const rows = Array.from(tbody.children);

    rows.sort((a, b) => {
        const aName = getConsRowName(a);
        const bName = getConsRowName(b);
        const aCat = a.querySelector('td:nth-child(1) input').value;
        const bCat = b.querySelector('td:nth-child(1) input').value;

        const getPriority = (cat, name) => {
            if (name === "OASIS" || name === "New OASIS" || name === "Glass Sliding" || name === "Glass Folding" || name === "Fix Glass" || name === "스톤데크" || name === "스톤 첼판" || name === "각관" || name === "Mirage" || name === "Zip Screen") return 1;
            if (name === "기초석" || name === "경비") return 2;
            if (cat === "자재 반입비") return 3;
            if (cat === "간접 공사비") return 4;
            if (cat === "자체공사비") return 5;
            return 6;
        };

        return getPriority(aCat, aName) - getPriority(bCat, bName);
    });

    rows.forEach(row => tbody.appendChild(row));
}

function getConsRowName(row) {
    const select = row.querySelector('td:nth-child(2) select');
    if (select) return select.value;
    const input = row.querySelector('td:nth-child(2) input');
    return input ? input.value : "";
}

function initConsTable() { defaultConsItems.forEach(item => addConsRow(item)); }

function addConsRow(item = null) {
    const tbody = document.getElementById('cons-tbody'); const tr = document.createElement('tr');
    const cat = item ? item.cat : ''; const name = item ? item.name : ''; const spec = item ? item.spec : ''; const price = item && item.price ? item.price : ''; const isPercent = item && item.isPercent; const isProductSelect = item && item.isProductSelect; const unit = item && item.unit ? item.unit : '식';

    let nameField = `<input type="text" class="excel-input ${isPercent ? 'auto-calc-field name-field' : ''}" value="${name}" placeholder="항목명" ${isPercent ? 'readonly' : ''}>`;

    tr.innerHTML = `<td><input type="text" class="excel-input text-center" value="${cat}" placeholder="구분"></td><td>${nameField}</td><td>${isProductSelect ? '<input type="text" class="excel-input" value="기술료/시공자재비" readonly>' : `<input type="text" class="excel-input" value="${spec}" placeholder="상세내용">`}</td><td><input type="text" class="excel-input text-center" value="${unit}"></td><td><input type="text" class="excel-input text-center c-qty" oninput="calcCons(this)" placeholder="1" value="1" ${isPercent ? 'readonly' : ''}></td><td><input type="text" class="excel-input text-right c-price ${isPercent ? 'auto-calc-field' : ''}" oninput="calcCons(this)" placeholder="0" value="${price}" ${isPercent ? 'readonly' : ''}></td><td class="text-right px-2"><span class="c-sum">0</span></td><td class="text-center hidden-on-print"><button onclick="delRow(this)" class="text-red-500 font-bold p-1 text-sm">×</button></td>`;
    let insertIndex = -1; if (cat) { const rows = Array.from(tbody.children); for(let i = rows.length - 1; i >= 0; i--) { if(rows[i].querySelector('td:nth-child(1) input').value === cat) { insertIndex = i; break; } } }
    if(insertIndex !== -1) tbody.children[insertIndex].after(tr); else tbody.appendChild(tr);
    if(name === "항목명") {
        const nameCell = tr.querySelector('td:nth-child(2)');
        let consProdOpts = '<option value="">선택</option>';
        productCategories.forEach(cat => { consProdOpts += `<optgroup label="-- ${cat.label} --">`; cat.items.forEach(item => { consProdOpts += `<option value="${item}">${item}</option>`; }); consProdOpts += `</optgroup>`; });
        nameCell.innerHTML = `<select class="excel-input" onchange="handleConsProdChange(this)">${consProdOpts}</select><input type="text" class="excel-input hidden-on-print force-hidden" placeholder="항목명">`;
    }
    if(price || isPercent) calcCons(tr.querySelector('.c-price'), false);
}

// --- NEW BUTTON FUNCTIONS ---
function addGenericDirectConsRow() {
    addConsRow({ cat: '직접 공사비', name: '', spec: '', price: 0 });
}

function addMeasurementRow() { addConsRow({ cat: '직접 공사비', name: '경비', spec: '실측비', price: 200000 }); }
function addFoundationRow() { addConsRow({ cat: '직접 공사비', name: '기초석', spec: '자재/시공', price: 200000 }); }
function addIronworkRow() { addConsRow({ cat: '직접 공사비', name: '철물', spec: '자재/시공', price: 400000 }); }
function addLiftingRow() {
    addConsRow({ cat: '자재 반입비', name: '양중비', spec: '사다리차/스카이', price: 300000 });
    syncAutoCalcItems();
}
function addDirectConsRow() {
    addConsRow({ cat: '직접 공사비', name: 'OASIS', spec: '기술료/시공자재비', price: 800000 });
    syncAutoCalcItems();
}
function addDeckRow() {
    addConsRow({ cat: '자체공사비', name: '데크', spec: '데크공사 일체 (m2)', price: 180000 });
    const textarea = document.getElementById('remarks-area');
    textarea.value += (textarea.value ? "\n" : "") + "- 데크 공사의 경우 기본 공사 비용으로 자재선택, 현장 상황에 따라 견적이 변경될 수 있습니다.";
}
function addIndirectConsRow() {
    // 기존 간접공사비는 행정 처리 비용 섹션으로 이동됨
}

function handleConsProdChange(sel) { /* ... */ }

function calcCons(el, triggerTotal = true) {
    const tr = el.closest('tr');
    const qty = parseFloat(tr.querySelector('.c-qty').value) || 0;
    const price = parseFloat(tr.querySelector('.c-price').value) || 0;
    const sum = qty * price;
    tr.querySelector('.c-sum').textContent = sum.toLocaleString();
    if(triggerTotal) calcTotal(false);
}

function calcTotal(triggerPercentUpdate = true) {
    let prodTotal = 0; document.querySelectorAll('#est-tbody .sum').forEach(el => prodTotal += parseFloat(el.textContent.replace(/,/g,''))||0);

    // 행정비용 자동 계산 (% 항목)
    if (triggerPercentUpdate) {
        updateAdminCosts(prodTotal);
    }

    const discountArea = document.getElementById('discount-message-area');
    const warning = discountArea.querySelector('.warning-text');
    discountArea.innerHTML = '';
    if(warning) discountArea.appendChild(warning);

    // 면제 안내문구 갱신
    updateExemptionRemarks();

    let adminTotal = 0; document.querySelectorAll('#admin-tbody .a-sum').forEach(el => adminTotal += parseFloat(el.textContent.replace(/,/g,''))||0);
    let consTotal = 0; document.querySelectorAll('#cons-tbody .c-sum').forEach(el => consTotal += parseFloat(el.textContent.replace(/,/g,''))||0);
    const totalSupply = prodTotal + adminTotal + consTotal;
    const afterDiscount = totalSupply;
    const tax = Math.round(afterDiscount * 0.1);
    const grandTotal = afterDiscount + tax;
    document.getElementById('val-prod-sum').textContent = prodTotal.toLocaleString();
    document.getElementById('val-admin-sum').textContent = adminTotal.toLocaleString();
    document.getElementById('val-cons-sum').textContent = consTotal.toLocaleString();
    document.getElementById('val-supply').textContent = totalSupply.toLocaleString();
    document.getElementById('val-tax').textContent = tax.toLocaleString();
    document.getElementById('val-total').textContent = grandTotal.toLocaleString();
}
// --- 행정 처리 비용 ---
function initAdminTable() {
    // 행정 항목은 기본 비활성 — 필요시 + 버튼으로 추가
    calcTotal(true);
}

function addAdminRow(item) {
    const tbody = document.getElementById('admin-tbody');
    const tr = document.createElement('tr');
    tr.dataset.adminName = item.name;
    if (item.isPercent) tr.dataset.adminRate = item.rate;

    const unit = item.isPercent ? '%' : (item.unit || '건');
    const qty = item.isPercent ? item.rate : (item.qty || 1);
    const price = item.isPercent ? 0 : (item.price || 0);
    const readonlyAttr = item.isPercent ? 'readonly' : '';
    const qtyReadonly = item.isPercent ? 'readonly' : '';

    tr.innerHTML = `<td><input type="text" class="excel-input font-bold" value="${item.name}" readonly></td><td><input type="text" class="excel-input" value="${item.spec}" placeholder="상세내용"></td><td><input type="text" class="excel-input text-center" value="${unit}" readonly></td><td><input type="text" class="excel-input text-center a-qty" value="${qty}" ${qtyReadonly} oninput="calcAdmin(this)"></td><td><input type="text" class="excel-input text-right a-price" value="${price}" ${readonlyAttr} oninput="calcAdmin(this)"></td><td class="text-right px-2"><span class="a-sum">0</span></td><td class="text-center hidden-on-print"><button onclick="delAdminRow(this)" class="text-red-500 font-bold p-1 text-sm">×</button></td>`;
    tbody.appendChild(tr);

    if (!item.isPercent) calcAdmin(tr.querySelector('.a-price'), false);
}

function calcAdmin(el, triggerTotal = true) {
    const tr = el.closest('tr');
    const isPercent = tr.dataset.adminRate !== undefined;
    if (isPercent) return; // % 항목은 updateAdminCosts에서 처리
    const qty = parseFloat(tr.querySelector('.a-qty').value) || 0;
    const price = parseFloat(tr.querySelector('.a-price').value) || 0;
    tr.querySelector('.a-sum').textContent = (qty * price).toLocaleString();
    if (triggerTotal) calcTotal(false);
}

function updateAdminCosts(prodTotal) {
    const adminRows = document.querySelectorAll('#admin-tbody tr');
    adminRows.forEach(row => {
        const rate = row.dataset.adminRate;
        if (rate) {
            const pct = parseFloat(rate) / 100;
            const calcPrice = Math.round(prodTotal * pct);
            row.querySelector('.a-price').value = calcPrice;
            row.querySelector('.a-qty').value = rate;
            row.querySelector('.a-sum').textContent = calcPrice.toLocaleString();
        }
    });
}

function delAdminRow(btn) {
    const tr = btn.closest('tr');
    const name = tr.dataset.adminName;
    tr.remove();
    calcTotal(true);
}

function restoreAdminItem(name) {
    // 이미 존재하는지 확인
    const existing = document.querySelectorAll('#admin-tbody tr');
    for (const row of existing) {
        if (row.dataset.adminName === name) {
            alert(`"${name}" 항목이 이미 존재합니다.`);
            return;
        }
    }
    const item = defaultAdminItems.find(i => i.name === name);
    if (item) {
        addAdminRow(item);
        calcTotal(true);
    }
}

function updateExemptionRemarks() {
    const discountArea = document.getElementById('discount-message-area');
    // 기존 면제 메시지 제거
    discountArea.querySelectorAll('.exemption-text').forEach(el => el.remove());

    const existingNames = new Set();
    document.querySelectorAll('#admin-tbody tr').forEach(row => {
        existingNames.add(row.dataset.adminName);
    });

    let prodTotal = 0;
    document.querySelectorAll('#est-tbody .sum').forEach(el => prodTotal += parseFloat(el.textContent.replace(/,/g,''))||0);

    const exemptions = [];

    if (!existingNames.has('감리비')) {
        const amt = Math.round(prodTotal * 0.05).toLocaleString();
        exemptions.push(`시공팀 직계약으로 감리비(${amt}원)는 면제되었습니다. / 본사 턴키 계약을 원하는 경우 재견적 바랍니다.`);
    }
    if (!existingNames.has('공과잡비')) {
        const amt = Math.round(prodTotal * 0.05).toLocaleString();
        exemptions.push(`시공팀 직계약으로 공과잡비(${amt}원)는 면제되었습니다. / 본사 턴키 계약을 원하는 경우 재견적 바랍니다.`);
    }
    if (!existingNames.has('기업이윤')) {
        const amt = Math.round(prodTotal * 0.04).toLocaleString();
        exemptions.push(`기업이윤(${amt}원)이 면제되었습니다. / 담당자 인센티브 및 기업이윤이 삭제되었습니다.`);
    }
    if (!existingNames.has('선급금이행증권')) {
        exemptions.push(`선급금이행증권 미발행으로 해당 금액(200,000원)이 면제되었습니다. / 발행이 필요하다면 재견적 바랍니다.`);
    }
    if (!existingNames.has('하자이행증권')) {
        exemptions.push(`하자이행증권 미발행으로 해당 금액(200,000원)이 면제되었습니다. / 발행이 필요하다면 재견적 바랍니다.`);
    }

    if (exemptions.length > 0) {
        const div = document.createElement('div');
        div.className = 'exemption-text text-xs text-blue-600 space-y-1';
        div.innerHTML = exemptions.map(msg => `<div>• ${msg}</div>`).join('');
        discountArea.appendChild(div);
    }
}

function delRow(btn) {
    btn.closest('tr').remove();
    syncAutoCalcItems();
}

// 견적 테이블에서 제품/옵션 요약 문자열 생성
function getProductSummary() {
    const rows = document.querySelectorAll('#est-tbody tr');
    const productMap = {}; // { "오아시스전동": { qty: 2, options: Set(["LED"]) } }

    rows.forEach(row => {
        const prodSelect = row.querySelector('td:nth-child(2) select');
        const customInput = row.querySelector('td:nth-child(2) input[type="text"]');
        const qtyInput = row.querySelector('.qty');
        if (!prodSelect && !customInput) return;

        let prodName = '';
        if (prodSelect && !prodSelect.classList.contains('force-hidden')) {
            prodName = prodSelect.value;
        } else if (customInput && !customInput.classList.contains('force-hidden')) {
            prodName = customInput.value;
        }
        if (!prodName || prodName.trim() === '') return;

        const qty = parseInt(qtyInput?.value) || 1;

        // 제품명 한글화 및 축약
        let shortName = prodName;
        if (prodName.includes('New OASIS') && prodName.includes('수동')) shortName = 'New오아시스수동';
        else if (prodName.includes('New OASIS') && prodName.includes('전동')) shortName = 'New오아시스전동';
        else if (prodName.includes('OASIS') && prodName.includes('수동')) shortName = '오아시스수동';
        else if (prodName.includes('OASIS') && prodName.includes('전동')) shortName = '오아시스전동';
        else if (prodName === 'Mirage') shortName = '미라지';
        else if (prodName === 'Glass Sliding') shortName = '글라스슬라이딩';
        else if (prodName === 'Glass Folding') shortName = '글라스폴딩';
        else if (prodName === 'Fix Glass') shortName = '픽스글라스';
        else if (prodName.includes('스톤 데크') && prodName.includes('페데스탈')) shortName = '스톤데크페데';
        else if (prodName.includes('스톤 데크') && prodName.includes('각관')) shortName = '스톤데크각관';
        else if (prodName === '스톤 첼판') shortName = '스톤첼판';
        else if (prodName === 'Zip Screen') shortName = '집스크린';

        // 옵션 수집
        const options = [];
        if (prodName.includes('OASIS')) {
            if (row.querySelector('.opt-led')?.checked) options.push('LED');
            if (row.querySelector('.opt-pillar-chk')?.checked) {
                const pillarQty = parseInt(row.querySelector('.opt-pillar')?.value) || 0;
                if (pillarQty > 0) options.push(`기둥${pillarQty}`);
            }
        }
        if (prodName === 'Mirage') {
            if (row.querySelector('.opt-mirage-led')?.checked) options.push('LED');
        }

        // 같은 제품명끼리 합산
        const key = shortName + options.sort().join('');
        if (!productMap[key]) {
            productMap[key] = { name: shortName, qty: 0, options: new Set(options) };
        }
        productMap[key].qty += qty;
        options.forEach(o => productMap[key].options.add(o));
    });

    // 요약 문자열 생성: "오아시스전동 LED 2개소, 미라지 1개소"
    const parts = [];
    Object.values(productMap).forEach(item => {
        let part = item.name;
        const opts = Array.from(item.options);
        if (opts.length > 0) part += ' ' + opts.join(' ');
        part += ` ${item.qty}개소`;
        parts.push(part);
    });

    return parts.length > 0 ? parts.join(', ') : '';
}

async function saveAsPDF() {
    document.getElementById('loading-overlay').classList.remove('hidden');
    try {
        const hiddenContainer = document.getElementById('pdf-hidden-container');
        hiddenContainer.innerHTML = '';

        const p1 = document.getElementById('capture-area');
        const clone1 = p1.cloneNode(true);
        syncInputValues(p1, clone1);

        // clone 내부 면제 문구 복사 보장
        const origDiscount = p1.querySelector('#discount-message-area');
        const cloneDiscount = clone1.querySelector('#discount-message-area');
        if (origDiscount && cloneDiscount) {
            cloneDiscount.innerHTML = origDiscount.innerHTML;
        }

        // h-full 등 CSS 레이아웃이 정상 계산되도록 컨테이너 높이 확보
        hiddenContainer.style.height = 'auto';
        hiddenContainer.appendChild(clone1);
        hiddenContainer.classList.add('pdf-mode');

        // clone 내 h-full 제거 (height:0 컨테이너 문제 방지)
        clone1.querySelectorAll('.h-full').forEach(el => el.style.height = 'auto');

        await new Promise(resolve => setTimeout(resolve, 300));

        const doc = new window.jspdf.jsPDF('p', 'mm', 'a4');
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const captureOptions = { scale: 1.5, useCORS: true, logging: false, width: 1200, windowWidth: 1200, backgroundColor: '#ffffff' };

        const canvas1 = await html2canvas(clone1, captureOptions);
        const imgData1 = canvas1.toDataURL('image/jpeg', 0.85);
        const imgHeight1 = (canvas1.height * pageWidth) / canvas1.width;

        // 다중 페이지 처리: 콘텐츠가 A4 한 페이지를 넘으면 자동 분할
        let remainingHeight = imgHeight1;
        let yOffset = 0;
        let isFirstPage = true;
        while (remainingHeight > 0) {
            if (!isFirstPage) doc.addPage();
            doc.addImage(imgData1, 'JPEG', 0, -yOffset, pageWidth, imgHeight1);
            yOffset += pageHeight;
            remainingHeight -= pageHeight;
            isFirstPage = false;
        }

        const regionDo = document.getElementById('region-do').value || '지역';
        const regionSi = document.getElementById('region-si').value || '';
        const phone = document.getElementById('cust-phone').value || '';
        const phoneLast4 = phone.length >= 4 ? phone.slice(-4) : phone;
        let name = document.getElementById('cust-name').value;
        if (!name || name.trim() === '') name = 'VIP';
        const date = new Date().toISOString().slice(2,10).replace(/-/g,'');

        const safeRegionDo = regionDo.trim();
        const safeRegionSi = regionSi.trim();
        const productSummary = getProductSummary();
        const summaryPart = productSummary ? ` (${productSummary})` : '';
        const fileName = `TC_${safeRegionDo} ${safeRegionSi} ${phoneLast4} ${name}_${date}${summaryPart}.pdf`.trim();

        doc.save(fileName);

        // CRM 자동 저장 (PDF 저장 성공 후)
        try {
            await saveQuotationToCRM();
        } catch (crmErr) {
            console.error('[CRM] 저장 실패 (PDF는 정상 저장됨):', crmErr);
        }

    } catch (err) {
        console.error(err);
        alert('PDF 생성 중 오류가 발생했습니다.\n' + err.message);
    } finally {
        const hc = document.getElementById('pdf-hidden-container');
        hc.innerHTML = '';
        hc.style.height = '0';
        document.getElementById('loading-overlay').classList.add('hidden');
    }
}

function syncInputValues(originalDom, clonedDom) {
    const originalInputs = originalDom.querySelectorAll('input, select, textarea');
    const clonedInputs = clonedDom.querySelectorAll('input, select, textarea');

    originalInputs.forEach((input, index) => {
        const clone = clonedInputs[index];
        if (!clone) return;

        if (input.type === 'checkbox' || input.type === 'radio') {
            clone.checked = input.checked;
            if(input.checked) {
                const span = document.createElement('span');
                span.textContent = '✔ ';
                span.style.fontWeight = 'bold';
                span.style.marginRight = '4px';
                clone.parentNode.insertBefore(span, clone);
                clone.style.display = 'none';
            } else {
                 if(clone.parentElement.tagName === 'LABEL') clone.parentElement.style.display = 'none';
                 else clone.style.display = 'none';
            }
        } else if (input.tagName === 'SELECT') {
            const selectedText = input.options[input.selectedIndex] ? input.options[input.selectedIndex].text : '';
            const span = document.createElement('span');
            span.textContent = selectedText;
            span.className = 'pdf-text-value';
            span.style.cssText = window.getComputedStyle(input).cssText;
            span.style.border = 'none';
            span.style.padding = '0';
            span.style.width = 'auto';
            clone.parentNode.replaceChild(span, clone);
        } else {
            const span = document.createElement('span');
            span.textContent = input.value;
            span.className = 'pdf-text-value';
            span.style.cssText = window.getComputedStyle(input).cssText;
            span.style.border = 'none';
            span.style.background = 'transparent';
            if(input.tagName === 'TEXTAREA') {
                span.style.whiteSpace = 'pre-wrap';
                span.style.display = 'block';
            }
            clone.parentNode.replaceChild(span, clone);
        }
    });

    // Copy dynamic content (supplier info including footer)
    const supplierFields = ['supplier-name', 'supplier-biz-no', 'supplier-manager', 'supplier-phone', 'supplier-email', 'footer-info'];
    supplierFields.forEach(id => {
         const originalEl = originalDom.querySelector('#' + id);
         const clonedEl = clonedDom.querySelector('#' + id);
         if(originalEl && clonedEl) {
             clonedEl.textContent = originalEl.textContent;
         }
    });

    const originalMsgs = originalDom.querySelectorAll('.discount-text');
    const originalWarnings = originalDom.querySelectorAll('.warning-text');
    const clonedMsgArea = clonedDom.querySelector('#discount-message-area');
    if(clonedMsgArea) {
         clonedMsgArea.innerHTML = '';
         if (originalWarnings.length > 0) {
             originalWarnings.forEach(msg => clonedMsgArea.appendChild(msg.cloneNode(true)));
         }
         if (originalMsgs.length > 0) {
             originalMsgs.forEach(msg => clonedMsgArea.appendChild(msg.cloneNode(true)));
         }
    }
}

// ========== 견적 CRM 연동 (OSKA Firestore) ==========
async function saveQuotationToCRM() {
    // Firebase 인증 대기
    if (!window.TC_QUOTE_DB && window._tcAuthReady) {
        try { await Promise.race([window._tcAuthReady, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 5000))]); } catch(e) { /* timeout */ }
    }
    if (!window.TC_QUOTE_DB) {
        console.warn('[CRM] Firebase 미연결 — CRM 저장 생략');
        return;
    }

    try {
        const cName = document.getElementById('cust-name').value || '';
        const cPhone = document.getElementById('cust-phone').value || '';
        const province = document.getElementById('region-do').value || '';
        const district = document.getElementById('region-si').value || '';
        const addrDetail = document.getElementById('cust-addr-detail') ? document.getElementById('cust-addr-detail').value || '' : '';

        // 전화번호 없으면 CRM 저장 불가
        if (!cPhone || cPhone.replace(/[^0-9]/g, '').length < 8) {
            console.log('[CRM] 전화번호 없음 — CRM 저장 생략');
            return;
        }

        // 견적 품목 수집
        const products = [];
        document.querySelectorAll('#est-tbody tr').forEach(tr => {
            const prod = tr.querySelector('td:nth-child(2) select');
            const sum = tr.querySelector('.sum');
            if (prod && prod.value && prod.value !== '제품 선택') {
                products.push({ product: prod.value, amount: sum ? sum.textContent : '0' });
            }
        });

        const totalPrice = document.getElementById('val-total') ? document.getElementById('val-total').textContent : '0';
        const phoneNorm = cPhone.replace(/[^0-9]/g, '');
        const now = new Date();
        const dateStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
        const productStr = products.map(p => p.product).join(', ');
        const quoteNote = `[TC견적 ${dateStr}] 금액: ₩${totalPrice} / 품목: ${productStr}`;

        // 기존 고객 확인 (전화번호 기준)
        const allSnap = await window.TC_QUOTE_DB.collection('crm_customers').get();
        let existingDoc = null;
        allSnap.forEach(doc => {
            const p = (doc.data().phone || '').replace(/[^0-9]/g, '');
            if (p === phoneNorm) existingDoc = doc;
        });

        if (existingDoc) {
            // 기존 고객 → content에 견적 이력 추가 (고도화)
            const prevContent = existingDoc.data().content || '';
            await window.TC_QUOTE_DB.collection('crm_customers').doc(existingDoc.id).update({
                content: prevContent + '\n' + quoteNote,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('[CRM] 기존 고객에 견적 이력 추가 완료');
        } else {
            // 신규 고객 등록
            const noSnap = await window.TC_QUOTE_DB.collection('crm_customers').orderBy('no', 'desc').limit(1).get();
            let newNo = 1;
            if (!noSnap.empty) newNo = (noSnap.docs[0].data().no || 0) + 1;

            await window.TC_QUOTE_DB.collection('crm_customers').add({
                no: newNo,
                brand: '테라까사',
                date: dateStr,
                year: now.getFullYear() + '년',
                month: (now.getMonth() + 1) + '월',
                channel: '자동견적',
                consent: '동의',
                phone: cPhone,
                email: '',
                product: productStr,
                custType: '개인',
                grade: '',
                grade2: '',
                province: province,
                district: district,
                address: addrDetail,
                assignedBranch: '',
                status: '미배정',
                content: quoteNote,
                source: 'tc_quotation',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('[CRM] 신규 고객 등록 완료 (테라까사 자동견적)');
        }
    } catch (err) {
        console.error('[CRM] 저장 오류:', err);
        // CRM 저장 실패해도 PDF 저장에는 영향 없음
    }
}
