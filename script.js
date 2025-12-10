/**
 * LegalGen India - Full Logic
 * Includes: Templates, Auth, LocalStorage Caching, Signature Pad
 */

// --- 1. CONFIG & TEMPLATES ---
const APP_PREFIX = "legalgen_v1_"; // Key prefix for LocalStorage

const contractTemplates = [
    // --- REAL ESTATE ---
    {
        id: "rent_agreement", 
        category: "Real Estate", 
        name: "Residential Rent Agreement (11 Months)",
        fields: [
            { key: "date", label: "Agreement Date", type: "date" },
            { key: "city", label: "City", type: "text" },
            { key: "landlord_name", label: "Landlord Name", type: "text" },
            { key: "tenant_name", label: "Tenant Name", type: "text" },
            { key: "property_addr", label: "Property Address", type: "text" },
            { key: "rent_amount", label: "Monthly Rent (INR)", type: "number" },
            { key: "deposit_amount", label: "Security Deposit (INR)", type: "number" },
            { key: "notice_period", label: "Notice Period (Days)", type: "number" }
        ],
        content: `
            <div class="contract-title">RESIDENTIAL RENT AGREEMENT</div>
            <p>This Agreement is made on <strong>{{date}}</strong> at <strong>{{city}}</strong>.</p>
            <p><strong>BETWEEN:</strong> <strong>{{landlord_name}}</strong> (Lessor) AND <strong>{{tenant_name}}</strong> (Lessee).</p>
            <div class="contract-section">
                <h4>1. PREMISES & DURATION</h4>
                <p>The Lessor lets out the property situated at <strong>{{property_addr}}</strong> to the Lessee for a period of 11 months.</p>
            </div>
            <div class="contract-section">
                <h4>2. PAYMENTS</h4>
                <p>The Lessee shall pay a monthly rent of <strong>₹ {{rent_amount}}</strong>. Security deposit: <strong>₹ {{deposit_amount}}</strong> (Refundable).</p>
            </div>
            <div class="contract-section">
                <h4>3. TERMINATION</h4>
                <p>Either party may terminate this agreement by giving <strong>{{notice_period}} days</strong> written notice.</p>
            </div>
            <div class="signature-block">
                <div class="sign-box"><div class="sign-placeholder">{{signature_1}}</div><div class="sign-line">Lessor</div></div>
                <div class="sign-box"><div class="sign-placeholder">{{signature_2}}</div><div class="sign-line">Lessee</div></div>
            </div>`
    },
    {
        id: "sale_deed_prop", 
        category: "Real Estate", 
        name: "Deed of Sale (Property)",
        fields: [
            { key: "exec_date", label: "Execution Date", type: "date" },
            { key: "seller_name", label: "Seller Name", type: "text" },
            { key: "buyer_name", label: "Buyer Name", type: "text" },
            { key: "sale_price", label: "Sale Price (INR)", type: "number" },
            { key: "survey_no", label: "Property Survey/Khasra No.", type: "text" },
            { key: "location", label: "Location/Village", type: "text" }
        ],
        content: `
            <div class="contract-title">DEED OF ABSOLUTE SALE</div>
            <p>Executed on <strong>{{exec_date}}</strong> between <strong>{{seller_name}}</strong> (Vendor) and <strong>{{buyer_name}}</strong> (Purchaser).</p>
            <div class="contract-section">
                <h4>1. CONSIDERATION</h4>
                <p>The Vendor sells property bearing Survey No. <strong>{{survey_no}}</strong> located at <strong>{{location}}</strong> for a total consideration of <strong>₹ {{sale_price}}</strong>.</p>
            </div>
            <div class="contract-section">
                <h4>2. TITLE CLEARANCE</h4>
                <p>The Vendor declares they are the absolute owner and the property is free from all encumbrances, litigations, and charges.</p>
            </div>
            <div class="signature-block">
                <div class="sign-box"><div class="sign-placeholder">{{signature_1}}</div><div class="sign-line">Vendor</div></div>
                <div class="sign-box"><div class="sign-placeholder">{{signature_2}}</div><div class="sign-line">Purchaser</div></div>
            </div>`
    },

    // --- AUTOMOBILE ---
    {
        id: "vehicle_sale", 
        category: "Automobile", 
        name: "Vehicle Sale Agreement",
        fields: [
            { key: "date", label: "Date of Sale", type: "date" },
            { key: "seller", label: "Seller Name", type: "text" },
            { key: "buyer", label: "Buyer Name", type: "text" },
            { key: "vehicle_no", label: "Vehicle Reg No (e.g. MH-01...)", type: "text" },
            { key: "make_model", label: "Make & Model", type: "text" },
            { key: "chassis_no", label: "Chassis Number", type: "text" },
            { key: "price", label: "Sale Price (INR)", type: "number" }
        ],
        content: `
            <div class="contract-title">VEHICLE SALE AGREEMENT</div>
            <p>This Agreement is made on <strong>{{date}}</strong> between <strong>{{seller}}</strong> (Seller) and <strong>{{buyer}}</strong> (Buyer).</p>
            <div class="contract-section">
                <h4>1. VEHICLE DETAILS</h4>
                <p>The Seller agrees to sell the vehicle <strong>{{make_model}}</strong>, bearing Registration No. <strong>{{vehicle_no}}</strong> and Chassis No. <strong>{{chassis_no}}</strong>.</p>
            </div>
            <div class="contract-section">
                <h4>2. PAYMENT & HANDOVER</h4>
                <p>The vehicle is sold for <strong>₹ {{price}}</strong>. The Seller confirms receipt of payment and hands over the vehicle on an "As is where is" basis.</p>
            </div>
            <div class="signature-block">
                <div class="sign-box"><div class="sign-placeholder">{{signature_1}}</div><div class="sign-line">Seller</div></div>
                <div class="sign-box"><div class="sign-placeholder">{{signature_2}}</div><div class="sign-line">Buyer</div></div>
            </div>`
    },

    // --- BUSINESS ---
    {
        id: "nda", 
        category: "Business", 
        name: "Non-Disclosure Agreement (NDA)",
        fields: [
            { key: "date", label: "Date", type: "date" },
            { key: "discloser", label: "Disclosing Party", type: "text" },
            { key: "receiver", label: "Receiving Party", type: "text" },
            { key: "state", label: "Jurisdiction State", type: "text" }
        ],
        content: `
            <div class="contract-title">NON-DISCLOSURE AGREEMENT</div>
            <p>Made on <strong>{{date}}</strong>.</p>
            <p><strong>BETWEEN:</strong> {{discloser}} AND {{receiver}}.</p>
            <div class="contract-section">
                <h4>1. CONFIDENTIALITY</h4>
                <p>The Receiving Party agrees not to disclose any proprietary information shared by the Disclosing Party including trade secrets, customer lists, and technical data.</p>
            </div>
            <div class="contract-section">
                <h4>2. GOVERNING LAW</h4>
                <p>This agreement is governed by the laws of India and the courts of <strong>{{state}}</strong> shall have exclusive jurisdiction.</p>
            </div>
            <div class="signature-block">
                <div class="sign-box"><div class="sign-placeholder">{{signature_1}}</div><div class="sign-line">Discloser</div></div>
                <div class="sign-box"><div class="sign-placeholder">{{signature_2}}</div><div class="sign-line">Receiver</div></div>
            </div>`
    },
    {
        id: "consultancy", 
        category: "Business", 
        name: "Consultancy/Service Agreement",
        fields: [
            { key: "date", label: "Effective Date", type: "date" },
            { key: "client_company", label: "Client Company Name", type: "text" },
            { key: "consultant_name", label: "Consultant Name", type: "text" },
            { key: "scope", label: "Scope of Services", type: "text" },
            { key: "fee", label: "Retainer/Project Fee (INR)", type: "number" }
        ],
        content: `
            <div class="contract-title">CONSULTANCY AGREEMENT</div>
            <p>This Agreement is entered into on <strong>{{date}}</strong> between <strong>{{client_company}}</strong> (Client) and <strong>{{consultant_name}}</strong> (Consultant).</p>
            <div class="contract-section">
                <h4>1. SCOPE OF WORK</h4>
                <p>The Consultant agrees to provide the following services: <strong>{{scope}}</strong>.</p>
            </div>
            <div class="contract-section">
                <h4>2. COMPENSATION</h4>
                <p>The Client shall pay the Consultant <strong>₹ {{fee}}</strong>. TDS shall be deducted as per the Income Tax Act, 1961.</p>
            </div>
            <div class="signature-block">
                <div class="sign-box"><div class="sign-placeholder">{{signature_1}}</div><div class="sign-line">Client</div></div>
                <div class="sign-box"><div class="sign-placeholder">{{signature_2}}</div><div class="sign-line">Consultant</div></div>
            </div>`
    },
    {
        id: "partnership_deed", 
        category: "Business", 
        name: "Partnership Deed",
        fields: [
            { key: "firm_name", label: "Firm Name", type: "text" },
            { key: "start_date", label: "Start Date", type: "date" },
            { key: "partner1", label: "Partner 1 Name", type: "text" },
            { key: "partner2", label: "Partner 2 Name", type: "text" },
            { key: "business", label: "Nature of Business", type: "text" },
            { key: "profit_ratio", label: "Profit Split (e.g., 50:50)", type: "text" }
        ],
        content: `
            <div class="contract-title">DEED OF PARTNERSHIP</div>
            <p>This Deed constitutes a partnership under the Indian Partnership Act, 1932, starting from <strong>{{start_date}}</strong>.</p>
            <div class="contract-section">
                <h4>1. NAME & BUSINESS</h4>
                <p>The firm shall be named <strong>M/S {{firm_name}}</strong> carrying on the business of <strong>{{business}}</strong>.</p>
            </div>
            <div class="contract-section">
                <h4>2. PROFIT SHARING</h4>
                <p>Net Profits and Losses shall be shared between Partners in the ratio of <strong>{{profit_ratio}}</strong>.</p>
            </div>
            <div class="signature-block">
                <div class="sign-box"><div class="sign-placeholder">{{signature_1}}</div><div class="sign-line">{{partner1}}</div></div>
                <div class="sign-box"><div class="sign-placeholder">{{signature_2}}</div><div class="sign-line">{{partner2}}</div></div>
            </div>`
    },

    // --- DIGITAL ---
    {
        id: "website_terms", 
        category: "Digital/Web", 
        name: "Website Terms & Conditions",
        fields: [
            { key: "website_url", label: "Website URL", type: "text" },
            { key: "owner_name", label: "Owner/Company Name", type: "text" },
            { key: "email", label: "Support Email", type: "text" },
            { key: "jurisdiction", label: "Legal Jurisdiction (City)", type: "text" }
        ],
        content: `
            <div class="contract-title">TERMS AND CONDITIONS</div>
            <p>Welcome to <strong>{{website_url}}</strong> owned by <strong>{{owner_name}}</strong>.</p>
            <div class="contract-section">
                <h4>1. ACCEPTANCE</h4>
                <p>By accessing this website, you agree to be bound by these terms governed by the Information Technology Act, 2000.</p>
            </div>
            <div class="contract-section">
                <h4>2. CONTACT & DISPUTES</h4>
                <p>For grievances, contact <strong>{{email}}</strong>. All disputes are subject to the courts in <strong>{{jurisdiction}}</strong>.</p>
            </div>
            <div class="signature-block">
                <div class="sign-box"><div class="sign-placeholder">{{signature_1}}</div><div class="sign-line">Owner</div></div>
                <div class="sign-box"><div class="sign-placeholder">{{signature_2}}</div><div class="sign-line">User Acceptance</div></div>
            </div>`
    },

    // --- EMPLOYMENT ---
    {
        id: "offer_letter", 
        category: "Employment", 
        name: "Employment Offer Letter",
        fields: [
            { key: "date", label: "Date", type: "date" },
            { key: "candidate", label: "Candidate Name", type: "text" },
            { key: "company", label: "Company Name", type: "text" },
            { key: "role", label: "Job Title", type: "text" },
            { key: "joining_date", label: "Date of Joining", type: "date" },
            { key: "ctc", label: "Annual CTC (INR)", type: "number" }
        ],
        content: `
            <div class="contract-title">OFFER OF EMPLOYMENT</div>
            <p>Date: {{date}}</p>
            <p>Dear <strong>{{candidate}}</strong>,</p>
            <p>We are pleased to offer you the position of <strong>{{role}}</strong> at <strong>{{company}}</strong>.</p>
            <div class="contract-section">
                <h4>TERMS</h4>
                <p>Your Annual CTC will be <strong>₹ {{ctc}}</strong>. You are expected to join us on <strong>{{joining_date}}</strong>.</p>
            </div>
            <div class="signature-block">
                <div class="sign-box"><div class="sign-placeholder">{{signature_1}}</div><div class="sign-line">HR Manager</div></div>
                <div class="sign-box"><div class="sign-placeholder">{{signature_2}}</div><div class="sign-line">Candidate</div></div>
            </div>`
    },

    // --- PERSONAL ---
    {
        id: "loan_agreement", 
        category: "Personal", 
        name: "Personal Loan Agreement",
        fields: [
            { key: "loan_date", label: "Date", type: "date" },
            { key: "lender", label: "Lender Name", type: "text" },
            { key: "borrower", label: "Borrower Name", type: "text" },
            { key: "amount", label: "Loan Amount (INR)", type: "number" },
            { key: "interest", label: "Interest Rate (%)", type: "number" },
            { key: "repayment_date", label: "Repayment Date", type: "date" }
        ],
        content: `
            <div class="contract-title">LOAN AGREEMENT</div>
            <p>Made on {{loan_date}} between {{lender}} (Lender) and {{borrower}} (Borrower).</p>
            <div class="contract-section">
                <h4>TERMS</h4>
                <p>The Lender lends <strong>₹ {{amount}}</strong> to the Borrower at an interest rate of <strong>{{interest}}%</strong> per annum. The full amount shall be repaid by <strong>{{repayment_date}}</strong>.</p>
            </div>
            <div class="signature-block">
                <div class="sign-box"><div class="sign-placeholder">{{signature_1}}</div><div class="sign-line">Lender</div></div>
                <div class="sign-box"><div class="sign-placeholder">{{signature_2}}</div><div class="sign-line">Borrower</div></div>
            </div>`
    },
    {
        id: "poa", 
        category: "Personal", 
        name: "General Power of Attorney",
        fields: [
            { key: "date", label: "Date", type: "date" },
            { key: "principal", label: "Principal Name", type: "text" },
            { key: "agent", label: "Agent/Attorney Name", type: "text" },
            { key: "purpose", label: "Purpose/Powers Granted", type: "text" }
        ],
        content: `
            <div class="contract-title">GENERAL POWER OF ATTORNEY</div>
            <p>I, <strong>{{principal}}</strong>, do hereby appoint <strong>{{agent}}</strong> as my Attorney.</p>
            <div class="contract-section">
                <h4>POWERS</h4>
                <p>To perform all acts necessary regarding: <strong>{{purpose}}</strong>. This Power of Attorney shall remain in force until revoked.</p>
            </div>
            <div class="signature-block">
                <div class="sign-box"><div class="sign-placeholder">{{signature_1}}</div><div class="sign-line">Principal</div></div>
                <div class="sign-box"><div class="sign-placeholder">{{signature_2}}</div><div class="sign-line">Agent (Acceptance)</div></div>
            </div>`
    },
    {
        id: "will", 
        category: "Personal", 
        name: "Last Will and Testament",
        fields: [
            { key: "date", label: "Date", type: "date" },
            { key: "testator", label: "Your Name (Testator)", type: "text" },
            { key: "age", label: "Your Age", type: "number" },
            { key: "executor", label: "Executor Name", type: "text" },
            { key: "beneficiary", label: "Major Beneficiary Name", type: "text" }
        ],
        content: `
            <div class="contract-title">LAST WILL AND TESTAMENT</div>
            <p>I, <strong>{{testator}}</strong>, aged <strong>{{age}}</strong> years, being of sound mind, hereby declare this to be my last will, executed on <strong>{{date}}</strong>.</p>
            <div class="contract-section">
                <h4>1. EXECUTOR</h4>
                <p>I appoint <strong>{{executor}}</strong> as the sole executor of this will.</p>
            </div>
            <div class="contract-section">
                <h4>2. BEQUEST</h4>
                <p>I bequeath all my movable and immovable assets to <strong>{{beneficiary}}</strong>.</p>
            </div>
            <div class="signature-block">
                <div class="sign-box"><div class="sign-placeholder">{{signature_1}}</div><div class="sign-line">Testator</div></div>
                <div class="sign-box"><div class="sign-placeholder">{{signature_2}}</div><div class="sign-line">Witness</div></div>
            </div>`
    }
];

