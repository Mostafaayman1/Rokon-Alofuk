window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const searchParams = {
    status: (params.get("status") || "").toLowerCase().trim(),
    type: (params.get("type") || "").toLowerCase().trim(),
    area: (params.get("area") || "").toLowerCase().trim().replace(/\s+/g, "")
  };

  fetch('properties.json')
    .then(response => response.json())
    .then(data => {
      const filtered = data.filter(item => {
        const itemStatus = String(item.status || "").toLowerCase().trim();
        const itemType = String(item.type || "").toLowerCase().trim();
        const itemArea = String(item.area || "").toLowerCase().trim().replace(/\s+/g, "");

        // Debug log to check what's happening
        console.log("item.area =", `"${itemArea}"`, "| search =", `"${searchParams.area}"`);

        return (!searchParams.status || itemStatus === searchParams.status) &&
               (!searchParams.type || itemType === searchParams.type) &&
               (!searchParams.area || itemArea === searchParams.area);
      });

      renderResults(filtered);
    })
    .catch(error => {
      console.error("فشل تحميل البيانات:", error);
      document.getElementById('results').innerHTML = '<p class="not-found">حدث خطأ أثناء تحميل البيانات.</p>';
    });

  function renderResults(properties) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (properties.length === 0) {
      resultsDiv.innerHTML = '<p class="not-found">لا يتوفر هذا المنتج حاليًا.</p>';
      return;
    }

    const titleElement = document.getElementById("results-title");
    if (titleElement && properties[0]) {
      const word = properties[0].type === "محلات" ? "محلات" :
                   properties[0].type === "فلل" ? "الفلل" : "العقارات";
      const label = properties[0].status === "rent" ? "للإيجار" : "للبيع";
      titleElement.textContent = `عروض ${word} ${label}`;
    }

    properties.forEach(property => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="card-content">
          <h3>${property.title}</h3>
          <p>${property.rooms} غرفه - ${property.bathrooms} حمام - ${property.halls} صاله</p>
          <p class="price">${property.price} ريال</p>
          <a href="tel:${property.phone}" class="contact-btn">اتصال</a>
        </div>
        <img src="${property.image}" alt="${property.title}">
      `;

      resultsDiv.appendChild(card);
    });
  }
};
