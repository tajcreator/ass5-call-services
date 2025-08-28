//  const services = [
//             {
//                 id: 1,
//                 icon: 'fas fa-ambulance',
//                 name: 'Ambulance',
//                 nameEn: 'Medical Emergency',
//                 number: '199',
//                 category: 'Medical'
//             },
//             {
//                 id: 2,
//                 icon: 'fas fa-fire-extinguisher',
//                 name: 'Fire Department',
//                 nameEn: 'Fire Emergency',
//                 number: '161',
//                 category: 'Fire'
//             },
//             {
//                 id: 3,
//                 icon: 'fas fa-shield-alt',
//                 name: 'Police',
//                 nameEn: 'Police Emergency',
//                 number: '166',
//                 category: 'Security'
//             },
//             {
//                 id: 4,
//                 icon: 'fas fa-child',
//                 name: 'Child Protection',
//                 nameEn: 'Child Helpline',
//                 number: '1098',
//                 category: 'Social'
//             },
//             {
//                 id: 5,
//                 icon: 'fas fa-heartbeat',
//                 name: 'Health Advice',
//                 nameEn: 'Health Helpline',
//                 number: '16263',
//                 category: 'Medical'
//             },
//             {
//                 id: 6,
//                 icon: 'fas fa-exclamation-triangle',
//                 name: 'Disaster Management',
//                 nameEn: 'Disaster Helpline',
//                 number: '1090',
//                 category: 'Emergency'
//             }
//         ];

//         // DOM Elements
//         const cardSection = document.getElementById('card-section');
//         const historyList = document.getElementById('history-list');
//         const emptyHistory = document.getElementById('empty-history');
//         const clearHistoryBtn = document.getElementById('clear-history');
//         const heartCount = document.getElementById('heart-count');
//         const coinCount = document.getElementById('coin-count');
//         const copyCount = document.getElementById('copy-count');
//         const alertContainer = document.getElementById('alert-container');

//         // State variables
//         let hearts = 0;
//         let coins = 100;
//         let copies = 0;
//         let callHistory = [];

//         // Initialize the page
//         function init() {
//             renderCards();
//             updateUI();
//             loadFromLocalStorage();
//         }

//         // Render service cards
//         function renderCards() {
//             cardSection.innerHTML = '';
            
//             services.forEach(service => {
//                 const card = document.createElement('div');
//                 card.className = 'card';
//                 card.innerHTML = `
//                     <div class="card-header">
//                         <i class="${service.icon} card-icon"></i>
//                         <i class="far fa-heart card-heart" data-id="${service.id}"></i>
//                     </div>
//                     <div class="card-body">
//                         <h3 class="card-title">${service.name}</h3>
//                         <p class="card-subtitle">${service.nameEn}</p>
//                         <div class="card-number">${service.number}</div>
//                         <span class="card-badge">${service.category}</span>
//                     </div>
//                     <div class="card-footer">
//                         <button class="btn btn-copy" data-number="${service.number}">
//                             <i class="far fa-copy"></i> Copy
//                         </button>
//                         <button class="btn btn-call" data-id="${service.id}" data-name="${service.name}" data-number="${service.number}">
//                             <i class="fas fa-phone"></i> Call
//                         </button>
//                     </div>
//                 `;
//                 cardSection.appendChild(card);
//             });
            
//             // Add event listeners to card buttons
//             addCardEventListeners();
//         }

//         // Add event listeners to card buttons
//         function addCardEventListeners() {
//             // Heart icons
//             document.querySelectorAll('.card-heart').forEach(heart => {
//                 heart.addEventListener('click', function() {
//                     const id = this.getAttribute('data-id');
//                     handleHeartClick(id, this);
//                 });
//             });
            
//             // Copy buttons
//             document.querySelectorAll('.btn-copy').forEach(button => {
//                 button.addEventListener('click', function() {
//                     const number = this.getAttribute('data-number');
//                     handleCopyClick(number);
//                 });
//             });
            
//             // Call buttons
//             document.querySelectorAll('.btn-call').forEach(button => {
//                 button.addEventListener('click', function() {
//                     const id = this.getAttribute('data-id');
//                     const name = this.getAttribute('data-name');
//                     const number = this.getAttribute('data-number');
//                     handleCallClick(id, name, number);
//                 });
//             });
//         }

