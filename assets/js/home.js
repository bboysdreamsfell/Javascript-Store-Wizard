//Tab transition for .division_1
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab_transition_btn');
    const tabContents = document.querySelectorAll('.tab_transition_content');
    const isFormEmptyInContent = (contentElement) => {
        const forms = contentElement.querySelectorAll('form');
        if (forms.length === 0) {
            return false;
        }
        for (const form of forms) {
            const textInputs = form.querySelectorAll(
                'input[type="text"], input[type="email"], input[type="password"], input[type="number"], ' +
                'textarea, select'
            );
            for (const input of textInputs) {
                if (input.value.trim() === '') {
                    return true;
                }
            }

            // Check radio button groups
            const radioGroups = {};
            form.querySelectorAll('input[type="radio"]').forEach(radio => {
                if (!radioGroups[radio.name]) {
                    radioGroups[radio.name] = [];
                }
                radioGroups[radio.name].push(radio);
            });

            for (const name in radioGroups) {
                const isAnyRadioSelected = radioGroups[name].some(radio => radio.checked);
                if (!isAnyRadioSelected) {
                    return true; // Found a radio group where nothing is selected
                }
            }
            const checkboxGroups = {};
            form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                if (!checkboxGroups[checkbox.name]) {
                    checkboxGroups[checkbox.name] = [];
                }
                checkboxGroups[checkbox.name].push(checkbox);
            });

            for (const name in checkboxGroups) {
                const isAnyCheckboxSelected = checkboxGroups[name].some(checkbox => checkbox.checked);
                if (!isAnyCheckboxSelected) {
                    return true; // Found a checkbox group where nothing is selected
                }
            }
        }
        return false; // All relevant fields in all forms are filled/selected, or no forms/fields found
    };
    const displayContent = (dataLabel) => {
        tabContents.forEach(content => {
            content.style.display = 'none'; // Hide all contents
        });
        const targetContent = document.querySelector(`.tab_transition_content[data-label="${dataLabel}"]`);
        if (targetContent) {
            targetContent.style.display = 'flex'; // Show the matched content
        }
    };
    const updateMenuTabClasses = (targetButtonInMenu) => {
        const currentActiveMenuButton = document.querySelector('menu .tab_transition_btn.active');

        if (currentActiveMenuButton && currentActiveMenuButton !== targetButtonInMenu) {
            const oldContentDataLabel = currentActiveMenuButton.dataset.label;
            const oldContentElement = document.querySelector(`.tab_transition_content[data-label="${oldContentDataLabel}"]`);

            currentActiveMenuButton.classList.remove('active'); // Always remove active first
            currentActiveMenuButton.classList.remove('filled', 'visited'); // Ensure both are removed before adding new one

            // Check if the old content had a form with empty fields to decide 'filled' or 'visited'
            if (oldContentElement && isFormEmptyInContent(oldContentElement)) {
                currentActiveMenuButton.classList.add('visited');
            } else {
                currentActiveMenuButton.classList.add('filled');
            }
        }

        // Make the target button active (and remove any filled/visited state it might have)
        if (targetButtonInMenu) {
            targetButtonInMenu.classList.remove('filled', 'visited');
            targetButtonInMenu.classList.add('active');
        }
    };

    // --- Initial state setup on page load ---
    const initialActiveButton = document.querySelector('.tab_transition_btn[data-label="tab1"]');
    if (initialActiveButton) {
        initialActiveButton.classList.add('active');
        displayContent('tab1');
    }

    // --- Event listener for all .tab_transition_btn clicks ---
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dataLabel = button.dataset.label;
            const targetContent = document.querySelector(`.tab_transition_content[data-label="${dataLabel}"]`);

            // RULE: If no matching .tab_transition_content is found, do nothing.
            if (!targetContent) {
                
                return;
            }

            // RULE: If the clicked button already has the .active class, do nothing.
            if (button.classList.contains('active')) {
                return;
            }

            const isInsideMenu = button.closest('menu');

            if (isInsideMenu) {
                // SCENARIO: .tab_transition_btn clicked inside the menu tag
                updateMenuTabClasses(button);
            } else {
                // SCENARIO: .tab_transition_btn clicked NOT inside the menu tag
                const anyCurrentlyActiveButton = document.querySelector('.tab_transition_btn.active');

                if (anyCurrentlyActiveButton) {
                    const oldContentDataLabel = anyCurrentlyActiveButton.dataset.label;
                    const oldContentElement = document.querySelector(`.tab_transition_content[data-label="${oldContentDataLabel}"]`);

                    anyCurrentlyActiveButton.classList.remove('active'); // Always remove active first
                    anyCurrentlyActiveButton.classList.remove('filled', 'visited'); // Ensure both are removed before adding new one

                    // Check if the old content had a form with empty fields to decide 'filled' or 'visited'
                    if (oldContentElement && isFormEmptyInContent(oldContentElement)) {
                        anyCurrentlyActiveButton.classList.add('visited');
                    } else {
                        anyCurrentlyActiveButton.classList.add('filled');
                    }
                }
                // Then add .active to the clicked button (and remove any filled/visited state it might have)
                button.classList.remove('filled', 'visited');
                button.classList.add('active');
            }

            // After handling button states, display the corresponding content
            displayContent(dataLabel);
        });
    });

    // --- Event listener for .btn clicks inside .buttons from .tab_transition_content ---
    document.querySelectorAll('.tab_transition_content .buttons .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const dataLabel = btn.dataset.label;
            const targetContent = document.querySelector(`.tab_transition_content[data-label="${dataLabel}"]`);

            // RULE: If no matching .tab_transition_content is found, do nothing.
            if (!targetContent) {
                
                return;
            }

            // Match the clicked .btn's data-label with a .tab_transition_btn inside the menu tag
            const targetMenuButton = document.querySelector(`menu .tab_transition_btn[data-label="${dataLabel}"]`);

            // If a matching menu button is found, update its classes
            if (targetMenuButton) {
                updateMenuTabClasses(targetMenuButton);
            }

            // Display the corresponding content
            displayContent(dataLabel);
        });
    });
});
        
        
        
        
        
