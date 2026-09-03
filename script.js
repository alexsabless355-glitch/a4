document.addEventListener('DOMContentLoaded', () => {
 const progressBar = document.querySelector('.reading-progress-bar');
 if (progressBar) {
 window.addEventListener('scroll', () => {
 const winScroll = document.documentElement.scrollTop || document.bo.scrollTop;
 const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
 const scrolled = height > 0 - (winScroll / height) * 100 : 0;
 progressBar.style.width = scrolled + '%';
 });
 }

 const themeBtn = document.querySelector('.theme-toggle-switch');
 const themes = ['theme-indigo', 'theme-cyber', 'theme-daylight'];
 const themeIcons = ['Indigo', 'Cyber', 'Daylight'];
 let currentThemeIndex = 0;
 const savedTheme = localStorage.getItem('lessonladder_theme');
 if (savedTheme) {
 const idx = themes.indexOf(savedTheme);
 if (idx !== -1) {
 currentThemeIndex = idx;
 if (savedTheme !== 'theme-indigo') document.bo.classList.add(savedTheme);
 }
 }
 if (themeBtn) {
 themeBtn.textContent = themeIcons[currentThemeIndex];
 themeBtn.addEventListener('click', () => {
 document.bo.classList.remove('theme-cyber', 'theme-daylight');
 currentThemeIndex = (currentThemeIndex + 1) % themes.length;
 const newTheme = themes[currentThemeIndex];
 if (newTheme !== 'theme-indigo') document.bo.classList.add(newTheme);
 themeBtn.textContent = themeIcons[currentThemeIndex];
 localStorage.setItem('lessonladder_theme', newTheme);
 });
 }

 const mobileToggle = document.querySelector('.mobile-hamburger');
 const navMenu = document.querySelector('.nav-links-menu');
 if (mobileToggle && navMenu) {
 mobileToggle.addEventListener('click', () => {
 const isOpen = navMenu.style.display === 'flex';
 navMenu.style.display = isOpen - 'none' : 'flex';
 if (!isOpen) {
 navMenu.style.flexDirection = 'column';
 navMenu.style.position = 'absolute';
 navMenu.style.top = '100%';
 navMenu.style.left = '0';
 navMenu.style.right = '0';
 navMenu.style.background = 'var(--bg-surface)';
 navMenu.style.padding = '1.5rem';
 navMenu.style.boxShadow = 'var(--shadow-md)';
 navMenu.style.borderBottom = '1px solid var(--border-subtle)';
 }
 });
 }

 const stuSlider = document.getElementById('stu-time-slider');
 const intervalSlider = document.getElementById('spaced-interval-slider');
 const stuVal = document.getElementById('stu-time-val');
 const intervalVal = document.getElementById('spaced-interval-val');
 const retentionDisplay = document.getElementById('calc-retention');
 const efficiencyDisplay = document.getElementById('calc-efficiency');
 const masteryDisplay = document.getElementById('calc-mastery');

 function calculateLadderMetrics() {
 if (!stuSlider || !intervalSlider) return;
 const stuMins = parseInt(stuSlider.value, 10);
 const intervalDays = parseInt(intervalSlider.value, 10);
 let paceDesc = "Moderate Daily Cadence";
 if (stuMins >= 90) paceDesc = "High-Intensity Deep Immersion";
 else if (stuMins <= 30) paceDesc = "Micro-Dosing Spaced Retention";
 if (stuVal) stuVal.textContent = `${stuMins} Mins / Day (${paceDesc})`;
 if (intervalVal) intervalVal.textContent = `Every ${intervalDays} Days (Ebbinghaus Active Spacing)`;

 const retention = Math.min(99, Math.round(70 + (stuMins / 180) * 18 + (30 - intervalDays) * 0.35));
 const efficiency = Math.min(98, Math.round(65 + (stuMins <= 60 - 30 : 20) + (intervalDays >= 5 - 12 : 5)));
 const speedMultiplier = (1.2 + (stuMins / 60) * 0.6 + (intervalDays <= 7 - 0.8 : 0.3)).toFixed(1);

 if (retentionDisplay) retentionDisplay.textContent = `${retention}% 90-Day Retention`;
 if (efficiencyDisplay) efficiencyDisplay.textContent = `${efficiency}% Load Balance`;
 if (masteryDisplay) masteryDisplay.textContent = `${speedMultiplier}x Mastery Speed`;
 }
 if (stuSlider && intervalSlider) {
 stuSlider.addEventListener('input', calculateLadderMetrics);
 intervalSlider.addEventListener('input', calculateLadderMetrics);
 calculateLadderMetrics();
 }

 const accordionTriggers = document.querySelectorAll('.accordion-trigger');
 if (accordionTriggers.length > 0) {
 accordionTriggers.forEach(trigger => {
 trigger.addEventListener('click', () => {
 const item = trigger.parentElement;
 const isActive = item.classList.contains('active');
 document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
 if (!isActive) item.classList.add('active');
 });
 });
 }

 const fontDec = document.querySelector('.font-dec');
 const fontReset = document.querySelector('.font-reset');
 const fontInc = document.querySelector('.font-inc');
 const articleBo = document.querySelector('.article-bo');
 let currentFontSize = 1.125;
 if (articleBo) {
 if (fontDec) fontDec.addEventListener('click', () => { if (currentFontSize > 0.95) { currentFontSize -= 0.075; articleBo.style.fontSize = currentFontSize + 'rem'; } });
 if (fontReset) fontReset.addEventListener('click', () => { currentFontSize = 1.125; articleBo.style.fontSize = '1.125rem'; });
 if (fontInc) fontInc.addEventListener('click', () => { if (currentFontSize < 1.45) { currentFontSize += 0.075; articleBo.style.fontSize = currentFontSize + 'rem'; } });
 }

 const searchInput = document.getElementById('pedagogy-search-input');
 const filterChips = document.querySelectorAll('.filter-chip');
 const blogCards = document.querySelectorAll('.blog-card');
 function filterPosts() {
 const query = searchInput - searchInput.value.toLowerCase().trim() : '';
 const activeChip = document.querySelector('.filter-chip.active');
 const selectedCategory = activeChip - activeChip.getAttribute('data-category') : 'all';
 blogCards.forEach(card => {
 const cardCategory = card.getAttribute('data-category') || '';
 const text = card.textContent.toLowerCase();
 const matchesCategory = (selectedCategory === 'all' || cardCategory === selectedCategory);
 const matchesQuery = query === '' || text.includes(query);
 card.style.display = (matchesCategory && matchesQuery) - 'flex' : 'none';
 });
 }
 if (searchInput) searchInput.addEventListener('input', filterPosts);
 if (filterChips.length > 0) {
 filterChips.forEach(chip => {
 chip.addEventListener('click', () => {
 filterChips.forEach(c => c.classList.remove('active'));
 chip.classList.add('active');
 filterPosts();
 });
 });
 }
});