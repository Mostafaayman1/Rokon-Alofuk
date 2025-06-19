window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const searchParams = {
    status: (params.get("status") || "").toLowerCase().trim(),
    type: (params.get("type") || "").toLowerCase().trim(),
    area: (params.get("area") || "").toLowerCase().trim()
  };

  fetch('properties.json')
    .then(response => response.json())
    .then(data => {
      const filtered = data.filter(item =>
        (!searchParams.status || item.status.toLowerCase().trim() === searchParams.status) &&
        (!searchParams.type || item.type.toLowerCase().trim() === searchParams.type) &&
        (!searchParams.area || item.area.toLowerCase().trim() === searchParams.area)
      );

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
    if (properties[0]) {
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