//         // Handle heart icon click
//         function handleHeartClick(id, element) {
//             if (element.classList.contains('active')) {
//                 return; // Already liked
//             }
            
//             element.classList.remove('far');
//             element.classList.add('fas', 'active');
//             hearts++;
//             updateUI();
//             showAlert('Success', 'Service added to favorites!', 'success');
//         }

//         // Handle copy button click
//         function handleCopyClick(number) {
//             // Copy to clipboard
//             navigator.clipboard.writeText(number).then(() => {
//                 copies++;
//                 updateUI();
//                 showAlert('Copied!', `Number ${number} copied to clipboard`, 'success');
//             }).catch(err => {
//                 console.error('Failed to copy: ', err);
//                 showAlert('Error', 'Failed to copy number', 'error');
//             });
//         }

//         // Handle call button click
//         function handleCallClick(id, name, number) {
//             if (coins < 20) {
//                 showAlert('Insufficient Coins', 'You need at least 20 coins to make a call', 'error');
//                 return;
//             }
            
//             // Deduct coins
//             coins -= 20;
            
//             // Add to call history
//             const now = new Date();
//             const timeString = now.toLocaleTimeString();
//             const historyItem = {
//                 id: Date.now(),
//                 serviceId: id,
//                 name,
//                 number,
//                 time: timeString
//             };
            
//             callHistory.unshift(historyItem);
//             updateCallHistory();
//             updateUI();
            
//             showAlert('Calling...', `Connecting to ${name} at ${number}`, 'success');
            
//             // Save to localStorage
//             saveToLocalStorage();
//         }

//         // Update call history UI
//         function updateCallHistory() {
//             if (callHistory.length === 0) {
//                 emptyHistory.style.display = 'block';
//                 historyList.innerHTML = '';
//                 return;
//             }
            
//             emptyHistory.style.display = 'none';
//             historyList.innerHTML = '';
            
//             callHistory.forEach(item => {
//                 const li = document.createElement('li');
//                 li.className = 'history-item';
//                 li.innerHTML = `
//                     <div class="history-info">
//                         <span class="history-name">${item.name}</span>
//                         <span class="history-number">${item.number}</span>
//                     </div>
//                     <span class="history-time">${item.time}</span>
//                 `;
//                 historyList.appendChild(li);
//             });
//         }

//         // Update UI counters
//         function updateUI() {
//             heartCount.textContent = hearts;
//             coinCount.textContent = coins;
//             copyCount.textContent = copies;
//         }

//         // Show alert message
//         function showAlert(title, message, type) {
//             const alert = document.createElement('div');
//             alert.className = `alert alert-${type}`;
//             alert.innerHTML = `
//                 <i class="alert-icon ${type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}"></i>
//                 <div class="alert-content">
//                     <div class="alert-title">${title}</div>
//                     <div class="alert-message">${message}</div>
//                 </div>
//             `;
            
//             alertContainer.appendChild(alert);
            
//             // Trigger reflow
//             void alert.offsetWidth;
            
//             alert.classList.add('show');
            
//             // Remove alert after 3 seconds
//             setTimeout(() => {
//                 alert.classList.remove('show');
//                 setTimeout(() => {
//                     alertContainer.removeChild(alert);
//                 }, 300);
//             }, 3000);
//         }

//         // Save data to localStorage
//         function saveToLocalStorage() {
//             const data = {
//                 hearts,
//                 coins,
//                 copies,
//                 callHistory
//             };
            
//             localStorage.setItem('emergencyAppData', JSON.stringify(data));
//         }

//         // Load data from localStorage
//         function loadFromLocalStorage() {
//             const data = JSON.parse(localStorage.getItem('emergencyAppData'));
            
//             if (data) {
//                 hearts = data.hearts || 0;
//                 coins = data.coins || 100;
//                 copies = data.copies || 0;
//                 callHistory = data.callHistory || [];
                
//                 updateUI();
//                 updateCallHistory();
//             }
//         }

//         // Clear history
//         clearHistoryBtn.addEventListener('click', function() {
//             callHistory = [];
//             updateCallHistory();
//             saveToLocalStorage();
//             showAlert('History Cleared', 'All call history has been removed', 'success');
//         });

//         // Initialize the application
//         init();