// --- 2. STATE MANAGEMENT ---
const state = {
    currentUser: null,
    currentTemplate: null,
    formData: {},
    isDrawing: false,
    activeSigKey: null
};

// --- 3. DOM ELEMENTS ---
const els = {
    authScreen: document.getElementById('auth-screen'),
    appContainer: document.getElementById('app-container'),
    loginForm: document.getElementById('login-form'),
    userDisplay: document.getElementById('user-display'),
    logoutBtn: document.getElementById('logout-btn'),
    
    savedList: document.getElementById('saved-list'),
    selector: document.getElementById('template-selector'),
    form: document.getElementById('dynamic-form'),
    preview: document.getElementById('contract-preview'),
    saveDraftBtn: document.getElementById('save-draft-btn'),
    printBtn: document.getElementById('print-btn'),
    
    modal: document.getElementById('sig-modal'),
    canvas: document.getElementById('sig-canvas'),
    ctx: document.getElementById('sig-canvas').getContext('2d'),
    toast: document.getElementById('toast')
};

// --- 4. AUTHENTICATION LOGIC ---
function initAuth() {
    // Check if previously logged in
    const cachedUser = localStorage.getItem(APP_PREFIX + 'currentUser');
    if (cachedUser) {
        loginUser(cachedUser);
    }

    els.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('auth-username').value.trim();
        if (username) loginUser(username);
    });

    els.logoutBtn.addEventListener('click', logoutUser);
}