//Count the user inputs
document.addEventListener('DOMContentLoaded', () => {
    const division1 = document.querySelector('.division_1');

    if (division1) {
        const rightSection = division1.querySelector('.right_division');

        if (rightSection) {
            const sections = rightSection.querySelectorAll('.sections');

            sections.forEach(section => {
                const form = section.querySelector('form');
                if (form) {
                    // Check for an input field (excluding radio and checkbox)
                    const inputField = form.querySelector('input:not([type="radio"]):not([type="checkbox"])');

                    if (inputField) {
                        const counterElement = form.querySelector('.counter');

                        if (counterElement) {
                            const ariaLabel = counterElement.getAttribute('aria-label');
                            const inputName = inputField.getAttribute('name');

                            if (ariaLabel && inputName && ariaLabel === inputName) {
                                const dataLabel = counterElement.getAttribute('data-label');

                                if (dataLabel) {
                                    const maxCount = parseInt(dataLabel, 10);

                                    // Set initial count
                                    const initialCount = inputField.value.length;
                                    counterElement.innerHTML = `${initialCount}/${maxCount}`;

                                    // Add event listener to the input field
                                    inputField.addEventListener('input', (event) => {
                                        const userInputCount = event.target.value.length;
                                        counterElement.innerHTML = `${userInputCount}/${maxCount}`;

                                        const remainingCount = maxCount - userInputCount;

                                        if (remainingCount < 15) {
                                            counterElement.classList.add('warning');
                                        } else {
                                            counterElement.classList.remove('warning');
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            });
        }
    }
});



//Fetch Platform, Dependencies
document.addEventListener('DOMContentLoaded', () => { 
    const platformInputs = document.querySelectorAll('.platform input[type="radio"], .platform input[type="checkbox"]');
    const apiFilePath = 'assets/api/platform.json';
    let platformData = {};

    // Map dependency keys from API to display names and icon names
    const dependencyMap = {
        'nodejs': { label: 'nodejs', icon: 'devicon:nodejs' },
        'mongodb': { label: 'mongodb', icon: 'devicon:mongodb' },
        'vercel': { label: 'vercel', icon: 'devicon:vercel' }
    };

    // Function to fetch data from the API using the Fetch API
    async function fetchPlatformData() {
        try {
            const response = await fetch(apiFilePath);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }
            platformData = await response.json();
        } catch (error) {
            package('popup', 'warning','Error fetching platform data:', error);
        }
    }

    //Fetch the data when Platform tab is choosen
    const tabTransitionButtons = document.querySelectorAll('.tab_transition_btn');
    tabTransitionButtons.forEach(button => {
        button.addEventListener('click', function(event) {       
            if (this.dataset.label === 'system') {
                fetchPlatformData();
            }
        });
    });
    
    const sectionSystemButtons = document.querySelectorAll('.sections .btn[data-label="system"]');
    sectionSystemButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            fetchPlatformData();
        });
    });

    // Function to create and append the version select fieldset
    function createVersionFieldset(versions, targetElement) {
        // Remove any existing platformversion fieldset
        const existingVersionFieldset = targetElement.nextElementSibling;
        if (existingVersionFieldset && existingVersionFieldset.classList.contains('platformversion')) {
            existingVersionFieldset.remove();
            // Also remove any existing versiondependencies fieldset if it follows
            const existingDependenciesFieldset = existingVersionFieldset.nextElementSibling;
            if (existingDependenciesFieldset && existingDependenciesFieldset.classList.contains('versiondependencies')) {
                existingDependenciesFieldset.remove();
            }
        }

        const fieldset = document.createElement('fieldset');
        fieldset.classList.add('platformversion');
        fieldset.classList.add('text-focus-in');
        
        const label = document.createElement('label');
        label.setAttribute('for', 'platformversion');
        
        const small = document.createElement('small');
        small.textContent = 'Select Versions';
        label.appendChild(small);

        const aside = document.createElement('aside');
        aside.classList.add('input_field', 'fixed_flex');

        const select = document.createElement('select');
        select.setAttribute('name', 'platformversion');
        select.setAttribute('id', 'platformversion');

        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "Select a version";
        select.appendChild(defaultOption);

        for (const versionKey in versions) {
            const option = document.createElement('option');
            option.value = versionKey;
            option.textContent = versionKey;
            select.appendChild(option);
        }

        aside.appendChild(select);
        fieldset.appendChild(label);
        fieldset.appendChild(aside);

        targetElement.after(fieldset);

        // Add event listener to the newly created select dropdown
        select.addEventListener('change', handleVersionSelection);
    }

    // Function to create and append the dependency details table
    function createDependenciesTable(dependencies, targetElement) {
        // Remove any existing versiondependencies fieldset
        const existingFieldset = targetElement.nextElementSibling;
        if (existingFieldset && existingFieldset.classList.contains('versiondependencies')) {
            existingFieldset.remove();
        }

        const fieldset = document.createElement('fieldset');
        fieldset.classList.add('versiondependencies', 'image_labelled_buttons', 'flex');

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');
        const th1 = document.createElement('th');
        th1.textContent = 'Dependencies';
        const th2 = document.createElement('th');
        th2.textContent = 'Version';
        table.classList.add("text-focus-in");
        headerRow.appendChild(th1);
        headerRow.appendChild(th2);
        thead.appendChild(headerRow);

        for (const depKey in dependencies) {
            const depValue = dependencies[depKey];
            const mapInfo = dependencyMap[depKey];

            if (mapInfo) { // Only process if we have a mapping for the dependency
                const tr = document.createElement('tr');
                const tdDep = document.createElement('td');
                const tdVersion = document.createElement('td');

                const spanIconContainer = document.createElement('span');
                spanIconContainer.classList.add('icon');

                // Create iconify-icon element
                const iconifyIcon = document.createElement('iconify-icon');
                iconifyIcon.setAttribute('icon', mapInfo.icon);
                iconifyIcon.classList.add('medium');
                // Iconify will render these once its script is loaded

                const smallLabel = document.createElement('small');
                smallLabel.textContent = mapInfo.label;

                spanIconContainer.appendChild(iconifyIcon);
                spanIconContainer.appendChild(smallLabel);
                tdDep.appendChild(spanIconContainer);

                if (depValue === 'N/A') {
                    // For N/A values, use the specific icon
                    const naIcon = document.createElement('iconify-icon');
                    naIcon.setAttribute('icon', 'clarity:times-circle-solid');
                    naIcon.classList.add('failure', 'hint', 'hint--left');
                    naIcon.setAttribute('aria-label', 'N/A');
                    tdVersion.appendChild(naIcon);
                } else {
                    tdVersion.textContent = depValue;
                }

                tr.appendChild(tdDep);
                tr.appendChild(tdVersion);
                tbody.appendChild(tr);
            } else {
                package('popup', 'warning',`No display mapping found for dependency key: ${depKey}`);
            }
        }

        table.appendChild(thead);
        table.appendChild(tbody);
        fieldset.appendChild(table);

        targetElement.after(fieldset);
    }

    // Event handler for platform version selection
    function handleVersionSelection(event) {
        const selectedVersion = event.target.value;

        // Do not proceed if "Select a version" is chosen
        if (selectedVersion === "") {
            // Remove any existing dependencies table
            const currentSelect = event.target;
            const platformVersionFieldset = currentSelect.closest('.platformversion');
            if (platformVersionFieldset) {
                const existingDependenciesFieldset = platformVersionFieldset.nextElementSibling;
                if (existingDependenciesFieldset && existingDependenciesFieldset.classList.contains('versiondependencies')) {
                    existingDependenciesFieldset.remove();
                }
            }
            return;
        }

        // Get the selected platform name from the radio/checkbox in the same .sections block
        const sectionsParent = event.target.closest('.sections');
        const checkedPlatformInput = sectionsParent.querySelector('.platform input[type="radio"]:checked, .platform input[type="checkbox"]:checked');

        if (!checkedPlatformInput) {
            package('popup', 'warning','No platform selected for version.');
            return;
        }

        const platformName = checkedPlatformInput.value; // e.g., "laravel", "magento"

        // Find the specific version details from the loaded platformData
        if (platformData && platformData[platformName] && platformData[platformName].versions && platformData[platformName].versions[selectedVersion]) {
            const versionDetails = platformData[platformName].versions[selectedVersion];
            const targetElementForTable = event.target.closest('.platformversion'); // Append after the version select fieldset
            if (targetElementForTable) {
                createDependenciesTable(versionDetails, targetElementForTable);
            }
        } else {
            console.warn(`Details not found for ${platformName} version ${selectedVersion}`);
            // If details not found, remove any existing dependencies table
            const currentSelect = event.target;
            const platformVersionFieldset = currentSelect.closest('.platformversion');
            if (platformVersionFieldset) {
                const existingDependenciesFieldset = platformVersionFieldset.nextElementSibling;
                if (existingDependenciesFieldset && existingDependenciesFieldset.classList.contains('versiondependencies')) {
                    existingDependenciesFieldset.remove();
                }
            }
        }
    }

    // Event listener for initial platform selection (remains the same)
    platformInputs.forEach(input => {
        input.addEventListener('change', (event) => {
            if (event.target.checked) {
                const platformName = event.target.value;

                const sectionsParent = event.target.closest('.sections');
                const platformElement = sectionsParent.querySelector('.platform');

                if (Object.keys(platformData).length > 0 && platformData[platformName] && platformData[platformName].versions) {
                    const versions = platformData[platformName].versions;
                    createVersionFieldset(versions, platformElement);
                } else {
                    package('popup', 'warning', `No version data found for platform: ${platformName} or platformData not loaded yet.`);
                    // Also remove version fieldset if no data
                    const existingVersionFieldset = platformElement.nextElementSibling;
                    if (existingVersionFieldset && existingVersionFieldset.classList.contains('platformversion')) {
                        existingVersionFieldset.remove();
                        // Also remove any existing dependencies fieldset
                        const existingDependenciesFieldset = existingVersionFieldset.nextElementSibling;
                        if (existingDependenciesFieldset && existingDependenciesFieldset.classList.contains('versiondependencies')) {
                            existingDependenciesFieldset.remove();
                        }
                    }
                }
            }
        });
    });
});





document.addEventListener('DOMContentLoaded', function() {
    const leftDivision = document.querySelector('.left_division');
    let isDragging = false;
    let startClientY; // Y position where drag started (for calculating total displacement)
    let initialBottom; // Stores the 'bottom' CSS value when drag starts
    let lastClientY; // Tracks the last known Y position during dragMove to infer direction

    // Variables for distinguishing click vs. drag
    let initialTouchTarget = null; // Stores the specific element that was touched initially
    let touchStartTime = 0; // Records the time of touchstart
    let hasMovedEnoughToPreventClick = false; // Flag if movement exceeded threshold for a drag
    const MIN_DRAG_FOR_PREVENT_CLICK = 7; // Minimum pixels moved to consider it a drag, not a click
    const TAP_MAX_DURATION = 300; // Maximum time (ms) for a touch to be considered a tap/click

    // Define the key bottom positions
    const BOTTOM_HIDDEN_STATE = -320;   // The fully hidden state
    const BOTTOM_FULL_OPEN_STATE = 0;   // The fully open state

    // Define the new snapping thresholds based on direction
    const SNAP_THRESHOLD_UP_DRAG = -270;
    const SNAP_THRESHOLD_DOWN_DRAG = -50;

    if (!leftDivision) {
        console.warn('.left_division element not found. Make sure the class name is correct.');
        return;
    }

    // Function to check if the media query matches
    function isMobileView() {
        const mediaQuery = window.matchMedia('(max-width: 720px)');
        return mediaQuery.matches;
    }

    // --- Drag/Swipe Functionality (Unified for Mouse and Touch) ---

    function startDrag(e) {
        // This condition ensures the custom drag/snap is ONLY active when the media query matches.
        // For desktop browsers wider than 720px, this function will return early.
        if (!isMobileView()) {
            isDragging = false;
            console.log('Drag start ignored: Not in mobile view (or desktop resized <= 720px) where custom drag is active.');
            return;
        }

        isDragging = true;
        startClientY = e.touches ? e.touches[0].clientY : e.clientY;
        lastClientY = startClientY;

        hasMovedEnoughToPreventClick = false;
        
        // --- Critical for Click Handling ---
        // Store the initial target. Try to find a naturally clickable element if possible.
        let currentTarget = e.target;
        while (currentTarget && currentTarget !== leftDivision) {
            if (currentTarget.tagName === 'BUTTON' || currentTarget.tagName === 'A' || currentTarget.hasAttribute('onclick') || currentTarget.classList.contains('js-clickable')) {
                initialTouchTarget = currentTarget;
                break;
            }
            currentTarget = currentTarget.parentElement;
        }
        if (!initialTouchTarget) { // If no specific clickable element found, use the direct target.
            initialTouchTarget = e.target;
        }
        // --- End Critical for Click Handling ---

        touchStartTime = Date.now();
        initialBottom = parseFloat(getComputedStyle(leftDivision).bottom);
        if (isNaN(initialBottom)) {
            initialBottom = BOTTOM_HIDDEN_STATE;
        }

        leftDivision.style.transition = 'none';
        
        // IMPORTANT CHANGE: Conditional preventDefault for startDrag
        if (e.type === 'touchstart') {
            e.preventDefault(); // Prevent default mobile scrolling/zooming immediately on touchstart
            console.log('preventDefault on touchstart.');
        } else if (e.type === 'mousedown') {
            // Do NOT preventDefault on mousedown. Let the browser handle native clicks unless a drag is confirmed.
            console.log('mousedown - NO preventDefault initially to allow native click events.');
        }

        if (!e.touches) { // Attach mousemove/mouseup to document for both desktop and desktop responsive
            document.addEventListener('mousemove', dragMove);
            document.addEventListener('mouseup', endDrag);
        }
    }

    function dragMove(e) {
        if (!isDragging || !isMobileView()) {
            return;
        }

        const currentClientY = e.touches ? e.touches[0].clientY : e.clientY;
        const deltaY = startClientY - currentClientY;

        let newBottom = initialBottom + deltaY;

        const minAllowedBottom = BOTTOM_HIDDEN_STATE;
        const maxAllowedBottom = BOTTOM_FULL_OPEN_STATE;

        newBottom = Math.max(minAllowedBottom, Math.min(newBottom, maxAllowedBottom));

        leftDivision.style.bottom = `${newBottom}px`;
        lastClientY = currentClientY;

        if (!hasMovedEnoughToPreventClick && Math.abs(deltaY) > MIN_DRAG_FOR_PREVENT_CLICK) {
            hasMovedEnoughToPreventClick = true;
        }

        // IMPORTANT CHANGE: Conditional preventDefault for dragMove
        if (e.type === 'touchmove') {
            e.preventDefault(); // Prevent default mobile scrolling during touch drag
            console.log('preventDefault on touchmove.');
        } else if (e.type === 'mousemove' && hasMovedEnoughToPreventClick) {
            e.preventDefault(); 
        }
    }

    function endDrag(e) {
        if (!isDragging || !isMobileView()) {
            return;
        }

        isDragging = false;
        leftDivision.style.transition = 'bottom 0.3s ease-out';

        const currentBottom = parseFloat(leftDivision.style.bottom);
        const touchDuration = Date.now() - touchStartTime;

        let wasDraggedUp = (lastClientY < startClientY);
        let wasDraggedDown = (lastClientY > startClientY);

        // --- Handle Click vs. Drag ---
        // If it was a short tap AND not enough movement for a drag, simulate a click
        if (!hasMovedEnoughToPreventClick && touchDuration < TAP_MAX_DURATION) {
            if (initialTouchTarget && initialTouchTarget.nodeType === Node.ELEMENT_NODE && document.body.contains(initialTouchTarget)) {
                
                try {
                    // Option A: Programmatic dispatch of MouseEvent (usually reliable)
                    const syntheticClickEvent = new MouseEvent('click', {
                        bubbles: true, cancelable: true, view: window, detail: 1,
                        screenX: e.screenX, screenY: e.screenY, clientX: e.clientX, clientY: e.clientY,
                        ctrlKey: e.ctrlKey, altKey: e.altKey, shiftKey: e.shiftKey, metaKey: e.metaKey,
                        button: 0, buttons: 1, relatedTarget: null
                    });
                    initialTouchTarget.dispatchEvent(syntheticClickEvent);

                } catch (error) {
                    
                }
            } else {
                
            }
        } else {
           
        }
        if (wasDraggedUp) {
            if (currentBottom >= SNAP_THRESHOLD_UP_DRAG || currentBottom === BOTTOM_FULL_OPEN_STATE) {
                leftDivision.style.bottom = `${BOTTOM_FULL_OPEN_STATE}px`;
            } else {
                leftDivision.style.bottom = `${BOTTOM_HIDDEN_STATE}px`;
            }
        } else if (wasDraggedDown) {
            if (currentBottom <= SNAP_THRESHOLD_DOWN_DRAG || currentBottom === BOTTOM_HIDDEN_STATE) {
                leftDivision.style.bottom = `${BOTTOM_HIDDEN_STATE}px`;
            } else {
                leftDivision.style.bottom = `${BOTTOM_FULL_OPEN_STATE}px`;
            }
        } else {
            if (currentBottom >= (BOTTOM_FULL_OPEN_STATE + BOTTOM_HIDDEN_STATE) / 2) {
                leftDivision.style.bottom = `${BOTTOM_FULL_OPEN_STATE}px`;
            } else {
                leftDivision.style.bottom = `${BOTTOM_HIDDEN_STATE}px`;
            }
        }

        // Remove global mouse event listeners (important for mouse interactions)
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', endDrag);
    }

    // --- Event Listener Management ---

    function addAllDragListeners() {
        // Remove existing listeners first to prevent duplicates
        leftDivision.removeEventListener('touchstart', startDrag);
        leftDivision.removeEventListener('touchmove', dragMove);
        leftDivision.removeEventListener('touchend', endDrag);
        leftDivision.removeEventListener('touchcancel', endDrag);
        leftDivision.removeEventListener('mousedown', startDrag);
        leftDivision.removeEventListener('mouseleave', handleMouseLeaveDuringDrag);

        // Add touch and mouse listeners with appropriate passive options
        leftDivision.addEventListener('touchstart', startDrag, { passive: false }); // Needs passive:false for preventDefault
        leftDivision.addEventListener('touchmove', dragMove, { passive: false });   // Needs passive:false for preventDefault
        leftDivision.addEventListener('touchend', endDrag);
        leftDivision.addEventListener('touchcancel', endDrag);

        leftDivision.addEventListener('mousedown', startDrag); // No passive for mousedown, default is fine
        leftDivision.addEventListener('mouseleave', handleMouseLeaveDuringDrag);

        // --- TEMPORARY DEBUGGING: Add a general click listener to all buttons within .left_division ---
        leftDivision.querySelectorAll('button, a, input[type="button"], input[type="submit"]').forEach(btn => {
            btn.removeEventListener('click', debugButtonClickListener); // Remove previous to prevent duplicates
            btn.addEventListener('click', debugButtonClickListener);
        });
    }

    function debugButtonClickListener(event) {
        
    }

    function removeAllDragListeners() {
        leftDivision.removeEventListener('touchstart', startDrag);
        leftDivision.removeEventListener('touchmove', dragMove);
        leftDivision.removeEventListener('touchend', endDrag);
        leftDivision.removeEventListener('touchcancel', endDrag);

        leftDivision.removeEventListener('mousedown', startDrag);
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', endDrag);
        leftDivision.removeEventListener('mouseleave', handleMouseLeaveDuringDrag);

        leftDivision.querySelectorAll('button, a, input[type="button"], input[type="submit"]').forEach(btn => {
            btn.removeEventListener('click', debugButtonClickListener);
        });

        isDragging = false;
    }

    function handleMouseLeaveDuringDrag(e) {
        if (isDragging && e.buttons === 0) { // Mouse button released while outside
            endDrag(e);
        } // If e.buttons === 1, drag continues via document listeners, no action here.
    }

    // --- Media Query Listener and Initialization ---

    const mediaQueryList = window.matchMedia('(max-width: 720px)');

    function handleMediaQueryChange() {
        if (isMobileView()) {
            console.log('Media query (max-width: 720px) matches. Activating custom drag/click behavior.');
            addAllDragListeners();
        } else {
            console.log('Media query (max-width: 720px) does NOT match. Deactivating custom drag/click behavior.');
            removeAllDragListeners();
            // Reset CSS properties modified by JS to allow them to be controlled by CSS again
            // Ensure these CSS properties match what your CSS intends for non-mobile view.
            leftDivision.style.position = '';
            leftDivision.style.bottom = '';
            leftDivision.style.left = '';
            leftDivision.style.width = '';
            leftDivision.style.transition = '';
        }
    }

    // Initialize button listeners (for tab transitions and sections)
    // These should always be active regardless of media query, as they handle application logic.
    const tabTransitionButtons = document.querySelectorAll('.tab-transition-button');
    tabTransitionButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            
            if (this.dataset.label === 'system') {
                
                fetchPlatformData();
            }
        });
    });

    const sectionSystemButtons = document.querySelectorAll('.sections .btn[data-label="system"]');
    sectionSystemButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            
            fetchPlatformData();
            // event.preventDefault(); // Uncomment if this button is within a form that should not submit
        });
    });

    function fetchPlatformData() {
       
    }

    // Initial check when the page loads
    handleMediaQueryChange();
    // Listen for changes in the media query status (e.g., window resize, device rotation)
    mediaQueryList.addEventListener('change', handleMediaQueryChange);
    window.addEventListener('resize', handleMediaQueryChange); // Ensure resize also triggers a check
});
