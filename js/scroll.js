const scrollframe = document.querySelector('#scrollWrap');
const scrollBoxs = scrollframe.querySelectorAll('section');
const svgBox = document.querySelector('.svgBox');
const icon = svgBox.querySelector('path');
const scrollBtns = document.querySelectorAll('li');
const scrollBtns_arr = Array.from(scrollBtns);
const speed = 500;
const base = -window.innerHeight / 3;
let posArr = [];
const icon_len = parseInt(getComputedStyle(icon)['stroke-dasharray']);
const svgSpeed = 3;
const h1 = scrollBoxs[3].querySelector('h1');
const h2 = scrollBoxs[3].querySelector('h2');
const rot = scrollBoxs[3].querySelector('.rot');

getPos();
window.addEventListener('resize', modifyPos);

window.addEventListener('scroll', () => {
	activation();
	section2_custom_scroll();
	section4_custom_scroll();
});

//mousewheel event
//window.addEventListener('mousewheel', moveWheel, { passive: false });

scrollBtns.forEach((btn, idx) => {
	btn.addEventListener('click', (e) => {
		const scroll = window.scrollY;
		const isOn = e.currentTarget.classList.contains('on');
		if (isOn && scroll === posArr[idx]) return;
		moveScroll(idx);
	});
});

function getPos() {
	posArr = [];
	for (const box of scrollBoxs) posArr.push(box.offsetTop);
}

function modifyPos() {
	getPos();
	const active = document.querySelector('li.on');
	const active_index = scrollBtns_arr.indexOf(active);
	window.scroll(0, posArr[active_index]);
}

function activation() {
	const scroll = window.scrollY || window.pageYOffset;

	scrollBoxs.forEach((_, idx) => {
		if (scroll >= posArr[idx] + base) {
			for (const el of scrollBtns) el.classList.remove('on');
			for (const el of scrollBoxs) el.classList.remove('on');
			scrollBtns[idx].classList.add('on');
			scrollBoxs[idx].classList.add('on');
		}
	});
}

function moveScroll(index) {
	new Anime(window, {
		prop: 'scroll',
		value: posArr[index],
		duration: speed,
	});
}

//마우스 휠 이동함수
function moveWheel(e) {
	e.preventDefault();

	const active = document.querySelector('li.on');
	const active_index = scrollBtns_arr.indexOf(active);

	if (e.deltaY < 0) {
		if (active_index === 0) return;
		moveScroll(active_index - 1);
	} else {
		if (active_index === scrollBtns.length - 1) return;
		moveScroll(active_index + 1);
	}
}

//두번째 섹션 커스텀 스크롤
function section2_custom_scroll() {
	const scroll = window.scrollY || window.pageYOffset;
	let scroll2 = (scroll - (posArr[1] + base)) * svgSpeed;

	if (scroll > posArr[1] + base) {
		if (scroll2 > icon_len) {
			scroll2 = 0;
			svgBox.classList.add('on');
		} else {
			svgBox.classList.remove('on');
		}
		icon.style.strokeDashoffset = icon_len - scroll2;
	} else {
		icon.style.strokeDashoffset = icon_len;
	}
}

//네번째 섹션 커스텀 스크롤
function section4_custom_scroll() {
	const scroll = window.scrollY || window.pageYOffset;
	const scroll2 = scroll - (posArr[3] + base);

	if (scroll > posArr[3] + base) {
		h1.style.left = scroll2 + 'px';
		h2.style.left = scroll2 * 2 + 'px';
		rot.style.transform = `rotate(${scroll2}deg) scale(${1 + scroll2 / 500})`;
		rot.style.opacity = 1 - scroll2 / 500;

		//rot 박스 회전화면서 , 확대되면서, 사라지게 (scroll값 연동)
	} else {
		rot.style.transform = 'rotate(0deg) scale(1)';
		rot.style.opacity = 1;
	}
}
