// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

if (localStorage.getItem('theme') === 'light') {
    html.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    if (currentTheme === 'light') {
        html.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// AI Scam Detection Logic
function analyzeMessage(text) {
    if (!text || text.trim().length < 10) {
        return {
            riskLevel: 'medium',
            riskScore: 50,
            redFlags: ['Message is too short to analyze properly'],
            verdict: 'Unable to analyze - message too short. Please provide a complete internship offer message.',
            recommendations: ['Provide the full message for better analysis', 'Check for official company email', 'Verify company website']
        };
    }

    const lowerText = text.toLowerCase();
    let riskScore = 0;
    const redFlags = [];
    const recommendations = [];

    // High Risk Patterns (negative score)
    const highRiskPatterns = [
        { 
            pattern: /\b(pay|payment|fee|deposit|upfront|money|cost|charge|price|registration fee|processing fee)\b/i, 
            weight: -3,
            flag: 'Requests for payment or fees',
            recommendation: 'NEVER pay upfront fees for internships. Legitimate companies never charge registration fees.'
        },
        { 
            pattern: /\b(wire|transfer|send money|western union|moneygram|paytm|gpay|phonepe|upi)\b/i, 
            weight: -4,
            flag: 'Requests for money transfers',
            recommendation: 'Block and report immediately. No legitimate company asks for money transfers.'
        },
        { 
            pattern: /\b(urgent|immediately|asap|right away|hurry|limited slots|only today|expires)\b/i, 
            weight: -2,
            flag: 'Excessive urgency or pressure tactics',
            recommendation: 'Pressure tactics are a red flag. Legitimate companies give you time to decide.'
        },
        { 
            pattern: /\b(guaranteed|guarantee|100%|definitely|always|sure|certain)\b/i, 
            weight: -2,
            flag: 'Unrealistic guarantees or promises',
            recommendation: 'Be skeptical of absolute guarantees. Real opportunities are transparent about terms.'
        },
        { 
            pattern: /\b(telegram|whatsapp|@gmail\.com|@yahoo\.com|@hotmail\.com)\b/i, 
            weight: -3,
            flag: 'Uses messaging apps or personal email instead of company email',
            recommendation: 'Verify company official email domain. Legitimate companies use @companyname.com emails.'
        },
        { 
            pattern: /\b(ssn|social security|credit card|cvv|cvn|bank account|aadhaar|pan card)\b/i, 
            weight: -4,
            flag: 'Requests sensitive personal or financial information',
            recommendation: 'Do not share sensitive information. Only provide basic details after verification.'
        },
        { 
            pattern: /\b(click here|link|download|attachment|\.exe|\.zip|bit\.ly|tinyurl)\b/i, 
            weight: -3,
            flag: 'Suspicious links or downloadable attachments',
            recommendation: 'Do not click links or download files from unverified sources. Verify website legitimacy first.'
        },
        { 
            pattern: /\b(congratulations!? you (have|are|won)|you (have|are) (selected|chosen|winner))\b/i, 
            weight: -2,
            flag: 'Generic congratulations without interview or application process',
            recommendation: 'Legitimate offers follow proper interview process. Be cautious of unsolicited congratulations.'
        },
        { 
            pattern: /\b(dear applicant|dear candidate|hello there|greetings|sir|madam)\b/i, 
            weight: -1,
            flag: 'Generic or impersonal greeting',
            recommendation: 'Legitimate companies usually address you by name and reference your application.'
        },
        { 
            pattern: /\b(work from home|wfh|remote|make \$\d+|earn \$\d+|stipend \$\d+)\b/i, 
            weight: -2,
            flag: 'Suspicious work-from-home promises with high earnings',
            recommendation: 'Verify remote work opportunities carefully. Check company background and legitimacy.'
        }
    ];

    // Positive Patterns (positive score)
    const safePatterns = [
        { 
            pattern: /\b(interview|meeting|schedule|discuss|phone call|video call)\b/i, 
            weight: 2,
            recommendation: 'Professional interview process is a positive sign.'
        },
        { 
            pattern: /\b(linkedin|indeed|glassdoor|application|applied)\b/i, 
            weight: 1.5,
            recommendation: 'Reference to legitimate platforms indicates authenticity.'
        },
        { 
            pattern: /\b(experience|skills|qualifications|resume|cv|background)\b/i, 
            weight: 1,
            recommendation: 'Asking about qualifications is normal for legitimate opportunities.'
        },
        { 
            pattern: /\b(hr|human resources|recruiter|hiring manager|talent acquisition)\b/i, 
            weight: 1.5,
            recommendation: 'Professional role mentioned adds credibility.'
        },
        { 
            pattern: /\.(edu|gov|ac\.)/i, 
            weight: 2,
            recommendation: 'Educational or government domains are generally trustworthy.'
        },
        { 
            pattern: /@[a-z0-9-]+\.(com|org|net|edu|io|co|ai)/i,
            weight: 1,
            recommendation: 'Company domain email is a positive indicator.',
            exclude: /@(gmail|yahoo|hotmail|aol|outlook)\.(com|net|org)/i
        }
    ];

    // Check for grammar/spelling errors
    const commonErrors = (text.match(/\b(teh|adn|nad|taht|hte|yuor|recieve|seperate|thier|alot)\b/gi) || []).length;
    if (commonErrors > 2) {
        riskScore -= 2;
        redFlags.push('Multiple spelling and grammar errors');
        recommendations.push('Poor grammar often indicates unprofessional or scam communications.');
    }

    // Analyze patterns
    highRiskPatterns.forEach(({ pattern, weight, flag, recommendation }) => {
        if (pattern.test(text)) {
            riskScore += weight;
            if (!redFlags.includes(flag)) {
                redFlags.push(flag);
            }
            if (!recommendations.includes(recommendation)) {
                recommendations.push(recommendation);
            }
        }
    });

    safePatterns.forEach(({ pattern, weight, recommendation, exclude }) => {
        const matches = pattern.test(text);
        const shouldExclude = exclude && exclude.test(text);
        if (matches && !shouldExclude) {
            riskScore += weight;
            if (!recommendations.includes(recommendation)) {
                recommendations.push(recommendation);
            }
        }
    });

    // Determine risk level
    let riskLevel;
    if (riskScore <= -5) {
        riskLevel = 'danger';
    } else if (riskScore < 0) {
        riskLevel = 'medium';
    } else {
        riskLevel = 'safe';
    }

    // Generate verdict
    let verdict;
    if (riskLevel === 'danger') {
        verdict = '⚠️ HIGH SCAM RISK: This message shows multiple red flags that strongly indicate a fraudulent internship offer. Do NOT proceed with this opportunity.';
        if (recommendations.length === 0) {
            recommendations.push('Block and report this contact immediately.', 'Do not share any personal or financial information.', 'Search for company name online to verify legitimacy.', 'Check if the company has official website and LinkedIn page.');
        }
    } else if (riskLevel === 'medium') {
        verdict = '⚠️ MEDIUM RISK: This message has some concerning elements. Proceed with extreme caution and verify all details independently before taking any action.';
        if (recommendations.length === 0) {
            recommendations.push('Verify the company website and LinkedIn profile.', 'Contact the company through official channels to confirm.', 'Do not share sensitive information until verified.', 'Ask for official offer letter with company letterhead.');
        }
    } else {
        verdict = '✅ SAFE: This message appears legitimate based on our analysis. However, always verify independently before proceeding.';
        if (recommendations.length === 0) {
            recommendations.push('Verify company website and official email domain.', 'Check company LinkedIn and reviews.', 'Review offer letter carefully before accepting.', 'Contact company HR through official channels to confirm.');
        }
    }

    return {
        riskLevel,
        riskScore,
        redFlags: redFlags.length > 0 ? redFlags : ['No major red flags detected'],
        verdict,
        recommendations: recommendations.length > 0 ? recommendations : ['Proceed with standard verification procedures']
    };
}

// Message Analyzer
const analyzeBtn = document.getElementById('analyzeBtn');
const messageInput = document.getElementById('messageInput');
const resultPanel = document.getElementById('resultPanel');
const riskIndicator = document.getElementById('riskIndicator');
const redFlagsList = document.getElementById('redFlagsList');
const verdictText = document.getElementById('verdictText');
const recommendationsList = document.getElementById('recommendationsList');
const reportBtn = document.getElementById('reportBtn');
const checkAnotherBtn = document.getElementById('checkAnotherBtn');

analyzeBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    
    if (!message) {
        alert('Please paste an internship message to analyze.');
        return;
    }

    // Disable button during analysis
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';

    // Simulate processing time for realism
    setTimeout(() => {
        const result = analyzeMessage(message);

        // Display risk indicator
        let riskButtonClass = '';
        let riskText = '';
        if (result.riskLevel === 'safe') {
            riskButtonClass = 'risk-safe';
            riskText = '🟢 SAFE';
        } else if (result.riskLevel === 'medium') {
            riskButtonClass = 'risk-medium';
            riskText = '🟡 MEDIUM RISK';
        } else {
            riskButtonClass = 'risk-danger';
            riskText = '🔴 HIGH SCAM RISK';
        }

        riskIndicator.innerHTML = `<button class="risk-button ${riskButtonClass}">${riskText}</button>`;

        // Display red flags
        redFlagsList.innerHTML = result.redFlags.map(flag => `<li>${flag}</li>`).join('');

        // Display verdict
        verdictText.textContent = result.verdict;

        // Display recommendations
        recommendationsList.innerHTML = result.recommendations.map(rec => `<li>${rec}</li>`).join('');

        // Show result panel
        resultPanel.classList.remove('hidden');
        resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Re-enable button
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<i class="fas fa-search"></i> Analyze with Intern GPT';
    }, 1500);
});

