/* BUILD MODAL */

const modal = document.getElementById("buildModal");
const modalClose = document.getElementById("modalClose");

const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");

const modalCpu = document.getElementById("modalCpu");
const modalGpu = document.getElementById("modalGpu");
const modalRam = document.getElementById("modalRam");
const modalSsd = document.getElementById("modalSsd");

const fpsCs = document.getElementById("fpsCs");
const fpsFortnite = document.getElementById("fpsFortnite");
const fpsCyberpunk = document.getElementById("fpsCyberpunk");

const modalButtons = document.querySelectorAll(".open-build-modal");

if (modal) {
    modalButtons.forEach((button) => {
        button.addEventListener("click", () => {
            modalTitle.textContent = button.dataset.title;
            modalImage.src = button.dataset.image;
            modalDescription.textContent = button.dataset.description;
            modalPrice.textContent = button.dataset.price;

            modalCpu.textContent = button.dataset.cpu;
            modalGpu.textContent = button.dataset.gpu;
            modalRam.textContent = button.dataset.ram;
            modalSsd.textContent = button.dataset.ssd;

            if (fpsCs && fpsFortnite && fpsCyberpunk) {
                fpsCs.textContent = button.dataset.cs + " FPS";
                fpsFortnite.textContent = button.dataset.fortnite + " FPS";
                fpsCyberpunk.textContent = button.dataset.cyberpunk + " FPS";
            }

            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });
}

if (modal && modalClose) {
    modalClose.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
}

/* BUILD FILTERS */

const filterButtons = document.querySelectorAll(".filter-btn");
const buildCards = document.querySelectorAll(".build-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        buildCards.forEach((card) => {
            const category = card.dataset.category;

            if (filter === "all" || category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

/* CONFIGURATOR */

const cpuSelect = document.getElementById("cpuSelect");
const gpuSelect = document.getElementById("gpuSelect");
const ramSelect = document.getElementById("ramSelect");
const ssdSelect = document.getElementById("ssdSelect");
const psuSelect = document.getElementById("psuSelect");
const caseSelect = document.getElementById("caseSelect");

const cpuResult = document.getElementById("cpuResult");
const gpuResult = document.getElementById("gpuResult");
const ramResult = document.getElementById("ramResult");
const ssdResult = document.getElementById("ssdResult");
const psuResult = document.getElementById("psuResult");
const caseResult = document.getElementById("caseResult");

const totalPrice = document.getElementById("totalPrice");

const buildLevel = document.getElementById("buildLevel");
const levelProgress = document.getElementById("levelProgress");
const compatibilityBox = document.getElementById("compatibilityBox");

const configFpsCs = document.getElementById("configFpsCs");
const configFpsFortnite = document.getElementById("configFpsFortnite");
const configFpsCyberpunk = document.getElementById("configFpsCyberpunk");

function formatPrice(price) {
    return price.toLocaleString("ru-RU") + " ₴";
}

function getSelectedText(select) {
    return select.options[select.selectedIndex].text;
}

function getSelectedPrice(select) {
    return Number(select.value);
}

function updateBuild() {
    const cpuPrice = getSelectedPrice(cpuSelect);
    const gpuPrice = getSelectedPrice(gpuSelect);
    const ramPrice = getSelectedPrice(ramSelect);
    const ssdPrice = getSelectedPrice(ssdSelect);
    const psuPrice = getSelectedPrice(psuSelect);
    const casePrice = getSelectedPrice(caseSelect);

    cpuResult.textContent =
        getSelectedText(cpuSelect) + " — " + formatPrice(cpuPrice);

    gpuResult.textContent =
        getSelectedText(gpuSelect) + " — " + formatPrice(gpuPrice);

    ramResult.textContent =
        getSelectedText(ramSelect) + " — " + formatPrice(ramPrice);

    ssdResult.textContent =
        getSelectedText(ssdSelect) + " — " + formatPrice(ssdPrice);

    psuResult.textContent =
        getSelectedText(psuSelect) + " — " + formatPrice(psuPrice);

    caseResult.textContent =
        getSelectedText(caseSelect) + " — " + formatPrice(casePrice);

    const total =
        cpuPrice +
        gpuPrice +
        ramPrice +
        ssdPrice +
        psuPrice +
        casePrice;

    totalPrice.textContent = formatPrice(total);

    if (buildLevel && levelProgress) {
        if (total < 50000) {
            buildLevel.textContent = "Budget";
            levelProgress.style.width = "25%";
        } else if (total < 90000) {
            buildLevel.textContent = "Gaming";
            levelProgress.style.width = "50%";
        } else if (total < 140000) {
            buildLevel.textContent = "Enthusiast";
            levelProgress.style.width = "75%";
        } else {
            buildLevel.textContent = "Workstation";
            levelProgress.style.width = "100%";
        }
    }

    if (compatibilityBox) {
        const selectedGpu = getSelectedText(gpuSelect);
        const selectedPsu = getSelectedText(psuSelect);

        if (
            selectedGpu.includes("RTX 4090") &&
            !selectedPsu.includes("1000W")
        ) {
            compatibilityBox.textContent =
                "⚠ Для RTX 4090 рекомендуется блок питания 1000W";

            compatibilityBox.classList.add("warning");
        } else {
            compatibilityBox.textContent =
                "✓ Все комплектующие совместимы";

            compatibilityBox.classList.remove("warning");
        }
    }

    if (configFpsCs && configFpsFortnite && configFpsCyberpunk) {
        const selectedGpu = getSelectedText(gpuSelect);

        if (selectedGpu.includes("RTX 4060")) {
            configFpsCs.textContent = "250 FPS";
            configFpsFortnite.textContent = "120 FPS";
            configFpsCyberpunk.textContent = "60 FPS";
        } else if (selectedGpu.includes("RTX 4070")) {
            configFpsCs.textContent = "400 FPS";
            configFpsFortnite.textContent = "180 FPS";
            configFpsCyberpunk.textContent = "95 FPS";
        } else if (selectedGpu.includes("RTX 4090")) {
            configFpsCs.textContent = "700 FPS";
            configFpsFortnite.textContent = "300 FPS";
            configFpsCyberpunk.textContent = "170 FPS";
        }
    }
}

if (
    cpuSelect &&
    gpuSelect &&
    ramSelect &&
    ssdSelect &&
    psuSelect &&
    caseSelect
) {
    const selects = [
        cpuSelect,
        gpuSelect,
        ramSelect,
        ssdSelect,
        psuSelect,
        caseSelect
    ];

    selects.forEach((select) => {
        select.addEventListener("change", updateBuild);
    });

    updateBuild();
}

/* SAVE BUILD */

const saveBuildBtn = document.getElementById("saveBuildBtn");
const saveToast = document.getElementById("saveToast");

function saveCurrentBuild() {
    const savedBuild = {
        cpu: cpuSelect.value,
        gpu: gpuSelect.value,
        ram: ramSelect.value,
        ssd: ssdSelect.value,
        psu: psuSelect.value,
        case: caseSelect.value
    };

    localStorage.setItem("buildForgeSavedBuild", JSON.stringify(savedBuild));
}

function loadSavedBuild() {
    const savedBuild = localStorage.getItem("buildForgeSavedBuild");

    if (!savedBuild) return;

    const build = JSON.parse(savedBuild);

    cpuSelect.value = build.cpu;
    gpuSelect.value = build.gpu;
    ramSelect.value = build.ram;
    ssdSelect.value = build.ssd;
    psuSelect.value = build.psu;
    caseSelect.value = build.case;

    updateBuild();
}

if (saveBuildBtn && saveToast) {
    saveBuildBtn.addEventListener("click", () => {
        saveCurrentBuild();

        saveToast.classList.add("active");

        setTimeout(() => {
            saveToast.classList.remove("active");
        }, 2200);
    });

    loadSavedBuild();
}

/* COMPARE */

const cpuData = {
    i5: {
        name: "Intel Core i5",
        cores: "10",
        threads: "16",
        frequency: "4.6 GHz",
        gaming: "⭐⭐⭐⭐",
        work: "⭐⭐⭐",
        price: "7 500 ₴"
    },
    ryzen7: {
        name: "Ryzen 7 7800X3D",
        cores: "8",
        threads: "16",
        frequency: "5.0 GHz",
        gaming: "⭐⭐⭐⭐⭐",
        work: "⭐⭐⭐⭐",
        price: "16 000 ₴"
    },
    i9: {
        name: "Intel Core i9",
        cores: "24",
        threads: "32",
        frequency: "5.8 GHz",
        gaming: "⭐⭐⭐⭐",
        work: "⭐⭐⭐⭐⭐",
        price: "24 000 ₴"
    }
};

const compareCpuA = document.getElementById("compareCpuA");
const compareCpuB = document.getElementById("compareCpuB");

function updateCompare() {
    const cpuA = cpuData[compareCpuA.value];
    const cpuB = cpuData[compareCpuB.value];

    document.getElementById("cpuAName").textContent = cpuA.name;
    document.getElementById("cpuBName").textContent = cpuB.name;

    document.getElementById("cpuACores").textContent = cpuA.cores;
    document.getElementById("cpuBCores").textContent = cpuB.cores;

    document.getElementById("cpuAThreads").textContent = cpuA.threads;
    document.getElementById("cpuBThreads").textContent = cpuB.threads;

    document.getElementById("cpuAFrequency").textContent = cpuA.frequency;
    document.getElementById("cpuBFrequency").textContent = cpuB.frequency;

    document.getElementById("cpuAGaming").textContent = cpuA.gaming;
    document.getElementById("cpuBGaming").textContent = cpuB.gaming;

    document.getElementById("cpuAWork").textContent = cpuA.work;
    document.getElementById("cpuBWork").textContent = cpuB.work;

    document.getElementById("cpuAPrice").textContent = cpuA.price;
    document.getElementById("cpuBPrice").textContent = cpuB.price;
}

if (compareCpuA && compareCpuB) {
    compareCpuA.addEventListener("change", updateCompare);
    compareCpuB.addEventListener("change", updateCompare);

    updateCompare();
}

const cpuCompareBtn = document.getElementById("cpuCompareBtn");
const gpuCompareBtn = document.getElementById("gpuCompareBtn");

const compareLabelA = document.getElementById("compareLabelA");
const compareLabelB = document.getElementById("compareLabelB");

const gpuData = {
    rtx4060: {
        name: "RTX 4060",
        cores: "3072 CUDA",
        threads: "8GB GDDR6",
        frequency: "2.46 GHz",
        gaming: "⭐⭐⭐",
        work: "⭐⭐⭐",
        price: "14 000 ₴"
    },
    rtx4070: {
        name: "RTX 4070 Super",
        cores: "7168 CUDA",
        threads: "12GB GDDR6X",
        frequency: "2.48 GHz",
        gaming: "⭐⭐⭐⭐",
        work: "⭐⭐⭐⭐",
        price: "32 000 ₴"
    },
    rtx4090: {
        name: "RTX 4090",
        cores: "16384 CUDA",
        threads: "24GB GDDR6X",
        frequency: "2.52 GHz",
        gaming: "⭐⭐⭐⭐⭐",
        work: "⭐⭐⭐⭐⭐",
        price: "85 000 ₴"
    }
};

function fillCompareOptions(data, selectA, selectB) {
    selectA.innerHTML = "";
    selectB.innerHTML = "";

    Object.keys(data).forEach((key) => {
        selectA.innerHTML += `<option value="${key}">${data[key].name}</option>`;
        selectB.innerHTML += `<option value="${key}">${data[key].name}</option>`;
    });

    selectB.selectedIndex = 1;
}

function updateCompareByType(data) {
    const itemA = data[compareCpuA.value];
    const itemB = data[compareCpuB.value];

    document.getElementById("cpuAName").textContent = itemA.name;
    document.getElementById("cpuBName").textContent = itemB.name;

    document.getElementById("cpuACores").textContent = itemA.cores;
    document.getElementById("cpuBCores").textContent = itemB.cores;

    document.getElementById("cpuAThreads").textContent = itemA.threads;
    document.getElementById("cpuBThreads").textContent = itemB.threads;

    document.getElementById("cpuAFrequency").textContent = itemA.frequency;
    document.getElementById("cpuBFrequency").textContent = itemB.frequency;

    document.getElementById("cpuAGaming").textContent = itemA.gaming;
    document.getElementById("cpuBGaming").textContent = itemB.gaming;

    document.getElementById("cpuAWork").textContent = itemA.work;
    document.getElementById("cpuBWork").textContent = itemB.work;

    document.getElementById("cpuAPrice").textContent = itemA.price;
    document.getElementById("cpuBPrice").textContent = itemB.price;
}

let currentCompareData = cpuData;

if (cpuCompareBtn && gpuCompareBtn && compareCpuA && compareCpuB) {
    cpuCompareBtn.addEventListener("click", () => {
        currentCompareData = cpuData;

        cpuCompareBtn.classList.add("active");
        gpuCompareBtn.classList.remove("active");

        compareLabelA.textContent = "Первый процессор";
        compareLabelB.textContent = "Второй процессор";

        fillCompareOptions(cpuData, compareCpuA, compareCpuB);
        updateCompareByType(cpuData);
    });

    gpuCompareBtn.addEventListener("click", () => {
        currentCompareData = gpuData;

        gpuCompareBtn.classList.add("active");
        cpuCompareBtn.classList.remove("active");

        compareLabelA.textContent = "Первая видеокарта";
        compareLabelB.textContent = "Вторая видеокарта";

        fillCompareOptions(gpuData, compareCpuA, compareCpuB);
        updateCompareByType(gpuData);
    });

    compareCpuA.addEventListener("change", () => {
        updateCompareByType(currentCompareData);
    });

    compareCpuB.addEventListener("change", () => {
        updateCompareByType(currentCompareData);
    });
}

/* COMPONENT FILTERS */

const componentFilterButtons = document.querySelectorAll("[data-component-filter]");
const componentCards = document.querySelectorAll(".component-card");

componentFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.componentFilter;

        componentFilterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        componentCards.forEach((card) => {
            const category = card.dataset.component;

            if (filter === "all" || category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

/* FAQ */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});