function loginUser(username) {
    state.currentUser = username;
    localStorage.setItem(APP_PREFIX + 'currentUser', username);
    
    // UI Update
    els.authScreen.classList.add('hidden');
    els.appContainer.classList.remove('hidden');
    els.userDisplay.textContent = `Hello, ${username}`;
    
    loadSavedContracts();
}

function logoutUser() {
    state.currentUser = null;
    localStorage.removeItem(APP_PREFIX + 'currentUser');
    
    // UI Update
    els.authScreen.classList.remove('hidden');
    els.appContainer.classList.add('hidden');
    
    // Reset State
    state.formData = {};
    state.currentTemplate = null;
    els.preview.innerHTML = '<div class="placeholder-msg"><h2>Document Preview</h2></div>';
    els.form.innerHTML = '<p class="helper-text">Select a template above.</p>';
}

// --- 5. DATA STORAGE (CRUD) ---
function getStorageKey() {
    return `${APP_PREFIX}data_${state.currentUser}`;
}

function loadSavedContracts() {
    const data = JSON.parse(localStorage.getItem(getStorageKey()) || "[]");
    els.savedList.innerHTML = '';

    if (data.length === 0) {
        els.savedList.innerHTML = '<li class="empty-msg">No saved contracts.</li>';
        return;
    }

    data.forEach((doc, index) => {
        const li = document.createElement('li');
        li.className = 'saved-item';
        li.innerHTML = `
            <div onclick="restoreContract(${index})">
                <h4>${doc.name}</h4>
                <span>${new Date(doc.savedAt).toLocaleDateString()}</span>
            </div>
            <button class="delete-btn" onclick="deleteContract(${index})">×</button>
        `;
        els.savedList.appendChild(li);
    });
}