checkAnotherBtn.addEventListener('click', () => {
    messageInput.value = '';
    resultPanel.classList.add('hidden');
    messageInput.focus();
});

reportBtn.addEventListener('click', () => {
    document.getElementById('report').scrollIntoView({ behavior: 'smooth' });
    // Pre-fill the report form with the message
    const message = messageInput.value.trim();
    if (message) {
        document.getElementById('scamMessage').value = message;
    }
});

// Report Form
const reportForm = document.getElementById('reportForm');
const reportSuccess = document.getElementById('reportSuccess');

reportForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const companyName = document.getElementById('companyName').value;
    const scamMessage = document.getElementById('scamMessage').value;
    const description = document.getElementById('description').value;
    const anonymous = document.getElementById('anonymousReport').checked;

    // Simulate form submission
    reportForm.style.display = 'none';
    reportSuccess.classList.remove('hidden');

    // Store report data (in real app, this would go to backend)
    const reportData = {
        companyName,
        scamMessage,
        description,
        anonymous,
        timestamp: new Date().toISOString()
    };
    
    console.log('Report submitted:', reportData);

    // Reset form after 5 seconds
    setTimeout(() => {
        reportForm.reset();
        reportForm.style.display = 'block';
        reportSuccess.classList.add('hidden');
    }, 5000);
});

// Auto-resize textarea
messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});