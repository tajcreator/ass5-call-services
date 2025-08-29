   // Emergency services data
        const emergencyServices = [
            {
                name: "National Emergency Number",
                englishName: "National Emergency ",
                number: "999",
                image: "assets/emergency.png",
                category: "All",
                categoryColor: "bg-red-100 text-red-800"
            },
            {
                name: "Police Helpline Number",
                englishName: "Police",
                number: "999 ",
               image: "assets/police.png",
                category: "Police",
                categoryColor: "bg-orange-100 text-orange-800"
            },
            {
                name: "Fire Service Number",
                englishName: "Fire Service Number",
                number: "999 ",
               image: "assets/fire-service.png",
                category: "Fire ",
                categoryColor: "bg-blue-100 text-blue-800"
            },
            {
                name: " Ambulance Service ",
                englishName: "Ambulance",
                number: "1994-999999",
                image: "assets/ambulance.png",
                category: "Health",
                categoryColor: "bg-green-100 text-green-800"
            },
            { 
                name: "Women & Child Helpline",
                englishName: "Women & Child Helpline",
                number: "109",
                 image: "assets/emergency.png ",
                category: "Help ",
                categoryColor: "bg-purple-100 text-purple-800"
            },
            {
                name: "Anti-Corruption Helpline",
                englishName: "Anti-Corruption ",
                number: "106",
                image: "assets/emergency.png ",
                category: "Govt.",
                categoryColor: "bg-indigo-100 text-indigo-800"
            },
            {
                name: "Electricity Helpline",
                englishName: "Electricity Outage",
                number: "16216",
                 image: "assets/emergency.png",
                category: "Electricity",
                categoryColor: "bg-yellow-100 text-yellow-800"
            },
            {
                name: "Brac Helpline",
                englishName: "Brac",
                number: "16123",
                image: "assets/emergency.png",
                category: "NGO",
                categoryColor: "bg-yellow-100 text-yellow-800"
            },
            {
                name: "Bangladesh Railway Helpline ",
                englishName: "Bangladesh Railway",
                number: "163",
                image: "assets/emergency.png",
                category: "Travel ",
                categoryColor: "bg-blue-100 text-blue-800"
            }
        ];

        // State variables
        let heartCount = 0;
        let coinCount = 100;
        let copyCount = 0;
        let callHistory = [];

        // DOM elements
        const heartCountEl = document.getElementById('heartCount');
        const coinCountEl = document.getElementById('coinCount');
        const copyCountEl = document.getElementById('copyCount');
        const cardsContainer = document.getElementById('cardsContainer');
        const historyContainer = document.getElementById('historyContainer');
        const clearHistoryBtn = document.getElementById('clearHistoryBtn');

        // Generate cards
   function generateCards() {
    cardsContainer.innerHTML = '';
    emergencyServices.forEach((service, index) => {
        const card = document.createElement('div');
        
        card.className =
            'bg-white rounded-lg shadow-md p-6 card-hover cursor-pointer border border-gray-200 w-[300px] max-w-lg'; 
        card.innerHTML = `
           <img 
                src="${service.image}" 
                alt="${service.englishName}" 
                class="w-8 h-8 ${index === 1 ? 'bg-blue-200' : 'bg-red-200'} p-2 rounded-lg object-contain" 
            />
           
            <div class="flex justify-between items-start mb-4">
                <div class="flex items-center space-x-3">
                    <div>
                        <h3 class="font-bold text-gray-800">${service.name}</h3>
                        <p class="text-sm text-gray-600">${service.englishName}</p>
                    </div>
                </div>
                
                <button class="heart-btn text-xl text-gray-400 hover:text-red-500 transition-colors -mt-8" data-index="${index}">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>
            
            <div class="mb-4">
                <div class="text-2xl font-bold mb-2">${service.number}</div>
                <span class="inline-block px-3 py-1 rounded-full text-xs font-medium ${service.categoryColor}">
                    ${service.category}
                </span>
            </div>
            
            <div class="flex space-x-3">
                <button class="copy-btn flex-1 hover:bg-red-400 border py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center" data-number="${service.number}" data-name="${service.englishName}">
                    <i class="fas fa-copy mr-2"></i> Copy
                </button>
                <button class="call-btn flex-1 bg-green-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center" data-number="${service.number}" data-name="${service.englishName}">
                    <i class="fas fa-phone mr-2"></i> Call
                </button>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
    // Add event listeners
    addEventListeners();
}

      
 

 
      

        // Add event listeners
        function addEventListeners() {
            // Heart buttons
            document.querySelectorAll('.heart-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    heartCount++;
                    heartCountEl.textContent = heartCount;
                    btn.classList.add('heart-animation');
                    btn.style.color = '#ef4444';
                    setTimeout(() => btn.classList.remove('heart-animation'), 500);
                });
            });

            // Copy buttons
            document.querySelectorAll('.copy-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const number = btn.getAttribute('data-number');
                    const name = btn.getAttribute('data-name');
                    
                    copyToClipboard(number);
                    copyCount++;
                    copyCountEl.textContent = copyCount;
                    
                    alert(`📋 Hotline number ${number} for ${name} has been copied to clipboard!`);
                });
            });

            // Call buttons
            document.querySelectorAll('.call-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const number = btn.getAttribute('data-number');
                    const name = btn.getAttribute('data-name');
                    
                    if (coinCount < 20) {
                        alert('⚠️ Insufficient coins!! You need at least 20 coins to make a call.');
                        return;
                    }
                    
                    coinCount -= 20;
                    coinCountEl.textContent = coinCount;
                    
                    alert(`📞 Calling ${name} at ${number}. 20 coins deducted.`);
                    
                    addToHistory(name, number);
                });
            });
        }

        // Copy to clipboard function
        async function copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
        }

        // Add to call history
        function addToHistory(name, number) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: true, 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            });
            
            const historyItem = {
                name: name,
                number: number,
                time: timeString,
                date: now.toLocaleDateString()
            };
            
            callHistory.unshift(historyItem);
            updateHistoryDisplay();
        }

        // Update history display
        function updateHistoryDisplay() {
            if (callHistory.length === 0) {
                historyContainer.innerHTML = '<p class="text-gray-500 text-center py-8">No call history yet</p>';
                return;
            }
            
            historyContainer.innerHTML = callHistory.map(item => `
                <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <div class="font-semibold text-gray-800">${item.name}</div>
                    <div class="text-blue-600 font-mono">${item.number}</div>
                    <div class="text-xs text-gray-500 mt-2">
                        <i class="fas fa-clock mr-1"></i>
                        ${item.time} - ${item.date}
                    </div>
                </div>
            `).join('');
        }

        // Clear history
        clearHistoryBtn.addEventListener('click', () => {
            if (callHistory.length === 0) {
                alert('📋 Call history is already empty!');
                return;
            }
            
            if (confirm('🗑️ Are you sure you want to clear all call history?')) {
                callHistory = [];
                updateHistoryDisplay();
                alert('✅ Call history has been cleared successfully!');
            }
        });

        // Initialize the app
        document.addEventListener('DOMContentLoaded', () => {
            generateCards();
        });