function saveContract() {
    if (!state.currentTemplate) return alert("Please select a template first.");
    
    const docName = prompt("Name this document:", state.currentTemplate.name);
    if (!docName) return;

    const data = JSON.parse(localStorage.getItem(getStorageKey()) || "[]");
    
    const newDoc = {
        templateId: state.currentTemplate.id,
        name: docName,
        savedAt: new Date().toISOString(),
        formData: state.formData
    };

    data.unshift(newDoc); // Add to top
    localStorage.setItem(getStorageKey(), JSON.stringify(data));
    
    loadSavedContracts();
    showToast();
}

// Exposed to global scope for HTML onclick
window.deleteContract = (index) => {
    if (!confirm("Are you sure you want to delete this contract?")) return;
    const data = JSON.parse(localStorage.getItem(getStorageKey()) || "[]");
    data.splice(index, 1);
    localStorage.setItem(getStorageKey(), JSON.stringify(data));
    loadSavedContracts();
};

window.restoreContract = (index) => {
    const data = JSON.parse(localStorage.getItem(getStorageKey()) || "[]");
    const doc = data[index];
    
    // Set Selector
    els.selector.value = doc.templateId;
    
    // Trigger Change but manually override data
    const template = contractTemplates.find(t => t.id === doc.templateId);
    state.currentTemplate = template;
    state.formData = doc.formData; // Restore data
    
    renderForm(template);
    updatePreview();
    
    // Fill inputs
    Object.keys(state.formData).forEach(key => {
        const input = document.querySelector(`input[data-key="${key}"]`);
        if (input) input.value = state.formData[key];
    });
};

// --- 6. CORE GENERATOR LOGIC ---
function initGenerator() {
    // Populate Select
    const categories = {};
    contractTemplates.forEach(t => {
        if (!categories[t.category]) categories[t.category] = [];
        categories[t.category].push(t);
    });

    els.selector.innerHTML = '<option value="" disabled selected>Choose a template...</option>';
    
    for (const [catName, templates] of Object.entries(categories)) {
        const group = document.createElement('optgroup');
        group.label = catName;
        templates.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t.id;
            opt.textContent = t.name;
            group.appendChild(opt);
        });
        els.selector.appendChild(group);
    }

    els.selector.addEventListener('change', (e) => {
        const t = contractTemplates.find(x => x.id === e.target.value);
        state.currentTemplate = t;
        state.formData = {};
        renderForm(t);
        updatePreview();
    });

    els.saveDraftBtn.addEventListener('click', saveContract);
    els.printBtn.addEventListener('click', () => window.print());
    setupSignaturePad();
}

function renderForm(template) {
    els.form.innerHTML = '';
    
    // Fields
    template.fields.forEach(field => {
        const div = document.createElement('div');
        div.className = 'form-group';
        div.innerHTML = `<label>${field.label}</label>`;
        
        const input = document.createElement('input');
        input.type = field.type;
        input.dataset.key = field.key;
        input.placeholder = `Enter ${field.label}`;
        input.addEventListener('input', (e) => {
            state.formData[field.key] = e.target.value;
            updatePreview();
        });

        div.appendChild(input);
        els.form.appendChild(div);
    });

    // Signatures
    const sigDiv = document.createElement('div');
    sigDiv.className = 'flex-between';
    sigDiv.innerHTML = `
        <button type="button" class="btn-secondary" onclick="openSig('signature_1')">✒️ Sign Left</button>
        <button type="button" class="btn-secondary" onclick="openSig('signature_2')">✒️ Sign Right</button>
    `;
    els.form.appendChild(sigDiv);
}

function updatePreview() {
    if (!state.currentTemplate) return;
    let html = state.currentTemplate.content;

    html = html.replace(/{{(\w+)}}/g, (match, key) => {
        if (key.includes('signature')) {
            return state.formData[key] 
                ? `<img src="${state.formData[key]}" class="sign-img">` 
                : `<span style="opacity:0.3; font-size:0.8em">(Sign Here)</span>`;
        }
        return state.formData[key] || `<span style="background:#eee; padding:0 5px">______</span>`;
    });

    els.preview.innerHTML = html;
}

// --- 7. SIGNATURE PAD LOGIC ---
function setupSignaturePad() {
    els.canvas.width = 460;
    els.canvas.height = 150;
    els.ctx.lineWidth = 2;
    els.ctx.lineCap = 'round';

    const getPos = (e) => {
        const rect = els.canvas.getBoundingClientRect();
        const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
        const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
        return {
            x: (clientX - rect.left) * (els.canvas.width / rect.width),
            y: (clientY - rect.top) * (els.canvas.height / rect.height)
        };
    };

    const start = (e) => {
        state.isDrawing = true;
        els.ctx.beginPath();
        const pos = getPos(e);
        els.ctx.moveTo(pos.x, pos.y);
        // e.preventDefault(); // Commented out to allow scrolling if needed, but signature usually needs preventDefault
    };
    
    const move = (e) => {
        if (!state.isDrawing) return;
        const pos = getPos(e);
        els.ctx.lineTo(pos.x, pos.y);
        els.ctx.stroke();
        e.preventDefault(); // Keep this to prevent scrolling while signing
    };

    const end = () => { state.isDrawing = false; };

    // Events
    els.canvas.addEventListener('mousedown', start);
    els.canvas.addEventListener('mousemove', move);
    els.canvas.addEventListener('mouseup', end);
    els.canvas.addEventListener('touchstart', (e) => { e.preventDefault(); start(e); });
    els.canvas.addEventListener('touchmove', move);
    els.canvas.addEventListener('touchend', end);

    // Buttons
    document.getElementById('clear-sig-btn').onclick = () => {
        els.ctx.clearRect(0, 0, els.canvas.width, els.canvas.height);
    };
    
    document.getElementById('save-sig-btn').onclick = () => {
        state.formData[state.activeSigKey] = els.canvas.toDataURL();
        updatePreview();
        els.modal.classList.add('hidden');
    };

    document.getElementById('close-modal-btn').onclick = () => els.modal.classList.add('hidden');
}

window.openSig = (key) => {
    state.activeSigKey = key;
    els.ctx.clearRect(0, 0, els.canvas.width, els.canvas.height);
    els.modal.classList.remove('hidden');
};

function showToast() {
    els.toast.classList.remove('hidden');
    setTimeout(() => els.toast.classList.add('hidden'), 2000);
}

// --- INITIALIZE ---
initAuth();
initGenerator();
